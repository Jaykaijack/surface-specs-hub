# -*- coding: utf-8 -*-
import urllib.request
import re
import json

url = "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
with urllib.request.urlopen(req, timeout=15) as resp:
    html_text = resp.read().decode("utf-8", errors="ignore")

# Find tech specs section
# Usually contains 'tech-specs' or accordion or table
specs_blocks = re.findall(r'<div[^>]*class="[^"]*(?:tech-specs|specification|spec-item|product-attribute)[^"]*"[^>]*>(.*?)</div>', html_text, re.S | re.I)
print("Found specs blocks:", len(specs_blocks))

# Let's search for "处理器" or "CPU" or "Ultra"
matches = re.findall(r'([^<>\n]{2,40}(?:处理器|英特尔|Ultra|酷睿|Core|NPU|电池|内存|存储|显示屏|屏幕)[^<>\n]{2,60})', html_text)
print("Text matches:", len(matches))
unique_m = list(set([m.strip() for m in matches if len(m.strip()) > 5]))
for m in sorted(unique_m)[:40]:
    print(" -", m)

# Let's check for JSON in script tags (e.g. spConfig or product data)
scripts = re.findall(r'<script[^>]*type="text/x-magento-init"[^>]*>(.*?)</script>', html_text, re.S)
print("Magento scripts:", len(scripts))
for s in scripts:
    if "spConfig" in s or "price" in s:
        print("Found config script snippet:")
        print(s[:500])
        break
