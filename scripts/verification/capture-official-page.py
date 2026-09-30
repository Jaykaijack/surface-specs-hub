#!/usr/bin/env python3
"""Capture official store component data without executing page scripts."""
import argparse
import hashlib
import json
import subprocess
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


class Components(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.components = []

    def handle_starttag(self, tag, attrs):
        props = dict(attrs).get("props")
        if props and tag in {
            "product-comparison-table", "footnote-list", "screen-sizes-section",
            "product-hero",
        }:
            self.components.append({"component": tag, "props": json.loads(props)})


def main():
    cli = argparse.ArgumentParser()
    cli.add_argument("url")
    cli.add_argument("--out", type=Path)
    args = cli.parse_args()
    if urlparse(args.url).netloc != "www.microsoftstore.com.cn":
        cli.error("Only the official Microsoft China store is allowed")
    result = subprocess.run(
        ["node", "-e", """
        fetch(process.argv[1], {signal: AbortSignal.timeout(30000)})
          .then(async r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            console.log(JSON.stringify({url:r.url,status:r.status,html:await r.text()}));
          }).catch(e => { console.error(e.message); process.exitCode=1; });
        """, args.url],
        check=True, capture_output=True, text=True, timeout=40,
    )
    response = json.loads(result.stdout)
    if urlparse(response["url"]).netloc != "www.microsoftstore.com.cn":
        raise ValueError("Unexpected redirect outside official China store")
    parser = Components()
    parser.feed(response["html"])
    if not any(c["component"] == "product-comparison-table" for c in parser.components):
        raise ValueError("No product comparison component; identity not established")
    capture = {
        "requestedUrl": args.url,
        "resolvedUrl": response["url"],
        "httpStatus": response["status"],
        "retrievedAt": datetime.now(timezone.utc).isoformat(),
        "htmlSha256": hashlib.sha256(response["html"].encode()).hexdigest(),
        "method": "Node HTTPS fetch + Python HTMLParser + JSON props parser",
        "components": parser.components,
    }
    text = json.dumps(capture, ensure_ascii=False, indent=2) + "\n"
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        # Evidence snapshots are immutable; reruns require a new filename.
        with args.out.open("x", encoding="utf-8") as output:
            output.write(text)
    else:
        print(text, end="")


if __name__ == "__main__":
    main()
