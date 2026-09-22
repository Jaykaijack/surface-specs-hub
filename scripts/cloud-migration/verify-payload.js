/**
 * 验证「云数据库分片载荷 -> 浏览器端解码」这条链路是否与本地基线数据完全一致。
 *
 * 复刻的正是 js/cloud-client.js 中 inflateBase64Gzip + applyDataset 的逻辑：
 *   atob(base64) -> Uint8Array -> gunzip -> JSON.parse
 * 但使用本地的 5 个分片文件作为输入（等同云端 surface_dataset 的 5 行 payload）。
 *
 * 运行：
 *   node scripts/cloud-migration/verify-payload.js
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const SEED_DIR = path.join(ROOT, '.scratch', 'cloud-seed');

function fail(msg) {
  console.error('FAIL  ' + msg);
  process.exitCode = 1;
}

// 1. 读取云端分片（模型里对应 surface_dataset 表的 payload 列，按 id 升序）
const chunkFiles = fs.readdirSync(SEED_DIR)
  .filter((f) => /^chunk-\d+\.txt$/.test(f))
  .sort();

if (!chunkFiles.length) {
  fail('未找到任何分片文件: ' + SEED_DIR);
  process.exit(1);
}

const parts = chunkFiles.map((f) =>
  fs.readFileSync(path.join(SEED_DIR, f), 'utf8').split('\n')[0]
);

const assembled = parts.join('');
const checksum = JSON.parse(fs.readFileSync(path.join(SEED_DIR, 'checksum.json'), 'utf8'));

console.log('分片数: ' + parts.length);
parts.forEach((p, i) => console.log('  chunk-' + String(i + 1).padStart(2, '0') + '  长度=' + p.length));

console.log('拼装总长度: ' + assembled.length + ' (期望 ' + checksum.b64Chars + ')');
const assembledMd5 = crypto.createHash('md5').update(assembled, 'utf8').digest('hex');
console.log('拼装 md5:   ' + assembledMd5);
console.log('期望 md5:   ' + checksum.b64Md5);

if (assembled.length !== checksum.b64Chars) fail('拼装长度与 checksum 不一致');
if (assembledMd5 !== checksum.b64Md5) fail('拼装 md5 与 checksum 不一致');

// 2. 解码：base64 -> gunzip -> JSON（浏览器等价路径）
const gz = Buffer.from(assembled, 'base64');

let json;
try {
  json = zlib.gunzipSync(gz).toString('utf8');
} catch (e) {
  fail('gzip 解压失败（gzip 自带 CRC32 校验，失败即代表载荷损坏）: ' + e.message);
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(json);
} catch (e) {
  fail('JSON 解析失败: ' + e.message);
  process.exit(1);
}

// 3. 与本地基线逐键比对
const DATA_KEYS = [
  'categories',
  'consumerCategories',
  'commercialCategories',
  'specGroups',
  'devices',
  'chips',
  'accessories'
];

const localSrc = fs.readFileSync(path.join(ROOT, 'js', 'surface-data.js'), 'utf8');
global.window = undefined;
const local = require(path.join(ROOT, 'js', 'surface-data.js'));

console.log('\n顶层数据键比对：');
let identical = true;
for (const key of DATA_KEYS) {
  const a = JSON.stringify(payload[key]);
  const b = JSON.stringify(local[key]);
  const same = a === b;
  if (!same) identical = false;
  console.log(
    '  ' + (same ? 'OK  ' : 'DIFF') + '  ' + key.padEnd(22) +
    ' 云端=' + (payload[key] ? payload[key].length : 'n/a') +
    ' 本地=' + (local[key] ? local[key].length : 'n/a')
  );
}

if (!identical) fail('云端载荷与本地基线存在差异');

// 4. 抽查一款机型的关键规格，确认不是空壳数据
const sample = payload.devices[0];
console.log('\n抽样机型: ' + sample.name + ' (' + sample.id + ')');
console.log('  规格字段数: ' + Object.keys(sample.specs || {}).length);

const allSpecKeys = new Set();
payload.devices.forEach((d) => Object.keys(d.specs || {}).forEach((k) => allSpecKeys.add(k)));
console.log('  全库机型数: ' + payload.devices.length);
console.log('  规格键去重总数: ' + allSpecKeys.size);

if (process.exitCode) {
  console.log('\n结果: 失败');
} else {
  console.log('\n结果: 通过 —— 云端载荷可被浏览器等价路径完整还原，且与本地基线逐键一致。');
}
