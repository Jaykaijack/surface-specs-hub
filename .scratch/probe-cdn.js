/* eslint-disable */
// 探测 SDK 各来源可达性
const https = require('https');
const http = require('http');

const targets = [
  'https://cdn.jsdelivr.net/npm/@tencent-ai/workbuddy-cloud-sdk@dev/lib/index.global.js',
  'https://unpkg.com/@tencent-ai/workbuddy-cloud-sdk@dev/lib/index.global.js',
  'https://registry.npmjs.org/@tencent-ai/workbuddy-cloud-sdk',
  'https://npmmirror.com/mirrors/',
  'https://registry.npmmirror.com/@tencent-ai/workbuddy-cloud-sdk',
  'https://surface-specs-hub.app.workbuddy.host/',
];

function probe(url, timeout = 12000) {
  return new Promise((resolve) => {
    const started = Date.now();
    let req;
    try {
      req = https.get(url, { timeout, headers: { 'user-agent': 'node-probe' } }, (res) => {
        let len = 0;
        res.on('data', (c) => { len += c.length; });
        res.on('end', () => resolve({ url, status: res.statusCode, bytes: len, ms: Date.now() - started }));
      });
    } catch (e) { return resolve({ url, error: String(e.message) }); }
    req.on('timeout', () => { req.destroy(); resolve({ url, error: 'TIMEOUT' }); });
    req.on('error', (e) => resolve({ url, error: String(e.message || e) }));
  });
}

(async () => {
  const out = [];
  for (const t of targets) out.push(await probe(t));
  console.log(JSON.stringify(out, null, 2));
})();
