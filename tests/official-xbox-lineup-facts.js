/** Historical expectations retained only where not superseded by the explicit 2026-10-09 field audit.
 * Audited fields are checked exhaustively in field-audit-completion.test.js, including unknown masking. */
const OFFICIAL_XBOX_LINEUP_FACTS = {
  "fetchedAt": "2026-09-29",
  "devices": {
    "xbox-original": {
      "specContains": {
        "salesRegion": [
          "美国",
          "不是当前国行在售"
        ],
        "resolution": [
          "480i",
          "1080i"
        ]
      }
    },
    "xbox-360": {
      "specContains": {
        "salesRegion": [
          "美国",
          "墨西哥"
        ],
        "storageOptions": [
          "20GB"
        ]
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "xbox-360-s": {
      "specContains": {
        "salesRegion": [
          "美国",
          "不是当前国行在售"
        ],
        "storageOptions": [
          "250GB"
        ],
        "wireless": [
          "Wi-Fi N"
        ]
      },
      "specState": {
        "cpuModel": "NOT_DISCLOSED"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "xbox-one": {
      "specContains": {
        "salesRegion": [
          "美国"
        ],
        "releaseDate": [
          "2013 年 11 月 22 日"
        ],
        "ramSpec": [
          "8GB"
        ]
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "xbox-one-s": {
      "specContains": {
        "salesRegion": [
          "不是当前国行在售"
        ],
        "videoFeatures": [
          "4K Ultra HD"
        ],
        "usbPorts": [
          "USB 3.0"
        ]
      },
      "specState": {
        "cpuModel": "NOT_DISCLOSED"
      }
    },
    "xbox-one-x": {
      "specContains": {
        "salesRegion": [
          "美国",
          "499 美元"
        ],
        "gpuModel": "6 TFLOPS",
        "storageOptions": [
          "1TB",
          "HDD"
        ],
        "opticalDrive": [
          "4K UHD"
        ]
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "xbox-series-s-512": {
      "specContains": {
        "salesRegion": [
          "美国",
          "¥2,399"
        ],
        "storageOptions": [
          "512GB"
        ],
        "resolution": [
          "1440p"
        ],
        "gpuModel": [
          "4 TFLOPS"
        ]
      }
    },
    "xbox-series-s-1tb": {
      "specContains": {
        "salesRegion": [
          "美国"
        ],
        "storageOptions": [
          "1TB"
        ],
        "resolution": [
          "1440p"
        ]
      },
      "storageMustNotInclude": "512GB"
    },
    "xbox-series-x": {
      "specContains": {
        "salesRegion": [
          "美国",
          "国行微软商城",
          "不标成国行在售"
        ],
        "gpuModel": [
          "12 TFLOPS"
        ],
        "storageOptions": [
          "1TB",
          "NVMe"
        ],
        "weightGrams": [
          "9.8"
        ]
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "xbox-series-x-digital": {
      "specContains": {
        "salesRegion": [
          "Digital Edition",
          "749.99"
        ],
        "weightGrams": [
          "7.9"
        ],
        "storageOptions": [
          "1TB",
          "NVMe"
        ]
      },
      "storageMustNotInclude": "Blu-ray"
    },
    "xbox-series-x-2tb": {
      "specContains": {
        "salesRegion": [
          "官翻",
          "不标成国行在售"
        ],
        "storageOptions": [
          "2TB",
          "NVMe"
        ]
      },
      "specState": {
        "weightGrams": "NOT_DISCLOSED"
      }
    },
    "xbox-360-e": {
      "specContains": {
        "salesRegion": [
          "美国",
          "并非中国大陆上市证明"
        ],
        "releaseDate": [
          "2013年6月10日"
        ]
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "xbox-one-s-digital": {
      "specContains": {
        "salesRegion": [
          "不是当前国行在售",
          "249.99"
        ],
        "videoFeatures": "4K HDR"
      },
      "fieldAudit": "field-audit-1131-decisions-20261009.json"
    },
    "xbox-series-x25": {
      "specContains": {
        "salesRegion": [
          "美国",
          "不是国行在售",
          "899.99"
        ],
        "releaseDate": [
          "2026 年 11 月 13 日"
        ],
        "cpuArch": [
          "7nm"
        ],
        "storageOptions": [
          "1TB",
          "NVMe"
        ],
        "weightGrams": [
          "4.4"
        ]
      }
    }
  }
};
if(typeof module!=="undefined"&&module.exports)module.exports=OFFICIAL_XBOX_LINEUP_FACTS;
