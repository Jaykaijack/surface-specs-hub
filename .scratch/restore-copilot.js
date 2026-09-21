const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js/surface-data.js');
const FACTS_PATH = path.join(ROOT, 'tests/official-current-lineup-facts.js');
const CURRENT = require(path.join(ROOT, 'tests/official-current-lineup-facts.js'));

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
  const re = /\n    \{\n      "id": "/g;
  re.lastIndex = start + 1;
  const m = re.exec(src);
  const end = m ? m.index : src.indexOf('\n};\n', start);
  return { start, end };
}

function setField(block, key, value) {
  const jsonVal = JSON.stringify(value);
  const re = new RegExp(`("${key}":\\s*)(?:"(?:\\\\.|[^"\\\\])*"|not_disclosed|not_applicable)`);
  if (re.test(block)) return block.replace(re, `$1${jsonVal}`);
  const specsIdx = block.indexOf('"specs": {');
  const insertAt = block.indexOf('\n', specsIdx) + 1;
  return block.slice(0, insertAt) + `        "${key}": ${jsonVal},\n` + block.slice(insertAt);
}

let src = fs.readFileSync(DATA_PATH, 'utf8');
const skip = new Set(['hub-3']);
CURRENT.currentCnDeviceIds.forEach((id) => {
  if (skip.has(id)) return;
  const { start, end } = deviceSpan(src, id);
  let block = src.slice(start, end);
  block = setField(block, 'copilotPlus', '认证 Copilot+ PC / Windows 11 AI+ PC');
  src = src.slice(0, start) + block + src.slice(end);
});
fs.writeFileSync(DATA_PATH, src);

let facts = fs.readFileSync(FACTS_PATH, 'utf8');
CURRENT.currentCnDeviceIds.forEach((id) => {
  if (skip.has(id)) return;
  const f = CURRENT.devices[id];
  if (!f || !f.specContains) return;
  if (f.specContains.copilotPlus) return;
  const needle = `'${id}':`;
  const idx = facts.indexOf(needle);
  const sc = facts.indexOf('specContains:', idx);
  if (sc < 0 || sc > idx + 4000) return;
  const open = facts.indexOf('{', sc);
  const insertAt = facts.indexOf('\n', open) + 1;
  facts = facts.slice(0, insertAt) + '            "copilotPlus": "Copilot",\n' + facts.slice(insertAt);
});
fs.writeFileSync(FACTS_PATH, facts);
require(path.join(ROOT, 'tests/official-current-lineup-facts.js'));
console.log('restored current copilotPlus');
