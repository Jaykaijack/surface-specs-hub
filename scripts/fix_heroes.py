import re

file_path = "../js/surface-data.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

model_hero_map = {
    # Pro
    'pro-12-13': './assets/products/surface-new-pro-hero.png',
    'pro-11-13': './assets/products/surface-new-pro-hero.png',
    'pro-10-biz': './assets/products/surface-pro-13-platinum.png',
    'pro-9': './assets/products/surface-pro-9-hero.jpg',
    'pro-8': './assets/products/surface-pro-9-hero.jpg',
    'pro-7-plus': './assets/products/surface-pro-9-hero.jpg',
    'pro-7': './assets/products/surface-pro-9-hero.jpg',
    'pro-6': './assets/products/surface-pro-9-hero.jpg',
    'pro-5': './assets/products/surface-pro-9-hero.jpg',
    'pro-4': './assets/products/surface-pro-9-hero.jpg',
    'pro-3': './assets/products/surface-pro-9-hero.jpg',
    'pro-2': './assets/products/surface-pro-9-hero.jpg',
    'pro-1': './assets/products/surface-pro-9-hero.jpg',
    'pro-x': './assets/products/surface-pro-13-black.png',
    
    # Laptop
    'laptop-8-138': './assets/products/surface-new-laptop-hero.png',
    'laptop-8-150': './assets/products/surface-new-laptop-hero.png',
    'laptop-7-138': './assets/products/surface-new-laptop-hero.png',
    'laptop-6-biz': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-5': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-4': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-3': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-2': './assets/products/surface-laptop-5-hero.jpg',
    'laptop-1': './assets/products/surface-laptop-5-hero.jpg',
    
    # SLS
    'sls-2': './assets/products/surface-laptop-studio-2-hero.jpg',
    'sls-1': './assets/products/surface-laptop-studio-2-hero.jpg',
    
    # Laptop Go
    'laptop-go-3': './assets/products/surface-laptop-go-3-hero.jpg',
    'laptop-go-2': './assets/products/surface-laptop-go-3-hero.jpg',
    'laptop-go-1': './assets/products/surface-laptop-go-3-hero.jpg',
    
    # Studio & Hub
    'studio-2-plus': './assets/products/surface-studio-2-plus-hero.jpg',
    'studio-2': './assets/products/surface-studio-2-plus-hero.jpg',
    'studio-1': './assets/products/surface-studio-2-plus-hero.jpg',
    'hub-2s': './assets/products/surface-studio-2-plus-hero.jpg',
    
    # Book
    'book-3-15': './assets/products/surface-book-hero.jpg',
    'book-3-135': './assets/products/surface-book-hero.jpg',
    'book-2-15': './assets/products/surface-book-hero.jpg',
    'book-1': './assets/products/surface-book-hero.jpg',
    
    # Go
    'go-4': './assets/products/surface-go-hero.jpg',
    'go-3': './assets/products/surface-go-hero.jpg',
    'go-2': './assets/products/surface-go-hero.jpg',
    'go-1': './assets/products/surface-go-hero.jpg',
    
    # Duo
    'duo-2': './assets/products/surface-duo-hero.jpg',
    'duo-1': './assets/products/surface-duo-hero.jpg'
}

for dev_id, img_path in model_hero_map.items():
    # replace heroImage for this specific dev_id
    pat = rf"(id:\s*['\"]{re.escape(dev_id)}['\"],\s*\n\s*categoryId:\s*['\"][^'\"]+['\"],\s*\n\s*)heroImage:\s*['\"][^'\"]+['\"],"
    repl = rf"\g<1>heroImage: '{img_path}',"
    content = re.sub(pat, repl, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated all 42 device heroImages correctly!")
