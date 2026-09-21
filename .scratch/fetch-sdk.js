/* eslint-disable */
// 下载云 SDK 并自托管到 js/vendor/
const https = require('https');
const fs = require('fs');
const path = require('path');

const SRC = 'https://cdn.jsdelivr.net/npm/@tencent-ai/workbuddy-cloud-sdk@dev/lib/index.global.js';
const DIR = 'C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/js/vendor';
const DST = path.join(DIR, 'workbuddy-cloud-sdk.global.js');

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('too many redirects'));
    https.get(url, { headers: { 'user-agent': 'surface-hub-vendor-fetch' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).toString(), redirects + 1));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

(async () => {
  const buf = await get(SRC);
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(DST, buf);
  const txt = buf.toString('utf8');
  const crypto = require('crypto');
  console.log(JSON.stringify({
    src: SRC,
    dst: DST,
    bytes: buf.length,
    md5: crypto.createHash('md5').update(buf).digest('hex'),
    sha256: crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16),
    hasGlobal: /WorkBuddyCloud/.test(txt),
    firstLine: txt.split('\n')[0].slice(0, 160),
    lastLine: txt.split('\n').filter(Boolean).pop().slice(0, 160),
  }, null, 2));
})();
