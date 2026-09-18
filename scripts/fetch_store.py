import urllib.request
import re
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls_to_check = [
    "https://www.microsoftstore.com.cn/",
    "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition",
    "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition",
    "https://www.microsoft.com/en-us/d/surface-pro-11th-edition/8txld2mgfqxm",
    "https://www.microsoft.com/en-us/d/surface-laptop-7th-edition/8tq2hq5p46sv"
]

found_images = {}

for page_url in urls_to_check:
    print("Checking:", page_url)
    req = urllib.request.Request(page_url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            html = resp.read().decode("utf-8", "ignore")
            # find images
            imgs = re.findall(r'https://[^\s"\'<>]+\.(?:png|jpg|jpeg|webp)', html)
            for img in imgs:
                img_lower = img.lower()
                if "surface" in img_lower or "product" in img_lower or "highlight" in img_lower:
                    if img not in found_images:
                        found_images[img] = page_url
                        print("  [IMG]", img)
    except Exception as e:
        print("  Error fetching", page_url, ":", e)

print(f"Total unique Surface images found: {len(found_images)}")
with open("found_images.json", "w", encoding="utf-8") as f:
    json.dump(found_images, f, indent=2)
