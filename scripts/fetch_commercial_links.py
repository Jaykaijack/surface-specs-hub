# -*- coding: utf-8 -*-
import urllib.request
import re
import json

def fetch_commercial():
    url = "https://www.microsoftstore.com.cn/commercial"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
            print(f"Fetched {url}, length: {len(html)}")
            
            # Find links
            links = re.findall(r'href=["\']([^"\']+)["\']', html)
            surface_links = set()
            for l in links:
                if any(k in l.lower() for k in ["surface", "configure", "commercial", "pro", "laptop"]):
                    surface_links.add(l)
            
            print(f"Found {len(surface_links)} relevant links:")
            for l in sorted(surface_links):
                print(" ", l)

            # Find product titles or names in the HTML
            titles = re.findall(r'<div[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)</div>', html, re.I)
            print("\nTitles found:", len(titles))
            for t in titles[:20]:
                cleaned = re.sub(r'<[^>]+>', '', t).strip()
                if cleaned:
                    print("  -", cleaned)

    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    fetch_commercial()
