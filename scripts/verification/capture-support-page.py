#!/usr/bin/env python3
"""Capture Microsoft source text and image metadata for manual identity review."""
import argparse
import hashlib
import json
import subprocess
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


class Source(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.text = []
        self.images = []
        self.headings = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "img":
            self.images.append(attrs)
        elif tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag in {"br", "hr", "img", "meta", "link", "input", "source", "wbr"}:
            return
        self.stack.append(tag)
        if tag in {"p", "li", "h1", "h2", "h3", "tr", "div"}:
            self.text.append("\n")

    def handle_endtag(self, tag):
        if tag in self.stack:
            index = len(self.stack) - 1 - self.stack[::-1].index(tag)
            self.stack = self.stack[:index]

    def handle_data(self, value):
        if any(tag in self.stack for tag in {"script", "style", "noscript"}):
            return
        value = value.strip()
        if value:
            self.text.append(value + " ")
            if any(tag in self.stack for tag in {"title", "h1", "h2", "h3"}):
                self.headings.append(value)


def main():
    cli = argparse.ArgumentParser()
    cli.add_argument("url")
    cli.add_argument("--out", type=Path, required=True)
    args = cli.parse_args()
    allowed = {"support.microsoft.com", "blogs.windows.com", "news.microsoft.com"}
    if urlparse(args.url).scheme != "https" or urlparse(args.url).netloc not in allowed:
        cli.error("Only official Microsoft HTTPS sources are allowed")
    if args.out.exists():
        cli.error("Snapshot already exists; choose a new filename")
    response = subprocess.run(["node", "-e", """
        fetch(process.argv[1], {signal:AbortSignal.timeout(30000)})
          .then(async r => console.log(JSON.stringify({
            url:r.url,status:r.status,html:await r.text()
          }))).catch(e=>{console.error(e.message);process.exitCode=1;});
    """, args.url], check=True, capture_output=True, text=True, timeout=40)
    fetched = json.loads(response.stdout)
    if urlparse(fetched["url"]).netloc not in allowed:
        raise ValueError("Redirect outside allowed official hosts")
    parsed = Source()
    parsed.feed(fetched["html"])
    report = {
        "requestedUrl": args.url, "resolvedUrl": fetched["url"],
        "httpStatus": fetched["status"],
        "retrievedAt": datetime.now(timezone.utc).isoformat(),
        "htmlSha256": hashlib.sha256(fetched["html"].encode()).hexdigest(),
        "headings": parsed.headings,
        "text": "\n".join(line.strip() for line in "".join(parsed.text).splitlines() if line.strip()),
        "images": parsed.images,
        "links": sorted(set(parsed.links)),
        "identityVerdict": "PENDING_MANUAL_REVIEW",
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    with args.out.open("x", encoding="utf-8") as output:
        json.dump(report, output, ensure_ascii=False, indent=2)
    print(json.dumps({"status": report["httpStatus"], "headings": report["headings"][:12],
                      "images": len(report["images"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()
