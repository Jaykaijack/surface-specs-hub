/**
 * Lock cpuArch from official CPU product pages only.
 * Exact device-id match. Exact SKU / official product-name match.
 * Mixed ISA (Intel+SQ, Intel+AMD) and vague "i5 / i7" models stay not_disclosed.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js/surface-data.js');
const CURRENT_FACTS = path.join(ROOT, 'tests/official-current-lineup-facts.js');
const HIST_FACTS = path.join(ROOT, 'tests/official-historical-lineup-facts.js');

const INTEL_18A = {
  facts: { cpuArch: ['64', '18A'] },
  data: { cpuArch: '64 位 / Intel 18A' }
};
const INTEL_N3B = {
  facts: { cpuArch: ['64', 'N3B'] },
  data: { cpuArch: '64 位 / TSMC N3B' }
};
const INTEL_7 = {
  facts: { cpuArch: ['64', 'Intel 7'] },
  data: { cpuArch: '64 位 / Intel 7' }
};
const INTEL_4 = {
  facts: { cpuArch: ['64', 'Intel 4'] },
  data: { cpuArch: '64 位 / Intel 4' }
};
const SUPERFIN = {
  facts: { cpuArch: ['64', 'SuperFin'] },
  data: { cpuArch: '64 位 / 10 nm SuperFin' }
};
const NM14 = {
  facts: { cpuArch: ['64', '14 nm'] },
  data: { cpuArch: '64 位 / 14 nm' }
};
const NM10 = {
  facts: { cpuArch: ['64', '10 nm'] },
  data: { cpuArch: '64 位 / 10 nm' }
};
const ORYON_64 = {
  facts: { cpuArch: ['Oryon', '64'] },
  data: { cpuArch: 'Qualcomm Oryon™ 64 位' }
};
const ORYON_64_4NM = {
  facts: { cpuArch: ['Oryon', '4nm'] },
  data: { cpuArch: 'Qualcomm Oryon™ 64 位 / 4nm' }
};
const X2_ORYON = {
  facts: { cpuArch: ['Oryon', 'ARM64'] },
  data: { cpuArch: '第 3 代 Qualcomm Oryon™（ARM64）' }
};
const KRYO_855 = {
  facts: { cpuArch: ['Kryo', '7nm'] },
  data: { cpuArch: 'Qualcomm Kryo™ 485 64 位 / 7nm' }
};

const CURRENT_LOCKS = {
  'pro-12-13-intel': INTEL_18A,
  'laptop-8-138-intel': INTEL_18A,
  'laptop-8-150-intel': INTEL_18A,
  'laptop-13-inch-intel-biz': INTEL_18A,
  'pro-11-biz-intel': INTEL_N3B,
  'laptop-7-biz-intel': INTEL_N3B,
  'pro-12-13': X2_ORYON,
  'pro-12-13-snap': X2_ORYON,
  'laptop-8-138': X2_ORYON,
  'laptop-8-150': X2_ORYON,
  'laptop-8-138-snap': X2_ORYON,
  'laptop-8-150-snap': X2_ORYON,
  'pro-12-inch': ORYON_64,
  'pro-12-inch-biz': ORYON_64,
  'laptop-13-inch': ORYON_64,
  'laptop-13-inch-biz': ORYON_64,
  'pro-11-biz-snap': ORYON_64,
  'laptop-7-biz-snap': ORYON_64
};

const HIST_LOCKS = {
  'pro-11-13': ORYON_64,
  'laptop-7-138': ORYON_64,
  'laptop-7-150': ORYON_64_4NM,
  'laptop-5': INTEL_7,
  'laptop-5-biz': INTEL_7,
  'laptop-go-3': INTEL_7,
  'laptop-go-3-biz': INTEL_7,
  'sls-2': INTEL_7,
  'sls-2-biz': INTEL_7,
  'go-4': INTEL_7,
  'pro-8': SUPERFIN,
  'pro-8-biz': SUPERFIN,
  'laptop-go-2': SUPERFIN,
  'sls-1': SUPERFIN,
  'sls-1-biz': SUPERFIN,
  'studio-2-plus': SUPERFIN,
  'studio-2-plus-biz': SUPERFIN,
  'pro-6': NM14,
  'pro-6-biz': NM14,
  'laptop-2': NM14,
  'book-2-15': NM14,
  'pro-10-biz': INTEL_4,
  'laptop-6-biz': INTEL_4,
  'book-3-15': NM10,
  'pro-7-plus': SUPERFIN,
  'pro-7': NM10,
  'laptop-go-1': NM10,
  'book-3-135': NM10,
  'book-3-biz': NM10,
  'go-3': NM14,
  'go-3-biz': NM14,
  'go-2': NM14,
  'go-2-biz': NM14,
  'go-1': NM14,
  'studio-2': NM14,
  'pro-5': NM14,
  'duo-1': KRYO_855
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
  if (start < 0) throw new Error('missing device ' + deviceId);
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

function closeBrace(src, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error('unbalanced');
}

function mergeSpecContains(src, deviceId, extra) {
  const needle = `'${deviceId}': {`;
  const start = src.indexOf(needle);
  if (start < 0) throw new Error('missing fact ' + deviceId);
  const open = start + needle.length - 1;
  const close = closeBrace(src, open);
  const body = src.slice(open, close + 1);
  const marker = 'specContains: {';
  const sc = body.indexOf(marker);
  if (sc < 0) throw new Error('no specContains ' + deviceId);
  const scOpen = body.indexOf('{', sc);
  const scClose = closeBrace(body, scOpen);
  const inner = body.slice(scOpen + 1, scClose);
  const additions = Object.keys(extra).map((key) => {
    if (inner.includes(`"${key}"`)) return '';
    return `\n            ${JSON.stringify(key)}: ${JSON.stringify(extra[key])},`;
  }).join('');
  if (!additions) return src;
  const trimmedInner = inner.replace(/\s+$/, '');
  const needsComma = trimmedInner.length > 0 && !trimmedInner.endsWith(',') && !trimmedInner.endsWith('{');
  const next = body.slice(0, scClose) + (needsComma ? ',' : '') + additions + body.slice(scClose);
  return src.slice(0, open) + next + src.slice(close + 1);
}

function applyFacts(filePath, locks) {
  let facts = fs.readFileSync(filePath, 'utf8');
  for (const [id, lock] of Object.entries(locks)) {
    facts = mergeSpecContains(facts, id, lock.facts);
  }
  fs.writeFileSync(filePath, facts);
}

function applyData(locks) {
  let data = fs.readFileSync(DATA_PATH, 'utf8');
  for (const [id, lock] of Object.entries(locks)) {
    const { start, end } = deviceSpan(data, id);
    let block = data.slice(start, end);
    for (const [key, value] of Object.entries(lock.data)) {
      block = setField(block, key, value);
    }
    data = data.slice(0, start) + block + data.slice(end);
  }
  fs.writeFileSync(DATA_PATH, data);
}

const mode = process.argv[2] || 'all';
if (mode === 'facts' || mode === 'all') {
  applyFacts(CURRENT_FACTS, CURRENT_LOCKS);
  applyFacts(HIST_FACTS, HIST_LOCKS);
  console.log('facts merged');
}
if (mode === 'data' || mode === 'all') {
  applyData(Object.assign({}, CURRENT_LOCKS, HIST_LOCKS));
  console.log('data locked');
}
