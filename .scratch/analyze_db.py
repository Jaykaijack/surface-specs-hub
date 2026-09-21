import json
import re
from collections import Counter

with open('js/surface-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# strip JS declaration: const SURFACE_DATA = { ... };
# find first { and last }
start = text.find('{')
end = text.rfind('}')
json_str = text[start:end+1]

data = json.loads(json_str)

devices = data.get('devices', [])
print(f'Total devices in SURFACE_DATA.devices: {len(devices)}')

print('\n=== COUNTS BY LINE ===')
print(Counter(d.get('line') for d in devices))

print('\n=== COUNTS BY SERIES ===')
print(Counter(d.get('series') for d in devices))

print('\n=== CONSUMER DEVICES BY SERIES ===')
for s in ['pro', 'laptop', 'sls', 'book', 'go', 'laptopgo', 'studio', 'duo']:
    s_devs = [d for d in devices if d.get('line') == 'consumer' and d.get('series') == s]
    print(f'-- Series: {s} ({len(s_devs)}) --')
    for d in s_devs:
        print(f"   {d['id']}: {d['name']} | Colors: {d.get('colors')} | Price: {d.get('startingPrice')} | Link: {d.get('sourceUrl')}")

print('\n=== BUSINESS DEVICES BY SERIES ===')
for s in ['pro', 'laptop', 'sls', 'book', 'go', 'laptopgo', 'studio', 'duo']:
    s_devs = [d for d in devices if d.get('line') == 'business' and d.get('series') == s]
    print(f'-- Series: {s} ({len(s_devs)}) --')
    for d in s_devs:
        print(f"   {d['id']}: {d['name']} | Colors: {d.get('colors')} | Price: {d.get('startingPrice')} | Link: {d.get('sourceUrl')}")

with open('.scratch/parsed_devices.json', 'w', encoding='utf-8') as out:
    json.dump(devices, out, ensure_ascii=False, indent=2)
