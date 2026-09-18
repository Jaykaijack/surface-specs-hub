with open("../js/surface-data.js", "r", encoding="utf-8") as f:
    text = f.read()

import re
matches = re.findall(r"id:\s*['\"]([^'\"]+)['\"]\s*,\s*\n\s*categoryId:\s*['\"]([^'\"]+)['\"]", text)
print("Found matches:", len(matches))
for m in matches:
    print(f"  {m[1]:10} -> {m[0]}")
