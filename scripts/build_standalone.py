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
STANDALONE_ROOT = os.path.join(WORKSPACE, 'surface-specs-hub-standalone.html')
STANDALONE_DIST = os.path.join(DIST_DIR, 'surface-specs-hub-standalone.html')

CSS_FILES = [
    'css/fluent-tokens.css',
    'css/hubweb-layout.css',
    'css/spec-table.css',
    'css/tools.css'
]

JS_FILES = [
    'js/surface-data.js',
    'js/comparison-engine.js',
    'js/tools-engine.js',
    'js/app.js'
]

def image_to_base64_webp(img_path, quality=85):
    with Image.open(img_path) as im:
        buf = io.BytesIO()
        im.save(buf, format='WEBP', quality=quality, method=6)
        data = buf.getvalue()
        b64 = base64.b64encode(data).decode('utf-8')
        return f"data:image/webp;base64,{b64}"

def build():
    print("🚀 开始构建完全离线独立封装版 Surface Specs Hub HTML...")
    
    assets_dir = os.path.join(WORKSPACE, 'assets', 'products')
    image_map = {}
    total_orig_size = 0
    total_webp_size = 0

    if os.path.exists(assets_dir):
        for fname in os.listdir(assets_dir):
            fpath = os.path.join(assets_dir, fname)
            if os.path.isfile(fpath) and fname.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                orig_sz = os.path.getsize(fpath)
                total_orig_size += orig_sz
                try:
                    data_uri = image_to_base64_webp(fpath)
                    image_map[fname] = data_uri
                    total_webp_size += len(data_uri)
                except Exception as e:
                    print(f"⚠️ 处理图片失败 {fname}: {e}")

    print(f"📸 成功内嵌转换 {len(image_map)} 张官方机型图片")
    print(f"   原始体积: {total_orig_size / (1024*1024):.2f} MB -> WebP Base64 编码体积: {total_webp_size / (1024*1024):.2f} MB")

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

    combined_js = []
    for js_rel in JS_FILES:
        full_p = os.path.join(WORKSPACE, js_rel)
        if os.path.exists(full_p):
            with open(full_p, 'r', encoding='utf-8') as f:
                js_content = f.read()
                
            if 'surface-data.js' in js_rel:
                for fname, uri in image_map.items():
                    pattern1 = f"./assets/products/{fname}"
                    pattern2 = f"assets/products/{fname}"
                    js_content = js_content.replace(pattern1, uri)
                    js_content = js_content.replace(pattern2, uri)
                    
            combined_js.append(f"// === {js_rel} ===\n{js_content}")
        else:
            print(f"❌ 缺少 JS 文件: {js_rel}")
    merged_js_str = "\n\n".join(combined_js)

    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        html = f.read()

    for css_rel in CSS_FILES:
        link_regex = re.compile(rf'<link\s+rel="stylesheet"\s+href="\.\/{re.escape(css_rel)}"\s*\/?>', re.IGNORECASE)
        html = link_regex.sub('', html)
        link_regex2 = re.compile(rf'<link\s+rel="stylesheet"\s+href="{re.escape(css_rel)}"\s*\/?>', re.IGNORECASE)
        html = link_regex2.sub('', html)

    style_tag = f"\n  <!-- 独立封装内嵌 Fluent 2 & HubWeb 样式表 -->\n  <style>\n{merged_css_str}\n  </style>\n"
    html = html.replace('</head>', f"{style_tag}</head>")

    for js_rel in JS_FILES:
        script_regex = re.compile(rf'<script\s+src="\.\/{re.escape(js_rel)}"\s*><\/script>', re.IGNORECASE)
        html = script_regex.sub('', html)
        script_regex2 = re.compile(rf'<script\s+src="{re.escape(js_rel)}"\s*><\/script>', re.IGNORECASE)
        html = script_regex2.sub('', html)

    script_tag = f"\n  <!-- 独立封装内嵌全量 Surface 官方规格数据库与对比交互引擎 -->\n  <script>\n{merged_js_str}\n  </script>\n"
    html = html.replace('</body>', f"{script_tag}</body>")

    os.makedirs(DIST_DIR, exist_ok=True)
    with open(STANDALONE_ROOT, 'w', encoding='utf-8') as f:
        f.write(html)
    with open(STANDALONE_DIST, 'w', encoding='utf-8') as f:
        f.write(html)

    final_size = os.path.getsize(STANDALONE_ROOT)
    print(f"✨ 构建成功！独立单文件已输出至：")
    print(f"   1. 根目录主交付物: {STANDALONE_ROOT} ({final_size / (1024*1024):.2f} MB)")
    print(f"   2. 分发目录: {STANDALONE_DIST} ({final_size / (1024*1024):.2f} MB)")
    print(f"   该文件为 100% 自包含单文件，双击即可在任何现代浏览器中完整秒开、零联网依赖。")

if __name__ == '__main__':
    build()
