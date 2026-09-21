import json
import re

# Read current surface-data.js
with open('js/surface-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Verify that pro-12-13 exists and remove 宝石蓝
print("1. Updating pro-12-13...")
pro_colors_target = '''      "colors": [
        {
          "name": "亮铂金",
          "hex": "#d8d8d8",
          "image": "./assets/products/surface-pro-13-platinum.png"
        },
        {
          "name": "典雅黑",
          "hex": "#262626",
          "image": "./assets/products/surface-pro-13-black.png"
        },
        {
          "name": "宝石蓝",
          "hex": "#2f4f7f",
          "image": "./assets/products/surface-pro-13-sapphire.png"
        },
        {
          "name": "沙漫金",
          "hex": "#d2b48c",
          "image": "./assets/products/surface-pro-13-dune.png"
        }
      ],'''

pro_colors_replacement = '''      "colors": [
        {
          "name": "亮铂金",
          "hex": "#d8d8d8",
          "image": "./assets/products/surface-pro-13-platinum.png"
        },
        {
          "name": "典雅黑",
          "hex": "#262626",
          "image": "./assets/products/surface-pro-13-black.png"
        },
        {
          "name": "沙漫金",
          "hex": "#d2b48c",
          "image": "./assets/products/surface-pro-13-dune.png"
        }
      ],'''

if pro_colors_target in content:
    content = content.replace(pro_colors_target, pro_colors_replacement, 1)
    print("  -> pro-12-13 colors updated (removed 宝石蓝, only 3 colors now)")
else:
    print("  -> Warning: pro_colors_target not found!")

# Also fix pro-12-13 specs tagline
pro_tagline_target = '"搭载高通骁龙 X2 平台与酷睿 Ultra 双架构，双层串联 OLED 触控屏与全套绚丽四色"'
pro_tagline_replacement = '"搭载高通骁龙 X2 平台与酷睿 Ultra 双架构，双层串联 OLED 触控屏与经典三色"'
if pro_tagline_target in content:
    content = content.replace(pro_tagline_target, pro_tagline_replacement, 1)
    print("  -> pro-12-13 tagline updated to 经典三色")

# Also update pro-12-13 learnDocUrl to consumer official support
pro_learn_target = '''    "learnDocUrl": "https://learn.microsoft.com/en-us/surface/surface-pro-11th-edition",
    "segment": "consumer"'''
pro_learn_replacement = '''    "learnDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch",
    "segment": "consumer"'''
if pro_learn_target in content:
    content = content.replace(pro_learn_target, pro_learn_replacement, 1)
    print("  -> pro-12-13 link updated to consumer store")

# 2. Updating laptop-8-138 colors: replace 宝石蓝 with 翡翠绿
print("2. Updating laptop-8-138...")
laptop8_colors_target = '''        {
          "name": "宝石蓝",
          "hex": "#2f4f7f",
          "image": "./assets/products/surface-laptop-sapphire.png"
        },'''
laptop8_colors_replacement = '''        {
          "name": "翡翠绿",
          "hex": "#2e6b54",
          "image": "./assets/products/surface-laptop-emerald.png"
        },'''

if laptop8_colors_target in content:
    content = content.replace(laptop8_colors_target, laptop8_colors_replacement, 1)
    print("  -> laptop-8-138 colors updated (replaced 宝石蓝 with 翡翠绿)")
else:
    print("  -> Warning: laptop8_colors_target not found!")

laptop8_tagline_target = '"高通 Snapdragon X2 / 酷睿 Ultra 平台赋能，触觉触控板与绚丽四色"'
laptop8_tagline_replacement = '"高通 Snapdragon X2 / 酷睿 Ultra 平台赋能，触觉触控板与翡翠绿新配色"'
if laptop8_tagline_target in content:
    content = content.replace(laptop8_tagline_target, laptop8_tagline_replacement, 1)
    print("  -> laptop-8-138 tagline updated")

# Write intermediate changes
with open('js/surface-data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated surface-data.js colors and taglines successfully.")
