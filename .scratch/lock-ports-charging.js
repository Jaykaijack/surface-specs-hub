/**
 * Re-lock usbPorts / thunderboltSupport / chargingPower / fastCharging
 * from official China store 端口和充电 tables + zh-cn Support 充电要求表.
 * Exact device-id match. Do not copy foreign SKU watts onto 国行 included PSU.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js/surface-data.js');
const CURRENT_FACTS = path.join(ROOT, 'tests/official-current-lineup-facts.js');
const HIST_FACTS = path.join(ROOT, 'tests/official-historical-lineup-facts.js');

const TB4 = 'USB4® / Thunderbolt™ 4';
const USB4_DOCK = 'USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）';
const FAST_60_65 = '推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）';
const FAST_60 = '推荐快充 60W';
const FAST_45 = '推荐快充 45W';
const FAST_30 = '推荐快充 30W';
const FAST_39 = '推荐快充 39W';
const FAST_NONE = 'not_applicable';
const AC_LINE = '随附交流电源线供电（官方：USB-C 不接收入站电源）';

const P_PRO13_INTEL = '2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞';
const P_PRO13_SNAP = '2 × USB-C® / USB4®：充电、数据、DisplayPort 1.4a（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞';
const P_PRO12 = '2 × USB-C® / USB 3.2：充电、数据、DisplayPort 1.4a（最多两台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞';
const P_L8I138 = '2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2';
const P_L8I150 = P_L8I138 + '；MicroSDXC Express 读卡器';
const P_L8S138 = '2 × USB-C® / USB4®：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2';
const P_L8S150 = P_L8S138 + '；MicroSDXC Express 读卡器';
const P_L13 = '2 × USB-C® / USB 3.2：充电、数据、DisplayPort 1.4a（最多两台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.1';
const P_P11S = '2 × USB-C® / USB4®：充电、数据、DisplayPort 1.4a、兼容 Surface Thunderbolt™ 4 扩展坞';
const P_P11I = '2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多两台 4K）、兼容 Surface Thunderbolt™ 4 扩展坞';
const P_L7S = '2 × USB-C® / USB4®：充电、数据、DisplayPort 2.1、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.1；15 英寸另有 MicroSDXC 读卡器';
const P_L7I = '2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多两台 4K）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.1；15 英寸另有 MicroSDXC Express';

const CHG_39 = '标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W';
const CHG_65_45 = '标配 65W Surface Connect 电源（特定配置）；最低充电 45W';
const CHG_45_USB = '标配 45W USB-C（型号 2105）；最低充电 45W';
const CHG_27_45 = '最低充电 27W USB-C；选配/标配 45W USB-C（型号 2105）';

const CURRENT_LOCKS = {
  'pro-12-13-intel': {
    facts: { usbPorts: ['USB-C', 'Thunderbolt', 'DisplayPort'], thunderboltSupport: 'Thunderbolt', chargingPower: '39', fastCharging: ['60', '65'] },
    data: { usbPorts: P_PRO13_INTEL, thunderboltSupport: TB4, chargingPower: CHG_39, fastCharging: FAST_60_65 }
  },
  'pro-12-13-snap': {
    facts: { usbPorts: ['USB-C', 'USB4', 'DisplayPort'], thunderboltSupport: 'USB4', chargingPower: '39', fastCharging: ['60', '65'] },
    data: { usbPorts: P_PRO13_SNAP, thunderboltSupport: USB4_DOCK, chargingPower: CHG_39, fastCharging: FAST_60_65 }
  },
  'pro-12-13': {
    facts: { usbPorts: ['USB-C', 'USB4', 'DisplayPort'], thunderboltSupport: 'USB4', chargingPower: '39', fastCharging: ['60', '65'] },
    data: { usbPorts: P_PRO13_SNAP, thunderboltSupport: USB4_DOCK, chargingPower: CHG_39, fastCharging: FAST_60_65 }
  },
  'pro-12-inch': {
    facts: { usbPorts: ['USB-C', 'USB 3.2', 'DisplayPort'], chargingPower: ['27', '45'], fastCharging: '45' },
    data: { usbPorts: P_PRO12, thunderboltSupport: 'not_applicable', surfaceConnect: 'not_applicable', chargingPower: CHG_27_45, fastCharging: FAST_45 }
  },
  'pro-12-inch-biz': {
    facts: { usbPorts: ['USB-C', 'USB 3.2', 'DisplayPort'], chargingPower: '45', fastCharging: '45' },
    data: { usbPorts: P_PRO12, thunderboltSupport: 'not_applicable', surfaceConnect: 'not_applicable', chargingPower: CHG_27_45, fastCharging: FAST_45 }
  },
  'laptop-8-138-intel': {
    facts: { usbPorts: ['USB-C', 'USB-A', 'Thunderbolt', 'DisplayPort'], thunderboltSupport: 'Thunderbolt', chargingPower: '39', fastCharging: ['60', '65'] },
    data: { usbPorts: P_L8I138, thunderboltSupport: TB4, chargingPower: CHG_39, fastCharging: FAST_60_65 }
  },
  'laptop-8-150-intel': {
    facts: { usbPorts: ['USB-C', 'USB-A', 'MicroSDXC', 'Thunderbolt'], thunderboltSupport: 'Thunderbolt', chargingPower: '65', fastCharging: ['60', '65'] },
    data: { usbPorts: P_L8I150, thunderboltSupport: TB4, chargingPower: CHG_65_45, fastCharging: FAST_60_65 }
  },
  'laptop-8-138-snap': {
    facts: { usbPorts: ['USB-C', 'USB4', 'USB-A', 'DisplayPort'], thunderboltSupport: 'USB4', chargingPower: '39', fastCharging: ['60', '65'] },
    data: { usbPorts: P_L8S138, thunderboltSupport: USB4_DOCK, chargingPower: CHG_39, fastCharging: FAST_60_65 }
  },
  'laptop-8-150-snap': {
    facts: { usbPorts: ['USB-C', 'USB4', 'USB-A', 'MicroSDXC'], thunderboltSupport: 'USB4', chargingPower: '65', fastCharging: ['60', '65'] },
    data: { usbPorts: P_L8S150, thunderboltSupport: USB4_DOCK, chargingPower: CHG_65_45, fastCharging: FAST_60_65 }
  },
  'laptop-8-138': {
    facts: { usbPorts: ['USB-C', 'USB4', 'USB-A', 'DisplayPort'], thunderboltSupport: 'USB4', chargingPower: '39', fastCharging: ['60', '65'] },
    data: { usbPorts: P_L8S138, thunderboltSupport: USB4_DOCK, chargingPower: CHG_39, fastCharging: FAST_60_65 }
  },
  'laptop-8-150': {
    facts: { usbPorts: ['USB-C', 'USB4', 'USB-A', 'MicroSDXC'], thunderboltSupport: 'USB4', chargingPower: '65', fastCharging: ['60', '65'] },
    data: { usbPorts: P_L8S150, thunderboltSupport: USB4_DOCK, chargingPower: CHG_65_45, fastCharging: FAST_60_65 }
  },
  'laptop-13-inch': {
    facts: { usbPorts: ['USB-C', 'USB 3.2', 'USB-A', 'DisplayPort'], chargingPower: '45', fastCharging: '60' },
    data: { usbPorts: P_L13, thunderboltSupport: 'not_applicable', surfaceConnect: 'not_applicable', chargingPower: CHG_45_USB, fastCharging: FAST_60 }
  },
  'laptop-13-inch-biz': {
    facts: { usbPorts: ['USB-C', 'USB 3.2', 'USB-A', 'DisplayPort'], chargingPower: '45', fastCharging: '60' },
    data: { usbPorts: P_L13, thunderboltSupport: 'not_applicable', surfaceConnect: 'not_applicable', chargingPower: CHG_45_USB, fastCharging: FAST_60 }
  },
  'laptop-13-inch-intel-biz': {
    facts: { usbPorts: ['USB-C', 'USB 3.2', 'USB-A', 'DisplayPort'], chargingPower: '45', fastCharging: '60' },
    data: { usbPorts: P_L13.replace('USB-A 3.1', 'USB-A 3.2'), thunderboltSupport: 'not_applicable', surfaceConnect: 'not_applicable', chargingPower: '标配 45W USB-C 墙插充电器（特定配置，型号 2105）；最低充电 45W', fastCharging: FAST_60 }
  },
  'pro-11-biz-snap': {
    facts: { usbPorts: ['USB-C', 'USB4', 'DisplayPort'], thunderboltSupport: 'USB4', chargingPower: '39', fastCharging: '65' },
    data: { usbPorts: P_P11S, thunderboltSupport: USB4_DOCK, chargingPower: CHG_39, fastCharging: '推荐快充 65W（国行第 11 代骁龙表）' }
  },
  'pro-11-biz-intel': {
    facts: { usbPorts: ['USB-C', 'Thunderbolt', 'DisplayPort'], thunderboltSupport: 'Thunderbolt', chargingPower: '39', fastCharging: ['60', '65'] },
    data: { usbPorts: P_P11I, thunderboltSupport: TB4, chargingPower: CHG_39, fastCharging: FAST_60_65 }
  },
  'laptop-7-biz-snap': {
    facts: { usbPorts: ['USB-C', 'USB4', 'USB-A', 'DisplayPort'], thunderboltSupport: 'USB4', fastCharging: '65' },
    data: { usbPorts: P_L7S, thunderboltSupport: USB4_DOCK, chargingPower: '13.8 英寸标配 39W（型号 1963）；15 英寸标配 65W；最低充电 39W / 45W', fastCharging: '推荐快充 65W（国行第 7 代骁龙表）' }
  },
  'laptop-7-biz-intel': {
    facts: { usbPorts: ['USB-C', 'Thunderbolt', 'USB-A', 'DisplayPort'], thunderboltSupport: 'Thunderbolt', fastCharging: ['60', '65'] },
    data: { usbPorts: P_L7I, thunderboltSupport: TB4, chargingPower: '13.8 英寸标配 39W；15 英寸标配 65W；最低充电 39W / 45W', fastCharging: FAST_60_65 }
  }
};

const HIST_LOCKS = {
  'pro-11-13': {
    facts: { fastCharging: '60', chargingPower: '39' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1963）', fastCharging: FAST_60 }
  },
  'pro-10-biz': {
    facts: { fastCharging: '45', chargingPower: '39' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1963）', fastCharging: FAST_45 }
  },
  'pro-9': {
    facts: { fastCharging: '60' },
    data: { chargingPower: 'Wi-Fi 版最低/标配 60W（型号 1706）；5G 版最低充电 39W、标配 39W（型号 1963）', fastCharging: FAST_60 }
  },
  'pro-9-biz': {
    facts: { fastCharging: '60' },
    data: { chargingPower: 'Wi-Fi 版最低/标配 60W（型号 1706）；5G 版最低充电 39W、标配 39W（型号 1963）', fastCharging: FAST_60 }
  },
  'pro-8': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_60 }
  },
  'pro-8-biz': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_60 }
  },
  'pro-7-plus': {
    facts: { chargingPower: '60' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_NONE }
  },
  'pro-7': {
    facts: { chargingPower: '60' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_NONE }
  },
  'pro-6': {
    facts: { chargingPower: '39' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1800）', fastCharging: FAST_NONE }
  },
  'pro-6-biz': {
    facts: { chargingPower: '39' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1800）', fastCharging: FAST_NONE }
  },
  'pro-5': {
    facts: { chargingPower: '39' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1800）；M3 标配 24W（型号 1735）', fastCharging: FAST_NONE }
  },
  'pro-4': {
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 31W；标配 31W（型号 1625）；Core M 最低/标配 24W（型号 1735）', fastCharging: FAST_NONE }
  },
  'pro-3': {
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 31W；标配 31W（型号 1625）', fastCharging: FAST_NONE }
  },
  'pro-2': {
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 48W；标配型号 1536', fastCharging: FAST_NONE }
  },
  'pro-1': {
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 48W；标配型号 1536', fastCharging: FAST_NONE }
  },
  'pro-x': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_60 }
  },
  'laptop-7-138': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1963）', fastCharging: FAST_60 }
  },
  'laptop-7-150': {
    facts: { fastCharging: '60', chargingPower: '65' },
    data: { chargingPower: '国行标配 65W；官方充电表最低 45W、推荐快充 60W（型号 2062 为 60W）', fastCharging: FAST_60 }
  },
  'laptop-6-biz': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '13.5 英寸最低/标配 39W（型号 1963）；15 英寸最低 45W、标配 65W', fastCharging: FAST_60 }
  },
  'laptop-5': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_60 }
  },
  'laptop-5-biz': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_60 }
  },
  'laptop-4': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_60 }
  },
  'laptop-3': {
    facts: { fastCharging: '60' },
    data: { chargingPower: '最低充电 60W；标配 60W（型号 1706）', fastCharging: FAST_60 }
  },
  'laptop-2': {
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1800）', fastCharging: FAST_NONE }
  },
  'laptop-1': {
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1800）', fastCharging: FAST_NONE }
  },
  'sls-2': {
    facts: { chargingPower: '95', fastCharging: ['95', '120'] },
    data: { chargingPower: '集显最低/标配 95W（型号 1798）；独显最低/标配 120W（型号 1932）', fastCharging: '推荐快充 95W（集显）/ 120W（独显）' }
  },
  'sls-2-biz': {
    facts: { chargingPower: '95', fastCharging: ['95', '120'] },
    data: { chargingPower: '集显最低/标配 95W（型号 1798）；独显最低/标配 120W（型号 1932）', fastCharging: '推荐快充 95W（集显）/ 120W（独显）' }
  },
  'sls-1': {
    facts: { chargingPower: '60', fastCharging: ['60', '95'] },
    data: { chargingPower: '集显最低/标配 60W（型号 1706）；独显最低/标配 95W（型号 1798）', fastCharging: '推荐快充 60W（集显）/ 95W（独显）' }
  },
  'sls-1-biz': {
    facts: { chargingPower: '60', fastCharging: ['60', '95'] },
    data: { chargingPower: '集显最低/标配 60W（型号 1706）；独显最低/标配 95W（型号 1798）', fastCharging: '推荐快充 60W（集显）/ 95W（独显）' }
  },
  'go-4': {
    facts: { fastCharging: '30' },
    data: { chargingPower: '最低充电 24W；标配 24W（型号 1735 / 1736）', fastCharging: FAST_30 }
  },
  'go-3': {
    facts: { fastCharging: '30' },
    data: { chargingPower: '最低充电 24W；标配 24W（型号 1735 / 1736）', fastCharging: FAST_30 }
  },
  'go-3-biz': {
    facts: { fastCharging: '30' },
    data: { chargingPower: '最低充电 24W；标配 24W（型号 1735 / 1736）', fastCharging: FAST_30 }
  },
  'go-2': {
    facts: { fastCharging: '30' },
    data: { chargingPower: '最低充电 24W；标配 24W（型号 1735 / 1736）', fastCharging: FAST_30 }
  },
  'go-2-biz': {
    facts: { fastCharging: '30' },
    data: { chargingPower: '最低充电 24W；标配 24W（型号 1735 / 1736）', fastCharging: FAST_30 }
  },
  'go-1': {
    facts: { fastCharging: '24' },
    data: { chargingPower: '最低充电 24W；标配 24W（型号 1735 / 1736）', fastCharging: '推荐快充 24W' }
  },
  'laptop-go-3': {
    facts: { fastCharging: '39' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1963）', fastCharging: FAST_39 }
  },
  'laptop-go-3-biz': {
    facts: { fastCharging: '39' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1963）', fastCharging: FAST_39 }
  },
  'laptop-go-2': {
    facts: { fastCharging: '39' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1963）', fastCharging: FAST_39 }
  },
  'laptop-go-1': {
    facts: { fastCharging: '39' },
    data: { chargingPower: '最低充电 39W；标配 39W（型号 1963）', fastCharging: FAST_39 }
  },
  'book-3-15': {
    facts: { fastCharging: '120' },
    data: { chargingPower: '最低充电 120W；标配 120W（型号 1932）', fastCharging: '推荐快充 120W' }
  },
  'book-3-135': {
    facts: { fastCharging: '80' },
    data: { chargingPower: '集显最低 60W、标配 60W（型号 1706）；独显最低/标配 95W（型号 1798）', fastCharging: '集显推荐快充 80W；独显 95W' }
  },
  'book-3-biz': {
    facts: { fastCharging: '80' },
    data: { chargingPower: '15 英寸最低/标配 120W（型号 1932）；13.5 英寸集显 60W / 独显 95W', fastCharging: '13.5 英寸集显推荐快充 80W；独显 95W；15 英寸 120W' }
  },
  'book-2-15': {
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '最低充电 95W；标配 95W（型号 1798）', fastCharging: FAST_NONE }
  },
  'book-1': {
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: '集显最低/标配 31W（型号 1625）；独显 60W（型号 1706）；Performance Base 95W（型号 1798）', fastCharging: FAST_NONE }
  },
  'studio-2-plus': {
    facts: { chargingPower: '交流' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: AC_LINE, fastCharging: FAST_NONE }
  },
  'studio-2-plus-biz': {
    facts: { chargingPower: '交流' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: AC_LINE, fastCharging: FAST_NONE }
  },
  'studio-2': {
    facts: { chargingPower: '交流' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: AC_LINE, fastCharging: FAST_NONE }
  },
  'studio-1': {
    facts: { chargingPower: '交流' },
    specState: { fastCharging: 'NOT_APPLICABLE' },
    data: { chargingPower: AC_LINE, fastCharging: FAST_NONE }
  }
};

const CHARGE_CONTAINS_PATCH = {
  'sls-2': '95',
  'sls-2-biz': '95',
  'sls-1': '60',
  'sls-1-biz': '60'
};

const WRITE_ALIASES = {
  chargingPower: ['chargingPower', 'charger', 'chargingSpeed'],
  usbPorts: ['usbPorts', 'usbC', 'usbCPorts'],
  headphoneJack: ['headphoneJack', 'audioJack'],
  thunderboltSupport: ['thunderboltSupport'],
  surfaceConnect: ['surfaceConnect'],
  fastCharging: ['fastCharging']
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
  const aliases = WRITE_ALIASES[key] || [key];
  for (const k of aliases) {
    const re = new RegExp(`("${k}":\\s*)(?:"(?:\\\\.|[^"\\\\])*"|not_disclosed|not_applicable)`);
    if (re.test(block)) return block.replace(re, `$1${jsonVal}`);
  }
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

function factBody(src, deviceId) {
  const needle = `'${deviceId}': {`;
  const start = src.indexOf(needle);
  if (start < 0) throw new Error('missing fact ' + deviceId);
  const open = start + needle.length - 1;
  const close = closeBrace(src, open);
  return { start, open, close, needle };
}

function mergeSpecContains(src, deviceId, extra) {
  if (!extra || !Object.keys(extra).length) return src;
  const { open, close } = factBody(src, deviceId);
  const body = src.slice(open, close + 1);
  const marker = 'specContains: {';
  const sc = body.indexOf(marker);
  if (sc < 0) throw new Error('no specContains ' + deviceId);
  const scOpen = body.indexOf('{', sc);
  const scClose = closeBrace(body, scOpen);
  let inner = body.slice(scOpen + 1, scClose);
  for (const [key, value] of Object.entries(extra)) {
    const keyRe = new RegExp(`"${key}":\\s*(?:\\[[\\s\\S]*?\\]|"(?:\\\\.|[^"\\\\])*")`);
    if (keyRe.test(inner)) {
      inner = inner.replace(keyRe, `${JSON.stringify(key)}: ${JSON.stringify(value)}`);
    } else {
      const trimmed = inner.replace(/\s+$/, '');
      const needsComma = trimmed.length > 0 && !trimmed.endsWith(',') && !trimmed.endsWith('{');
      inner = trimmed + (needsComma ? ',' : '') + `\n            ${JSON.stringify(key)}: ${JSON.stringify(value)},`;
    }
  }
  const next = body.slice(0, scOpen + 1) + inner + body.slice(scClose);
  return src.slice(0, open) + next + src.slice(close + 1);
}

function mergeSpecState(src, deviceId, extra) {
  if (!extra || !Object.keys(extra).length) return src;
  const { open, close } = factBody(src, deviceId);
  let body = src.slice(open, close + 1);
  const marker = 'specState: {';
  let sc = body.indexOf(marker);
  if (sc < 0) {
    const insert = `      specState: ${JSON.stringify(extra, null, 12).replace(/^/, '').replace(/\n}$/, '\n      }')},\n`;
    // simpler insert before closing
    body = body.slice(0, -1) + `      specState: {\n            ${Object.entries(extra).map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n            ')}\n      },\n` + '}';
    return src.slice(0, open) + body + src.slice(close + 1);
  }
  const scOpen = body.indexOf('{', sc);
  const scClose = closeBrace(body, scOpen);
  let inner = body.slice(scOpen + 1, scClose);
  for (const [key, value] of Object.entries(extra)) {
    const keyRe = new RegExp(`"${key}":\\s*"(?:\\\\.|[^"\\\\])*"`);
    if (keyRe.test(inner)) {
      inner = inner.replace(keyRe, `${JSON.stringify(key)}: ${JSON.stringify(value)}`);
    } else {
      const trimmed = inner.replace(/\s+$/, '');
      const needsComma = trimmed.length > 0 && !trimmed.endsWith(',') && !trimmed.endsWith('{');
      inner = trimmed + (needsComma ? ',' : '') + `\n            ${JSON.stringify(key)}: ${JSON.stringify(value)},`;
    }
  }
  const next = body.slice(0, scOpen + 1) + inner + body.slice(scClose);
  return src.slice(0, open) + next + src.slice(close + 1);
}

function replaceChargeContains(src, deviceId, watts) {
  const { open, close } = factBody(src, deviceId);
  let body = src.slice(open, close + 1);
  if (!/chargingPowerContains:/.test(body)) return src;
  body = body.replace(/chargingPowerContains:\s*'[^']+'/, `chargingPowerContains: '${watts}'`);
  return src.slice(0, open) + body + src.slice(close + 1);
}

function applyFacts(filePath, locks, chargePatch) {
  let facts = fs.readFileSync(filePath, 'utf8');
  for (const [id, lock] of Object.entries(locks)) {
    if (lock.facts) facts = mergeSpecContains(facts, id, lock.facts);
    if (lock.specState) facts = mergeSpecState(facts, id, lock.specState);
  }
  if (chargePatch) {
    for (const [id, watts] of Object.entries(chargePatch)) {
      facts = replaceChargeContains(facts, id, watts);
    }
  }
  fs.writeFileSync(filePath, facts);
}

function applyData(locks) {
  let data = fs.readFileSync(DATA_PATH, 'utf8');
  for (const [id, lock] of Object.entries(locks)) {
    const { start, end } = deviceSpan(data, id);
    let block = data.slice(start, end);
    for (const [key, value] of Object.entries(lock.data || {})) {
      block = setField(block, key, value);
    }
    data = data.slice(0, start) + block + data.slice(end);
  }
  fs.writeFileSync(DATA_PATH, data);
}

const mode = process.argv[2] || 'all';
if (mode === 'facts' || mode === 'all') {
  applyFacts(CURRENT_FACTS, CURRENT_LOCKS);
  applyFacts(HIST_FACTS, HIST_LOCKS, CHARGE_CONTAINS_PATCH);
  console.log('facts merged');
}
if (mode === 'data' || mode === 'all') {
  applyData(Object.assign({}, CURRENT_LOCKS, HIST_LOCKS));
  console.log('data locked');
}
