/** Audited fields use exhaustive frozen decision tests; remaining expectations below retain prior scope. */
const OFFICIAL_CURRENT_LINEUP_FACTS = {
  "fetchedAt": "2026-09-21",
  "sources": {
    "buyPro": "https://www.microsoftstore.com.cn/buy-surface-pro",
    "buyLaptop": "https://www.microsoftstore.com.cn/buy-surface-laptop",
    "configurePro13": "https://www.microsoftstore.com.cn/configure/surface-pro-13-inch-12th-edition",
    "configurePro12": "https://www.microsoftstore.com.cn/configure/surface-pro-12-inch",
    "configureLaptop138": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-8-inch-8th-edition",
    "pro13IntelBiz": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business",
    "pro13SnapBiz": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon",
    "pro12Biz": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-12-inch-for-business",
    "laptop8IntelBiz": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business",
    "laptop8SnapBiz": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon",
    "laptop13SnapBiz": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-13-inch-for-business",
    "laptop13IntelBiz": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13-inch-for-business",
    "pro11SnapBiz": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business",
    "pro11IntelBiz": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business-intel",
    "laptop7SnapBiz": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business",
    "laptop7IntelBiz": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business-intel",
    "hub3Specs": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-3-techspecs",
    "compareDevices": "https://www.microsoftstore.com.cn/surface/compare-devices",
    "cnSurfacePortal": "https://www.microsoft.com/zh-cn/surface",
    "cnPro12Snap": "https://www.microsoft.com/zh-cn/surface/business/surface-pro-12-inch-snapdragon",
    "cnLaptop7Snap": "https://www.microsoft.com/zh-cn/surface/business/surface-laptop-7th-edition",
    "cnLaptop7Intel": "https://www.microsoft.com/zh-cn/surface/business/surface-laptop-intel-7th-edition",
    "intelUltra5_335": "https://www.intel.com/content/www/us/en/products/sku/245727/intel-core-ultra-5-processor-335-8m-cache-up-to-4-70-ghz/specifications.html",
    "intelUltra5_236V": "https://www.intel.com/content/www/us/en/products/sku/240959/intel-core-ultra-5-processor-236v-8m-cache-up-to-4-70-ghz/specifications.html",
    "qualcommXPlus": "https://www.qualcomm.com/products/mobile/snapdragon/laptops-and-tablets/snapdragon-x-plus",
    "qualcommX2Elite": "https://www.qualcomm.com/products/mobile/snapdragon/laptops-and-tablets/snapdragon-x2-elite",
    "laptopUltra": "https://www.microsoftstore.com.cn/surface/surface-laptop-ultra",
    "laptopUltraBiz": "https://www.microsoftstore.com.cn/surface/surface-laptop-ultra-for-business"
  },
  "currentCnDeviceIds": [
    "pro-12-13",
    "pro-12-inch",
    "pro-12-13-intel",
    "pro-12-13-snap",
    "pro-12-inch-biz",
    "laptop-8-138",
    "laptop-8-150",
    "laptop-13-inch",
    "laptop-8-138-intel",
    "laptop-8-138-snap",
    "laptop-8-150-intel",
    "laptop-8-150-snap",
    "laptop-13-inch-biz",
    "laptop-13-inch-intel-biz",
    "pro-11-biz-snap",
    "pro-11-biz-intel",
    "laptop-7-biz-snap",
    "laptop-7-biz-intel",
    "hub-3"
  ],
  "devices": {
    "pro-12-13": {
      "startingPriceContains": "12,888",
      "cpuMustInclude": [
        "X2 Plus",
        "X2 Elite"
      ],
      "cpuMustNotInclude": [
        "英特尔",
        "Intel",
        "酷睿"
      ],
      "storageMustInclude": "512",
      "colorNames": [
        "亮铂金",
        "典雅黑",
        "沙漫金"
      ],
      "screenSizeContains": "13",
      "ramMustInclude": [
        "16",
        "24",
        "64"
      ],
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "officialDocUrl": "https://www.microsoftstore.com.cn/configure/surface-pro-13-inch-12th-edition",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-12th-edition-intel-features",
      "specContains": {
        "cpuCores": [
          "10",
          "12"
        ]
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-12-inch": {
      "startingPriceContains": "6,788",
      "cpuMustInclude": [
        "X Plus"
      ],
      "ramMustInclude": [
        "8",
        "16"
      ],
      "ramMustNotInclude": "24",
      "storageMustInclude": "256",
      "cellularState": "NOT_APPLICABLE",
      "keyboardWeightState": "NOT_DISCLOSED",
      "officialDocUrl": "https://www.microsoftstore.com.cn/configure/surface-pro-12-inch",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-copilot-plus-pc-12inch-tech-specs",
      "repairabilityState": "NOT_DISCLOSED",
      "specContains": {},
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "thunderboltSupport": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-12-13-intel": {
      "startingPriceContains": "16,888",
      "cpuMustInclude": [
        "Ultra 5",
        "335"
      ],
      "npuTopsContains": "50",
      "batteryLifeVideoContains": "17",
      "batteryLifeOfficeContains": "11",
      "batteryCapacityContains": "47",
      "chargingPowerContains": "39",
      "brightnessContains": "900",
      "storageMustInclude": "256",
      "colorNames": [
        "亮铂金",
        "典雅黑"
      ],
      "dimensionsContains": "287",
      "weightContains": "895",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "ramMustInclude": [
        "16",
        "64"
      ],
      "usbMustInclude": "USB-C",
      "wifiMustInclude": "Wi-Fi 7",
      "osMustInclude": "专业",
      "warrantyContains": "3",
      "rearCameraContains": "1000",
      "rearCameraMustNotInclude": "1200",
      "frontCameraContains": "1440",
      "speakersContains": "2",
      "cellularContains": "5G",
      "cellularMustNotInclude": "eSIM",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-12th-edition-intel-features",
      "specContains": {
        "ppi": "267",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "surfaceConnect": "Connect",
        "ssdRemovable": "可拆卸",
        "chassisMaterial": "阳极氧化",
        "kickstandType": "165",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "gpuModel": "图形处理器",
        "npuModel": "AI Boost",
        "fastCharging": [
          "60",
          "65"
        ],
        "usbPorts": [
          "USB-C",
          "Thunderbolt",
          "DisplayPort"
        ],
        "thunderboltSupport": "Thunderbolt",
        "chargingPower": "39"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-12-13-snap": {
      "startingPriceContains": "15,488",
      "cpuMustInclude": [
        "X2"
      ],
      "npuTopsContains": "80",
      "batteryLifeVideoContains": "15.5",
      "batteryLifeOfficeContains": "11.5",
      "chargingPowerContains": "39",
      "brightnessContains": "900",
      "storageMustInclude": "256",
      "colorNames": [
        "亮铂金",
        "典雅黑"
      ],
      "dimensionsContains": "287",
      "weightContains": "895",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "ramMustInclude": [
        "16",
        "64"
      ],
      "ramMustNotInclude": "24",
      "usbMustInclude": "USB-C",
      "wifiMustInclude": "Wi-Fi 7",
      "osMustInclude": "专业",
      "warrantyContains": "3",
      "rearCameraContains": "1000",
      "rearCameraMustNotInclude": "1200",
      "frontCameraContains": "1440",
      "speakersContains": "2",
      "cellularState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon",
      "specContains": {
        "ppi": "267",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "surfaceConnect": "Connect",
        "ssdRemovable": "可拆卸",
        "chassisMaterial": "阳极氧化",
        "kickstandType": "165",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "gpuModel": "Adreno",
        "npuModel": "Hexagon",
        "fastCharging": [
          "60",
          "65"
        ],
        "cpuCores": [
          "10",
          "12"
        ],
        "usbPorts": [
          "USB-C",
          "USB4",
          "DisplayPort"
        ],
        "chargingPower": "39"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-8-138": {
      "startingPriceContains": "11,488",
      "cpuMustInclude": [
        "X2 Plus",
        "X2 Elite"
      ],
      "cpuMustNotInclude": [
        "英特尔",
        "Intel",
        "酷睿"
      ],
      "npuTopsContains": "80",
      "batteryLifeVideoContains": "20",
      "storageMustInclude": "512",
      "ramMustInclude": [
        "16",
        "24",
        "64"
      ],
      "refreshRateContains": "120",
      "screenSizeContains": "13.8",
      "weightState": "NOT_DISCLOSED",
      "cellularState": "NOT_APPLICABLE",
      "officialDocUrl": "https://www.microsoftstore.com.cn/configure/surface-laptop-13-8-inch-8th-edition",
      "repairabilityState": "NOT_DISCLOSED",
      "specContains": {
        "ppi": "201",
        "aspectRatio": "3:2",
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "touchAndPenProtocol": [
          "触控",
          "不支持触控笔"
        ],
        "npuModel": "Hexagon",
        "cpuCores": [
          "10",
          "12"
        ]
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-8-150": {
      "startingPriceContains": "12,888",
      "cpuMustInclude": [
        "X2 Plus",
        "X2 Elite"
      ],
      "cpuMustNotInclude": [
        "英特尔",
        "Intel",
        "酷睿"
      ],
      "npuTopsContains": "80",
      "batteryLifeVideoContains": "19",
      "ramMustInclude": "32",
      "storageMustInclude": "512",
      "storageMustNotInclude": "256",
      "refreshRateContains": "120",
      "screenSizeContains": "15",
      "weightState": "NOT_DISCLOSED",
      "cellularState": "NOT_APPLICABLE",
      "officialDocUrl": "https://www.microsoftstore.com.cn/buy-surface-laptop",
      "repairabilityState": "NOT_DISCLOSED",
      "specContains": {
        "ppi": "262",
        "aspectRatio": "3:2",
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "touchAndPenProtocol": [
          "触控",
          "不支持触控笔"
        ],
        "npuModel": "Hexagon",
        "expandableStorage": "MicroSD",
        "cpuCores": [
          "10",
          "12"
        ]
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-13-inch": {
      "startingPriceContains": "7,788",
      "cpuMustInclude": [
        "X Plus"
      ],
      "surfaceConnectState": "NOT_APPLICABLE",
      "ramMustInclude": [
        "8",
        "16"
      ],
      "storageMustInclude": "256",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-copilot-plus-pc-13inch-tech-specs",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "specContains": {},
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "thunderboltSupport": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-8-138-intel": {
      "startingPriceContains": "16,888",
      "cpuMustInclude": [
        "Ultra 5",
        "335",
        "Ultra X7"
      ],
      "cpuMustNotInclude": [
        "骁龙",
        "X2"
      ],
      "npuTopsContains": "50",
      "batteryLifeVideoContains": "23",
      "batteryLifeOfficeContains": "14.5",
      "chargingPowerContains": "39",
      "batteryCapacityContains": "54",
      "brightnessContains": "600",
      "storageMustInclude": "256",
      "colorNames": [
        "亮铂金",
        "典雅黑"
      ],
      "dimensionsContains": "301",
      "weightContains": "1.35",
      "resolutionContains": "2304",
      "refreshRateContains": "120",
      "screenSizeContains": "13.8",
      "ramMustInclude": [
        "16",
        "64"
      ],
      "osMustInclude": "专业",
      "warrantyContains": "3",
      "frontCameraContains": "1080",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-business-8th-edition-intel",
      "speakersContains": "Omnisonic",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "specContains": {
        "ppi": "201",
        "aspectRatio": "3:2",
        "headphoneJack": "3.5",
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "surfaceConnect": "Connect",
        "ssdRemovable": "可拆卸",
        "chassisMaterial": "阳极氧化",
        "touchAndPenProtocol": "10",
        "gpuModel": "图形处理器",
        "npuModel": "AI Boost",
        "fastCharging": [
          "60",
          "65"
        ],
        "chargingPower": "39"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-8-138-snap": {
      "startingPriceContains": "14,888",
      "cpuMustInclude": [
        "X2 Plus",
        "X2 Elite"
      ],
      "npuTopsContains": "80",
      "batteryLifeVideoContains": "20",
      "batteryLifeOfficeContains": "16",
      "brightnessContains": "600",
      "storageMustInclude": "256",
      "colorNames": [
        "亮铂金",
        "典雅黑"
      ],
      "dimensionsContains": "301",
      "weightContains": "1.36",
      "resolutionContains": "2304",
      "refreshRateContains": "120",
      "screenSizeContains": "13.8",
      "ramMustInclude": [
        "16",
        "64"
      ],
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon",
      "speakersContains": "Omnisonic",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "specContains": {
        "ppi": "201",
        "aspectRatio": "3:2",
        "headphoneJack": "3.5",
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "surfaceConnect": "Connect",
        "ssdRemovable": "可拆卸",
        "chassisMaterial": "阳极氧化",
        "touchAndPenProtocol": "10",
        "gpuModel": "Adreno",
        "npuModel": "Hexagon",
        "fastCharging": [
          "60",
          "65"
        ]
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-8-150-intel": {
      "startingPriceState": "NOT_DISCLOSED",
      "cpuMustInclude": [
        "Ultra 5",
        "335",
        "Ultra X7"
      ],
      "cpuMustNotInclude": [
        "骁龙",
        "X2"
      ],
      "npuTopsContains": "50",
      "batteryLifeVideoContains": "21",
      "batteryLifeOfficeContains": "14",
      "chargingPowerContains": "65",
      "batteryCapacityContains": "66",
      "brightnessContains": "600",
      "storageMustInclude": "256",
      "resolutionContains": "3270",
      "refreshRateContains": "120",
      "screenSizeContains": "15",
      "usbMustInclude": [
        "USB-A",
        "MicroSD"
      ],
      "wifiMustInclude": "Wi-Fi 7",
      "ramMustInclude": "64",
      "dimensionsContains": "329",
      "weightContains": "1.67",
      "osMustInclude": "专业",
      "warrantyContains": "3",
      "frontCameraContains": "1080",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business",
      "speakersContains": "Omnisonic",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "specContains": {
        "ppi": "262",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "surfaceConnect": "Connect",
        "ssdRemovable": "可拆卸",
        "chassisMaterial": "阳极氧化",
        "touchAndPenProtocol": "10",
        "gpuModel": "图形处理器",
        "npuModel": "AI Boost",
        "fastCharging": [
          "60",
          "65"
        ],
        "usbPorts": [
          "USB-C",
          "USB-A",
          "MicroSDXC",
          "Thunderbolt"
        ],
        "chargingPower": "65"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-8-150-snap": {
      "startingPriceState": "NOT_DISCLOSED",
      "cpuMustInclude": [
        "X2 Plus",
        "X2 Elite"
      ],
      "npuTopsContains": "80",
      "batteryLifeVideoContains": "19",
      "batteryLifeOfficeContains": "14",
      "brightnessContains": "600",
      "storageMustInclude": "256",
      "resolutionContains": "3270",
      "refreshRateContains": "120",
      "screenSizeContains": "15",
      "usbMustInclude": [
        "USB-A",
        "USB4"
      ],
      "wifiMustInclude": "Wi-Fi 7",
      "dimensionsContains": "329",
      "weightContains": "1.66",
      "ramMustInclude": [
        "16",
        "64"
      ],
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13.8-and-15-inch-for-business-snapdragon",
      "speakersContains": "Omnisonic",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "specContains": {
        "ppi": "262",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "surfaceConnect": "Connect",
        "ssdRemovable": "可拆卸",
        "chassisMaterial": "阳极氧化",
        "touchAndPenProtocol": "10",
        "gpuModel": "Adreno",
        "npuModel": "Hexagon",
        "fastCharging": [
          "60",
          "65"
        ],
        "usbPorts": [
          "USB-C",
          "USB4",
          "USB-A"
        ]
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-12-inch-biz": {
      "startingPriceContains": "9,788",
      "cpuMustInclude": [
        "X Plus"
      ],
      "npuTopsContains": "45",
      "batteryLifeVideoContains": "16",
      "batteryLifeOfficeContains": "12",
      "brightnessContains": "400",
      "dimensionsContains": "274",
      "weightContains": "686",
      "ramMustInclude": "24",
      "resolutionContains": "2196",
      "refreshRateContains": "90",
      "screenSizeContains": "12",
      "storageMustInclude": "1TB",
      "wifiMustInclude": "Wi-Fi 7",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-12-inch-for-business",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-copilot-plus-pc-12inch-tech-specs",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "rearCameraContains": "1000",
      "speakersContains": "2",
      "cellularState": "NOT_APPLICABLE",
      "specContains": {
        "ppi": "220",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "增强"
        ],
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "touchAndPenProtocol": "10",
        "gpuModel": "Adreno",
        "npuModel": "Hexagon",
        "fastCharging": "45",
        "cpuCores": "8",
        "panelTech": "LCD"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "thunderboltSupport": "NOT_APPLICABLE",
        "ssdRemovable": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-13-inch-biz": {
      "startingPriceContains": "10,788",
      "cpuMustInclude": [
        "X Plus"
      ],
      "npuTopsContains": "45",
      "batteryLifeVideoContains": "23",
      "batteryLifeOfficeContains": "16",
      "batteryCapacityContains": "50",
      "brightnessContains": "400",
      "dimensionsContains": "285.65",
      "weightContains": "1.22",
      "resolutionContains": "1920",
      "refreshRateContains": "60",
      "screenSizeContains": "13",
      "wifiMustInclude": "Wi-Fi 7",
      "ramMustInclude": "24",
      "storageMustInclude": "256",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-13-inch-for-business",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-copilot-plus-pc-13inch-tech-specs",
      "warrantyContains": "3",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": "Dolby Audio",
      "speakersMustNotInclude": [
        "Atmos",
        "全景声"
      ],
      "specContains": {
        "ppi": "178",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "增强"
        ],
        "headphoneJack": "3.5",
        "windowsHello": [
          "指纹"
        ],
        "microphones": "Studio",
        "audioTech": "Audio",
        "chassisMaterial": "阳极氧化",
        "touchAndPenProtocol": "10",
        "gpuModel": "Adreno",
        "npuModel": "Hexagon",
        "fastCharging": "60",
        "cpuCores": "8",
        "usbPorts": [
          "USB-C",
          "USB3.2"
        ]
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "thunderboltSupport": "NOT_APPLICABLE",
        "ssdRemovable": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-13-inch-intel-biz": {
      "startingPriceContains": "10,188",
      "cpuMustInclude": [
        "Ultra 5",
        "325"
      ],
      "cpuMustNotInclude": [
        "125"
      ],
      "npuTopsContains": "47",
      "batteryLifeVideoContains": "22",
      "batteryLifeOfficeContains": "14",
      "batteryCapacityContains": "50",
      "chargingPowerContains": "45",
      "brightnessContains": "500",
      "dimensionsContains": "285.65",
      "weightContains": "1.24",
      "storageMustInclude": "256",
      "resolutionContains": "1920",
      "refreshRateContains": "60",
      "screenSizeContains": "13",
      "wifiMustInclude": "Wi-Fi 7",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-8th-edition-13-inch-for-business",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-13-inch-features",
      "warrantyContains": "3",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": "Dolby Audio",
      "speakersMustNotInclude": [
        "Atmos",
        "全景声"
      ],
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "specContains": {
        "ppi": "178",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "touchAndPenProtocol": "10",
        "gpuModel": "图形处理器",
        "npuModel": "AI Boost",
        "fastCharging": "60",
        "chargingPower": "45"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "thunderboltSupport": "NOT_APPLICABLE",
        "ramSpec": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-11-biz-snap": {
      "startingPriceContains": "11,239",
      "cpuMustInclude": [
        "X Plus",
        "X Elite"
      ],
      "cpuMustNotInclude": [
        "X2",
        "135U"
      ],
      "npuTopsContains": "45",
      "batteryCapacityContains": "47",
      "dimensionsContains": "287",
      "weightContains": "895",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "ramMustInclude": "16",
      "ramMustNotInclude": "64",
      "storageMustInclude": "256",
      "wifiMustInclude": "Wi-Fi 7",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-snapdragon-tech-specs",
      "warrantyContains": "3",
      "osMustInclude": "专业",
      "frontCameraContains": "1440",
      "rearCameraContains": "1000",
      "speakersContains": "2",
      "cellularContains": "5G",
      "cellularMustNotInclude": "eSIM",
      "specContains": {
        "ppi": "267",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "surfaceConnect": "Surface Connect",
        "chassisMaterial": "阳极氧化",
        "kickstandType": "165",
        "touchAndPenProtocol": "10",
        "gpuModel": "Adreno",
        "npuModel": "Hexagon",
        "fastCharging": "65",
        "cpuCores": [
          "10",
          "12"
        ]
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-11-biz-intel": {
      "startingPriceContains": "14,488",
      "cpuMustInclude": [
        "236V",
        "268V"
      ],
      "cpuMustNotInclude": [
        "135U",
        "11.5"
      ],
      "npuTopsContains": "40",
      "batteryCapacityContains": "47",
      "brightnessContains": "600",
      "dimensionsContains": "287",
      "weightContains": "872",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "ramMustInclude": "16",
      "storageMustInclude": "256",
      "wifiMustInclude": "Wi-Fi7",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-for-business-intel",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-intel-tech-specs",
      "warrantyContains": "3",
      "osMustInclude": "专业",
      "frontCameraContains": "1440",
      "rearCameraContains": "1000",
      "speakersContains": "2",
      "cellularState": "NOT_DISCLOSED",
      "specContains": {
        "ppi": "267",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "surfaceConnect": "Surface Connect",
        "chassisMaterial": "阳极氧化",
        "kickstandType": "165",
        "touchAndPenProtocol": "10",
        "gpuModel": "Arc",
        "npuModel": "AI Boost",
        "thunderboltSupport": "Thunderbolt",
        "fastCharging": "60W"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-7-biz-snap": {
      "startingPriceContains": "11,329",
      "cpuMustInclude": [
        "X Plus",
        "X Elite"
      ],
      "cpuMustNotInclude": [
        "X2",
        "135H"
      ],
      "npuTopsContains": "45",
      "batteryLifeVideoContains": "20",
      "batteryLifeOfficeContains": "13",
      "batteryCapacityContains": "54",
      "dimensionsContains": "301",
      "weightContains": "1.34",
      "resolutionContains": "2304",
      "refreshRateContains": "120",
      "screenSizeContains": "13.8",
      "ramMustInclude": "16",
      "ramMustNotInclude": "64",
      "storageMustInclude": "256",
      "wifiMustInclude": "Wi-Fi7",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-snapdragon-tech-specs",
      "warrantyContains": "3",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": [
        "Omnisonic",
        "Atmos"
      ],
      "specContains": {
        "ppi": "201",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "surfaceConnect": "Surface Connect",
        "chassisMaterial": "阳极氧化",
        "touchAndPenProtocol": "10",
        "gpuModel": "Adreno",
        "npuModel": "Hexagon",
        "expandableStorage": "MicroSD",
        "cpuCores": [
          "10",
          "12"
        ]
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "fastCharging": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-7-biz-intel": {
      "startingPriceContains": "14,488",
      "cpuMustInclude": [
        "236V",
        "268V"
      ],
      "cpuMustNotInclude": [
        "135H",
        "11.5"
      ],
      "npuTopsContains": "40",
      "batteryLifeVideoContains": "20",
      "batteryLifeOfficeContains": "12",
      "batteryCapacityContains": "54",
      "brightnessContains": "600",
      "dimensionsContains": "301",
      "weightContains": "1.35",
      "resolutionContains": "2304",
      "refreshRateContains": "120",
      "screenSizeContains": "13.8",
      "ramMustInclude": "16",
      "ramMustNotInclude": "64",
      "storageMustInclude": "256",
      "wifiMustInclude": "Wi-Fi7",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-for-business-intel",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-intel-tech-specs",
      "warrantyContains": "3",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": "Omnisonic",
      "specContains": {
        "ppi": "201",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "windowsHello": "Hello",
        "microphones": "Studio",
        "audioTech": "Atmos",
        "surfaceConnect": "Surface Connect",
        "chassisMaterial": "阳极氧化",
        "touchAndPenProtocol": "10",
        "gpuModel": "Arc",
        "npuModel": "AI Boost",
        "thunderboltSupport": "Thunderbolt",
        "expandableStorage": "MicroSD",
        "fastCharging": "60W",
        "usbPorts": [
          "USB-C",
          "USB4",
          "DP 2.1"
        ]
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "hub-3": {
      "startingPriceState": "NOT_DISCLOSED",
      "cpuMustInclude": [
        "i5"
      ],
      "batteryCapacityState": "NOT_APPLICABLE",
      "batteryLifeOfficeState": "NOT_APPLICABLE",
      "batteryLifeVideoState": "NOT_APPLICABLE",
      "dimensionsContains": "741",
      "weightContains": "28",
      "ramMustInclude": "32",
      "storageMustInclude": "512",
      "resolutionContains": "3840",
      "screenSizeContains": "50",
      "usbMustInclude": "USB-C",
      "wifiMustInclude": "Wi-Fi 5",
      "officialDocUrl": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-3-techspecs",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-3-techspecs",
      "osMustInclude": "Windows 11",
      "frontCameraContains": "4K",
      "speakersContains": "三",
      "specContains": {
        "aspectRatio": "3:2",
        "ssdRemovable": "可拆卸",
        "touchAndPenProtocol": "10",
        "microphones": "麦克",
        "chassisMaterial": "铝"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE",
        "npuModel": "NOT_APPLICABLE",
        "copilotPlus": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-12-inch-2": {
      "specState": {
        "startingPriceCny": "NULL",
        "surfaceConnect": "NULL"
      },
      "cpuMustInclude": [
        "X2 Plus",
        "6"
      ],
      "npuTopsContains": "80",
      "batteryLifeVideoContains": "15.5",
      "batteryLifeOfficeContains": "13",
      "batteryCapacityContains": "38",
      "brightnessContains": "500",
      "chargingPowerContains": "60",
      "dimensionsContains": "274",
      "weightContains": "686",
      "resolutionContains": "2196",
      "refreshRateContains": "90",
      "screenSizeContains": "12",
      "ramMustInclude": [
        "8",
        "16",
        "24"
      ],
      "storageMustInclude": "UFS",
      "usbMustInclude": "USB 3.2",
      "wifiMustInclude": "Wi-Fi 7",
      "osMustInclude": "家庭",
      "rearCameraContains": "1000",
      "frontCameraContains": "1080",
      "colorNames": [
        "亮铂金",
        "罗兰紫",
        "典雅黑"
      ],
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro"
    },
    "laptop-13-inch-2": {
      "specState": {
        "startingPriceCny": "NULL"
      },
      "cpuMustInclude": [
        "X2 Plus",
        "6"
      ],
      "npuTopsContains": "80",
      "batteryLifeVideoContains": "22.5",
      "chargingPowerContains": "45",
      "refreshRateContains": "60",
      "screenSizeContains": "13",
      "ramMustInclude": [
        "16 GB",
        "24 GB"
      ],
      "storageMustInclude": "256 GB",
      "storageMustNotInclude": "1TB",
      "specContains": {
        "headphoneJack": [
          "3.5"
        ],
        "usbPorts": [
          "USB-C",
          "USB 3.2",
          "USB-A"
        ],
        "storageOptions": [
          "256 GB",
          "512 GB"
        ]
      },
      "usbMustInclude": "USB 3.2",
      "cellularState": "NOT_APPLICABLE",
      "colorNames": [
        "罗兰紫",
        "亮铂金",
        "典雅黑"
      ],
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-ultra": {
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-ultra"
    },
    "laptop-ultra-biz": {
      "resolutionContains": "3270",
      "batteryCapacityContains": "92",
      "weightContains": "2.0",
      "storageMustInclude": "512",
      "ramMustInclude": [
        "24",
        "128"
      ],
      "warrantyContains": "3",
      "officialDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-ultra-for-business",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    }
  }
};
module.exports=OFFICIAL_CURRENT_LINEUP_FACTS;
