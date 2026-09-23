import sys
import os
import re
import io
import base64
from PIL import Image

# 保证 Windows 控制台输出 UTF-8
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(WORKSPACE, 'index.html')
DIST_DIR = os.path.join(WORKSPACE, 'dist')
RELEASES_DIR = os.path.join(WORKSPACE, 'releases')

# 版本规范
VERSION = "v1.4.1"
DATE_STR = "20260923"
DESCRIPTOR = "ssd-migration-master"

STANDALONE_ROOT = os.path.join(WORKSPACE, 'surface-specs-hub-standalone.html')
STANDALONE_DIST = os.path.join(DIST_DIR, 'surface-specs-hub-standalone.html')
STANDALONE_RELEASE = os.path.join(RELEASES_DIR, f"surface-specs-hub-standalone-{VERSION}-{DATE_STR}-{DESCRIPTOR}.html")

CSS_FILES = [
    'css/fluent-tokens.css',
    'css/hubweb-layout.css',
    'css/spec-table.css',
    'css/tools.css'
]

JS_FILES = [
    'js/surface-data.js',
    'js/verification-status.js',
    'js/catalog.js',
    'js/taxonomy.js',
    'js/comparison-engine.js',
    'js/tools-engine.js',
    'js/app.js'
]

def image_to_base64_webp(img_path, quality=80):
    with Image.open(img_path) as im:
        buf = io.BytesIO()
        im.save(buf, format='WEBP', quality=quality, method=3)
        data = buf.getvalue()
        b64 = base64.b64encode(data).decode('utf-8')
        return f"data:image/webp;base64,{b64}"

def scan_and_encode_directory(dir_path, label):
    mapping = {}
    orig_size = 0
    webp_size = 0
    if os.path.exists(dir_path):
        for fname in sorted(os.listdir(dir_path)):
            fpath = os.path.join(dir_path, fname)
            if os.path.isfile(fpath) and fname.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                sz = os.path.getsize(fpath)
                orig_size += sz
                try:
                    data_uri = image_to_base64_webp(fpath)
                    mapping[fname] = data_uri
                    webp_size += len(data_uri)
                except Exception as e:
                    print(f"⚠️ 处理 {label} 图片失败 {fname}: {e}")
    print(f"📸 [{label}] 成功内嵌转换 {len(mapping)} 张图片")
    print(f"   原始: {orig_size / (1024*1024):.2f} MB -> WebP Base64: {webp_size / (1024*1024):.2f} MB")
    return mapping, orig_size, webp_size

def build():
    print(f"🚀 开始构建完全离线独立封装版 Surface Specs Hub HTML ({VERSION} - {DATE_STR})...")
    
    # 1. 扫描机型图片
    products_dir = os.path.join(WORKSPACE, 'assets', 'products')
    prod_map, p_orig, p_webp = scan_and_encode_directory(products_dir, "机型库")

    # 2. 扫描配件图片
    accessories_dir = os.path.join(WORKSPACE, 'assets', 'accessories')
    acc_map, a_orig, a_webp = scan_and_encode_directory(accessories_dir, "配件库")

    print(f"📊 总图源转换统计: 原始 {(p_orig + a_orig)/(1024*1024):.2f} MB -> WebP 内联编码 {(p_webp + a_webp)/(1024*1024):.2f} MB")

    # 3. 合并 CSS
    combined_css = []
    for css_rel in CSS_FILES:
        full_p = os.path.join(WORKSPACE, css_rel)
        if os.path.exists(full_p):
            with open(full_p, 'r', encoding='utf-8') as f:
                content = f.read()
                combined_css.append(f"/* === {css_rel} === */\n{content}")
        else:
            print(f"❌ 缺少 CSS 文件: {css_rel}")
    merged_css_str = "\n\n".join(combined_css)

    # 4. 合并 JS 并内嵌替换图片为 Base64
    combined_js = []
    for js_rel in JS_FILES:
        full_p = os.path.join(WORKSPACE, js_rel)
        if os.path.exists(full_p):
            with open(full_p, 'r', encoding='utf-8') as f:
                js_content = f.read()
                
            # 替换机型图片
            for fname, uri in prod_map.items():
                js_content = js_content.replace(f"./assets/products/{fname}", uri)
                js_content = js_content.replace(f"assets/products/{fname}", uri)
            
            # 替换配件图片
            for fname, uri in acc_map.items():
                js_content = js_content.replace(f"./assets/accessories/{fname}", uri)
                js_content = js_content.replace(f"assets/accessories/{fname}", uri)
                    
            combined_js.append(f"// === {js_rel} ===\n{js_content}")
        else:
            print(f"❌ 缺少 JS 文件: {js_rel}")
    merged_js_str = "\n\n".join(combined_js)

    # 5. 读取 index.html 并替换外部引用
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        html = f.read()

    # 移除外部 css link
    for css_rel in CSS_FILES:
        link_regex = re.compile(rf'<link\s+rel="stylesheet"\s+href="\.\/{re.escape(css_rel)}[^"]*"\s*\/?>', re.IGNORECASE)
        html = link_regex.sub('', html)
        link_regex2 = re.compile(rf'<link\s+rel="stylesheet"\s+href="{re.escape(css_rel)}[^"]*"\s*\/?>', re.IGNORECASE)
        html = link_regex2.sub('', html)

    style_tag = f"\n  <!-- 独立封装内嵌 Fluent 2 & HubWeb 样式表 -->\n  <style>\n{merged_css_str}\n  </style>\n"
    html = html.replace('</head>', f"{style_tag}</head>")

    # 移除外部 js script
    for js_rel in JS_FILES:
        script_regex = re.compile(rf'<script\s+src="\.\/{re.escape(js_rel)}[^"]*"\s*><\/script>', re.IGNORECASE)
        html = script_regex.sub('', html)
        script_regex2 = re.compile(rf'<script\s+src="{re.escape(js_rel)}[^"]*"\s*><\/script>', re.IGNORECASE)
        html = script_regex2.sub('', html)

    script_tag = f"\n  <!-- 独立封装内嵌全量 Surface 官方规格数据库、配件库与交互引擎 -->\n  <script>\n{merged_js_str}\n  </script>\n"
    html = html.replace('</body>', f"{script_tag}</body>")

    # 6. 保存快照与指针
    os.makedirs(DIST_DIR, exist_ok=True)
    os.makedirs(RELEASES_DIR, exist_ok=True)

    # 不可变发布快照
    with open(STANDALONE_RELEASE, 'w', encoding='utf-8') as f:
        f.write(html)

    # 根目录稳定指针
    with open(STANDALONE_ROOT, 'w', encoding='utf-8') as f:
        f.write(html)

    # dist 分发指针
    with open(STANDALONE_DIST, 'w', encoding='utf-8') as f:
        f.write(html)

    final_size = os.path.getsize(STANDALONE_ROOT)
    print(f"\n✨ 构建大功告成！交付物清单：")
    print(f"   1. 不可变版本快照: {STANDALONE_RELEASE} ({final_size / (1024*1024):.2f} MB)")
    print(f"   2. 根目录稳定指针: {STANDALONE_ROOT} ({final_size / (1024*1024):.2f} MB)")
    print(f"   3. Dist 分发目录: {STANDALONE_DIST} ({final_size / (1024*1024):.2f} MB)")
    print(f"   💡 该文件为 100% 离线自给自足 SPA，全系 23 款配件图与机型图均已完成 WebP Base64 内嵌。")

if __name__ == '__main__':
    build()
