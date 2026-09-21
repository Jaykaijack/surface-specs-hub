const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../js/surface-data.js');
let content = fs.readFileSync(dataFile, 'utf8');

// 1. Locate chip 0
const id0 = content.indexOf('"id": "intel-core-ultra-gen3"');
const id1 = content.indexOf('"id": "snapdragon-x2-elite"');

if (id0 === -1 || id1 === -1) {
  console.error('Could not find chip IDs!');
  process.exit(1);
}

const chip0Start = content.lastIndexOf('{', id0);
const chip0End = content.lastIndexOf('{', id1);

const newChip0Obj = {
  id: "intel-core-ultra-gen3",
  name: "Intel® Core™ Ultra (第 3 代)",
  vendor: "英特尔 Intel®",
  architecture: "x86-64 (Lion Cove P核 + Skymont E核 + LPE核)",
  processNode: "Intel 18A / TSMC 先进制程",
  cores: "高性能多核混合架构 (最高 5.1 GHz)",
  gpu: "Intel® Arc™ 140V 核显 (支持硬件光追与 XeSS)",
  npuTops: 50,
  npuDesc: "50 TOPS (全新独立 Intel AI Boost 神经处理单元)",
  copilotPlus: true,
  memorySupport: "LPDDR5x / DDR5 高速内存",
  equippedDevices: [
    "Surface Pro 13 英寸 (第 12 代) 商用版 - Intel 版",
    "Surface Laptop (第 8 代) 商用版 - Intel 版"
  ],
  highlights: "英特尔新一代商用旗舰 AI PC 处理器，内置 50 TOPS 独立 AI Boost NPU，原生兼顾 100% 传统 x86 企业级工业与办公软件兼容性与端侧 AI 算力。"
};

const newChip0Str = JSON.stringify(newChip0Obj, null, 2).split('\n').map(l => '  ' + l).join('\r\n') + ',\r\n';

content = content.slice(0, chip0Start) + newChip0Str + content.slice(chip0End);
console.log('Chip 0 successfully patched!');

// 2. Locate accessories
const accKey = '"accessories":';
const accStart = content.indexOf(accKey);
if (accStart === -1) {
  console.error('Could not find accessories key!');
  process.exit(1);
}

const accBracketStart = content.indexOf('[', accStart);
const closingBrace = content.indexOf('};', accBracketStart);
const accBracketEnd = content.lastIndexOf(']', closingBrace);

console.log('accBracketStart:', accBracketStart, 'accBracketEnd:', accBracketEnd);

const accessories = require('./generate_accessories.js');
const newAccStr = JSON.stringify(accessories, null, 2).split('\n').map(l => '  ' + l).join('\r\n');

content = content.slice(0, accStart) + '"accessories": ' + newAccStr.trim() + content.slice(accBracketEnd + 1);
console.log('Accessories successfully patched! Total count:', accessories.length);

fs.writeFileSync(dataFile, content, 'utf8');
console.log('js/surface-data.js successfully written!');
