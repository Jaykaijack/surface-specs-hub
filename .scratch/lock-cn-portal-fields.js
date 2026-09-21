/**
 * Lock current-CN REST from:
 * - https://www.microsoft.com/zh-cn/surface and child 技术规格
 * - microsoftstore.com.cn compare + 8th/12th-gen 商用规格表
 * Exact device-id match.
 * Do not copy Learn 7th-gen Intel 236V onto 8th-gen 国行 SKUs.
 * Do not add Surface Laptop Ultra (footnote: not China-certified).
 * 8th/12th-gen 快充表写的是 60W USB-C（脚注另写 65W Surface 电源）。
 * 7th-gen 骁龙表写的是 65W。12 英寸表写的是 45W。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js/surface-data.js');
const FACTS_PATH = path.join(ROOT, 'tests/official-current-lineup-facts.js');

const WRITE_ALIASES = {
  colorSupport: ['colorSupport', 'colorGamut']
};

const FAST_60 = 'Surface Connect / USB-C 最低 60W 支持快速充电（65W Surface 电源或 60W USB-C PD）';
const FAST_65 = 'Surface Connect / USB-C 最低 65W 支持快速充电';
const FAST_45 = 'USB-C 最低 45W 支持快速充电';
const CORES_8 = '8 核';
const CORES_10_12 = '10 核 / 12 核';

const LOCKS = {
  'pro-12-inch': {
    facts: { fastCharging: '45', cpuCores: '8', panelTech: 'LCD' },
    data: {
      fastCharging: FAST_45,
      cpuCores: CORES_8,
      panelTech: 'LCD',
      colorSupport: 'sRGB 和增强型，对比度 1200:1'
    }
  },
  'pro-12-inch-biz': {
    facts: { fastCharging: '45', cpuCores: '8', panelTech: 'LCD' },
    data: {
      fastCharging: FAST_45,
      cpuCores: CORES_8,
      panelTech: 'LCD',
      colorSupport: 'sRGB 与增强型，对比度 1200:1'
    }
  },
  'pro-12-13': {
    facts: { fastCharging: ['60', '65'], cpuCores: ['10', '12'] },
    data: { fastCharging: FAST_60, cpuCores: CORES_10_12 }
  },
  'pro-12-13-snap': {
    facts: { fastCharging: ['60', '65'], cpuCores: ['10', '12'] },
    data: { fastCharging: FAST_60, cpuCores: CORES_10_12 }
  },
  'pro-12-13-intel': {
    facts: { fastCharging: ['60', '65'] },
    data: { fastCharging: FAST_60 }
  },
  'laptop-8-138': {
    facts: { fastCharging: ['60', '65'], cpuCores: ['10', '12'] },
    data: { fastCharging: FAST_60, cpuCores: CORES_10_12 }
  },
  'laptop-8-150': {
    facts: { fastCharging: ['60', '65'], cpuCores: ['10', '12'] },
    data: { fastCharging: FAST_60, cpuCores: CORES_10_12 }
  },
  'laptop-8-138-snap': {
    facts: { fastCharging: ['60', '65'], cpuCores: ['10', '12'] },
    data: { fastCharging: FAST_60, cpuCores: CORES_10_12 }
  },
  'laptop-8-150-snap': {
    facts: { fastCharging: ['60', '65'], cpuCores: ['10', '12'] },
    data: { fastCharging: FAST_60, cpuCores: CORES_10_12 }
  },
  'laptop-8-138-intel': {
    facts: { fastCharging: ['60', '65'] },
    data: { fastCharging: FAST_60 }
  },
  'laptop-8-150-intel': {
    facts: { fastCharging: ['60', '65'] },
    data: { fastCharging: FAST_60 }
  },
  'laptop-13-inch': {
    facts: { cpuCores: '8', ssdRemovable: '可拆' },
    data: { cpuCores: CORES_8, ssdRemovable: '支持可拆卸固态硬盘' }
  },
  'laptop-13-inch-biz': {
    facts: { cpuCores: '8', ssdRemovable: '可拆' },
    data: { cpuCores: CORES_8, ssdRemovable: '支持可拆卸固态硬盘' }
  },
  'pro-11-biz-snap': {
    facts: { fastCharging: '65', cpuCores: ['10', '12'] },
    data: { fastCharging: FAST_65, cpuCores: CORES_10_12 }
  },
  'laptop-7-biz-snap': {
    facts: { fastCharging: '65', cpuCores: ['10', '12'] },
    data: { fastCharging: FAST_65, cpuCores: CORES_10_12 }
  },
  'laptop-7-biz-intel': {
    facts: { fastCharging: ['65', '60'] },
    data: { fastCharging: 'Surface 电源最低 65W / USB-C 最低 60W 支持快速充电' }
  }
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
  if (re.test(block)) return block.replace(re, `$1${jsonVal}`);
  const specsIdx = block.indexOf('"specs": {');
  if (specsIdx < 0) throw new Error('no specs in ' + key);
  const insertAt = block.indexOf('\n', specsIdx) + 1;
  return block.slice(0, insertAt) + `        "${writeKey}": ${jsonVal},\n` + block.slice(insertAt);
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
  let body = src.slice(open, close + 1);
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
  const prefix = needsComma ? ',' : '';
  const next = body.slice(0, scClose) + prefix + additions + body.slice(scClose);
  return src.slice(0, open) + next + src.slice(close + 1);
}

const mode = process.argv[2] || 'all';
if (mode === 'facts' || mode === 'all') {
  let facts = fs.readFileSync(FACTS_PATH, 'utf8');
  for (const [id, lock] of Object.entries(LOCKS)) {
    facts = mergeSpecContains(facts, id, lock.facts);
  }
  if (!facts.includes('cnSurfacePortal')) {
    facts = facts.replace(
      "compareDevices: 'https://www.microsoftstore.com.cn/surface/compare-devices'",
      "compareDevices: 'https://www.microsoftstore.com.cn/surface/compare-devices',\n    cnSurfacePortal: 'https://www.microsoft.com/zh-cn/surface',\n    cnPro12Snap: 'https://www.microsoft.com/zh-cn/surface/business/surface-pro-12-inch-snapdragon',\n    cnLaptop7Snap: 'https://www.microsoft.com/zh-cn/surface/business/surface-laptop-7th-edition',\n    cnLaptop7Intel: 'https://www.microsoft.com/zh-cn/surface/business/surface-laptop-intel-7th-edition'"
    );
  }
  fs.writeFileSync(FACTS_PATH, facts);
  console.log('facts merged');
}

if (mode === 'data' || mode === 'all') {
  let data = fs.readFileSync(DATA_PATH, 'utf8');
  for (const [id, lock] of Object.entries(LOCKS)) {
    const { start, end } = deviceSpan(data, id);
    let block = data.slice(start, end);
    for (const [key, value] of Object.entries(lock.data)) {
      block = setField(block, key, value);
    }
    data = data.slice(0, start) + block + data.slice(end);
  }
  fs.writeFileSync(DATA_PATH, data);
  console.log('data locked');
}
