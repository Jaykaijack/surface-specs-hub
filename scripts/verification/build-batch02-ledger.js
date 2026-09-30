#!/usr/bin/env node
// This ledger records reviewed evidence rules, never modifies product data.
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const data = require(path.join(root, 'js/surface-data.js'));
const output = process.argv[2];
assert(output, 'Supply an immutable output snapshot path');

function text(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(text).join('');
  if (node.type === 'br') return '\n';
  if (node.type === 'sup' && node.props?.id) return '';
  return text(node.props?.children);
}

// Values below were manually reviewed against each product's own specification
// section. Missing mappings deliberately remain PENDING, not NOT_DISCLOSED.
const common = {
  cpuModel: ['处理器', ['X2 Plus', '6 核']],
  cpuCores: ['处理器', ['6 核']],
  gpuModel: ['显卡', ['Adreno']],
  npuModel: ['NPU', ['Hexagon']],
  npuTops: ['NPU', ['80 TOPS']],
  ramSpec: ['内存和存储空间', ['8GB', '16', '24', 'LPDDR5x']],
  storageOptions: ['内存和存储空间', ['256GB', '512GB', 'UFS']],
  aspectRatio: ['显示屏', []],
  panelTech: ['@display', ['LCD']],
  brightness: ['显示屏', ['500', '典型值']],
  frontCamera: ['摄像头', ['1080p', '前置']],
  speakers: ['音频', []],
  tpmChip: ['安全性', ['Pluton', 'TPM 2.0']],
  securedCorePc: ['安全性', ['安全核心 PC']],
  osAtLaunch: ['软件', ['Windows 11 家庭版', 'Office 家庭版 2024']],
  warranty: ['保修', ['发票', '2年有限硬件保修']],
  dimensionsMm: ['尺寸和重量', []],
  weightGrams: ['尺寸和重量', []],
  colors: ['@variants', []],
  status: ['@price', ['10月19日预售']],
  releaseDate: ['@price', ['10月19日预售']],
  fastCharging: ['端口和充电', ['60', '快速充电']],
};
const reviewed = {
  'pro-12-inch-2': {
    ...common,
    screenSize: ['显示屏', ['12 英寸']],
    resolution: ['显示屏', ['2196 x 1464']],
    ppi: ['显示屏', ['220 PPI']],
    refreshRate: ['显示屏', ['90 Hz', '60 Hz']],
    colorGamut: ['显示屏', ['sRGB', '增强型', '1400:1']],
    displayProtection: ['显示屏', ['强化玻璃']],
    touchSupport: ['显示屏', ['多点触控']],
    penSupport: ['触控笔与键盘兼容性', ['超薄触控笔 2', '触觉反馈']],
    touchAndPenProtocol: ['触控笔与键盘兼容性', ['Microsoft Pen Protocol']],
    penChargingType: ['触控笔与键盘兼容性', ['背部', '无线充电']],
    keyboardCompatibility: ['触控笔与键盘兼容性', ['12 英寸键盘']],
    rearCamera: ['摄像头', ['1000 万像素']],
    studioEffects: ['摄像头', ['自动取景', '人像模糊', '创意滤镜', '眼神交流', '人像光效']],
    mics: ['音频', ['远场双麦克风', '语音聚焦']],
    audioTech: ['音频', ['Atmos']],
    usbC: ['端口和充电', ['2 个 USB-C', 'USB 3.2', 'DisplayPort 1.4a', '两台 4k', '60Hz']],
    wifi: ['网络和连接性', ['Wi-Fi 7']],
    bluetooth: ['网络和连接性', ['5.4']],
    batteryWh: ['电池容量', ['38', '37']],
    batteryLifeLocalVideo: ['电池续航时间', ['仅 Wi-Fi', '15.5']],
    batteryLifeWeb: ['电池续航时间', ['仅 Wi-Fi', '13 小时']],
    chargingSpeed: ['装箱物品', ['USB-C', '充电线', '不包含充电器']],
    windowsHello: ['安全性', ['Windows Hello 人脸']],
    biometrics: ['安全性', ['Windows Hello 人脸']],
  },
  'laptop-13-inch-2': {
    ...common,
    screenSize: ['显示屏', ['13 英寸']],
    resolution: ['显示屏', ['1920 x 1280']],
    ppi: ['显示屏', ['178 PPI']],
    refreshRate: ['显示屏', ['60Hz']],
    colorSupport: ['显示屏', ['sRGB', '增强型', '1000:1']],
    chassisMaterial: ['外观', ['阳极氧化铝']],
    ssdRemovable: ['内存和存储空间', ['可拆卸式', 'UFS']],
    videoFeatures: ['摄像头', ['自动取景', '人像模糊', '创意滤镜', '眼神交流', '人像光效']],
    microphones: ['音频', ['远场双麦克', '语音聚焦']],
    audioTech: ['音频', ['杜比音效']],
    headphoneJack: ['端口和充电', ['3.5 毫米耳机插孔']],
    usbPorts: ['端口和充电', ['2 个 USB-C', 'USB 3.2', 'USB-A 3.2', 'DisplayPort 1.4a']],
    wireless: ['网络和连接性', ['Wi-Fi 7', '5.4']],
    batteryCapacityWh: ['电池容量', ['50', '48']],
    batteryLifeVideo: ['电池使用时间', ['22.5']],
    batteryLifeOffice: ['电池使用时间', ['18 小时']],
    chargingPower: ['装箱物品', ['45W', '充电线']],
    trackpadType: ['辅助功能', ['精确式触摸板', '自适应触控模式']],
    windowsHello: ['安全性', ['指纹电源按钮']],
    biometrics: ['安全性', ['指纹电源按钮']],
  },
};

const devices = [];
for (const [id, rules] of Object.entries(reviewed)) {
  const kind = id.startsWith('pro-') ? 'pro' : 'laptop';
  const sourceFile = `releases/verification-20260930-batch02/evidence/surface-${kind}.json`;
  const capture = JSON.parse(fs.readFileSync(path.join(root, sourceFile)));
  const table = capture.components.find(c => c.component === 'product-comparison-table').props;
  const product = table.columns[0].product;
  assert(product.title.includes('第 2 代'), 'Source model identity drift');
  const sections = new Map(table.specsDialog.items.map(item => [text(item.label), text(item.content)]));
  const nextModel = kind === 'pro' ? 'Surface Pro, 13 英寸' : 'Surface Laptop, 13.8 英寸';
  // First product blocks end before the following model; global sections stay
  // explicit in the locator rather than being silently copied from another SKU.
  for (const [label, value] of sections) {
    const end = value.indexOf(nextModel);
    if (end >= 0) sections.set(label, value.slice(0, end));
  }
  sections.set('@price', product.price);
  sections.set('@variants', product.variants.map(v => v.name).join('、'));
  sections.set('@display', text(product.specs.display[0].value));
  const device = data.devices.find(d => d.id === id);
  const entries = Object.entries(device.specs).map(([field, value]) => {
    const rule = rules[field];
    if (!rule) return { field, value, verdict: 'PENDING', reason: '本批未建立足够的字段级证据；不等于官方未披露或不适用' };
    const [label, tokens] = rule;
    const evidence = sections.get(label);
    assert(evidence, `${id}.${field} missing source section ${label}`);
    tokens.forEach(token => assert(evidence.includes(token), `${id}.${field} missing evidence token ${token}`));
    return {
      field, value, verdict: 'VERIFIED',
      sourceUrl: capture.resolvedUrl, retrievedAt: capture.retrievedAt,
      evidenceFile: sourceFile, sourceLocator: label.startsWith('@')
        ? `product-comparison-table.columns[0].product.${label === '@display' ? 'specs.display[0].value' : label.slice(1)}`
        : `product-comparison-table.specsDialog.items[label=${label}], first-product block / shared section`,
      evidenceText: evidence.trim(), reviewMethod: '官方原文人工逐项对照；脚本只校验证据标记',
    };
  });
  // These nulls represent unresolved evidence, not an assertion that the
  // official manufacturer never publishes a price or connector specification.
  entries.find(e => e.field === 'startingPriceCny').reason = '产品专属列仅标10月19日预售；顶部多型号共用9,688元不能确认属于本型号';
  if (kind === 'pro') entries.find(e => e.field === 'surfaceConnect').reason =
    '官方列出Surface键盘连接器，但本字段专指Surface Connect磁吸电源口；二者不能混用，暂缺直接确认';
  devices.push({ deviceId: id, officialTitle: product.title, sourceFile, entries });
}
const report = {
  generatedAt: new Date().toISOString(), scope: 'Two consumer 2nd Edition devices only',
  canClaimFullLibraryAccuracy: false,
  counts: devices.map(d => ({
    deviceId: d.deviceId, fields: d.entries.length,
    verified: d.entries.filter(e => e.verdict === 'VERIFIED').length,
    pending: d.entries.filter(e => e.verdict === 'PENDING').length,
  })),
  devices,
};
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify(report.counts));
