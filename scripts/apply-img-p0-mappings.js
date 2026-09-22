#!/usr/bin/env node
/**
 * Apply main IMG-P0 hero/color image path mappings onto current js/surface-data.js
 * without rewriting the whole file (preserves getDeviceImage + China/catalog specs).
 */
const fs = require('fs');
const path = 'js/surface-data.js';
let src = fs.readFileSync(path, 'utf8');

function replaceInDeviceBlock(src, deviceId, replacer) {
  const idNeedle = `"id": "${deviceId}"`;
  const start = src.indexOf(idNeedle);
  if (start < 0) throw new Error('device not found: ' + deviceId);
  let objStart = start;
  while (objStart > 0 && src[objStart] !== '{') objStart--;
  let depth = 0, objEnd = -1;
  for (let i = objStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) { objEnd = i; break; }
    }
  }
  if (objEnd < 0) throw new Error('unclosed device ' + deviceId);
  const before = src.slice(0, objStart);
  let block = src.slice(objStart, objEnd + 1);
  const after = src.slice(objEnd + 1);
  return before + replacer(block) + after;
}

function setHero(block, image) {
  return block.replace(/("heroImage"\s*:\s*")[^"]*(")/, `$1${image}$2`);
}

function setColorImage(block, colorNames, image) {
  const names = Array.isArray(colorNames) ? colorNames : [colorNames];
  for (const name of names) {
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(
      `(\{\s*"name"\s*:\s*"${esc}"\s*,\s*"hex"\s*:\s*"[^"]*"\s*,\s*"image"\s*:\s*")[^"]*(")`,
      'm'
    );
    if (re.test(block)) return block.replace(re, `$1${image}$2`);
    const re2 = new RegExp(
      `("name"\s*:\s*"${esc}"[\s\S]{0,120}?"image"\s*:\s*")[^"]*(")`,
      'm'
    );
    if (re2.test(block)) return block.replace(re2, `$1${image}$2`);
  }
  console.log('WARN color not found', names.join('/'));
  return block;
}

src = replaceInDeviceBlock(src, 'pro-9', b => {
  b = setColorImage(b, ['亮铂金', '铂金'], './assets/products/surface-pro-9-platinum.png');
  b = setColorImage(b, ['典雅黑', '典黑'], './assets/products/surface-pro-9-black.png');
  b = setColorImage(b, ['宝石蓝'], './assets/products/surface-pro-9-sapphire.png');
  return b;
});
src = replaceInDeviceBlock(src, 'laptop-8-138', b => {
  b = setColorImage(b, ['亮铂金', '铂金'], './assets/products/surface-laptop-8-platinum.png');
  b = setColorImage(b, ['典雅黑', '典黑'], './assets/products/surface-laptop-8-black.png');
  b = setColorImage(b, ['沙漫金', '沙丘', '砂岩金'], './assets/products/surface-laptop-8-dune.png');
  return b;
});
for (const id of ['pro-11-biz-snap', 'pro-11-biz-intel']) {
  src = replaceInDeviceBlock(src, id, b => {
    b = setColorImage(b, ['亮铂金', '铂金'], './assets/products/surface-pro-13-platinum.png');
    b = setColorImage(b, ['典雅黑', '典黑'], './assets/products/surface-pro-13-black.png');
    return b;
  });
}
for (const id of ['laptop-7-biz-snap', 'laptop-7-biz-intel']) {
  src = replaceInDeviceBlock(src, id, b => {
    b = setColorImage(b, ['亮铂金', '铂金'], './assets/products/surface-laptop-platinum.png');
    b = setColorImage(b, ['典雅黑', '典黑'], './assets/products/surface-laptop-black.png');
    return b;
  });
}
src = replaceInDeviceBlock(src, 'pro-9-biz', b => {
  b = setHero(b, './assets/products/surface-pro-9-hero.png');
  b = setColorImage(b, ['亮铂金', '铂金'], './assets/products/surface-pro-9-platinum.png');
  b = setColorImage(b, ['典雅黑', '典黑'], './assets/products/surface-pro-9-black.png');
  return b;
});
src = replaceInDeviceBlock(src, 'pro-8-biz', b => {
  b = setHero(b, './assets/products/surface-pro-8-hero.png');
  b = setColorImage(b, ['亮铂金', '铂金'], './assets/products/surface-pro-13-platinum.png');
  b = setColorImage(b, ['典雅黑', '典黑'], './assets/products/surface-pro-13-black.png');
  return b;
});
src = replaceInDeviceBlock(src, 'laptop-5-biz', b => {
  b = setHero(b, './assets/products/surface-laptop-5-hero.png');
  b = setColorImage(b, ['亮铂金', '铂金'], './assets/products/surface-laptop-platinum.png');
  b = setColorImage(b, ['典雅黑', '典黑'], './assets/products/surface-laptop-black.png');
  return b;
});
src = replaceInDeviceBlock(src, 'pro-7-plus', b => {
  if (b.includes('surface-pro-13-')) {
    b = b.replace(/surface-pro-13-[a-z0-9-]+\.png/g, 'surface-pro-7-plus-hero.png');
  }
  return b;
});

fs.writeFileSync(path, src);
console.log('apply-img-p0-mappings: updated', path);
