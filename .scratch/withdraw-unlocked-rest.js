/**
 * Withdraw unlocked REST VALID fields to not_disclosed.
 * Exact device-id match. Does not touch CORE/EXTRA/MORE or locked specContains/specState.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js/surface-data.js');

global.SURFACE_DATA = require(path.join(ROOT, 'js/surface-data.js'));
const Catalog = require(path.join(ROOT, 'js/catalog.js'));
global.Catalog = Catalog;
const CURRENT = require(path.join(ROOT, 'tests/official-current-lineup-facts.js'));
const HIST = require(path.join(ROOT, 'tests/official-historical-lineup-facts.js'));

const REST_KEYS = [
  'gpuModel', 'ppi', 'colorSupport', 'headphoneJack', 'expandableStorage',
  'thunderboltSupport', 'surfaceConnect', 'aspectRatio', 'ssdRemovable',
  'windowsHello', 'microphones', 'audioTech', 'npuModel', 'copilotPlus',
  'touchAndPenProtocol', 'fastCharging', 'chassisMaterial', 'kickstandType',
  'panelTech', 'cpuCores', 'cpuArch'
];

const facts = Object.assign({}, HIST.devices, CURRENT.devices);

function factLocks(id, key) {
  const f = facts[id] || {};
  if (f.specContains && f.specContains[key] != null) return true;
  if (f.specState && f.specState[key]) return true;
  if (key === 'surfaceConnect' && f.surfaceConnectState) return true;
  return false;
}

const WRITE_ALIASES = {
  colorSupport: ['colorSupport', 'colorGamut'],
  headphoneJack: ['headphoneJack', 'audioJack'],
  microphones: ['microphones', 'mics'],
  expandableStorage: ['expandableStorage', 'sdSlot']
};

function findExactId(src, deviceId) {
  const needle = `"id": "${deviceId}"`;
  let from = 0;
  while (from < src.length) {
    const start = src.indexOf(needle, from);
    if (start < 0) return -1;
    const after = src[start + needle.length];
    if (after === undefined || /[^a-z0-9-]/.test(after)) return start;
    from = start + needle.length;
  }
  return -1;
}

function deviceSpan(src, deviceId) {
  const start = findExactId(src, deviceId);
  if (start < 0) throw new Error('missing ' + deviceId);
  let next = -1;
  const re = /\n    \{\n      "id": "/g;
  re.lastIndex = start + 1;
  const m = re.exec(src);
  if (m) next = m.index;
  const end = next < 0 ? src.indexOf('\n};\n', start) : next;
  return { start, end };
}

function existingKey(block, key) {
  const keys = [key].concat(WRITE_ALIASES[key] || []);
  for (const k of keys) {
    if (block.includes(`"${k}":`)) return k;
  }
  return key;
}

function setField(block, key, value) {
  const writeKey = existingKey(block, key);
  const jsonVal = JSON.stringify(value);
  const re = new RegExp(`("${writeKey}":\\s*)(?:"(?:\\\\.|[^"\\\\])*"|not_disclosed|not_applicable)`);
  if (re.test(block)) return { block: block.replace(re, `$1${jsonVal}`), wrote: writeKey };
  const specsIdx = block.indexOf('"specs": {');
  const insertAt = block.indexOf('\n', specsIdx) + 1;
  return {
    block: block.slice(0, insertAt) + `        "${writeKey}": ${jsonVal},\n` + block.slice(insertAt),
    wrote: writeKey
  };
}

const rows = [];
Catalog.listDevices().forEach((d) => {
  REST_KEYS.forEach((key) => {
    const val = Catalog.getSpec(d, key);
    if (Catalog.specState(val) !== 'VALID') return;
    if (factLocks(d.id, key)) return;
    rows.push({ id: d.id, key, val: String(val).slice(0, 60) });
  });
});

let src = fs.readFileSync(DATA_PATH, 'utf8');
const byDevice = {};
rows.forEach((r) => {
  if (!byDevice[r.id]) byDevice[r.id] = [];
  byDevice[r.id].push(r.key);
});

Object.keys(byDevice).forEach((id) => {
  const { start, end } = deviceSpan(src, id);
  let block = src.slice(start, end);
  byDevice[id].forEach((key) => {
    block = setField(block, key, 'not_disclosed').block;
  });
  src = src.slice(0, start) + block + src.slice(end);
});

fs.writeFileSync(DATA_PATH, src);
console.log('withdrawn', rows.length);
const byKey = {};
rows.forEach((r) => { byKey[r.key] = (byKey[r.key] || 0) + 1; });
console.log(JSON.stringify(byKey, null, 2));
rows.slice(0, 40).forEach((r) => console.log(r.id, r.key, r.val));
