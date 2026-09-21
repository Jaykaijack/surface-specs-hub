/* eslint-disable */
// 零依赖静态文件服务器，仅用于本地验证
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/12009/OneDrive/Antigravity/surface-specs-hub';
const PORT = Number(process.argv[2] || 8123);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.map': 'application/json; charset=utf-8', '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(path.resolve(ROOT))) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'content-type': 'text/plain' }); return res.end('404 ' + p); }
    res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(PORT, '127.0.0.1', () => console.log('serving on http://127.0.0.1:' + PORT));
