const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// 1. Unpack exact baseline from cloud seed
const SEED_DIR = path.join(__dirname, 'cloud-seed');
const chunkFiles = fs.readdirSync(SEED_DIR).filter(f => /^chunk-\d+\.txt$/.test(f)).sort();
const parts = chunkFiles.map(f => fs.readFileSync(path.join(SEED_DIR, f), 'utf8').split('\n')[0]);
const gz = Buffer.from(parts.join(''), 'base64');
const json = zlib.gunzipSync(gz).toString('utf8');
const data = JSON.parse(json);

// 2. Fix chip 0 (intel-core-ultra-gen3)
data.chips[0] = {
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

// 3. Replace accessories with all 23 full ecosystem accessories
const fullAccessories = require('./build_full_accessories_data.js');
data.accessories = fullAccessories;

// 4. Generate the full js/surface-data.js code
const code = `/**
 * Microsoft Surface Specs Hub - Master Database (2012 - 2026)
 * 严格对齐 PRD 13 大专属参数体系、产品状态生命周期、未知参数治理与配件双向兼容
 * 消费版与商用版两大顶级大类彻底分离 · 官方商用版全线对齐 Microsoft Learn 与原厂 Fact Sheet · 100% 微软官方商城与技术白皮书存档
 */

const SURFACE_DATA = ${JSON.stringify(data, null, 2)};

// 挂载辅助工具方法
SURFACE_DATA.getDeviceImage = function(device, colorName) {
  if (!device) return './assets/products/surface-new-pro-hero.png';
  if (colorName && device.specs && Array.isArray(device.specs.colors)) {
    const found = device.specs.colors.find(c => c.name === colorName);
    if (found && found.image) return found.image;
  }
  return device.heroImage || './assets/products/surface-new-pro-hero.png';
};

if (typeof window !== 'undefined') {
  window.SURFACE_DATA = SURFACE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SURFACE_DATA;
}
`;

const targetFile = path.join(__dirname, '../js/surface-data.js');
fs.writeFileSync(targetFile, code, 'utf8');
console.log('Successfully rebuilt js/surface-data.js!');
console.log('Devices:', data.devices.length);
console.log('Chips:', data.chips.length);
console.log('Accessories:', data.accessories.length);
