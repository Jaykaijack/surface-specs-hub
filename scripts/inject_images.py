import os
import re

data_path = r"c:\Users\12009\OneDrive\Antigravity\project-66-douyin\surface-specs-hub\js\surface-data.js"
with open(data_path, "r", encoding="utf-8") as f:
    content = f.read()

# Category-specific default hero images
series_hero_map = {
    'pro': './assets/products/surface-new-pro-hero.png',
    'laptop': './assets/products/surface-new-laptop-hero.png',
    'sls': './assets/products/surface-laptop-studio-2-hero.jpg',
    'laptopgo': './assets/products/surface-laptop-go-3-hero.jpg',
    'studio': './assets/products/surface-studio-2-plus-hero.jpg',
    'book': './assets/products/surface-book-hero.jpg',
    'go': './assets/products/surface-go-hero.jpg',
    'duo': './assets/products/surface-duo-hero.jpg'
}

# Specific model hero images
model_hero_map = {
    'pro-12-13': './assets/products/surface-new-pro-hero.png',
    'pro-11-13': './assets/products/surface-new-pro-hero.png',
    'pro-10-13': './assets/products/surface-pro-13-platinum.png',
    'pro-9-13': './assets/products/surface-pro-9-hero.jpg',
    'laptop-8-138': './assets/products/surface-new-laptop-hero.png',
    'laptop-8-15': './assets/products/surface-new-laptop-hero.png',
    'laptop-7-138': './assets/products/surface-new-laptop-hero.png',
    'laptop-7-15': './assets/products/surface-new-laptop-hero.png',
    'laptop-6-135': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-6-15': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-5-135': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-5-15': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-go-3': './assets/products/surface-laptop-go-3-hero.jpg',
    'sls-2': './assets/products/surface-laptop-studio-2-hero.jpg',
    'studio-2-plus': './assets/products/surface-studio-2-plus-hero.jpg',
    'book-3-15': './assets/products/surface-book-hero.jpg',
    'go-4': './assets/products/surface-go-hero.jpg',
    'duo-2': './assets/products/surface-duo-hero.jpg'
}

# Color image maps for Pro and Laptop
pro_color_images = {
    '亮铂金': './assets/products/surface-pro-13-platinum.png',
    '典黑': './assets/products/surface-pro-13-black.png',
    '宝石蓝': './assets/products/surface-pro-13-sapphire.png',
    '砂岩金': './assets/products/surface-pro-13-dune.png',
    '森绿': './assets/products/surface-laptop-sage.png',
    '翡翠绿': './assets/products/surface-laptop-sage.png',
    '波比红': './assets/products/surface-pro-13-platinum.png'
}

laptop_color_images = {
    '亮铂金': './assets/products/surface-laptop-platinum.png',
    '典黑': './assets/products/surface-laptop-black.png',
    '宝石蓝': './assets/products/surface-laptop-sapphire.png',
    '砂岩金': './assets/products/surface-laptop-dune.png',
    '仙踪绿': './assets/products/surface-laptop-sage.png',
    '海湾绿': './assets/products/surface-laptop-sage.png',
    '冰晶蓝': './assets/products/surface-laptop-sapphire.png',
    '灰绿': './assets/products/surface-laptop-sage.png'
}

# We can replace in JS:
# 1. Add heroImage to each device if not present
def add_hero_images(match):
    full = match.group(0)
    dev_id = match.group(1)
    cat_id = match.group(2)
    
    hero = model_hero_map.get(dev_id, series_hero_map.get(cat_id, './assets/products/surface-new-pro-hero.png'))
    if 'heroImage:' in full:
        return full
    
    return full + f"\n      heroImage: '{hero}',"

# Pattern to find device start
pattern = r"(id:\s*['\"]([a-z0-9\-]+)['\"],\s*\n\s*categoryId:\s*['\"]([a-z0-9\-]+)['\"],)"
updated_content = re.sub(pattern, add_hero_images, content)

# 2. Update color arrays to include 'image' field
def color_replacer(match):
    block = match.group(0)
    
    # Process each { name: '...', hex: '...' }
    def item_replacer(m):
        item = m.group(0)
        name = m.group(1)
        hex_val = m.group(2)
        
        # Check if image already there
        if 'image:' in item:
            return item
        
        # Find matching image
        img = None
        if name in pro_color_images:
            img = pro_color_images[name]
        elif name in laptop_color_images:
            img = laptop_color_images[name]
        else:
            img = './assets/products/surface-pro-13-platinum.png'
            
        return f"{{ name: '{name}', hex: '{hex_val}', image: '{img}' }}"

    item_pat = r"\{\s*name:\s*['\"]([^'\"]+)['\"]\s*,\s*hex:\s*['\"]([^'\"]+)['\"]\s*\}"
    return re.sub(item_pat, item_replacer, block)

color_block_pat = r"colors:\s*\[[\s\S]*?\]"
updated_content = re.sub(color_block_pat, color_replacer, updated_content)

# 3. Add helper method getDeviceImage to SURFACE_DATA if not present
helper_code = '''
  // 4. 图片与多配色外观助手函数 (PRD 全系真机与多配色展示)
  getDeviceImage(device, colorName = null) {
    if (!device) return './assets/products/surface-new-pro-hero.png';
    if (colorName && device.specs && Array.isArray(device.specs.colors)) {
      const c = device.specs.colors.find(col => col.name === colorName);
      if (c && c.image) return c.image;
    }
    if (device.heroImage) return device.heroImage;
    if (device.specs && Array.isArray(device.specs.colors) && device.specs.colors[0] && device.specs.colors[0].image) {
      return device.specs.colors[0].image;
    }
    const seriesDefaults = {
      pro: './assets/products/surface-new-pro-hero.png',
      laptop: './assets/products/surface-new-laptop-hero.png',
      sls: './assets/products/surface-laptop-studio-2-hero.jpg',
      laptopgo: './assets/products/surface-laptop-go-3-hero.jpg',
      studio: './assets/products/surface-studio-2-plus-hero.jpg',
      book: './assets/products/surface-book-hero.jpg',
      go: './assets/products/surface-go-hero.jpg',
      duo: './assets/products/surface-duo-hero.jpg'
    };
    return seriesDefaults[device.categoryId] || './assets/products/surface-new-pro-hero.png';
  },
'''

if 'getDeviceImage(' not in updated_content:
    # Insert right before devices: [
    updated_content = updated_content.replace('  devices: [', helper_code + '\n  devices: [')

with open(data_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("surface-data.js updated successfully with official images and color maps!")
