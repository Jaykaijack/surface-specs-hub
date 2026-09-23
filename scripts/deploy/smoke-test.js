/**
 * 发布产物冒烟测试
 *
 * 职责：在本地起一个静态 HTTP 服务托管 dist/site/，把 index.html 中引用的全部本地
 * 资源逐个发真实 HTTP 请求，断言 200。用来在发布上线前捕获「文件没同步」「路径写错」
 * 这类只在浏览器里才暴露的问题。
 *
 * 用法：
 *   node scripts/deploy/smoke-test.js
 *
 * 退出码：0 = 全部通过；1 = 存在失败项。
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.resolve(__dirname, '..', '..');
const SITE = path.join(ROOT, 'dist', 'site');

if (!fs.existsSync(path.join(SITE, 'index.html'))) {
  console.error('FAIL  dist/site/index.html 不存在，请先运行 node scripts/deploy/build-site.js');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/index.html';
  const abs = path.join(SITE, rel.replace(/^\/+/, ''));
  if (!abs.startsWith(SITE) || !fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404');
    return;
  }
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream',
    'Content-Length': fs.statSync(abs).size,
  });
  fs.createReadStream(abs).pipe(res);
});

/** 从 index.html 抽取需要请求的本地路径 */
function collectTargets() {
  const html = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
  const out = new Set(['/index.html']);
  const push = (raw) => {
    if (!raw) return;
    if (/^(https?:|data:|mailto:|tel:|#|\/\/)/i.test(raw)) return;
    const clean = raw.split('?')[0].split('#')[0];
    if (!clean || clean === '/') return;
    out.add(clean.startsWith('/') ? clean : '/' + clean.replace(/^\.\//, ''));
  };

  let m;
  const linkRe = /<link[^>]+href=["']([^"']+)["']/gi;
  while ((m = linkRe.exec(html)) !== null) push(m[1]);
  const scriptRe = /<script[^>]+src=["']([^"']+)["']/gi;
  while ((m = scriptRe.exec(html)) !== null) push(m[1]);
  return [...out];
}

/** 抽样运行时才会用到的产品图，验证 assets 目录确实同步成功 */
function sampleAssets() {
  const dir = path.join(SITE, 'assets', 'products');
  if (!fs.existsSync(dir)) return [];
  const all = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();
  if (all.length <= 6) return all.map((f) => '/assets/products/' + f);
  const picks = new Set();
  for (let i = 0; i < 6; i++) picks.add(all[Math.floor((i * (all.length - 1)) / 5)]);
  return [...picks].map((f) => '/assets/products/' + f);
}

function get(port, urlPath) {
  return new Promise((resolve) => {
    const req = http.get({ host: '127.0.0.1', port, path: urlPath }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () =>
        resolve({ status: res.statusCode, type: res.headers['content-type'] || '', bytes: Buffer.concat(chunks).length })
      );
    });
    req.on('error', (e) => resolve({ status: 0, type: '', bytes: 0, error: e.message }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ status: 0, type: '', bytes: 0, error: 'timeout' }); });
  });
}

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  console.log(`本地静态服务: http://127.0.0.1:${port}/  (托管 ${SITE})\n`);

  const targets = [...collectTargets(), ...sampleAssets()];
  const failures = [];
  let okCount = 0;

  for (const t of targets) {
    const r = await get(port, t);
    const ok = r.status === 200 && r.bytes > 0;
    if (ok) okCount++; else failures.push(`${t}  ->  status=${r.status} bytes=${r.bytes} ${r.error || ''}`);
    console.log(`${ok ? 'OK  ' : 'FAIL'}  ${String(r.status).padEnd(4)} ${String(r.bytes).padStart(9)}B  ${t}`);
  }

  // 首页内容断言：不能是空壳
  const home = await get(port, '/index.html');
  console.log(`\n首页: status=${home.status}  type=${home.type}  bytes=${home.bytes}`);
  if (home.status !== 200 || home.bytes < 3000) {
    failures.push('index.html 响应异常或内容过小，疑似空壳页面');
  }

  console.log(`\n合计 ${targets.length} 个请求，通过 ${okCount}，失败 ${failures.length}`);
  if (failures.length) {
    console.log('\n失败明细:');
    failures.forEach((f) => console.log('  - ' + f));
    console.log('\n结果: 失败');
    server.close();
    process.exit(1);
  }
  console.log('\n结果: 通过 —— 发布产物在真实 HTTP 下可完整加载。');
  server.close();
});
