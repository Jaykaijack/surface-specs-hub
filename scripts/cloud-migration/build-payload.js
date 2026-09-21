/**
 * 生成云端数据集载荷：gzip + base64 分片，供 workbuddy_cloudservice_db_exec_sql 写入。
 * 输出到 .scratch/cloud-seed/ 目录。
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, '.scratch', 'cloud-seed');
fs.mkdirSync(OUT, { recursive: true });

const src = fs.readFileSync(path.join(ROOT, 'js', 'surface-data.js'), 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src + '\n;this.__D = SURFACE_DATA;', sandbox, { filename: 'surface-data.js' });
const D = sandbox.__D;

// 稳定序列化：键顺序与源文件保持一致
const json = JSON.stringify(D);
const gz = zlib.gzipSync(Buffer.from(json, 'utf8'), { level: 9 });
const b64 = gz.toString('base64');

const CHUNK = 12000;
const chunks = [];
for (let i = 0; i < b64.length; i += CHUNK) chunks.push(b64.slice(i, i + CHUNK));

fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify({
  version: '2026.09.18',
  rawBytes: Buffer.byteLength(json, 'utf8'),
  gzBytes: gz.length,
  b64Chars: b64.length,
  chunkCount: chunks.length,
  itemCount: D.devices.length,
  deviceCount: D.devices.length,
  categoryCount: D.categories.length,
}, null, 2));

chunks.forEach((c, i) => {
  const tag = `<<<C${String(i + 1).padStart(2, '0')}>>>`;
  fs.writeFileSync(path.join(OUT, `chunk-${String(i + 1).padStart(2, '0')}.txt`), c + '\n' + tag + '\n', 'utf8');
});

// 最终校验用：整段 base64 的 md5 与长度
const crypto = require('crypto');
const b64Md5 = crypto.createHash('md5').update(b64, 'utf8').digest('hex');
fs.writeFileSync(path.join(OUT, 'checksum.json'), JSON.stringify({
  b64Chars: b64.length,
  b64Md5,
  chunkCount: chunks.length,
}, null, 2));

// 校验：解压还原后与原对象深度一致
const restored = JSON.parse(zlib.gunzipSync(Buffer.from(b64, 'base64')).toString('utf8'));
const ok = JSON.stringify(restored) === json;

console.log(JSON.stringify({
  rawBytes: Buffer.byteLength(json, 'utf8'),
  gzBytes: gz.length,
  b64Chars: b64.length,
  b64Md5,
  chunkSize: CHUNK,
  chunkCount: chunks.length,
  deviceCount: D.devices.length,
  roundTripOk: ok,
  outDir: OUT,
}, null, 2));
