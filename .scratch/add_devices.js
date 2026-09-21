const fs = require('fs');

// Read raw file
let fileContent = fs.readFileSync('js/surface-data.js', 'utf-8');

// Load SURFACE_DATA
const SURFACE_DATA = require('../js/surface-data.js');

console.log('Original device count:', SURFACE_DATA.devices.length);

// 1. New device definitions:
const newDevices = [
  {
    "id": "laptop-13-inch",
    "categoryId": "laptop",
    "heroImage": "./assets/products/surface-laptop-platinum.png",
    "name": "Surface Laptop, 13 英寸 (第 1 代)",
    "nameEn": "Surface Laptop, 13-inch (1st Edition)",
    "generation": "第 1 代 (2025/2026)",
    "year": 2026,
    "status": "current_cn",
    "targetAudience": "consumer",
    "flagship": false,
    "tagline": "极简超便携轻薄触控本，全天候长效 20 小时续航",
    "prevGenerationId": null,
    "nextGenerationId": null,
    "specs": {
      "releaseDate": "2025 年 10 月 / 2026 年",
      "generation": "第 1 代",
      "status": "current_cn",
      "targetAudience": "面向学生、职场新人与追求轻量化极简便携办公的用户",
      "tagline": "搭载高通骁龙 X Plus 8核处理器，1.22kg 轻巧铝合金机身与 20 小时续航",
      "colors": [
        {
          "name": "亮铂金",
          "hex": "#d8d8d8",
          "image": "./assets/products/surface-laptop-platinum.png"
        }
      ],
      "chassisMaterial": "特制铝合金阳极氧化机身",
      "kickstandType": "not_applicable",
      "osAtLaunch": "Windows 11 家庭中文版 (ARM64)",
      "cpuModel": "高通骁龙® X Plus (8 核心, 最高 3.4 GHz)",
      "cpuArch": "ARMv9.2-A (4nm 先进制程)",
      "cpuCores": "8 核心 Oryon™ 高效架构",
      "gpuModel": "Qualcomm® Adreno™ GPU (1.7 TFLOPS)",
      "npuModel": "Qualcomm® Hexagon™ NPU",
      "npuTops": "45 TOPS",
      "copilotPlus": "认证 Copilot+ PC (端侧大模型加速)",
      "ramSpec": "16GB / 24GB LPDDR5x RAM (8448 MT/s)",
      "storageOptions": "256GB / 512GB (UFS) / 1TB (可拆卸 SSD)",
      "ssdRemovable": "支持 (1TB 闪存可维护扩展)",
      "expandableStorage": "not_applicable",
      "screenSize": "13.0 英寸 PixelSense™ 显示屏",
      "aspectRatio": "3:2 生产力黄金比例",
      "panelTech": "防眩光强化玻璃 LCD",
      "resolution": "1920 × 1280",
      "ppi": "178 PPI",
      "refreshRate": "60Hz",
      "brightness": "典型 300 nits (SDR)",
      "colorSupport": "sRGB 与增强型色彩配置文件，支持色彩校准",
      "touchAndPenProtocol": "10 点触控，无触控笔支持",
      "frontCamera": "1080p 全高清 Surface Studio 摄像头",
      "windowsHello": "电源键集成指纹识别 (Fingerprint Reader)",
      "rearCamera": "not_applicable",
      "videoFeatures": "Windows Studio 效果 (自动取景 / 人像模糊 / 语音聚焦)",
      "microphones": "双重录音棚级麦克风 (Voice Focus 语音聚焦)",
      "speakers": "双立体声扬声器，支持杜比全景声 (Dolby Atmos®)",
      "audioTech": "Dolby Atmos® 认证",
      "headphoneJack": "3.5 毫米耳机接口",
      "usbPorts": "2 × USB-C (USB 3.2, 支持充电/数据传输/DP 1.4a)",
      "thunderboltSupport": "not_applicable",
      "surfaceConnect": "支持 (通过专用接口或 USB-C 进行最低 45W 快速充电)",
      "wireless": "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
      "cellular": "not_applicable",
      "batteryCapacityWh": "47.0 Wh",
      "batteryLifeOffice": "长达 16 小时常规网页浏览",
      "batteryLifeVideo": "长达 20 小时本地视频播放",
      "chargingPower": "45W 专用充电器",
      "fastCharging": "支持 (60W USB-C 快充)",
      "compatibleKeyboard": "集成全尺寸机械背光键盘",
      "penHapticFeedback": "not_applicable",
      "penChargingType": "not_applicable",
      "trackpadType": "精准大面积触控板",
      "tpmChip": "Microsoft Pluton 安全芯片",
      "securedCorePc": "认证 Secured-core PC",
      "biometrics": "指纹识别 (电源键集成)",
      "enterpriseManage": "Windows 11 安全防护",
      "dimensionsMm": "291 × 214 × 15.7",
      "weightGrams": "1220g (1.22 kg)",
      "totalWeightWithKeyboard": "1220g (一体机身)",
      "thermalDesign": "静音均热板双通道微风扇",
      "repairabilityScore": "8/10 可维修设计",
      "replaceableParts": "屏幕总成、电池、主板、闪存模块",
      "warranty": "2 年有限硬件保修",
      "startingPriceCny": "¥7,788 起 (消费版)",
      "sourceReliability": "microsoft_official",
      "lastVerified": "2026-09-18",
      "officialDocUrl": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-inch",
      "officialConfigureUrl": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-inch"
    },
    "isCommercial": false,
    "learnDocUrl": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-inch",
    "segment": "consumer"
  },
  {
    "id": "laptop-7-150",
    "categoryId": "laptop",
    "heroImage": "./assets/products/surface-laptop-platinum.png",
    "name": "Surface Laptop (第 7 代) 15 英寸",
    "nameEn": "Surface Laptop, 15-inch (7th Edition)",
    "generation": "第 7 代 (2024)",
    "year": 2024,
    "status": "current_cn",
    "targetAudience": "consumer",
    "flagship": true,
    "tagline": "15 英寸大视野超长续航旗舰轻薄本，高通骁龙 X Elite 极速性能",
    "prevGenerationId": "laptop-5",
    "nextGenerationId": "laptop-8-150",
    "specs": {
      "releaseDate": "2024 年 6 月",
      "generation": "第 7 代",
      "status": "current_cn",
      "targetAudience": "面向需要超大屏幕与长效续航的内容创作者、商务白领与工程开发人员",
      "tagline": "高通骁龙 X Elite 平台带来超强性能，22 小时超长视频续航与 120Hz 大屏",
      "colors": [
        {
          "name": "亮铂金",
          "hex": "#d8d8d8",
          "image": "./assets/products/surface-laptop-platinum.png"
        },
        {
          "name": "典雅黑",
          "hex": "#262626",
          "image": "./assets/products/surface-laptop-black.png"
        }
      ],
      "chassisMaterial": "特制阳极氧化铝合金机身",
      "kickstandType": "not_applicable",
      "osAtLaunch": "Windows 11 家庭中文版 (ARM64)",
      "cpuModel": "高通骁龙® X Elite (12 核心, 最高 3.4 GHz, 双核睿频 4.0 GHz)",
      "cpuArch": "ARMv9.2-A (4nm 制程)",
      "cpuCores": "12 核心 Oryon™ 高性能架构",
      "gpuModel": "Qualcomm® Adreno™ GPU (3.8 TFLOPS)",
      "npuModel": "Qualcomm® Hexagon™ NPU",
      "npuTops": "45 TOPS",
      "copilotPlus": "认证 Copilot+ PC",
      "ramSpec": "16GB / 32GB / 64GB LPDDR5x RAM (8448 MT/s)",
      "storageOptions": "256GB / 512GB / 1TB 可拆卸 Gen 4 SSD",
      "ssdRemovable": "支持 (快拆设计)",
      "expandableStorage": "MicroSDXC 读卡器",
      "screenSize": "15.0 英寸 PixelSense™ Flow 显示屏",
      "aspectRatio": "3:2",
      "panelTech": "防眩光强化玻璃 LCD",
      "resolution": "2496 × 1664",
      "ppi": "201 PPI",
      "refreshRate": "120Hz 动态刷新率",
      "brightness": "典型 600 nits (SDR) / HDR 峰值",
      "colorSupport": "DCI-P3 / sRGB 色域支持，色彩校准",
      "touchAndPenProtocol": "10 点触控，无触控笔支持",
      "frontCamera": "1080p 全高清 Surface Studio 摄像头",
      "windowsHello": "支持 Windows Hello 人脸识别",
      "rearCamera": "not_applicable",
      "videoFeatures": "Windows Studio 效果",
      "microphones": "双重录音棚级麦克风",
      "speakers": "Omnisonic® 扬声器，支持杜比全景声 (Dolby Atmos®)",
      "audioTech": "Dolby Atmos® 认证",
      "headphoneJack": "3.5 毫米耳机接口",
      "usbPorts": "2 × USB-C (USB4 / 雷电兼容) + 1 × USB-A 3.1 + MicroSDXC",
      "thunderboltSupport": "支持 USB4",
      "surfaceConnect": "配备 Surface Connect 接口",
      "wireless": "Wi-Fi 7 + 蓝牙 5.4",
      "cellular": "not_applicable",
      "batteryCapacityWh": "66.0 Wh",
      "batteryLifeOffice": "长达 15 小时常规网页浏览",
      "batteryLifeVideo": "长达 22 小时本地视频播放",
      "chargingPower": "65W 适配器",
      "fastCharging": "支持快速充电",
      "compatibleKeyboard": "全尺寸背光按键机械键盘",
      "penHapticFeedback": "not_applicable",
      "penChargingType": "not_applicable",
      "trackpadType": "Surface 精准触觉反馈触控板",
      "tpmChip": "Microsoft Pluton 安全芯片",
      "securedCorePc": "认证 Secured-core PC",
      "biometrics": "Windows Hello 人脸识别",
      "enterpriseManage": "Windows 11 安全防护",
      "dimensionsMm": "329 × 239 × 16.9",
      "weightGrams": "1660g (1.66 kg)",
      "totalWeightWithKeyboard": "1660g (一体机身)",
      "thermalDesign": "双热管微风扇散热系统",
      "repairabilityScore": "8/10 高可维修性设计",
      "replaceableParts": "固态硬盘、主板模块、电池、屏幕",
      "warranty": "2 年有限硬件保修",
      "startingPriceCny": "¥11,188 起 (消费版)",
      "sourceReliability": "microsoft_official",
      "lastVerified": "2026-09-18",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition",
      "officialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition"
    },
    "isCommercial": false,
    "learnDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition",
    "segment": "consumer"
  },
  {
    "id": "laptop-13-inch-intel-biz",
    "categoryId": "laptop",
    "heroImage": "./assets/products/surface-laptop-platinum.png",
    "name": "Surface Laptop 13 英寸 商用版 - Intel 版",
    "nameEn": "Surface Laptop for Business 13-inch (Intel)",
    "generation": "第 1 代 (2025/2026)",
    "year": 2026,
    "status": "current_cn",
    "targetAudience": "business",
    "flagship": false,
    "tagline": "搭载英特尔酷睿 Ultra 5 处理器，47 TOPS 本地 NPU 商务轻薄旗舰",
    "prevGenerationId": null,
    "nextGenerationId": null,
    "specs": {
      "releaseDate": "2025 年 10 月 / 2026 年",
      "generation": "第 1 代",
      "status": "current_cn",
      "targetAudience": "面向政企机构采购、商务精英与专业办公用户",
      "tagline": "搭载英特尔酷睿 Ultra 5 处理器 125，47 TOPS 强大算力与 Windows 11 专业版",
      "colors": [
        {
          "name": "亮铂金",
          "hex": "#d8d8d8",
          "image": "./assets/products/surface-laptop-platinum.png"
        }
      ],
      "chassisMaterial": "商务特制阳极氧化铝合金机身",
      "kickstandType": "not_applicable",
      "osAtLaunch": "Windows 11 专业版 (x86-64)",
      "cpuModel": "英特尔® 酷睿™ Ultra 5 处理器 125 (最高睿频 4.5 GHz)",
      "cpuArch": "Intel 4 先进制程",
      "cpuCores": "14 核心 18 线程 (4P + 8E + 2LPE)",
      "gpuModel": "Intel® Arc™ Graphics 锐炫核显",
      "npuModel": "Intel® AI Boost NPU",
      "npuTops": "47 TOPS",
      "copilotPlus": "认证 Copilot+ PC",
      "ramSpec": "16GB / 24GB LPDDR5x RAM",
      "storageOptions": "256GB / 512GB / 1TB 可维护商业存储",
      "ssdRemovable": "支持 (商业数据保护留存)",
      "expandableStorage": "not_applicable",
      "screenSize": "13.0 英寸 PixelSense™ 触控显示屏",
      "aspectRatio": "3:2 商务黄金生产力比例",
      "panelTech": "防眩光强化玻璃 LCD",
      "resolution": "1920 × 1280",
      "ppi": "178 PPI",
      "refreshRate": "60Hz",
      "brightness": "典型 300 nits (SDR)",
      "colorSupport": "sRGB 与增强型色彩配置文件",
      "touchAndPenProtocol": "10 点触控，无触控笔支持",
      "frontCamera": "1080p 全高清 Surface Studio 摄像头",
      "windowsHello": "电源键集成指纹识别 (Fingerprint Reader)",
      "rearCamera": "not_applicable",
      "videoFeatures": "Windows Studio 效果 (商业会议智能降噪取景)",
      "microphones": "双重录音棚级麦克风 (Voice Focus)",
      "speakers": "双立体声扬声器，支持杜比全景声 (Dolby Atmos®)",
      "audioTech": "Dolby Atmos® 认证",
      "headphoneJack": "3.5 毫米耳机接口",
      "usbPorts": "2 × USB-C (USB 3.2, 充电/DP 1.4a/数据传输)",
      "thunderboltSupport": "not_applicable",
      "surfaceConnect": "配备专属快充接口",
      "wireless": "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
      "cellular": "not_applicable",
      "batteryCapacityWh": "48.0 Wh",
      "batteryLifeOffice": "长达 15 小时常规商务办公",
      "batteryLifeVideo": "长达 19 小时本地视频播放",
      "chargingPower": "45W 官方电源适配器",
      "fastCharging": "支持快速充电",
      "compatibleKeyboard": "全尺寸商业机械背光键盘",
      "penHapticFeedback": "not_applicable",
      "penChargingType": "not_applicable",
      "trackpadType": "大面积精准触控板",
      "tpmChip": "硬件 TPM 2.0 安全芯片",
      "securedCorePc": "认证 Secured-core PC",
      "biometrics": "指纹识别 (电源键集成)",
      "enterpriseManage": "支持 Microsoft Intune 与企业集中部署",
      "dimensionsMm": "291 × 214 × 15.7",
      "weightGrams": "1240g (1.24 kg)",
      "totalWeightWithKeyboard": "1240g (一体机身)",
      "thermalDesign": "双铜管单风扇微噪散热系统",
      "repairabilityScore": "8/10 商业便捷维修",
      "replaceableParts": "屏幕总成、电池、主板、可拆卸固态硬盘",
      "warranty": "2 年商业有限硬件质保",
      "startingPriceCny": "¥11,788 起 (商用版)",
      "sourceReliability": "microsoft_official",
      "lastVerified": "2026-09-18",
      "officialDocUrl": "https://www.microsoftstore.com.cn/commercial",
      "officialConfigureUrl": "https://www.microsoftstore.com.cn/commercial"
    },
    "isCommercial": true,
    "learnDocUrl": "https://learn.microsoft.com/zh-cn/surface/surface-system-sku-reference",
    "segment": "commercial"
  },
  {
    "id": "book-3-biz",
    "categoryId": "book",
    "heroImage": "./assets/products/surface-book-platinum.png",
    "name": "Surface Book 3 商用版 (13.5\" & 15\")",
    "nameEn": "Surface Book 3 for Business",
    "generation": "第 3 代 (2020)",
    "year": 2020,
    "status": "discontinued",
    "targetAudience": "business",
    "flagship": false,
    "tagline": "商用可拆卸可变形性能工作站，独占 Quadro RTX 3000 专业显卡",
    "prevGenerationId": null,
    "nextGenerationId": "sls-1-biz",
    "specs": {
      "releaseDate": "2020 年 5 月",
      "generation": "第 3 代",
      "status": "discontinued",
      "targetAudience": "面向工程设计、专业 3D 渲染与企业高算力图形工作站用户",
      "tagline": "商用专属独占 NVIDIA Quadro RTX 3000 专业图形显卡与 Windows 10/11 专业版",
      "colors": [
        {
          "name": "亮铂金",
          "hex": "#d8d8d8",
          "image": "./assets/products/surface-book-platinum.png"
        }
      ],
      "chassisMaterial": "轻质特种镁合金一体成型",
      "kickstandType": "动态支点铰链 (Dynamic Fulcrum Hinge) 可分离",
      "osAtLaunch": "Windows 10 专业版 (可免费升至 Windows 11 专业版)",
      "cpuModel": "英特尔® 酷睿™ 第 10 代 i5-1035G7 / i7-1065G7",
      "cpuArch": "Sunny Cove (10nm)",
      "cpuCores": "4 核心 8 线程",
      "gpuModel": "NVIDIA Quadro RTX 3000 (商用专属 6GB GDDR6) / GTX 1660 Ti Max-Q",
      "npuModel": "not_applicable",
      "npuTops": "not_applicable",
      "copilotPlus": "not_applicable",
      "ramSpec": "8GB / 16GB / 32GB 3733Mhz LPDDR4x",
      "storageOptions": "256GB / 512GB / 1TB / 2TB PCIe NVMe SSD",
      "ssdRemovable": "not_applicable",
      "expandableStorage": "全尺寸 SDXC 读卡器 (UHS-II)",
      "screenSize": "13.5 英寸 (3000×2000) / 15.0 英寸 (3240×2160)",
      "aspectRatio": "3:2",
      "panelTech": "PixelSense™ 显示屏",
      "resolution": "3240 × 2160 (15寸) / 3000 × 2000 (13.5寸)",
      "ppi": "260 PPI",
      "refreshRate": "60Hz",
      "brightness": "400 nits",
      "colorSupport": "100% sRGB",
      "touchAndPenProtocol": "10 点触控，支持 Surface 触控笔",
      "frontCamera": "500 万像素 1080p 全高清前置镜头",
      "windowsHello": "支持 Windows Hello 人脸识别",
      "rearCamera": "800 万像素 1080p 自动对焦后置镜头",
      "videoFeatures": "全高清视频通话",
      "microphones": "双录音棚级远场麦克风",
      "speakers": "前置立体声扬声器，支持杜比全景声 (Dolby Atmos)",
      "audioTech": "Dolby Atmos® 认证",
      "headphoneJack": "3.5 毫米耳机接口",
      "usbPorts": "2 × USB-A 3.1 Gen 2 + 1 × USB-C (USB 3.1 Gen 2) + 2 × Surface Connect",
      "thunderboltSupport": "not_applicable",
      "surfaceConnect": "双 Surface Connect 接口 (平板部分与键盘基座各 1 个)",
      "wireless": "Wi-Fi 6 (802.11ax) + 蓝牙 5.0",
      "cellular": "not_applicable",
      "batteryCapacityWh": "平板部分 23Wh + 基座 67Wh (共 90Wh)",
      "batteryLifeOffice": "常规使用约 17.5 小时",
      "batteryLifeVideo": "视频播放约 17.5 小时",
      "chargingPower": "127W 官方电源适配器",
      "fastCharging": "支持",
      "compatibleKeyboard": "集成可分离 GPU 键盘基座",
      "penHapticFeedback": "not_applicable",
      "penChargingType": "磁吸附机身侧边",
      "trackpadType": "大面积精准玻璃触控板",
      "tpmChip": "企业级独立 TPM 2.0",
      "securedCorePc": "not_applicable",
      "biometrics": "Windows Hello 人脸识别",
      "enterpriseManage": "支持 Microsoft Endpoint Manager 与企业集中管控",
      "dimensionsMm": "343 × 251 × 23",
      "weightGrams": "1905g (15寸含基座)",
      "totalWeightWithKeyboard": "1905g",
      "thermalDesign": "平板部分与键盘基座双独立主动散热风扇",
      "repairabilityScore": "1/10",
      "replaceableParts": "服务网点官方置换",
      "warranty": "2 年商业有限硬件保修",
      "startingPriceCny": "¥13,588 起 (商用版)",
      "sourceReliability": "microsoft_official",
      "lastVerified": "2026-09-18",
      "officialDocUrl": "https://www.microsoftstore.com.cn/commercial",
      "officialConfigureUrl": "https://www.microsoftstore.com.cn/commercial"
    },
    "isCommercial": true,
    "learnDocUrl": "https://learn.microsoft.com/en-us/surface/surface-book-3",
    "segment": "commercial"
  },
  {
    "id": "go-2-biz",
    "categoryId": "go",
    "heroImage": "./assets/products/surface-go-platinum.png",
    "name": "Surface Go 2 商用版",
    "nameEn": "Surface Go 2 for Business",
    "generation": "第 2 代 (2020)",
    "year": 2020,
    "status": "discontinued",
    "targetAudience": "business",
    "flagship": false,
    "tagline": "10.5 英寸轻巧便携二合一平板，商用支持 LTE Advanced 移动连接",
    "prevGenerationId": null,
    "nextGenerationId": "go-3-biz",
    "specs": {
      "releaseDate": "2020 年 5 月",
      "generation": "第 2 代",
      "status": "discontinued",
      "targetAudience": "面向医疗巡检、一线服务人员、外勤巡查与企业轻量办公",
      "tagline": "升级 10.5 英寸窄边框屏幕与酷睿 m3 处理器，预装 Windows 10 专业版",
      "colors": [
        {
          "name": "亮铂金",
          "hex": "#d8d8d8",
          "image": "./assets/products/surface-go-platinum.png"
        }
      ],
      "chassisMaterial": "精工镁合金一体化机身",
      "kickstandType": "0° ~ 165° 阻尼无级集成铰链",
      "osAtLaunch": "Windows 10 专业版 (支持升级 Windows 11 专业版)",
      "cpuModel": "英特尔® 奔腾® 黄金处理器 4425Y / 酷睿™ m3-8100Y",
      "cpuArch": "Amber Lake Y (14nm)",
      "cpuCores": "双核心四线程",
      "gpuModel": "Intel® UHD Graphics 615",
      "npuModel": "not_applicable",
      "npuTops": "not_applicable",
      "copilotPlus": "not_applicable",
      "ramSpec": "4GB / 8GB LPDDR3",
      "storageOptions": "64GB eMMC / 128GB SSD",
      "ssdRemovable": "not_applicable",
      "expandableStorage": "MicroSDXC 读卡器",
      "screenSize": "10.5 英寸 PixelSense™ 触控屏",
      "aspectRatio": "3:2",
      "panelTech": "康宁大猩猩玻璃 3 代 LCD",
      "resolution": "1920 × 1280",
      "ppi": "220 PPI",
      "refreshRate": "60Hz",
      "brightness": "400 nits",
      "colorSupport": "100% sRGB",
      "touchAndPenProtocol": "10 点触控，支持 Surface 触控笔",
      "frontCamera": "500 万像素 1080p 全高清镜头",
      "windowsHello": "支持 Windows Hello 人脸识别",
      "rearCamera": "800 万像素 1080p 自动对焦后置镜头",
      "videoFeatures": "全高清视频",
      "microphones": "双录音棚级远场麦克风",
      "speakers": "2W 立体声扬声器，支持杜比全景声 (Dolby Audio)",
      "audioTech": "Dolby® Audio™ Premium",
      "headphoneJack": "3.5 毫米耳机接口",
      "usbPorts": "1 × USB-C + 1 × Surface Connect + 1 × Surface 特制专业键盘盖接口",
      "thunderboltSupport": "not_applicable",
      "surfaceConnect": "配备经典磁吸 Surface Connect 口",
      "wireless": "Wi-Fi 6 (802.11ax) + 蓝牙 5.0",
      "cellular": "可选 4G LTE Advanced (Qualcomm Snapdragon X16)",
      "batteryCapacityWh": "26.8 Wh",
      "batteryLifeOffice": "常规使用约 10 小时",
      "batteryLifeVideo": "视频播放约 10 小时",
      "chargingPower": "24W 电源适配器",
      "fastCharging": "支持",
      "compatibleKeyboard": "Surface Go 专业键盘盖",
      "penHapticFeedback": "not_applicable",
      "penChargingType": "磁吸附机身侧边",
      "trackpadType": "大尺寸精准触控板",
      "tpmChip": "企业级独立 TPM 2.0 芯片",
      "securedCorePc": "not_applicable",
      "biometrics": "Windows Hello 人脸识别",
      "enterpriseManage": "支持企业 Intune 统一管理",
      "dimensionsMm": "245 × 175 × 8.3",
      "weightGrams": "544g (Wi-Fi) / 553g (LTE)",
      "totalWeightWithKeyboard": "约 790g",
      "thermalDesign": "无风扇被动静音散热系统",
      "repairabilityScore": "3/10",
      "replaceableParts": "官方售后支持",
      "warranty": "2 年商业有限硬件保修",
      "startingPriceCny": "¥3,188 起 (商用版)",
      "sourceReliability": "microsoft_official",
      "lastVerified": "2026-09-18",
      "officialDocUrl": "https://www.microsoftstore.com.cn/commercial",
      "officialConfigureUrl": "https://www.microsoftstore.com.cn/commercial"
    },
    "isCommercial": true,
    "learnDocUrl": "https://learn.microsoft.com/en-us/surface/surface-go-2",
    "segment": "commercial"
  },
  {
    "id": "pro-6-biz",
    "categoryId": "pro",
    "heroImage": "./assets/products/surface-pro-platinum.png",
    "name": "Surface Pro 6 商用版",
    "nameEn": "Surface Pro 6 for Business",
    "generation": "第 6 代 (2018)",
    "year": 2018,
    "status": "discontinued",
    "targetAudience": "business",
    "flagship": false,
    "tagline": "经典四核酷睿便携生产力平板，预装 Windows 10 专业版",
    "prevGenerationId": null,
    "nextGenerationId": "pro-7-plus",
    "specs": {
      "releaseDate": "2018 年 10 月",
      "generation": "第 6 代",
      "status": "discontinued",
      "targetAudience": "面向企业移动办公、商务出差与专业行业客户",
      "tagline": "首次搭载英特尔第八代四核处理器，性能提升 67%，预装 Windows 10 专业版",
      "colors": [
        {
          "name": "亮铂金",
          "hex": "#d8d8d8",
          "image": "./assets/products/surface-pro-platinum.png"
        },
        {
          "name": "典雅黑",
          "hex": "#262626",
          "image": "./assets/products/surface-pro-black.png"
        }
      ],
      "chassisMaterial": "特质镁合金一体成型",
      "kickstandType": "0° ~ 165° 阻尼无级集成铰链",
      "osAtLaunch": "Windows 10 专业版",
      "cpuModel": "英特尔® 酷睿™ 第 8 代 i5-8350U (vPro) / i7-8650U (vPro)",
      "cpuArch": "Kaby Lake R (14nm)",
      "cpuCores": "4 核心 8 线程",
      "gpuModel": "Intel® UHD Graphics 620",
      "npuModel": "not_applicable",
      "npuTops": "not_applicable",
      "copilotPlus": "not_applicable",
      "ramSpec": "8GB / 16GB LPDDR3",
      "storageOptions": "128GB / 256GB / 512GB / 1TB PCIe NVMe SSD",
      "ssdRemovable": "not_applicable",
      "expandableStorage": "MicroSDXC 读卡器",
      "screenSize": "12.3 英寸 PixelSense™ 显示屏",
      "aspectRatio": "3:2",
      "panelTech": "防反射高透 LCD",
      "resolution": "2736 × 1824",
      "ppi": "267 PPI",
      "refreshRate": "60Hz",
      "brightness": "400 nits",
      "colorSupport": "100% sRGB",
      "touchAndPenProtocol": "10 点触控，支持 Surface 触控笔 (4096 级压感)",
      "frontCamera": "500 万像素 1080p 全高清前置摄像头",
      "windowsHello": "支持 Windows Hello 人脸识别",
      "rearCamera": "800 万像素 1080p 自动对焦后置镜头",
      "videoFeatures": "全高清视频通话",
      "microphones": "双重远场立体声麦克风",
      "speakers": "1.6W 立体声扬声器，支持杜比音效 (Dolby Audio)",
      "audioTech": "Dolby® Audio™ Premium",
      "headphoneJack": "3.5 毫米耳机接口",
      "usbPorts": "1 × 全尺寸 USB-A 3.0 + 1 × Mini DisplayPort + 1 × Surface Connect",
      "thunderboltSupport": "not_applicable",
      "surfaceConnect": "配备经典磁吸 Surface Connect 口",
      "wireless": "Wi-Fi 5 (802.11ac) + 蓝牙 4.1",
      "cellular": "not_applicable",
      "batteryCapacityWh": "45.0 Wh",
      "batteryLifeOffice": "常规使用约 13.5 小时",
      "batteryLifeVideo": "视频播放约 13.5 小时",
      "chargingPower": "44W 官方电源适配器",
      "fastCharging": "支持",
      "compatibleKeyboard": "Surface Pro 专业键盘盖",
      "penHapticFeedback": "not_applicable",
      "penChargingType": "AAAA 电池供电 / 磁吸机身侧边",
      "trackpadType": "大尺寸精准玻璃触控板",
      "tpmChip": "企业级 TPM 2.0 硬件芯片",
      "securedCorePc": "not_applicable",
      "biometrics": "Windows Hello 人脸识别",
      "enterpriseManage": "支持 Intel vPro 技术与企业域管理",
      "dimensionsMm": "292 × 201 × 8.5",
      "weightGrams": "770g (i5) / 784g (i7)",
      "totalWeightWithKeyboard": "约 1080g",
      "thermalDesign": "i5 无风扇静音被动散热 / i7 超薄静音主动风扇",
      "repairabilityScore": "1/10",
      "replaceableParts": "官方售后整机置换",
      "warranty": "2 年商业有限硬件保修",
      "startingPriceCny": "¥7,188 起 (商用版)",
      "sourceReliability": "microsoft_official",
      "lastVerified": "2026-09-18",
      "officialDocUrl": "https://www.microsoftstore.com.cn/commercial",
      "officialConfigureUrl": "https://www.microsoftstore.com.cn/commercial"
    },
    "isCommercial": true,
    "learnDocUrl": "https://learn.microsoft.com/en-us/surface/surface-pro-6",
    "segment": "commercial"
  }
];

// Price calibration according to CommercialCofig.jpg:
const priceCalibration = {
  'pro-12-13-snap': '¥13,588 起 (商用版)',
  'pro-12-13-intel': '¥13,588 起 (商用版)',
  'pro-12-inch-biz': '¥9,788 起 (商用版)',
  'laptop-13-inch-biz': '¥10,788 起 (商用版)',
  'laptop-8-138-snap': '¥13,188 起 (商用版)',
  'laptop-8-138-intel': '¥15,388 起 (商用版)',
  'laptop-8-150-snap': '¥16,488 起 (商用版)',
  'laptop-8-150-intel': '¥17,588 起 (商用版)',
  'pro-11-biz-snap': '¥12,488 起 (商用版)',
  'pro-11-biz-intel': '¥12,488 起 (商用版)',
  'laptop-7-biz-snap': '¥12,088 起 (商用版)',
  'laptop-7-biz-intel': '¥13,188 起 (商用版)',
  'laptop-6-biz': '¥12,288 起 (商用版)',
  'pro-10-biz': '¥12,288 起 (商用版)'
};

// Add new devices if not already present
newDevices.forEach(nd => {
  const existingIdx = SURFACE_DATA.devices.findIndex(d => d.id === nd.id);
  if (existingIdx !== -1) {
    SURFACE_DATA.devices[existingIdx] = nd;
    console.log(`Updated existing device: ${nd.id}`);
  } else {
    SURFACE_DATA.devices.push(nd);
    console.log(`Added new device: ${nd.id}`);
  }
});

// Calibrate prices and clean links
SURFACE_DATA.devices.forEach(d => {
  if (priceCalibration[d.id] && d.specs) {
    d.specs.startingPriceCny = priceCalibration[d.id];
  }
  // Ensure consumer links NEVER point to /commercial
  if (d.segment === 'consumer' || (!d.isCommercial && d.segment !== 'commercial')) {
    if (d.learnDocUrl && d.learnDocUrl.includes('/commercial')) {
      d.learnDocUrl = 'https://www.microsoftstore.com.cn/surface';
    }
    if (d.specs && d.specs.officialDocUrl && d.specs.officialDocUrl.includes('/commercial')) {
      d.specs.officialDocUrl = 'https://www.microsoftstore.com.cn/surface';
    }
  }
  // Ensure commercial links point to commercial
  if (d.segment === 'commercial' || d.isCommercial) {
    if (!d.learnDocUrl) {
      d.learnDocUrl = 'https://learn.microsoft.com/zh-cn/surface/surface-system-sku-reference';
    }
  }
});

console.log('Final device count:', SURFACE_DATA.devices.length);

// Generate new file content:
// Replace the devices array in fileContent
const devicesJson = JSON.stringify(SURFACE_DATA.devices, null, 2);
// The devices array starts with "devices": [
const devKey = '"devices": [';
const devStart = fileContent.indexOf(devKey);
if (devStart === -1) {
  console.error('Cannot find "devices": [ in surface-data.js');
  process.exit(1);
}

// Find matching closing bracket for devices
let depth = 0;
let devEnd = -1;
for (let i = devStart + devKey.length - 1; i < fileContent.length; i++) {
  if (fileContent[i] === '[') depth++;
  else if (fileContent[i] === ']') {
    depth--;
    if (depth === 0) {
      devEnd = i;
      break;
    }
  }
}

if (devEnd === -1) {
  console.error('Cannot find end of devices array');
  process.exit(1);
}

const newFileContent = fileContent.slice(0, devStart + '"devices": '.length) + 
                       devicesJson + 
                       fileContent.slice(devEnd + 1);

fs.writeFileSync('js/surface-data.js', newFileContent, 'utf-8');
console.log('Successfully written updated js/surface-data.js!');
