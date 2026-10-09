/** Historical expectations retained only where not superseded by the explicit 2026-10-09 field audit.
 * Audited fields are checked exhaustively in field-audit-completion.test.js, including unknown masking. */
const OFFICIAL_HISTORICAL_LINEUP_FACTS = {
  "fetchedAt": "2026-09-21",
  "sources": {
    "pro11Snap": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-snapdragon-tech-specs",
    "laptop7Snap": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-snapdragon-tech-specs",
    "sls2Support": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-2-features",
    "studio2plusSupport": "https://support.microsoft.com/en-us/surface/models/surface-studio-2-features",
    "pro8Support": "https://support.microsoft.com/en-us/surface/models/surface-pro-8-features-and-specs",
    "pro9Support": "https://support.microsoft.com/en-US/surface/models/surface-pro-9-features-and-specs",
    "laptop5Support": "https://support.microsoft.com/en-us/surface/models/surface-laptop-5-specs-and-features",
    "pro7Support": "https://support.microsoft.com/en-US/surface/models/surface-pro-7-specs-and-features",
    "pro7plusSupport": "https://support.microsoft.com/en-us/surface/models/surface-pro-7-features-and-specs",
    "sls1Support": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-features",
    "go3Support": "https://support.microsoft.com/en-us/surface/models/surface-go-3-features",
    "laptopGo3Biz": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-go-3-for-business",
    "laptopGo3Store": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-go-3",
    "pro9Store": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-pro-9",
    "laptop5BizStore": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-5-for-business",
    "go4Store": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-go-4-for-business",
    "sls2BizStore": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-studio-2-for-business",
    "sls2Store": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-studio-2",
    "pro11Store": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-pro-11th-edition",
    "laptop7Store": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-laptop-7th-edition",
    "laptop5Zh": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-5-specs-and-features",
    "pro8Zh": "https://support.microsoft.com/zh-cn/surface/models/surface-pro-8-features-and-specs",
    "pro7Zh": "https://support.microsoft.com/zh-cn/surface/models/surface-pro-7-specs-and-features",
    "book3Zh": "https://support.microsoft.com/zh-cn/surface/models/surface-book-3-specs-and-features",
    "laptop3Zh": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-3-specs-and-features",
    "go2Zh": "https://support.microsoft.com/zh-cn/surface/models/surface-go-2-specs-and-features",
    "pro9BizStore": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-pro-9-for-business",
    "laptop6Store": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-6-for-business",
    "pro10Biz": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-pro-10-for-business",
    "studio2plusCn": "https://www.microsoftstore.com.cn/refurbished/certified-refurbished-surface-studio-2-plus",
    "book3Support": "https://support.microsoft.com/en-us/surface/models/surface-book-3-specs-and-features",
    "pro6Support": "https://support.microsoft.com/en-us/surface/models/surface-pro-6-specs-and-features",
    "studio2Support": "https://support.microsoft.com/en-us/surface/models/surface-studio-2-features-and-specs",
    "go4Support": "https://support.microsoft.com/en-us/surface/models/surface-go-4-features",
    "pro3Support": "https://support.microsoft.com/en-us/surface/models/surface-pro-3-specs-and-features",
    "pro2Support": "https://support.microsoft.com/en-us/surface/models/surface-pro-2-specs-and-features",
    "pro1Support": "https://support.microsoft.com/en-us/surface/models/surface-pro-1st-gen-specifications",
    "laptop1Support": "https://support.microsoft.com/en-us/surface/models/surface-laptop-1st-gen-specs-and-features",
    "go1Support": "https://support.microsoft.com/en-us/surface/models/surface-go-1st-gen-specs-and-features",
    "book1Support": "https://support.microsoft.com/en-us/surface/models/surface-book-1st-gen-specs-and-features",
    "duo1Support": "https://support.microsoft.com/en-us/surface/models/surface-duo-1st-gen-features-and-specs",
    "duo2Support": "https://support.microsoft.com/en-us/surface/models/surface-duo-2-features",
    "duo2FactSheet": "https://news.microsoft.com/wp-content/uploads/prod/sites/617/2021/09/Surface-Duo-2-Fact-Sheet.pdf",
    "studio1Support": "https://support.microsoft.com/en-us/surface/models/surface-studio-1st-gen-diagrams-and-tech-specs",
    "studio1FactSheet": "https://news.microsoft.com/windows-event-2016-assets/Surface-Studio-Fact-Sheet.pdf",
    "sls2FactSheet": "https://news.microsoft.com/wp-content/uploads/prod/sites/664/2023/09/Surface-Laptop-Studio-2-Fact-Sheet.pdf",
    "studio2plusFactSheet": "https://news.microsoft.com/wp-content/uploads/prod/sites/646/2022/10/Surface-Studio-2-Fact-Sheet.pdf",
    "go4FactSheet": "https://news.microsoft.com/wp-content/uploads/prod/sites/664/2023/09/Surface-Go-4-for-Business-Fact-Sheet.pdf",
    "laptop3FactSheet": "https://news.microsoft.com/wp-content/uploads/prod/sites/562/2019/10/Surface-Laptop-3-fact-sheet-10-3.pdf",
    "laptopGo1FactSheet": "https://news.microsoft.com/wp-content/uploads/prod/sites/587/2020/10/Surface-Laptop-Go-Fact-Sheet.pdf",
    "pro7plusFactSheet": "https://news.microsoft.com/wp-content/uploads/prod/2021/01/Surface-Pro-7-Plus_Fact-Sheet.pdf",
    "book2Support": "https://support.microsoft.com/en-us/surface/models/surface-book-2-specs-and-features",
    "laptop2Support": "https://support.microsoft.com/en-us/surface/models/surface-laptop-2-specs-and-features",
    "laptop3Support": "https://support.microsoft.com/en-us/surface/models/surface-laptop-3-specs-and-features",
    "laptopGo1Support": "https://support.microsoft.com/en-us/surface/models/surface-laptop-go-1st-gen-specs-and-features",
    "pro5Support": "https://support.microsoft.com/en-us/surface/models/surface-pro-5th-gen-specs-and-features",
    "pro4Support": "https://support.microsoft.com/en-us/surface/models/surface-pro-4-specs-and-features",
    "hub2sLearn": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-2s-techspecs",
    "hub2s85Learn": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-2s-85",
    "chargePro": "https://support.microsoft.com/en-us/surface/battery/surface-charging-requirements-and-power-supplies-surface-pro",
    "chargeLaptop": "https://support.microsoft.com/en-us/surface/battery/surface-charging-requirements-and-power-supplies-surface-laptop",
    "chargeGo": "https://support.microsoft.com/en-us/surface/battery/surface-charging-requirements-and-power-supplies-surface-go",
    "chargeLaptopGo": "https://support.microsoft.com/en-US/surface/battery/surface-charging-requirements-and-power-supplies-surface-laptop-go",
    "chargeBook": "https://support.microsoft.com/en-us/surface/battery/surface-charging-requirements-and-power-supplies-surface-book",
    "go3News": "https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-go-4-for-business",
    "laptopGo2News": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-go-2-features",
    "laptop6FactSheet": "https://www.microsoft.com/content/dam/microsoft/final/en-us/microsoft-product-and-services/surface/surface-laptop-6/Surface-Laptop-6-for-Business-Fact-Sheet.pdf",
    "sls1SpecSheet": "https://www.microsoft.com/content/dam/microsoft/final/en-us/microsoft-product-and-services/surface/surface-laptop-studio/Surface-Laptop-Studio-Spec-Sheet-Portrait.pdf"
  },
  "devices": {
    "pro-12-inch-2-biz": {
      "cpuMustInclude": [
        "X2 Plus",
        "6核"
      ],
      "cpuMustNotInclude": [
        "X Elite",
        "8 核"
      ],
      "npuTopsContains": "80",
      "ramMustInclude": [
        "16GB",
        "24GB"
      ],
      "ramMustNotInclude": "8GB",
      "storageMustInclude": "UFS",
      "dimensionsContains": "274",
      "weightContains": "686",
      "batteryLifeVideoContains": "15.5",
      "batteryLifeOfficeContains": "13",
      "batteryCapacityContains": "38",
      "brightnessContains": "500",
      "resolutionContains": "2196",
      "refreshRateContains": "90",
      "screenSizeContains": "12",
      "wifiMustInclude": "Wi-Fi 7",
      "cellularContains": "5G",
      "osMustInclude": "专业版",
      "osMustNotInclude": "家庭版",
      "learnDocUrl": "https://www.microsoftstore.com.cn/surface/surface-pro-11th-edition-12-inch-2nd-edition-for-business",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-13-inch-2-biz": {
      "cpuMustInclude": [
        "X2 Plus",
        "6核"
      ],
      "cpuMustNotInclude": [
        "X Elite",
        "8 核"
      ],
      "npuTopsContains": "80",
      "ramMustInclude": [
        "16GB",
        "24GB"
      ],
      "ramMustNotInclude": "8GB",
      "storageMustInclude": "UFS",
      "specContains": {
        "storageOptions": [
          "256GB",
          "512GB",
          "1TB",
          "UFS",
          "第4代SSD"
        ]
      },
      "dimensionsContains": "285.65",
      "weightContains": "1.23",
      "batteryLifeVideoContains": "22.5",
      "batteryLifeOfficeContains": "18",
      "batteryCapacityContains": "50",
      "brightnessContains": "500",
      "resolutionContains": "1920",
      "refreshRateContains": "60",
      "screenSizeContains": "13",
      "wifiMustInclude": "Wi-Fi 7",
      "cellularState": "NOT_APPLICABLE",
      "osMustInclude": "专业版",
      "osMustNotInclude": "家庭版",
      "learnDocUrl": "https://www.microsoftstore.com.cn/surface/surface-laptop-7th-edition-13-inch-2nd-edition-for-business",
      "specState": {
        "ssdRemovable": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-11-13": {
      "cpuMustInclude": [
        "X Plus",
        "X Elite"
      ],
      "npuTopsContains": "45",
      "batteryLifeVideoContains": "14",
      "batteryLifeOfficeContains": "10",
      "screenSizeContains": "13",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "rearCameraContains": "1000",
      "speakersState": "NOT_DISCLOSED",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-snapdragon-tech-specs",
      "specContains": {
        "chassisMaterial": "再生铝合金"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-7-138": {
      "batteryLifeVideoContains": "20",
      "batteryLifeOfficeContains": "13",
      "npuTopsContains": "45",
      "chargingPowerContains": "39",
      "screenSizeContains": "13.8",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "speakersState": "NOT_DISCLOSED",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-snapdragon-tech-specs",
      "specContains": {
        "chassisMaterial": "再生铝合金",
        "fastCharging": "65W"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-7-150": {
      "batteryLifeVideoContains": "22",
      "batteryLifeOfficeContains": "15",
      "npuTopsContains": "45",
      "screenSizeContains": "15",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "warrantyState": "NULL",
      "speakersState": "NULL",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface/tech-specs/surface-laptop-snapdragon-tech-specs",
      "specContains": {
        "chassisMaterial": "再生铝合金"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "fastCharging": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "sls-2": {
      "cpuMustInclude": [
        "13700H"
      ],
      "cpuMustNotInclude": [
        "13800H"
      ],
      "ramMustInclude": "64",
      "storageMustInclude": "512",
      "storageMustNotInclude": "256",
      "resolutionContains": "2400",
      "refreshRateContains": "120",
      "screenSizeContains": "14.4",
      "usbMustInclude": [
        "USB-A",
        "MicroSD"
      ],
      "npuTopsState": "NOT_DISCLOSED",
      "wifiMustInclude": "Wi-Fi 6E",
      "wifiMustNotInclude": "Wi-Fi 7",
      "batteryCapacityContains": "58",
      "batteryLifeOfficeContains": "19",
      "chargingPowerContains": "120",
      "dimensionsContains": "323",
      "weightContains": "1.89",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "warrantyContains": "非中国地区保修认证",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": [
        "Omnisonic",
        "Atmos"
      ],
      "speakersMustNotInclude": "低音",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-2-features",
      "specContains": {
        "ppi": "200",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "expandableStorage": "MicroSD",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "ssdRemovable": [
          "可拆卸",
          "技术人员"
        ],
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "阳极氧化",
        "chargingPower": [
          "102W",
          "120W",
          "不是最低"
        ],
        "kickstandType": "铰链"
      },
      "specState": {
        "kickstandType": "VALID"
      },
      "warrantyState": "VALID",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "sls-2-biz": {
      "cpuMustInclude": [
        "13800H"
      ],
      "cpuMustNotInclude": [
        "13700H"
      ],
      "npuTopsState": "NOT_DISCLOSED",
      "ramMustInclude": "64",
      "storageMustInclude": "512",
      "storageMustNotInclude": "256",
      "batteryCapacityContains": "58",
      "batteryLifeOfficeContains": "18",
      "dimensionsContains": "323",
      "weightContains": "1.98",
      "resolutionContains": "2400",
      "refreshRateContains": "120",
      "screenSizeContains": "14.4",
      "warrantyState": "NOT_DISCLOSED",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": [
        "Omnisonic",
        "Atmos"
      ],
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-2-features",
      "specContains": {
        "gpuModel": "RTX",
        "ppi": "200",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "expandableStorage": "MicroSD",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "ssdRemovable": [
          "可拆卸",
          "技术人员"
        ],
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "阳极氧化",
        "kickstandType": "铰链"
      },
      "specState": {
        "kickstandType": "VALID"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "studio-2-plus-biz": {
      "cpuMustInclude": [
        "第11代",
        "i7-H"
      ],
      "ramMustInclude": "DDR4",
      "ramMustNotInclude": "LPDDR5x",
      "storageMustInclude": "1TB",
      "storageMustNotInclude": "256",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "637.35",
      "weightContains": "9.56",
      "resolutionContains": "4500",
      "screenSizeContains": "28",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": "Atmos",
      "speakersMustNotInclude": "Omnisonic",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-studio-2-features",
      "specContains": {
        "gpuModel": "3060",
        "ppi": "192",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "thunderboltSupport": "Thunderbolt",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "kickstandType": "Zero Gravity"
      },
      "specState": {
        "surfaceConnect": "NOT_APPLICABLE",
        "kickstandType": "VALID",
        "fastCharging": "NOT_APPLICABLE"
      },
      "warrantyContains": "不是中国保修承诺",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-8-biz": {
      "cpuMustInclude": [
        "1115G4",
        "1145G7",
        "1185G7"
      ],
      "ramMustInclude": "LPDDR4x",
      "ramMustNotInclude": "LPDDR5x",
      "storageMustInclude": "128",
      "weightContains": "891",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "warrantyState": "VALID",
      "osMustInclude": "专业",
      "frontCameraContains": [
        "500",
        "1080"
      ],
      "rearCameraContains": "1000",
      "speakersContains": [
        "2W",
        "Atmos"
      ],
      "cellularContains": "LTE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-8-features-and-specs",
      "specContains": {
        "gpuModel": "Iris",
        "ppi": "267",
        "headphoneJack": "3.5",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": "10点触控",
        "chassisMaterial": "氧化铝"
      },
      "specState": {
        "expandableStorage": "NOT_APPLICABLE",
        "fastCharging": "NULL"
      },
      "warrantyContains": "非中国保修认证",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-9-biz": {
      "cpuMustInclude": [
        "1245U",
        "1265U",
        "Intel"
      ],
      "ramMustInclude": "LPDDR5",
      "ramMustNotInclude": "LPDDR5x",
      "wifiMustInclude": "Wi-Fi 6E",
      "wifiMustNotInclude": "Wi-Fi 7",
      "bluetoothMustInclude": "5.1",
      "batteryCapacityContains": "47.7",
      "batteryLifeOfficeContains": "15.5",
      "dimensionsContains": "209",
      "weightContains": "879",
      "storageMustInclude": "128",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "warrantyContains": "2",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "rearCameraContains": "1000",
      "speakersContains": "2W",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-pro-9-features-and-specs",
      "specContains": {
        "gpuModel": "Intel Iris Xe",
        "ppi": "267",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "ssdRemovable": "可拆",
        "windowsHello": "Hello",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "chassisMaterial": "阳极氧化"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-5-biz": {
      "cpuMustInclude": [
        "1245U",
        "1265U"
      ],
      "ramMustInclude": "8GB",
      "wifiMustInclude": "Wi-Fi 6",
      "wifiMustNotInclude": "Wi-Fi 7",
      "bluetoothMustInclude": "5.1",
      "batteryLifeOfficeContains": "18",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "dimensionsContains": "308",
      "weightContains": "1560",
      "brightnessState": "NOT_DISCLOSED",
      "resolutionContains": "2256",
      "screenSizeContains": "13.5",
      "storageMustInclude": "256",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyContains": "2",
      "osMustInclude": "专业",
      "frontCameraContains": "720",
      "speakersContains": [
        "Omnisonic",
        "Atmos"
      ],
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-5-specs-and-features",
      "specContains": {
        "gpuModel": "Iris",
        "ppi": "201",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "chassisMaterial": "阳极氧化"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE"
      },
      "batteryCapacityContains": "47.4",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-7": {
      "cpuMustInclude": [
        "1005G1",
        "1035G4",
        "1065G7"
      ],
      "ramMustInclude": "LPDDR4x",
      "wifiMustInclude": "Wi-Fi 6",
      "batteryLifeOfficeContains": "10.5",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "292",
      "weightContains": "775",
      "storageMustInclude": "128",
      "resolutionContains": "2736",
      "screenSizeContains": "12.3",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": "500",
      "rearCameraContains": "800",
      "speakersContains": "1.6W",
      "speakersMustNotInclude": "全景声",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-pro-7-specs-and-features",
      "specContains": {
        "gpuModel": [
          "UHD",
          "Iris"
        ],
        "ppi": "267",
        "headphoneJack": "3.5",
        "expandableStorage": [
          "microSD"
        ],
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "warrantyContains": "非中国保修认证",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-7-plus": {
      "cpuMustInclude": [
        "i3",
        "i5"
      ],
      "batteryCapacityContains": "47.4",
      "wifiMustInclude": "Wi-Fi 6",
      "batteryLifeOfficeContains": "15",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "292",
      "weightContains": "770",
      "resolutionContains": "2736",
      "screenSizeContains": "12.3",
      "usbMustInclude": "USB-A",
      "ramMustInclude": "8GB",
      "storageMustInclude": "128",
      "refreshRateState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "osState": "NOT_DISCLOSED",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "cellularState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-7-features-and-specs",
      "specContains": {
        "gpuModel": [
          "UHD",
          "Iris"
        ],
        "ppi": "267",
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "ssdRemovable": "可拆卸",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "chassisMaterial": "镁",
        "frontCamera": "500万",
        "rearCamera": "800万",
        "cellular": "LTE"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "go-3-biz": {
      "wifiMustNotInclude": "Wi-Fi 7",
      "refreshRateState": "NOT_DISCLOSED",
      "resolutionState": "NOT_DISCLOSED",
      "dimensionsState": "NOT_DISCLOSED",
      "batteryCapacityState": "NOT_DISCLOSED",
      "wifiState": "NOT_DISCLOSED",
      "osMustInclude": "专业",
      "cellularContains": "LTE",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-go-3-features",
      "specContains": {
        "headphoneJack": "插孔",
        "expandableStorage": [
          "microSD"
        ],
        "surfaceConnect": "Connect",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "fastCharging": [
          "1.5小时",
          "80%"
        ]
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "sls-1-biz": {
      "brightnessState": "NOT_DISCLOSED",
      "refreshRateContains": "120",
      "screenSizeContains": "14.4",
      "osMustInclude": "专业",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-features",
      "specContains": {
        "headphoneJack": "插孔",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "windowsHello": "Hello",
        "microphones": "麦克"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-go-3-biz": {
      "cpuMustInclude": [
        "1235U"
      ],
      "cpuMustNotInclude": [
        "11th"
      ],
      "ramMustInclude": [
        "16GB"
      ],
      "bluetoothMustInclude": "5.1",
      "batteryLifeOfficeContains": "15",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "weightContains": "1.13",
      "screenSizeContains": "12.4",
      "refreshRateState": "NOT_DISCLOSED",
      "storageMustInclude": "256",
      "warrantyContains": "2",
      "osMustInclude": "专业",
      "frontCameraContains": "720",
      "speakersContains": "Omnisonic",
      "speakersMustNotInclude": [
        "Atmos",
        "全景声"
      ],
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-go-3-features",
      "specContains": {
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "windowsHello": [
          "8GB/128GB",
          "不含"
        ],
        "microphones": "麦克"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE"
      },
      "batteryCapacityContains": "41",
      "dimensionsContains": "278",
      "wifiMustInclude": "Wi-Fi 6",
      "resolutionContains": "1536",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-6-biz": {
      "cpuMustInclude": [
        "135H",
        "165H"
      ],
      "npuTopsState": "NOT_DISCLOSED",
      "ramMustNotInclude": "8GB",
      "storageMustInclude": "256",
      "wifiMustInclude": "Wi-Fi 6E",
      "batteryCapacityState": "NOT_DISCLOSED",
      "chargingPowerContains": "39",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "308",
      "resolutionContains": "2256",
      "refreshRateState": "NOT_DISCLOSED",
      "screenSizeContains": "13.5",
      "usbMustInclude": "USB-A",
      "warrantyContains": "2",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": "Omnisonic",
      "cellularState": "NOT_APPLICABLE",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-6-for-business-features",
      "specContains": {
        "ppi": "201",
        "colorSupport": [
          "sRGB",
          "增强"
        ],
        "headphoneJack": "3.5",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "npuModel": "AI Boost",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "阳极氧化"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE",
        "ramSpec": "NULL",
        "gpuModel": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-10-biz": {
      "cpuMustInclude": [
        "135U",
        "165U"
      ],
      "npuTopsState": "NOT_DISCLOSED",
      "ramMustInclude": "64",
      "batteryCapacityState": "NOT_DISCLOSED",
      "chargingPowerContains": "39",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "208.6",
      "weightContains": "879",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "storageMustInclude": "256",
      "usbMustInclude": "USB-C",
      "wifiMustInclude": "Wi-Fi 6E",
      "wifiMustNotInclude": "Wi-Fi 7",
      "warrantyContains": "2",
      "osMustInclude": "专业",
      "frontCameraContains": "1440",
      "rearCameraContains": "1000",
      "speakersContains": "2",
      "cellularState": "NOT_APPLICABLE",
      "repairabilityState": "NOT_DISCLOSED",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-pro-10-for-business-features",
      "specContains": {
        "gpuModel": [
          "Intel",
          "图形处理器"
        ],
        "ppi": "267",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "npuModel": "AI Boost",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "chassisMaterial": "阳极氧化",
        "kickstandType": "165",
        "chargingPower": "39"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "book-3-15": {
      "storageMustInclude": "2 TB",
      "wifiMustInclude": "Wi-Fi 6",
      "batteryLifeOfficeContains": "17.5",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "chargingPowerContains": "127",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "343",
      "weightContains": "1905",
      "resolutionContains": "3240",
      "screenSizeContains": "15",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightContains": "1905",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": "500",
      "rearCameraContains": "800",
      "speakersContains": "Atmos",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-3-specs-and-features",
      "specContains": {
        "gpuModel": "1660",
        "ppi": "260",
        "aspectRatio": "3:2",
        "headphoneJack": "3.5",
        "expandableStorage": "SDXC",
        "surfaceConnect": "Connect",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "cpuModel": "NULL",
        "ramSpec": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "book-3-135": {
      "wifiMustInclude": "Wi-Fi 6",
      "batteryLifeOfficeContains": "15.5",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "chargingPowerContains": "65",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "312",
      "weightContains": "1534",
      "storageMustInclude": "256",
      "storageMustNotInclude": "2TB",
      "resolutionContains": "3000",
      "screenSizeContains": "13.5",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightContains": [
        "1534",
        "1642"
      ],
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": "500",
      "rearCameraContains": "800",
      "speakersContains": "Dolby Atmos",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-3-specs-and-features",
      "specContains": {
        "gpuModel": "Iris",
        "ppi": "267",
        "aspectRatio": "3:2",
        "headphoneJack": "3.5",
        "expandableStorage": "SDXC",
        "surfaceConnect": "Connect",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "cpuModel": "NULL",
        "ramSpec": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-6": {
      "cpuMustInclude": [
        "8250U",
        "8650U"
      ],
      "ramMustInclude": "8GB",
      "storageMustInclude": "128",
      "wifiMustInclude": "802.11",
      "batteryLifeVideoContains": "13.5",
      "batteryCapacityState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "292",
      "weightContains": "770",
      "resolutionContains": "2736",
      "screenSizeContains": "12.3",
      "usbMustInclude": "Mini DisplayPort",
      "refreshRateState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": "500",
      "rearCameraContains": "800",
      "speakersContains": "1.6W",
      "speakersMustNotInclude": "全景声",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-6-specs-and-features",
      "specContains": {
        "gpuModel": "UHD",
        "ppi": "267",
        "headphoneJack": "3.5",
        "expandableStorage": "microSD",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-6-biz": {
      "cpuMustInclude": [
        "8350U",
        "8650U"
      ],
      "wifiMustInclude": "802.11",
      "batteryLifeVideoContains": "13.5",
      "batteryCapacityState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "292",
      "weightContains": "770",
      "ramMustInclude": "8GB",
      "storageMustInclude": "128",
      "resolutionContains": "2736",
      "screenSizeContains": "12.3",
      "usbMustInclude": "Mini DisplayPort",
      "refreshRateState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "warrantyContains": "不能作为中国地区保修承诺",
      "osMustInclude": "专业",
      "frontCameraContains": "500",
      "rearCameraContains": "800",
      "speakersContains": "1.6W",
      "speakersMustNotInclude": "全景声",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-pro-6-specs-and-features",
      "specContains": {
        "gpuModel": "UHD",
        "ppi": "267",
        "headphoneJack": "3.5",
        "expandableStorage": "microSD",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "studio-2-plus": {
      "cpuMustInclude": [
        "第11代",
        "i7-H"
      ],
      "ramMustInclude": "DDR4",
      "storageMustInclude": "1TB",
      "wifiMustInclude": "Wi-Fi6",
      "batteryLifeVideoState": "NOT_APPLICABLE",
      "batteryLifeOfficeState": "NOT_APPLICABLE",
      "batteryCapacityState": "NOT_APPLICABLE",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "637.35",
      "weightContains": "9.56",
      "resolutionContains": "4500",
      "screenSizeContains": "28",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "speakersContains": "Atmos",
      "speakersMustNotInclude": "低音炮",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-studio-2-features",
      "specContains": {
        "gpuModel": "3060",
        "ppi": "192",
        "aspectRatio": "3:2",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "thunderboltSupport": "Thunderbolt",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "kickstandType": "Zero Gravity"
      },
      "specState": {
        "surfaceConnect": "NOT_APPLICABLE",
        "kickstandType": "VALID",
        "fastCharging": "NOT_APPLICABLE"
      },
      "warrantyContains": "不是中国保修承诺",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "studio-2": {
      "cpuMustInclude": [
        "7820HQ"
      ],
      "ramMustInclude": "DDR4",
      "storageMustInclude": "1TB",
      "wifiMustInclude": "802.11",
      "batteryLifeVideoState": "NOT_APPLICABLE",
      "batteryLifeOfficeState": "NOT_APPLICABLE",
      "batteryCapacityState": "NOT_APPLICABLE",
      "brightnessState": "NOT_DISCLOSED",
      "chargingPowerState": "NOT_DISCLOSED",
      "dimensionsContains": "637.35",
      "weightContains": "9.56",
      "resolutionContains": "4500",
      "screenSizeContains": "28",
      "usbMustInclude": "USB-C",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "专业",
      "frontCameraContains": [
        "500",
        "1080"
      ],
      "speakersContains": "2.1",
      "speakersMustNotInclude": "低音",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-studio-2-features-and-specs",
      "specContains": {
        "gpuModel": [
          "1060",
          "1070"
        ],
        "ppi": "192",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "expandableStorage": "SDXC",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "kickstandType": "Zero Gravity"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "kickstandType": "VALID",
        "fastCharging": "NOT_APPLICABLE"
      },
      "warrantyContains": "不是中国保修承诺",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-5": {
      "cpuMustInclude": [
        "1235U",
        "1255U"
      ],
      "ramMustInclude": "LPDDR5x",
      "wifiMustInclude": "Wi-Fi 6",
      "batteryLifeOfficeContains": "18",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "308",
      "resolutionContains": "2256",
      "screenSizeContains": "13.5",
      "usbMustInclude": "USB-A",
      "storageMustInclude": "256",
      "refreshRateState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": "720",
      "speakersContains": "Dolby Atmos",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-5-specs-and-features",
      "specContains": {
        "gpuModel": "Iris",
        "ppi": "201",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "headphoneJack": "3.5",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "ssdRemovable": "可拆",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "chassisMaterial": "铝"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE"
      },
      "weightState": "NULL",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-8": {
      "cpuMustInclude": [
        "1135G7",
        "1185G7"
      ],
      "ramMustInclude": "LPDDR4x",
      "wifiMustInclude": "Wi-Fi6",
      "batteryLifeOfficeContains": "16",
      "batteryCapacityContains": "51.5",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "chargingPowerContains": "60",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "208",
      "weightContains": "891",
      "storageMustInclude": "128",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "usbMustInclude": "USB-C",
      "keyboardWeightState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": [
        "500",
        "1080"
      ],
      "rearCameraContains": "1000",
      "speakersContains": "Dolby Atmos",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-8-features-and-specs",
      "specContains": {
        "gpuModel": "Iris",
        "ppi": "267",
        "headphoneJack": "3.5",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Atmos",
        "touchAndPenProtocol": "10点触控",
        "chassisMaterial": "氧化铝"
      },
      "specState": {
        "expandableStorage": "NOT_APPLICABLE",
        "fastCharging": "NULL"
      },
      "warrantyContains": "非中国保修认证",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-9": {
      "cpuMustInclude": [
        "1235U",
        "1255U"
      ],
      "ramMustInclude": "LPDDR5",
      "wifiMustInclude": "Wi-Fi6E",
      "batteryLifeOfficeContains": "15.5",
      "npuTopsState": "NOT_DISCLOSED",
      "batteryCapacityContains": "47.7",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "209",
      "weightContains": "879",
      "storageMustInclude": "128",
      "resolutionContains": "2880",
      "refreshRateContains": "120",
      "screenSizeContains": "13",
      "usbMustInclude": "USB-C",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": "1080",
      "rearCameraContains": "1000",
      "speakersContains": "2W",
      "cellularContains": "5G",
      "cellularMustNotInclude": [],
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-9-features-and-specs",
      "specContains": {
        "gpuModel": [
          "Iris",
          "Adreno"
        ],
        "ppi": "267",
        "colorSupport": [
          "sRGB",
          "Vivid"
        ],
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "ssdRemovable": "可拆",
        "windowsHello": "Hello",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "chassisMaterial": "铝",
        "cellular": [
          "SQ3",
          "eSIM",
          "按地区"
        ]
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "go-4": {
      "cpuMustInclude": [
        "N200"
      ],
      "ramMustInclude": "8GB",
      "storageMustInclude": "64",
      "resolutionContains": "1920",
      "screenSizeContains": "10.5",
      "usbMustInclude": "USB-C",
      "wifiMustInclude": "Wi-Fi 6",
      "batteryLifeOfficeContains": "12.5",
      "batteryCapacityContains": "29",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "chargingPowerContains": "24",
      "dimensionsContains": "245",
      "weightContains": "521",
      "refreshRateState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "warrantyContains": "2",
      "osMustInclude": "专业",
      "frontCameraContains": "1080",
      "frontCameraMustNotInclude": "500",
      "rearCameraContains": "800",
      "speakersContains": "2W",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-4-features",
      "specContains": {
        "gpuModel": "UHD",
        "ppi": "220",
        "colorSupport": [
          "sRGB",
          "Enhanced"
        ],
        "headphoneJack": "3.5",
        "expandableStorage": [
          "microSD"
        ],
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "chassisMaterial": "镁",
        "kickstandType": "165",
        "fastCharging": "not_disclosed"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-3": {
      "cpuMustInclude": [
        "1035G7",
        "3580U"
      ],
      "ramMustInclude": "LPDDR4x",
      "ramMustNotInclude": "32GB",
      "wifiMustInclude": "Wi-Fi 6",
      "batteryLifeOfficeContains": "11.5",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "308",
      "weightContains": "1542",
      "resolutionContains": "2256",
      "screenSizeContains": "13.5",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "storageMustInclude": "128",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "frontCameraContains": "720",
      "speakersContains": "Omnisonic",
      "speakersMustNotInclude": "全景声",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-3-specs-and-features",
      "specContains": {
        "gpuModel": [
          "Iris",
          "Vega"
        ],
        "ppi": "201",
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "ssdRemovable": [
          "可拆卸",
          "技术人员"
        ],
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "铝"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "go-2": {
      "cpuMustInclude": [
        "4425Y"
      ],
      "storageMustInclude": "64",
      "wifiMustInclude": "802.11",
      "batteryLifeOfficeContains": "10",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "245",
      "weightContains": "544",
      "screenSizeContains": "10.5",
      "usbMustInclude": "USB-C",
      "resolutionContains": "1920",
      "refreshRateState": "NOT_DISCLOSED",
      "ramMustInclude": "4GB",
      "warrantyState": "VALID",
      "repairabilityState": "NOT_DISCLOSED",
      "osMustInclude": [
        "家庭",
        "S"
      ],
      "frontCameraContains": "500",
      "rearCameraContains": "800",
      "speakersContains": "2W",
      "speakersMustNotInclude": "全景声",
      "cellularContains": "LTE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-2-specs-and-features",
      "specContains": {
        "gpuModel": "UHD",
        "ppi": "220",
        "headphoneJack": "3.5",
        "expandableStorage": "microSD",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁",
        "fastCharging": "not_disclosed"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE"
      },
      "warrantyContains": "不是中国保修承诺",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "go-2-biz": {
      "cpuMustInclude": [
        "m3"
      ],
      "ramMustNotInclude": "LPDDR5x",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "screenSizeContains": "10.5",
      "refreshRateState": "NOT_DISCLOSED",
      "ramMustInclude": "8GB",
      "storageMustInclude": "128",
      "repairabilityState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "osMustInclude": "专业",
      "frontCameraContains": "500",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-2-specs-and-features",
      "specContains": {
        "microphones": "麦克",
        "cpuModel": "菲律宾"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-5": {
      "cpuMustInclude": [
        "第7代",
        "m3",
        "i5",
        "i7"
      ],
      "ramMustInclude": "4GB",
      "wifiMustInclude": "802.11",
      "batteryLifeVideoContains": "13.5",
      "batteryCapacityState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "292",
      "weightContains": "784",
      "resolutionContains": "2736",
      "screenSizeContains": "12.3",
      "usbMustInclude": "Mini DisplayPort",
      "refreshRateState": "NOT_DISCLOSED",
      "storageMustInclude": "128",
      "warrantyState": "VALID",
      "keyboardWeightState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "cellularState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-5th-gen-specs-and-features",
      "specContains": {
        "gpuModel": [
          "615",
          "620",
          "640"
        ],
        "ppi": "267",
        "headphoneJack": "3.5",
        "expandableStorage": "microSD",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "osAtLaunch": "Windows",
        "speakers": "Dolby",
        "cellular": "LTE"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "warrantyContains": "非中国保修认证",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-x": {
      "cpuMustInclude": [
        "SQ"
      ],
      "ramMustInclude": "LPDDR4x",
      "batteryCapacityContains": "39.2",
      "wifiMustInclude": "Wi-Fi 5",
      "batteryLifeOfficeContains": "15",
      "npuTopsState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "208",
      "weightContains": "774",
      "storageMustInclude": "128",
      "resolutionContains": "2880",
      "screenSizeContains": "13",
      "usbMustInclude": "USB-C",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "cellularState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-x-features-and-specs",
      "specContains": {
        "gpuModel": "Adreno",
        "ppi": "267",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "ssdRemovable": [
          "可拆卸",
          "技术人员"
        ],
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": [
          "10",
          "MPP"
        ],
        "chassisMaterial": "氧化铝",
        "frontCamera": "500万",
        "rearCamera": "1000万",
        "osAtLaunch": "Windows",
        "cellular": "LTE"
      },
      "specState": {
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE",
        "thunderboltSupport": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-go-1": {
      "cpuMustInclude": [
        "1035G1"
      ],
      "ramMustInclude": "LPDDR4x",
      "storageMustInclude": "64",
      "wifiMustInclude": "Wi-Fi 6",
      "batteryLifeOfficeContains": "13",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "chargingPowerContains": "39",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "278",
      "weightContains": "1110",
      "resolutionContains": "1536",
      "screenSizeContains": "12.4",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "speakersState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-go-1st-gen-specs-and-features",
      "specContains": {
        "gpuModel": "UHD",
        "ppi": "148",
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": [
          "指纹"
        ],
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "铝",
        "osAtLaunch": "Windows",
        "speakers": "Dolby"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE"
      },
      "warrantyContains": "不是中国保修承诺",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-go-2": {
      "cpuMustInclude": [
        "第11代Intel Core"
      ],
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsState": "NOT_DISCLOSED",
      "weightContains": "2.48",
      "screenSizeContains": "12.4",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "resolutionState": "NOT_DISCLOSED",
      "wifiState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "frontCameraContains": "720",
      "speakersContains": "Omnisonic",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-go-2-features",
      "specContains": {
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "windowsHello": [
          "指纹",
          "i5/4GB/128GB"
        ],
        "microphones": "麦克"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-go-3": {
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsState": "NOT_DISCLOSED",
      "weightContains": "2.49",
      "screenSizeContains": "12.4",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "resolutionState": "NOT_DISCLOSED",
      "wifiState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "frontCameraContains": "720",
      "speakersContains": "Omnisonic",
      "speakersMustNotInclude": [
        "Atmos",
        "全景声"
      ],
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-go-3-features",
      "specContains": {
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "windowsHello": [
          "指纹"
        ],
        "microphones": "麦克"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE",
        "cpuModel": "NULL"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "book-2-15": {
      "ramMustInclude": "16",
      "batteryLifeVideoContains": "17",
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "chargingPowerContains": "102",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "343",
      "weightContains": "1905",
      "storageMustInclude": "256",
      "resolutionContains": "3240",
      "screenSizeContains": "15",
      "usbMustInclude": "USB-C",
      "wifiMustInclude": "802.11",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "VALID",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-2-specs-and-features",
      "specContains": {
        "ppi": "260",
        "headphoneJack": "3.5",
        "expandableStorage": "SDXC",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁",
        "frontCamera": "500万",
        "rearCamera": "800万",
        "osAtLaunch": "Windows"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-4": {
      "cpuMustInclude": [
        "m3",
        "i5",
        "i7"
      ],
      "ramMustInclude": "4GB",
      "storageMustInclude": "128",
      "wifiMustInclude": "802.11ac",
      "batteryLifeVideoContains": "9",
      "batteryCapacityState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "292.1",
      "weightContains": "766",
      "resolutionContains": "2736",
      "screenSizeContains": "12.3",
      "usbMustInclude": "Mini DisplayPort",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-4-specs-and-features",
      "specContains": {
        "gpuModel": [
          "515",
          "520"
        ],
        "ppi": "267",
        "headphoneJack": "3.5",
        "expandableStorage": "microSD",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": [
          "人脸识别"
        ],
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁",
        "kickstandType": "150",
        "osAtLaunch": "Windows",
        "speakers": "Dolby"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-2": {
      "cpuMustInclude": [
        "i5",
        "i7"
      ],
      "ramMustInclude": "8GB",
      "wifiMustInclude": "802.11",
      "batteryLifeVideoContains": "14.5",
      "batteryCapacityState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "308.1",
      "weightContains": "1252",
      "resolutionContains": "2256",
      "screenSizeContains": "13.5",
      "refreshRateState": "NOT_DISCLOSED",
      "storageMustInclude": "128",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "osMustNotInclude": [],
      "frontCameraContains": "720",
      "speakersContains": "Omnisonic",
      "speakersMustNotInclude": "全景声",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-2-specs-and-features",
      "specContains": {
        "gpuModel": "UHD",
        "ppi": "201",
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "铝",
        "osAtLaunch": [
          "消费者",
          "商业客户"
        ]
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "sls-1": {
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "refreshRateContains": "120",
      "screenSizeContains": "14.4",
      "usbMustInclude": "USB-C",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "osMustNotInclude": "专业",
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/en-US/surface/models/surface-laptop-studio-features",
      "specContains": {
        "headphoneJack": "插孔",
        "thunderboltSupport": "Thunderbolt",
        "surfaceConnect": "Connect",
        "windowsHello": "Hello",
        "microphones": "麦克"
      },
      "specState": {
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "go-3": {
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "usbMustInclude": "USB-C",
      "refreshRateState": "NOT_DISCLOSED",
      "resolutionState": "NOT_DISCLOSED",
      "dimensionsState": "NOT_DISCLOSED",
      "wifiState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "osMustInclude": [
        "家庭",
        "S"
      ],
      "cellularContains": "LTE",
      "frontCameraState": "NOT_DISCLOSED",
      "rearCameraState": "NOT_DISCLOSED",
      "speakersState": "NOT_DISCLOSED",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-go-3-features",
      "specContains": {
        "headphoneJack": "插孔",
        "expandableStorage": [
          "microSD"
        ],
        "surfaceConnect": "Connect",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "fastCharging": [
          "1.5小时",
          "80%"
        ]
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "book-3-biz": {
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "storageMustInclude": "1TB",
      "refreshRateState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-3-specs-and-features",
      "specContains": {
        "cpuModel": [
          "15英寸",
          "Quadro",
          "1065G7"
        ],
        "ramSpec": [
          "32GB",
          "Quadro"
        ]
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE",
        "cpuModel": "VALID",
        "ramSpec": "VALID"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-4": {
      "cpuMustInclude": [
        "第11代Intel Core",
        "AMD Ryzen"
      ],
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsState": "NOT_DISCLOSED",
      "weightState": "NOT_DISCLOSED",
      "screenSizeContains": "13.5",
      "usbMustInclude": "USB-A",
      "refreshRateState": "NOT_DISCLOSED",
      "resolutionState": "NOT_DISCLOSED",
      "wifiState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "家庭",
      "frontCameraContains": "720",
      "speakersContains": "Omnisonic",
      "speakersMustNotInclude": [
        "Atmos",
        "全景声"
      ],
      "cellularState": "NOT_APPLICABLE",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-laptop-4-features",
      "specContains": {
        "headphoneJack": "插孔",
        "surfaceConnect": "Connect",
        "windowsHello": "Hello",
        "microphones": "麦克"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-3": {
      "cpuMustInclude": [
        "i3",
        "i5",
        "i7"
      ],
      "ramMustInclude": "4GB",
      "storageMustInclude": "64",
      "wifiMustInclude": "802.11",
      "bluetoothMustInclude": "4.0",
      "batteryLifeOfficeContains": "9",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "batteryCapacityState": "NOT_DISCLOSED",
      "chargingPowerContains": "36",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "201.3",
      "weightContains": "800",
      "resolutionContains": "2160",
      "screenSizeContains": "12",
      "usbMustInclude": "Mini DisplayPort",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-3-specs-and-features",
      "specContains": {
        "headphoneJack": "插孔",
        "expandableStorage": [
          "microSD"
        ],
        "aspectRatio": "3:2",
        "microphones": "麦克",
        "audioTech": "Audio",
        "osAtLaunch": "Windows"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-2": {
      "cpuMustInclude": [
        "i5"
      ],
      "ramMustInclude": "LPDDR3",
      "ramMustNotInclude": "DDR3L",
      "storageMustInclude": "64",
      "wifiMustInclude": "802.11a/b/g/n",
      "bluetoothMustInclude": "4.0",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "batteryCapacityState": "NOT_DISCLOSED",
      "chargingPowerContains": "48",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "274.6",
      "weightContains": "2 磅",
      "resolutionContains": "1920",
      "screenSizeContains": "10.6",
      "usbMustInclude": "Mini DisplayPort",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osMustInclude": "Windows 8.1 专业版",
      "frontCameraContains": "720p",
      "rearCameraContains": "720p",
      "speakersContains": "Dolby",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-pro-2-specs-and-features",
      "specContains": {
        "gpuModel": "4400",
        "headphoneJack": "耳机",
        "expandableStorage": "MicroSD",
        "aspectRatio": "16:9",
        "microphones": "麦克",
        "audioTech": "Dolby",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "VaporMg",
        "kickstandType": "双角度"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "pro-1": {
      "cpuMustInclude": [
        "i5"
      ],
      "ramMustInclude": "4GB",
      "storageMustInclude": "64",
      "storageMustNotInclude": "256",
      "wifiMustInclude": "802.11a/b/g/n",
      "bluetoothMustInclude": "4.0",
      "batteryCapacityContains": "42",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "chargingPowerContains": "48",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "13.46",
      "weightContains": "2",
      "resolutionContains": "1920",
      "screenSizeContains": "10.6",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "osMustInclude": "Windows 8 专业版",
      "frontCameraContains": "720p",
      "rearCameraContains": "720p",
      "speakersContains": "立体声",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-pro-1st-gen-specifications",
      "specContains": {
        "headphoneJack": "耳机",
        "expandableStorage": "MicroSD",
        "aspectRatio": "16:9",
        "microphones": "麦克",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "Mg",
        "kickstandType": "支架"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "laptop-1": {
      "cpuMustInclude": [
        "i5",
        "i7"
      ],
      "ramMustInclude": "4GB",
      "storageMustInclude": "1TB",
      "wifiMustInclude": "802.11",
      "bluetoothMustInclude": "4.0",
      "batteryLifeVideoContains": "14.5",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "batteryCapacityState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "308.1",
      "weightContains": "1252",
      "resolutionContains": "2256",
      "screenSizeContains": "13.5",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "speakersState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-laptop-1st-gen-specs-and-features",
      "specContains": {
        "gpuModel": [
          "620",
          "640"
        ],
        "ppi": "201",
        "headphoneJack": "3.5",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "铝",
        "osAtLaunch": "Windows",
        "speakers": "Dolby"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "go-1": {
      "cpuMustInclude": [
        "4415Y"
      ],
      "ramMustInclude": "4GB",
      "storageMustInclude": "64",
      "wifiMustInclude": "802.11",
      "bluetoothMustInclude": "4.1",
      "batteryLifeVideoContains": "8.5",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "batteryCapacityState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "245",
      "weightContains": "522",
      "resolutionContains": "1800",
      "screenSizeContains": "10",
      "usbMustInclude": "USB-C",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "repairabilityState": "NOT_DISCLOSED",
      "osState": "NOT_DISCLOSED",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "cellularState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-go-1st-gen-specs-and-features",
      "specContains": {
        "gpuModel": "615",
        "ppi": "217",
        "headphoneJack": "3.5",
        "expandableStorage": "microSD",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁",
        "frontCamera": "500万",
        "rearCamera": "800万",
        "cellular": "LTE"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE"
      },
      "warrantyContains": "不是中国保修承诺",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "book-1": {
      "cpuMustInclude": [
        "i5",
        "i7"
      ],
      "ramMustInclude": "8GB",
      "storageMustInclude": "128",
      "wifiMustInclude": "802.11",
      "bluetoothMustInclude": "4.0",
      "batteryLifeVideoContains": "16",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "batteryCapacityState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "312",
      "resolutionContains": "3000",
      "screenSizeContains": "13.5",
      "usbMustInclude": "Mini DisplayPort",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NULL",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-book-1st-gen-specs-and-features",
      "specContains": {
        "gpuModel": [
          "520",
          "965"
        ],
        "ppi": "267",
        "headphoneJack": "3.5",
        "expandableStorage": "SDXC",
        "surfaceConnect": "Connect",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "chassisMaterial": "镁",
        "frontCamera": "500万",
        "rearCamera": "800万",
        "osAtLaunch": "Windows"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "fastCharging": "NOT_APPLICABLE"
      },
      "weightState": "NULL",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "duo-1": {
      "cpuMustInclude": [
        "855"
      ],
      "ramMustInclude": "6GB",
      "ramMustNotInclude": "LPDDR4x",
      "storageMustInclude": "128",
      "storageMustNotInclude": "512",
      "wifiMustInclude": "Wi-Fi 5",
      "bluetoothMustInclude": "5.0",
      "batteryCapacityContains": "3577",
      "batteryLifeVideoContains": "15.5",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "npuTopsState": "NOT_DISCLOSED",
      "chargingPowerContains": "18",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "145.2",
      "weightContains": "250",
      "resolutionContains": "1800",
      "screenSizeContains": "5.6",
      "usbMustInclude": "USB-C",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "rearCameraState": "VALID",
      "speakersState": "VALID",
      "cellularState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-duo-1st-gen-features-and-specs",
      "specContains": {
        "ppi": "401",
        "aspectRatio": "3:2",
        "microphones": "麦克",
        "chassisMaterial": "Corning",
        "panelTech": "AMOLED",
        "frontCamera": "1100万",
        "rearCamera": "非独立后摄",
        "cellular": [
          "AT&T",
          "不支持eSIM"
        ]
      },
      "specState": {
        "expandableStorage": "NOT_APPLICABLE",
        "thunderboltSupport": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE"
      },
      "warrantyContains": "非中国保修认证",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "duo-2": {
      "batteryCapacityState": "NOT_DISCLOSED",
      "batteryLifeVideoState": "NOT_DISCLOSED",
      "batteryLifeOfficeState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "chargingPowerState": "NOT_DISCLOSED",
      "npuTopsState": "NOT_DISCLOSED",
      "dimensionsState": "NOT_DISCLOSED",
      "weightState": "NOT_DISCLOSED",
      "resolutionState": "NOT_DISCLOSED",
      "screenSizeContains": "8.3",
      "usbMustInclude": "USB-C",
      "refreshRateState": "NOT_DISCLOSED",
      "wifiState": "NOT_DISCLOSED",
      "warrantyState": "NOT_DISCLOSED",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osState": "NOT_DISCLOSED",
      "frontCameraState": "NOT_DISCLOSED",
      "rearCameraState": "VALID",
      "speakersState": "NOT_DISCLOSED",
      "cellularState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/zh-cn/surface/models/surface-duo-2-features",
      "specContains": {
        "rearCamera": "三镜头",
        "cellular": "5G"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE",
        "headphoneJack": "NOT_APPLICABLE",
        "expandableStorage": "NOT_APPLICABLE"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "studio-1": {
      "cpuMustInclude": [
        "i5",
        "i7"
      ],
      "ramMustInclude": "8GB",
      "storageMustInclude": "64",
      "wifiMustInclude": "802.11",
      "bluetoothMustInclude": "4.0",
      "batteryLifeVideoState": "NOT_APPLICABLE",
      "batteryLifeOfficeState": "NOT_APPLICABLE",
      "batteryCapacityState": "NOT_APPLICABLE",
      "chargingPowerState": "NOT_DISCLOSED",
      "brightnessState": "NOT_DISCLOSED",
      "dimensionsContains": "637.35",
      "weightContains": "9.56",
      "resolutionContains": "4500",
      "screenSizeContains": "28",
      "usbMustInclude": [
        "USB3.0",
        "Mini DisplayPort"
      ],
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "speakersState": "VALID",
      "learnDocUrl": "https://support.microsoft.com/en-us/surface/models/surface-studio-1st-gen-diagrams-and-tech-specs",
      "specContains": {
        "gpuModel": [
          "965",
          "980"
        ],
        "ppi": "192",
        "colorSupport": "Vivid",
        "headphoneJack": "3.5",
        "expandableStorage": "SDXC",
        "aspectRatio": "3:2",
        "windowsHello": "Hello",
        "microphones": "麦克",
        "audioTech": "Audio",
        "touchAndPenProtocol": "10",
        "osAtLaunch": "Windows",
        "kickstandType": "铰链",
        "weightGrams": "最大"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "surfaceConnect": "NOT_APPLICABLE",
        "kickstandType": "VALID",
        "fastCharging": "NOT_APPLICABLE"
      },
      "warrantyContains": "不是中国保修承诺",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "hub-2s": {
      "cpuMustInclude": [
        "i5"
      ],
      "ramMustInclude": "8GB",
      "ramMustNotInclude": "16GB",
      "storageMustInclude": "128",
      "wifiMustInclude": "Wi-Fi5",
      "bluetoothMustInclude": "4.1",
      "batteryLifeVideoState": "NOT_APPLICABLE",
      "batteryLifeOfficeState": "NOT_APPLICABLE",
      "batteryCapacityState": "NOT_APPLICABLE",
      "brightnessContains": "350",
      "chargingPowerContains": "445",
      "dimensionsContains": "741",
      "weightContains": "28",
      "resolutionContains": "3840",
      "screenSizeContains": "50",
      "usbMustInclude": "USB-C",
      "refreshRateState": "NOT_DISCLOSED",
      "warrantyState": "VALID",
      "repairabilityState": "NOT_DISCLOSED",
      "keyboardWeightState": "NOT_DISCLOSED",
      "osState": "VALID",
      "frontCameraState": "VALID",
      "speakersState": "VALID",
      "learnDocUrl": "https://learn.microsoft.com/en-us/surface-hub/surface-hub-2s-techspecs",
      "specContains": {
        "gpuModel": "UHD",
        "aspectRatio": "3:2",
        "microphones": "麦克",
        "chassisMaterial": "铝",
        "osAtLaunch": "Windows10"
      },
      "specState": {
        "thunderboltSupport": "NOT_APPLICABLE",
        "kickstandType": "NOT_APPLICABLE"
      },
      "warrantyContains": "非中国保修认证",
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    }
  }
};
if(typeof module!=="undefined"&&module.exports)module.exports=OFFICIAL_HISTORICAL_LINEUP_FACTS;
