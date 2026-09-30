/**
 * Xbox 主机官方事实。信源是 2026-09-29 打开的美国微软 / Xbox 页面。
 * 不是国行 Surface 规格，不拿来填 Surface 的价格栏。
 */
const OFFICIAL_XBOX_LINEUP_FACTS = {
  fetchedAt: '2026-09-29',
  devices: {
    'xbox-original': {
      specContains: {
        salesRegion: ['美国', '不是当前国行在售'],
        resolution: ['480i', '1080i']
      }
    },
    'xbox-360': {
      specContains: {
        salesRegion: ['美国', '墨西哥'],
        cpuArch: ['3.2 GHz'],
        ramSpec: ['512 MB'],
        storageOptions: ['20GB']
      }
    },
    'xbox-360-s': {
      specContains: {
        salesRegion: ['美国', '不是当前国行在售'],
        storageOptions: ['250 GB'],
        wireless: ['Wi-Fi N']
      },
      specState: { cpuModel: 'NOT_DISCLOSED' }
    },
    'xbox-one': {
      specContains: {
        salesRegion: ['美国'],
        releaseDate: ['2013 年 11 月 22 日'],
        ramSpec: ['8GB'],
        cpuModel: ['8 核']
      }
    },
    'xbox-one-s': {
      specContains: {
        salesRegion: ['不是当前国行在售'],
        videoFeatures: ['4K Ultra HD'],
        usbPorts: ['USB 3.0']
      },
      specState: { cpuModel: 'NOT_DISCLOSED' }
    },
    'xbox-one-x': {
      specContains: {
        salesRegion: ['美国', '499 美元'],
        ramSpec: ['12GB'],
        gpuModel: ['6 teraflop'],
        storageOptions: ['1TB', '4K UHD']
      }
    },
    'xbox-series-s-512': {
      specContains: {
        salesRegion: ['美国', '¥2,399'],
        storageOptions: ['512GB'],
        resolution: ['1440p'],
        gpuModel: ['4 TFLOPS']
      }
    },
    'xbox-series-s-1tb': {
      specContains: {
        salesRegion: ['美国'],
        storageOptions: ['1TB'],
        resolution: ['1440p']
      },
      storageMustNotInclude: '512GB'
    },
    'xbox-series-x': {
      specContains: {
        salesRegion: ['美国', '国行微软商城', '不标成国行在售'],
        gpuModel: ['12 TFLOPS'],
        storageOptions: ['1TB', 'Blu-ray'],
        weightGrams: ['9.8']
      }
    },
    'xbox-series-x-digital': {
      specContains: {
        salesRegion: ['Digital Edition', '749.99'],
        weightGrams: ['7.9'],
        storageOptions: ['1TB', '没有写这一款']
      },
      storageMustNotInclude: 'Blu-ray'
    },
    'xbox-series-x-2tb': {
      specContains: {
        salesRegion: ['官翻', '不标成国行在售'],
        storageOptions: ['2TB', 'Blu-ray']
      },
      specState: { weightGrams: 'NOT_DISCLOSED' }
    },
    'xbox-360-e': {
      specContains: {
        salesRegion: ['美国', '不是当前国行在售'],
        releaseDate: ['2013 年 6 月 10 日'],
        cpuModel: ['定制 PowerPC'],
        usbPorts: ['USB 2.0']
      }
    },
    'xbox-one-s-digital': {
      specContains: {
        salesRegion: ['不是当前国行在售', '249.99'],
        storageOptions: ['1TB', '全数字'],
        videoFeatures: ['4K Ultra HD']
      },
      storageMustNotInclude: 'Blu-ray'
    },
    'xbox-series-x25': {
      specContains: {
        salesRegion: ['美国', '不是国行在售', '899.99'],
        releaseDate: ['2026 年 11 月 13 日'],
        cpuArch: ['7nm'],
        storageOptions: ['1TB', 'Blu-ray'],
        weightGrams: ['4.4']
      }
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = OFFICIAL_XBOX_LINEUP_FACTS;
}
