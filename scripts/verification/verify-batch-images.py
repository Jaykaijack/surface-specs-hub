#!/usr/bin/env python3
"""Compare six local images to model/color-bound official images in memory."""
import argparse
import base64
import hashlib
import io
import json
import subprocess
from pathlib import Path
from PIL import Image


def main():
    cli = argparse.ArgumentParser()
    cli.add_argument("--out", type=Path, required=True)
    args = cli.parse_args()
    if args.out.exists():
        cli.error("Output exists; choose a new snapshot name")
    root = Path(__file__).resolve().parents[2]
    evidence = root / "releases/verification-20260930-batch02/evidence"
    results = []
    for kind, prefix in [("pro", "surface-pro-12-2"), ("laptop", "surface-laptop-13-2")]:
        capture = json.loads((evidence / f"surface-{kind}.json").read_text())
        table = next(c["props"] for c in capture["components"]
                     if c["component"] == "product-comparison-table")
        product = table["columns"][0]["product"]
        for variant, suffix in zip(product["variants"],
                                   ["platinum", "violet", "black"] if kind == "pro"
                                   else ["violet", "platinum", "black"]):
            url = variant["image"]["src"]
            if not url.startswith("https://cdn.microsoftstore.com.cn/"):
                raise ValueError("Unexpected image host")
            local_path = root / f"assets/products/{prefix}-{suffix}.png"
            result = subprocess.run(["node", "-e", """
                fetch(process.argv[1], {signal:AbortSignal.timeout(30000)})
                  .then(async r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    console.log(Buffer.from(await r.arrayBuffer()).toString('base64'));
                  }).catch(e => {console.error(e.message);process.exitCode=1;});
                """, url], capture_output=True, text=True, timeout=40)
            if result.returncode:
                results.append({
                    "productTitle": product["title"], "color": variant["name"],
                    "pageUrl": capture["resolvedUrl"], "imageUrl": url,
                    "localFile": str(local_path.relative_to(root)),
                    "localSha256": hashlib.sha256(local_path.read_bytes()).hexdigest(),
                    "verdict": "PENDING_SOURCE_FETCH",
                    "reason": result.stderr.strip(),
                })
                continue
            remote_bytes = base64.b64decode(result.stdout.strip(), validate=True)
            local_bytes = local_path.read_bytes()
            local = Image.open(io.BytesIO(local_bytes)).convert("RGBA")
            remote = Image.open(io.BytesIO(remote_bytes)).convert("RGBA")
            equal = local.size == remote.size and local.tobytes() == remote.tobytes()
            results.append({
                "productTitle": product["title"], "color": variant["name"],
                "pageUrl": capture["resolvedUrl"], "imageUrl": url,
                "sourceLocator": f"product-comparison-table.columns[0].product.variants.{variant['name']}",
                "localFile": str(local_path.relative_to(root)),
                "localSha256": hashlib.sha256(local_bytes).hexdigest(),
                "remoteSha256": hashlib.sha256(remote_bytes).hexdigest(),
                "localSize": local.size, "remoteSize": remote.size,
                "decodedRgbaPixelsEqual": equal,
                "verdict": "VERIFIED_EXACT_PIXELS" if equal else "PENDING_VISUAL_REVIEW",
            })
    with args.out.open("x", encoding="utf-8") as output:
        json.dump(results, output, ensure_ascii=False, indent=2)
    print(json.dumps({r["localFile"]: r["verdict"] for r in results}, ensure_ascii=False))


if __name__ == "__main__":
    main()
