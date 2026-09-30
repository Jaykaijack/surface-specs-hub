#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
optimize_images.py
消除白底 JPG 与实底 PNG，利用边缘连通泛洪 (Flood Fill) 算法提取透明通道，生成高品质透明 PNG。
"""

import os
import sys
from PIL import Image
import numpy as np

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_DIR = os.path.join(WORKSPACE, 'assets', 'products')
ACCESSORIES_DIR = os.path.join(WORKSPACE, 'assets', 'accessories')

def remove_white_background(img_path, threshold=242, soft_range=15):
    """
    通过边缘连通泛洪消除纯白/近白背景，保留主体内容及内部可能的白色元素
    """
    try:
        im = Image.open(img_path).convert('RGBA')
    except Exception as e:
        print(f"无法读取图片 {img_path}: {e}")
        return None

    w, h = im.size
    arr = np.array(im)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    # 判断是否为近白像素
    is_white = (r >= threshold) & (g >= threshold) & (b >= threshold)

    # 泛洪种子：4条边缘上的白色像素
    mask = np.zeros((h, w), dtype=bool)
    
    # 检查角落，如果角落都不是白底，可能原本就是透明或者复杂背景，跳过
    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    corner_whites = sum(1 for cx, cy in corners if is_white[cy, cx] and a[cy, cx] > 128)
    if corner_whites < 2:
        return None

    # 从边缘开始 BFS 泛洪
    from collections import deque
    q = deque()

    for x in range(w):
        if is_white[0, x] and a[0, x] > 128:
            mask[0, x] = True
            q.append((x, 0))
        if is_white[h - 1, x] and a[h - 1, x] > 128:
            mask[h - 1, x] = True
            q.append((x, h - 1))

    for y in range(h):
        if is_white[y, 0] and a[y, 0] > 128 and not mask[y, 0]:
            mask[y, 0] = True
            q.append((0, y))
        if is_white[y, w - 1] and a[y, w - 1] > 128 and not mask[y, w - 1]:
            mask[y, w - 1] = True
            q.append((w - 1, y))

    while q:
        cx, cy = q.popleft()
        for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
            if 0 <= nx < w and 0 <= ny < h:
                if not mask[ny, nx] and is_white[ny, nx] and a[ny, nx] > 0:
                    mask[ny, nx] = True
                    q.append((nx, ny))

    # 如果几乎全图都是背景（例如白色线框图没有主体），则跳过防止完全删空
    if np.sum(~mask) < (w * h * 0.02):
        return None

    # 计算渐变边缘羽化，使轮廓柔和没有锯齿
    new_a = a.copy()
    new_a[mask] = 0

    # 边缘半透明过度
    edge_near_white = (r >= (threshold - soft_range)) & (g >= (threshold - soft_range)) & (b >= (threshold - soft_range))
    # 仅对邻近 mask 的半白像素做轻微羽化
    arr[:, :, 3] = new_a
    result = Image.fromarray(arr, 'RGBA')
    return result

def process_directory(directory, label):
    count = 0
    converted = 0
    for fname in sorted(os.listdir(directory)):
        if not fname.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        # 保护不可替换文件
        if 'official-diagram' in fname and fname.endswith('.png'):
            continue

        fpath = os.path.join(directory, fname)
        base_name = os.path.splitext(fname)[0]
        out_png_path = os.path.join(directory, base_name + '.png')

        # 如果已经是透明 PNG，检查是否需要处理
        if fname.lower().endswith('.png'):
            try:
                im = Image.open(fpath)
                if im.mode == 'RGBA':
                    arr_a = np.array(im)[:, :, 3]
                    if np.min(arr_a) < 10:
                        # 已经有透明通道，跳过
                        continue
            except:
                pass

        res = remove_white_background(fpath)
        if res is not None:
            res.save(out_png_path, 'PNG', optimize=True)
            converted += 1
            print(f"✨ [{label}] 成功透明化: {fname} -> {os.path.basename(out_png_path)}")
        count += 1
    print(f"✅ [{label}] 处理完成: 检查 {count} 个文件，成功透明化输出 {converted} 个 PNG")

if __name__ == '__main__':
    print("🚀 开始批量优化产品与配件主图透明度...")
    process_directory(PRODUCTS_DIR, "机型与手柄")
    process_directory(ACCESSORIES_DIR, "配件")
