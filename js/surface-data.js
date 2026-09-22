/**
 * Microsoft Surface Specs Hub - Master Database (2012 - 2026)
 * 严格对齐 PRD 13 大专属参数体系、产品状态生命周期、未知参数治理与配件双向兼容
 * 消费版与商用版两大顶级大类彻底分离 · 官方商用版全线对齐 Microsoft Learn 与原厂 Fact Sheet · 100% 微软官方商城与技术白皮书存档
 */

const SURFACE_DATA = {
  "datasetVersion": "2026.09.21.ports",
  "categories": [
    {
      "id": "pro",
      "name": "Surface Pro 系列",
      "icon": "tablet",
      "desc": "二合一平板生产力旗舰 (10.6\" - 13.0\")",
      "defaultModel": "pro-12-13-intel"
    },
    {
      "id": "laptop",
      "name": "Surface Laptop 系列",
      "icon": "laptop",
      "desc": "经典极简触控轻薄本 (13.5\" - 15.0\")",
      "defaultModel": "laptop-8-138-intel"
    },
    {
      "id": "sls",
      "name": "Surface Laptop Studio 系列",
      "icon": "studio-laptop",
      "desc": "三段式专业图形变形工作站 (14.4\")",
      "defaultModel": "sls-2"
    },
    {
      "id": "book",
      "name": "Surface Book 系列",
      "icon": "book",
      "desc": "可拆卸铰链独立显卡性能本 (13.5\" - 15.0\")",
      "defaultModel": "book-3-15"
    },
    {
      "id": "go",
      "name": "Surface Go 系列",
      "icon": "tablet-mini",
      "desc": "轻巧极致便携二合一 (10.0\" - 10.5\")",
      "defaultModel": "go-4"
    },
    {
      "id": "laptopgo",
      "name": "Surface Laptop Go 系列",
      "icon": "laptop-mini",
      "desc": "轻巧入门触控笔记本 (12.4\")",
      "defaultModel": "laptop-go-3"
    },
    {
      "id": "studio",
      "name": "Surface Studio / Hub 系列",
      "icon": "desktop",
      "desc": "一体机与巨幕协作白板 (28\" - 85\")",
      "defaultModel": "studio-2-plus"
    },
    {
      "id": "duo",
      "name": "Surface Duo 系列",
      "icon": "phone",
      "desc": "双屏铰链移动折叠移动设备 (5.6\" - 8.3\")",
      "defaultModel": "duo-2"
    }
  ],
  "consumerCategories": [
    {
      "id": "consumer-pro",
      "seriesId": "pro",
      "segment": "consumer",
      "name": "Surface Pro 消费系列",
      "icon": "tablet",
      "desc": "全能二合一触控平板旗舰 (12.0\" - 13.0\")",
      "defaultModel": "pro-12-13"
    },
    {
      "id": "consumer-laptop",
      "seriesId": "laptop",
      "segment": "consumer",
      "name": "Surface Laptop 消费系列",
      "icon": "laptop",
      "desc": "轻薄极简触控笔记本 (13.5\" - 15.0\")",
      "defaultModel": "laptop-8-138"
    },
    {
      "id": "consumer-sls",
      "seriesId": "sls",
      "segment": "consumer",
      "name": "Surface Laptop Studio 消费系列",
      "icon": "studio-laptop",
      "desc": "三段式变形创意工作站 (14.4\")",
      "defaultModel": "sls-2"
    },
    {
      "id": "consumer-book",
      "seriesId": "book",
      "segment": "consumer",
      "name": "Surface Book 消费系列",
      "icon": "book",
      "desc": "可分离独显性能轻薄本 (13.5\" - 15.0\")",
      "defaultModel": "book-3-15"
    },
    {
      "id": "consumer-go",
      "seriesId": "go",
      "segment": "consumer",
      "name": "Surface Go 消费系列",
      "icon": "tablet-mini",
      "desc": "极致便携学生/轻便二合一 (10.0\" - 10.5\")",
      "defaultModel": "go-3"
    },
    {
      "id": "consumer-laptopgo",
      "seriesId": "laptopgo",
      "segment": "consumer",
      "name": "Surface Laptop Go 消费系列",
      "icon": "laptop-mini",
      "desc": "轻巧灵动入门笔记本 (12.4\")",
      "defaultModel": "laptop-go-3"
    },
    {
      "id": "consumer-studio",
      "seriesId": "studio",
      "segment": "consumer",
      "name": "Surface Studio 消费系列",
      "icon": "desktop",
      "desc": "28 英寸零重力铰链专业创作一体机",
      "defaultModel": "studio-2-plus"
    },
    {
      "id": "consumer-duo",
      "seriesId": "duo",
      "segment": "consumer",
      "name": "Surface Duo 消费系列",
      "icon": "phone",
      "desc": "双屏铰链移动折叠设备 (5.6\" - 8.3\")",
      "defaultModel": "duo-2"
    }
  ],
  "commercialCategories": [
    {
      "id": "business-pro",
      "seriesId": "pro",
      "segment": "commercial",
      "name": "Surface Pro 商用系列",
      "icon": "tablet",
      "desc": "企业级二合一平板生产力旗舰 (12.0\" - 13.0\")",
      "defaultModel": "pro-12-13-intel"
    },
    {
      "id": "business-laptop",
      "seriesId": "laptop",
      "segment": "commercial",
      "name": "Surface Laptop 商用系列",
      "icon": "laptop",
      "desc": "政企商用轻薄触控本 (13.0\" - 15.0\")",
      "defaultModel": "laptop-8-138-intel"
    },
    {
      "id": "business-sls",
      "seriesId": "sls",
      "segment": "commercial",
      "name": "Surface Laptop Studio 商用系列",
      "icon": "studio-laptop",
      "desc": "专业图形渲染与 CAD 工程工作站 (14.4\")",
      "defaultModel": "sls-2-biz"
    },
    {
      "id": "business-book",
      "seriesId": "book",
      "segment": "commercial",
      "name": "Surface Book 商用系列",
      "icon": "book",
      "desc": "企业级可拆卸独显图形工作站 (13.5\" - 15.0\")",
      "defaultModel": "book-3-biz"
    },
    {
      "id": "business-go",
      "seriesId": "go",
      "segment": "commercial",
      "name": "Surface Go 商用系列",
      "icon": "tablet-mini",
      "desc": "移动办公、一线巡检与现场服务轻量平板 (10.5\")",
      "defaultModel": "go-4"
    },
    {
      "id": "business-laptopgo",
      "seriesId": "laptopgo",
      "segment": "commercial",
      "name": "Surface Laptop Go 商用系列",
      "icon": "laptop-mini",
      "desc": "企业高性价比轻便办公本 (12.4\")",
      "defaultModel": "laptop-go-3-biz"
    },
    {
      "id": "business-hub",
      "seriesId": "hub",
      "segment": "commercial",
      "name": "Surface Hub & Studio 商用协作系列",
      "icon": "desktop",
      "desc": "会议室协同巨幕与企业管理级一体机 (28\" - 85\")",
      "defaultModel": "hub-3"
    }
  ],
  "specGroups": [
    {
      "id": "basic",
      "name": "基础与外观",
      "fields": [
        {
          "key": "releaseDate",
          "label": "发布上市时间"
        },
        {
          "key": "generation",
          "label": "产品代际"
        },
        {
          "key": "status",
          "label": "销售状态",
          "type": "status_badge"
        },
        {
          "key": "targetAudience",
          "label": "目标市场",
          "type": "audience_badge"
        },
        {
          "key": "tagline",
          "label": "官方定位口号"
        },
        {
          "key": "colors",
          "label": "外观配色",
          "type": "colors"
        },
        {
          "key": "chassisMaterial",
          "label": "外壳材质与工艺"
        },
        {
          "key": "kickstandType",
          "label": "支架开合阻尼"
        },
        {
          "key": "osAtLaunch",
          "label": "首发操作系统"
        }
      ]
    },
    {
      "id": "processor",
      "name": "处理器与 AI 算力",
      "fields": [
        {
          "key": "cpuModel",
          "label": "CPU 处理器型号"
        },
        {
          "key": "cpuArch",
          "label": "CPU 架构 / 制程"
        },
        {
          "key": "cpuCores",
          "label": "核心数与最高频率"
        },
        {
          "key": "gpuModel",
          "label": "显卡 / GPU 算力"
        },
        {
          "key": "npuModel",
          "label": "NPU 神经网络单元"
        },
        {
          "key": "npuTops",
          "label": "NPU 硬件算力 (TOPS)",
          "type": "npu_badge"
        },
        {
          "key": "copilotPlus",
          "label": "Copilot+ PC 认证",
          "type": "copilot_badge"
        }
      ]
    },
    {
      "id": "memory_storage",
      "name": "内存与存储",
      "fields": [
        {
          "key": "ramSpec",
          "label": "内存 RAM 规格"
        },
        {
          "key": "storageOptions",
          "label": "存储 SSD 容量选项"
        },
        {
          "key": "ssdRemovable",
          "label": "SSD 是否免工具快拆"
        },
        {
          "key": "expandableStorage",
          "label": "存储卡扩展支持"
        }
      ]
    },
    {
      "id": "display",
      "name": "显示屏 PixelSense",
      "fields": [
        {
          "key": "screenSize",
          "label": "屏幕对角线尺寸"
        },
        {
          "key": "aspectRatio",
          "label": "屏幕长宽比"
        },
        {
          "key": "panelTech",
          "label": "面板材质与类型"
        },
        {
          "key": "resolution",
          "label": "物理分辨率"
        },
        {
          "key": "ppi",
          "label": "像素密度 PPI"
        },
        {
          "key": "refreshRate",
          "label": "动态自适应刷新率"
        },
        {
          "key": "brightness",
          "label": "典型 / HDR 峰值亮度"
        },
        {
          "key": "colorSupport",
          "label": "色域与杜比视界"
        },
        {
          "key": "touchAndPenProtocol",
          "label": "触控点数与手写笔协议"
        }
      ]
    },
    {
      "id": "camera",
      "name": "摄像头与视讯",
      "fields": [
        {
          "key": "frontCamera",
          "label": "前置摄像头规格"
        },
        {
          "key": "windowsHello",
          "label": "Windows Hello 人脸识别"
        },
        {
          "key": "rearCamera",
          "label": "后置摄像头规格"
        },
        {
          "key": "videoFeatures",
          "label": "AI 取景与 Studio 特效"
        }
      ]
    },
    {
      "id": "audio",
      "name": "音频与麦克风",
      "fields": [
        {
          "key": "microphones",
          "label": "麦克风规格与拾音"
        },
        {
          "key": "speakers",
          "label": "扬声器系统与功率"
        },
        {
          "key": "audioTech",
          "label": "杜比音效支持"
        },
        {
          "key": "headphoneJack",
          "label": "3.5mm 耳机接口"
        }
      ]
    },
    {
      "id": "connectivity",
      "name": "连接与端口",
      "fields": [
        {
          "key": "usbPorts",
          "label": "USB-C / USB-A 端口"
        },
        {
          "key": "thunderboltSupport",
          "label": "雷电4 / USB4 支持"
        },
        {
          "key": "surfaceConnect",
          "label": "Surface Connect 磁吸口"
        },
        {
          "key": "wireless",
          "label": "Wi-Fi / 蓝牙规格"
        },
        {
          "key": "cellular",
          "label": "蜂窝网络 (5G / LTE)"
        }
      ]
    },
    {
      "id": "power",
      "name": "电池与电源管理",
      "fields": [
        {
          "key": "batteryCapacityWh",
          "label": "电池额定容量 (Wh)"
        },
        {
          "key": "batteryLifeOffice",
          "label": "日常办公综合续航"
        },
        {
          "key": "batteryLifeVideo",
          "label": "本地视频播放续航"
        },
        {
          "key": "chargingPower",
          "label": "原装充电器功率"
        },
        {
          "key": "fastCharging",
          "label": "快速充电支持"
        }
      ]
    },
    {
      "id": "input",
      "name": "输入设备与手写生态",
      "fields": [
        {
          "key": "compatibleKeyboard",
          "label": "适配键盘盖类型"
        },
        {
          "key": "penHapticFeedback",
          "label": "Slim Pen 2 触觉纸感震动"
        },
        {
          "key": "penChargingType",
          "label": "手写笔收纳与充电方式"
        },
        {
          "key": "trackpadType",
          "label": "触控板材质与反馈类型"
        }
      ]
    },
    {
      "id": "security",
      "name": "安全性与企业管理",
      "fields": [
        {
          "key": "tpmChip",
          "label": "安全芯片 (TPM / Pluton)"
        },
        {
          "key": "securedCorePc",
          "label": "Secured-core PC 认证"
        },
        {
          "key": "biometrics",
          "label": "生物识别登录方式"
        },
        {
          "key": "enterpriseManage",
          "label": "Autopilot / Intune 远程管理"
        }
      ]
    },
    {
      "id": "design",
      "name": "机身尺寸与重量",
      "fields": [
        {
          "key": "dimensionsMm",
          "label": "长 × 宽 × 厚 (mm)"
        },
        {
          "key": "weightGrams",
          "label": "裸机净重 (克)"
        },
        {
          "key": "totalWeightWithKeyboard",
          "label": "含适配键盘整机重量"
        },
        {
          "key": "thermalDesign",
          "label": "散热方案与风扇设计"
        }
      ]
    },
    {
      "id": "service",
      "name": "可维修性与售后",
      "fields": [
        {
          "key": "repairabilityScore",
          "label": "官方易维修性评级 (iFixit)"
        },
        {
          "key": "replaceableParts",
          "label": "官方可单独更换备件"
        },
        {
          "key": "warranty",
          "label": "整机有限质保政策"
        }
      ]
    },
    {
      "id": "metadata",
      "name": "资料与价格来源",
      "fields": [
        {
          "key": "startingPriceCny",
          "label": "国行首发指导价 (元)"
        },
        {
          "key": "sourceReliability",
          "label": "数据源核验等级"
        },
        {
          "key": "lastVerified",
          "label": "最后核验日期"
        },
        {
          "key": "officialDocUrl",
          "label": "官方规格说明书"
        }
      ]
    }
  ],
  "devices": [
    {
      "id": "pro-12-13-intel",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-new-pro-hero.png",
      "name": "Surface Pro 13 英寸 (第 12 代) 商用版 - Intel 版",
      "nameEn": "Surface Pro, 13-inch (12th Edition) for Business - Intel",
      "generation": "第 12 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "商用 AI PC 旗舰：搭载英特尔® 酷睿™ Ultra (第 3 代) 处理器，50 TOPS 端侧 AI 算力与防眩光 LCD/双层串联 OLED 屏幕",
      "prevGenerationId": "pro-10-biz",
      "specs": {
        "releaseDate": "2026 年 8 月",
        "generation": "第 12 代",
        "status": "current_cn",
        "targetAudience": "商业政企与高端职场精英",
        "tagline": "英特尔酷睿 Ultra 5/7 (第3代，50 TOPS)，防反射 LCD 与双层串联 OLED 屏幕可选，商务双色精工铝合金机身",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-13-platinum.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-13-black.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "英特尔® 酷睿™ Ultra 5 处理器 335（第 3 代） / Ultra 7 处理器 366H（第 3 代）",
        "cpuArch": "64 位 / Intel 18A",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® 图形处理器",
        "npuModel": "英特尔® AI Boost",
        "npuTops": "50 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 NVMe SSD",
        "ssdRemovable": "支持 (磁吸免工具快拆盖门)",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金生产力比例",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "1Hz ~ 120Hz 动态自适应刷新率",
        "brightness": "LCD SDR 最大 600 尼特 / HDR 峰值 600 尼特；OLED SDR 最大 600 尼特 / HDR 峰值 900 尼特",
        "colorSupport": "SDR：sRGB 和 Vivid；支持杜比视界 IQ",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "超广角 Quad HD 镜头 (1440p)",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素 Ultra HD 后置摄像头",
        "videoFeatures": "Windows Studio 效果 (背景虚化/眼眸校正/语音聚焦)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "双 2W 立体声扬声器，支持杜比全景声 (Dolby Atmos)",
        "audioTech": "Dolby Atmos® 认证",
        "headphoneJack": "not_applicable",
        "usbPorts": "2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞",
        "thunderboltSupport": "USB4® / Thunderbolt™ 4",
        "surfaceConnect": "配备经典磁吸 Surface Connect 口",
        "wireless": "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
        "cellular": "可选 5G（NanoSIM）",
        "batteryCapacityWh": "LCD 额定 47 Wh / OLED 额定 53 Wh（官方商用规格表）",
        "batteryLifeOffice": "网页浏览长达 11 小时（Wi-Fi）",
        "batteryLifeVideo": "本地视频播放长达 17 小时（Wi-Fi）",
        "chargingPower": "标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W",
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "compatibleKeyboard": "Surface Pro Flex 键盘 (蓝牙离机无线输入)",
        "penHapticFeedback": "完美支持 (仿真触觉纸感震动)",
        "penChargingType": "键盘折叠笔槽磁吸无线补电",
        "trackpadType": "触觉反馈精准触控板",
        "tpmChip": "Microsoft Pluton 安全处理器",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "支持 Microsoft Intune 与云端快速部署",
        "dimensionsMm": "287 × 209 × 9.3",
        "weightGrams": "895g（Wi-Fi）/ 906g（Wi-Fi + 5G）",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "超薄均热板双循环无啸叫微风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "可拆卸 SSD、屏幕模块、电池、主板接口模块",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥16,888 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-configurate#bundletype=10&main=MIC4136&required=MIC3881"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-12th-edition-intel-features",
      "nextGenerationId": null,
      "segment": "commercial"
    },
    {
      "id": "pro-12-13-snap",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-new-pro-hero.png",
      "name": "Surface Pro 13 英寸 (第 12 代) 商用版 - 骁龙版",
      "nameEn": "Surface Pro, 13-inch (12th Edition) for Business - Snapdragon",
      "generation": "第 12 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "商用 ARM AI PC 巅峰：搭载高通骁龙 X2 (Snapdragon® X2 Elite 处理器)，80 TOPS 巅峰 AI 算力与双层串联 OLED 屏幕",
      "prevGenerationId": "pro-10-biz",
      "specs": {
        "releaseDate": "2026 年 8 月",
        "generation": "第 12 代",
        "status": "current_cn",
        "targetAudience": "商业政企与前沿移动办公",
        "tagline": "高通全新 Oryon™ V2 架构与 80 TOPS Hexagon NPU，双层串联 OLED 屏幕与全天候超长续航",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-13-platinum.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-13-black.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 专业版 (ARM64)",
        "cpuModel": "高通骁龙® X2 Plus（10 核） / X2 Elite（12 核）",
        "cpuArch": "第 3 代 Qualcomm Oryon™（ARM64）",
        "cpuCores": "10 核 / 12 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™",
        "npuTops": "80 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 NVMe SSD",
        "ssdRemovable": "支持 (磁吸免工具快拆盖门)",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金生产力比例",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "1Hz ~ 120Hz 动态自适应刷新率",
        "brightness": "LCD SDR 最大 600 尼特 / HDR 峰值 600 尼特；OLED SDR 最大 600 尼特 / HDR 峰值 900 尼特",
        "colorSupport": "SDR：sRGB 和 Vivid；支持杜比视界 IQ",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "超广角 Quad HD 镜头 (1440p)",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素 Ultra HD 后置摄像头",
        "videoFeatures": "Windows Studio 效果 (背景虚化/眼眸校正/语音聚焦)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "双 2W 立体声扬声器，支持杜比全景声 (Dolby Atmos)",
        "audioTech": "Dolby Atmos® 认证",
        "headphoneJack": "not_applicable",
        "usbPorts": "2 × USB-C® / USB4®：充电、数据、DisplayPort 1.4a（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞",
        "thunderboltSupport": "USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）",
        "surfaceConnect": "配备经典磁吸 Surface Connect 口",
        "wireless": "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
        "cellular": "not_disclosed",
        "batteryCapacityWh": "LCD 额定 53 Wh / OLED 额定 47 Wh（官方商用规格表）",
        "batteryLifeOffice": "网页浏览长达 11.5 小时",
        "batteryLifeVideo": "本地视频播放长达 15.5 小时",
        "chargingPower": "标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W",
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "compatibleKeyboard": "Surface Pro Flex 键盘 (蓝牙离机无线输入)",
        "penHapticFeedback": "完美支持 (仿真触觉纸感震动)",
        "penChargingType": "键盘折叠笔槽磁吸无线补电",
        "trackpadType": "触觉反馈精准触控板",
        "tpmChip": "Microsoft Pluton 安全处理器",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "支持 Microsoft Intune 与云端快速部署",
        "dimensionsMm": "287 × 209 × 9.3",
        "weightGrams": "895g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "超薄均热板双循环无啸叫微风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "可拆卸 SSD、屏幕模块、电池、主板接口模块",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥15,488 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon-configurate#bundletype=10&main=MIC4160&required=MIC3881"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-12th-edition-intel-features",
      "nextGenerationId": null,
      "segment": "commercial"
    },
    {
      "id": "pro-12-13",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-new-pro-hero.png",
      "name": "Surface Pro 13 英寸 (第 12 代)",
      "nameEn": "Surface Pro, 13-inch (12th Edition)",
      "generation": "第 12 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "consumer",
      "flagship": true,
      "tagline": "80 TOPS 旗舰级下一代二合一 AI PC，双层串联 OLED 触控屏",
      "prevGenerationId": "pro-11-13",
      "nextGenerationId": null,
      "specs": {
        "releaseDate": "2026 年 8 月",
        "generation": "第 12 代",
        "status": "current_cn",
        "targetAudience": "面向高端个人创作者与数码先锋",
        "tagline": "搭载高通骁龙® X2 Plus（10 核）或 X2 Elite（12 核），可选 OLED，80 TOPS NPU",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-13-platinum.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-13-black.png"
          },
          {
            "name": "沙漫金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-pro-13-dune.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "高通骁龙® X2 Plus（10 核） / X2 Elite（12 核）",
        "cpuArch": "第 3 代 Qualcomm Oryon™（ARM64）",
        "cpuCores": "10 核 / 12 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™",
        "npuTops": "80 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB",
        "ssdRemovable": "支持 (磁吸免工具快拆盖门)",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金生产力比例",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "1Hz ~ 120Hz 动态自适应刷新率",
        "brightness": "LCD SDR 最大 600 尼特 / HDR 峰值 600 尼特；OLED SDR 最大 600 尼特 / HDR 峰值 900 尼特",
        "colorSupport": "SDR：sRGB 和 Vivid；支持杜比视界 IQ",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "超广角 Quad HD 镜头 (1440p)",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素 Ultra HD 后置摄像头",
        "videoFeatures": "Windows Studio 效果 (背景虚化/眼眸校正/语音聚焦)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "双 2W 立体声扬声器，支持杜比全景声 (Dolby Atmos)",
        "audioTech": "Dolby Atmos® 认证",
        "headphoneJack": "not_applicable",
        "usbPorts": "2 × USB-C® / USB4®：充电、数据、DisplayPort 1.4a（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞",
        "thunderboltSupport": "USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）",
        "surfaceConnect": "配备经典磁吸 Surface Connect 口",
        "wireless": "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
        "cellular": "可选 5G（NanoSIM 与 eSIM）",
        "batteryCapacityWh": "LCD 额定 53 Wh / OLED 额定 47 Wh（官方商用规格表）",
        "batteryLifeOffice": "网页浏览长达 11.5 小时",
        "batteryLifeVideo": "本地视频播放长达 15.5 小时",
        "chargingPower": "标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W",
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "compatibleKeyboard": "Surface Pro Flex 键盘 (蓝牙离机无线输入)",
        "penHapticFeedback": "完美支持 (仿真触觉纸感震动)",
        "penChargingType": "键盘折叠笔槽磁吸无线补电",
        "trackpadType": "触觉反馈精准触控板",
        "tpmChip": "Microsoft Pluton 安全处理器",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "支持家庭与企业集中管理",
        "dimensionsMm": "287 × 209 × 9.3",
        "weightGrams": "895g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "超薄均热板双循环无啸叫微风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "可拆卸 SSD、屏幕模块、电池、主板接口模块",
        "warranty": "2 年有限硬件质保",
        "startingPriceCny": "¥12,888 起 (消费版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/configure/surface-pro-13-inch-12th-edition",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/configure/surface-pro-13-inch-12th-edition"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-12th-edition-intel-features",
      "segment": "consumer"
    },
    {
      "id": "pro-12-inch",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-12-platinum.png",
      "name": "Surface Pro, 12 英寸 (第 1 代)",
      "nameEn": "Surface Pro, 12-inch (1st Edition)",
      "generation": "第 1 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "12 英寸便携羽量级 Copilot+ PC，高通骁龙 X Plus 8 核",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "specs": {
        "fastCharging": "推荐快充 45W",
        "thunderboltSupport": "not_applicable",
        "windowsHello": "Windows Hello 面部识别",
        "releaseDate": "2026 年",
        "generation": "第 1 代",
        "status": "current_cn",
        "targetAudience": "面向个人移动创作与轻薄便携群体",
        "tagline": "机身轻至 686 克，全天候长效续航与 Wi-Fi 7",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-12-platinum.png"
          },
          {
            "name": "罗兰紫",
            "hex": "#876d97",
            "image": "./assets/products/surface-pro-12-violet.png"
          },
          {
            "name": "碧海青",
            "hex": "#3a7f8d",
            "image": "./assets/products/surface-pro-12-ocean.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "高通骁龙 X Plus (8 核心 X1P-42-100)",
        "cpuArch": "Qualcomm Oryon™ 64 位",
        "cpuCores": "8 核",
        "gpuModel": "Qualcomm Adreno™ GPU",
        "npuModel": "Qualcomm Hexagon™ NPU",
        "npuTops": "45 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "8GB / 16GB LPDDR5x (16GB 完整解锁 Copilot+ PC 体验)",
        "storageOptions": "256GB / 512GB (高速闪存)",
        "ssdRemovable": "not_applicable",
        "expandableStorage": "not_applicable",
        "screenSize": "12.0 英寸 PixelSense™ 触控屏",
        "aspectRatio": "3:2 黄金生产力比例",
        "panelTech": "LCD",
        "resolution": "2196 × 1464",
        "ppi": "220 PPI",
        "refreshRate": "最高 90Hz (默认 60Hz 动态切换)",
        "brightness": "典型 400 nits",
        "colorGamut": "sRGB 和增强型，对比度 1200:1",
        "displayProtection": "康宁大猩猩防护玻璃",
        "penSupport": "支持 Surface 超薄触控笔 (带触觉反馈)",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "touchSupport": "10 点多点触控",
        "audioTech": "Dolby Atmos®",
        "rearCamera": "1000 万像素超高清摄像头",
        "frontCamera": "前置 1080p 全高清 Surface Studio 摄像头",
        "studioEffects": "支持 Windows Studio 特效 (自动取景、背景虚化、声音对焦)",
        "speakers": "2W 立体声扬声器，支持杜比全景声 (Dolby Atmos®)",
        "mics": "双 Studio Mics，支持语音聚焦",
        "usbC": "2 × USB-C® / USB 3.2：充电、数据、DisplayPort 1.4a（最多两台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞",
        "usbA": "not_applicable",
        "audioJack": "not_applicable",
        "surfaceConnect": "not_applicable",
        "sdSlot": "not_applicable",
        "simSlot": "可选 5G NanoSIM / eSIM",
        "wifi": "Wi-Fi 7 (802.11be 高速无线网络)",
        "bluetooth": "蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryWh": "38 Wh（额定；最小 37 Wh）",
        "batteryLifeLocalVideo": "最长 16 小时本地视频播放",
        "batteryLifeWeb": "最长 12 小时常规网页使用",
        "chargingSpeed": "最低充电 27W USB-C；选配/标配 45W USB-C（型号 2105）",
        "keyboardCompatibility": "适配 12 英寸特制键盘盖 (提供碧海青、板岩灰、罗兰紫三色，含独立 Copilot 按键)",
        "penChargingType": "键盘磁吸无线充电笔槽",
        "trackpadType": "大尺寸高精度触控板",
        "tpmChip": "Microsoft Pluton 安全处理器，固件 TPM 2.0",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别免密登录",
        "enterpriseManage": "支持 Microsoft Intune 远程企业部署与资产管理",
        "dimensionsMm": "274 × 190 × 7.8",
        "weightGrams": "686 克 (超轻量羽量级设计)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "超薄均热板无风扇静音被动散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "屏幕总成、电池模块、接口盖板",
        "warranty": "2 年有限硬件质保",
        "startingPriceCny": "¥6,788 起 (消费版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/configure/surface-pro-12-inch",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/configure/surface-pro-12-inch"
      },
      "isCommercial": false,
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-copilot-plus-pc-12inch-tech-specs",
      "segment": "consumer"
    },
    {
      "id": "pro-11-13",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-new-pro-hero.png",
      "name": "Surface Pro (第 11 代)",
      "nameEn": "Surface Pro (11th Edition)",
      "generation": "第 11 代 (2024)",
      "year": 2024,
      "status": "discontinued",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "首款 Copilot+ PC 二合一，高通骁龙 X 架构",
      "prevGenerationId": "pro-9",
      "nextGenerationId": "pro-12-13",
      "specs": {
        "releaseDate": "2024 年 5 月",
        "generation": "第 11 代",
        "status": "discontinued",
        "targetAudience": "主流消费者与移动办公群体",
        "tagline": "高通 Snapdragon X 平台开山之作，长效续航与 OLED 选项",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-13-platinum.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-13-black.png"
          },
          {
            "name": "宝石蓝",
            "hex": "#2f4f7f",
            "image": "./assets/products/surface-pro-13-sapphire.png"
          },
          {
            "name": "砂岩金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-pro-13-dune.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 家庭版 / 专业版 (ARM64)",
        "cpuModel": "Snapdragon® X Plus（10 核，X1P64100） / Snapdragon® X Elite（12 核，X1E80100）",
        "cpuArch": "Qualcomm Oryon™ 64 位",
        "cpuCores": "not_disclosed",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™",
        "npuTops": "45 TOPS",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB / 32GB LPDDR5x (8448 MT/s)",
        "storageOptions": "256GB / 512GB / 1TB PCIe Gen 4",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "最高 120Hz 动态自适应刷新",
        "brightness": "典型 600 nits / HDR 峰值 900 nits",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "超广角四倍高清前置摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素超高清后摄",
        "videoFeatures": "Windows Studio 特效 (自动取景/眼眸接触)",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "not_applicable",
        "usbPorts": "2 × USB-C (USB4)",
        "thunderboltSupport": "USB4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 7 + 蓝牙 5.4",
        "cellular": "可选 5G 版",
        "batteryCapacityWh": "LCD 47 Wh / OLED 53 Wh",
        "batteryLifeOffice": "网页浏览最长 10 小时",
        "batteryLifeVideo": "本地视频播放约 14 小时",
        "chargingPower": "最低充电 39W；标配 39W（型号 1963）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "Surface Pro Flex 键盘 / 特制专业键盘盖",
        "penHapticFeedback": "原生支持触觉震动",
        "penChargingType": "键盘磁吸笔槽无线充电",
        "trackpadType": "触觉触控板 (Flex 键盘)",
        "tpmChip": "Microsoft Pluton",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "支持商业集中部署",
        "dimensionsMm": "287 × 209 × 9.3",
        "weightGrams": "895g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "单风扇主动风冷轻音系统",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、电池、屏幕、主板各接口组件",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-pro-11th-edition",
        "officialConfigureUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-snapdragon-tech-specs"
      },
      "isCommercial": false,
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-snapdragon-tech-specs",
      "segment": "consumer"
    },
    {
      "id": "pro-10-biz",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-10-biz-hero.png",
      "name": "Surface Pro 10 商用版",
      "nameEn": "Surface Pro 10 for Business",
      "generation": "第 10 代商用 (2024)",
      "year": 2024,
      "status": "discontinued",
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "Intel Core Ultra 架构商用先锋，专用 NFC 登录",
      "prevGenerationId": "pro-9",
      "specs": {
        "releaseDate": "2024 年 3 月",
        "generation": "第 10 代 (商用专属)",
        "status": "discontinued",
        "targetAudience": "企业客户、IT 部门与商业专业人士",
        "tagline": "专为商业企业打造，搭载 Intel Core Ultra 与反射抑制屏",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-10-biz-hero.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-13-black.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "Intel® Core™ Ultra 5 135U / Ultra 7 165U",
        "cpuArch": "64 位 / Intel 4",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® 显卡",
        "npuModel": "英特尔® AI Boost",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB PCIe Gen 4",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "最高 120Hz",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "1440p 超宽角四倍高清前置摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素 Ultra HD 后置摄像头",
        "videoFeatures": "Windows Studio 效果",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "2W 立体声扬声器，支持 Dolby® Atmos®",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "not_applicable",
        "usbPorts": "2 × 雷电 4 (USB-C 端口)",
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6E + 蓝牙 5.3",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "最长 19 小时典型使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 39W；标配 39W（型号 1963）",
        "fastCharging": "推荐快充 45W",
        "compatibleKeyboard": "Surface Pro 特制版专业键盘盖 (带 Copilot 键)",
        "penHapticFeedback": "支持触觉震动",
        "penChargingType": "笔槽无线充电",
        "trackpadType": "传统机械精准触控板",
        "tpmChip": "硬件级 TPM 2.0",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别 + 智能卡/NFC",
        "enterpriseManage": "企业级 vPro 管理与设备固件更新",
        "dimensionsMm": "287 × 208.6 × 9.3",
        "weightGrams": "879g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动低噪静音风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、主板、支架、屏幕、电池、支架铰链",
        "warranty": "2 年有限硬件保修",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-pro-10-for-business"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-pro-10-for-business-features",
      "segment": "commercial"
    },
    {
      "id": "pro-9",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-9-hero.png",
      "name": "Surface Pro 9",
      "nameEn": "Surface Pro 9",
      "generation": "第 9 代 (2022)",
      "year": 2022,
      "status": "discontinued",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "首次合并 ARM 与 x86 双平台，宝石蓝与森野绿新色",
      "prevGenerationId": "pro-8",
      "nextGenerationId": "pro-11-13",
      "specs": {
        "releaseDate": "2022 年 10 月",
        "generation": "第 9 代",
        "status": "discontinued",
        "targetAudience": "个人消费者与商业办公",
        "tagline": "12 代酷睿与 SQ3 5G 双重选择，120Hz 高刷屏",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-13-platinum.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-13-black.png"
          },
          {
            "name": "宝石蓝",
            "hex": "#2f4f7f",
            "image": "./assets/products/surface-pro-13-sapphire.png"
          },
          {
            "name": "森野绿",
            "hex": "#3b5323",
            "image": "./assets/products/surface-pro-9-forest.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "Intel 12代酷睿 i5-1235U / i7-1255U 或 微软 SQ® 3",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® Iris® Xe 或 Microsoft SQ® 3 Adreno™",
        "npuModel": "not_disclosed",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB / 32GB LPDDR5",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "动态 60Hz ~ 120Hz",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "1080p 全高清 Windows Hello 镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素 4K 视频录制",
        "videoFeatures": "Windows Studio 特效 (仅 SQ3 5G版支持)",
        "microphones": "not_disclosed",
        "speakers": "2W 双扬声器，杜比全景声",
        "audioTech": "not_disclosed",
        "headphoneJack": "not_applicable",
        "usbPorts": "Intel版: 2 × 雷电4 / 5G版: 2 × USB-C 3.2",
        "thunderboltSupport": "not_disclosed",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6E + 蓝牙 5.1",
        "cellular": "可选 5G（NanoSIM）",
        "batteryCapacityWh": "47.7 Wh",
        "batteryLifeOffice": "Intel版约 15.5 小时 / 5G版约 19 小时",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "Wi-Fi 版最低/标配 60W（型号 1706）；5G 版最低充电 39W、标配 39W（型号 1963）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "Surface Pro 特制专业键盘盖",
        "penHapticFeedback": "支持",
        "penChargingType": "磁吸笔槽无线充电",
        "trackpadType": "机械触控板",
        "tpmChip": "固件 TPM 2.0 / 商业版配备硬件 TPM",
        "securedCorePc": "支持",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持 Intune",
        "dimensionsMm": "287 × 209 × 9.3",
        "weightGrams": "879g (Intel) / 883g (5G版)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "Intel版主动风扇 / 5G版无风扇静音",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、电池、屏幕",
        "warranty": "2 年有限硬件质保",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-pro-9"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-9-features-and-specs",
      "segment": "consumer"
    },
    {
      "id": "pro-8",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-8-hero.png",
      "name": "Surface Pro 8",
      "nameEn": "Surface Pro 8",
      "generation": "第 8 代 (2021)",
      "year": 2021,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "模具全面革新，窄边框 13 英寸 120Hz 高刷首发",
      "prevGenerationId": "pro-7-plus",
      "nextGenerationId": "pro-9",
      "specs": {
        "releaseDate": "2021 年 9 月",
        "generation": "第 8 代",
        "status": "legacy",
        "targetAudience": "通用办公与创作者",
        "tagline": "雷电4接口升级，Slim Pen 2 触觉马达震撼降临",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-8-hero.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-8-hero.png"
          }
        ],
        "chassisMaterial": "签名氧化铝",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "Intel 第 11 代酷睿 i5-1135G7 / i7-1185G7",
        "cpuArch": "64 位 / 10 nm SuperFin",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® Iris® Xe Graphics",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB / 32GB LPDDR4x",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "最高 120Hz",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "500 万像素 1080p 镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素自动对焦后摄",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "2W 立体声扬声器，杜比全景声",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × 雷电 4 (USB-C)",
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 + 蓝牙 5.1",
        "cellular": "可选 LTE Advanced",
        "batteryCapacityWh": "51.5 Wh",
        "batteryLifeOffice": "长达 16 小时典型使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "Surface Pro 特制键盘盖 (首次采用隐藏式笔槽)",
        "penHapticFeedback": "支持",
        "penChargingType": "笔槽磁吸无线充",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "部分机型支持",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持",
        "dimensionsMm": "287 × 208 × 9.3",
        "weightGrams": "891g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动风扇冷却",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 模块",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-pro-8-%E7%89%B9%E6%80%A7-3310034a-953e-4680-a75d-35aa7d53b9a0"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-8-features-and-specs",
      "segment": "consumer"
    },
    {
      "id": "pro-7-plus",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-7-plus-hero.png",
      "name": "Surface Pro 7+",
      "nameEn": "Surface Pro 7+ for Business",
      "generation": "第 7+ 代 (2021)",
      "year": 2021,
      "status": "legacy",
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "可拆卸固态硬盘与 11 代酷睿，商用经典长青机",
      "prevGenerationId": "pro-7",
      "nextGenerationId": "pro-8",
      "specs": {
        "releaseDate": "2021 年 1 月",
        "generation": "第 7+ 代",
        "status": "legacy",
        "targetAudience": "商业与教育市场",
        "tagline": "经典 12.3 英寸模具最终绝唱，大电池与可拆卸 SSD",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-7-plus-hero.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-7-plus-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel 11代酷睿 i3-1115G4 / i5-1135G7 / i7-1165G7",
        "cpuArch": "64 位 / 10 nm SuperFin",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics (i3) / Intel® Iris® Xe Graphics (i5)",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB / 32GB LPDDR4x",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "支持可移动固态硬盘",
        "expandableStorage": "not_disclosed",
        "screenSize": "12.3 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2736 × 1824",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C 3.1 + 1 × USB-A 3.0",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 + 蓝牙 5.0",
        "cellular": "not_disclosed",
        "batteryCapacityWh": "47.4 Wh",
        "batteryLifeOffice": "长达 15 小时典型使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "经典 Surface Pro 专业键盘盖",
        "penHapticFeedback": "不支持 (无震动马达)",
        "penChargingType": "AAAA 电池供电 (侧边磁吸)",
        "trackpadType": "传统机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "支持",
        "biometrics": "人脸识别",
        "enterpriseManage": "商业版 Intune 与 Autopilot",
        "dimensionsMm": "292 × 201 × 8.5",
        "weightGrams": "770g (i5)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "i3/i5 无风扇静音，i7 主动风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 固态硬盘",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-7-features-and-specs"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-7-features-and-specs",
      "segment": "commercial"
    },
    {
      "id": "pro-7",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-7-hero.png",
      "name": "Surface Pro 7",
      "nameEn": "Surface Pro 7",
      "generation": "第 7 代 (2019)",
      "year": 2019,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "终结 Mini DisplayPort，迎来首个 Type-C 时代",
      "prevGenerationId": "pro-6",
      "nextGenerationId": "pro-7-plus",
      "specs": {
        "releaseDate": "2019 年 10 月",
        "generation": "第 7 代",
        "status": "legacy",
        "targetAudience": "通用消费者与移动办公",
        "tagline": "第 10 代 Intel 酷睿处理器，首次加入 USB-C",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-7-hero.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-7-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 10 家庭版",
        "cpuModel": "Intel 10代酷睿 i3-1005G1 / i5-1035G4 / i7-1065G7",
        "cpuArch": "64 位 / 10 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics / Intel® Iris™ Plus Graphics",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB / 16GB LPDDR4x",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "12.3 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2736 × 1824",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "1.6W 杜比扬声器",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C 3.1 + 1 × USB-A 3.0",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 + 蓝牙 5.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "长达 10.5 小时日常使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "经典专业键盘盖",
        "penHapticFeedback": "不支持",
        "penChargingType": "磁吸附侧边 (AAAA 电池)",
        "trackpadType": "机械触控板",
        "tpmChip": "固件 TPM",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "基础管理",
        "dimensionsMm": "292 × 201 × 8.5",
        "weightGrams": "775g (i3/i5) / 790g (i7)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "i3/i5 无风扇，i7 风扇主动散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-pro-7-%E7%89%B9%E6%80%A7-82547b74-4b47-4977-8495-2a1e8093d562"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-pro-7-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "pro-6",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-6-hero.png",
      "name": "Surface Pro 6",
      "nameEn": "Surface Pro 6",
      "generation": "第 6 代 (2018)",
      "year": 2018,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "四核性能翻倍飞跃，一抹惊艳哑光典黑",
      "prevGenerationId": "pro-5",
      "nextGenerationId": "pro-7",
      "specs": {
        "releaseDate": "2018 年 10 月",
        "generation": "第 6 代",
        "status": "legacy",
        "targetAudience": "商务人士与创作者",
        "tagline": "第 8 代酷睿四核处理器，经典典黑配色回归",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-6-hero.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-6-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 10 家庭版",
        "cpuModel": "Intel 第 8 代酷睿 i5-8250U / i7-8650U",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics 620",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB LPDDR3",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "12.3 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2736 × 1824",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素自动对焦",
        "videoFeatures": "not_disclosed",
        "microphones": "双麦克风",
        "speakers": "1.6W 立体声扬声器",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB 3.0 + 1 × Mini DisplayPort",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 (ac) + 蓝牙 4.1",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "视频播放达 13.5 小时",
        "chargingPower": "最低充电 39W；标配 39W（型号 1800）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "Alcantara 欧缔兰特制专业键盘盖",
        "penHapticFeedback": "不支持",
        "penChargingType": "磁吸机身侧面 (AAAA 电池)",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "基础管理",
        "dimensionsMm": "292 × 201 × 8.5",
        "weightGrams": "770g (i5) / 784g (i7)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "i5 无风扇静音，i7 混合双风道",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-pro-6-%E7%89%B9%E6%80%A7-336c1e57-a363-4416-a197-0f8c37d40362"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-6-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "pro-5",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-5-hero.png",
      "name": "Surface Pro (第 5 代 / 2017)",
      "nameEn": "Surface Pro (5th Gen)",
      "generation": "第 5 代 (2017)",
      "year": 2017,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "165° 创作者 Studio 倾斜铰链，LTE 随身连接",
      "prevGenerationId": "pro-4",
      "nextGenerationId": "pro-6",
      "specs": {
        "releaseDate": "2017 年 5 月",
        "generation": "第 5 代",
        "status": "legacy",
        "targetAudience": "创意工作者与商务差旅",
        "tagline": "去除数字命名，采用定制 165° 铰链与倾斜压感笔",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-5-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel 第 7 代酷睿 m3-7Y30 / i5-7300U / i7-7660U",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® HD Graphics 615 / HD Graphics 620 / Iris™ Plus Graphics 640",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB / 16GB LPDDR3",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "12.3 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2736 × 1824",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_disclosed",
        "microphones": "双麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × 全尺寸 USB 3.0 + 1 × Mini DisplayPort",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 + 蓝牙 4.1",
        "cellular": "not_disclosed",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "Wi-Fi 版最长 13.5 小时本地视频 / 4G 版最长 12.5 小时本地视频",
        "chargingPower": "最低充电 39W；标配 39W（型号 1800）；M3 标配 24W（型号 1735）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "Surface Pro 签名版 Alcantara 键盘盖",
        "penHapticFeedback": "不支持",
        "penChargingType": "侧边磁吸 (AAAA 电池)",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "基础企业管理",
        "dimensionsMm": "292 × 201 × 8.5",
        "weightGrams": "768g (m3) / 770g (i5) / 784g (i7) / 812g (i5 4G)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "m3 与 i5 全面无风扇零静音",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_support",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-pro-5th-gen-%E7%89%B9%E6%80%A7-42d321e4-52d3-d059-4705-59540a43fa7b"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-5th-gen-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "pro-4",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-4-hero.png",
      "name": "Surface Pro 4",
      "nameEn": "Surface Pro 4",
      "generation": "第 4 代 (2015)",
      "year": 2015,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "12.3 英寸 267 PPI 视网膜黄金屏里程碑",
      "prevGenerationId": "pro-3",
      "nextGenerationId": "pro-5",
      "specs": {
        "releaseDate": "2015 年 10 月",
        "generation": "第 4 代",
        "status": "legacy",
        "targetAudience": "办公与专业人群",
        "tagline": "边框收窄机身减薄至 8.4mm，配备橡皮擦手写笔",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-4-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "150° 支架",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel 第 6 代 Skylake 酷睿 m3 / i5-6300U / i7-6650U",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® HD Graphics 515 / HD Graphics 520 / Iris™ Graphics",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB / 16GB",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "12.3 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2736 × 1824",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_disclosed",
        "microphones": "立体麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB 3.0 + 1 × Mini DisplayPort",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 (ac) + 蓝牙 4.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "最长 9 小时本地视频播放",
        "chargingPower": "最低充电 31W；标配 31W（型号 1625）；Core M 最低/标配 24W（型号 1735）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "扩大玻璃触控板的 Pro 4 专业键盘盖",
        "penHapticFeedback": "不支持",
        "penChargingType": "侧边强磁吸附 (AAAA 电池)",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "支持",
        "dimensionsMm": "292.1 × 201.4 × 8.45",
        "weightGrams": "766g (m3) / 786g (i5/i7)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "混合冷却系统",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_support",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-pro-4-%E7%89%B9%E6%80%A7-e3a8ac71-42ec-70e6-8c9a-b684531644ec"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-4-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "pro-3",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-3-hero.png",
      "name": "Surface Pro 3",
      "nameEn": "Surface Pro 3",
      "generation": "第 3 代 (2014)",
      "year": 2014,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "3:2 生产力长宽比奠基者，无级连续阻尼铰链诞生",
      "prevGenerationId": "pro-2",
      "nextGenerationId": "pro-4",
      "specs": {
        "releaseDate": "2014 年 5 月",
        "generation": "第 3 代",
        "status": "legacy",
        "targetAudience": "移动生产力人群",
        "tagline": "“可替代笔记本电脑的平板”，12 英寸革命与 N-Trig 触控笔",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-3-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel 第 4 代 Haswell 酷睿 i3 / i5-4300U / i7-4650U",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB LPDDR3",
        "storageOptions": "64GB / 128GB / 256GB / 512GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSD 读卡器",
        "screenSize": "12.0 英寸 ClearType 黄金比例全高清屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2160 × 1440",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "not_disclosed",
        "windowsHello": "not_applicable",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_applicable",
        "microphones": "立体麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × 全尺寸 USB 3.0 + 1 × Mini DisplayPort",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_disclosed",
        "wireless": "Wi-Fi 5 + 蓝牙 4.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "长达 9 小时网页浏览",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 31W；标配 31W（型号 1625）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "Surface Pro 3 专业键盘盖 (双折叠磁吸条)",
        "penHapticFeedback": "不支持",
        "penChargingType": "布环笔套固定 (AAAA 电池)",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "指纹 (选配指纹键盘盖)",
        "enterpriseManage": "基础企业管理",
        "dimensionsMm": "292 × 201.3 × 9.1",
        "weightGrams": "800g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动单风扇环流散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_support",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-3-specs-and-features"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-3-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "pro-2",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-2-hero.png",
      "name": "Surface Pro 2",
      "nameEn": "Surface Pro 2",
      "generation": "第 2 代 (2013)",
      "year": 2013,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "Haswell 架构续航暴增，两段式双角度开合支架",
      "prevGenerationId": "pro-1",
      "nextGenerationId": "pro-3",
      "specs": {
        "releaseDate": "2013 年 9 月",
        "generation": "第 2 代",
        "status": "legacy",
        "targetAudience": "商务人士",
        "tagline": "告别前代续航短板，配备 Wacom 1024 级无源手写笔",
        "colors": [
          {
            "name": "暗钛灰",
            "hex": "#333333",
            "image": "./assets/products/surface-pro-2-hero.png"
          }
        ],
        "chassisMaterial": "VaporMg",
        "kickstandType": "双角度支架",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel 第 4 代酷睿 i5",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® HD Graphics 4400",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB LPDDR3",
        "storageOptions": "64GB / 128GB / 256GB / 512GB",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "10.6 英寸 ClearType Full HD",
        "aspectRatio": "16:9",
        "panelTech": "not_disclosed",
        "resolution": "1920 × 1080",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "not_applicable",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_applicable",
        "microphones": "麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby®",
        "headphoneJack": "配备耳机插孔",
        "usbPorts": "1 × 全尺寸 USB 3.0 + 1 × Mini DisplayPort",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_disclosed",
        "wireless": "Wi-Fi 802.11a/b/g/n + 蓝牙 4.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 48W；标配型号 1536",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "Touch Cover 2 / Type Cover 2",
        "penHapticFeedback": "不支持",
        "penChargingType": "无需充电 (无源电磁)",
        "trackpadType": "压力传感触控板",
        "tpmChip": "TPM 1.2",
        "securedCorePc": "否",
        "biometrics": "not_applicable",
        "enterpriseManage": "基础管理",
        "dimensionsMm": "274.6 × 173 × 13.5",
        "weightGrams": "907g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "双风扇潜艇周边风道散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_support",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-2-specs-and-features"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-2-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "pro-1",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-1-hero.png",
      "name": "Surface Pro 初代 (Original)",
      "nameEn": "Surface Pro (Original)",
      "generation": "初代 (2013)",
      "year": 2013,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "微软 PC 硬件创世纪，首台全功能 Windows 8 Pro 平板",
      "nextGenerationId": "pro-2",
      "specs": {
        "releaseDate": "2013 年 2 月",
        "generation": "初代 (2013)",
        "status": "legacy",
        "targetAudience": "科技尝鲜者与先锋办公人群",
        "tagline": "彻底颠覆平板认知，在轻薄镁合金机身内塞入完整 PC 硬件",
        "colors": [
          {
            "name": "暗钛灰",
            "hex": "#333333",
            "image": "./assets/products/surface-pro-1-hero.png"
          }
        ],
        "chassisMaterial": "蒸汽Mg",
        "kickstandType": "集成支架",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel 第 3 代酷睿 i5",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB",
        "storageOptions": "64GB / 128GB",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 卡槽",
        "screenSize": "10.6 英寸 ClearType 广视角显示屏",
        "aspectRatio": "16:9",
        "panelTech": "not_disclosed",
        "resolution": "1920 × 1080",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "not_applicable",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_applicable",
        "microphones": "麦克风",
        "speakers": "not_disclosed",
        "audioTech": "not_disclosed",
        "headphoneJack": "配备耳机插孔",
        "usbPorts": "1 × 全尺寸 USB 3.0 + 1 × Mini DisplayPort",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_disclosed",
        "wireless": "Wi-Fi 802.11a/b/g/n + 蓝牙 4.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "42 Wh",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 48W；标配型号 1536",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "初代触控键盘 Touch Cover / 实体键盘 Type Cover",
        "penHapticFeedback": "不支持",
        "penChargingType": "无需充电 (无源电磁)",
        "trackpadType": "压力传感触控板",
        "tpmChip": "TPM 1.2",
        "securedCorePc": "否",
        "biometrics": "not_applicable",
        "enterpriseManage": "基础管理",
        "dimensionsMm": "275 × 173 × 13.46",
        "weightGrams": "不足 2 磅（官方未给出克重）",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "双风扇四周开槽隐蔽风道",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_support",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-1st-gen-specifications"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-1st-gen-specifications",
      "segment": "consumer"
    },
    {
      "id": "pro-x",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-x-hero.png",
      "name": "Surface Pro X",
      "nameEn": "Surface Pro X",
      "generation": "Pro X 世代 (2019/2020)",
      "year": 2019,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "极窄边框 7.3mm 超薄 ARM 架构探索者，首创隐藏笔槽",
      "nextGenerationId": "pro-9",
      "specs": {
        "releaseDate": "2019 年 10 月 (2020 更新 SQ2)",
        "generation": "Pro X 世代",
        "status": "legacy",
        "targetAudience": "移动常青商务与科技先驱",
        "tagline": "7.3mm 极窄边框先驱，微软携手高通定制 SQ1/SQ2 芯片",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-x-hero.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-x-hero.png"
          }
        ],
        "chassisMaterial": "氧化铝",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Microsoft SQ® 1 / SQ® 2",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "Microsoft SQ® Adreno™ 685 / 690",
        "npuModel": "not_disclosed",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB LPDDR4x",
        "storageOptions": "128GB / 256GB / 512GB 可拆卸 NVMe SSD",
        "ssdRemovable": "支持可移动固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "AI 人眼视线自动校正",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "not_applicable",
        "usbPorts": "2 × USB-C 3.2 Gen 2",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 + 蓝牙 5.0",
        "cellular": "not_disclosed",
        "batteryCapacityWh": "39.2 Wh",
        "batteryLifeOffice": "长达 15 小时全天续航",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "Surface Pro X 特制签名版键盘盖",
        "penHapticFeedback": "初代 Slim Pen (无震动马达)",
        "penChargingType": "键盘笔槽磁吸无线充电",
        "trackpadType": "机械触控板",
        "tpmChip": "固件 TPM",
        "securedCorePc": "支持",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持商业管理",
        "dimensionsMm": "287 × 208 × 7.3 (史上最薄 Pro)",
        "weightGrams": "774g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "完全无风扇零噪音极静音被动导热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 模块",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-pro-x-%E7%89%B9%E6%80%A7-5eb0dfb6-b4b3-461b-99d0-65e1866380c2"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-x-features-and-specs",
      "segment": "consumer"
    },
    {
      "id": "laptop-8-138-intel",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop 13.8 英寸 (第 8 代) 商用版 - Intel 版",
      "nameEn": "Surface Laptop, 13.8-inch (8th Edition) for Business - Intel",
      "generation": "第 8 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "商用轻薄触控本旗舰：搭载英特尔® 酷睿™ Ultra (第 3 代) 处理器，50 TOPS AI 算力与全域触觉触控板",
      "prevGenerationId": "laptop-6-biz",
      "specs": {
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "touchAndPenProtocol": "10 点多点触控，不支持触控笔",
        "thunderboltSupport": "USB4® / Thunderbolt™ 4",
        "audioTech": "Dolby Atmos®",
        "windowsHello": "Windows Hello 面部识别",
        "releaseDate": "2026 年 8 月",
        "generation": "第 8 代",
        "status": "current_cn",
        "targetAudience": "主流商务与高端职场精英",
        "tagline": "英特尔酷睿 Ultra 5/7 (第3代，50 TOPS)，触觉反馈精准触控板与 120Hz 极窄边框",
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
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "英特尔® 酷睿™ Ultra 5 处理器 335（第 3 代） / Ultra 7 处理器 366H（第 3 代） / Ultra X7 处理器 368H（第 3 代）",
        "cpuArch": "64 位 / Intel 18A",
        "cpuCores": "not_disclosed",
        "gpuModel": "Ultra 5 / Ultra 7：英特尔® 图形处理器；Ultra X7：英特尔® Arc™ 显卡",
        "npuModel": "Intel® AI Boost (50 TOPS)",
        "npuTops": "50 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 NVMe SSD",
        "ssdRemovable": "支持 (底部快拆)",
        "expandableStorage": "not_applicable",
        "screenSize": "13.8 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "2304 × 1536",
        "ppi": "201 PPI",
        "refreshRate": "120Hz 动态刷新率 (Dynamic Refresh)",
        "brightness": "SDR 最大 600 尼特（典型值）；HDR 600 尼特峰值",
        "colorGamut": "sRGB 和 Vivid，对比度 1300:1",
        "displayProtection": "强化玻璃显示屏",
        "penSupport": "不支持 (纯触控笔记本设计，专为键鼠打字优化)",
        "touchSupport": "10 点多点触控",
        "rearCamera": "not_applicable",
        "frontCamera": "前置 1080p 全高清 Surface Studio 摄像头",
        "studioEffects": "支持 Windows Studio 全套 AI 特效",
        "speakers": "Omnisonic® 矩阵扬声器，支持杜比全景声 (Dolby Atmos®)",
        "mics": "双 Studio Mics，支持语音聚焦",
        "usbC": "2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2",
        "usbA": "1 × USB-A 3.2",
        "audioJack": "3.5 毫米耳机插孔",
        "surfaceConnect": "1 × Surface Connect 磁吸专用充电接口",
        "sdSlot": "not_applicable",
        "simSlot": "not_applicable",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryWh": "54 Wh（额定；最小 52 Wh）",
        "batteryLifeLocalVideo": "本地视频播放长达 23 小时",
        "batteryLifeWeb": "网页浏览长达 14.5 小时",
        "chargingSpeed": "标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W",
        "keyboardCompatibility": "一体化静音剪刀脚键盘 (1.3mm 键程，内置 Copilot 独立按键)",
        "penChargingType": "not_applicable",
        "trackpadType": "全域压力感应触觉反馈触控板 (Haptic Trackpad)",
        "tpmChip": "Microsoft Pluton 安全芯片",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "支持 Microsoft Intune 远程企业部署",
        "dimensionsMm": "301 × 220 × 17.5",
        "weightGrams": "1350 克（隐私屏 1360 克）",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "超静音高转速单风扇微流散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 硬盘、键盘总成、电池、主板接口",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥16,888 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-configurate"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-business-8th-edition-intel",
      "segment": "commercial"
    },
    {
      "id": "laptop-8-138-snap",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop 13.8 英寸 (第 8 代) 商用版 - 骁龙版",
      "nameEn": "Surface Laptop, 13.8-inch (8th Edition) for Business - Snapdragon",
      "generation": "第 8 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "商用轻薄本续航巅峰：搭载高通骁龙 X2 (Snapdragon® X2 Elite 处理器)，80 TOPS 巅峰 AI 算力与 20 小时续航",
      "prevGenerationId": "laptop-6-biz",
      "specs": {
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "touchAndPenProtocol": "10 点多点触控，不支持触控笔",
        "thunderboltSupport": "USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）",
        "audioTech": "Dolby Atmos®",
        "windowsHello": "Windows Hello 面部识别",
        "releaseDate": "2026 年 8 月",
        "generation": "第 8 代",
        "status": "current_cn",
        "targetAudience": "商务差旅与高端移动办公精英",
        "tagline": "高通骁龙 X2 平台与 80 TOPS Hexagon NPU，20 小时长效续航与极致静音设计",
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
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版 (ARM64)",
        "cpuModel": "高通骁龙® X2 Plus（10 核） / X2 Elite（12 核）",
        "cpuArch": "第 3 代 Qualcomm Oryon™（ARM64）",
        "cpuCores": "10 核 / 12 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "高通全新 Hexagon NPU (80 TOPS)",
        "npuTops": "80 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB / 2TB 可拆卸第 4 代 NVMe SSD",
        "ssdRemovable": "支持 (底部快拆)",
        "expandableStorage": "not_applicable",
        "screenSize": "13.8 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "2304 × 1536",
        "ppi": "201 PPI",
        "refreshRate": "120Hz 动态刷新率 (Dynamic Refresh)",
        "brightness": "SDR 最大 600 尼特（典型值）；HDR 600 尼特峰值",
        "colorGamut": "sRGB 和 Vivid，对比度 1300:1",
        "displayProtection": "强化玻璃显示屏",
        "penSupport": "不支持 (纯触控笔记本设计，专为键鼠打字优化)",
        "touchSupport": "10 点多点触控",
        "rearCamera": "not_applicable",
        "frontCamera": "前置 1080p 全高清 Surface Studio 摄像头",
        "studioEffects": "支持 Windows Studio 全套 AI 特效",
        "speakers": "Omnisonic® 矩阵扬声器，支持杜比全景声 (Dolby Atmos®)",
        "mics": "双 Studio Mics，支持语音聚焦",
        "usbC": "2 × USB-C® / USB4®：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2",
        "usbA": "1 × USB-A 3.2",
        "audioJack": "3.5 毫米耳机插孔",
        "surfaceConnect": "1 × Surface Connect 磁吸专用充电接口",
        "sdSlot": "not_applicable",
        "simSlot": "not_applicable",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryWh": "54 Wh（额定；最小 52 Wh）",
        "batteryLifeLocalVideo": "本地视频播放长达 20 小时",
        "batteryLifeWeb": "网页浏览长达 16 小时",
        "chargingSpeed": "标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W",
        "keyboardCompatibility": "一体化静音剪刀脚键盘 (1.3mm 键程，内置 Copilot 独立按键)",
        "penChargingType": "not_applicable",
        "trackpadType": "全域压力感应触觉反馈触控板 (Haptic Trackpad)",
        "tpmChip": "Microsoft Pluton 安全芯片",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "支持 Microsoft Intune 远程企业部署",
        "dimensionsMm": "301 × 220 × 17.5",
        "weightGrams": "1.36 千克",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "超静音高转速单风扇微流散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 硬盘、键盘总成、电池、主板接口",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥14,888 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon-configurate"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-business-8th-edition-intel",
      "segment": "commercial"
    },
    {
      "id": "laptop-8-150-intel",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop 15 英寸 (第 8 代) 商用版 - Intel 版",
      "nameEn": "Surface Laptop, 15-inch (8th Edition) for Business - Intel",
      "generation": "第 8 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "商用大屏性能轻薄本：搭载英特尔® 酷睿™ Ultra 5 335 / Ultra X7 368H（第 3 代），50 TOPS 与 262 PPI 超清屏",
      "prevGenerationId": "laptop-6-biz",
      "specs": {
        "releaseDate": "2026 年 8 月",
        "generation": "第 8 代",
        "status": "current_cn",
        "targetAudience": "大屏生产力、企业财务与工程技术人员",
        "tagline": "英特尔酷睿 Ultra 5 335 / Ultra X7 368H（第 3 代），50 TOPS，本地视频续航长达 21 小时",
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
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "英特尔® 酷睿™ Ultra 5 处理器 335（第 3 代） / Ultra X7 处理器 368H（第 3 代）",
        "cpuArch": "64 位 / Intel 18A",
        "cpuCores": "not_disclosed",
        "gpuModel": "Ultra 5：英特尔® 图形处理器；Ultra X7：英特尔® Arc™ 显卡",
        "npuModel": "Intel® AI Boost (50 TOPS)",
        "npuTops": "50 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 NVMe SSD",
        "ssdRemovable": "支持",
        "expandableStorage": "配备 MicroSDXC Express 读卡器",
        "screenSize": "15.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金生产力比例",
        "panelTech": "not_disclosed",
        "resolution": "3270 × 2180",
        "ppi": "262 PPI",
        "refreshRate": "最高 120Hz 动态自适应刷新",
        "brightness": "SDR 最大 600 尼特（典型值）；HDR 600 尼特峰值",
        "colorSupport": "SDR：sRGB 和 Vivid；支持杜比视界 IQ",
        "touchAndPenProtocol": "10 点多点触控，不支持触控笔",
        "frontCamera": "全高清 1080p Surface Studio 摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio Effects",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "Omnisonic 高保真低音增强双扬声器，杜比全景声",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "配备 3.5mm 耳机孔",
        "usbPorts": "2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2；MicroSDXC Express 读卡器",
        "thunderboltSupport": "USB4® / Thunderbolt™ 4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 7 + 蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryCapacityWh": "66 Wh（额定；最小 63 Wh）",
        "batteryLifeOffice": "网页浏览长达 14 小时",
        "batteryLifeVideo": "本地视频播放长达 21 小时",
        "chargingPower": "标配 65W Surface Connect 电源（特定配置）；最低充电 45W",
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "compatibleKeyboard": "一体式键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "超大面积触觉反馈精准触控板",
        "tpmChip": "Microsoft Pluton",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持 Intune",
        "dimensionsMm": "329 × 239 × 18.26",
        "weightGrams": "1670g (1.67 kg)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "高效双风扇低噪散热模组",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、电池、键盘、主板接口",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-configurate"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-business-8th-edition-intel",
      "segment": "commercial"
    },
    {
      "id": "laptop-8-150-snap",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop 15 英寸 (第 8 代) 商用版 - 骁龙版",
      "nameEn": "Surface Laptop, 15-inch (8th Edition) for Business - Snapdragon",
      "generation": "第 8 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "商用大屏续航：搭载骁龙® X2 Plus / X2 Elite，80 TOPS，15 英寸本地视频续航长达 19 小时",
      "prevGenerationId": "laptop-6-biz",
      "specs": {
        "releaseDate": "2026 年 8 月",
        "generation": "第 8 代",
        "status": "current_cn",
        "targetAudience": "大屏移动生产力与商务外勤精英",
        "tagline": "骁龙® X2 Plus / X2 Elite，80 TOPS，本地视频续航长达 19 小时",
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
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版 (ARM64)",
        "cpuModel": "高通骁龙® X2 Plus（10 核） / X2 Elite（12 核）",
        "cpuArch": "第 3 代 Qualcomm Oryon™（ARM64）",
        "cpuCores": "10 核 / 12 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "高通全新 Hexagon NPU (80 TOPS)",
        "npuTops": "80 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB / 2TB 可拆卸第 4 代 NVMe SSD",
        "ssdRemovable": "支持",
        "expandableStorage": "配备 MicroSDXC Express 读卡器",
        "screenSize": "15.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金生产力比例",
        "panelTech": "not_disclosed",
        "resolution": "3270 × 2180",
        "ppi": "262 PPI",
        "refreshRate": "最高 120Hz 动态自适应刷新",
        "brightness": "SDR 最大 600 尼特（典型值）；HDR 600 尼特峰值",
        "colorSupport": "SDR：sRGB 和 Vivid；支持杜比视界 IQ",
        "touchAndPenProtocol": "10 点多点触控，不支持触控笔",
        "frontCamera": "全高清 1080p Surface Studio 摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio Effects",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "Omnisonic 高保真低音增强双扬声器，杜比全景声",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "配备 3.5mm 耳机孔",
        "usbPorts": "2 × USB-C® / USB4®：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2；MicroSDXC Express 读卡器",
        "thunderboltSupport": "USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 7 + 蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryCapacityWh": "66 Wh（额定；最小 63 Wh）",
        "batteryLifeOffice": "网页浏览长达 14 小时",
        "batteryLifeVideo": "本地视频播放长达 19 小时",
        "chargingPower": "标配 65W Surface Connect 电源（特定配置）；最低充电 45W",
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "compatibleKeyboard": "一体式键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "超大面积触觉反馈精准触控板",
        "tpmChip": "Microsoft Pluton",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持 Intune",
        "dimensionsMm": "329 × 239 × 18.26",
        "weightGrams": "1660g (1.66 kg)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "高效双风扇低噪散热模组",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、电池、键盘、主板接口",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon-configurate"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-business-8th-edition-intel",
      "segment": "commercial"
    },
    {
      "id": "laptop-8-138",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop 13.8 英寸 (第 8 代)",
      "nameEn": "Surface Laptop, 13.8-inch (8th Edition)",
      "generation": "第 8 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "consumer",
      "flagship": true,
      "tagline": "80 TOPS 超长 20 小时续航，极致触觉触控板轻薄本",
      "prevGenerationId": "laptop-7-138",
      "nextGenerationId": null,
      "specs": {
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "touchAndPenProtocol": "10 点多点触控，不支持触控笔",
        "thunderboltSupport": "USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）",
        "audioTech": "Dolby Atmos®",
        "windowsHello": "Windows Hello 面部识别",
        "releaseDate": "2026 年 8 月",
        "generation": "第 8 代",
        "status": "current_cn",
        "targetAudience": "面向时尚白领、高校学子与个人数字先锋",
        "tagline": "高通骁龙® X2 Plus（10 核）或 X2 Elite（12 核），120Hz 触控，不支持触控笔",
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
          },
          {
            "name": "翡翠绿",
            "hex": "#2e6b54",
            "image": "./assets/products/surface-laptop-emerald.png"
          },
          {
            "name": "沙漫金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-laptop-dune.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "高通骁龙® X2 Plus（10 核） / X2 Elite（12 核）",
        "cpuArch": "第 3 代 Qualcomm Oryon™（ARM64）",
        "cpuCores": "10 核 / 12 核",
        "gpuModel": "Qualcomm Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™ NPU (80 TOPS)",
        "npuTops": "80 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 24GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB",
        "ssdRemovable": "支持 (底部快拆)",
        "expandableStorage": "not_applicable",
        "screenSize": "13.8 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "2304 × 1536",
        "ppi": "201 PPI",
        "refreshRate": "120Hz 动态刷新率 (Dynamic Refresh)",
        "brightness": "600 尼特峰值亮度 (支持 HDR 与杜比视界)",
        "colorGamut": "sRGB 和 Vivid",
        "displayProtection": "康宁大猩猩玻璃 Victus",
        "penSupport": "不支持 (纯触控笔记本设计，专为键鼠打字优化)",
        "touchSupport": "10 点多点触控",
        "rearCamera": "not_applicable",
        "frontCamera": "前置 1080p 全高清 Surface Studio 摄像头",
        "studioEffects": "支持 Windows Studio 全套 AI 特效",
        "speakers": "Omnisonic® 矩阵扬声器，支持杜比全景声 (Dolby Atmos®)",
        "mics": "双 Studio Mics，支持语音聚焦",
        "usbC": "2 × USB-C® / USB4®：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2",
        "usbA": "1 × USB-A 3.2",
        "audioJack": "3.5 毫米耳机插孔",
        "surfaceConnect": "1 × Surface Connect 磁吸专用充电接口",
        "sdSlot": "not_applicable",
        "simSlot": "not_applicable",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryWh": "54 Wh",
        "batteryLifeLocalVideo": "最长 20 小时本地视频播放",
        "batteryLifeWeb": "网页浏览长达 16 小时",
        "chargingSpeed": "标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W",
        "keyboardCompatibility": "一体化静音剪刀脚键盘 (1.3mm 键程，内置 Copilot 独立按键)",
        "penChargingType": "not_applicable",
        "trackpadType": "全域压力感应触觉反馈触控板 (Haptic Trackpad)",
        "tpmChip": "Microsoft Pluton 安全芯片",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "支持家庭与商业集中部署",
        "dimensionsMm": "301 × 220 × 17.5",
        "weightGrams": "not_disclosed",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "超静音高转速单风扇微流散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 硬盘、键盘总成、电池、主板接口",
        "warranty": "2 年有限硬件质保",
        "startingPriceCny": "¥11,488 起 (消费版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-8-inch-8th-edition",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-8-inch-8th-edition"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-business-8th-edition-intel",
      "segment": "consumer"
    },
    {
      "id": "laptop-8-150",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop 15 英寸 (第 8 代)",
      "nameEn": "Surface Laptop, 15-inch (8th Edition)",
      "generation": "第 8 代 (2026)",
      "year": 2026,
      "status": "current_cn",
      "targetAudience": "consumer",
      "flagship": true,
      "tagline": "15 英寸 HDR 触控屏，骁龙 X2，官方本地视频续航最长 19 小时",
      "prevGenerationId": "laptop-7-138",
      "nextGenerationId": null,
      "specs": {
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "touchAndPenProtocol": "10 点多点触控，不支持触控笔",
        "thunderboltSupport": "USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）",
        "audioTech": "Dolby Atmos®",
        "windowsHello": "Windows Hello 面部识别",
        "releaseDate": "2026 年 8 月",
        "generation": "第 8 代",
        "status": "current_cn",
        "targetAudience": "大屏生产力、影视娱乐与深度办公个人用户",
        "tagline": "超大触觉反馈触控板，搭载 MicroSD 扩展槽的高性能大屏轻薄本",
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
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "高通骁龙® X2 Plus（10 核） / X2 Elite（12 核）",
        "cpuArch": "第 3 代 Qualcomm Oryon™（ARM64）",
        "cpuCores": "10 核 / 12 核",
        "gpuModel": "Qualcomm Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™ NPU (80 TOPS)",
        "npuTops": "80 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB LPDDR5x",
        "storageOptions": "512GB / 1TB",
        "ssdRemovable": "支持",
        "expandableStorage": "配备 MicroSDXC Express 读卡器",
        "screenSize": "15.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "3270 × 2180",
        "ppi": "262 PPI",
        "refreshRate": "120Hz 动态刷新率 (Dynamic Refresh)",
        "brightness": "600 尼特峰值亮度 (支持 HDR 与杜比视界)",
        "colorGamut": "sRGB 和 Vivid",
        "displayProtection": "康宁大猩猩玻璃 Victus",
        "penSupport": "不支持 (纯触控笔记本设计)",
        "touchSupport": "10 点多点触控",
        "rearCamera": "not_applicable",
        "frontCamera": "前置 1080p 全高清 Surface Studio 摄像头",
        "speakers": "Omnisonic® 矩阵扬声器，支持杜比全景声",
        "mics": "双 Studio Mics，支持语音聚焦",
        "usbC": "2 × USB-C® / USB4®：充电、数据、DisplayPort 2.1（最多三台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2；MicroSDXC Express 读卡器",
        "usbA": "1 × USB-A 3.2",
        "audioJack": "3.5 毫米耳机插孔",
        "surfaceConnect": "1 × Surface Connect 磁吸专用充电接口",
        "sdSlot": "MicroSDXC Express 读卡器",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryWh": "66 Wh",
        "batteryLifeLocalVideo": "最长 19 小时本地视频播放",
        "batteryLifeWeb": "网页浏览长达 14 小时",
        "chargingSpeed": "标配 65W Surface Connect 电源（特定配置）；最低充电 45W",
        "keyboardCompatibility": "一体化静音剪刀脚键盘 (内置 Copilot 独立按键)",
        "penChargingType": "not_applicable",
        "trackpadType": "全域压力感应触觉反馈超大触控板",
        "tpmChip": "Microsoft Pluton 安全芯片",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "dimensionsMm": "329 × 239 × 18.26",
        "weightGrams": "not_disclosed",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "双风扇微流低噪散热架构",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 硬盘、键盘总成、电池、主板接口",
        "warranty": "2 年有限硬件质保",
        "startingPriceCny": "¥12,888 起 (消费版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/buy-surface-laptop",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/buy-surface-laptop"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-business-8th-edition-intel",
      "segment": "consumer"
    },
    {
      "id": "laptop-7-138",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop (第 7 代) 13.8 英寸",
      "nameEn": "Surface Laptop (7th Edition)",
      "generation": "第 7 代 (2024)",
      "year": 2024,
      "status": "discontinued",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "极窄边框与高通骁龙 X Elite，触觉反馈触控板革新",
      "prevGenerationId": "laptop-5",
      "nextGenerationId": "laptop-8-138",
      "specs": {
        "releaseDate": "2024 年 5 月",
        "generation": "第 7 代",
        "status": "discontinued",
        "targetAudience": "个人消费者与商务差旅",
        "tagline": "第一代 Copilot+ PC 轻薄本，首次引入圆角屏幕与触觉触控",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-laptop-black.png"
          },
          {
            "name": "宝石蓝",
            "hex": "#2f4f7f",
            "image": "./assets/products/surface-laptop-sapphire.png"
          },
          {
            "name": "砂岩金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-laptop-dune.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 (ARM64)",
        "cpuModel": "Snapdragon® X Plus（10 核，X1P64100） / Snapdragon® X Elite（12 核，X1E80100）",
        "cpuArch": "Qualcomm Oryon™ 64 位",
        "cpuCores": "not_disclosed",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™",
        "npuTops": "45 TOPS",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.8 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2304 × 1536",
        "ppi": "201 PPI",
        "refreshRate": "最高 120Hz 动态自适应",
        "brightness": "典型 600 nits / HDR 峰值",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，不支持触控笔",
        "frontCamera": "1080p 全高清 Surface Studio 摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × USB-C (USB4) + 1 × USB-A 3.1",
        "thunderboltSupport": "USB4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 7 + 蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryCapacityWh": "54.0 Wh",
        "batteryLifeOffice": "网页浏览约 13 小时",
        "batteryLifeVideo": "视频播放约 20 小时",
        "chargingPower": "最低充电 39W；标配 39W（型号 1963）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "一体式键盘 (带 Copilot 键)",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "触觉触控板",
        "tpmChip": "Microsoft Pluton",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持集中管理",
        "dimensionsMm": "301 × 220 × 17.5",
        "weightGrams": "1340g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "单风扇轻音导热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、键盘盖组件、电池",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-7th-edition"
      },
      "isCommercial": false,
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-snapdragon-tech-specs",
      "segment": "consumer"
    },
    {
      "id": "laptop-6-biz",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-laptop-6-biz-hero.png",
      "name": "Surface Laptop 6 商用版 (13.5\" & 15\")",
      "nameEn": "Surface Laptop 6 for Business",
      "generation": "第 6 代商用 (2024)",
      "year": 2024,
      "status": "discontinued",
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "Intel Core Ultra H 系列标压商用本，国行规格不含美加专属智能卡读卡器",
      "prevGenerationId": "laptop-5",
      "specs": {
        "releaseDate": "2024 年 3 月",
        "generation": "第 6 代商用",
        "status": "discontinued",
        "targetAudience": "政企用户、金融专业人员与企业开发者",
        "tagline": "标压性能与全金属高强度外壳，企业级硬件安全",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-laptop-black.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "Intel® Core™ Ultra 5 135H / Ultra 7 165H",
        "cpuArch": "64 位 / Intel 4",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® 显卡",
        "npuModel": "英特尔® AI Boost",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB Gen 4 SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.5 英寸 / 15.0 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2256 × 1504 (13.5\") / 2496 × 1664 (15\")",
        "ppi": "201 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB 和增强型",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "1080p 全高清 Surface Studio 摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "Omnisonic® 扬声器，支持 Dolby® Atmos®",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "13.5寸: 1×雷电4 + 1×USB-A / 15寸: 2×雷电4 + 1×USB-A",
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6E + 蓝牙 5.3",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "最长 18.5 小时典型使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "13.5 英寸最低/标配 39W（型号 1963）；15 英寸最低 45W、标配 65W",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "背光键盘 + 机械触控板",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "机械触控板",
        "tpmChip": "硬件级 TPM 2.0",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "人脸识别 + 智能卡",
        "enterpriseManage": "支持 vPro 与企业级固件锁",
        "dimensionsMm": "308 × 223 × 16.7 (13.5\") / 340 × 244 × 16.9 (15\")",
        "weightGrams": "1380g (13.5\") / 1680g (15\")",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "高效双热管主动风冷",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、键盘、主板、电池",
        "warranty": "2 年有限硬件保修",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-6-for-business"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-6-for-business-features",
      "segment": "commercial"
    },
    {
      "id": "laptop-5",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-laptop-5-hero.png",
      "name": "Surface Laptop 5 (13.5\" & 15\")",
      "nameEn": "Surface Laptop 5",
      "generation": "第 5 代 (2022)",
      "year": 2022,
      "status": "discontinued",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "迎来 Thunderbolt 4 雷电4，经典欧缔兰与金属双材质",
      "prevGenerationId": "laptop-4",
      "nextGenerationId": "laptop-7-138",
      "specs": {
        "releaseDate": "2022 年 10 月",
        "generation": "第 5 代",
        "status": "discontinued",
        "targetAudience": "移动办公与大学生",
        "tagline": "12 代酷睿 Evo 平台认证，仙野绿全新配色加入",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-laptop-black.png"
          },
          {
            "name": "森野绿",
            "hex": "#3b5323",
            "image": "./assets/products/surface-laptop-sage.png"
          },
          {
            "name": "砂岩金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-laptop-dune.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "Intel 12 代酷睿 i5-1235U / i7-1255U",
        "cpuArch": "64 位 / Intel 7",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® Iris® Xe 显卡",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB / 32GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.5 英寸 / 15.0 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2256 × 1504 (13.5\") / 2496 × 1664 (15\")",
        "ppi": "201 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "720p HD 高清镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "Omnisonic 杜比全景声扬声器",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × 雷电 4 (USB-C) + 1 × USB-A 3.1",
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 + 蓝牙 5.1",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "最长 18 小时 (13.5\") / 17 小时 (15\")",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "Alcantara 或金属掌托舒适背光键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "支持",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持",
        "dimensionsMm": "308 × 223 × 14.5 (13.5\") / 340 × 244 × 14.7 (15\")",
        "weightGrams": "1272g (欧缔兰) / 1297g (金属) / 1545g (15寸)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动单风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 模块",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-laptop-5-%E7%89%B9%E6%80%A7-5509a24a-f3c5-4309-8d5c-f4893708e1e7"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-5-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "laptop-4",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-laptop-4-hero.png",
      "name": "Surface Laptop 4 (13.5\" & 15\")",
      "nameEn": "Surface Laptop 4",
      "generation": "第 4 代 (2021)",
      "year": 2021,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "双芯选择：Intel 11代酷睿与 AMD 锐龙微软定制版",
      "prevGenerationId": "laptop-3",
      "nextGenerationId": "laptop-5",
      "specs": {
        "releaseDate": "2021 年 4 月",
        "generation": "第 4 代",
        "status": "legacy",
        "targetAudience": "多任务重度办公",
        "tagline": "续航长达 19 小时里程碑，冰晶蓝柔美新色",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-laptop-black.png"
          },
          {
            "name": "冰晶蓝",
            "hex": "#a4c2f4",
            "image": "./assets/products/surface-laptop-sapphire.png"
          },
          {
            "name": "砂岩金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-laptop-dune.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 10 家庭版",
        "cpuModel": "Intel 11 代酷睿 或 AMD Ryzen™ 5 4680U / 7 4980U 微软定制版",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB LPDDR4x",
        "storageOptions": "256GB / 512GB / 1TB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "13.5 英寸 / 15.0 英寸 PixelSense™",
        "aspectRatio": "not_disclosed",
        "panelTech": "not_disclosed",
        "resolution": "not_disclosed",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "720p HD 高清镜头 (低光降噪增强)",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "Omnisonic 扬声器",
        "audioTech": "not_disclosed",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C 3.2 + 1 × USB-A 3.1",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "not_disclosed",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "1.3mm 键程背光键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "支持",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持",
        "dimensionsMm": "not_disclosed",
        "weightGrams": "not_disclosed",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动静音风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 模块",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-laptop-4-%E7%89%B9%E6%80%A7-9759c99d-1510-4ff6-a79a-e1a90c010b98"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-4-features",
      "segment": "consumer"
    },
    {
      "id": "laptop-3",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-laptop-3-hero.png",
      "name": "Surface Laptop 3 (13.5\" & 15\")",
      "nameEn": "Surface Laptop 3",
      "generation": "第 3 代 (2019)",
      "year": 2019,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "首次开创 15 英寸大屏，加入 USB-C 与全金属机身选项",
      "prevGenerationId": "laptop-2",
      "nextGenerationId": "laptop-4",
      "specs": {
        "releaseDate": "2019 年 10 月",
        "generation": "第 3 代",
        "status": "legacy",
        "targetAudience": "个人消费者与商业办公",
        "tagline": "告别 Mini DisplayPort 迎来 Type-C，触控板面积增大 20%",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-laptop-black.png"
          },
          {
            "name": "砂岩金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-laptop-dune.png"
          },
          {
            "name": "钴蓝色",
            "hex": "#0047ab",
            "image": "./assets/products/surface-laptop-sapphire.png"
          }
        ],
        "chassisMaterial": "铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 10 家庭版",
        "cpuModel": "13.5 英寸：第 10 代英特尔® 酷睿™ i5-1035G7 / i7-1065G7；15 英寸：AMD Ryzen™ 5 3580U / 7 3780U 微软定制版",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® Iris™ Plus / AMD Radeon™ Vega",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "13.5 英寸 8GB / 16GB LPDDR4x；15 英寸 8GB / 16GB DDR4",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "支持可移动固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.5 英寸 / 15.0 英寸 (首款 15 寸轻薄本)",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2256 × 1504 (13.5\") / 2496 × 1664 (15\")",
        "ppi": "201 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控，支持 Surface 触控笔",
        "frontCamera": "720p HD 高清镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_applicable",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "Omnisonic 杜比音效扬声器",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C 3.1 + 1 × USB-A 3.0",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 (Intel) / Wi-Fi 5 (AMD) + 蓝牙 5.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "长达 11.5 小时典型续航 (支持 1小时快充80%)",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "大尺寸玻璃触控板 + 静音键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "机械触控板 (面积增大 20%)",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持",
        "dimensionsMm": "308 × 223 × 14.5 (13.5\") / 339.5 × 244 × 14.7 (15\")",
        "weightGrams": "1265g (欧缔兰) / 1288g (金属) / 1542g (15寸)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动单风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 模块、键盘掌托组件",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-laptop-3-%E7%89%B9%E6%80%A7-96a237f3-2391-4c62-8e7c-a4962c5b3648"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-3-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "laptop-2",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-laptop-2-hero.png",
      "name": "Surface Laptop 2",
      "nameEn": "Surface Laptop 2",
      "generation": "第 2 代 (2018)",
      "year": 2018,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "8 代四核性能提升 85%，全新哑光典黑配色",
      "prevGenerationId": "laptop-1",
      "nextGenerationId": "laptop-3",
      "specs": {
        "releaseDate": "2018 年 10 月",
        "generation": "第 2 代",
        "status": "legacy",
        "targetAudience": "学生与商务人士",
        "tagline": "四核性能跃升，更加安静细腻的键盘输入击键手感",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-laptop-black.png"
          },
          {
            "name": "勃艮第红",
            "hex": "#800020",
            "image": "./assets/products/surface-laptop-perspective-hero.png"
          },
          {
            "name": "深钴蓝",
            "hex": "#0047ab",
            "image": "./assets/products/surface-laptop-sapphire.png"
          }
        ],
        "chassisMaterial": "铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 10 家庭版",
        "cpuModel": "Intel 第 8 代酷睿 i5-8250U / i7-8650U",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics 620",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB LPDDR3",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "13.5 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2256 × 1504",
        "ppi": "201 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控，支持 Surface 触控笔",
        "frontCamera": "720p HD 高清镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_applicable",
        "microphones": "立体麦克风",
        "speakers": "Omnisonic 杜比音效扬声器",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × 全尺寸 USB 3.0 + 1 × Mini DisplayPort",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 + 蓝牙 4.1",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "长达 14.5 小时本地视频播放",
        "chargingPower": "最低充电 39W；标配 39W（型号 1800）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "欧缔兰 Alcantara 顶级织物静音键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "基础管理",
        "dimensionsMm": "308.1 × 223.27 × 14.48",
        "weightGrams": "1252g (i5) / 1283g (i7)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "微型主动风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_support",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-laptop-2-%E7%89%B9%E6%80%A7-70e28f11-09d2-4cf0-9d04-0ee0d17d590e"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-2-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "laptop-1",
      "categoryId": "laptop",
      "heroImage": "./assets/products/surface-laptop-1-hero.png",
      "name": "Surface Laptop 初代 (Original)",
      "nameEn": "Surface Laptop (Original)",
      "generation": "初代 (2017)",
      "year": 2017,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "极简梯形纯粹笔记本美学，Alcantara 织物奢华掌托",
      "nextGenerationId": "laptop-2",
      "specs": {
        "releaseDate": "2017 年 5 月",
        "generation": "初代 (2017)",
        "status": "legacy",
        "targetAudience": "高校师生与白领",
        "tagline": "微软首款纯粹形态翻盖笔记本，单手优雅开合设计",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          },
          {
            "name": "石墨金",
            "hex": "#cfb53b",
            "image": "./assets/products/surface-laptop-dune.png"
          },
          {
            "name": "勃艮第红",
            "hex": "#800020",
            "image": "./assets/products/surface-laptop-perspective-hero.png"
          },
          {
            "name": "深钴蓝",
            "hex": "#0047ab",
            "image": "./assets/products/surface-laptop-sapphire.png"
          }
        ],
        "chassisMaterial": "铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel 第 7 代酷睿 i5 / i7",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® HD Graphics 620 / Intel® Iris™ Plus Graphics 640",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB / 16GB LPDDR3",
        "storageOptions": "128GB / 256GB / 512GB / 1TB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "13.5 英寸 PixelSense™ (超薄触摸屏模组)",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2256 × 1504",
        "ppi": "201 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控，支持 Surface 触控笔",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_applicable",
        "microphones": "立体麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × 全尺寸 USB 3.0 + 1 × Mini DisplayPort",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 + 蓝牙 4.0 LE",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "长达 14.5 小时本地视频播放",
        "chargingPower": "最低充电 39W；标配 39W（型号 1800）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "Alcantara 奢华织物背光键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "基础管理",
        "dimensionsMm": "308.1 × 223.27 × 14.48",
        "weightGrams": "1252g (i5) / 1283g (i7)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动风扇散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_support",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-1st-gen-specs-and-features"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-1st-gen-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "sls-2",
      "categoryId": "sls",
      "heroImage": "./assets/products/surface-laptop-studio-2-hero.png",
      "name": "Surface Laptop Studio 2",
      "nameEn": "Surface Laptop Studio 2",
      "generation": "第 2 代 (2023)",
      "year": 2023,
      "status": "discontinued",
      "targetAudience": "consumer",
      "flagship": true,
      "tagline": "微软史上性能天花板：13代标压i7与RTX 4060，动态编织铰链",
      "prevGenerationId": "sls-1",
      "specs": {
        "releaseDate": "2023 年 9 月",
        "generation": "第 2 代",
        "status": "discontinued",
        "targetAudience": "3D 建模师、架构师与视频后期专业创作者",
        "tagline": "笔记本、舞台、创作画布三段变形，搭载 Intel NPU 电脑",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-studio-2-hero.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "Intel 第 13 代酷睿 i7-13700H",
        "cpuArch": "64 位 / Intel 7",
        "cpuCores": "not_disclosed",
        "gpuModel": "NVIDIA® GeForce RTX™ 4050 / 4060 或 NVIDIA® RTX™ 2000 Ada",
        "npuModel": "not_disclosed",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "512GB / 1TB / 2TB Gen 4 NVMe SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "14.4 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2400 × 1600",
        "ppi": "200 PPI",
        "refreshRate": "高达 120Hz 动态自适应高刷",
        "brightness": "SDR 最大 500 nits（典型值）；HDR 峰值 650 nits",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "全高清 1080p 超广视场角镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "支持 Dolby® Atmos® 音效的四声道 Omnisonic® 扬声器",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × 雷电 4 (USB-C) + 1 × USB-A 3.1 + MicroSD 卡槽",
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6E + 蓝牙 5.3",
        "cellular": "not_applicable",
        "batteryCapacityWh": "58.0 Wh",
        "batteryLifeOffice": "典型使用最长 19 小时（集显）/ 18 小时（独显）/ 16 小时（2TB 独显）",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "集显最低/标配 95W（型号 1798）；独显最低/标配 120W（型号 1932）",
        "fastCharging": "推荐快充 95W（集显）/ 120W（独显）",
        "compatibleKeyboard": "大面积触觉反馈触控板 + 沉浸背光键盘",
        "penHapticFeedback": "原生完美支持触觉纸感震动",
        "penChargingType": "掌托下方前沿磁吸无线充笔槽",
        "trackpadType": "触觉反馈精准触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持企业级集中管理",
        "dimensionsMm": "323 × 230 × 22",
        "weightGrams": "1890g（集显） / 1980g（NVIDIA 独显）",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "双风扇大尺寸热管强压直吹散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、电池、屏幕总成、主板端口",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-studio-2"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-2-features",
      "segment": "consumer"
    },
    {
      "id": "sls-1",
      "categoryId": "sls",
      "heroImage": "./assets/products/surface-laptop-studio-2-hero.png",
      "name": "Surface Laptop Studio 初代",
      "nameEn": "Surface Laptop Studio (Original)",
      "generation": "初代 (2021)",
      "year": 2021,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "颠覆式动态编织铰链，RTX 3050Ti 创作变形本首创",
      "nextGenerationId": "sls-2",
      "specs": {
        "releaseDate": "2021 年 9 月",
        "generation": "初代 (2021)",
        "status": "legacy",
        "targetAudience": "创作者与设计师",
        "tagline": "取替 Surface Book 的划时代产物，首发 14.4 英寸 120Hz 触摸屏",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-studio-2-hero.png"
          }
        ],
        "chassisMaterial": "镁铝合金",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "Intel 11代酷睿 H35 i5-11300H / i7-11370H",
        "cpuArch": "64 位 / 10 nm SuperFin",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® 锐炬® Xe（i5）/ NVIDIA® GeForce RTX™ 3050 Ti（i7）",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB / 32GB LPDDR4x",
        "storageOptions": "256GB / 512GB / 1TB / 2TB SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "14.4 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2400 × 1600",
        "ppi": "201 PPI",
        "refreshRate": "最高 120Hz 刷新率",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点触控，支持 Microsoft 触控笔协议（MPP）",
        "frontCamera": "1080p 全高清前置摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "四声道 Omnisonic™ 扬声器，支持杜比全景声 (Dolby Atmos®)",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × 雷电 4 (USB-C)",
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 + 蓝牙 5.1",
        "cellular": "not_applicable",
        "batteryCapacityWh": "58.0 Wh（额定；最小 56.3 Wh）",
        "batteryLifeOffice": "长达 19 小时 (i5) / 18 小时 (i7)",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "集显最低/标配 60W（型号 1706）；独显最低/标配 95W（型号 1798）",
        "fastCharging": "推荐快充 60W（集显）/ 95W（独显）",
        "compatibleKeyboard": "全新大尺寸触觉反馈触控板 + 背光键盘",
        "penHapticFeedback": "支持",
        "penChargingType": "前沿下凹槽磁吸无线充电",
        "trackpadType": "触觉触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "支持",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持",
        "dimensionsMm": "323.28 × 228.32 × 18.94",
        "weightGrams": "1742.9g (i5) / 1820.2g (i7)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "双风扇散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 模块",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-studio"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-features",
      "segment": "consumer"
    },
    {
      "id": "go-4",
      "categoryId": "go",
      "heroImage": "./assets/products/surface-go-hero.png",
      "name": "Surface Go 4 商用版",
      "nameEn": "Surface Go 4 for Business",
      "generation": "第 4 代 (2023)",
      "year": 2023,
      "status": "discontinued",
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "521g 极致羽量级二合一，四核 Intel N200 生产力飞跃",
      "prevGenerationId": "go-3",
      "specs": {
        "releaseDate": "2023 年 9 月",
        "generation": "第 4 代",
        "status": "discontinued",
        "targetAudience": "一线作业巡检、医疗教育与前台业务",
        "tagline": "专为一线业务定制，性能提升达 80%，长达 12.5 小时续航",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-go-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "Intel® 处理器 N200",
        "cpuArch": "64 位 / Intel 7",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® UHD 显卡",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB LPDDR5 (全系标配 8G 淘汰前代短板)",
        "storageOptions": "64GB UFS / 128GB / 256GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "10.5 英寸 PixelSense™ 显示屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "1920 × 1280",
        "ppi": "220 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "典型 350 nits",
        "colorSupport": "sRGB 和 Enhanced",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "1080p 全高清前置摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素自动对焦后置镜头",
        "videoFeatures": "not_disclosed",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "2W 立体声扬声器，杜比音效",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C 3.1 + MicroSD 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 + 蓝牙 5.1",
        "cellular": "not_applicable",
        "batteryCapacityWh": "29 Wh（额定；最小 28）",
        "batteryLifeOffice": "典型日常使用长达 12.5 小时",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 24W；标配 24W（型号 1735 / 1736）",
        "fastCharging": "推荐快充 30W",
        "compatibleKeyboard": "Surface Go 专业键盘盖 (欧缔兰或黑色)",
        "penHapticFeedback": "不支持",
        "penChargingType": "笔侧磁吸在机身边框",
        "trackpadType": "机械触控板",
        "tpmChip": "硬件级 TPM 2.0",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持 Autopilot 云端部署",
        "dimensionsMm": "245 × 175 × 8.3",
        "weightGrams": "521g (羽量级口袋平板)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "完全无风扇零噪音被动冷却",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "屏幕、支架、电池",
        "warranty": "2 年有限硬件保修",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_datasheet",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-go-4-for-business"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-4-features",
      "segment": "commercial"
    },
    {
      "id": "go-3",
      "categoryId": "go",
      "heroImage": "./assets/products/surface-go-hero.png",
      "name": "Surface Go 3",
      "nameEn": "Surface Go 3",
      "generation": "第 3 代 (2021)",
      "year": 2021,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "升级酷睿 i3 双核，支持 LTE Advanced 全天候连网",
      "prevGenerationId": "go-2",
      "nextGenerationId": "go-4",
      "specs": {
        "releaseDate": "2021 年 9 月",
        "generation": "第 3 代",
        "status": "legacy",
        "targetAudience": "家庭与学生轻办公",
        "tagline": "速度提升 60%，最亲民的官方 Windows 11 平板设备",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-go-hero.png"
          },
          {
            "name": "典黑",
            "hex": "#262626",
            "image": "./assets/products/surface-go-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 11 家庭版 (S 模式)",
        "cpuModel": "Intel 奔腾金牌 6500Y / 酷睿 i3-10100Y",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB LPDDR3",
        "storageOptions": "64GB eMMC / 128GB / 256GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "10.5 英寸 PixelSense™",
        "aspectRatio": "not_disclosed",
        "panelTech": "not_disclosed",
        "resolution": "not_disclosed",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_disclosed",
        "microphones": "录音室麦克风（双麦克风）",
        "speakers": "not_disclosed",
        "audioTech": "not_disclosed",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C + MicroSD 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "not_disclosed",
        "cellular": "可选 LTE Advanced 4G",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "长达 11 小时日常使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 24W；标配 24W（型号 1735 / 1736）",
        "fastCharging": "推荐快充 30W",
        "compatibleKeyboard": "Surface Go 专业键盘盖",
        "penHapticFeedback": "不支持",
        "penChargingType": "侧边磁吸",
        "trackpadType": "机械触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "基础管理",
        "dimensionsMm": "not_disclosed",
        "weightGrams": "544g（Wi-Fi）/ 553g（LTE）",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "完全无风扇设计",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_support",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-go-3-%E7%89%B9%E6%80%A7-2bb3e721-a477-49e0-8a71-3312e75e921c"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-go-3-features",
      "segment": "consumer"
    },
    {
      "id": "laptop-go-3",
      "categoryId": "laptopgo",
      "heroImage": "./assets/products/surface-laptop-go-3-hero.png",
      "name": "Surface Laptop Go 3",
      "nameEn": "Surface Laptop Go 3",
      "generation": "第 3 代 (2023)",
      "year": 2023,
      "status": "discontinued",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "2.49 磅轻便触控本，指纹电源二合一，12 代酷睿升级",
      "prevGenerationId": "laptop-go-2",
      "specs": {
        "releaseDate": "2023 年 9 月",
        "generation": "第 3 代",
        "status": "discontinued",
        "targetAudience": "学生、白领日常码字轻办公",
        "tagline": "速度比初代提升 88%，全天候 15 小时长效续航与时尚新色",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          },
          {
            "name": "冰晶蓝",
            "hex": "#a4c2f4",
            "image": "./assets/products/surface-laptop-sapphire.png"
          },
          {
            "name": "砂岩金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-laptop-dune.png"
          },
          {
            "name": "仙野绿",
            "hex": "#3b5323",
            "image": "./assets/products/surface-laptop-sage.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "Intel 第 12 代酷睿 i5-1235U",
        "cpuArch": "64 位 / Intel 7",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB LPDDR5 (全系标配 8G 起步)",
        "storageOptions": "128GB / 256GB / 512GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "12.4 英寸 PixelSense™ 触控屏",
        "aspectRatio": "not_disclosed",
        "panelTech": "not_disclosed",
        "resolution": "not_disclosed",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "720p HD 高清前置镜头",
        "windowsHello": "Windows Hello 指纹电源按钮",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "Omnisonic 杜比音效扬声器",
        "audioTech": "not_disclosed",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C 3.2 + 1 × USB-A 3.1",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "not_disclosed",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "长达 15 小时典型使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 39W；标配 39W（型号 1963）",
        "fastCharging": "推荐快充 39W",
        "compatibleKeyboard": "全尺寸 1.3mm 键程键盘 (无背光)",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "机械触控板",
        "tpmChip": "固件 TPM",
        "securedCorePc": "否",
        "biometrics": "指纹识别",
        "enterpriseManage": "支持基础管理",
        "dimensionsMm": "not_disclosed",
        "weightGrams": "2.49 磅（官方未单独披露克重）",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动风扇冷却",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD 模块",
        "warranty": "2 年有限质保",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-go-3"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-go-3-features",
      "segment": "consumer"
    },
    {
      "id": "studio-2-plus",
      "categoryId": "studio",
      "heroImage": "./assets/products/surface-studio-2-plus-hero.png",
      "name": "Surface Studio 2+",
      "nameEn": "Surface Studio 2+",
      "generation": "Studio 2+ (2022)",
      "year": 2022,
      "status": "discontinued",
      "targetAudience": "consumer",
      "flagship": true,
      "tagline": "28 英寸 4500x3000 巨幅创作一体机，零重力铰链与 RTX 3060",
      "specs": {
        "releaseDate": "2022 年 10 月",
        "generation": "Studio 2+",
        "status": "discontinued",
        "targetAudience": "艺术设计工作室、CAD 工程师与高管桌面",
        "tagline": "单指推拉秒变平卧画布，首次加入 3 个雷电 4 端口与杜比视界",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-studio-2-plus-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "Intel 第 11 代酷睿 H35 i7-11370H",
        "cpuArch": "64 位 / 10 nm SuperFin",
        "cpuCores": "not_disclosed",
        "gpuModel": "NVIDIA® GeForce RTX™ 3060",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "32GB DDR4",
        "storageOptions": "1TB 固态硬盘 NVMe SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "28.0 英寸 PixelSense™ 超高清巨幕",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "4500 × 3000 (1350 万像素, 1:1 物理比例)",
        "ppi": "192 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点触控，支持 Microsoft 触控笔协议（MPP）",
        "frontCamera": "1080p 全高清 Windows Hello 摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "杜比全景声 (Dolby Atmos®)",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "3 × 雷电 4 (USB-C) + 2 × USB-A 3.1 + RJ45 千兆网口",
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "surfaceConnect": "not_applicable",
        "wireless": "Wi-Fi 6 + 蓝牙 5.1",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_applicable",
        "batteryLifeOffice": "not_applicable",
        "batteryLifeVideo": "not_applicable",
        "chargingPower": "随附交流电源线供电（官方：USB-C 不接收入站电源）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "随附 Surface 蓝牙键盘、精密鼠标、触控笔",
        "penHapticFeedback": "支持手写",
        "penChargingType": "屏幕边框磁吸收纳",
        "trackpadType": "外接蓝牙鼠标/触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持完整商业管理",
        "dimensionsMm": "637.35 × 438.90 × 12.50；底座 250.00 × 220.00 × 31.45",
        "weightGrams": "9560g (9.56 kg)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "底座三风扇独立双风道冷却",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、底座风扇、电源模块",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-studio-2-plus"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-studio-2-features",
      "segment": "consumer"
    },
    {
      "id": "duo-2",
      "categoryId": "duo",
      "heroImage": "./assets/products/surface-duo-hero.png",
      "name": "Surface Duo 2",
      "nameEn": "Surface Duo 2",
      "generation": "第 2 代 (2021)",
      "year": 2021,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "双屏折叠机，国行未正式发售，规格不按外区数字填",
      "prevGenerationId": "duo-1",
      "specs": {
        "releaseDate": "2021 年 9 月",
        "generation": "第 2 代",
        "status": "legacy",
        "targetAudience": "双屏多任务移动极客",
        "tagline": "双屏折叠机，国行未正式发售，仅保留中文 Support 图示能核对的项",
        "colors": [
          {
            "name": "冰川白",
            "hex": "#f5f5f5",
            "image": "./assets/products/surface-duo-hero.png"
          },
          {
            "name": "曜石黑",
            "hex": "#1e1e1e",
            "image": "./assets/products/surface-duo-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "not_disclosed",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_disclosed",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_disclosed",
        "ramSpec": "not_disclosed",
        "storageOptions": "not_disclosed",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "展开 8.3 英寸双屏",
        "aspectRatio": "not_disclosed",
        "panelTech": "not_disclosed",
        "resolution": "not_disclosed",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 指纹电源按钮",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_disclosed",
        "microphones": "not_disclosed",
        "speakers": "not_disclosed",
        "audioTech": "not_disclosed",
        "headphoneJack": "not_applicable",
        "usbPorts": "1 × USB-C",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_applicable",
        "wireless": "not_disclosed",
        "cellular": "not_disclosed",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "not_disclosed",
        "fastCharging": "not_disclosed",
        "compatibleKeyboard": "屏幕虚拟双屏键盘 / 蓝牙外接",
        "penHapticFeedback": "支持",
        "penChargingType": "配合专属充电保护壳无线充",
        "trackpadType": "触控屏操作",
        "tpmChip": "Android 安全芯片",
        "securedCorePc": "否",
        "biometrics": "指纹识别",
        "enterpriseManage": "Android Enterprise",
        "dimensionsMm": "not_disclosed",
        "weightGrams": "not_disclosed",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "双侧微腔均热板",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-duo-2-features"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-duo-2-features",
      "segment": "consumer"
    },
    {
      "id": "book-3-15",
      "categoryId": "book",
      "heroImage": "./assets/products/surface-book-hero.png",
      "name": "Surface Book 3 15 英寸",
      "nameEn": "Surface Book 3 15-inch",
      "generation": "第 3 代 (2020)",
      "year": 2020,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": true,
      "tagline": "分体式可拆卸肌肉性能本，GTX 1660 Ti Max-Q 独立显卡",
      "specs": {
        "releaseDate": "2020 年 5 月",
        "generation": "第 3 代",
        "status": "legacy",
        "targetAudience": "专业开发者、工程师与图形渲染创作者",
        "tagline": "屏幕一键机械解耦拆卸，85Wh 超大双电池与独立显卡",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-book-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 10 家庭版",
        "cpuModel": "Intel® 第 10 代酷睿™ i7-1065G7",
        "cpuArch": "64 位 / 10 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "NVIDIA GeForce GTX 1660 Ti Max-Q",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB / 32GB LPDDR4x (3733 MT/s)",
        "storageOptions": "256GB / 512GB / 2TB PCIe SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "全尺寸 SDXC 读卡器",
        "screenSize": "15.0 英寸 PixelSense™ 触控屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "3240 × 2160",
        "ppi": "260 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p 全高清前置镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素 1080p 自动对焦后置镜头",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "带杜比全景声 (Dolby Atmos®) 前向立体扬声器",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × USB-A 3.1 Gen 2 + 1 × USB-C 3.1 Gen 2 (支持 USB-PD)",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 (802.11ax) + 蓝牙 5.0 + Xbox Wireless 内置协议",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "常规使用长达 17.5 小时",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 120W；标配 120W（型号 1932）",
        "fastCharging": "推荐快充 120W",
        "compatibleKeyboard": "全尺寸背光独立物理键盘 (带动力肌肉解耦锁)",
        "penHapticFeedback": "不支持",
        "penChargingType": "磁吸在屏幕侧边 (AAAA 电池供电)",
        "trackpadType": "大面积高精度玻璃触控板",
        "tpmChip": "硬件级 TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持完整商业管理",
        "dimensionsMm": "343 × 251 × 23",
        "weightGrams": "1905g (含底座 1.9kg / 单平板部分 817g)",
        "totalWeightWithKeyboard": "1905g（含键盘）",
        "thermalDesign": "双风扇独立散热系统 (屏幕底座双独立风道)",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-book-3-%E7%89%B9%E6%80%A7-e78950d8-3015-4740-97eb-88ff23a7892a"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-3-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "book-3-135",
      "categoryId": "book",
      "heroImage": "./assets/products/surface-book-hero.png",
      "name": "Surface Book 3 13.5 英寸",
      "nameEn": "Surface Book 3 13.5-inch",
      "generation": "第 3 代 (2020)",
      "year": 2020,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "经典分体可拆卸设计，GTX 1650 独显与 3000x2000 超清触控",
      "specs": {
        "releaseDate": "2020 年 5 月",
        "generation": "第 3 代",
        "status": "legacy",
        "targetAudience": "设计创作者与便携性能用户",
        "tagline": "平板与笔记本双重形态无缝切换，搭载 10 代酷睿与 GeForce 独显",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-book-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 10 家庭版",
        "cpuModel": "Intel® 第 10 代酷睿™ i5-1035G7 / i7-1065G7",
        "cpuArch": "64 位 / 10 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® Iris™ Plus / NVIDIA GeForce GTX 1650 Max-Q",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB / 32GB LPDDR4x",
        "storageOptions": "256GB / 512GB / 1TB PCIe NVMe SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "全尺寸 SDXC 读卡器",
        "screenSize": "13.5 英寸 PixelSense™ 触控屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "3000 × 2000",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p 全高清前置镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素 1080p 自动对焦后置镜头",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "前向立体声扬声器，支持杜比全景声",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × USB-A 3.1 + 1 × USB-C 3.1 + SD 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 + 蓝牙 5.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "长达 15.5 小时典型使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "集显最低 60W、标配 60W（型号 1706）；独显最低/标配 95W（型号 1798）",
        "fastCharging": "集显推荐快充 80W；独显 95W",
        "compatibleKeyboard": "全尺寸背光物理键盘",
        "penHapticFeedback": "不支持",
        "penChargingType": "屏幕侧边磁吸",
        "trackpadType": "玻璃精密触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持标准管理",
        "dimensionsMm": "312 × 232 × 23",
        "weightGrams": "1534g (集显) / 1642g (独显) / 平板 718g",
        "totalWeightWithKeyboard": "1534g / 1642g（含键盘）",
        "thermalDesign": "屏幕被动/主动 + 底座独立风扇冷却",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-book-3-%E7%89%B9%E6%80%A7-e78950d8-3015-4740-97eb-88ff23a7892a"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-3-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "book-2-15",
      "categoryId": "book",
      "heroImage": "./assets/products/surface-book-hero.png",
      "name": "Surface Book 2 15 英寸",
      "nameEn": "Surface Book 2 15-inch",
      "generation": "第 2 代 (2017)",
      "year": 2017,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "首款搭载 GTX 1060 强劲独显的 Surface 性能怪兽",
      "specs": {
        "releaseDate": "2017 年 11 月",
        "generation": "第 2 代",
        "status": "legacy",
        "targetAudience": "高性能游戏与图形计算用户",
        "tagline": "配备 8 代酷睿四核与 6GB 显存 GTX 1060，首度引入 USB Type-C 接口",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-book-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_applicable",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "第 8 代英特尔® 酷睿™ i5-8350U / i7-8650U",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® HD Graphics 620 / NVIDIA® GeForce® GTX 1060",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB LPDDR3 (1866 MT/s)",
        "storageOptions": "256GB / 512GB / 1TB PCIe NVMe SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "全尺寸 SDXC 读卡器",
        "screenSize": "15.0 英寸 PixelSense™ 显示屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "3240 × 2160",
        "ppi": "260 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_disclosed",
        "microphones": "双麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × USB-A 3.1 + 1 × USB-C 3.1 Gen 1 + SDXC 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 (802.11ac) + 蓝牙 4.1 + Xbox Wireless",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "长达 17 小时",
        "chargingPower": "最低充电 95W；标配 95W（型号 1798）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "全尺寸背光物理键盘",
        "penHapticFeedback": "不支持",
        "penChargingType": "屏幕磁吸",
        "trackpadType": "玻璃精密触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持标准商业管理",
        "dimensionsMm": "343 × 251 × 23",
        "weightGrams": "1905g (含底座)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "屏幕底座双风道独立风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-book-2-%E7%89%B9%E6%80%A7-e7608730-80d4-4545-a4e6-7b4430e7039f"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-2-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "book-1",
      "categoryId": "book",
      "heroImage": "./assets/products/surface-book-hero.png",
      "name": "Surface Book 初代 (Original)",
      "nameEn": "Surface Book (1st Gen)",
      "generation": "初代 (2015)",
      "year": 2015,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "终极形态颠覆之作，动态支点铰链与肌肉记忆分离机构",
      "specs": {
        "releaseDate": "2015 年 10 月",
        "generation": "初代",
        "status": "legacy",
        "targetAudience": "高端数码先锋与专业创作者",
        "tagline": "微软首款笔记本电脑，创新 Muscle Wire 机械锁与屏幕解耦",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-book-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_applicable",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel® 第 6 代酷睿™ i5 / i7",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® HD Graphics 520 / NVIDIA® GeForce® / GTX 965M",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB LPDDR3",
        "storageOptions": "128GB / 256GB / 512GB / 1TB PCIe SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "全尺寸 SDXC 读卡器",
        "screenSize": "13.5 英寸 PixelSense™ 触控屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "3000 × 2000",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_disclosed",
        "microphones": "双麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × USB-A 3.0 + Mini DisplayPort + SD 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 (802.11ac) + 蓝牙 4.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "长达 12 小时本地视频播放 / Performance Base 长达 16 小时",
        "chargingPower": "集显最低/标配 31W（型号 1625）；独显 60W（型号 1706）；Performance Base 95W（型号 1798）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "全尺寸背光机械锁键盘底座",
        "penHapticFeedback": "不支持",
        "penChargingType": "侧边磁吸 (AAAA 电池)",
        "trackpadType": "高精度玻璃触控板",
        "tpmChip": "TPM 2.0",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持标准管理",
        "dimensionsMm": "312 × 232 × 22.8",
        "weightGrams": "起步 1516g；Performance Base 1647g",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "屏幕与底座分别配备静音风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-1st-gen-specs-and-features"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-1st-gen-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "go-2",
      "categoryId": "go",
      "heroImage": "./assets/products/surface-go-hero.png",
      "name": "Surface Go 2",
      "nameEn": "Surface Go 2",
      "generation": "第 2 代 (2020)",
      "year": 2020,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "边框收窄升级 10.5 英寸全高清屏，544g 极致轻巧二合一",
      "specs": {
        "releaseDate": "2020 年 5 月",
        "generation": "第 2 代",
        "status": "legacy",
        "targetAudience": "移动办公、学生网课与家庭轻度娱乐",
        "tagline": "升级 Core m3 带来 64% 性能飞跃，录音室级别双麦克风",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-go-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 10 家庭版 S 模式",
        "cpuModel": "Intel® Core™ m3-8100Y / Pentium® Gold 4425Y",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics 615",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB LPDDR3",
        "storageOptions": "64GB eMMC / 128GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "10.5 英寸 PixelSense™ 显示屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "1920 × 1280",
        "ppi": "220 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p 全高清前置镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素自动对焦后置镜头",
        "videoFeatures": "not_disclosed",
        "microphones": "双工作室麦克风",
        "speakers": "2W 立体声扬声器，支持杜比音效",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C + 1 × MicroSDXC 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 (802.11ax) + 蓝牙 5.0",
        "cellular": "支持可选 4G LTE Advanced 频段",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "常规日常使用长达 10 小时",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 24W；标配 24W（型号 1735 / 1736）",
        "fastCharging": "推荐快充 30W",
        "compatibleKeyboard": "Surface Go 专业键盘盖",
        "penHapticFeedback": "不支持",
        "penChargingType": "边框磁吸 (AAAA 电池)",
        "trackpadType": "机械触控板",
        "tpmChip": "固件 TPM",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持标准管理",
        "dimensionsMm": "245 × 175 × 8.3",
        "weightGrams": "544g (Wi-Fi 版) / 553g (LTE 版)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "全被动无风扇静音散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-go-2-%E7%89%B9%E6%80%A7-b4d45be0-80a5-48b4-82ab-251f7bb9ca25"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-2-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "go-1",
      "categoryId": "go",
      "heroImage": "./assets/products/surface-go-hero.png",
      "name": "Surface Go 初代 (Original)",
      "nameEn": "Surface Go (1st Gen)",
      "generation": "初代 (2018)",
      "year": 2018,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "开启超小巧便携二合一时代，522g 随行即走办公利器",
      "specs": {
        "releaseDate": "2018 年 8 月",
        "generation": "初代",
        "status": "legacy",
        "targetAudience": "便携差旅、学生与轻度移动办公",
        "tagline": "小身材大智慧，无级支架铰链与经典全尺寸键盘手感",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-go-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel® Pentium® Gold 4415Y",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® HD Graphics 615",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB",
        "storageOptions": "64GB eMMC / 128GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "10.0 英寸 PixelSense™ 显示屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "1800 × 1200",
        "ppi": "217 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_disclosed",
        "microphones": "单个麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C 3.1 + 1 × MicroSDXC 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 (802.11ac) + 蓝牙 4.1",
        "cellular": "not_disclosed",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "Wi-Fi 长达 9 小时本地视频播放 / LTE 长达 8.5 小时",
        "chargingPower": "最低充电 24W；标配 24W（型号 1735 / 1736）",
        "fastCharging": "推荐快充 24W",
        "compatibleKeyboard": "Surface Go 专业键盘盖",
        "penHapticFeedback": "不支持",
        "penChargingType": "边框磁吸 (AAAA 电池)",
        "trackpadType": "机械触控板",
        "tpmChip": "固件 TPM",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持标准管理",
        "dimensionsMm": "245 × 175 × 8.3",
        "weightGrams": "522g (Wi-Fi) / 532g (LTE)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "全被动无风扇静音散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-1st-gen-specs-and-features"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-1st-gen-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "laptop-go-2",
      "categoryId": "laptopgo",
      "heroImage": "./assets/products/surface-laptop-go-3-hero.png",
      "name": "Surface Laptop Go 2",
      "nameEn": "Surface Laptop Go 2",
      "generation": "第 2 代 (2022)",
      "year": 2022,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "11 代酷睿 i5 性能跃升，指纹电源二合一键与清新莫兰迪色",
      "specs": {
        "releaseDate": "2022 年 6 月",
        "generation": "第 2 代",
        "status": "legacy",
        "targetAudience": "高校学生、入门级日常办公与移动便携",
        "tagline": "精致铝合金 A 面与亲肤树脂底壳，国行官方披露 2.48 磅",
        "colors": [
          {
            "name": "仙踪绿",
            "hex": "#8a9a86",
            "image": "./assets/products/surface-laptop-sage.png"
          },
          {
            "name": "冰晶蓝",
            "hex": "#a4c2d6",
            "image": "./assets/products/surface-laptop-sapphire.png"
          },
          {
            "name": "砂岩金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-laptop-dune.png"
          },
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭版",
        "cpuModel": "Intel® 第 11 代酷睿™ i5-1135G7",
        "cpuArch": "64 位 / 10 nm SuperFin",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB / 16GB LPDDR4x",
        "storageOptions": "128GB / 256GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "12.4 英寸 PixelSense™ 触控屏",
        "aspectRatio": "not_disclosed",
        "panelTech": "not_disclosed",
        "resolution": "not_disclosed",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "720p HD 全清视频前置镜头",
        "windowsHello": "Windows Hello 指纹电源按钮",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "Omnisonic 隐藏式扬声器，杜比音效",
        "audioTech": "not_disclosed",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C 3.2 + 1 × USB-A 3.1",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "not_disclosed",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "典型日常使用长达 13.5 小时",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 39W；标配 39W（型号 1963）",
        "fastCharging": "推荐快充 39W",
        "compatibleKeyboard": "全尺寸 1.3mm 舒适键程键盘 (无背光)",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "大面积机械触控板",
        "tpmChip": "固件 TPM",
        "securedCorePc": "认证 Secured-core PC (商业版)",
        "biometrics": "指纹识别",
        "enterpriseManage": "支持标准商业管理",
        "dimensionsMm": "not_disclosed",
        "weightGrams": "2.48 磅（国行 Support 官方口径，未单独披露克重）",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动单风扇静音散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "SSD、键盘 C 面、脚垫",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-laptop-go-2-%E7%89%B9%E6%80%A7-79b8a531-4e78-4eb1-995b-06f15dd64372"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-go-2-features",
      "segment": "consumer"
    },
    {
      "id": "laptop-go-1",
      "categoryId": "laptopgo",
      "heroImage": "./assets/products/surface-laptop-go-3-hero.png",
      "name": "Surface Laptop Go 初代",
      "nameEn": "Surface Laptop Go (1st Gen)",
      "generation": "初代 (2020)",
      "year": 2020,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "1.1kg 极致轻量化触控轻薄本，年轻人第一台 Surface",
      "specs": {
        "releaseDate": "2020 年 10 月",
        "generation": "初代",
        "status": "legacy",
        "targetAudience": "大学新生、轻度文字工作者与日常网课",
        "tagline": "3:2 触控屏下放普及之作，极简现代设计语言",
        "colors": [
          {
            "name": "冰晶蓝",
            "hex": "#a4c2d6",
            "image": "./assets/products/surface-laptop-sapphire.png"
          },
          {
            "name": "砂岩金",
            "hex": "#d2b48c",
            "image": "./assets/products/surface-laptop-dune.png"
          },
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          }
        ],
        "chassisMaterial": "铝 / 聚碳酸酯",
        "kickstandType": "not_applicable",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel® 第 10 代酷睿™ i5-1035G1",
        "cpuArch": "64 位 / 10 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "4GB / 8GB LPDDR4x",
        "storageOptions": "64GB eMMC / 128GB / 256GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "12.4 英寸 PixelSense™ 触控屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "1536 × 1024",
        "ppi": "148 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 指纹电源按钮",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C + 1 × USB-A",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 + 蓝牙 5.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "长达 13 小时典型日常使用",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 39W；标配 39W（型号 1963）",
        "fastCharging": "推荐快充 39W",
        "compatibleKeyboard": "全尺寸键盘 (无背光)",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "大面积触控板",
        "tpmChip": "固件 TPM",
        "securedCorePc": "否",
        "biometrics": "指纹识别",
        "enterpriseManage": "支持标准管理",
        "dimensionsMm": "278 × 206 × 15.7",
        "weightGrams": "1110g (1.11 kg 极轻办公本)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "主动单风扇冷却",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-laptop-go-%E7%89%B9%E6%80%A7-e7e00a9a-3d23-455b-80df-8d0092f69477"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-go-1st-gen-specs-and-features",
      "segment": "consumer"
    },
    {
      "id": "studio-2",
      "categoryId": "studio",
      "heroImage": "./assets/products/surface-studio-2-plus-hero.png",
      "name": "Surface Studio 2",
      "nameEn": "Surface Studio 2",
      "generation": "第 2 代 (2018)",
      "year": 2018,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "4500x3000 巨幅触控画板，GTX 1070 独显专业图形工作站",
      "specs": {
        "releaseDate": "2018 年 10 月",
        "generation": "第 2 代",
        "status": "legacy",
        "targetAudience": "专业数字艺术家、建筑室内设计师与摄影工作流",
        "tagline": "屏幕亮度提升 38%，对比度提升 22%，全固态硬盘疾速读写",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-studio-2-plus-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 10 专业版",
        "cpuModel": "Intel® 第 7 代酷睿™ i7-7820HQ",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "NVIDIA® GeForce® GTX 1060 / GTX 1070",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB / 32GB DDR4 (2400 MT/s)",
        "storageOptions": "1TB / 2TB PCIe NVMe SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "全尺寸 SDXC 读卡器",
        "screenSize": "28.0 英寸 PixelSense™ 巨幅触控显示屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "4500 × 3000 (1350 万像素)",
        "ppi": "192 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB、DCI-P3 与 Vivid",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p 全高清前置镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双麦克风",
        "speakers": "带杜比®音频™的立体声 2.1 扬声器",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "4 × USB-A 3.0 + 1 × USB-C + 千兆以太网口 + SD 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_applicable",
        "wireless": "Wi-Fi 5 (802.11ac) + 蓝牙 4.1 + Xbox Wireless 内置",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_applicable",
        "batteryLifeOffice": "not_applicable",
        "batteryLifeVideo": "not_applicable",
        "chargingPower": "not_disclosed",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "配备 Surface 蓝牙键盘与精准鼠标",
        "penHapticFeedback": "不支持",
        "penChargingType": "屏幕侧边强力磁吸",
        "trackpadType": "外接触控板/鼠标",
        "tpmChip": "TPM 2.0 硬件安全芯片",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持完整商业管理",
        "dimensionsMm": "屏幕 637.35 × 438.90 × 12.50 / 底座 250.00 × 220.00 × 32.20",
        "weightGrams": "9560g (9.56 kg)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "底座低噪音三风扇分离散热系统",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-16",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-studio-2-%E7%89%B9%E6%80%A7-f0b12bc1-0268-4505-ba38-e6d7a46977ef"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-studio-2-features-and-specs",
      "segment": "consumer"
    },
    {
      "id": "studio-1",
      "categoryId": "studio",
      "heroImage": "./assets/products/surface-studio-2-plus-hero.png",
      "name": "Surface Studio 初代 (Original)",
      "nameEn": "Surface Studio (1st Gen)",
      "generation": "初代 (2016)",
      "year": 2016,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "划时代零重力铰链桌面一体机，Surface Dial 梦幻联动",
      "specs": {
        "releaseDate": "2016 年 10 月",
        "generation": "初代",
        "status": "legacy",
        "targetAudience": "创意工作室、工业设计机构与数字艺术总监",
        "tagline": "12.5mm 全球最薄桌面液晶显示屏，一指按压推倒变身绘图桌",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-studio-2-plus-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel® 第 6 代酷睿™ i5 / i7",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "NVIDIA® GeForce® GTX 965M / GTX 980M",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB / 16GB / 32GB DDR4",
        "storageOptions": "64GB SSD + 1TB HDD / 128GB SSD + 1TB HDD / 128GB SSD + 2TB HDD 混合硬盘",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "全尺寸 SDXC 读卡器",
        "screenSize": "28.0 英寸 PixelSense™ 巨幕触控屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "4500 × 3000 (1350 万像素)",
        "ppi": "192 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB、DCI-P3 与鲜艳色彩",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "not_disclosed",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "4 × USB-A 3.0 + Mini DisplayPort + 千兆网口 + SD 卡槽",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_applicable",
        "wireless": "Wi-Fi 5 + 蓝牙 4.0 + Xbox Wireless",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_applicable",
        "batteryLifeOffice": "not_applicable",
        "batteryLifeVideo": "not_applicable",
        "chargingPower": "not_disclosed",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "配赠 Surface 蓝牙键盘与无线鼠标",
        "penHapticFeedback": "不支持",
        "penChargingType": "屏幕磁吸",
        "trackpadType": "外接鼠标",
        "tpmChip": "TPM 2.0 硬件芯片",
        "securedCorePc": "否",
        "biometrics": "人脸识别",
        "enterpriseManage": "支持标准商业管理",
        "dimensionsMm": "屏幕 637.35 × 438.90 × 12.5 / 底座 250 × 220 × 32.2",
        "weightGrams": "9560g (9.56 kg)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "底座静音双风扇独立风道散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-studio-1st-gen-diagrams-and-tech-specs"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-studio-1st-gen-diagrams-and-tech-specs",
      "segment": "consumer"
    },
    {
      "id": "hub-2s",
      "categoryId": "studio",
      "heroImage": "./assets/products/surface-hub-2s-hero.png",
      "name": "Surface Hub 2S (50\" / 85\")",
      "nameEn": "Surface Hub 2S",
      "generation": "Hub 2S (2019/2021)",
      "year": 2019,
      "status": "legacy",
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "50/85 英寸企业级智能巨幕白板与协作视讯终端，模块化升级",
      "specs": {
        "releaseDate": "2019 年 4 月",
        "generation": "Hub 2S",
        "status": "legacy",
        "targetAudience": "跨国跨地企业董事会议室与团队协作空间",
        "tagline": "移动推车自由漫游，Steelcase 移动电池与可插拔计算卡带",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-hub-2s-hero.png"
          }
        ],
        "chassisMaterial": "精密加工铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "Intel® 第 8 代酷睿™ i5 四核",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics 620",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_disclosed",
        "ramSpec": "8GB",
        "storageOptions": "128GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "50.0 英寸 / 85.0 英寸 PixelSense™ 巨幅交互屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "50 英寸 3840 × 2560 / 85 英寸 3840 × 2160",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "50 英寸典型 350 nits / 85 英寸典型 280 nits",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "not_disclosed",
        "windowsHello": "not_disclosed",
        "rearCamera": "not_applicable",
        "videoFeatures": "4K 会议自动白平衡与视讯调教",
        "microphones": "8 元素 MEMS 麦克风阵列",
        "speakers": "not_disclosed",
        "audioTech": "not_disclosed",
        "headphoneJack": "not_applicable",
        "usbPorts": "4 × USB-C + 1 × USB-A + HDMI 输入 + Mini-DP + 千兆 RJ45",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_applicable",
        "wireless": "Wi-Fi 5 + 蓝牙 4.1（50 英寸）/ 5.0（85 英寸）+ Miracast",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_applicable",
        "batteryLifeOffice": "not_applicable",
        "batteryLifeVideo": "not_applicable",
        "chargingPower": "交流电 90–265 V；运行功耗 445 W（官方 Learn）",
        "fastCharging": "not_applicable",
        "compatibleKeyboard": "支持标准蓝牙无线键鼠",
        "penHapticFeedback": "不支持",
        "penChargingType": "磁吸在巨幕边框 (内置电池供电)",
        "trackpadType": "外接鼠标/屏幕直接点控",
        "tpmChip": "硬件级 TPM 2.0 企业安全芯片",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "指纹识别 (可选外接模块)",
        "enterpriseManage": "支持 Microsoft Endpoint Manager & Intune 集中云纳管",
        "dimensionsMm": "741 × 1097 × 76 (50 英寸单屏尺寸)",
        "weightGrams": "50 英寸 28 kg / 85 英寸 84 kg",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "多风扇贯流低噪散热架构",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "Compute Cartridge 核心计算核心板、摄像头、扬声器",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-2s-techspecs"
      },
      "isCommercial": true,
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-2s-techspecs",
      "segment": "commercial"
    },
    {
      "id": "duo-1",
      "categoryId": "duo",
      "heroImage": "./assets/products/surface-duo-hero.png",
      "name": "Surface Duo 初代 (Original)",
      "nameEn": "Surface Duo (1st Gen)",
      "generation": "初代 (2020)",
      "year": 2020,
      "status": "legacy",
      "targetAudience": "consumer",
      "flagship": false,
      "tagline": "4.8mm 超薄双屏移动设备，开启双屏多任务移动探索",
      "specs": {
        "releaseDate": "2020 年 9 月",
        "generation": "初代",
        "status": "legacy",
        "targetAudience": "移动极客与双屏尝鲜用户",
        "tagline": "革命性 360 度双轴铰链，双 5.6 英寸 AMOLED 屏展开达 8.1 英寸",
        "colors": [
          {
            "name": "冰川白",
            "hex": "#f5f5f5",
            "image": "./assets/products/surface-duo-hero.png"
          }
        ],
        "chassisMaterial": "康宁® 大猩猩® 玻璃",
        "kickstandType": "not_applicable",
        "osAtLaunch": "not_disclosed",
        "cpuModel": "高通骁龙™ 855 移动平台",
        "cpuArch": "Qualcomm Kryo™ 485 64 位 / 7nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_disclosed",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_disclosed",
        "ramSpec": "6GB DRAM",
        "storageOptions": "128GB / 256GB UFS 3.0",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "双 5.6 英寸 AMOLED 展开为 8.1 英寸",
        "aspectRatio": "3:2",
        "panelTech": "AMOLED",
        "resolution": "展开 2700 × 1800",
        "ppi": "401 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "not_disclosed",
        "windowsHello": "指纹读取器",
        "rearCamera": "not_disclosed",
        "videoFeatures": "4K@60fps 视频录制",
        "microphones": "双麦克风",
        "speakers": "not_disclosed",
        "audioTech": "not_disclosed",
        "headphoneJack": "not_applicable",
        "usbPorts": "1 × USB-C 3.1 Gen 2",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_applicable",
        "wireless": "Wi-Fi 5 + 蓝牙 5.0",
        "cellular": "not_disclosed",
        "batteryCapacityWh": "3577 mAh（典型，双电芯）",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "长达 15.5 小时本地视频播放",
        "chargingPower": "标配 18W USB-C 电源",
        "fastCharging": "not_disclosed",
        "compatibleKeyboard": "屏幕虚拟键盘或外接蓝牙键盘",
        "penHapticFeedback": "不支持",
        "penChargingType": "磁吸外壳充电保护套",
        "trackpadType": "屏幕触控",
        "tpmChip": "安全固件",
        "securedCorePc": "否",
        "biometrics": "指纹识别",
        "enterpriseManage": "支持 Microsoft Intune 移动设备纳管",
        "dimensionsMm": "展开 145.2 × 186.9 × 4.8 / 闭合 145.2 × 93.3 × 9.9",
        "weightGrams": "250g (极其超薄)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "石墨散热片被动散热",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-duo-1st-gen-features-and-specs"
      },
      "isCommercial": false,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-duo-1st-gen-features-and-specs",
      "segment": "consumer"
    },
    {
      "id": "pro-12-inch-biz",
      "categoryId": "pro",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-pro-12-platinum.png",
      "name": "Surface Pro 12 英寸 (第 1 代) 商用版",
      "nameEn": "Surface Pro for Business 12-inch (1st Edition)",
      "systemSku": "Surface_Pro_for_Business_12in_1st_Ed_with_Snapdragon_2109",
      "generation": "第 1 代 (2025)",
      "year": 2025,
      "status": "current_cn",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "轻巧灵动，专为企业移动办公与现场作业打造的 12 英寸 Copilot+ PC 商用平板",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-12-inch-for-business",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-copilot-plus-pc-12inch-tech-specs",
      "specs": {
        "thunderboltSupport": "not_applicable",
        "releaseDate": "2025 年 5 月",
        "generation": "第 1 代 (2025)",
        "status": "current_cn",
        "targetAudience": "政企采购与商业客户",
        "tagline": "轻巧灵动，专为企业移动办公与现场作业打造的 12 英寸 Copilot+ PC 商用平板",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-pro-12-platinum.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "高通骁龙® X Plus (8 核) 处理器",
        "cpuArch": "Qualcomm Oryon™ 64 位",
        "cpuCores": "8 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™ (45 TOPS)",
        "npuTops": "45 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 24GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB（UFS）",
        "ssdRemovable": "not_applicable",
        "expandableStorage": "not_applicable",
        "screenSize": "12.0 英寸 PixelSense™",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "LCD",
        "resolution": "2196 × 1464",
        "ppi": "220 PPI",
        "refreshRate": "最高 90Hz（默认 60Hz）",
        "brightness": "SDR 最大 400 尼特（典型值）",
        "colorSupport": "sRGB 与增强型，对比度 1200:1",
        "touchAndPenProtocol": "10 点触控，Microsoft Pen Protocol，支持超薄触控笔触觉反馈",
        "frontCamera": "1080p 全高清 Surface Studio 镜头",
        "windowsHello": "支持 Windows Hello 人脸识别与 ESS",
        "rearCamera": "1000 万像素 Ultra HD 后置摄像头",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "2W 立体声扬声器，支持杜比全景声",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "not_applicable",
        "usbCPorts": "2 × USB-C® / USB 3.2：充电、数据、DisplayPort 1.4a（最多两台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞",
        "usbAPorts": "not_applicable",
        "surfaceConnect": "not_applicable",
        "videoOut": "DisplayPort 1.4a，最多两台 4K 60Hz",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "Bluetooth® 5.4",
        "nfc": "支持 NFC 身份认证",
        "batteryCapacity": "38 Wh（额定；最小 37 Wh）",
        "batteryLifeVideo": "本地视频播放长达 16 小时",
        "batteryLifeOffice": "网页浏览长达 12 小时",
        "charger": "最低充电 27W USB-C；选配/标配 45W USB-C（型号 2105）",
        "fastCharging": "推荐快充 45W",
        "keyboardCompat": "Surface Pro 12 英寸键盘盖",
        "penCompat": "Surface 超薄触控笔（第 2 版），机身背面吸附充电",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "Microsoft Pluton TPM 2.0",
        "biometrics": "Windows Hello 人脸识别；NFC 身份认证",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "274 mm × 190 mm × 7.8 mm",
        "weightGrams": "686 克 (裸机重量)",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥9,788 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-12-inch-for-business",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-12-inch-for-business-configurate",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "laptop-13-inch-biz",
      "categoryId": "laptop",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop 13 英寸 (第 1 代) 商用版",
      "nameEn": "Surface Laptop for Business 13-inch (1st Edition)",
      "systemSku": "Surface_Laptop_for_Business_13in_1st_Ed_with_Snapdragon_2095",
      "generation": "第 1 代 (2025)",
      "year": 2025,
      "status": "current_cn",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业轻巧触控本：13 英寸 PixelSense，1.22kg，本地视频续航长达 23 小时",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-13-inch-for-business",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-copilot-plus-pc-13inch-tech-specs",
      "specs": {
        "thunderboltSupport": "not_applicable",
        "releaseDate": "2025 年 5 月",
        "generation": "第 1 代 (2025)",
        "status": "current_cn",
        "targetAudience": "政企采购与商业客户",
        "tagline": "企业轻巧触控本：13 英寸 PixelSense，1.22kg，本地视频续航长达 23 小时",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "高通骁龙® X Plus (8 核) 处理器",
        "cpuArch": "Qualcomm Oryon™ 64 位",
        "cpuCores": "8 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™ (45 TOPS)",
        "npuTops": "45 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 24GB LPDDR5x",
        "storageOptions": "256GB（UFS） / 512GB（UFS） / 1TB 可拆卸第 4 代 SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "1920 × 1280",
        "ppi": "178 PPI",
        "refreshRate": "60Hz",
        "brightness": "最大 400 尼特（典型值）",
        "colorSupport": "sRGB 与增强型，对比度 1000:1",
        "touchAndPenProtocol": "10 点触控，不支持触控笔",
        "frontCamera": "1080p 全高清 Surface Studio 镜头",
        "windowsHello": "Windows Hello 指纹电源按钮",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "Omnisonic® 扬声器，Dolby Audio™",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机音频孔",
        "usbCPorts": "2 × USB-C® / USB 3.2：充电、数据、DisplayPort 1.4a（最多两台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.1",
        "usbAPorts": "1 个 USB-A 3.1 端口",
        "surfaceConnect": "not_applicable",
        "videoOut": "DisplayPort 1.4a，最多两台 4K 60Hz",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "Bluetooth® 5.4",
        "nfc": "not_applicable",
        "batteryCapacity": "50 Wh（额定；最小 48 Wh）",
        "batteryLifeVideo": "本地视频播放长达 23 小时",
        "batteryLifeOffice": "网页浏览长达 16 小时",
        "charger": "标配 45W USB-C（型号 2105）；最低充电 45W",
        "fastCharging": "推荐快充 60W",
        "keyboardCompat": "一体式背光键盘",
        "penCompat": "not_applicable",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "Microsoft Pluton TPM 2.0",
        "biometrics": "Windows Hello 指纹电源按钮",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "285.65 mm × 214.14 mm × 15.6 mm",
        "weightGrams": "1.22 千克 (2.7 磅)",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥10,788 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-13-inch-for-business",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-13-inch-for-business-configurate",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "pro-11-biz-snap",
      "categoryId": "pro",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-new-pro-hero.png",
      "name": "Surface Pro (第 11 代) 商用版 - 骁龙版",
      "nameEn": "Surface Pro for Business (11th Edition) - Snapdragon",
      "systemSku": "Surface_Pro_11th_Edition_For_Business_2085",
      "generation": "第 11 代 (2024)",
      "year": 2024,
      "status": "current_cn",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业 AI PC 创新先锋：高通骁龙 X 架构、45 TOPS 端侧 AI 算力与防眩光 OLED 触控屏",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-snapdragon-tech-specs",
      "specs": {
        "thunderboltSupport": "USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）",
        "releaseDate": "2024 年 5 月",
        "generation": "第 11 代 (2024)",
        "status": "current_cn",
        "targetAudience": "政企采购与商业客户",
        "tagline": "企业 AI PC：骁龙® X Plus / X Elite，45 TOPS，本地视频续航长达 14 小时",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-new-pro-hero.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-new-pro-hero.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "高通骁龙® X Plus（10 核） / X Elite（12 核）",
        "cpuArch": "Qualcomm Oryon™ 64 位",
        "cpuCores": "10 核 / 12 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™ (45 TOPS)",
        "npuTops": "45 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 SSD",
        "ssdRemovable": "支持 (官方快拆 SSD)",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "120Hz 动态自适应刷新率",
        "brightness": "600 nits / 900 nits HDR",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点触控，Microsoft Pen Protocol",
        "frontCamera": "1440p 四倍高清超广角 Surface Studio 镜头",
        "windowsHello": "支持 Windows Hello 人脸识别与 ESS",
        "rearCamera": "1000 万像素超高清镜头",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "支持 Dolby Atmos® 的 2W 立体声扬声器",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "not_applicable",
        "usbCPorts": "2 × USB-C® / USB4®：充电、数据、DisplayPort 1.4a、兼容 Surface Thunderbolt™ 4 扩展坞",
        "usbAPorts": "not_applicable",
        "surfaceConnect": "支持",
        "videoOut": "支持外部 4K 显示器",
        "cellular": "可选 5G 或 Wi-Fi",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "Bluetooth® 5.4",
        "nfc": "支持（传感器级 NFC）",
        "batteryCapacity": "LCD 47 Wh（额定；最小 46） / OLED 53 Wh（额定；最小 51）",
        "batteryLifeVideo": "本地视频播放长达 14 小时（Wi-Fi）",
        "batteryLifeOffice": "网页浏览长达 10 小时（Wi-Fi）",
        "charger": "标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W",
        "fastCharging": "推荐快充 65W（国行第 11 代骁龙表）",
        "keyboardCompat": "Surface Pro 键盘盖",
        "penCompat": "Surface 超薄触控笔",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "Microsoft Pluton / TPM 2.0",
        "biometrics": "Windows Hello 人脸识别",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "287 mm × 209 mm × 9.3 mm",
        "weightGrams": "895 克",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥11,239 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "pro-11-biz-intel",
      "categoryId": "pro",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-new-pro-hero.png",
      "name": "Surface Pro (第 11 代) 商用版 - Intel 版",
      "nameEn": "Surface Pro for Business (11th Edition) with Intel",
      "systemSku": "Surface_Pro_11th_Edition_With_Intel_For_Business_2103",
      "generation": "第 11 代 (2024)",
      "year": 2024,
      "status": "current_cn",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业级标压 x86 生产力旗舰：搭载英特尔酷睿 Ultra 处理器，支持雷电 4 与 NFC 免密打卡",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business-intel",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-intel-tech-specs",
      "specs": {
        "thunderboltSupport": "USB4® / Thunderbolt™ 4",
        "releaseDate": "2024 年 9 月",
        "generation": "第 11 代 (2024)",
        "status": "current_cn",
        "targetAudience": "政企采购与商业客户",
        "tagline": "英特尔® 酷睿™ Ultra 5 236V/238V / Ultra 7 266V/268V（第 2 代），40/48 TOPS，本地视频 14 小时",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-new-pro-hero.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-new-pro-hero.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "一体式支架，165 度全阻尼铰链",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "英特尔® 酷睿™ Ultra 5 处理器 236V / 238V；Ultra 7 处理器 266V / 268V（第 2 代）",
        "cpuArch": "64 位 / TSMC N3B",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® Arc™ 显卡",
        "npuModel": "Intel® AI Boost（Ultra 5：40 TOPS / Ultra 7：48 TOPS）",
        "npuTops": "40 TOPS（Ultra 5） / 48 TOPS（Ultra 7）",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 SSD",
        "ssdRemovable": "支持 (官方快拆 SSD)",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "120Hz 动态自适应刷新率",
        "brightness": "LCD SDR 最大 600 尼特；OLED HDR 峰值 900 尼特",
        "colorSupport": "sRGB / Vivid；OLED 另支持 HDR",
        "touchAndPenProtocol": "10 点触控，Microsoft Pen Protocol（超薄触控笔第 2 版）",
        "frontCamera": "1440p Quad HD 超广角 Surface Studio 镜头",
        "windowsHello": "支持 Windows Hello 人脸识别与 ESS",
        "rearCamera": "1000 万像素超高清镜头",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "支持 Dolby Atmos® 的 2W 立体声扬声器",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "not_applicable",
        "usbCPorts": "2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多两台 4K）、兼容 Surface Thunderbolt™ 4 扩展坞",
        "usbAPorts": "not_applicable",
        "surfaceConnect": "支持",
        "videoOut": "最多支持 2 台 4K 60Hz 显示器",
        "cellular": "not_disclosed",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "Bluetooth® 5.4",
        "nfc": "支持（NFC 身份认证）",
        "batteryCapacity": "LCD 47 Wh（额定；最小 46） / OLED 53 Wh（额定；最小 51）",
        "batteryLifeVideo": "本地视频播放长达 14 小时",
        "batteryLifeOffice": "网页浏览长达 10 小时",
        "charger": "标配 39W Surface Connect 电源（特定配置，型号 1963）；最低充电 39W",
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "keyboardCompat": "Surface Pro 键盘盖",
        "penCompat": "Surface 超薄触控笔",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "Microsoft Pluton / TPM 2.0",
        "biometrics": "Windows Hello 人脸识别",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "287 mm × 209 mm × 9.3 mm",
        "weightGrams": "872 克",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥14,488 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business-intel",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business-intel",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "laptop-7-biz-snap",
      "categoryId": "laptop",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop (第 7 代) 商用版 - 骁龙版",
      "nameEn": "Surface Laptop for Business (7th Edition) - Snapdragon",
      "systemSku": "Surface_Laptop_7th_Edition_For_Business_2036",
      "generation": "第 7 代 (2024)",
      "year": 2024,
      "status": "current_cn",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业触控本革新之作：超窄边框 120Hz 触控屏、高通骁龙 X 架构与长达 22 小时日常续航",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-snapdragon-tech-specs",
      "specs": {
        "thunderboltSupport": "USB4®（兼容 Surface Thunderbolt™ 4 扩展坞）",
        "releaseDate": "2024 年 5 月",
        "generation": "第 7 代 (2024)",
        "status": "current_cn",
        "targetAudience": "政企采购与商业客户",
        "tagline": "骁龙® X Plus / X Elite，45 TOPS；13.8 英寸本地视频 20 小时，15 英寸 22 小时",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-new-laptop-hero.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-new-laptop-hero.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "13.8 英寸：骁龙® X Plus（10 核） / X Elite（12 核）；15 英寸：骁龙® X Elite（12 核）",
        "cpuArch": "Qualcomm Oryon™ 64 位",
        "cpuCores": "10 核 / 12 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™ (45 TOPS)",
        "npuTops": "45 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 SSD",
        "ssdRemovable": "支持 (官方快拆 SSD)",
        "expandableStorage": "15 英寸配备 MicroSDXC 读卡器",
        "screenSize": "13.8 英寸 / 15.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "2304 × 1536 (13.8\") / 2496 × 1664 (15\")",
        "ppi": "201 PPI",
        "refreshRate": "120Hz 动态自适应刷新率",
        "brightness": "600 nits",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点触控，不支持触控笔",
        "frontCamera": "1080p 全高清 Surface Studio 镜头",
        "windowsHello": "支持 Windows Hello 人脸识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "Omnisonic® 扬声器，支持 Dolby® Atmos®",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机音频孔",
        "usbCPorts": "2 × USB-C® / USB4®：充电、数据、DisplayPort 2.1、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.1；15 英寸另有 MicroSDXC 读卡器",
        "usbAPorts": "1 个 USB-A 3.1",
        "surfaceConnect": "支持",
        "videoOut": "支持外部 4K 60Hz 显示器",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "Bluetooth® 5.4",
        "nfc": "not_applicable",
        "batteryCapacity": "13.8 英寸 54 Wh（额定；最小 52） / 15 英寸 66 Wh（额定；最小 64）",
        "batteryLifeVideo": "13.8 英寸本地视频长达 20 小时；15 英寸长达 22 小时",
        "batteryLifeOffice": "13.8 英寸网页浏览长达 13 小时；15 英寸长达 15 小时",
        "charger": "13.8 英寸标配 39W（型号 1963）；15 英寸标配 65W；最低充电 39W / 45W",
        "fastCharging": "推荐快充 65W（国行第 7 代骁龙表）",
        "keyboardCompat": "一体式背光键盘",
        "penCompat": "not_applicable",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "Microsoft Pluton / TPM 2.0",
        "biometrics": "Windows Hello 人脸识别",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "301 mm × 220 mm × 17.5 mm (13.8\")",
        "weightGrams": "1.34 千克 (13.8\") / 1.66 千克 (15\")",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥11,329 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "laptop-7-biz-intel",
      "categoryId": "laptop",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-new-laptop-hero.png",
      "name": "Surface Laptop (第 7 代) 商用版 - Intel 版",
      "nameEn": "Surface Laptop for Business (7th Edition) with Intel",
      "systemSku": "Surface_Laptop_7th_Edition_With_Intel_For_Business_2107",
      "generation": "第 7 代 (2024)",
      "year": 2024,
      "status": "current_cn",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业级全功能触控轻薄本：英特尔酷睿 Ultra 处理器、雷电 4 高速拓展与可选智能卡读卡器",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business-intel",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-intel-tech-specs",
      "specs": {
        "thunderboltSupport": "USB4® / Thunderbolt™ 4",
        "releaseDate": "2024 年 9 月",
        "generation": "第 7 代 (2024)",
        "status": "current_cn",
        "targetAudience": "政企采购与商业客户",
        "tagline": "英特尔® 酷睿™ Ultra 5 236V/238V / Ultra 7 266V/268V（第 2 代），40/48 TOPS；13.8 英寸本地视频 20 小时，15 英寸 22 小时",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-new-laptop-hero.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-new-laptop-hero.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "英特尔® 酷睿™ Ultra 5 处理器 236V / 238V；Ultra 7 处理器 266V / 268V（第 2 代）",
        "cpuArch": "64 位 / TSMC N3B",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® Arc™ 显卡",
        "npuModel": "Intel® AI Boost（Ultra 5：40 TOPS / Ultra 7：48 TOPS）",
        "npuTops": "40 TOPS（Ultra 5） / 48 TOPS（Ultra 7）",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "16GB / 32GB LPDDR5x",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 SSD",
        "ssdRemovable": "支持 (官方快拆 SSD)",
        "expandableStorage": "15 英寸配备 MicroSDXC Express 读卡器",
        "screenSize": "13.8 英寸 / 15.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2 黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "2304 × 1536 (13.8\") / 2496 × 1664 (15\")",
        "ppi": "201 PPI",
        "refreshRate": "120Hz 动态自适应刷新率",
        "brightness": "SDR 最大 600 尼特（典型值）",
        "colorSupport": "sRGB 与 Vivid，自适应色彩",
        "touchAndPenProtocol": "10 点触控，不支持触控笔",
        "frontCamera": "1080p 全高清 Surface Studio 镜头",
        "windowsHello": "支持 Windows Hello 人脸识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "Omnisonic® 扬声器，支持 Dolby Atmos®",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机音频孔",
        "usbCPorts": "2 × USB-C®（USB4® / Thunderbolt™ 4）：充电、数据、DisplayPort 2.1（最多两台 4K）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.1；15 英寸另有 MicroSDXC Express",
        "usbAPorts": "1 个 USB-A 3.1",
        "surfaceConnect": "支持",
        "videoOut": "最多支持 2 台 4K 60Hz 显示器",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 7 (802.11be)",
        "bluetooth": "Bluetooth® 5.4",
        "nfc": "not_applicable",
        "batteryCapacity": "13.8 英寸 54 Wh（额定；最小 52） / 15 英寸 66 Wh（额定；最小 64）",
        "batteryLifeVideo": "13.8 英寸本地视频长达 20 小时；15 英寸长达 22 小时",
        "batteryLifeOffice": "13.8 英寸网页浏览长达 12 小时；15 英寸长达 14 小时",
        "charger": "13.8 英寸标配 39W；15 英寸标配 65W；最低充电 39W / 45W",
        "fastCharging": "推荐快充 60W（国行：65W Surface 电源或 60W USB-C PD）",
        "keyboardCompat": "一体式背光键盘",
        "penCompat": "not_applicable",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface Thunderbolt™ 4 扩展坞",
        "tpm": "Microsoft Pluton / TPM 2.0",
        "biometrics": "Windows Hello 人脸识别",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器；15 英寸部分型号集成智能卡读卡器",
        "dimensions": "13.8 英寸 301 × 220 × 17.5 mm；15 英寸 329 × 239 × 18.26 mm",
        "weightGrams": "1.35 千克 (13.8\") / 1.66 千克 (15\") / 1.65 千克 (15\" 智能卡)",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥14,488 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business-intel",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business-intel",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "hub-3",
      "categoryId": "hub",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-hub-2s-hero.png",
      "name": "Surface Hub 3 (50\" / 85\")",
      "nameEn": "Surface Hub 3 (50-inch & 85-inch)",
      "systemSku": "Surface Hub 3 50 / Surface Hub 3 85",
      "generation": "第 3 代 (2023)",
      "year": 2023,
      "status": "current_cn",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "微软官方巨幕协作一体机旗舰：支持屏幕 90° 旋转竖屏协作、智能人脸追踪与原生 Teams 会议室体验",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-3-techspecs",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-3-techspecs",
      "specs": {
        "releaseDate": "2023 年 10 月",
        "generation": "第 3 代 (2023)",
        "status": "current_cn",
        "targetAudience": "政企采购与商业客户",
        "tagline": "微软官方巨幕协作一体机旗舰：支持屏幕 90° 旋转竖屏协作、智能人脸追踪与原生 Teams 会议室体验",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-hub-2s-hero.png"
          }
        ],
        "chassisMaterial": "精密加工铝与矿物复合树脂",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 IoT Enterprise（Microsoft Teams Rooms on Windows；可另配 Windows 11 专业版/企业版映像）",
        "cpuModel": "英特尔® 酷睿™ i5（Surface Hub 3 计算模块）",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "32GB",
        "storageOptions": "512GB 可拆卸 SSD",
        "ssdRemovable": "支持（计算模块内可拆卸 SSD）",
        "expandableStorage": "not_applicable",
        "screenSize": "50.0 英寸 (3:2) / 85.0 英寸 (16:9)",
        "aspectRatio": "3:2 (50\") / 16:9 (85\")",
        "panelTech": "not_disclosed",
        "resolution": "3840 × 2560 (50\") / 3840 × 2160 (85\")",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "50 英寸：10 点触控 + 双笔；85 英寸：20 点触控 + 双笔",
        "frontCamera": "Surface Hub Smart Camera，4K，136° 水平视场（USB-C 定制接口）",
        "windowsHello": "not_disclosed",
        "rearCamera": "not_applicable",
        "videoFeatures": "Teams 会议室体验；Smart AV 随横竖屏优化音频",
        "microphones": "8 元素 MEMS 麦克风阵列",
        "speakers": "三路立体声（中音 + 高音 + 后置低音）",
        "audioTech": "not_disclosed",
        "headphoneJack": "not_applicable",
        "usbCPorts": "50 英寸：4 个 USB-C（含摄像头口）；85 英寸：3 个 USB-C（屏幕）+ 计算模块 USB-C DisplayPort 输入",
        "usbAPorts": "计算模块 1 个 USB-A；85 英寸屏幕另有 1 个 USB-A",
        "surfaceConnect": "not_applicable",
        "thunderboltSupport": "not_applicable",
        "videoOut": "Mini-DisplayPort 视频输出（Windows 10/11 专业版/企业版模式下）",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 5 (IEEE 802.11ac)",
        "bluetooth": "Bluetooth® 5.1",
        "nfc": "not_applicable",
        "batteryCapacity": "not_applicable",
        "batteryLifeVideo": "not_applicable",
        "batteryLifeOffice": "not_applicable",
        "charger": "交流电 100–240 V；50 英寸运行功耗 445 W，85 英寸 665 W",
        "fastCharging": "not_applicable",
        "keyboardCompat": "not_applicable",
        "penCompat": "Surface Hub 触控笔（标配）；亦兼容 Surface 超薄触控笔 / 超薄触控笔第 2 版",
        "dialCompat": "not_applicable",
        "dockCompat": "not_applicable",
        "tpm": "TPM 2.0",
        "biometrics": "not_disclosed",
        "securityFeatures": "TPM 2.0",
        "dimensions": "50 英寸 741 × 1097 × 76 mm；85 英寸 1130 × 1959 × 85.6 mm",
        "weightGrams": "28 kg (50\") / 84 kg (85\")",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "计算模块、Smart Camera、触控笔可现场更换",
        "warranty": "1 年有限硬件保修（Microsoft Learn）",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-3-techspecs",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/blog/blog-surface/surface-hub-3-commercial",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "laptop-go-3-biz",
      "categoryId": "laptopgo",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-laptop-go-3-hero.png",
      "name": "Surface Laptop Go 3 商用版",
      "nameEn": "Surface Laptop Go 3 for Business",
      "systemSku": "Surface_Laptop_Go_3_2013",
      "generation": "第 3 代 (2023)",
      "year": 2023,
      "status": "discontinued",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业极具性价比的轻便商务本：12.4 英寸全能触控屏、2.49 磅轻便机身与 Windows 11 专业版",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-go-3-for-business",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-go-3-features",
      "specs": {
        "thunderboltSupport": "not_applicable",
        "releaseDate": "2023 年 10 月",
        "generation": "第 3 代 (2023)",
        "status": "discontinued",
        "targetAudience": "政企采购与商业客户",
        "tagline": "企业极具性价比的轻便商务本：12.4 英寸全能触控屏、2.49 磅轻便机身与 Windows 11 专业版",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-go-3-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "第 12 代英特尔® 酷睿™ i5-1235U 处理器",
        "cpuArch": "64 位 / Intel 7",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "8GB / 16GB LPDDR5",
        "storageOptions": "128GB UFS / 256GB / 512GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "12.4 英寸 PixelSense™",
        "aspectRatio": "not_disclosed",
        "panelTech": "not_disclosed",
        "resolution": "not_disclosed",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "720p 高清前置摄像头",
        "windowsHello": "Windows Hello 指纹电源按钮",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "Omnisonic® 扬声器 (杜比音效)",
        "audioTech": "not_disclosed",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbCPorts": "1 个 USB-C® 3.2",
        "usbAPorts": "1 个 USB-A 3.1",
        "surfaceConnect": "配备 Surface Connect",
        "videoOut": "支持外部显示器",
        "cellular": "not_applicable",
        "wifi": "not_disclosed",
        "wireless": "not_disclosed",
        "bluetooth": "Bluetooth® 5.1",
        "nfc": "not_applicable",
        "batteryCapacity": "not_disclosed",
        "batteryLifeVideo": "not_disclosed",
        "batteryLifeOffice": "最长 15 小时典型使用",
        "charger": "最低充电 39W；标配 39W（型号 1963）",
        "fastCharging": "推荐快充 39W",
        "keyboardCompat": "一体式背光键盘",
        "penCompat": "not_applicable",
        "dialCompat": "not_disclosed",
        "dockCompat": "not_disclosed",
        "tpm": "硬件 TPM 2.0",
        "biometrics": "部分配置电源键指纹 + Windows Hello",
        "securityFeatures": "Secured-core PC，BitLocker",
        "dimensions": "not_disclosed",
        "weightGrams": "2.49 磅（官方未单独披露克重）",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "not_disclosed",
        "warranty": "2 年有限硬件保修",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-go-3-for-business",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-go-3-for-business",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "pro-9-biz",
      "categoryId": "pro",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-pro-9-hero.png",
      "name": "Surface Pro 9 商用版",
      "nameEn": "Surface Pro 9 for Business",
      "systemSku": "Surface_Pro_9_for_Business_2038",
      "generation": "第 9 代 (2022)",
      "year": 2022,
      "status": "discontinued",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业经典标压二合一：第 12 代英特尔酷睿 vPro 处理器、Thunderbolt 4 高速双接口与可拆卸 rSSD",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-pro-9-for-business",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-pro-9-features-and-specs",
      "specs": {
        "releaseDate": "2022 年 10 月",
        "generation": "第 9 代 (2022)",
        "status": "discontinued",
        "targetAudience": "政企采购与商业客户",
        "tagline": "企业经典标压二合一：第 12 代英特尔酷睿 vPro 处理器、Thunderbolt 4 高速双接口与可拆卸 rSSD",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-new-pro-hero.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-new-pro-hero.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "第 12 代英特尔® 酷睿™ i5-1235U / i7-1255U，或微软 SQ® 3（5G 版）",
        "cpuArch": "not_disclosed",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® Iris® Xe 或 Microsoft SQ® 3 Adreno™",
        "npuModel": "not_disclosed",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_applicable",
        "ramSpec": "8GB / 16GB / 32GB LPDDR5（Intel） / 8GB / 16GB LPDDR4x（SQ® 3 5G）",
        "storageOptions": "128GB / 256GB / 512GB / 1TB（Intel） / 128GB / 256GB / 512GB（SQ® 3 5G）可拆卸 SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "最高 120Hz 动态刷新率",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "1080p 全高清前置摄像头 + Windows Hello",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素后置自动对焦，支持 4K",
        "videoFeatures": "SQ® 3 5G 版支持 Windows Studio 效果",
        "microphones": "not_disclosed",
        "speakers": "2W 立体声扬声器，Dolby® Atmos®",
        "audioTech": "not_disclosed",
        "headphoneJack": "not_applicable",
        "usbCPorts": "Intel：2 个 USB-C® (USB 4.0 / Thunderbolt™ 4)；5G：2 个 USB-C® 3.2",
        "usbAPorts": "not_applicable",
        "thunderboltSupport": "not_disclosed",
        "surfaceConnect": "配备 Surface Connect",
        "videoOut": "支持外部显示器",
        "cellular": "可选 5G（SQ® 3）或仅 Wi-Fi（Intel）",
        "wifi": "Wi-Fi 6E (802.11ax)",
        "bluetooth": "Bluetooth® 5.1",
        "nfc": "not_applicable",
        "batteryCapacity": "47.7 Wh",
        "batteryLifeVideo": "not_disclosed",
        "batteryLifeOffice": "Intel / Wi-Fi 版最长 15.5 小时典型使用 / SQ® 3 5G 版最长 19 小时典型使用",
        "charger": "Wi-Fi 版最低/标配 60W（型号 1706）；5G 版最低充电 39W、标配 39W（型号 1963）",
        "fastCharging": "推荐快充 60W",
        "keyboardCompat": "Surface Pro 键盘盖 / Signature Keyboard",
        "penCompat": "Surface Slim Pen 2",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "硬件级 TPM 2.0 芯片",
        "biometrics": "Windows Hello 增强型登录安全 (ESS)",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "287 mm × 209 mm × 9.3 mm",
        "weightGrams": "879 克",
        "packagingWeight": "约 1.8 千克",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "2 年有限硬件保修",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-pro-9-for-business",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-pro-9-for-business",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "pro-8-biz",
      "categoryId": "pro",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-pro-8-hero.png",
      "name": "Surface Pro 8 商用版",
      "nameEn": "Surface Pro 8 for Business",
      "systemSku": "Surface_Pro_8_for_Business_1983",
      "generation": "第 8 代 (2021)",
      "year": 2021,
      "status": "discontinued",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "商用触控革命基石：首发 120Hz 高刷屏与雷电 4 双接口，标配 Windows 11 专业版",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-8-features-and-specs",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-8-features-and-specs",
      "specs": {
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "releaseDate": "2021 年 9 月",
        "generation": "第 8 代 (2021)",
        "status": "discontinued",
        "targetAudience": "政企采购与商业客户",
        "tagline": "商用触控革命基石：首发 120Hz 高刷屏与雷电 4 双接口，标配 Windows 11 专业版",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-new-pro-hero.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-new-pro-hero.png"
          }
        ],
        "chassisMaterial": "签名氧化铝",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "第 11 代英特尔® 酷睿™ i5-1135G7 / i7-1185G7",
        "cpuArch": "64 位 / 10 nm SuperFin",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® Iris® Xe Graphics",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "8GB / 16GB / 32GB LPDDR4x",
        "storageOptions": "128GB / 256GB / 512GB / 1TB 可拆卸 SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2880 × 1920",
        "ppi": "267 PPI",
        "refreshRate": "最高 120Hz（默认 60Hz）",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "500 万像素 1080p 前置 + Windows Hello",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "1000 万像素后置自动对焦，支持 4K",
        "videoFeatures": "not_applicable",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "2W 立体声扬声器，Dolby Atmos®",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbCPorts": "2 个 USB-C® (USB 4.0 / Thunderbolt™ 4)",
        "usbAPorts": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "videoOut": "支持外部显示器",
        "cellular": "可选 LTE Advanced",
        "wifi": "Wi-Fi 6 (802.11ax)",
        "bluetooth": "Bluetooth® 5.1",
        "nfc": "not_applicable",
        "batteryCapacity": "51.5 Wh",
        "batteryLifeVideo": "not_disclosed",
        "batteryLifeOffice": "最长 16 小时典型使用",
        "charger": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "推荐快充 60W",
        "keyboardCompat": "Surface Pro Signature Keyboard / Surface Pro X Keyboard",
        "penCompat": "Surface Slim Pen 2",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "硬件级 TPM 2.0 芯片",
        "biometrics": "Windows Hello 增强型登录安全 (ESS)",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "287 mm × 208 mm × 9.3 mm",
        "weightGrams": "891 克",
        "packagingWeight": "约 1.8 千克",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-8-features-and-specs",
        "officialCommercialConfigureUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-8-features-and-specs",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "laptop-5-biz",
      "categoryId": "laptop",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-laptop-5-hero.png",
      "name": "Surface Laptop 5 商用版",
      "nameEn": "Surface Laptop 5 for Business",
      "systemSku": "Surface_Laptop_5_for_Business_1950:1951",
      "generation": "第 5 代 (2022)",
      "year": 2022,
      "status": "discontinued",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业极简触控轻薄本：第 12 代英特尔酷睿处理器、雷电 4 扩展与全天候续航",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-5-for-business",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-5-specs-and-features",
      "specs": {
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "releaseDate": "2022 年 10 月",
        "generation": "第 5 代 (2022)",
        "status": "discontinued",
        "targetAudience": "政企采购与商业客户",
        "tagline": "企业极简触控轻薄本：第 12 代英特尔酷睿处理器、雷电 4 扩展与全天候续航",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-new-laptop-hero.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-new-laptop-hero.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "第 12 代英特尔® 酷睿™ i5-1235U / i7-1255U（商用另有 vPro 对应 SKU）",
        "cpuArch": "64 位 / Intel 7",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® Iris® Xe 显卡",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "8GB / 16GB LPDDR5x（13.5\"） / 8GB / 16GB / 32GB LPDDR5x（15\"）",
        "storageOptions": "256GB / 512GB（13.5\"） / 256GB / 512GB / 1TB（15\"）可维护 SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.5 英寸 / 15.0 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2256 × 1504 (13.5\") / 2496 × 1664 (15\")",
        "ppi": "201 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "720p HD 前置摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "Omnisonic® 扬声器，支持 Dolby® Atmos™",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbCPorts": "1 个 USB-C® (USB 4.0 / Thunderbolt™ 4)",
        "usbAPorts": "1 个 USB-A 3.1",
        "surfaceConnect": "配备 Surface Connect",
        "videoOut": "支持外部 4K 60Hz 显示器",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 6 (802.11ax)",
        "bluetooth": "Bluetooth® 5.1",
        "nfc": "not_applicable",
        "batteryCapacity": "not_disclosed",
        "batteryLifeVideo": "not_disclosed",
        "batteryLifeOffice": "13.5 英寸最长 18 小时典型使用 / 15 英寸最长 17 小时典型使用",
        "charger": "最低充电 60W；标配 60W（型号 1706）",
        "fastCharging": "推荐快充 60W",
        "keyboardCompat": "一体式背光键盘",
        "penCompat": "Surface 触控笔（MPP）",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "硬件级 TPM 2.0 芯片",
        "biometrics": "Windows Hello 增强型登录安全 (ESS)",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "308 mm × 223 mm × 14.5 mm (13.5\")",
        "weightGrams": "1272g（13.5 英寸欧缔兰）/ 1297g（13.5 英寸金属）/ 1545g（15 英寸）",
        "packagingWeight": "约 1.8 千克",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "2 年微软官方商业保修",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-5-for-business",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-5-for-business",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "sls-2-biz",
      "categoryId": "sls",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-laptop-studio-2-hero.png",
      "name": "Surface Laptop Studio 2 商用版",
      "nameEn": "Surface Laptop Studio 2 for Business",
      "systemSku": "Surface_Laptop_Studio_2_2029",
      "generation": "第 2 代 (2023)",
      "year": 2023,
      "status": "discontinued",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "企业图形与工程渲染工作站：第 13 代英特尔酷睿 i7 标压处理器与专业级 RTX 2000 Ada / RTX 4060 显卡",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-studio-2-for-business",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-2-features",
      "specs": {
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "releaseDate": "2023 年 10 月",
        "generation": "第 2 代 (2023)",
        "status": "discontinued",
        "targetAudience": "政企采购与商业客户",
        "tagline": "企业图形与工程渲染工作站：第 13 代英特尔酷睿 i7 标压处理器与专业级 RTX 2000 Ada / RTX 4060 显卡",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-studio-2-hero.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "第 13 代英特尔® 酷睿™ i7-13800H 标压处理器",
        "cpuArch": "64 位 / Intel 7",
        "cpuCores": "not_disclosed",
        "gpuModel": "NVIDIA® GeForce RTX™ 4050/4060 或 NVIDIA® RTX™ 2000 Ada",
        "npuModel": "not_disclosed",
        "npuTops": "not_disclosed",
        "copilotPlus": "not_applicable",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x",
        "storageOptions": "512GB / 1TB / 2TB 可更换 Gen 4 SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "sdSlot": "MicroSDXC 读卡器",
        "screenSize": "14.4 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2400 × 1600",
        "ppi": "200 PPI",
        "refreshRate": "120Hz 动态自适应刷新率",
        "brightness": "SDR 最大 500 nits（典型值）；HDR 峰值 650 nits",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，支持 Microsoft Pen Protocol (MPP)",
        "frontCamera": "1080p 全高清 Surface Studio 镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "支持 Dolby® Atmos® 音效的四声道 Omnisonic® 扬声器",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbCPorts": "2 个 USB-C® (Thunderbolt™ 4)",
        "usbAPorts": "1 个 USB-A 3.1",
        "surfaceConnect": "配备 Surface Connect",
        "videoOut": "支持外部 4K 60Hz 显示器",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 6E (802.11ax)",
        "bluetooth": "Bluetooth® 5.3",
        "nfc": "not_applicable",
        "batteryCapacity": "58 Wh",
        "batteryLifeVideo": "not_disclosed",
        "batteryLifeOffice": "典型使用最长 18 小时（独显）/ 19 小时（集显）",
        "charger": "集显最低/标配 95W（型号 1798）；独显最低/标配 120W（型号 1932）",
        "fastCharging": "推荐快充 95W（集显）/ 120W（独显）",
        "keyboardCompat": "一体式背光键盘",
        "penCompat": "Surface 超薄触控笔",
        "dialCompat": "仅屏外交互",
        "dockCompat": "Surface 雷电 4 扩展坞",
        "tpm": "硬件级 TPM 2.0 芯片",
        "biometrics": "Windows Hello 增强型登录安全 (ESS)",
        "securityFeatures": "Secured-core PC，微软 Pluton 安全处理器，企业级 BitLocker",
        "dimensions": "323 mm × 230 mm × 22 mm",
        "weightGrams": "1980g (独显版)",
        "packagingWeight": "约 1.8 千克",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-studio-2-for-business",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-studio-2-for-business",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "sls-1-biz",
      "categoryId": "sls",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-laptop-studio-2-hero.png",
      "name": "Surface Laptop Studio 初代商用版",
      "nameEn": "Surface Laptop Studio (Original) for Business",
      "systemSku": "Surface_Laptop_Studio_1964",
      "generation": "第 1 代 (2021)",
      "year": 2021,
      "status": "discontinued",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "开创三段式动态工作流：动态编制铰链、120Hz 触控屏与 RTX A2000 专业绘图卡",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-studio",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-features",
      "specs": {
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "releaseDate": "2021 年 9 月",
        "generation": "第 1 代 (2021)",
        "status": "discontinued",
        "targetAudience": "政企采购与商业客户",
        "tagline": "开创三段式动态工作流：动态编制铰链、120Hz 触控屏与 RTX A2000 专业绘图卡",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-studio-2-hero.png"
          }
        ],
        "chassisMaterial": "镁铝合金",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "第 11 代英特尔® 酷睿™ H35 i5-11300H / i7-11370H",
        "cpuArch": "64 位 / 10 nm SuperFin",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® 锐炬® Xe（i5）/ NVIDIA® GeForce RTX™ 3050 Ti（i7）",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "16GB / 32GB LPDDR4x",
        "storageOptions": "256GB / 512GB / 1TB / 2TB SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "14.4 英寸 PixelSense™ Flow",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2400 × 1600",
        "ppi": "201 PPI",
        "refreshRate": "最高 120Hz",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点触控，支持 Microsoft 触控笔协议（MPP）",
        "frontCamera": "1080p 全高清前置摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "not_disclosed",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "四声道 Omnisonic™ 扬声器，支持杜比全景声 (Dolby Atmos®)",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbCPorts": "2 个 USB-C® (USB 4.0 / Thunderbolt™ 4)",
        "usbAPorts": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "videoOut": "not_disclosed",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 6 (802.11ax)",
        "bluetooth": "Bluetooth® 5.1",
        "nfc": "not_applicable",
        "batteryCapacity": "58.0 Wh（额定；最小 56.3 Wh）",
        "batteryLifeVideo": "not_disclosed",
        "batteryLifeOffice": "长达 19 小时 (i5) / 18 小时 (i7)",
        "charger": "集显最低/标配 60W（型号 1706）；独显最低/标配 95W（型号 1798）",
        "fastCharging": "推荐快充 60W（集显）/ 95W（独显）",
        "keyboardCompat": "一体式背光键盘",
        "penCompat": "Surface Slim Pen 2（磁吸收纳充电）",
        "dialCompat": "not_disclosed",
        "dockCompat": "not_disclosed",
        "tpm": "not_disclosed",
        "biometrics": "Windows Hello 人脸识别",
        "securityFeatures": "not_disclosed",
        "dimensions": "323.28 mm × 228.32 mm × 18.94 mm",
        "weightGrams": "1742.9 克 (i5) / 1820.2 克 (i7)",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-studio",
        "officialCommercialConfigureUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-features",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "go-3-biz",
      "categoryId": "go",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-go-hero.png",
      "name": "Surface Go 3 商用版",
      "nameEn": "Surface Go 3 for Business",
      "systemSku": "Surface_Go_3_1926",
      "generation": "第 3 代 (2021)",
      "year": 2021,
      "status": "discontinued",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": false,
      "tagline": "企业现场巡检与政务办理轻巧二合一：10.5 英寸触控屏、LTE 4G 全网通与 Windows 11 专业版",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-go-3-features",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-go-3-features",
      "specs": {
        "thunderboltSupport": "not_applicable",
        "releaseDate": "2021 年 9 月",
        "generation": "第 3 代 (2021)",
        "status": "discontinued",
        "targetAudience": "政企采购与商业客户",
        "tagline": "企业现场巡检与政务办理轻巧二合一：10.5 英寸触控屏、LTE 4G 全网通与 Windows 11 专业版",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-go-hero.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-go-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 10 专业版或 Windows 11 专业版",
        "cpuModel": "英特尔® 酷睿™ i3-10100Y / 奔腾金牌 6500Y",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "4GB / 8GB LPDDR3",
        "storageOptions": "64GB eMMC / 128GB / 256GB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "10.5 英寸 PixelSense™",
        "aspectRatio": "not_disclosed",
        "panelTech": "not_disclosed",
        "resolution": "not_disclosed",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "not_disclosed",
        "frontCamera": "Windows Hello 前置摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_disclosed",
        "videoFeatures": "not_applicable",
        "microphones": "录音室麦克风（双麦克风）",
        "speakers": "not_disclosed",
        "audioTech": "not_disclosed",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbCPorts": "1 个 USB-C®",
        "usbAPorts": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "videoOut": "not_disclosed",
        "cellular": "可选 LTE Advanced",
        "wifi": "not_disclosed",
        "wireless": "not_disclosed",
        "bluetooth": "Bluetooth® 5.0",
        "nfc": "not_applicable",
        "batteryCapacity": "not_disclosed",
        "batteryLifeVideo": "not_disclosed",
        "batteryLifeOffice": "长达 11 小时",
        "charger": "最低充电 24W；标配 24W（型号 1735 / 1736）",
        "fastCharging": "推荐快充 30W",
        "keyboardCompat": "Surface 特制键盘盖 / Signature Type Cover",
        "penCompat": "Surface 触控笔",
        "dialCompat": "not_disclosed",
        "dockCompat": "Surface Dock",
        "tpm": "not_disclosed",
        "biometrics": "Windows Hello 人脸识别",
        "securityFeatures": "not_disclosed",
        "dimensions": "not_disclosed",
        "weightGrams": "544g（Wi-Fi）/ 553g（LTE）",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "not_disclosed",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-go-3-features",
        "officialCommercialConfigureUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-go-3-features",
        "lastVerified": "2026-09-21"
      }
    },
    {
      "id": "studio-2-plus-biz",
      "categoryId": "studio",
      "segment": "commercial",
      "heroImage": "./assets/products/surface-studio-2-plus-hero.png",
      "name": "Surface Studio 2+ 商用版",
      "nameEn": "Surface Studio 2+ for Business",
      "systemSku": "Surface_Studio_2+_2028",
      "generation": "第 2+ 代 (2022)",
      "year": 2022,
      "status": "discontinued",
      "isCommercial": true,
      "targetAudience": "commercial",
      "flagship": true,
      "tagline": "企业创意设计与数字化展厅旗舰：28 英寸零重力铰链大屏、雷电 4 三接口与 RTX 3060 独显",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-studio-2-plus",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-studio-2-features",
      "specs": {
        "thunderboltSupport": "USB4 / Thunderbolt™ 4",
        "releaseDate": "2022 年 10 月",
        "generation": "第 2+ 代 (2022)",
        "status": "discontinued",
        "targetAudience": "政企采购与商业客户",
        "tagline": "企业创意设计与数字化展厅旗舰：28 英寸零重力铰链大屏、雷电 4 三接口与 RTX 3060 独显",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-studio-2-plus-hero.png"
          }
        ],
        "chassisMaterial": "not_disclosed",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版",
        "cpuModel": "第 11 代英特尔® 酷睿™ i7-11370H",
        "cpuArch": "64 位 / 10 nm SuperFin",
        "cpuCores": "not_disclosed",
        "gpuModel": "NVIDIA® GeForce RTX™ 3060",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "32GB DDR4",
        "storageOptions": "1TB SSD",
        "ssdRemovable": "not_disclosed",
        "expandableStorage": "not_applicable",
        "screenSize": "28.0 英寸 PixelSense™",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "4500 × 3000",
        "ppi": "192 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点触控，支持 Microsoft 触控笔协议（MPP）",
        "frontCamera": "1080p 全高清 Surface Studio 镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 特效 (自动构图、背景虚化、语音聚焦)",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "杜比全景声 (Dolby Atmos®)",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbCPorts": "3 个 USB-C® (Thunderbolt™ 4)",
        "usbAPorts": "2 个 USB-A 3.1",
        "surfaceConnect": "not_applicable",
        "videoOut": "支持外部 4K 60Hz 显示器",
        "cellular": "not_applicable",
        "wifi": "Wi-Fi 6 (802.11ax)",
        "bluetooth": "Bluetooth® 5.1",
        "nfc": "not_applicable",
        "batteryCapacity": "not_applicable",
        "batteryLifeVideo": "not_applicable",
        "batteryLifeOffice": "not_applicable",
        "charger": "随附交流电源线供电（官方：USB-C 不接收入站电源）",
        "fastCharging": "not_applicable",
        "keyboardCompat": "Surface 键盘（另售）",
        "penCompat": "Surface 触控笔 / Surface 超薄触控笔",
        "dialCompat": "Surface Dial 屏上交互",
        "dockCompat": "not_applicable",
        "tpm": "TPM 2.0",
        "biometrics": "Windows Hello 人脸识别",
        "securityFeatures": "TPM 2.0，BitLocker",
        "dimensions": "637.35 × 438.90 × 12.50；底座 250.00 × 220.00 × 31.45",
        "weightGrams": "9560g (9.56 kg)",
        "packagingWeight": "not_disclosed",
        "serviceabilityScore": "9/10 (支持备件现场更换)",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-studio-2-plus",
        "officialCommercialConfigureUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-studio-2-plus",
        "lastVerified": "2026-09-21"
      }
    },
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
      "tagline": "极简超便携轻薄触控本，官方本地视频续航长达 23 小时",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "specs": {
        "releaseDate": "2025 年 10 月 / 2026 年",
        "generation": "第 1 代",
        "status": "current_cn",
        "targetAudience": "面向学生、职场新人与追求轻量化极简便携办公的用户",
        "tagline": "搭载高通骁龙 X Plus 8核处理器，1.22kg 轻巧铝合金机身与 23 小时续航",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭中文版 (ARM64)",
        "cpuModel": "高通骁龙® X Plus (8 核心, 最高 3.4 GHz)",
        "cpuArch": "Qualcomm Oryon™ 64 位",
        "cpuCores": "8 核",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™ NPU",
        "npuTops": "45 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "8GB / 16GB LPDDR5x（16GB 起解锁完整 AI+ PC 体验）",
        "storageOptions": "256GB / 512GB",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ 显示屏",
        "aspectRatio": "3:2 生产力黄金比例",
        "panelTech": "not_disclosed",
        "resolution": "1920 × 1280",
        "ppi": "178 PPI",
        "refreshRate": "60Hz",
        "brightness": "典型 400 nits (SDR)",
        "colorSupport": "sRGB 与增强型色彩配置文件，支持色彩校准",
        "touchAndPenProtocol": "10 点触控，无触控笔支持",
        "frontCamera": "1080p 全高清 Surface Studio 摄像头",
        "windowsHello": "Windows Hello 指纹电源按钮",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 效果 (自动取景 / 人像模糊 / 语音聚焦)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "Omnisonic® 扬声器，支持杜比音效™",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机接口",
        "usbPorts": "2 × USB-C® / USB 3.2：充电、数据、DisplayPort 1.4a（最多两台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.1",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_applicable",
        "wireless": "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryCapacityWh": "50 Wh（额定；最小 48 Wh）",
        "batteryLifeOffice": "网页浏览长达 16 小时",
        "batteryLifeVideo": "长达 23 小时本地视频播放",
        "chargingPower": "标配 45W USB-C（型号 2105）；最低充电 45W",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "集成全尺寸机械背光键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "精准大面积触控板",
        "tpmChip": "Microsoft Pluton 安全芯片",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "指纹识别 (电源键集成)",
        "enterpriseManage": "Windows 11 安全防护",
        "dimensionsMm": "285.65 × 214.14 × 15.6",
        "weightGrams": "1220g (1.22 kg)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "静音均热板双通道微风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "屏幕总成、电池、主板、闪存模块",
        "warranty": "2 年有限硬件保修",
        "startingPriceCny": "¥7,788 起 (消费版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-inch",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-inch"
      },
      "isCommercial": false,
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-copilot-plus-pc-13inch-tech-specs",
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
      "status": "discontinued",
      "targetAudience": "consumer",
      "flagship": true,
      "tagline": "15 英寸大视野超长续航旗舰轻薄本，高通骁龙 X Elite 极速性能",
      "prevGenerationId": "laptop-5",
      "nextGenerationId": "laptop-8-150",
      "specs": {
        "releaseDate": "2024 年 6 月",
        "generation": "第 7 代",
        "status": "discontinued",
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
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 家庭中文版 (ARM64)",
        "cpuModel": "高通骁龙® X Elite (12 核心, 最高 3.4 GHz, 双核睿频 4.0 GHz)",
        "cpuArch": "Qualcomm Oryon™ 64 位 / 4nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Qualcomm® Adreno™ GPU",
        "npuModel": "Qualcomm® Hexagon™",
        "npuTops": "45 TOPS",
        "copilotPlus": "not_disclosed",
        "ramSpec": "16GB / 32GB / 64GB LPDDR5x RAM (8448 MT/s)",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸 Gen 4 SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "15.0 英寸 PixelSense™ Flow 显示屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2496 × 1664",
        "ppi": "201 PPI",
        "refreshRate": "120Hz 动态刷新率",
        "brightness": "典型 600 nits (SDR) / HDR 峰值",
        "colorSupport": "sRGB 和 Vivid",
        "touchAndPenProtocol": "10 点多点触控，不支持触控笔",
        "frontCamera": "1080p 全高清 Surface Studio 摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 效果",
        "microphones": "矩阵式远场双麦克风",
        "speakers": "not_disclosed",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × USB-C (USB4 / 雷电兼容) + 1 × USB-A 3.1 + MicroSDXC",
        "thunderboltSupport": "USB4",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 7 + 蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryCapacityWh": "66.0 Wh",
        "batteryLifeOffice": "长达 15 小时常规网页浏览",
        "batteryLifeVideo": "长达 22 小时本地视频播放",
        "chargingPower": "国行标配 65W；官方充电表最低 45W、推荐快充 60W（型号 2062 为 60W）",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "全尺寸背光按键机械键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "Surface 精准触觉反馈触控板",
        "tpmChip": "Microsoft Pluton 安全芯片",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "Windows Hello 人脸识别",
        "enterpriseManage": "Windows 11 安全防护",
        "dimensionsMm": "329 × 239 × 18.26",
        "weightGrams": "1660g (1.66 kg)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "双热管微风扇散热系统",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "固态硬盘、主板模块、电池、屏幕",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-7th-edition",
        "officialConfigureUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-snapdragon-tech-specs"
      },
      "isCommercial": false,
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-snapdragon-tech-specs",
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
      "tagline": "搭载英特尔酷睿 Ultra 5 处理器 325（第 3 代），47 TOPS，本地视频续航长达 22 小时",
      "prevGenerationId": null,
      "nextGenerationId": null,
      "specs": {
        "releaseDate": "2025 年 10 月 / 2026 年",
        "generation": "第 1 代",
        "status": "current_cn",
        "targetAudience": "面向政企机构采购、商务精英与专业办公用户",
        "tagline": "搭载英特尔酷睿 Ultra 5 处理器 325（第 3 代），47 TOPS 与 Windows 11 专业版",
        "colors": [
          {
            "name": "亮铂金",
            "hex": "#d8d8d8",
            "image": "./assets/products/surface-laptop-platinum.png"
          }
        ],
        "chassisMaterial": "阳极氧化铝",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 11 专业版 (x86-64)",
        "cpuModel": "英特尔® 酷睿™ Ultra 5 处理器 325（第 3 代）",
        "cpuArch": "64 位 / Intel 18A",
        "cpuCores": "not_disclosed",
        "gpuModel": "英特尔® 图形处理器",
        "npuModel": "Intel® AI Boost NPU",
        "npuTops": "47 TOPS",
        "copilotPlus": "认证 Copilot+ PC / Windows 11 AI+ PC",
        "ramSpec": "8GB / 16GB / 24GB LPDDR5x RAM",
        "storageOptions": "256GB / 512GB / 1TB 可拆卸第 4 代 SSD",
        "ssdRemovable": "支持可拆卸固态硬盘",
        "expandableStorage": "not_applicable",
        "screenSize": "13.0 英寸 PixelSense™ 触控显示屏",
        "aspectRatio": "3:2 商务黄金生产力比例",
        "panelTech": "not_disclosed",
        "resolution": "1920 × 1280",
        "ppi": "178 PPI",
        "refreshRate": "60Hz",
        "brightness": "最大 500 尼特（典型值）",
        "colorSupport": "sRGB 与增强型，对比度 1000:1",
        "touchAndPenProtocol": "10 点触控，无触控笔支持",
        "frontCamera": "1080p 全高清 Surface Studio 摄像头",
        "windowsHello": "Windows Hello 指纹电源按钮",
        "rearCamera": "not_applicable",
        "videoFeatures": "Windows Studio 效果 (商业会议智能降噪取景)",
        "microphones": "双 Studio Mics，支持语音聚焦",
        "speakers": "Omnisonic® 扬声器，Dolby Audio™",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机接口",
        "usbPorts": "2 × USB-C® / USB 3.2：充电、数据、DisplayPort 1.4a（最多两台 4K 60Hz）、兼容 Surface Thunderbolt™ 4 扩展坞；1 × USB-A 3.2",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "not_applicable",
        "wireless": "Wi-Fi 7 (802.11be) + 蓝牙 5.4",
        "cellular": "not_applicable",
        "batteryCapacityWh": "50 Wh（额定；最小 48 Wh）",
        "batteryLifeOffice": "网页浏览长达 14 小时",
        "batteryLifeVideo": "本地视频播放长达 22 小时",
        "chargingPower": "标配 45W USB-C 墙插充电器（特定配置，型号 2105）；最低充电 45W",
        "fastCharging": "推荐快充 60W",
        "compatibleKeyboard": "全尺寸商业机械背光键盘",
        "penHapticFeedback": "not_applicable",
        "penChargingType": "not_applicable",
        "trackpadType": "大面积精准触控板",
        "tpmChip": "Microsoft Pluton / TPM 2.0",
        "securedCorePc": "认证 Secured-core PC",
        "biometrics": "指纹识别 (电源键集成)",
        "enterpriseManage": "支持 Microsoft Intune 与企业集中部署",
        "dimensionsMm": "285.65 × 214.14 × 15.6",
        "weightGrams": "1240g (1.24 kg)",
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "双铜管单风扇微噪散热系统",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "屏幕总成、电池、主板、可拆卸固态硬盘",
        "warranty": "3 年有限硬件保修",
        "startingPriceCny": "¥10,188 起 (商用版)",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-21",
        "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13-inch-for-business",
        "officialConfigureUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13-inch-for-business-configurate"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-13-inch-features",
      "segment": "commercial"
    },
    {
      "id": "book-3-biz",
      "categoryId": "book",
      "heroImage": "./assets/products/surface-book-hero.png",
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
            "image": "./assets/products/surface-book-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_applicable",
        "osAtLaunch": "Windows 10 专业版 (可免费升至 Windows 11 专业版)",
        "cpuModel": "英特尔® 酷睿™ 第 10 代 i5-1035G7 / i7-1065G7",
        "cpuArch": "64 位 / 10 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "not_disclosed",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "8GB / 16GB / 32GB 3733Mhz LPDDR4x",
        "storageOptions": "256GB / 512GB / 1TB / 2TB PCIe NVMe SSD",
        "ssdRemovable": "not_applicable",
        "expandableStorage": "全尺寸 SDXC 读卡器",
        "screenSize": "13.5 英寸 (3000×2000) / 15.0 英寸 (3240×2160)",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "3240 × 2160 (15寸) / 3000 × 2000 (13.5寸)",
        "ppi": "not_disclosed",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p 全高清前置镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素 1080p 自动对焦后置镜头",
        "videoFeatures": "全高清视频通话",
        "microphones": "双 Studio Mics / 摄影棚麦克风",
        "speakers": "前置立体声扬声器，支持杜比全景声 (Dolby Atmos)",
        "audioTech": "Dolby Atmos®",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "2 × USB-A 3.1 Gen 2 + 1 × USB-C (USB 3.1 Gen 2) + 2 × Surface Connect",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 (802.11ax) + 蓝牙 5.0",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "常规使用约 17.5 小时",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "15 英寸最低/标配 120W（型号 1932）；13.5 英寸集显 60W / 独显 95W",
        "fastCharging": "13.5 英寸集显推荐快充 80W；独显 95W；15 英寸 120W",
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
        "totalWeightWithKeyboard": "1905g（含键盘）",
        "thermalDesign": "平板部分与键盘基座双独立主动散热风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "服务网点官方置换",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-18",
        "officialDocUrl": "https://learn.microsoft.com/en-us/surface/surface-book-3",
        "officialConfigureUrl": "https://learn.microsoft.com/en-us/surface/surface-book-3"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-3-specs-and-features",
      "segment": "commercial"
    },
    {
      "id": "go-2-biz",
      "categoryId": "go",
      "heroImage": "./assets/products/surface-go-hero.png",
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
            "image": "./assets/products/surface-go-hero.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 10 专业版 (支持升级 Windows 11 专业版)",
        "cpuModel": "英特尔® 奔腾® 黄金处理器 4425Y / 酷睿™ m3-8100Y",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics 615",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "4GB / 8GB LPDDR3",
        "storageOptions": "64GB eMMC / 128GB SSD",
        "ssdRemovable": "not_applicable",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "10.5 英寸 PixelSense™ 触控屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "1920 × 1280",
        "ppi": "220 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p 全高清镜头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素 1080p 自动对焦后置镜头",
        "videoFeatures": "全高清视频",
        "microphones": "双工作室麦克风",
        "speakers": "2W 立体声扬声器，支持杜比音效 (Dolby Audio)",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × USB-C + 1 × Surface Connect + 1 × Surface 特制专业键盘盖接口",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 6 (802.11ax) + 蓝牙 5.0",
        "cellular": "可选 4G LTE Advanced (Qualcomm Snapdragon X16)",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "常规使用约 10 小时",
        "batteryLifeVideo": "not_disclosed",
        "chargingPower": "最低充电 24W；标配 24W（型号 1735 / 1736）",
        "fastCharging": "推荐快充 30W",
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
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "无风扇被动静音散热系统",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "官方售后支持",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-18",
        "officialDocUrl": "https://learn.microsoft.com/en-us/surface/surface-go-2",
        "officialConfigureUrl": "https://learn.microsoft.com/en-us/surface/surface-go-2"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-2-specs-and-features",
      "segment": "commercial"
    },
    {
      "id": "pro-6-biz",
      "categoryId": "pro",
      "heroImage": "./assets/products/surface-pro-6-hero.png",
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
            "image": "./assets/products/surface-pro-13-platinum.png"
          },
          {
            "name": "典雅黑",
            "hex": "#262626",
            "image": "./assets/products/surface-pro-13-black.png"
          }
        ],
        "chassisMaterial": "镁合金",
        "kickstandType": "not_disclosed",
        "osAtLaunch": "Windows 10 专业版",
        "cpuModel": "英特尔® 酷睿™ 第 8 代 i5-8350U (vPro) / i7-8650U (vPro)",
        "cpuArch": "64 位 / 14 nm",
        "cpuCores": "not_disclosed",
        "gpuModel": "Intel® UHD Graphics 620",
        "npuModel": "not_applicable",
        "npuTops": "not_applicable",
        "copilotPlus": "not_applicable",
        "ramSpec": "8GB / 16GB LPDDR3",
        "storageOptions": "128GB / 256GB / 512GB / 1TB PCIe NVMe SSD",
        "ssdRemovable": "not_applicable",
        "expandableStorage": "配备 MicroSDXC 读卡器",
        "screenSize": "12.3 英寸 PixelSense™ 显示屏",
        "aspectRatio": "3:2",
        "panelTech": "not_disclosed",
        "resolution": "2736 × 1824",
        "ppi": "267 PPI",
        "refreshRate": "not_disclosed",
        "brightness": "not_disclosed",
        "colorSupport": "not_disclosed",
        "touchAndPenProtocol": "10 点多点触控",
        "frontCamera": "500 万像素 1080p 全高清前置摄像头",
        "windowsHello": "Windows Hello 面部识别",
        "rearCamera": "800 万像素 1080p 自动对焦后置镜头",
        "videoFeatures": "全高清视频通话",
        "microphones": "双麦克风",
        "speakers": "1.6W 立体声扬声器，支持杜比音效 (Dolby Audio)",
        "audioTech": "Dolby Audio™",
        "headphoneJack": "3.5 毫米耳机插孔",
        "usbPorts": "1 × 全尺寸 USB-A 3.0 + 1 × Mini DisplayPort + 1 × Surface Connect",
        "thunderboltSupport": "not_applicable",
        "surfaceConnect": "配备 Surface Connect",
        "wireless": "Wi-Fi 5 (802.11ac) + 蓝牙 4.1",
        "cellular": "not_applicable",
        "batteryCapacityWh": "not_disclosed",
        "batteryLifeOffice": "not_disclosed",
        "batteryLifeVideo": "视频播放约 13.5 小时",
        "chargingPower": "最低充电 39W；标配 39W（型号 1800）",
        "fastCharging": "not_applicable",
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
        "totalWeightWithKeyboard": "not_disclosed",
        "thermalDesign": "i5 无风扇静音被动散热 / i7 超薄静音主动风扇",
        "repairabilityScore": "not_disclosed",
        "replaceableParts": "官方售后整机置换",
        "warranty": "not_disclosed",
        "startingPriceCny": "not_disclosed",
        "sourceReliability": "microsoft_official",
        "lastVerified": "2026-09-18",
        "officialDocUrl": "https://learn.microsoft.com/en-us/surface/surface-pro-6",
        "officialConfigureUrl": "https://learn.microsoft.com/en-us/surface/surface-pro-6"
      },
      "isCommercial": true,
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-6-specs-and-features",
      "segment": "commercial"
    }
  ],
  "chips": [
    {
      "id": "intel-core-ultra-gen3",
      "name": "Intel® Core™ Ultra (第 3 代)",
      "vendor": "英特尔 Intel®",
      "architecture": "x86-64 (Lion Cove P核 + Skymont E核 + LPE核)",
      "processNode": "Intel 18A / TSMC 先进制程",
      "cores": "高性能多核混合架构 (最高 5.1 GHz)",
      "gpu": "Intel® Arc™ 140V 核显 (支持硬件光追与 XeSS)",
      "npuTops": 50,
      "npuDesc": "50 TOPS (全新独立 Intel AI Boost 神经处理单元)",
      "copilotPlus": true,
      "memorySupport": "LPDDR5x / DDR5 高速内存",
      "equippedDevices": [
        "Surface Pro 13 英寸 (第 12 代) 商用版 - Intel 版",
        "Surface Laptop (第 8 代) 商用版 - Intel 版"
      ],
      "highlights": "英特尔新一代商用旗舰 AI PC 处理器，内置 50 TOPS 独立 AI Boost NPU，原生兼顾 100% 传统 x86 企业级工业与办公软件兼容性与端侧 AI 算力。"
    },
    {
      "id": "snapdragon-x2-elite",
      "name": "高通 Snapdragon® X2 Elite",
      "vendor": "高通 Qualcomm & 微软深度联合调优",
      "architecture": "ARMv9.2-A (64位)",
      "processNode": "3nm 先进制程",
      "cores": "12 核心 Oryon™ V2 CPU (最高 4.3 GHz)",
      "gpu": "Adreno™ X2 GPU (5.8 TFLOPS 浮点算力)",
      "npuTops": 80,
      "npuDesc": "80 TOPS (全新 Hexagon NPU 神经处理单元)",
      "copilotPlus": true,
      "memorySupport": "LPDDR5x (8533 MT/s, 136 GB/s 带宽)",
      "equippedDevices": [
        "Surface Pro 13 英寸 (第 12 代)",
        "Surface Laptop 13.8\" & 15\" (第 8 代)"
      ],
      "highlights": "行业算力天花板，端侧直接离线实时运行 130 亿参数大模型，功耗比 x86 降低高达 55%"
    },
    {
      "id": "snapdragon-x-elite",
      "name": "高通 Snapdragon® X Elite (X1E-80-100)",
      "vendor": "高通 Qualcomm",
      "architecture": "ARMv9.2-A (64位)",
      "processNode": "4nm 制程工艺",
      "cores": "12 核心 Oryon™ CPU (双核增强 4.0 GHz, 全核 3.4 GHz)",
      "gpu": "Adreno™ GPU (3.8 TFLOPS)",
      "npuTops": 45,
      "npuDesc": "45 TOPS (Qualcomm Hexagon)",
      "copilotPlus": true,
      "memorySupport": "LPDDR5x (8448 MT/s, 135 GB/s 带宽)",
      "equippedDevices": [
        "Surface Pro (第 11 代)",
        "Surface Laptop (第 7 代)"
      ],
      "highlights": "首批 Copilot+ PC 标准芯片，支持 Windows Studio 特效与本地实时字幕翻译"
    },
    {
      "id": "snapdragon-x-plus",
      "name": "高通 Snapdragon® X Plus (X1P-64-100)",
      "vendor": "高通 Qualcomm",
      "architecture": "ARMv9.2-A",
      "processNode": "4nm 制程工艺",
      "cores": "10 核心 / 8 核心 Oryon™ CPU (最高 3.4 GHz)",
      "gpu": "Adreno™ GPU (3.8 TFLOPS)",
      "npuTops": 45,
      "npuDesc": "45 TOPS (同样维持 45 TOPS 满血 NPU)",
      "copilotPlus": true,
      "memorySupport": "LPDDR5x (8448 MT/s)",
      "equippedDevices": [
        "Surface Pro 11 (标配版)",
        "Surface Laptop 7 (标配版)"
      ],
      "highlights": "极高能效比，为轻薄本带来超过 20 小时的本地离电续航体验"
    },
    {
      "id": "intel-core-ultra-7-165u",
      "name": "Intel® Core™ Ultra 7 165U (Meteor Lake)",
      "vendor": "Intel 英特尔",
      "architecture": "x86-64 (2P + 8E + 2LPE = 12核14线程)",
      "processNode": "Intel 4 工艺 (EUV 3D Foveros 封装)",
      "cores": "最高 4.9 GHz 睿频",
      "gpu": "Intel® Graphics (4 Xe 核心, 2.0 GHz)",
      "npuTops": 11.5,
      "npuDesc": "11.5 TOPS (Intel AI Boost)",
      "copilotPlus": false,
      "memorySupport": "LPDDR5x 6400 MT/s",
      "equippedDevices": [
        "Surface Pro 10 商用版"
      ],
      "highlights": "低功耗商用办公主力，兼具完整 x86 传统商业软件无损兼容与企业级 vPro 管理"
    },
    {
      "id": "intel-core-ultra-7-165h",
      "name": "Intel® Core™ Ultra 7 165H (Meteor Lake-H)",
      "vendor": "Intel 英特尔",
      "architecture": "x86-64 (6P + 8E + 2LPE = 16核22线程)",
      "processNode": "Intel 4 工艺",
      "cores": "最高 5.0 GHz 睿频，28W-45W 标压",
      "gpu": "Intel® Arc™ 锐炫显卡 (8 Xe 核心, 2.3 GHz)",
      "npuTops": 11.5,
      "npuDesc": "11.5 TOPS (Intel AI Boost)",
      "copilotPlus": false,
      "memorySupport": "LPDDR5x 7467 MT/s",
      "equippedDevices": [
        "Surface Laptop 6 商用版 (13.5\" & 15\")"
      ],
      "highlights": "标压高性能商用笔记本芯片，强劲图形性能满足企业 CAD 与数据建模"
    },
    {
      "id": "microsoft-sq3",
      "name": "微软 SQ® 3 (Snapdragon 8cx Gen 3 定制版)",
      "vendor": "高通 & 微软联合研发",
      "architecture": "ARMv8.2-A",
      "processNode": "5nm 制程",
      "cores": "8 核心 (4×Cortex-X1 @ 3.0GHz + 4×Cortex-A78 @ 2.4GHz)",
      "gpu": "Adreno 690",
      "npuTops": 15,
      "npuDesc": "约 15 TOPS (首次引入 Windows NPU 概念)",
      "copilotPlus": false,
      "memorySupport": "LPDDR4x 4266 MT/s",
      "equippedDevices": [
        "Surface Pro 9 (5G版)"
      ],
      "highlights": "首款原生集成 5G Sub-6 与毫米波的 Surface 处理器，开启 Windows 语音聚焦与背景虚化先河"
    },
    {
      "id": "intel-core-ultra-7-268v",
      "name": "Intel® Core™ Ultra 7 268V (Lunar Lake)",
      "vendor": "Intel 英特尔",
      "architecture": "x86-64 (4P + 4LP-E 均采用全新微架构与封装内存)",
      "processNode": "台积电 N3B 先进制程 (Foveros 3D 封装)",
      "cores": "8 核心 8 线程 (最高 5.0 GHz)",
      "gpu": "Intel® Arc™ 140V (8 个新一代 Xe2 核心, 67 TOPS)",
      "npuTops": 48,
      "npuDesc": "48 TOPS (全新 NPU 4 架构，超越 Copilot+ 认证红线)",
      "copilotPlus": true,
      "memorySupport": "32GB LPDDR5X-8533 封装集成内存 (MoP)",
      "equippedDevices": [
        "Surface Pro 11 商用升级版",
        "Surface Laptop 7 商用版"
      ],
      "highlights": "突破 x86 传统能效瓶颈，功耗直逼 ARM 架构，同时具备 48 TOPS 强大独立 NPU 硬件算力"
    },
    {
      "id": "amd-ryzen-ai-9-hx370",
      "name": "AMD Ryzen™ AI 9 HX 370 (Strix Point)",
      "vendor": "AMD 超威半导体",
      "architecture": "x86-64 (Zen 5 + Zen 5c 混合架构, 12核24线程)",
      "processNode": "台积电 4nm 制程工艺",
      "cores": "最高 5.1 GHz 频率",
      "gpu": "AMD Radeon™ 890M (16 CU RDNA 3.5 显卡)",
      "npuTops": 50,
      "npuDesc": "50 TOPS (XDNA 2 神经处理架构)",
      "copilotPlus": true,
      "memorySupport": "LPDDR5x (7500 MT/s)",
      "equippedDevices": [
        "Surface Laptop (定制图形工作站版)"
      ],
      "highlights": "50 TOPS XDNA 2 算力领跑 x86 阵营，具备卓越的本地多模型并发加速与极高核显图形性能"
    },
    {
      "id": "microsoft-sq1-2",
      "name": "微软 SQ® 1 / SQ® 2 (定制 ARM SoC)",
      "vendor": "高通 & 微软深度定制",
      "architecture": "ARMv8 (64位)",
      "processNode": "7nm 制程工艺",
      "cores": "8 核心 Kryo™ 495 (最高 3.15 GHz)",
      "gpu": "Adreno™ 685 / 690 (2 TFLOPS 浮点)",
      "npuTops": 9,
      "npuDesc": "约 9 TOPS (Qualcomm AI Engine)",
      "copilotPlus": false,
      "memorySupport": "LPDDR4x 3733 MT/s",
      "equippedDevices": [
        "Surface Pro X (初代 / SQ2升级版)"
      ],
      "highlights": "Surface 拥抱现代 ARM 架构的开山之作，奠定 7.3mm 极窄边框与实时全时互联基因"
    },
    {
      "id": "intel-core-i7-1255u",
      "name": "Intel® 第 12 代酷睿™ i7-1255U (Alder Lake)",
      "vendor": "Intel 英特尔",
      "architecture": "x86-64 (2P + 8E = 10核12线程大小核异构)",
      "processNode": "Intel 7 工艺 (10nm SuperFin 增强)",
      "cores": "最高 4.7 GHz 睿频",
      "gpu": "Intel® Iris® Xe Graphics (96 EU)",
      "npuTops": 0,
      "npuDesc": "无独立 NPU 硬件加速单元",
      "copilotPlus": false,
      "memorySupport": "LPDDR5 / DDR4",
      "equippedDevices": [
        "Surface Pro 9 (Intel款)",
        "Surface Laptop 5"
      ],
      "highlights": "经典 x86 大小核架构，稳定支持雷电 4 协议与全球企业级商业软件生态"
    },
    {
      "id": "intel-core-i7-1185g7",
      "name": "Intel® 第 11 代酷睿™ i7-1185G7 (Tiger Lake)",
      "vendor": "Intel 英特尔",
      "architecture": "x86-64 (4核8线程 Willow Cove 架构)",
      "processNode": "10nm SuperFin 工艺",
      "cores": "最高 4.8 GHz 睿频",
      "gpu": "Intel® Iris® Xe Graphics (96 EU, 1.35 GHz)",
      "npuTops": 0,
      "npuDesc": "无独立 NPU (支持 GNA 2.0 基础音频低功耗加速)",
      "copilotPlus": false,
      "memorySupport": "LPDDR4x-4266",
      "equippedDevices": [
        "Surface Pro 8",
        "Surface Laptop 4 (Intel款)"
      ],
      "highlights": "首度在 Surface Pro 上支持 USB4 / 雷电 4 双接口，开启 120Hz 高刷屏与外接 eGPU 时代"
    },
    {
      "id": "intel-processor-n200",
      "name": "Intel® 处理器 N200 (Gracemont 架构)",
      "vendor": "Intel 英特尔",
      "architecture": "x86-64 (4 核心 4 线程纯能效核)",
      "processNode": "Intel 7 工艺 (6W 超低功耗设计)",
      "cores": "最高 3.7 GHz 频率",
      "gpu": "Intel® UHD Graphics (32 EU)",
      "npuTops": 0,
      "npuDesc": "无独立 NPU",
      "copilotPlus": false,
      "memorySupport": "LPDDR5 4800 MT/s",
      "equippedDevices": [
        "Surface Go 4 商用版"
      ],
      "highlights": "6W 极致无风扇低功耗，比前代 Go 3 性能飞跃提升 80%，一线巡检与轻度办公神器"
    }
  ],
  "accessories": [
    {
      "id": "surface-arc-mouse",
      "name": "Surface Arc 鼠标 (Surface Arc Mouse)",
      "category": "mouse",
      "categoryName": "鼠标与触控外设",
      "icon": "🖱️",
      "tagline": "可弯折创新形态设计，展平关机弯曲开机，全触控面板支持水平与垂直双向滚动",
      "features": [
        "展平即关机，弯曲即开机 (差旅轻薄收纳)",
        "全触控面板 (支持垂直与水平双向平滑手势滚动)",
        "Microsoft 蓝影追踪技术 (多种桌面材质精准定位)",
        "蓝牙 4.0/4.1/5.0 快速配对 (长达 6 个月续航)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "超便携机身轻巧搭档"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "超便携机身轻巧搭档"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "极简便携办公搭配"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "duo-2",
          "status": "FULL",
          "note": "支持 Android 蓝牙鼠标指针与滚轮滑动"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "超便携机身轻巧搭档"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "超便携机身轻巧搭档"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "极简便携办公搭配"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "极简便携办公搭配"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "duo-1",
          "status": "FULL",
          "note": "支持 Android 蓝牙鼠标指针与滚轮滑动"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "hub-3",
          "status": "FULL",
          "note": "大屏巨幕蓝牙指针控制"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "极简便携办公搭配"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "超便携机身轻巧搭档"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，平滑触控滚动"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "超便携机身轻巧搭档"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙直连，轻薄差旅黄金搭档"
        }
      ]
    },
    {
      "id": "surface-precision-mouse",
      "name": "Surface 精准鼠标 (Surface Precision Mouse)",
      "category": "mouse",
      "categoryName": "鼠标与触控外设",
      "icon": "🖱️",
      "tagline": "专业创作者旗舰：支持 3 台设备无缝跨屏切换，磁吸可调节无级/段落双模滚轮",
      "features": [
        "Smart Switch 智能跨屏 (最多在 3 台 Surface/PC 间无缝游走)",
        "磁吸双模滚轮 (可编程切换无级平滑滚动或段落滚动)",
        "人体工学拇指托与 3 个侧边可编程宏按键",
        "蓝牙无线 + Micro-USB 有线双模连接 (内置锂电池长达 3 个月续航)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "高性能创意工作站绝配，双模滚轮与侧键自定义"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "高性能创意工作站绝配，双模滚轮与侧键自定义"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "创作者旗舰组合，安装《鼠标和键盘中心》支持多屏游走与侧键宏"
        },
        {
          "deviceId": "duo-2",
          "status": "PARTIAL",
          "note": "支持基础蓝牙指针，跨屏 Smart Switch 需 Windows 系统"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "生产力工作站绝配，支持 3 台设备跨屏协同"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "生产力工作站绝配，支持 3 台设备跨屏协同"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "生产力工作站绝配，支持 3 台设备跨屏协同"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "生产力工作站绝配，支持 3 台设备跨屏协同"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "创作者旗舰组合，安装《鼠标和键盘中心》支持多屏游走与侧键宏"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "创作者旗舰组合，安装《鼠标和键盘中心》支持多屏游走与侧键宏"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "创作者旗舰组合，安装《鼠标和键盘中心》支持多屏游走与侧键宏"
        },
        {
          "deviceId": "duo-1",
          "status": "PARTIAL",
          "note": "支持基础蓝牙指针，跨屏 Smart Switch 需 Windows 系统"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "hub-3",
          "status": "FULL",
          "note": "原生蓝牙鼠标指针支持"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "高性能创意工作站绝配，双模滚轮与侧键自定义"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "高性能创意工作站绝配，双模滚轮与侧键自定义"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "创作者旗舰组合，安装《鼠标和键盘中心》支持多屏游走与侧键宏"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "旗舰级办公操控体验，支持蓝牙+有线双模"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "生产力工作站绝配，支持 3 台设备跨屏协同"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "原生蓝牙支持，按键功能可通过驱动自定义"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "二合一生产力桌面拓展主力鼠标"
        }
      ]
    },
    {
      "id": "surface-mobile-mouse",
      "name": "Surface 便携移动鼠标 (Surface Mobile Mouse)",
      "category": "mouse",
      "categoryName": "鼠标与触控外设",
      "icon": "🖱️",
      "tagline": "极简轻巧扁平对称机身，顺滑铝制滚轮，Surface Go 与轻薄本随行良伴",
      "features": [
        "精致金属铝合金平滑滚轮",
        "BlueTrack 蓝影技术 (木质/桌面顺畅追踪)",
        "低功耗蓝牙 4.2 直连 (无需 USB 接收器)",
        "双手通用优雅对称机身 (2 节 AAA 电池约 1 年续航)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "Surface Go 标配伴侣，轻巧便携随身携带"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "Surface Go 标配伴侣，轻巧便携随身携带"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "轻薄本最佳搭配，手感紧凑"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "duo-2",
          "status": "FULL",
          "note": "Android 系统原生蓝牙指针支持"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "Surface Go 标配伴侣，轻巧便携随身携带"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "Surface Go 标配伴侣，轻巧便携随身携带"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "轻薄本最佳搭配，手感紧凑"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "轻薄本最佳搭配，手感紧凑"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "duo-1",
          "status": "FULL",
          "note": "Android 系统原生蓝牙指针支持"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "hub-3",
          "status": "FULL",
          "note": "原生蓝牙指针支持"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "轻薄本最佳搭配，手感紧凑"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "Surface Go 标配伴侣，轻巧便携随身携带"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "随身移动办公"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙连接"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "Surface Go 标配伴侣，轻巧便携随身携带"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "轻薄便携差旅办公"
        }
      ]
    },
    {
      "id": "surface-ergonomic-mouse",
      "name": "Surface 人体工学鼠标 (Surface Ergonomic Mouse)",
      "category": "mouse",
      "categoryName": "鼠标与触控外设",
      "icon": "🖱️",
      "tagline": "自然手型倾角工学设计，双色注塑柔软拇指托，长时间高强度办公健康选择",
      "features": [
        "自然手部握持倾斜角 (有效缓解腕管压迫与疲劳)",
        "双色注塑一体成型软胶拇指槽与铝合金双向滚轮",
        "双侧边前后导航实体按键",
        "低延迟蓝牙 4.0+ 无线连接"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "桌面创作健康搭档"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "桌面创作健康搭档"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "桌面人体工学健康办公组合"
        },
        {
          "deviceId": "duo-2",
          "status": "PARTIAL",
          "note": "基础蓝牙指针操控"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "高强度工作站健康操控"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "高强度工作站健康操控"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "高强度工作站健康操控"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "高强度工作站健康操控"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "桌面人体工学健康办公组合"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "桌面人体工学健康办公组合"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "桌面人体工学健康办公组合"
        },
        {
          "deviceId": "duo-1",
          "status": "PARTIAL",
          "note": "基础蓝牙指针操控"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "hub-3",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "桌面创作健康搭档"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "桌面创作健康搭档"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "桌面人体工学健康办公组合"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "重度桌面办公健康之选"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "高强度工作站健康操控"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "原生蓝牙免驱支持"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "桌面拓展办公首选"
        }
      ]
    },
    {
      "id": "flex-keyboard",
      "name": "Surface Pro Flex 键盘",
      "category": "keyboard",
      "categoryName": "键盘与保护盖",
      "icon": "⌨️",
      "tagline": "蓝牙无线分离脱机 + 磁吸直连双模键盘，内置充电电池与触觉反馈触控板",
      "features": [
        "蓝牙无线脱机输入 (高达 41 小时离线续航)",
        "磁吸笔槽无线充电 (收纳并为 Slim Pen 2 补电)",
        "触觉反馈精准触控板 (可调节拟真震动反馈)",
        "增强型碳纤维机身与静音机械键程"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)"
        },
        {
          "deviceId": "pro-9",
          "status": "PARTIAL",
          "note": "支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动"
        },
        {
          "deviceId": "pro-8",
          "status": "PARTIAL",
          "note": "支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-7",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-6",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-x",
          "status": "PARTIAL",
          "note": "支持物理磁吸输入；ARM64 蓝牙离机输入需系统补丁"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "sls-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "sls-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "go-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "book-2-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "book-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "PARTIAL",
          "note": "支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "PARTIAL",
          "note": "支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理磁吸接口与尺寸不兼容)"
        }
      ]
    },
    {
      "id": "pro-signature-keyboard",
      "name": "Surface Pro 特制版专业键盘盖 (带笔槽款)",
      "category": "keyboard",
      "categoryName": "键盘与保护盖",
      "icon": "⌨️",
      "tagline": "现代 Pro 标配：集成隐藏式 Slim Pen 磁吸无线充电笔槽与 Alcantara 欧缔兰面料",
      "features": [
        "磁吸笔槽无线充电 (专为 Slim Pen 1/2 补电)",
        "Alcantara® 奢华欧缔兰防污面料",
        "全尺寸机械背光按键 (1.3mm 键程)",
        "大尺寸防误触玻璃触控板"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "完美原生支持 (物理磁吸附打字与笔槽感应充电)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "完美原生支持 (物理磁吸附打字与笔槽感应充电)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "完美原生支持 (物理磁吸附打字与笔槽感应充电)"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-7",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-6",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "sls-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "sls-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "go-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "book-2-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "book-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (接口物理不兼容)"
        }
      ]
    },
    {
      "id": "pro-classic-type-cover",
      "name": "Surface Pro 经典专业键盘盖 (Type Cover)",
      "category": "keyboard",
      "categoryName": "键盘与保护盖",
      "icon": "⌨️",
      "tagline": "二合一黄金时代标配：经典六针磁吸、剪刀脚机械背光按键与第二段磁吸倾斜条",
      "features": [
        "经典 6-pin 磁吸金手指接口",
        "双折角磁吸设计 (吸附在下边框形成舒适打字倾角)",
        "全尺寸剪刀脚机械按键 + 3 级 LED 背光",
        "可选 Alcantara 欧缔兰特制版或传统超细纤维"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-11-13",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-9",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-8",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "完美原生支持 (黄金搭档)"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "完美原生支持 (黄金搭档)"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "完美原生支持"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "完美原生支持"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "完美原生支持"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "完美兼容 (机身尺寸完全吻合)"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "sls-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "sls-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "go-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "book-2-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "book-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (物理接口或尺寸不兼容)"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "完美原生支持"
        }
      ]
    },
    {
      "id": "go-signature-type-cover",
      "name": "Surface Go 特制版专业键盘盖 (Go Type Cover)",
      "category": "keyboard",
      "categoryName": "键盘与保护盖",
      "icon": "⌨️",
      "tagline": "Surface Go 全代际通用：紧凑全功能机械键盘、大尺寸精准玻璃触控板与奢华 Alcantara 面料",
      "features": [
        "全机械按键套件 (剪刀脚结构带来舒适键程)",
        "精准大尺寸玻璃触控板",
        "自适应磁吸折叠角度",
        "Surface Go 1 / 2 / 3 / 4 全系通用"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-11-13",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-9",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-8",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-7",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-6",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "sls-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "sls-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "原生完美支持 (Go 4 官方标配键盘)"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "原生完美支持 (Go 3 标配)"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "book-2-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "book-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "原生完美支持 (Go 2 标配)"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "原生完美支持 (初代 Go 完全兼容)"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "原生完美支持"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Surface Go 10.5 英寸机身系列)"
        }
      ]
    },
    {
      "id": "surface-touch-cover",
      "name": "Surface 早期经典触控键盘 (Touch / Type Cover 1~2)",
      "category": "keyboard",
      "categoryName": "键盘与保护盖",
      "icon": "⌨️",
      "tagline": "Surface 创世开山配件：3.2mm 极致轻薄压感感应键盘，见证二合一历史开端",
      "features": [
        "革命性 3.2mm 极薄机身",
        "压感电容感应输入 (无实体机械活动部件)",
        "初代磁吸防误触智能感应",
        "Surface RT / Pro 1 / Pro 2 历史见证款"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-11-13",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-9",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-8",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-7",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-6",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "原生完美匹配 (初代二代黄金磁吸接口)"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "原生完美匹配 (初代开山配件)"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "sls-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "sls-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "go-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "book-2-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "book-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (仅适用于 Pro 1/2 及初代 RT 机型)"
        }
      ]
    },
    {
      "id": "surface-keyboard-desktop",
      "name": "Surface 蓝牙桌面无线键盘 (含 Modern Keyboard 指纹款)",
      "category": "keyboard",
      "categoryName": "键盘与保护盖",
      "icon": "⌨️",
      "tagline": "极简阳极氧化铝合金面板、静音剪刀脚手感，专为 Studio 与桌面工作站打造",
      "features": [
        "优雅浅银灰阳极氧化铝合金金属顶盖",
        "优化的机械按键手感与静音回弹",
        "蓝牙 4.0/4.1 无线直连 (长达 1 年续航)",
        "Modern 版配备隐藏式 Windows Hello 指纹识别键"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "外接大屏创作绝配"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "外接大屏创作绝配"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "Surface Studio 原厂标配桌面键盘"
        },
        {
          "deviceId": "duo-2",
          "status": "PARTIAL",
          "note": "支持基础文字输入，部分快捷键针对 Windows 优化"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "外接显示器桌面办公"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "外接显示器桌面办公"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "外接显示器桌面办公"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "外接显示器桌面办公"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "Surface Studio 原厂标配桌面键盘"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "Surface Studio 原厂标配桌面键盘"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "Surface Studio 原厂标配桌面键盘"
        },
        {
          "deviceId": "duo-1",
          "status": "PARTIAL",
          "note": "支持基础文字输入，部分快捷键针对 Windows 优化"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "hub-3",
          "status": "FULL",
          "note": "大屏巨幕蓝牙键盘"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "外接大屏创作绝配"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "外接大屏创作绝配"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "Surface Studio 原厂标配桌面键盘"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "外接大屏桌面办公利器"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "外接显示器桌面办公"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "原生蓝牙直连"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "二合一主机桌面办公利器"
        }
      ]
    },
    {
      "id": "slim-pen-2",
      "name": "Surface 超感触控笔 2 (Slim Pen 2)",
      "category": "pen",
      "categoryName": "手写笔与压感",
      "icon": "✏️",
      "tagline": "内置触觉反馈微型马达，在支持机型上还原纸上书写的真实触觉震动",
      "features": [
        "触觉反馈微型马达 (触觉震动纸感书写)",
        "零力起笔 (墨水几乎在接触屏幕瞬间涌出)",
        "4096 级压感与连续倾斜着色",
        "磁吸无线感应充电 (需配合特制键盘或独立充电座)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "PARTIAL",
          "note": "支持 4096 级压感与倾角书写；机身无震动马达驱动，需外置充电座"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "PARTIAL",
          "note": "支持书写绘图，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "pro-7",
          "status": "PARTIAL",
          "note": "支持书写绘图，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "pro-6",
          "status": "PARTIAL",
          "note": "支持书写绘图，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "pro-5",
          "status": "PARTIAL",
          "note": "支持书写绘图，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "pro-4",
          "status": "PARTIAL",
          "note": "支持书写绘图，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "pro-3",
          "status": "PARTIAL",
          "note": "支持书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-x",
          "status": "PARTIAL",
          "note": "支持书写与特制键盘无线充，无触觉震动"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "完美原生支持 (机身底部吸附无线充 + 触觉震动)"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "完美原生支持 (机身底部吸附无线充 + 触觉震动)"
        },
        {
          "deviceId": "go-4",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "go-3",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "PARTIAL",
          "note": "支持 4096 级压感与倾斜书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "duo-2",
          "status": "PARTIAL",
          "note": "支持 Android 手写墨迹，需外置充电夹"
        },
        {
          "deviceId": "book-3-15",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "book-3-135",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "book-2-15",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "book-1",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "go-2",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "go-1",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "studio-2",
          "status": "PARTIAL",
          "note": "支持 4096 级压感与倾斜书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "studio-1",
          "status": "PARTIAL",
          "note": "支持 4096 级压感与倾斜书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "hub-2s",
          "status": "PARTIAL",
          "note": "支持 4096 级压感与倾斜书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "duo-1",
          "status": "PARTIAL",
          "note": "支持 Android 手写墨迹，需外置充电夹"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "PARTIAL",
          "note": "支持 4096 级压感与倾角书写；机身无震动马达驱动，需外置充电座"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "完美原生支持 (触觉震动 + 键盘无线充电)"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "完美原生支持 (机身底部吸附无线充 + 触觉震动)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "完美原生支持 (机身底部吸附无线充 + 触觉震动)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "PARTIAL",
          "note": "支持 4096 级压感与倾斜书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "go-2-biz",
          "status": "PARTIAL",
          "note": "支持 4096 级压感书写，无触觉震动，需外置充电座"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "PARTIAL",
          "note": "支持书写绘图，无触觉震动，需外置充电座"
        }
      ]
    },
    {
      "id": "slim-pen-1",
      "name": "Surface 超感触控笔一代 (Slim Pen 1)",
      "category": "pen",
      "categoryName": "手写笔与压感",
      "icon": "✏️",
      "tagline": "轻薄扁平木工铅笔手感，专为 Pro X / Pro 8+ 键盘槽收纳充电而生",
      "features": [
        "扁平轻巧防滚动笔身",
        "4096 级压感与倾角支持",
        "磁吸感应充电",
        "蓝牙一键唤醒快捷操作"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "原生支持"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "原生支持"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "原生支持"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "原生支持"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "原生支持键盘收纳与无线充"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-7",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-6",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-5",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-4",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-3",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-2",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-1",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "初代 Slim Pen 黄金原生搭档"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "sls-2",
          "status": "PARTIAL",
          "note": "支持书写与机底磁吸"
        },
        {
          "deviceId": "sls-1",
          "status": "PARTIAL",
          "note": "支持书写与机底磁吸"
        },
        {
          "deviceId": "go-4",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "go-3",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "book-3-15",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "book-3-135",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "book-2-15",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "book-1",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "go-2",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "go-1",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "studio-2",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "studio-1",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "hub-2s",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "原生支持"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "原生支持键盘收纳与无线充"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "PARTIAL",
          "note": "支持书写与机底磁吸"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "PARTIAL",
          "note": "支持书写与机底磁吸"
        },
        {
          "deviceId": "go-3-biz",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "book-3-biz",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "go-2-biz",
          "status": "PARTIAL",
          "note": "支持书写，需外置充电盒"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "PARTIAL",
          "note": "支持正常书写，需配外置充电盒"
        }
      ]
    },
    {
      "id": "surface-pen-classic",
      "name": "Surface 触控笔经典款 (Surface Pen 4096 级带笔夹/单侧磁吸)",
      "category": "pen",
      "categoryName": "手写笔与压感",
      "icon": "✏️",
      "tagline": "经久不衰的圆柱笔型经典：4096 级压感、倾斜着色、单侧磁吸与 AAAA 电池超长续航",
      "features": [
        "4096 级压感与倾斜绘图着色支持",
        "单侧扁平磁吸附条 (牢固吸附在机身左侧边框)",
        "AAAA 碱性电池供电 (日常使用续航约 1 年)",
        "顶部物理橡皮擦 (按压一键唤醒，倒转即擦除)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "支持 4096 级书写绘图"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "PARTIAL",
          "note": "支持 4096 级书写绘图，机身侧边无磁吸定位槽"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "支持 4096 级书写绘图"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "支持 4096 级书写绘图"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "支持 4096 级书写绘图"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "支持 4096 级书写绘图"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "完美原生支持 (4096 级压感 + 倾角 + 磁吸附)"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "完美原生支持 (4096 级压感 + 倾角 + 磁吸附)"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "完美原生支持 (4096 级压感 + 倾角 + 磁吸附)"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "完美原生支持 (首发 4096 级压感与倾角)"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "完美原生支持 (升级 4096 级与倾角)"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "完美原生支持 (支持 256/1024 级向后兼容)"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "完美支持屏幕书写与绘图"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "完美支持屏幕书写与绘图"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "完美原生支持 (4096 级书写 + 磁吸附)"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "完美原生支持 (4096 级书写 + 磁吸附)"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "完美原生支持 (大屏创作黄金绘图笔)"
        },
        {
          "deviceId": "duo-2",
          "status": "PARTIAL",
          "note": "支持手写笔记与绘图，无倾斜着色"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "完美原生支持 (屏侧牢固磁吸 + 4096 级)"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "完美原生支持 (屏侧牢固磁吸 + 4096 级)"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "完美原生支持 (屏侧牢固磁吸 + 4096 级)"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "完美原生支持 (屏侧牢固磁吸 + 4096 级)"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "完美原生支持 (4096 级书写 + 磁吸附)"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "完美原生支持 (4096 级书写 + 磁吸附)"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "完美原生支持 (大屏创作黄金绘图笔)"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "完美原生支持 (大屏创作黄金绘图笔)"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "完美原生支持 (大屏创作黄金绘图笔)"
        },
        {
          "deviceId": "duo-1",
          "status": "PARTIAL",
          "note": "支持手写笔记与绘图，无倾斜着色"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "PARTIAL",
          "note": "支持 4096 级书写绘图，机身侧边无磁吸定位槽"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "完美原生支持 (4096 级书写 + 磁吸附)"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "完美原生支持 (大屏创作黄金绘图笔)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (Laptop 传统笔电屏幕不支持手写笔)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "完美原生支持 (屏侧牢固磁吸 + 4096 级)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "完美原生支持 (4096 级书写 + 磁吸附)"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "完美原生支持"
        }
      ]
    },
    {
      "id": "surface-pen-pro3",
      "name": "Surface 初代压感触控笔 (Pro 3 / 256级 紫色顶键)",
      "category": "pen",
      "categoryName": "手写笔与压感",
      "icon": "✏️",
      "tagline": "Surface 手写交互奠基之作：N-Trig 技术、顶部经典紫色按钮一键呼出 OneNote",
      "features": [
        "N-Trig 初代 256 级高精度压感",
        "顶部物理紫色按键 (锁屏状态下一键呼出 OneNote 速记)",
        "AAAA 电池供电 + 2 粒纽扣电池供电蓝牙顶盖",
        "双侧边物理按键 (右键与擦除)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-12-13",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-11-13",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-9",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-8",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-7",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "pro-6",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "pro-5",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "pro-4",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "Surface Pro 3 原装标配手写笔，完美支持"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "sls-2",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "sls-1",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "go-4",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "go-3",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "book-3-15",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "book-3-135",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "book-2-15",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "book-1",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "go-2",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "go-1",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "book-3-biz",
          "status": "PARTIAL",
          "note": "向下兼容基础书写"
        },
        {
          "deviceId": "go-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持现代机型高级倾斜与高阶压感"
        }
      ]
    },
    {
      "id": "surface-dock-2",
      "name": "Surface 拓展坞 2 代 (Surface Dock 2 磁吸口)",
      "category": "dock",
      "categoryName": "拓展坞与转换器",
      "icon": "🔌",
      "tagline": "199W 强劲供电与磁吸一线连：驱动双 4K 60Hz 巨幕与极速 10Gbps USB-C",
      "features": [
        "199W 大功率原厂电源适配器 (为旗舰主机全力供电)",
        "Surface Connect 磁吸一线连 (充电 + 视频 + 数据)",
        "前置双 USB-C (10Gbps 数据传输 + 15W 手机快充)",
        "后置双 USB-C 显示输出 (双 4K@60Hz) + 双 USB-A + 千兆网口"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "完美一线连 (磁吸快充 + 双 4K 60Hz 显示输出 + 外设)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "完美一线连 (磁吸快充 + 双 4K 60Hz 显示输出 + 外设)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "完美原生支持 (磁吸一线连)"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "完美原生支持 (磁吸一线连)"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "完美原生支持 (磁吸一线连)"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "完美原生支持 (双 4K 60Hz)"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "完美原生支持 (双 4K 60Hz)"
        },
        {
          "deviceId": "pro-7",
          "status": "PARTIAL",
          "note": "支持充电与数据，双 4K 模式受限于主机架构限 30Hz 或单 4K 60Hz"
        },
        {
          "deviceId": "pro-6",
          "status": "PARTIAL",
          "note": "支持充电与数据，双屏输出最高支持双 1080p 或单 4K 30Hz"
        },
        {
          "deviceId": "pro-5",
          "status": "PARTIAL",
          "note": "支持充电与外设扩展，双外接屏受限"
        },
        {
          "deviceId": "pro-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "pro-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "完美支持"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "完美支持"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "完美支持"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "完美支持"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "完美支持 199W 强劲供电与双 4K 扩展"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "完美支持供电与双 4K 扩展"
        },
        {
          "deviceId": "go-4",
          "status": "PARTIAL",
          "note": "支持供电与拓展，受制于核显最高输出单 4K"
        },
        {
          "deviceId": "go-3",
          "status": "PARTIAL",
          "note": "支持供电与拓展，受制于核显最高输出单 4K"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "PARTIAL",
          "note": "支持供电与扩展"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "PARTIAL",
          "note": "仅支持数据与外设，Studio 采用专用电源输入"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "完美支持双 4K 与高功率供电"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "完美支持双 4K 与高功率供电"
        },
        {
          "deviceId": "book-2-15",
          "status": "PARTIAL",
          "note": "支持供电与扩展"
        },
        {
          "deviceId": "book-1",
          "status": "PARTIAL",
          "note": "支持供电与扩展"
        },
        {
          "deviceId": "go-2",
          "status": "PARTIAL",
          "note": "支持供电与拓展，受制于核显最高输出单 4K"
        },
        {
          "deviceId": "go-1",
          "status": "PARTIAL",
          "note": "支持供电与拓展，受制于核显最高输出单 4K"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "PARTIAL",
          "note": "支持供电与扩展"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "PARTIAL",
          "note": "支持供电与扩展"
        },
        {
          "deviceId": "studio-2",
          "status": "PARTIAL",
          "note": "仅支持数据与外设，Studio 采用专用电源输入"
        },
        {
          "deviceId": "studio-1",
          "status": "PARTIAL",
          "note": "仅支持数据与外设，Studio 采用专用电源输入"
        },
        {
          "deviceId": "hub-2s",
          "status": "PARTIAL",
          "note": "仅支持数据与外设，Studio 采用专用电源输入"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "完美原生支持 (磁吸一线连)"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "完美原生支持 (磁吸一线连)"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "PARTIAL",
          "note": "支持供电与扩展"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "完美原生支持 (磁吸一线连)"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "完美原生支持 (双 4K 60Hz)"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "完美支持 199W 强劲供电与双 4K 扩展"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "PARTIAL",
          "note": "支持供电与拓展，受制于核显最高输出单 4K"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "PARTIAL",
          "note": "仅支持数据与外设，Studio 采用专用电源输入"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "PARTIAL",
          "note": "支持供电与拓展，受制于核显最高输出单 4K"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)"
        }
      ]
    },
    {
      "id": "surface-dock-1",
      "name": "Surface 拓展坞 1 代 (Surface Dock 1 砖块形)",
      "category": "dock",
      "categoryName": "拓展坞与转换器",
      "icon": "🔌",
      "tagline": "Surface Connect 磁吸拓展基石：经典砖块配重设计，集成双 Mini DP 与 4 口 USB 3.0",
      "features": [
        "经典沉稳砖块配重外形 (桌面稳固防滑)",
        "Surface Connect 磁吸一线连 (最高 60W 供电)",
        "2 × Mini DisplayPort (双屏扩展)",
        "4 × USB 3.0 Type-A 接口 + 千兆以太网口 + 3.5mm 音频口"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "PARTIAL",
          "note": "支持基础供电"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-11-13",
          "status": "PARTIAL",
          "note": "支持基础供电"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "PARTIAL",
          "note": "支持基础供电"
        },
        {
          "deviceId": "pro-9",
          "status": "PARTIAL",
          "note": "支持基础供电与外设，建议 Dock 2 或雷电 4"
        },
        {
          "deviceId": "pro-8",
          "status": "PARTIAL",
          "note": "支持基础充电与外设连接，高负载供电略低于原装要求"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "完美原生兼容 (Mini DP 显示输出 + 磁吸供电)"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "完美原生兼容"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "完美原生兼容"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "完美原生兼容"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "完美原生兼容"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "完美原生兼容 (Pro 3 桌面黄金拓展站)"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "完美原生兼容"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "完美原生兼容"
        },
        {
          "deviceId": "sls-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "sls-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "go-4",
          "status": "PARTIAL",
          "note": "支持供电与双 Mini DP 扩展"
        },
        {
          "deviceId": "go-3",
          "status": "PARTIAL",
          "note": "支持供电与双 Mini DP 扩展"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "PARTIAL",
          "note": "支持供电与外设扩展"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "完美原生兼容"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "完美原生兼容"
        },
        {
          "deviceId": "go-2",
          "status": "PARTIAL",
          "note": "支持供电与双 Mini DP 扩展"
        },
        {
          "deviceId": "go-1",
          "status": "PARTIAL",
          "note": "支持供电与双 Mini DP 扩展"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "PARTIAL",
          "note": "支持供电与外设扩展"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "PARTIAL",
          "note": "支持供电与外设扩展"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "PARTIAL",
          "note": "支持供电与外设扩展"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "PARTIAL",
          "note": "支持供电与双 Mini DP 扩展"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "PARTIAL",
          "note": "支持供电与双 Mini DP 扩展"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (无 Surface Connect 磁吸口)"
        }
      ]
    },
    {
      "id": "surface-tb4-dock",
      "name": "Surface 雷电 4 拓展坞 (Thunderbolt 4 Dock)",
      "category": "dock",
      "categoryName": "拓展坞与转换器",
      "icon": "🔌",
      "tagline": "拥抱通用标准：USB4 / Thunderbolt 4 标准 Type-C 接口，高达 96W 反向快充与极速 40Gbps",
      "features": [
        "通用 USB4 / Thunderbolt 4 Type-C 接口",
        "高达 96W USB-PD 反向供电 (充沛满足高负载运算)",
        "支持双 4K 60Hz 或单 8K 显示器输出",
        "环保机身设计 (采用 20% 回收海洋塑料树脂)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "满血雷电 4 原生支持 (40Gbps 吞吐 + 96W PD 快充 + 双 4K@60Hz)"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "满血 USB4 原生支持 (40Gbps 极速扩展)"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "满血 USB4 原生支持"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "PARTIAL",
          "note": "支持 USB-C 快速充电与外设扩展"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "满血 USB4 原生支持"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "满血雷电 4 原生支持"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "满血雷电 4 原生支持 (Intel 版) / USB4 (5G 骁龙版)"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "满血雷电 4 原生支持"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "PARTIAL",
          "note": "降级为标准 USB-C 3.2 Gen 2 工作 (支持充电与单 4K 视频)"
        },
        {
          "deviceId": "pro-7",
          "status": "PARTIAL",
          "note": "降级为 USB-C 3.1 工作 (支持充电与扩展)"
        },
        {
          "deviceId": "pro-6",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "pro-5",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "pro-4",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "pro-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "满血 USB4 / 雷电 4 原生支持"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "满血 USB4 / 雷电 4 原生支持"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "满血 USB4 原生支持"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "满血雷电 4 原生支持"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "满血雷电 4 原生支持"
        },
        {
          "deviceId": "laptop-4",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "laptop-3",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "laptop-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "满血雷电 4 原生支持 (双 4K 60Hz)"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "满血雷电 4 原生支持 (双 4K 60Hz)"
        },
        {
          "deviceId": "go-4",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "go-3",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "book-2-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "book-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "go-2",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "go-1",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "PARTIAL",
          "note": "支持 USB-C 快速充电与外设扩展"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "满血 USB4 原生支持"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "满血雷电 4 原生支持"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "满血雷电 4 原生支持"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "满血雷电 4 原生支持"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "go-3-biz",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "满血 USB4 原生支持"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "PARTIAL",
          "note": "降级为普通 USB-C 工作"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期机型无 USB-C / 雷电接口)"
        }
      ]
    },
    {
      "id": "surface-travel-hub",
      "name": "Surface 便携多功能扩展坞 (Surface USB-C Travel Hub)",
      "category": "dock",
      "categoryName": "拓展坞与转换器",
      "icon": "🔌",
      "tagline": "差旅人士五合一路演神器：HDMI 2.0 (4K@60Hz)、VGA 投影、千兆网口、USB-C 与 USB-A",
      "features": [
        "自带一体式隐蔽收纳 USB-C 连接线",
        "HDMI 2.0 (支持 4K@60Hz 高清视频输出)",
        "VGA 模拟视频接口 (兼容老旧会议室投影机)",
        "千兆高速有线以太网 RJ45 + USB-A 3.2 + USB-C"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "完美兼容 USB-C 外设拓展"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "完美兼容 USB-C 外设拓展"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "Go 系列随身差旅绝配"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "Go 系列随身差旅绝配"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "轻薄本出行必备"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "不支持 (旧款机型无 Type-C 接口)"
        },
        {
          "deviceId": "duo-2",
          "status": "PARTIAL",
          "note": "支持 HDMI 屏幕镜像与 USB-A 存储读取"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "支持 USB-C 机型扩展"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "支持 USB-C 机型扩展"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "支持 USB-C 机型扩展"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "支持 USB-C 机型扩展"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "Go 系列随身差旅绝配"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "Go 系列随身差旅绝配"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "轻薄本出行必备"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "轻薄本出行必备"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "不支持 (旧款机型无 Type-C 接口)"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (旧款机型无 Type-C 接口)"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持 (旧款机型无 Type-C 接口)"
        },
        {
          "deviceId": "duo-1",
          "status": "PARTIAL",
          "note": "支持 HDMI 屏幕镜像与 USB-A 存储读取"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (旧款机型无 Type-C 接口)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "轻薄本出行必备"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "完美兼容 USB-C 外设拓展"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "完美兼容 USB-C 外设拓展"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "Go 系列随身差旅绝配"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (旧款机型无 Type-C 接口)"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "完美兼容 USB-C 差旅一线转接投影与外设"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "支持 USB-C 机型扩展"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "Go 系列随身差旅绝配"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "二合一外出开会与出差黄金转接头"
        }
      ]
    },
    {
      "id": "surface-connect-usbc",
      "name": "Surface Connect 转 USB-C 适配器 (历史神器)",
      "category": "dock",
      "categoryName": "拓展坞与转换器",
      "icon": "🔌",
      "tagline": "让老款 Surface 满血复活：将磁吸充电口转换为全功能 USB-C (支持充电、数据与视频)",
      "features": [
        "磁吸 Surface Connect 专属转换协议",
        "解锁标准 USB-PD 充电器补电能力",
        "支持 USB 3.1 数据传输",
        "支持 DisplayPort 视频输出扩展"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-12-13",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-11-13",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-9",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-8",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-7",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "完美支持：无需购买昂贵原装充电器，支持 PD 充电"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "完美支持：为 2017 款无 C 口机型带来现代全功能 Type-C 生态"
        },
        {
          "deviceId": "pro-4",
          "status": "PARTIAL",
          "note": "支持部分数据与视频传输，需特定固件支持"
        },
        {
          "deviceId": "pro-3",
          "status": "PARTIAL",
          "note": "仅支持部分外设数据读取"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-5",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-4",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-3",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "完美支持：补齐 Type-C 接口遗憾"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "完美支持：初代 Laptop 升级 Type-C 神器"
        },
        {
          "deviceId": "sls-2",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "sls-1",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "go-4",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "go-3",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "book-2-15",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "完美支持磁吸转接 Type-C"
        },
        {
          "deviceId": "go-2",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "go-1",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "studio-2",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "studio-1",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "go-3-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "go-2-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "现代机型已原生标配全功能 Type-C / USB4，无需此转接器"
        }
      ]
    },
    {
      "id": "surface-headphones-2",
      "name": "Surface 头戴式降噪耳机 2 代 (Surface Headphones 2)",
      "category": "audio",
      "categoryName": "音频与会议外设",
      "icon": "🎧",
      "tagline": "标志性左右耳罩双物理无级拨盘：左旋 13 级可调主动降噪，右旋音量，Omnisonic 沉浸声学",
      "features": [
        "左右耳罩双物理精密旋转拨盘 (调降噪 / 调音量)",
        "13 级无级可调节主动降噪 (ANC)",
        "40mm Free Edge 驱动单元与 Omnisonic 沉浸声学",
        "多点连接技术 (同时连接 Surface 与手机，长达 20 小时续航)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "创作者沉浸音频工作流"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "创作者沉浸音频工作流"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "全尺寸数字工作台专业监听"
        },
        {
          "deviceId": "duo-2",
          "status": "FULL",
          "note": "Android 专属 Surface Audio App 调音支持"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "免驱蓝牙与 3.5mm 有线双模"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "免驱蓝牙与 3.5mm 有线双模"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "免驱蓝牙与 3.5mm 有线双模"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "免驱蓝牙与 3.5mm 有线双模"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "全尺寸数字工作台专业监听"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "全尺寸数字工作台专业监听"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "全尺寸数字工作台专业监听"
        },
        {
          "deviceId": "duo-1",
          "status": "FULL",
          "note": "Android 专属 Surface Audio App 调音支持"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "hub-3",
          "status": "FULL",
          "note": "视频会议与协同研讨音频支持"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "创作者沉浸音频工作流"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "创作者沉浸音频工作流"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "全尺寸数字工作台专业监听"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱支持，多点双设备无缝切换"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "免驱蓝牙与 3.5mm 有线双模"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "全系原生免驱支持"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "全系蓝牙免驱配对，高保真办公与会议降噪"
        }
      ]
    },
    {
      "id": "surface-earbuds",
      "name": "Surface 真无线耳塞式耳机 (Surface Earbuds)",
      "category": "audio",
      "categoryName": "音频与会议外设",
      "icon": "🎧",
      "tagline": "极具辨识度的超大圆形触控面板，四点耳甲腔稳固锚定，深度融合 Microsoft 365 办公生态",
      "features": [
        "标志性超大圆形电容触控感应盘",
        "深度融合 Microsoft 365 (PPT 幻灯片手势翻页 / Word 实时听写)",
        "四点耳甲腔人体工学锚定 (全天佩戴零耳道压迫感)",
        "双阵列降噪麦克风 (精准过滤嘈杂背景通话人声)"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "原生蓝牙低延迟音频"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "原生蓝牙低延迟音频"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "轻薄随行听歌办公"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "轻薄随行听歌办公"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "轻薄便携耳塞"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "duo-2",
          "status": "FULL",
          "note": "双屏手机移动通话与听音黄金搭档"
        },
        {
          "deviceId": "book-3-15",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "book-3-135",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "book-1",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "轻薄随行听歌办公"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "轻薄随行听歌办公"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "轻薄便携耳塞"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "轻薄便携耳塞"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "duo-1",
          "status": "FULL",
          "note": "双屏手机移动通话与听音黄金搭档"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "轻薄便携耳塞"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "原生蓝牙低延迟音频"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "原生蓝牙低延迟音频"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "轻薄随行听歌办公"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "移动办公标配，支持 PPT 演示触控翻页"
        },
        {
          "deviceId": "book-3-biz",
          "status": "FULL",
          "note": "原生免驱蓝牙支持"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "轻薄随行听歌办公"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "出差差旅与移动会议绝配"
        }
      ]
    },
    {
      "id": "surface-audio-dock",
      "name": "Surface 智能会议音箱拓展坞 (Surface Audio Dock)",
      "category": "audio",
      "categoryName": "音频与会议外设",
      "icon": "🎧",
      "tagline": "工位极简四合一：高品质会议免提音箱 + Microsoft Teams 一键入会 + USB-C 拓展坞",
      "features": [
        "全音域扬声器 (含低音扬声器，带来丰沛通话人声与音乐表现)",
        "双前向降噪麦克风 (清晰拾取办公工位人声)",
        "Microsoft Teams 专属联动实体键 (带指示灯一键静音/入会)",
        "集成拓展坞功能：HDMI 4K 视频输出 + 双 USB-C + USB-A + 60W 反充"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-12-13",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-11-13",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-9",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-8",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-3",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-2",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-1",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-x",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-5",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-4",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-3",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-2",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-1",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "sls-2",
          "status": "FULL",
          "note": "高品质桌面音频与扩展"
        },
        {
          "deviceId": "sls-1",
          "status": "FULL",
          "note": "高品质桌面音频与扩展"
        },
        {
          "deviceId": "go-4",
          "status": "FULL",
          "note": "支持 Type-C 机型一线扩展"
        },
        {
          "deviceId": "go-3",
          "status": "FULL",
          "note": "支持 Type-C 机型一线扩展"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "FULL",
          "note": "轻薄本桌面扩充"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "外置专业会议免提麦克风音箱"
        },
        {
          "deviceId": "duo-2",
          "status": "PARTIAL",
          "note": "支持 Type-C 免提通话与投屏"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期无 Type-C 接口机型无法通过一条线实现供电与视频扩展)"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期无 Type-C 接口机型无法通过一条线实现供电与视频扩展)"
        },
        {
          "deviceId": "book-2-15",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期无 Type-C 接口机型无法通过一条线实现供电与视频扩展)"
        },
        {
          "deviceId": "book-1",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期无 Type-C 接口机型无法通过一条线实现供电与视频扩展)"
        },
        {
          "deviceId": "go-2",
          "status": "FULL",
          "note": "支持 Type-C 机型一线扩展"
        },
        {
          "deviceId": "go-1",
          "status": "FULL",
          "note": "支持 Type-C 机型一线扩展"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "FULL",
          "note": "轻薄本桌面扩充"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "FULL",
          "note": "轻薄本桌面扩充"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "外置专业会议免提麦克风音箱"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "外置专业会议免提麦克风音箱"
        },
        {
          "deviceId": "hub-2s",
          "status": "FULL",
          "note": "外置专业会议免提麦克风音箱"
        },
        {
          "deviceId": "duo-1",
          "status": "PARTIAL",
          "note": "支持 Type-C 免提通话与投屏"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期无 Type-C 接口机型无法通过一条线实现供电与视频扩展)"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "FULL",
          "note": "轻薄本桌面扩充"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "FULL",
          "note": "高品质桌面音频与扩展"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "FULL",
          "note": "高品质桌面音频与扩展"
        },
        {
          "deviceId": "go-3-biz",
          "status": "FULL",
          "note": "支持 Type-C 机型一线扩展"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "外置专业会议免提麦克风音箱"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "FULL",
          "note": "居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持 (早期无 Type-C 接口机型无法通过一条线实现供电与视频扩展)"
        },
        {
          "deviceId": "go-2-biz",
          "status": "FULL",
          "note": "支持 Type-C 机型一线扩展"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "FULL",
          "note": "二合一电脑桌面工位拓展利器"
        }
      ]
    },
    {
      "id": "surface-dial",
      "name": "Surface Dial 屏幕实体交互旋钮",
      "category": "creative",
      "categoryName": "创意交互外设",
      "icon": "🎨",
      "tagline": "重塑数字创意交互：屏幕吸附直接弹出径向工具轮，触觉触感震动反馈，非惯用手神级辅助",
      "features": [
        "屏幕吸附交互 (吸附在 Studio 等机型屏幕表面直接激活径向菜单)",
        "触觉力反馈 (旋转时提供细腻可感知的物理阻尼顿挫感)",
        "离屏桌面蓝牙操作 (平放桌面旋转即可缩放时间线/调音量/滚动网页)",
        "精工一体成型铝合金机身与防滑硅胶底座"
      ],
      "compatibilityList": [
        {
          "deviceId": "pro-12-13-intel",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转操作"
        },
        {
          "deviceId": "pro-12-13-snap",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转操作"
        },
        {
          "deviceId": "pro-12-13",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转操作 (调音量、翻页、时间轴缩放)"
        },
        {
          "deviceId": "pro-12-inch",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-11-13",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转操作"
        },
        {
          "deviceId": "pro-10-biz",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转操作"
        },
        {
          "deviceId": "pro-9",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转操作"
        },
        {
          "deviceId": "pro-8",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转操作"
        },
        {
          "deviceId": "pro-7-plus",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-7",
          "status": "FULL",
          "note": "支持屏幕吸附感知与径向菜单"
        },
        {
          "deviceId": "pro-6",
          "status": "FULL",
          "note": "支持屏幕吸附感知与径向菜单"
        },
        {
          "deviceId": "pro-5",
          "status": "FULL",
          "note": "支持屏幕吸附感知与径向菜单"
        },
        {
          "deviceId": "pro-4",
          "status": "FULL",
          "note": "支持屏幕吸附感知与径向菜单"
        },
        {
          "deviceId": "pro-3",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-2",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-1",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-x",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-8-138-intel",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-8-138-snap",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-8-150-intel",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-8-150-snap",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-8-138",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-8-150",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-7-138",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-6-biz",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-5",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-4",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-3",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-2",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-1",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "sls-2",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转与参数调节"
        },
        {
          "deviceId": "sls-1",
          "status": "PARTIAL",
          "note": "支持离屏桌面蓝牙旋转与参数调节"
        },
        {
          "deviceId": "go-4",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "go-3",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-go-3",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "studio-2-plus",
          "status": "FULL",
          "note": "完美支持屏上吸附与径向菜单交互 (数字艺术创作神器)"
        },
        {
          "deviceId": "duo-2",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "book-3-15",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "book-3-135",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "book-2-15",
          "status": "FULL",
          "note": "支持屏幕吸附交互与径向轮"
        },
        {
          "deviceId": "book-1",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "go-2",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "go-1",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-go-2",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-go-1",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "studio-2",
          "status": "FULL",
          "note": "完美支持屏上吸附与径向菜单交互"
        },
        {
          "deviceId": "studio-1",
          "status": "FULL",
          "note": "Surface Studio 标志性原厂神级交互配件"
        },
        {
          "deviceId": "hub-2s",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "duo-1",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-12-inch-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-13-inch-biz",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "pro-11-biz-snap",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-11-biz-intel",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-7-biz-snap",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-7-biz-intel",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "hub-3",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-go-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-9-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "pro-8-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "laptop-5-biz",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "sls-2-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "sls-1-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "go-3-biz",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "studio-2-plus-biz",
          "status": "FULL",
          "note": "完美支持屏上吸附与径向菜单交互"
        },
        {
          "deviceId": "laptop-13-inch",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-7-150",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "laptop-13-inch-intel-biz",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "book-3-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        },
        {
          "deviceId": "go-2-biz",
          "status": "PARTIAL",
          "note": "支持桌面离屏蓝牙旋钮操作"
        },
        {
          "deviceId": "pro-6-biz",
          "status": "UNSUPPORTED",
          "note": "不支持"
        }
      ]
    }
  ]
};

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
