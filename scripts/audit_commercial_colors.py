# -*- coding: utf-8 -*-
import urllib.request
import re
import json

def get_page_info(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            text = resp.read().decode("utf-8", errors="ignore")
        
        # Look for swatch or option colors
        colors = set(re.findall(r'[\"\'\s](亮铂金|典雅黑|典黑|砂岩金|沙漫金|宝石蓝|森野绿|碧海青|罗兰紫|冰晶蓝|暗钛灰|石墨灰|白金)[\"\'\s]', text))
        
        # Look for configured prices
        prices = set(re.findall(r'¥\s*[\d,]+', text))
        
        # Look for title
        m_title = re.search(r'<title>(.*?)</title>', text, re.I)
        title = m_title.group(1).strip() if m_title else ""
        
        return {
            "title": title,
            "colors": list(colors),
            "prices": sorted(list(prices), key=lambda x: int(re.sub(r'[^\d]', '', x) or 0))[:5]
        }
    except Exception as e:
        return {"error": str(e)}

urls = {
    "pro_12th_intel_biz": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business",
    "pro_12th_snap_biz": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon",
    "laptop_8th_intel_biz": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business",
    "laptop_8th_snap_biz": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon",
    "pro_10_biz": "https://www.microsoftstore.com.cn/surface/surface-pro-10-for-business",
    "laptop_6_biz": "https://www.microsoftstore.com.cn/surface/surface-laptop-6-for-business",
    "pro_12_inch": "https://www.microsoftstore.com.cn/configure/surface-pro-12-inch",
    "pro_11_consumer": "https://www.microsoftstore.com.cn/surface/surface-pro"
}

results = {}
for k, u in urls.items():
    results[k] = get_page_info(u)

with open("scripts/commercial_color_audit.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Finished commercial_color_audit.json")
