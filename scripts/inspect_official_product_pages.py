# -*- coding: utf-8 -*-
import urllib.request
import re
import json

urls = [
    "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business",
    "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon",
    "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business",
    "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon"
]

for u in urls:
    print("=" * 60)
    print("Fetching:", u)
    req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
            print("Length:", len(html))
            
            # Find title
            m_title = re.search(r'<title>(.*?)</title>', html, re.I)
            if m_title:
                print("Title:", m_title.group(1).strip())
            
            # Find processor mentions
            procs = re.findall(r'([^<>]{0,50}(?:Ultra|Snapdragon|骁龙|英特尔|酷睿|Core|NPU|TOPS)[^<>]{0,50})', html, re.I)
            print("Processor snippets found:", len(procs))
            unique_procs = list(set([p.strip() for p in procs if len(p.strip()) > 5]))
            for p in sorted(unique_procs)[:15]:
                print("  *", p)
                
            # Find price mentions
            prices = re.findall(r'(¥\s*[\d,]+|\b\d{1,2},\d{3}\b)', html)
            print("Prices found:", set(prices[:10]))
            
            # Find configure link
            conf_links = re.findall(r'href=["\']([^"\']*configur[^"\']*)["\']', html, re.I)
            print("Configure links:", set(conf_links))
            
    except Exception as e:
        print("Error fetching:", e)
