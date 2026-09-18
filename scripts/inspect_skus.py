# -*- coding: utf-8 -*-
import urllib.request
import re
import json

url_intel = "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business"
url_snap = "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon"

def get_config_details(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        text = resp.read().decode("utf-8", errors="ignore")
        
    # Extract spConfig or product options JSON
    sp_matches = re.findall(r'jsonConfig":\s*(\{.*?\})\s*,\s*"', text)
    if not sp_matches:
        sp_matches = re.findall(r'"spConfig":\s*(\{.*?\})\s*,\s*"', text)
    
    # Also find all SKU names and configurations in the page
    skus = re.findall(r'["\']name["\']:\s*["\']([^"\']*(?:Ultra|Snapdragon|Pro|Laptop|16GB|32GB|256GB|512GB|1TB)[^"\']*)["\']', text)
    
    # Also find prices
    prices = re.findall(r'¥\s*[\d,]+', text)
    
    # Also find configurate link
    conf = re.findall(r'href=["\']([^"\']*configur[^"\']*)["\']', text)
    
    return {
        "skus": list(set(skus))[:20],
        "prices": sorted(list(set(prices)), key=lambda x: int(re.sub(r'[^\d]', '', x) or 0)),
        "configure_links": list(set(conf))
    }

print("Intel Pro 12th details:")
d_intel = get_config_details(url_intel)
print("SKUs:", json.dumps(d_intel["skus"], ensure_ascii=False, indent=2))
print("Prices:", d_intel["prices"])
print("Config links:", d_intel["configure_links"])

print("\nSnapdragon Pro 12th details:")
d_snap = get_config_details(url_snap)
print("SKUs:", json.dumps(d_snap["skus"], ensure_ascii=False, indent=2))
print("Prices:", d_snap["prices"])
print("Config links:", d_snap["configure_links"])
