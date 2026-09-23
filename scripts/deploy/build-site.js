/**
 * 发布站点构建脚本
 *
 * 职责：把「运行所需的最小文件集」从工程根目录同步到 dist/site/。
 *
 * 为什么需要它：
 *   工程根目录同时承载运行时代码（index.html / css / js / assets）与内部资料
 *   （docs/ 核验账、patch、scripts/、.scratch/、AGENTS.md、CONTEXT.md）。
 *   直接发布根目录会把内部文档、补丁与运维笔记一并暴露在公网 URL 下。
 *   因此发布只打包运行所需文件。
 *
 * 用法：
 *   node scripts/deploy/build-site.js
 *
 * 产出：
 *   dist/site/                      —— 可直接发布的静态站点根
 *   dist/deploy-manifest.json       —— 本次发布清单（文件数 / 字节数 / 引用校验结果）
 *
 * 注意：清单必须写在 dist/site/ 之外。它记录了工程根目录的绝对路径，
 *       若放在发布目录内会随站点一起暴露在公网 URL 下。
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'dist', 'site');

/** 运行所需的顶层条目（顺序无关） */
const INCLUDE = ['index.html', 'css', 'js', 'assets'];

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function copy(src, dest) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true, mode: 0o755 });
    fs.chmodSync(dest, 0o755);
    for (const name of fs.readdirSync(src)) {
      copy(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true, mode: 0o755 });
    fs.copyFileSync(src, dest);
    // 源图片在本机常是仅所有者可读。网站进程是另一个用户，沿用原权限会 403。
    fs.chmodSync(dest, 0o644);
  }
}

function walkFiles(dir, base = dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkFiles(p, base, acc);
    else acc.push(path.relative(base, p).split(path.sep).join('/'));
  }
  return acc;
}

// ---------------------------------------------------------------- 1. 同步
rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });

const missingTop = [];
for (const entry of INCLUDE) {
  const src = path.join(ROOT, entry);
  if (!fs.existsSync(src)) { missingTop.push(entry); continue; }
  copy(src, path.join(OUT, entry));
}

if (missingTop.length) {
  console.error('FAIL  缺少必需的顶层条目: ' + missingTop.join(', '));
  process.exit(1);
}

const delivery = require(path.join(ROOT, 'js', 'image-delivery.js'));

function stripPublishedMasters(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (!/\.(png|jpe?g)$/i.test(name)) continue;
    if (!delivery[name]) continue;
    fs.rmSync(path.join(dir, name));
  }
}
stripPublishedMasters(path.join(OUT, 'assets', 'products'));
stripPublishedMasters(path.join(OUT, 'assets', 'accessories'));

function coveredByDelivery(ref) {
  const base = path.basename(ref.split('?')[0]);
  const widths = delivery[base];
  if (!widths || !widths.length) return false;
  const stem = base.replace(/\.(png|jpe?g)$/i, '');
  const webp = path.join(OUT, 'assets', 'delivery', 'webp', 'w' + widths[widths.length - 1], stem + '.webp');
  const avif = path.join(OUT, 'assets', 'delivery', 'avif', 'w' + widths[widths.length - 1], stem + '.avif');
  return fs.existsSync(webp) && fs.existsSync(avif);
}

// ---------------------------------------------------------------- 2. 引用完整性校验
// 收集 index.html / css / js 中引用的本地资源，逐条确认发布目录内确实存在。
const files = walkFiles(OUT);
const refs = new Map(); // 引用路径 -> 引用它的文件

function collect(file, text, pattern) {
  let m;
  while ((m = pattern.exec(text)) !== null) {
    const raw = m[1].trim();
    if (!raw) continue;
    if (/^(https?:|data:|mailto:|tel:|#|\/\/)/i.test(raw)) continue; // 外链/内联/锚点
    const clean = raw.split('?')[0].split('#')[0].replace(/^\.\//, '/');
    if (!clean || clean === '/') continue;
    refs.set(clean, file);
  }
}

for (const rel of files) {
  const abs = path.join(OUT, rel);
  if (/\.html$/i.test(rel)) {
    const text = fs.readFileSync(abs, 'utf8');
    collect(rel, text, /<link[^>]+href=["']([^"']+)["']/gi);
    collect(rel, text, /<script[^>]+src=["']([^"']+)["']/gi);
    collect(rel, text, /<img[^>]+src=["']([^"']+)["']/gi);
    collect(rel, text, /<source[^>]+src=["']([^"']+)["']/gi);
  } else if (/\.css$/i.test(rel)) {
    collect(rel, fs.readFileSync(abs, 'utf8'), /url\(["']?([^"')]+)["']?\)/gi);
  }
}

// 运行时资源（js 中以字符串拼出的 ./assets/... 路径）
const assetNames = new Set();
for (const rel of files) {
  if (!/\.js$/i.test(rel)) continue;
  const text = fs.readFileSync(path.join(OUT, rel), 'utf8');
  const re = /["'`](\.?\/?assets\/[A-Za-z0-9_\-./]+\.(?:png|jpe?g|svg|webp|avif|gif))["'`]/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    refs.set(m[1].replace(/^\.\//, '/'), rel);
    assetNames.add(m[1].replace(/^\.\//, '/').replace(/^\/?/, ''));
  }
}

const missingRefs = [];
for (const [ref, from] of refs) {
  const target = path.join(OUT, ref.replace(/^\/+/, ''));
  if (!fs.existsSync(target) && !coveredByDelivery(ref)) missingRefs.push(`${ref}  (被 ${from} 引用)`);
}

// 显式引用的 assets 之外的静态资源文件也应一并存在
const assetFilesOnDisk = files.filter((f) => f.startsWith('assets/'));
const unusedAssets = assetFilesOnDisk.filter((f) => !assetNames.has(f));

// ---------------------------------------------------------------- 3. 体积统计
let totalBytes = 0;
const byExt = new Map();
for (const rel of files) {
  const size = fs.statSync(path.join(OUT, rel)).size;
  totalBytes += size;
  const ext = path.extname(rel).toLowerCase() || '(none)';
  byExt.set(ext, (byExt.get(ext) || 0) + size);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  source: ROOT,
  output: OUT,
  fileCount: files.length,
  totalBytes,
  totalMB: +(totalBytes / 1024 / 1024).toFixed(2),
  byExt: Object.fromEntries([...byExt].sort((a, b) => b[1] - a[1])),
  referencedLocalResources: refs.size,
  missingRefs,
  assetsReferenced: assetNames.size,
  assetsOnDisk: assetFilesOnDisk.length,
  assetsNotReferenced: unusedAssets.length,
  topLevelEntries: fs.readdirSync(OUT).sort(),
};

fs.writeFileSync(
  path.join(ROOT, 'dist', 'deploy-manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
);

console.log(JSON.stringify(manifest, null, 2));

if (missingRefs.length) {
  console.error('\nFAIL  存在无法解析的本地引用，发布产物不完整。');
  process.exit(1);
}
console.log('\nOK   发布产物已生成，全部本地引用均可解析。');
