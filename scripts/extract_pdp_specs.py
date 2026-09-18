# -*- coding: utf-8 -*-
import urllib.request
import re
import json
import html

urls = {
    "pro_12th_intel": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business",
    "pro_12th_snapdragon": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon",
    "laptop_8th_intel": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business",
    "laptop_8th_snapdragon": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon"
}

results = {}

for key, u in urls.items():
    req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read().decode("utf-8", errors="ignore")
        
        # Meta description
        m_desc = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.I)
        desc = m_desc.group(1) if m_desc else ""
        
        # Title
        m_title = re.search(r'<title>(.*?)</title>', content, re.I)
        title = m_title.group(1) if m_title else ""
        
        # Starting price
        prices = re.findall(r'[\"\'\s>](¥\s*[\d,]+)', content)
        
        # Look for script tag with spConfig or product data
        sp_match = re.search(r'data-role="priceBox"[^>]*>.*?<span class="price">(.*?)</span>', content, re.S)
        price_box = sp_match.group(1) if sp_match else ""
        
        results[key] = {
            "url": u,
            "title": html.unescape(title),
            "description": html.unescape(desc),
            "prices": list(set(prices))[:5],
            "price_box": price_box.strip()
        }

with open("scripts/official_pdp_specs.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Saved official_pdp_specs.json successfully")
