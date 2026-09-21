/**
 * Lock current-device REST specs from 国行商城规格表, then withdraw leftover VALID.
 * Run from repo root: node .scratch/lock-rest-cn.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js/surface-data.js');
const FACTS_PATH = path.join(ROOT, 'tests/official-current-lineup-facts.js');

const WRITE_ALIASES = {
  colorSupport: ['colorSupport', 'colorGamut'],
  headphoneJack: ['headphoneJack', 'audioJack'],
  microphones: ['microphones', 'mics'],
  expandableStorage: ['expandableStorage', 'sdSlot'],
  thunderboltSupport: ['thunderboltSupport'],
  windowsHello: ['windowsHello'],
  audioTech: ['audioTech'],
  surfaceConnect: ['surfaceConnect'],
  usbPorts: ['usbPorts', 'usbC']
};

function findDeviceSpan(src, deviceId) {
  const needle = `"id": "${deviceId}"`;
  const start = src.indexOf(needle);
  if (start < 0) throw new Error('missing device ' + deviceId);
  const next = src.indexOf('\n    {\n      "id":', start + needle.length);
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

function replaceField(block, key, value) {
  const writeKey = existingKey(block, key);
  const jsonVal = JSON.stringify(value);
  const re = new RegExp(`("${writeKey}":\\s*)(?:"(?:\\\\.|[^"\\\\])*"|not_disclosed|not_applicable)`);
  if (re.test(block)) return block.replace(re, `$1${jsonVal}`);
  const specsIdx = block.indexOf('"specs": {');
  if (specsIdx < 0) throw new Error('no specs in ' + key);
  const insertAt = block.indexOf('\n', specsIdx) + 1;
  return block.slice(0, insertAt) + `        "${writeKey}": ${jsonVal},\n` + block.slice(insertAt);
}

function patchDevice(src, deviceId, fields) {
  const { start, end } = findDeviceSpan(src, deviceId);
  let block = src.slice(start, end);
  Object.keys(fields).forEach((key) => {
    block = replaceField(block, key, fields[key]);
  });
  return src.slice(0, start) + block + src.slice(end);
}

function closeBrace(src, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error('unbalanced brace');
}

function injectFacts(src, deviceId, extra) {
  const needle = `'${deviceId}': {`;
  const start = src.indexOf(needle);
  if (start < 0) throw new Error('missing fact ' + deviceId);
  const open = start + needle.length - 1;
  const close = closeBrace(src, open);
  const already = src.slice(open, close);
  if (already.includes('specContains:') || already.includes('specContains :')) return src;
  const snippet = Object.keys(extra).map((k) => `      ${k}: ${JSON.stringify(extra[k], null, 6).replace(/\n/g, '\n      ')},`).join('\n') + '\n';
  return src.slice(0, close) + snippet + src.slice(close);
}

const COLOR_SRGB_VIVID = 'SDR：sRGB 和 Vivid；支持杜比视界 IQ';
const COLOR_SRGB_ENHANCED = 'sRGB 和增强型';
const HELLO_FACE = 'Windows Hello 面部识别';
const HELLO_FINGER = 'Windows Hello 指纹电源按钮';
const MICS_STUDIO = '双 Studio Mics，支持语音聚焦';
const MICS_FARFIELD = '矩阵式远场双麦克风';
const CHASSIS = '阳极氧化铝';
const KICK_165 = '一体式支架，165 度全阻尼铰链';
const PEN_MPP = '10 点多点触控，支持 Microsoft Pen Protocol (MPP)';
const PEN_10_NO_PEN = '10 点多点触控，不支持触控笔';
const AI_PC = 'Windows 11 AI+ PC';

const DATA_PATCHES = {
  'pro-12-13-intel': {
    colorSupport: COLOR_SRGB_VIVID,
    touchAndPenProtocol: PEN_MPP,
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    kickstandType: KICK_165,
    gpuModel: '英特尔® 图形处理器',
    npuModel: '英特尔® AI Boost',
    copilotPlus: AI_PC
  },
  'pro-12-13-snap': {
    colorSupport: COLOR_SRGB_VIVID,
    touchAndPenProtocol: PEN_MPP,
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    kickstandType: KICK_165,
    gpuModel: 'Qualcomm® Adreno™ GPU',
    npuModel: 'Qualcomm® Hexagon™',
    copilotPlus: AI_PC
  },
  'pro-12-13': {
    colorSupport: COLOR_SRGB_VIVID,
    touchAndPenProtocol: PEN_MPP,
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    kickstandType: KICK_165,
    gpuModel: 'Qualcomm® Adreno™ GPU',
    npuModel: 'Qualcomm® Hexagon™',
    copilotPlus: AI_PC
  },
  'pro-12-inch': {
    colorSupport: 'sRGB 和增强型，对比度 1300:1',
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    kickstandType: KICK_165,
    usbPorts: '2 × USB-C® / USB 3.2（充电、数据、DisplayPort 1.4a，最多两台 4K 60Hz）',
    thunderboltSupport: 'not_applicable',
    copilotPlus: AI_PC
  },
  'pro-12-inch-biz': {
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    kickstandType: KICK_165,
    ssdRemovable: 'not_applicable',
    thunderboltSupport: 'not_applicable',
    copilotPlus: AI_PC
  },
  'laptop-8-138-intel': {
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    chassisMaterial: CHASSIS,
    colorSupport: 'sRGB 和 Vivid，对比度 1300:1',
    touchAndPenProtocol: PEN_10_NO_PEN,
    copilotPlus: AI_PC
  },
  'laptop-8-138-snap': {
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    thunderboltSupport: 'USB4',
    chassisMaterial: CHASSIS,
    colorSupport: 'sRGB 和 Vivid，对比度 1300:1',
    touchAndPenProtocol: PEN_10_NO_PEN,
    copilotPlus: AI_PC
  },
  'laptop-8-150-intel': {
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    colorSupport: COLOR_SRGB_VIVID,
    expandableStorage: '配备 MicroSDXC Express 读卡器',
    touchAndPenProtocol: PEN_10_NO_PEN,
    copilotPlus: AI_PC
  },
  'laptop-8-150-snap': {
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    colorSupport: COLOR_SRGB_VIVID,
    expandableStorage: '配备 MicroSDXC Express 读卡器',
    touchAndPenProtocol: PEN_10_NO_PEN,
    copilotPlus: AI_PC
  },
  'laptop-8-138': {
    colorSupport: 'sRGB 和 Vivid',
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    thunderboltSupport: 'USB4',
    chassisMaterial: CHASSIS,
    touchAndPenProtocol: PEN_10_NO_PEN,
    copilotPlus: AI_PC
  },
  'laptop-8-150': {
    colorSupport: 'sRGB 和 Vivid',
    windowsHello: HELLO_FACE,
    microphones: MICS_STUDIO,
    audioTech: 'Dolby Atmos®',
    thunderboltSupport: 'USB4',
    chassisMaterial: CHASSIS,
    kickstandType: 'not_applicable',
    expandableStorage: '配备 MicroSDXC Express 读卡器',
    touchAndPenProtocol: PEN_10_NO_PEN,
    copilotPlus: AI_PC
  },
  'laptop-13-inch': {
    gpuModel: 'Qualcomm® Adreno™ GPU',
    audioTech: 'Dolby Audio™',
    windowsHello: HELLO_FINGER,
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    copilotPlus: AI_PC
  },
  'laptop-13-inch-biz': {
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    thunderboltSupport: 'not_applicable',
    copilotPlus: AI_PC
  },
  'laptop-13-inch-intel-biz': {
    microphones: MICS_STUDIO,
    chassisMaterial: CHASSIS,
    thunderboltSupport: 'not_applicable',
    copilotPlus: AI_PC
  },
  'pro-11-biz-snap': {
    colorSupport: 'sRGB 和 Vivid',
    microphones: MICS_FARFIELD,
    chassisMaterial: CHASSIS,
    kickstandType: KICK_165,
    copilotPlus: AI_PC
  },
  'pro-11-biz-intel': {
    chassisMaterial: CHASSIS,
    kickstandType: KICK_165,
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    copilotPlus: AI_PC
  },
  'laptop-7-biz-snap': {
    colorSupport: 'sRGB 和 Vivid',
    audioTech: 'Dolby Atmos®',
    microphones: MICS_FARFIELD,
    chassisMaterial: CHASSIS,
    expandableStorage: '15 英寸配备 MicroSDXC 读卡器',
    thunderboltSupport: 'USB4',
    copilotPlus: AI_PC
  },
  'laptop-7-biz-intel': {
    chassisMaterial: CHASSIS,
    expandableStorage: '15 英寸配备 MicroSDXC Express 读卡器',
    thunderboltSupport: 'USB4 / Thunderbolt™ 4',
    copilotPlus: AI_PC
  }
};

const NA = 'NOT_APPLICABLE';
const pro13Rest = (gpu, npu) => ({
  specContains: {
    ppi: '267',
    aspectRatio: '3:2',
    colorSupport: ['sRGB', 'Vivid'],
    windowsHello: 'Hello',
    microphones: 'Studio',
    audioTech: 'Atmos',
    surfaceConnect: 'Connect',
    ssdRemovable: '可拆',
    chassisMaterial: '阳极氧化',
    kickstandType: '165',
    touchAndPenProtocol: ['10', 'MPP'],
    gpuModel: gpu,
    npuModel: npu,
    panelTech: 'PixelSense',
    copilotPlus: 'AI+'
  },
  specState: {
    headphoneJack: NA,
    expandableStorage: NA
  }
});

const laptop8_138 = (gpu, npu, tb) => ({
  specContains: {
    ppi: '201',
    aspectRatio: '3:2',
    colorSupport: ['sRGB', 'Vivid'],
    headphoneJack: '3.5',
    windowsHello: 'Hello',
    microphones: 'Studio',
    audioTech: 'Atmos',
    surfaceConnect: 'Connect',
    ssdRemovable: '可拆',
    chassisMaterial: '阳极氧化',
    touchAndPenProtocol: '10',
    gpuModel: gpu,
    npuModel: npu,
    thunderboltSupport: tb,
    panelTech: 'PixelSense',
    copilotPlus: 'AI+'
  },
  specState: {
    kickstandType: NA,
    expandableStorage: NA
  }
});

const laptop8_150 = (gpu, npu, tb) => ({
  specContains: {
    ppi: '262',
    aspectRatio: '3:2',
    colorSupport: ['sRGB', 'Vivid'],
    headphoneJack: '3.5',
    windowsHello: 'Hello',
    microphones: 'Studio',
    audioTech: 'Atmos',
    surfaceConnect: 'Connect',
    ssdRemovable: '可拆',
    chassisMaterial: '阳极氧化',
    touchAndPenProtocol: '10',
    gpuModel: gpu,
    npuModel: npu,
    thunderboltSupport: tb,
    expandableStorage: 'MicroSD',
    panelTech: 'PixelSense',
    copilotPlus: 'AI+'
  },
  specState: {
    kickstandType: NA
  }
});

const laptop13 = (gpu, npu) => ({
  specContains: {
    ppi: '178',
    aspectRatio: '3:2',
    colorSupport: ['sRGB', '增强'],
    headphoneJack: '3.5',
    windowsHello: 'Hello',
    microphones: 'Studio',
    audioTech: 'Audio',
    chassisMaterial: '阳极氧化',
    touchAndPenProtocol: '10',
    gpuModel: gpu,
    npuModel: npu,
    panelTech: 'PixelSense',
    copilotPlus: 'AI+'
  },
  specState: {
    kickstandType: NA,
    expandableStorage: NA,
    surfaceConnect: NA,
    thunderboltSupport: NA
  }
});

const FACT_PATCHES = {
  'pro-12-13': pro13Rest('Adreno', 'Hexagon'),
  'pro-12-13-intel': pro13Rest('图形处理器', 'AI Boost'),
  'pro-12-13-snap': pro13Rest('Adreno', 'Hexagon'),
  'pro-12-inch': {
    specContains: {
      ppi: '220',
      aspectRatio: '3:2',
      colorSupport: ['sRGB', '增强'],
      windowsHello: 'Hello',
      microphones: 'Studio',
      audioTech: 'Atmos',
      chassisMaterial: '阳极氧化',
      kickstandType: '165',
      touchAndPenProtocol: '10',
      gpuModel: 'Adreno',
      npuModel: 'Hexagon',
      panelTech: 'PixelSense',
      copilotPlus: 'AI+'
    },
    specState: {
      headphoneJack: NA,
      expandableStorage: NA,
      surfaceConnect: NA,
      thunderboltSupport: NA
    },
    usbMustNotInclude: ['USB4', 'Thunderbolt', '雷电']
  },
  'pro-12-inch-biz': {
    specContains: {
      ppi: '220',
      aspectRatio: '3:2',
      colorSupport: ['sRGB', '增强'],
      windowsHello: 'Hello',
      microphones: 'Studio',
      audioTech: 'Atmos',
      chassisMaterial: '阳极氧化',
      kickstandType: '165',
      touchAndPenProtocol: '10',
      gpuModel: 'Adreno',
      npuModel: 'Hexagon',
      panelTech: 'PixelSense',
      copilotPlus: 'AI+'
    },
    specState: {
      headphoneJack: NA,
      expandableStorage: NA,
      surfaceConnect: NA,
      thunderboltSupport: NA,
      ssdRemovable: NA
    },
    usbMustNotInclude: ['USB4', 'Thunderbolt', '雷电']
  },
  'laptop-8-138': laptop8_138('Adreno', 'Hexagon', 'USB4'),
  'laptop-8-138-intel': laptop8_138('图形处理器', 'AI Boost', 'Thunderbolt'),
  'laptop-8-138-snap': laptop8_138('Adreno', 'Hexagon', 'USB4'),
  'laptop-8-150': laptop8_150('Adreno', 'Hexagon', 'USB4'),
  'laptop-8-150-intel': laptop8_150('图形处理器', 'AI Boost', 'Thunderbolt'),
  'laptop-8-150-snap': laptop8_150('Adreno', 'Hexagon', 'USB4'),
  'laptop-13-inch': laptop13('Adreno', 'Hexagon'),
  'laptop-13-inch-biz': laptop13('Adreno', 'Hexagon'),
  'laptop-13-inch-intel-biz': laptop13('图形处理器', 'AI Boost'),
  'pro-11-biz-snap': {
    specContains: {
      ppi: '267',
      aspectRatio: '3:2',
      colorSupport: ['sRGB', 'Vivid'],
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      surfaceConnect: '支持',
      ssdRemovable: '可拆',
      chassisMaterial: '阳极氧化',
      kickstandType: '165',
      touchAndPenProtocol: '10',
      gpuModel: 'Adreno',
      npuModel: 'Hexagon',
      panelTech: 'PixelSense',
      copilotPlus: 'AI+'
    },
    specState: {
      headphoneJack: NA,
      expandableStorage: NA
    }
  },
  'pro-11-biz-intel': {
    specContains: {
      ppi: '267',
      aspectRatio: '3:2',
      colorSupport: ['sRGB', 'Vivid'],
      windowsHello: 'Hello',
      microphones: 'Studio',
      audioTech: 'Atmos',
      surfaceConnect: '支持',
      ssdRemovable: '可拆',
      chassisMaterial: '阳极氧化',
      kickstandType: '165',
      touchAndPenProtocol: '10',
      gpuModel: 'Arc',
      npuModel: 'AI Boost',
      thunderboltSupport: 'Thunderbolt',
      panelTech: 'PixelSense',
      copilotPlus: 'AI+'
    },
    specState: {
      headphoneJack: NA,
      expandableStorage: NA
    }
  },
  'laptop-7-biz-snap': {
    specContains: {
      ppi: '201',
      aspectRatio: '3:2',
      colorSupport: ['sRGB', 'Vivid'],
      headphoneJack: '3.5',
      windowsHello: 'Hello',
      microphones: '麦克',
      audioTech: 'Atmos',
      surfaceConnect: '支持',
      ssdRemovable: '可拆',
      chassisMaterial: '阳极氧化',
      touchAndPenProtocol: '10',
      gpuModel: 'Adreno',
      npuModel: 'Hexagon',
      thunderboltSupport: 'USB4',
      expandableStorage: 'MicroSD',
      panelTech: 'PixelSense',
      copilotPlus: 'AI+'
    },
    specState: {
      kickstandType: NA
    }
  },
  'laptop-7-biz-intel': {
    specContains: {
      ppi: '201',
      aspectRatio: '3:2',
      colorSupport: ['sRGB', 'Vivid'],
      headphoneJack: '3.5',
      windowsHello: 'Hello',
      microphones: 'Studio',
      audioTech: 'Atmos',
      surfaceConnect: '支持',
      ssdRemovable: '可拆',
      chassisMaterial: '阳极氧化',
      touchAndPenProtocol: '10',
      gpuModel: 'Arc',
      npuModel: 'AI Boost',
      thunderboltSupport: 'Thunderbolt',
      expandableStorage: 'MicroSD',
      panelTech: 'PixelSense',
      copilotPlus: 'AI+'
    },
    specState: {
      kickstandType: NA
    }
  },
  'hub-3': {
    specContains: {
      aspectRatio: '3:2',
      ssdRemovable: '可拆',
      touchAndPenProtocol: '10',
      panelTech: 'PixelSense'
    },
    specState: {
      headphoneJack: NA,
      expandableStorage: NA,
      surfaceConnect: NA,
      kickstandType: NA,
      npuModel: NA,
      copilotPlus: NA,
      fastCharging: NA
    }
  }
};

let dataSrc = fs.readFileSync(DATA_PATH, 'utf8');
Object.keys(DATA_PATCHES).forEach((id) => {
  dataSrc = patchDevice(dataSrc, id, DATA_PATCHES[id]);
});

let factsSrc = fs.readFileSync(FACTS_PATH, 'utf8');
Object.keys(FACT_PATCHES).forEach((id) => {
  factsSrc = injectFacts(factsSrc, id, FACT_PATCHES[id]);
});

fs.writeFileSync(DATA_PATH, dataSrc);
fs.writeFileSync(FACTS_PATH, factsSrc);
console.log('patched current REST facts + 国行 wording');
