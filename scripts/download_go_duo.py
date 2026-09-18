import os
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

target_dir = r"c:\Users\12009\OneDrive\Antigravity\project-66-douyin\surface-specs-hub\assets\products"

extra_images = {
    "surface-go-hero.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/fe/SurfaceGo1.jpg",
    "surface-duo-hero.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/16/Surface_Duo_2_-_1.jpg"
}

headers = {"User-Agent": "SurfaceSpecsHub/1.0 (admin@surfacespecshub.local)"}

for filename, url in extra_images.items():
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
