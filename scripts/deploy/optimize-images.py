#!/usr/bin/env python3
"""Build delivery images from the master files in assets/.

Masters stay where they are. The site asks the browser for one AVIF or WebP
at the width of the real layout slot, not the original 1600px PNG.

Slots (CSS pixels, then 2x/3x):
  icon / audit / guide  -> 320
  card / comparison     -> 640
  detail hero           -> 1280

Images already smaller than a slot are not enlarged.
"""

import json
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ASSET_DIRS = ("assets/products", "assets/accessories")
OUT_ROOT = os.path.join(ROOT, "assets", "delivery")
MANIFEST_JS = os.path.join(ROOT, "js", "image-delivery.js")
CAPS = (320, 640, 1280)
# Product cutouts keep an alpha channel. 60 / 85 sit at the careful end of
# the AVIF 45-65 and WebP 75-85 ranges after checking a tablet, a laptop
# and a portrait accessory.
AVIF_QUALITY = 60
WEBP_QUALITY = 85


def chosen_widths(src_w):
    widths = [w for w in CAPS if w <= src_w]
    if not widths:
        return [src_w]
    if widths[-1] < src_w and src_w < CAPS[-1] and src_w - widths[-1] > 40:
        widths.append(src_w)
    return widths


def open_image(path):
    im = Image.open(path)
    im.load()
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    if has_alpha:
        if im.mode == "RGBA":
            ext = im.getextrema()
            if ext[3][0] == 255 and ext[3][1] == 255:
                return im.convert("RGB"), False
        return im.convert("RGBA"), True
    return im.convert("RGB"), False


def save_variant(im, width, dest_webp, dest_avif, stem):
    nw = width
    nh = max(1, round(im.height * nw / im.width))
    out = im if im.width == nw else im.resize((nw, nh), Image.Resampling.LANCZOS)
    os.makedirs(os.path.dirname(dest_webp), exist_ok=True)
    os.makedirs(os.path.dirname(dest_avif), exist_ok=True)

    dest_dir = os.path.dirname(dest_webp)
    is_card_or_thumb = "w640" in dest_dir or "w320" in dest_dir
    is_wide_hero = not is_card_or_thumb and ("w1280" in dest_dir or "w1080" in dest_dir or "w960" in dest_dir or "hero" in stem.lower())
    budget_bytes = 120 * 1024 if is_wide_hero else 40 * 1024

    q = 80
    while q >= 25:
        webp_kwargs = {"format": "WEBP", "quality": q, "method": 6}
        if out.mode == "RGBA":
            webp_kwargs["alpha_quality"] = 80 if q < 65 else 100
        out.save(dest_webp, **webp_kwargs)
        if os.path.getsize(dest_webp) <= budget_bytes:
            break
        q -= 5

    out.save(dest_avif, format="AVIF", quality=AVIF_QUALITY, speed=6)
    if out.mode == "RGBA":
        for check in (dest_webp, dest_avif):
            probe = Image.open(check)
            if probe.mode != "RGBA":
                raise RuntimeError("alpha lost: " + check)


import concurrent.futures

def process_single_image(src):
    name = os.path.basename(src)
    stem = os.path.splitext(name)[0]
    im, _alpha = open_image(src)
    widths = chosen_widths(im.width)
    made = []
    for width in widths:
        webp = os.path.join(OUT_ROOT, "webp", "w%d" % width, stem + ".webp")
        avif = os.path.join(OUT_ROOT, "avif", "w%d" % width, stem + ".avif")
        dest_dir = os.path.dirname(webp)
        is_card_or_thumb = "w640" in dest_dir or "w320" in dest_dir
        is_wide_hero = not is_card_or_thumb and ("w1280" in dest_dir or "w1080" in dest_dir or "w960" in dest_dir or "hero" in stem.lower())
        budget_bytes = 120 * 1024 if is_wide_hero else 40 * 1024

        fresh = (
            os.path.isfile(webp)
            and os.path.isfile(avif)
            and os.path.getsize(webp) > 0
            and os.path.getsize(webp) <= budget_bytes
            and os.path.getsize(avif) > 0
            and os.path.getmtime(webp) >= os.path.getmtime(src)
            and os.path.getmtime(avif) >= os.path.getmtime(src)
        )
        if not fresh:
            save_variant(im, width, webp, avif, stem)
        made.append(width)
    return name, made


def main():
    masters = []
    for rel_dir in ASSET_DIRS:
        folder = os.path.join(ROOT, rel_dir)
        if not os.path.isdir(folder):
            continue
        for name in sorted(os.listdir(folder)):
            if not name.lower().endswith((".png", ".jpg", ".jpeg")):
                continue
            masters.append(os.path.join(folder, name))

    table = {}
    print(f"🚀 开始多核并行处理 {len(masters)} 张主图...")
    with concurrent.futures.ProcessPoolExecutor() as executor:
        futures = {executor.submit(process_single_image, src): src for src in masters}
        done_count = 0
        for future in concurrent.futures.as_completed(futures):
            name, widths = future.result()
            table[name] = widths
            done_count += 1
            if done_count % 30 == 0 or done_count == len(masters):
                print(f"进度: {done_count}/{len(masters)} -> {name}")

    sorted_table = {k: table[k] for k in sorted(table.keys())}
    body = json.dumps(sorted_table, ensure_ascii=False, indent=2)
    js = (
        "/* Generated by scripts/deploy/optimize-images.py. Do not edit. */\n"
        "var IMAGE_DELIVERY = %s;\n"
        "if (typeof module !== 'undefined' && module.exports) module.exports = IMAGE_DELIVERY;\n"
        % body
    )
    with open(MANIFEST_JS, "w", encoding="utf-8") as handle:
        handle.write(js)
    print("manifest %d images" % len(sorted_table))


if __name__ == "__main__":
    main()

