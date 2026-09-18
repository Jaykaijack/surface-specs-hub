import urllib.request
import re
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    'https://www.microsoftstore.com.cn/surface/surface-laptop-studio-2',
    'https://www.microsoftstore.com.cn/surface/surface-laptop-go-3',
    'https://www.microsoftstore.com.cn/surface/surface-go-4-for-business',
    'https://www.microsoftstore.com.cn/surface/surface-studio-2-plus',
    'https://www.microsoftstore.com.cn/surface',
    'https://www.microsoftstore.com.cn/surface/accessories'
]

results = {}
for u in urls:
    print("Fetching:", u)
    req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            html = resp.read().decode('utf-8', 'ignore')
            imgs = re.findall(r'https://cdn\.microsoftstore\.com\.cn/[^\s"\'<>]+\.(?:png|jpg|jpeg|webp)', html)
            for img in imgs:
                clean = img.replace('\\', '').split('?')[0]
                results[clean] = u
    except Exception as e:
        print('Error:', u, e)

print(f"Total collected: {len(results)}")
with open('more_images.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)
