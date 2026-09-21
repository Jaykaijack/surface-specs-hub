/**
 * 度量 SURFACE_DATA 各分部体积（原始 JSON / gzip / base64），用于规划云端数据迁移。
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'js', 'surface-data.js'), 'utf8');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src + '\n;this.__D = SURFACE_DATA;', sandbox, { filename: 'surface-data.js' });
const D = sandbox.__D;

function stat(label, value) {
  const json = JSON.stringify(value);
  const raw = Buffer.byteLength(json, 'utf8');
  const gz = zlib.gzipSync(Buffer.from(json, 'utf8'), { level: 9 }).length;
  const b64 = Buffer.from(zlib.gzipSync(Buffer.from(json, 'utf8'), { level: 9 })).toString('base64').length;
  console.log(
    `${label.padEnd(22)} items=${String(Array.isArray(value) ? value.length : '-').padStart(4)}  raw=${String(raw).padStart(8)}B  gzip=${String(gz).padStart(7)}B  b64=${String(b64).padStart(7)}B`
  );
  return { raw, gz, b64 };
}

const parts = ['categories', 'consumerCategories', 'commercialCategories', 'specGroups', 'devices', 'chips', 'accessories'];
let totRaw = 0, totB64 = 0;
for (const p of parts) {
  if (!(p in D)) { console.log(`${p} MISSING`); continue; }
  const s = stat(p, D[p]);
  totRaw += s.raw; totB64 += s.b64;
}
console.log('-'.repeat(72));
console.log(`TOTAL raw=${totRaw}B  (b64-of-gzip sum=${totB64}B)`);

const whole = stat('WHOLE SURFACE_DATA', D);
console.log('-'.repeat(72));
console.log(`devices[0] spec keys = ${Object.keys(D.devices[0].specs).length}`);
console.log(`device top-level keys = ${Object.keys(D.devices[0]).join(', ')}`);

// 值字典化后的体积估算（去掉重复字符串）
const dict = new Map();
let totalValues = 0;
for (const dev of D.devices) {
  for (const v of Object.values(dev.specs)) {
    totalValues++;
    const s = JSON.stringify(v);
    dict.set(s, (dict.get(s) || 0) + 1);
  }
}
const dictSize = [...dict.keys()].reduce((a, s) => a + Buffer.byteLength(s, 'utf8'), 0);
console.log(`spec values total=${totalValues} unique=${dict.size} dictBytes=${dictSize}B`);
console.log(`devices spec keys sample = ${Object.keys(D.devices[0].specs).slice(0, 8).join(', ')}`);
