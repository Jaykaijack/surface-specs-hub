const fs = require('fs');
let text = fs.readFileSync('tests/test-runner.js', 'utf-8');

// Add specific tests into Test Suite 7
const targetSuite7 = `// 检验新收录的官方 12 英寸机型`;
const addedTests = `// 检验消费版旗舰 Pro 13 (第 12 代) 严格零宝石蓝 (对齐新一代评测指南与老大指正)
const pro12_13_cons = SURFACE_DATA.devices.find(d => d.id === 'pro-12-13');
assert(Boolean(pro12_13_cons), '全系参数库正式收录 Surface Pro 13 英寸 (第 12 代) 消费版');
assert(!pro12_13_cons.specs.colors.some(c => c.name === '宝石蓝'), 'Pro 13 消费版第 12 代严格零宝石蓝 (对齐官方评测指南三款经典配色)');
assertEqual(pro12_13_cons.specs.colors.length, 3, 'Pro 13 消费版第 12 代严格三款配色: 亮铂金、典雅黑、沙漫金');

// 检验消费版旗舰 Laptop 13.8 (第 8 代) 独占翡翠绿新色
const laptop8_138_cons = SURFACE_DATA.devices.find(d => d.id === 'laptop-8-138');
assert(Boolean(laptop8_138_cons), '全系参数库正式收录 Surface Laptop 13.8 英寸 (第 8 代) 消费版');
assert(laptop8_138_cons.specs.colors.some(c => c.name === '翡翠绿'), 'Laptop 13.8 第 8 代独占全新翡翠绿 (Emerald) 官方配色');
assert(!laptop8_138_cons.specs.colors.some(c => c.name === '宝石蓝'), 'Laptop 13.8 第 8 代消费版严格无宝石蓝配色');

// 检验找回并录入的消费版 13 英寸机型 (Surface Laptop 13 英寸 第 1 代)
const laptop13Inch = SURFACE_DATA.devices.find(d => d.id === 'laptop-13-inch');
assert(Boolean(laptop13Inch), '全系参数库正式收录官方 Surface Laptop, 13 英寸 (第 1 代) 消费版');
assertEqual(laptop13Inch.specs.resolution, '1920 × 1280', 'Laptop 13 英寸机型分辨率 1920x1280 准确无误');
assertEqual(laptop13Inch.specs.npuTops, '45 TOPS', 'Laptop 13 英寸机型搭载 45 TOPS 高通 NPU');
assertEqual(laptop13Inch.specs.startingPriceCny, '¥7,788 起 (消费版)', 'Laptop 13 英寸机型官方商城起售价准确无误 (Actual: ¥7,788 起)');
assert(laptop13Inch.specs.officialDocUrl.includes('configure/surface-laptop-13-inch'), 'Laptop 13 英寸官方商城直达选配页链接准确');
assertEqual(laptop13Inch.specs.weightGrams, '1220g (1.22 kg)', 'Laptop 13 英寸机型裸机重量 1.22kg 准确无误');

// 检验消费版 Laptop 7 15 英寸机型
const laptop7_150 = SURFACE_DATA.devices.find(d => d.id === 'laptop-7-150');
assert(Boolean(laptop7_150), '全系参数库正式收录官方 Surface Laptop (第 7 代) 15 英寸 消费版');
assert(laptop7_150.specs.screenSize.includes('15.0 英寸'), 'Laptop 7 15 英寸屏幕规格准确');
assert(laptop7_150.specs.cpuModel.includes('高通骁龙® X Elite'), 'Laptop 7 15 英寸搭载骁龙 X Elite 旗舰核心');

// 检验商用版新增机型: Surface Laptop 13 英寸 商用版 - Intel 版
const laptop13_intel_biz = SURFACE_DATA.devices.find(d => d.id === 'laptop-13-inch-intel-biz');
assert(Boolean(laptop13_intel_biz), '全系参数库正式收录 Surface Laptop 13 英寸 商用版 - Intel 版');
assert(laptop13_intel_biz.specs.cpuModel.includes('酷睿™ Ultra 5 处理器 125'), 'Laptop 13 英寸 Intel 版搭载英特尔酷睿 Ultra 5 125');
assertEqual(laptop13_intel_biz.specs.startingPriceCny, '¥11,788 起 (商用版)', 'Laptop 13 英寸 Intel 商用版起售价精准对齐 CommercialCofig (¥11,788 起)');
assertEqual(laptop13_intel_biz.specs.colors.length, 1, 'Laptop 13 英寸 Intel 商用版严格单色亮铂金');

// 检验新收录的官方 12 英寸机型`;

text = text.replace(targetSuite7, addedTests);

// Update count assertions in Suite 9 & 10
text = text.replace('当前收录: 26 款', '当前收录: ${commercialDevs.length} 款');
text = text.replace('assert(commercialDevs.length >= 26, `全面收录商用机型 (当前收录: ${commercialDevs.length} 款)`);',
  'assert(commercialDevs.length >= 30, `全面收录商用机型 (当前收录: ${commercialDevs.length} 款)`);');

text = text.replace('全系 43 款产品 100% 具备官方信源超链接 (Actual: 64)',
  '全系 70 款产品 100% 具备官方信源超链接 (Actual: ${allDevicesWithSource.length})');

text = text.replace('assert(allDevicesWithSource.length >= 43, `全系 43 款产品 100% 具备官方信源超链接 (Actual: ${allDevicesWithSource.length})`);',
  'assert(allDevicesWithSource.length >= 70, `全系 70 款产品 100% 具备官方信源超链接 (Actual: ${allDevicesWithSource.length})`);');

fs.writeFileSync('tests/test-runner.js', text, 'utf-8');
console.log('Saved tests/test-runner.js');
