# -*- coding: utf-8 -*-
import urllib.request
import re
import json

url = "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-configurate#bundletype=10&main=MIC4136&required=MIC3881"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        text = resp.read().decode("utf-8", errors="ignore")
        
    print("Fetched configurate, length:", len(text))
    # Look for options or JSON configs
    configs = re.findall(r'(\bUltra\s*[57]\b[^\<\>\"]{0,100})', text)
    print("Ultra mentions:", set(configs))
    
    # Check all price points
    prices = re.findall(r'¥\s*[\d,]+', text)
    print("Prices:", set(prices))
    
    # Check script tags with json data
    jsons = re.findall(r'var\s+spConfig\s*=\s*(\{.*?\});', text)
    if jsons:
        print("Found spConfig var!")
    else:
        # Search for magento json
        m = re.findall(r'"jsonConfig":\s*(\{.*?\})\s*,\s*"', text)
        print("jsonConfig count:", len(m))
        if m:
            data = json.loads(m[0])
            print("Attributes in jsonConfig:", list(data.get("attributes", {}).keys()))
except Exception as e:
    print("Error:", e)
