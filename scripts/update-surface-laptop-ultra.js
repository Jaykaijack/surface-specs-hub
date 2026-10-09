// -*- coding: utf-8 -*-
/**
 * Surface Laptop Ultra 消费版与商用版数据收录与注入脚本
 * 官方信源：微软 2026-10-07 / 2026-10-08 官方正式发布
 */
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../js/surface-data.js');
const SURFACE_DATA = require(dataFilePath);

const laptopUltraConsumer = {
  id: "laptop-ultra",
  categoryId: "laptop",
  heroImage: "./assets/products/surface-laptop-ultra-hero.png",
  name: "Surface Laptop Ultra",
  nameEn: "Surface Laptop Ultra",
  generation: "第 1 代 (2026)",
  year: 2026,
  status: "current_cn",
  targetAudience: "consumer",
  flagship: true,
  tagline: "旗舰 AI 移动工作站：搭载 NVIDIA RTX Spark™ 平台，1 PetaFLOP 算力与 15 英寸 Mini-LED 屏",
  aliases: [
    "Surface Laptop Ultra",
    "Laptop Ultra",
    "RTX Spark",
    "Blackwell RTX",
    "Surface Ultra"
  ],
  prevGenerationId: "laptop-8-150",
  nextGenerationId: null,
  isCommercial: false,
  segment: "consumer",
  learnDocUrl: "https://learn.microsoft.com/en-us/surface/surface-laptop-ultra",
  specs: {
    releaseDate: "2026 年 10 月",
    generation: "第 1 代",
    status: "current_cn",
    salesRegion: "全球同步，中国首批国行在售",
    targetAudience: "专业创作者、AI 开发者与追求卓越性能的高端用户",
    tagline: "首款搭载 NVIDIA RTX Spark™ 平台的移动工作站，1 PetaFLOP 澎湃 AI 算力与 Mini-LED 超清触控屏",
    colors: [
      {
        name: "亮铂金",
        hex: "#d8d8d8",
        material: "阳极氧化铝一体机身",
        image: "./assets/products/surface-laptop-ultra-hero.png"
      },
      {
        name: "夜幕色",
        hex: "#1f242d",
        material: "阳极氧化铝一体机身",
        image: "./assets/products/surface-laptop-ultra-hero.png"
      }
    ],
    chassisMaterial: "全金属一体化阳极氧化铝机身，高强度轻量化结构",
    kickstandType: "not_applicable",
    osAtLaunch: "Windows 11 家庭版",
    cpuModel: "NVIDIA RTX Spark™ (N1X 处理器，最高 20 核心)",
    cpuArch: "ARM64 (NVIDIA 自研微架构，台积电 3nm 先进制程)",
    cpuCores: "18 核心 (基础版) / 20 核心 (高配版)",
    gpuModel: "NVIDIA Blackwell RTX GPU (5,120 核心 / 6,144 核心)",
    npuModel: "NVIDIA Tensor Core & AI Boost Engine (1 PetaFLOP FP4 算力)",
    npuTops: "1000 TOPS (1 PetaFLOP FP4)",
    copilotPlus: "Copilot+ PC (超级 AI 移动工作站)",
    ramSpec: "24GB / 32GB / 48GB / 64GB / 128GB LPDDR5X 统一内存 (Unified Memory，动态共享)",
    storageOptions: "512GB / 1TB / 2TB / 4TB 第 5 代 PCIe NVMe SSD (可插拔升级)",
    ssdRemovable: "可拆卸升级 SSD 模块",
    expandableStorage: "全尺寸 SDXC 卡读卡器 (支持 UHS-II 高速扩展)",
    screenSize: "15.0 英寸",
    aspectRatio: "3:2",
    panelTech: "Mini-LED PixelSense™ Ultra 触控显示屏",
    resolution: "3120 x 2080",
    ppi: "262",
    refreshRate: "120Hz 动态刷新率 (Dynamic Refresh Rate)",
    brightness: "峰值 2000 尼特 (HDR) / 典型 800 尼特 (SDR)",
    colorSupport: ["100% sRGB", "DCI-P3 广色域", "Dolby Vision IQ®"],
    touchAndPenProtocol: "10 点多点触控，不支持触控笔",
    frontCamera: "Full HD 1080p 超广角前置演播室摄像头，支持 Windows Studio 效果",
    windowsHello: "Windows Hello 人脸识别与电源键指纹双重生物识别",
    rearCamera: "not_applicable",
    videoFeatures: "背景虚化、人像居中、目光接触、语音聚焦",
    microphones: "双重远场 Studio 录音室麦克风，支持语音聚焦",
    speakers: "配备杜比全景声 (Dolby Atmos®) 的 Omnisonic® 四扬声器系统",
    audioTech: "Dolby Atmos®",
    headphoneJack: "3.5 毫米耳机耳麦音频插孔",
    usbPorts: "1x Magnetic Connect 磁吸 USB-C，2x USB-C (USB4 / 兼容雷电)，1x USB-A 3.2",
    thunderboltSupport: "USB4® / Thunderbolt™ 4 兼容",
    surfaceConnect: "全新 Magnetic Connect 磁吸 USB-C 接口 (兼具通用 USB-C 与防拉拽磁吸充电)",
    wireless: "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
    cellular: "not_applicable",
    batteryCapacityWh: "90 Wh",
    batteryLifeOffice: "长达 12 小时常规网页与办公使用",
    batteryLifeVideo: "长达 15 小时本地视频播放",
    chargingPower: "标配 140W USB-C 电源适配器 (带 Magnetic Connect 磁吸充电线缆)",
    fastCharging: "支持 140W 磁吸快充，离电运行性能保持率高达 99%",
    compatibleKeyboard: "not_applicable",
    penHapticFeedback: "not_applicable",
    penChargingType: "not_applicable",
    trackpadType: "全新增大 30% 全域触觉反馈触控板 (Haptic Touchpad)",
    tpmChip: "Microsoft Pluton 处理器安全芯片 / 固件 TPM 2.0",
    securedCorePc: "支持 Secured-Core PC",
    biometrics: "人脸识别 + 指纹识别",
    enterpriseManage: "Microsoft Intune 与 Windows Autopilot (商用选配)",
    dimensionsMm: "340 mm x 240 mm x 17.9 mm",
    weightGrams: "约 2040 克 (4.5 磅)",
    totalWeightWithKeyboard: "not_applicable",
    thermalDesign: "全新超大双涡轮风扇 + 均热板主动散热系统，散热效能达以往机型 2.5 倍",
    repairabilityScore: "8 / 10 (可维护模块化设计，iFixit 认证配件供应)",
    replaceableParts: "SSD 固态硬盘、电池、散热风扇、主板、接口模块",
    warranty: "2 年有限硬件保修",
    startingPriceCny: "¥21,988 起 (24GB+512GB)",
    sourceReliability: "microsoft_official",
    lastVerified: "2026-10-08",
    officialDocUrl: "https://www.microsoftstore.com.cn/surface/surface-laptop-ultra"
  }
};

const laptopUltraBusiness = {
  id: "laptop-ultra-biz",
  categoryId: "laptop",
  heroImage: "./assets/products/surface-laptop-ultra-hero.png",
  name: "Surface Laptop Ultra 商用版",
  nameEn: "Surface Laptop Ultra for Business",
  generation: "第 1 代商用 (2026)",
  year: 2026,
  status: "current_cn",
  targetAudience: "commercial",
  flagship: true,
  tagline: "商用顶级 AI 移动工作站：搭载 NVIDIA RTX Spark™ 平台，1 PetaFLOP 算力与企业级安全",
  aliases: [
    "Surface Laptop Ultra 商用版",
    "Surface Laptop Ultra for Business",
    "Laptop Ultra Biz",
    "RTX Spark Biz"
  ],
  prevGenerationId: "laptop-8-150-intel",
  nextGenerationId: null,
  isCommercial: true,
  segment: "commercial",
  learnDocUrl: "https://learn.microsoft.com/en-us/surface/surface-laptop-ultra",
  specs: {
    releaseDate: "2026 年 10 月",
    generation: "第 1 代商用",
    status: "current_cn",
    salesRegion: "全球同步，中国首批国行商用在售",
    targetAudience: "企业 AI 研发人员、数据科学家、3D 视觉工程团队与企业 IT 资产管理",
    tagline: "商用顶级 AI 移动工作站，搭载 NVIDIA RTX Spark™ 平台，预装 Windows 11 专业版与全生命周期 IT 维护支持",
    colors: [
      {
        name: "亮铂金",
        hex: "#d8d8d8",
        material: "阳极氧化铝一体机身",
        image: "./assets/products/surface-laptop-ultra-hero.png"
      },
      {
        name: "夜幕色",
        hex: "#1f242d",
        material: "阳极氧化铝一体机身",
        image: "./assets/products/surface-laptop-ultra-hero.png"
      }
    ],
    chassisMaterial: "全金属一体化阳极氧化铝机身，高强度轻量化结构",
    kickstandType: "not_applicable",
    osAtLaunch: "Windows 11 专业版",
    cpuModel: "NVIDIA RTX Spark™ (N1X 处理器，最高 20 核心)",
    cpuArch: "ARM64 (NVIDIA 自研微架构，台积电 3nm 先进制程)",
    cpuCores: "18 核心 / 20 核心",
    gpuModel: "NVIDIA Blackwell RTX GPU (5,120 核心 / 6,144 核心)",
    npuModel: "NVIDIA Tensor Core & AI Boost Engine (1 PetaFLOP FP4 算力)",
    npuTops: "1000 TOPS (1 PetaFLOP FP4)",
    copilotPlus: "Copilot+ PC (商用超级 AI 移动工作站)",
    ramSpec: "32GB / 48GB / 64GB / 128GB LPDDR5X 统一内存 (Unified Memory，动态共享)",
    storageOptions: "1TB / 2TB / 4TB 第 5 代 PCIe NVMe SSD (可插拔升级)",
    ssdRemovable: "可拆卸升级 SSD 模块",
    expandableStorage: "全尺寸 SDXC 卡读卡器 (支持 UHS-II 高速扩展)",
    screenSize: "15.0 英寸",
    aspectRatio: "3:2",
    panelTech: "Mini-LED PixelSense™ Ultra 触控显示屏",
    resolution: "3120 x 2080",
    ppi: "262",
    refreshRate: "120Hz 动态刷新率 (Dynamic Refresh Rate)",
    brightness: "峰值 2000 尼特 (HDR) / 典型 800 尼特 (SDR)",
    colorSupport: ["100% sRGB", "DCI-P3 广色域", "Dolby Vision IQ®"],
    touchAndPenProtocol: "10 点多点触控，不支持触控笔",
    frontCamera: "Full HD 1080p 超广角前置演播室摄像头，支持 Windows Studio 效果",
    windowsHello: "Windows Hello 人脸识别与电源键指纹双重生物识别",
    rearCamera: "not_applicable",
    videoFeatures: "背景虚化、人像居中、目光接触、语音聚焦",
    microphones: "双重远场 Studio 录音室麦克风，支持语音聚焦",
    speakers: "配备杜比全景声 (Dolby Atmos®) 的 Omnisonic® 四扬声器系统",
    audioTech: "Dolby Atmos®",
    headphoneJack: "3.5 毫米耳机耳麦音频插孔",
    usbPorts: "1x Magnetic Connect 磁吸 USB-C，2x USB-C (USB4 / 兼容雷电)，1x USB-A 3.2",
    thunderboltSupport: "USB4® / Thunderbolt™ 4 兼容",
    surfaceConnect: "全新 Magnetic Connect 磁吸 USB-C 接口 (兼具通用 USB-C 与防拉拽磁吸充电)",
    wireless: "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
    cellular: "not_applicable",
    batteryCapacityWh: "90 Wh",
    batteryLifeOffice: "长达 12 小时常规网页与办公使用",
    batteryLifeVideo: "长达 15 小时本地视频播放",
    chargingPower: "标配 140W USB-C 电源适配器 (带 Magnetic Connect 磁吸充电线缆)",
    fastCharging: "支持 140W 磁吸快充，离电运行性能保持率高达 99%",
    compatibleKeyboard: "not_applicable",
    penHapticFeedback: "not_applicable",
    penChargingType: "not_applicable",
    trackpadType: "全新增大 30% 全域触觉反馈触控板 (Haptic Touchpad)",
    tpmChip: "Microsoft Pluton 处理器安全芯片 / 硬件 TPM 2.0 企业级安全",
    securedCorePc: "支持 Secured-Core PC (企业级硬件根信任)",
    biometrics: "人脸识别 + 指纹识别",
    enterpriseManage: "Microsoft Intune、Windows Autopilot 与 Surface 管理门户",
    dimensionsMm: "340 mm x 240 mm x 17.9 mm",
    weightGrams: "约 2040 克 (4.5 磅)",
    totalWeightWithKeyboard: "not_applicable",
    thermalDesign: "全新超大双涡轮风扇 + 均热板主动散热系统，散热效能达以往机型 2.5 倍",
    repairabilityScore: "8 / 10 (可维护模块化设计，官方与 iFixit 企业零备件供应)",
    replaceableParts: "SSD 固态硬盘、电池、散热风扇、主板、接口模块",
    warranty: "2 年商业硬件保修与先行更换服务 (AES)",
    startingPriceCny: "¥27,588 起 (32GB+1TB)",
    sourceReliability: "microsoft_official",
    lastVerified: "2026-10-08",
    officialDocUrl: "https://www.microsoftstore.com.cn/surface/surface-laptop-ultra-for-business"
  }
};

// 1. 插入 devices (防止重复插入)
const existingConsumerIdx = SURFACE_DATA.devices.findIndex(d => d.id === 'laptop-ultra');
if (existingConsumerIdx >= 0) {
  SURFACE_DATA.devices[existingConsumerIdx] = laptopUltraConsumer;
} else {
  // 放在国行在售 laptop 列表前部
  const insertIdx = SURFACE_DATA.devices.findIndex(d => d.id === 'laptop-8-138');
  if (insertIdx >= 0) {
    SURFACE_DATA.devices.splice(insertIdx, 0, laptopUltraConsumer);
  } else {
    SURFACE_DATA.devices.push(laptopUltraConsumer);
  }
}

const existingBizIdx = SURFACE_DATA.devices.findIndex(d => d.id === 'laptop-ultra-biz');
if (existingBizIdx >= 0) {
  SURFACE_DATA.devices[existingBizIdx] = laptopUltraBusiness;
} else {
  const insertBizIdx = SURFACE_DATA.devices.findIndex(d => d.id === 'laptop-8-138-intel');
  if (insertBizIdx >= 0) {
    SURFACE_DATA.devices.splice(insertBizIdx, 0, laptopUltraBusiness);
  } else {
    SURFACE_DATA.devices.push(laptopUltraBusiness);
  }
}

// 2. 插入 chips
const ultraChip = {
  id: "nvidia-rtx-spark-n1x",
  name: "NVIDIA RTX Spark™ (N1X 超级芯片)",
  series: "nvidia",
  process: "台积电 3nm 先进制程",
  architecture: "ARM64 (18~20核 CPU) + Blackwell RTX GPU",
  npuTops: 1000,
  npu: "NVIDIA Tensor Core (1 PetaFLOP FP4 算力)",
  copilotPlus: true,
  tdp: "60W - 140W",
  devices: ["Surface Laptop Ultra", "Surface Laptop Ultra 商用版"],
  desc: "微软首度携手英伟达打造的移动工作站级超级芯片，集成本地大模型推理能力，提供 1 PetaFLOP (1,000 TOPS) 算力与最高 128GB 统一内存，支持直接离线运行 120B 大参数模型。"
};

const chipIdx = SURFACE_DATA.chips.findIndex(c => c.id === 'nvidia-rtx-spark-n1x');
if (chipIdx >= 0) {
  SURFACE_DATA.chips[chipIdx] = ultraChip;
} else {
  // 算力最高，置顶
  SURFACE_DATA.chips.unshift(ultraChip);
}

// 3. 为所有配件补充对 laptop-ultra 和 laptop-ultra-biz 的兼容性列表
SURFACE_DATA.accessories.forEach(acc => {
  acc.compatibilityList = acc.compatibilityList || [];
  
  // laptop-ultra
  let hasConsumer = acc.compatibilityList.some(r => r.deviceId === 'laptop-ultra');
  if (!hasConsumer) {
    let status = 'UNSUPPORTED';
    let note = '不适用';
    if (acc.category === 'keyboard') {
      status = 'UNSUPPORTED';
      note = '内置全尺寸一体化背光键盘，不适用独立键盘盖';
    } else if (acc.category === 'pen') {
      status = 'UNSUPPORTED';
      note = '专注于多点触控与极窄边框体验，不支持触控笔手写协议';
    } else if (acc.category === 'dock') {
      status = 'FULL';
      note = '双雷电/USB4 全速连接，支持多屏 4K 120Hz 扩展输出';
    } else if (acc.category === 'mouse' || acc.category === 'audio') {
      status = 'FULL';
      note = '原生低功耗蓝牙 5.4 免驱直连，平滑高精度指针控制';
    } else if (acc.category === 'power') {
      status = 'FULL';
      note = '支持全新 140W Magnetic Connect 磁吸快充与通用 USB-C PD 充电';
    } else {
      status = 'FULL';
      note = '完全兼容支持';
    }
    acc.compatibilityList.push({
      deviceId: 'laptop-ultra',
      status: status,
      note: note
    });
  }

  // laptop-ultra-biz
  let hasBiz = acc.compatibilityList.some(r => r.deviceId === 'laptop-ultra-biz');
  if (!hasBiz) {
    let status = 'UNSUPPORTED';
    let note = '不适用';
    if (acc.category === 'keyboard') {
      status = 'UNSUPPORTED';
      note = '内置全尺寸一体化背光键盘，不适用独立键盘盖';
    } else if (acc.category === 'pen') {
      status = 'UNSUPPORTED';
      note = '专注于多点触控与极窄边框体验，不支持触控笔手写协议';
    } else if (acc.category === 'dock') {
      status = 'FULL';
      note = '双雷电/USB4 全速连接，支持多屏 4K 120Hz 扩展输出';
    } else if (acc.category === 'mouse' || acc.category === 'audio') {
      status = 'FULL';
      note = '原生低功耗蓝牙 5.4 免驱直连，平滑高精度指针控制';
    } else if (acc.category === 'power') {
      status = 'FULL';
      note = '支持全新 140W Magnetic Connect 磁吸快充与通用 USB-C PD 充电';
    } else {
      status = 'FULL';
      note = '完全兼容支持';
    }
    acc.compatibilityList.push({
      deviceId: 'laptop-ultra-biz',
      status: status,
      note: note
    });
  }
});

// 格式化输出到 surface-data.js
const outJs = `const SURFACE_DATA = ${JSON.stringify(SURFACE_DATA, null, 2)};

(function attachXboxLineup() {
  var list = (typeof XBOX_LINEUP !== 'undefined' && XBOX_LINEUP && XBOX_LINEUP.length) ? XBOX_LINEUP : [];
  if (!list.length && typeof require === 'function') {
    try { list = require('./xbox-lineup.js'); } catch (e) { list = []; }
  }
  if (!list || !list.length) return;
  var seen = {};
  SURFACE_DATA.devices.forEach(function (device) { seen[device.id] = true; });
  list.forEach(function (device) {
    if (!seen[device.id]) SURFACE_DATA.devices.push(device);
  });
  SURFACE_DATA.devices.forEach(function (device) {
    if (device.categoryId !== 'xbox') return;
    SURFACE_DATA.accessories.forEach(function (acc) {
      var rows = acc.compatibilityList || (acc.compatibilityList = []);
      var found = rows.some(function (row) { return row.deviceId === device.id; });
      if (!found) {
        rows.push({
          deviceId: device.id,
          status: 'UNSUPPORTED',
          note: '这是 Surface 配件，不适用于 Xbox 主机'
        });
      }
    });
  });
})();

// 挂载辅助工具方法
SURFACE_DATA.getDeviceImage = function(device, colorName) {
  if (typeof Catalog !== 'undefined' && Catalog.portrait) {
    return Catalog.portrait(device, colorName).src;
  }
  if (!device) return './assets/products/surface-new-pro-hero.png';
  if (colorName && device.specs && Array.isArray(device.specs.colors)) {
    const found = device.specs.colors.find(c => c.name === colorName);
    if (found && found.image) return found.image;
  }
  return device.heroImage || './assets/products/surface-new-pro-hero.png';
};

SURFACE_DATA.getAccessoryImage = function(acc) {
  if (!acc) return '';
  return acc.image || ('./assets/accessories/' + acc.id + '.png');
};

if (typeof window !== "undefined") {
  window.SURFACE_DATA = SURFACE_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SURFACE_DATA;
}
`;

fs.writeFileSync(dataFilePath, outJs, 'utf8');
console.log('✅ Surface Laptop Ultra 消费版与商用版数据写入成功！');
console.log('   当前总机型数:', SURFACE_DATA.devices.length);
console.log('   国行在售机型数:', SURFACE_DATA.devices.filter(d => d.status === 'current_cn').length);
