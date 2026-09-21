import re

with open(r'C:\Users\12009\.gemini\antigravity\brain\85082706-0988-417b-9f8e-2c577ba9ab1f\.system_generated\steps\3348\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

prices = re.findall(r'(\d+[\d,]*\.?\d*\s*元|¥\s*\d+[\d,]*|price["\'\s:]+\d+)', text, re.I)
colors = re.findall(r'(亮铂金|典雅黑|典黑|宝石蓝|碧海青|罗兰紫|沙漫金|砂岩金|翡翠绿|森野绿)', text)
skus = re.findall(r'(bundle-\d+-\d+|MIC\d+)', text)

lines = []
lines.append(f'Prices found: {set(prices[:50])}')
lines.append(f'Colors found: {set(colors)}')
lines.append(f'SKUs found: {set(skus)}')

scripts = re.findall(r'<script[^>]*>(.*?)</script>', text, re.DOTALL)
lines.append(f'Total script tags: {len(scripts)}')
for s in scripts:
    if 'bundle-4025' in s or 'snapdragon' in s.lower():
        for l in s.split('\n'):
            if any(k in l.lower() for k in ['price', 'sku', 'productname', 'color', 'specs', 'name']):
                lines.append('  script line: ' + l.strip()[:120])

with open('.scratch/laptop13_extracted.txt', 'w', encoding='utf-8') as out:
    out.write('\n'.join(lines))
print('Written .scratch/laptop13_extracted.txt')
