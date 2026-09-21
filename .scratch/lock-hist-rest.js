/**
 * Lock historical REST from 国行商城规格表 / zh-cn Support.
 * Exact device-id match. Warranty on refurbished pages is ignored.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js/surface-data.js');
const FACTS_PATH = path.join(ROOT, 'tests/official-historical-lineup-facts.js');

const NA = 'NOT_APPLICABLE';
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

function injectFacts(src, deviceId, extra) {
  const needle = `'${deviceId}': {`;
  const start = src.indexOf(needle);
  if (start < 0) throw new Error('missing fact ' + deviceId);
  const open = start + needle.length - 1;
  const close = closeBrace(src, open);
  const body = src.slice(open, close);
  if (body.includes('specContains')) return src;
  let prefix = src.slice(0, close);
  const trimmed = prefix.replace(/\s+$/, '');
  if (!/[,{]$/.test(trimmed)) prefix = trimmed + ',\n';
  const snippet = Object.keys(extra).map((k) => `      ${k}: ${JSON.stringify(extra[k], null, 6).replace(/\n/g, '\n      ')},`).join('\n') + '\n';
  return prefix + snippet + src.slice(close);
}

const HELLO = 'Windows Hello 面部识别';
const HELLO_FINGER = 'Windows Hello 指纹电源按钮';
const MICS_FAR = '矩阵式远场双麦克风';
const MICS_STUDIO = '双 Studio Mics / 摄影棚麦克风';
const CHASSIS_AL = '阳极氧化铝';
const KICK_165 = '一体式支架，165 度全阻尼铰链';

const DATA = {
  'pro-11-13': {
    gpuModel: 'Qualcomm® Adreno™ GPU',
    ppi: '267 PPI',
    colorSupport: 'sRGB 和 Vivid',
    thunderboltSupport: 'USB4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    npuModel: 'Qualcomm® Hexagon™',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL,
    kickstandType: KICK_165
  },
  'laptop-7-138': {
    gpuModel: 'Qualcomm® Adreno™ GPU',
    ppi: '201 PPI',
    colorSupport: 'sRGB 和 Vivid',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'USB4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    npuModel: 'Qualcomm® Hexagon™',
    touchAndPenProtocol: '10 点多点触控，不支持触控笔',
    chassisMaterial: CHASSIS_AL,
    kickstandType: 'not_applicable'
  },
  'laptop-7-150': {
    gpuModel: 'Qualcomm® Adreno™ GPU',
    ppi: '201 PPI',
    colorSupport: 'sRGB 和 Vivid',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'USB4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    npuModel: 'Qualcomm® Hexagon™',
    touchAndPenProtocol: '10 点多点触控，不支持触控笔',
    chassisMaterial: CHASSIS_AL,
    kickstandType: 'not_applicable'
  },
  'pro-10-biz': {
    gpuModel: '英特尔® 显卡',
    ppi: '267 PPI',
    colorSupport: 'sRGB 和 Vivid',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    npuModel: '英特尔® AI Boost',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL,
    kickstandType: KICK_165
  },
  'laptop-6-biz': {
    gpuModel: '英特尔® 显卡',
    ppi: '201 PPI',
    colorSupport: 'sRGB 和增强型',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    npuModel: '英特尔® AI Boost',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL,
    kickstandType: 'not_applicable'
  },
  'sls-2': {
    ppi: '200 PPI',
    colorSupport: 'sRGB 和 Vivid',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL,
    kickstandType: 'not_applicable'
  },
  'sls-2-biz': {
    gpuModel: 'NVIDIA® GeForce RTX™ 4050/4060 或 NVIDIA® RTX™ 2000 Ada',
    ppi: '200 PPI',
    colorSupport: 'sRGB 和 Vivid',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL,
    kickstandType: 'not_applicable'
  },
  'go-4': {
    gpuModel: '英特尔® UHD 显卡',
    ppi: '220 PPI',
    colorSupport: 'sRGB 和 Enhanced',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: '镁合金',
    kickstandType: KICK_165,
    batteryCapacityWh: '29 Wh（额定；最小 28）'
  },
  'laptop-go-3': {
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO_FINGER,
    microphones: MICS_STUDIO,
    kickstandType: 'not_applicable'
  },
  'laptop-go-3-biz': {
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO_FINGER,
    microphones: MICS_STUDIO,
    kickstandType: 'not_applicable'
  },
  'go-3': {
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO,
    microphones: '录音室麦克风（双麦克风）'
  },
  'book-3-15': {
    gpuModel: 'NVIDIA GeForce GTX 1660 Ti Max-Q',
    ppi: '260 PPI',
    aspectRatio: '3:2',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '全尺寸 SDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'book-3-135': {
    gpuModel: 'Intel® Iris™ Plus / NVIDIA GeForce GTX 1650 Max-Q',
    ppi: '267 PPI',
    aspectRatio: '3:2',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '全尺寸 SDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'book-3-biz': {
    aspectRatio: '3:2',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '全尺寸 SDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金',
    kickstandType: 'not_applicable'
  },
  'pro-9': {
    gpuModel: '英特尔® Iris® Xe 或 Microsoft SQ® 3 Adreno™',
    ppi: '267 PPI',
    colorSupport: 'sRGB 和 Vivid',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL
  },
  'pro-9-biz': {
    gpuModel: '英特尔® Iris® Xe 或 Microsoft SQ® 3 Adreno™',
    ppi: '267 PPI',
    colorSupport: 'sRGB 和 Vivid',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL
  },
  'laptop-5': {
    gpuModel: '英特尔® Iris® Xe 显卡',
    ppi: '201 PPI',
    colorSupport: 'sRGB 和 Vivid',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL,
    kickstandType: 'not_applicable'
  },
  'laptop-5-biz': {
    gpuModel: '英特尔® Iris® Xe 显卡',
    ppi: '201 PPI',
    colorSupport: 'sRGB 和 Vivid',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_FAR,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: CHASSIS_AL,
    kickstandType: 'not_applicable'
  },
  'sls-1': {
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    kickstandType: 'not_applicable'
  },
  'sls-1-biz': {
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    kickstandType: 'not_applicable'
  },
  'pro-8': {
    gpuModel: 'Intel® Iris® Xe Graphics',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: 'not_applicable',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: '签名氧化铝'
  },
  'pro-8-biz': {
    gpuModel: 'Intel® Iris® Xe Graphics',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: 'not_applicable',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可拆卸固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: '签名氧化铝'
  },
  'laptop-4': {
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    kickstandType: 'not_applicable'
  },
  'studio-2-plus': {
    gpuModel: 'NVIDIA® GeForce RTX™ 3060',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: 'not_applicable',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    kickstandType: 'not_applicable'
  },
  'studio-2-plus-biz': {
    gpuModel: 'NVIDIA® GeForce RTX™ 3060',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    surfaceConnect: 'not_applicable',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    kickstandType: 'not_applicable'
  },
  'pro-7': {
    gpuModel: 'Intel® UHD Graphics / Intel® Iris™ Plus Graphics',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'pro-6': {
    gpuModel: 'Intel® UHD Graphics 620',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'pro-6-biz': {
    gpuModel: 'Intel® UHD Graphics 620',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'go-2': {
    gpuModel: 'Intel® UHD Graphics 615',
    ppi: '220 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双工作室麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'go-2-biz': {
    gpuModel: 'Intel® UHD Graphics 615',
    ppi: '220 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双工作室麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'go-3-biz': {
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO,
    microphones: '录音室麦克风（双麦克风）'
  },
  'laptop-3': {
    gpuModel: 'Intel® Iris™ Plus / AMD Radeon™ Vega',
    ppi: '201 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可移动固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控，支持 Surface 触控笔',
    chassisMaterial: '铝',
    kickstandType: 'not_applicable'
  },
  'pro-x': {
    gpuModel: 'Microsoft SQ® Adreno™ 685 / 690',
    ppi: '267 PPI',
    headphoneJack: 'not_applicable',
    expandableStorage: 'not_applicable',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可移动固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: '氧化铝'
  },
  'book-2-15': {
    gpuModel: 'Intel® HD Graphics 620 / NVIDIA® GeForce® GTX 1060',
    ppi: '260 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '全尺寸 SDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'laptop-go-2': {
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    windowsHello: HELLO_FINGER,
    microphones: MICS_STUDIO,
    kickstandType: 'not_applicable'
  },
  'pro-7-plus': {
    gpuModel: 'Intel® UHD Graphics (i3) / Intel® Iris® Xe Graphics (i5)',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    ssdRemovable: '支持可移动固态硬盘',
    windowsHello: HELLO,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    touchAndPenProtocol: '10 点多点触控，支持 Microsoft Pen Protocol (MPP)',
    chassisMaterial: '镁合金'
  },
  'pro-5': {
    gpuModel: 'Intel® HD Graphics 615 / HD Graphics 620 / Iris™ Plus Graphics 640',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控'
  },
  'pro-4': {
    gpuModel: 'Intel® HD Graphics 515 / HD Graphics 520 / Iris™ Graphics',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '立体麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金',
    kickstandType: '150° 支架'
  },
  'pro-3': {
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSD 读卡器',
    thunderboltSupport: 'not_applicable',
    aspectRatio: '3:2',
    microphones: '立体麦克风',
    audioTech: 'Dolby Audio™'
  },
  'laptop-2': {
    gpuModel: 'Intel® UHD Graphics 620',
    ppi: '201 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '立体麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控，支持 Surface 触控笔',
    chassisMaterial: '铝',
    kickstandType: 'not_applicable'
  },
  'laptop-1': {
    gpuModel: 'Intel® HD Graphics 620 / Intel® Iris™ Plus Graphics 640',
    ppi: '201 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '立体麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控，支持 Surface 触控笔',
    chassisMaterial: '铝',
    kickstandType: 'not_applicable'
  },
  'laptop-go-1': {
    gpuModel: 'Intel® UHD Graphics',
    ppi: '148 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO_FINGER,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '铝 / 聚碳酸酯',
    kickstandType: 'not_applicable'
  },
  'go-1': {
    gpuModel: 'Intel® HD Graphics 615',
    ppi: '217 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '单个麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'book-1': {
    gpuModel: 'Intel® HD Graphics 520 / NVIDIA® GeForce® / GTX 965M',
    ppi: '267 PPI',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '全尺寸 SDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: '配备 Surface Connect',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '镁合金'
  },
  'studio-2': {
    gpuModel: 'NVIDIA® GeForce® GTX 1060 / GTX 1070',
    ppi: '192 PPI',
    colorSupport: 'sRGB、DCI-P3 与 Vivid',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '全尺寸 SDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: 'not_applicable',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    kickstandType: 'not_applicable'
  },
  'duo-2': {
    windowsHello: HELLO_FINGER,
    thunderboltSupport: 'not_applicable',
    surfaceConnect: 'not_applicable',
    kickstandType: 'not_applicable'
  },
  'pro-2': {
    gpuModel: 'Intel® HD Graphics 4400',
    headphoneJack: '配备耳机插孔',
    expandableStorage: '配备 MicroSDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    aspectRatio: '16:9',
    microphones: '麦克风',
    audioTech: 'Dolby®',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: 'VaporMg',
    kickstandType: '双角度支架'
  },
  'pro-1': {
    headphoneJack: '配备耳机插孔',
    expandableStorage: '配备 MicroSDXC 卡槽',
    thunderboltSupport: 'not_applicable',
    aspectRatio: '16:9',
    microphones: '麦克风',
    touchAndPenProtocol: '10 点多点触控',
    chassisMaterial: '蒸汽Mg',
    kickstandType: '集成支架'
  },
  'studio-1': {
    gpuModel: 'NVIDIA® GeForce® GTX 965M / GTX 980M',
    ppi: '192 PPI',
    colorSupport: 'sRGB、DCI-P3 与鲜艳色彩',
    headphoneJack: '3.5 毫米耳机插孔',
    expandableStorage: '全尺寸 SDXC 读卡器',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: 'not_applicable',
    aspectRatio: '3:2',
    windowsHello: HELLO,
    microphones: '双麦克风',
    audioTech: 'Dolby Audio™',
    touchAndPenProtocol: '10 点多点触控',
    kickstandType: 'not_applicable'
  },
  'duo-1': {
    ppi: '401 PPI',
    expandableStorage: 'not_applicable',
    thunderboltSupport: 'not_applicable',
    surfaceConnect: 'not_applicable',
    aspectRatio: '3:2',
    windowsHello: '指纹读取器',
    microphones: '双麦克风',
    chassisMaterial: '康宁® 大猩猩® 玻璃',
    kickstandType: 'not_applicable',
    panelTech: 'AMOLED'
  },
  'hub-2s': {
    gpuModel: 'Intel® UHD Graphics 620',
    thunderboltSupport: 'not_applicable',
    aspectRatio: '3:2',
    microphones: '8 元素 MEMS 麦克风阵列',
    chassisMaterial: '精密加工铝',
    kickstandType: 'not_applicable'
  }
};

const pro11 = {
  specContains: {
    gpuModel: 'Adreno',
    ppi: '267',
    colorSupport: ['sRGB', 'Vivid'],
    thunderboltSupport: 'USB4',
    surfaceConnect: 'Connect',
    aspectRatio: '3:2',
    ssdRemovable: '可拆',
    windowsHello: 'Hello',
    microphones: '麦克',
    audioTech: 'Atmos',
    npuModel: 'Hexagon',
    touchAndPenProtocol: '10',
    chassisMaterial: '阳极氧化',
    kickstandType: '165'
  },
  specState: { headphoneJack: NA, expandableStorage: NA }
};

const laptop7 = (expandable) => {
  const specContains = {
    gpuModel: 'Adreno',
    ppi: '201',
    colorSupport: ['sRGB', 'Vivid'],
    headphoneJack: '3.5',
    thunderboltSupport: 'USB4',
    surfaceConnect: 'Connect',
    aspectRatio: '3:2',
    ssdRemovable: '可拆',
    windowsHello: 'Hello',
    microphones: '麦克',
    audioTech: 'Atmos',
    npuModel: 'Hexagon',
    touchAndPenProtocol: '10',
    chassisMaterial: '阳极氧化'
  };
  if (expandable) specContains.expandableStorage = 'MicroSD';
  return {
    specContains,
    specState: expandable ? { kickstandType: NA } : { kickstandType: NA, expandableStorage: NA }
  };
};

const sls = {
  specContains: {
    ppi: '200',
    colorSupport: ['sRGB', 'Vivid'],
    headphoneJack: '3.5',
    expandableStorage: 'MicroSD',
    thunderboltSupport: 'Thunderbolt',
    surfaceConnect: 'Connect',
    aspectRatio: '3:2',
    ssdRemovable: '可拆',
    windowsHello: 'Hello',
    microphones: '麦克',
    audioTech: 'Atmos',
    touchAndPenProtocol: '10',
    chassisMaterial: '阳极氧化'
  },
  specState: { kickstandType: NA }
};

const FACTS = {
  'pro-11-13': pro11,
  'laptop-7-138': laptop7(false),
  'laptop-7-150': laptop7(true),
  'pro-10-biz': {
    specContains: {
      gpuModel: '显卡',
      ppi: '267',
      colorSupport: ['sRGB', 'Vivid'],
      thunderboltSupport: 'Thunderbolt',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      npuModel: 'AI Boost',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '阳极氧化',
      kickstandType: '165'
    },
    specState: { headphoneJack: NA, expandableStorage: NA }
  },
  'laptop-6-biz': {
    specContains: {
      gpuModel: '显卡',
      ppi: '201',
      colorSupport: ['sRGB', '增强'],
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      npuModel: 'AI Boost',
      touchAndPenProtocol: '10',
      chassisMaterial: '阳极氧化'
    },
    specState: { kickstandType: NA }
  },
  'sls-2': sls,
  'sls-2-biz': Object.assign({}, sls, {
    specContains: Object.assign({ gpuModel: 'RTX' }, sls.specContains)
  }),
  'go-4': {
    specContains: {
      gpuModel: 'UHD',
      ppi: '220',
      colorSupport: ['sRGB', 'Enhanced'],
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '镁',
      kickstandType: '165'
    },
    specState: { thunderboltSupport: NA }
  },
  'laptop-go-3': {
    specContains: {
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'laptop-go-3-biz': {
    specContains: {
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'go-3': {
    specContains: {
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克'
    },
    specState: { thunderboltSupport: NA }
  },
  'book-3-15': {
    specContains: {
      gpuModel: '1660',
      ppi: '260',
      aspectRatio: '3:2',
      headphoneJack: '3.5',
      expandableStorage: 'SDXC',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'book-3-135': {
    specContains: {
      gpuModel: 'Iris',
      ppi: '267',
      aspectRatio: '3:2',
      headphoneJack: '3.5',
      expandableStorage: 'SDXC',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'book-3-biz': {
    specContains: {
      aspectRatio: '3:2',
      headphoneJack: '3.5',
      expandableStorage: 'SDXC',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'pro-9': {
    specContains: {
      gpuModel: ['Iris', 'Adreno'],
      ppi: '267',
      colorSupport: ['sRGB', 'Vivid'],
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      windowsHello: 'Hello',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '阳极氧化'
    },
    specState: { headphoneJack: NA, expandableStorage: NA }
  },
  'pro-9-biz': {
    specContains: {
      gpuModel: ['Iris', 'Adreno'],
      ppi: '267',
      colorSupport: ['sRGB', 'Vivid'],
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      windowsHello: 'Hello',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '阳极氧化'
    },
    specState: { headphoneJack: NA, expandableStorage: NA }
  },
  'laptop-5': {
    specContains: {
      gpuModel: 'Iris',
      ppi: '201',
      colorSupport: ['sRGB', 'Vivid'],
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '阳极氧化'
    },
    specState: { kickstandType: NA }
  },
  'laptop-5-biz': {
    specContains: {
      gpuModel: 'Iris',
      ppi: '201',
      colorSupport: ['sRGB', 'Vivid'],
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '阳极氧化'
    },
    specState: { kickstandType: NA }
  },
  'sls-1': {
    specContains: {
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克'
    },
    specState: { kickstandType: NA }
  },
  'sls-1-biz': {
    specContains: {
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克'
    },
    specState: { kickstandType: NA }
  },
  'pro-8': {
    specContains: {
      gpuModel: 'Iris',
      ppi: '267',
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '氧化铝'
    },
    specState: { expandableStorage: NA }
  },
  'pro-8-biz': {
    specContains: {
      gpuModel: 'Iris',
      ppi: '267',
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '氧化铝'
    },
    specState: { expandableStorage: NA }
  },
  'laptop-4': {
    specContains: {
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'studio-2-plus': {
    specContains: {
      gpuModel: '3060',
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos'
    },
    specState: { surfaceConnect: NA, kickstandType: NA }
  },
  'studio-2-plus-biz': {
    specContains: {
      gpuModel: '3060',
      headphoneJack: '3.5',
      thunderboltSupport: 'Thunderbolt',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos'
    },
    specState: { surfaceConnect: NA, kickstandType: NA }
  },
  'pro-7': {
    specContains: {
      gpuModel: ['UHD', 'Iris'],
      ppi: '267',
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'pro-6': {
    specContains: {
      gpuModel: 'UHD',
      ppi: '267',
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'pro-6-biz': {
    specContains: {
      gpuModel: 'UHD',
      ppi: '267',
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'go-2': {
    specContains: {
      gpuModel: 'UHD',
      ppi: '220',
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'go-2-biz': {
    specContains: {
      gpuModel: 'UHD',
      ppi: '220',
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'go-3-biz': {
    specContains: {
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克'
    },
    specState: { thunderboltSupport: NA }
  },
  'laptop-3': {
    specContains: {
      gpuModel: ['Iris', 'Vega'],
      ppi: '201',
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可移动',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '铝'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'pro-x': {
    specContains: {
      gpuModel: 'Adreno',
      ppi: '267',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可移动',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '氧化铝'
    },
    specState: { headphoneJack: NA, expandableStorage: NA, thunderboltSupport: NA }
  },
  'book-2-15': {
    specContains: {
      gpuModel: ['620', '1060'],
      ppi: '260',
      headphoneJack: '3.5',
      expandableStorage: 'SDXC',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'laptop-go-2': {
    specContains: {
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      windowsHello: 'Hello',
      microphones: '麦克'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'pro-7-plus': {
    specContains: {
      gpuModel: ['UHD', 'Iris'],
      ppi: '267',
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      ssdRemovable: '可移动',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      touchAndPenProtocol: ['10', 'MPP'],
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'pro-5': {
    specContains: {
      gpuModel: ['615', '620', '640'],
      ppi: '267',
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10'
    },
    specState: { thunderboltSupport: NA }
  },
  'pro-4': {
    specContains: {
      gpuModel: ['515', '520'],
      ppi: '267',
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁',
      kickstandType: '150'
    },
    specState: { thunderboltSupport: NA }
  },
  'pro-3': {
    specContains: {
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      aspectRatio: '3:2',
      microphones: '麦克',
      audioTech: 'Audio'
    },
    specState: { thunderboltSupport: NA }
  },
  'laptop-2': {
    specContains: {
      gpuModel: 'UHD',
      ppi: '201',
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '铝'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'laptop-1': {
    specContains: {
      gpuModel: ['620', '640'],
      ppi: '201',
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '铝'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'laptop-go-1': {
    specContains: {
      gpuModel: 'UHD',
      ppi: '148',
      headphoneJack: '3.5',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '铝'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  },
  'go-1': {
    specContains: {
      gpuModel: '615',
      ppi: '217',
      headphoneJack: '3.5',
      expandableStorage: 'MicroSD',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'book-1': {
    specContains: {
      gpuModel: ['520', '965'],
      ppi: '267',
      headphoneJack: '3.5',
      expandableStorage: 'SDXC',
      surfaceConnect: 'Connect',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10',
      chassisMaterial: '镁'
    },
    specState: { thunderboltSupport: NA }
  },
  'studio-2': {
    specContains: {
      gpuModel: ['1060', '1070'],
      ppi: '192',
      colorSupport: ['sRGB', 'Vivid'],
      headphoneJack: '3.5',
      expandableStorage: 'SDXC',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10'
    },
    specState: { thunderboltSupport: NA, surfaceConnect: NA, kickstandType: NA }
  },
  'duo-2': {
    specContains: {
      windowsHello: 'Hello'
    },
    specState: { thunderboltSupport: NA, surfaceConnect: NA, kickstandType: NA }
  },
  'pro-2': {
    specContains: {
      gpuModel: '4400',
      headphoneJack: '耳机',
      expandableStorage: 'MicroSD',
      aspectRatio: '16:9',
      microphones: '麦克',
      audioTech: 'Dolby',
      touchAndPenProtocol: '10',
      chassisMaterial: 'VaporMg',
      kickstandType: '双角度'
    },
    specState: { thunderboltSupport: NA }
  },
  'pro-1': {
    specContains: {
      headphoneJack: '耳机',
      expandableStorage: 'MicroSD',
      aspectRatio: '16:9',
      microphones: '麦克',
      touchAndPenProtocol: '10',
      chassisMaterial: 'Mg',
      kickstandType: '支架'
    },
    specState: { thunderboltSupport: NA }
  },
  'studio-1': {
    specContains: {
      gpuModel: ['965', '980'],
      ppi: '192',
      colorSupport: ['sRGB', '鲜艳'],
      headphoneJack: '3.5',
      expandableStorage: 'SDXC',
      aspectRatio: '3:2',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Audio',
      touchAndPenProtocol: '10'
    },
    specState: { thunderboltSupport: NA, surfaceConnect: NA, kickstandType: NA }
  },
  'duo-1': {
    specContains: {
      ppi: '401',
      aspectRatio: '3:2',
      windowsHello: '指纹',
      microphones: '麦克',
      chassisMaterial: '康宁',
      panelTech: 'AMOLED'
    },
    specState: { expandableStorage: NA, thunderboltSupport: NA, surfaceConnect: NA, kickstandType: NA }
  },
  'hub-2s': {
    specContains: {
      gpuModel: 'UHD',
      aspectRatio: '3:2',
      microphones: '麦克',
      chassisMaterial: '铝'
    },
    specState: { thunderboltSupport: NA, kickstandType: NA }
  }
};

let dataSrc = fs.readFileSync(DATA_PATH, 'utf8');
Object.keys(DATA).forEach((id) => {
  const { start, end } = deviceSpan(dataSrc, id);
  let block = dataSrc.slice(start, end);
  Object.keys(DATA[id]).forEach((key) => {
    block = setField(block, key, DATA[id][key]);
  });
  dataSrc = dataSrc.slice(0, start) + block + dataSrc.slice(end);
});

let factsSrc = fs.readFileSync(FACTS_PATH, 'utf8');
Object.keys(FACTS).forEach((id) => {
  factsSrc = injectFacts(factsSrc, id, FACTS[id]);
});
factsSrc = factsSrc.replace(/([^\s,])(\s*\n\s*specContains:)/g, '$1,$2');

fs.writeFileSync(DATA_PATH, dataSrc);
fs.writeFileSync(FACTS_PATH, factsSrc);
try {
  delete require.cache[require.resolve(FACTS_PATH)];
  require(FACTS_PATH);
  console.log('locked hist REST', Object.keys(FACTS).join(','));
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
