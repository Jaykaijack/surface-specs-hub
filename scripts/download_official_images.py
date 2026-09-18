import os
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

target_dir = r"c:\Users\12009\OneDrive\Antigravity\project-66-douyin\surface-specs-hub\assets\products"
os.makedirs(target_dir, exist_ok=True)

images_to_download = {
    # Surface Pro 13 Colors
    "surface-pro-13-platinum.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/G75w7C6w-00000/14_eSMRXsZC_ProductCompareTable/13inch_plat.png",
    "surface-pro-13-black.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/G75w7C6w-00000/14_eSMRXsZC_ProductCompareTable/13inch_black.png",
    "surface-pro-13-sapphire.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/G75w7C6w-00000/14_eSMRXsZC_ProductCompareTable/13inch_blue.png",
    "surface-pro-13-dune.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/G75w7C6w-00000/14_eSMRXsZC_ProductCompareTable/13inch_golden.png",
    
    # Surface Laptop Colors
    "surface-laptop-platinum.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/Sequioa-00000/12_xqojnrOv_ProductCompareTable/Desktop_Product-Comparison-Table_13.8-Inch_plat_1920x1080_250417.png",
    "surface-laptop-black.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/Sequioa-00000/12_xqojnrOv_ProductCompareTable/Desktop_Product-Comparison-Table_13.8-Inch_black_1920x1080_250417.png",
    "surface-laptop-dune.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/Sequioa-00000/12_xqojnrOv_ProductCompareTable/Desktop_Product-Comparison-Table_13.8-Inch_gloden_1920x1080_250417.png",
    "surface-laptop-sapphire.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/Sequioa-00000/12_xqojnrOv_ProductCompareTable/Desktop_Product-Comparison-Table_13.8Inch_blue_1920x1080_250417.png",
    "surface-laptop-sage.png": "https://cdn.microsoftstore.com.cn/media/product_long_description/A7K2-00000/12_xqojnrOv_ProductCompareTable/Desktop_Product-Comparison-Table_13.8Inch_green_1920x1080_202605.png",
    
    # Product Line Heroes
    "surface-new-pro-hero.png": "https://cdn.microsoftstore.com.cn/media/category/surface/20260727surfacenewpro.png",
    "surface-new-laptop-hero.png": "https://cdn.microsoftstore.com.cn/media/category/surface/20260727surfacenewlaptop.png",
    "surface-pro-9-hero.jpg": "https://cdn.microsoftstore.com.cn/media/category/surface/240722_sp9_pc.jpg",
    "surface-laptop-5-hero.jpg": "https://cdn.microsoftstore.com.cn/media/category/surface/240722_lp5_pc.jpg",
    "surface-laptop-go-3-hero.jpg": "https://cdn.microsoftstore.com.cn/media/category/surface/240722lpgo3_pc.jpg",
    "surface-studio-2-plus-hero.jpg": "https://cdn.microsoftstore.com.cn/media/category/surface/240722studio2plus_pc.jpg",
    "surface-laptop-studio-2-hero.jpg": "https://cdn.microsoftstore.com.cn/media/category/surface/250717lps2_pc.jpg",
    "surface-pro-banner.jpg": "https://cdn.microsoftstore.com.cn/media/category/surface/260825_surfacecp1_pro13.jpg",
    "surface-laptop-banner.jpg": "https://cdn.microsoftstore.com.cn/media/category/surface/260825_surfacecp2_laptop13.jpg"
}

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

for filename, url in images_to_download.items():
    filepath = os.path.join(target_dir, filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            data = resp.read()
            with open(filepath, "wb") as out_f:
                out_f.write(data)
            print(f"  Saved {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"  Error downloading {filename}: {e}")

print("Download finished!")
