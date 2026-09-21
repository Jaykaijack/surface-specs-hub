const fs = require('fs');
const path = require('path');

// 导入当前数据作为基底
const surfaceData = require('../js/surface-data.js');
const allDevices = surfaceData.devices; // 70 devices

console.log(`正在为 ${allDevices.length} 款 Surface 设备构建 23 款官方全生态配件库...`);

// 辅助快速构建设备兼容条目
function buildCompat(rules) {
  // rules: { full: [...ids/prefixes/cats], partial: [...], unsupported: [...] }
  const result = [];

  allDevices.forEach(dev => {
    let match = null;

    // 检查 full
    for (const r of (rules.full || [])) {
      if (typeof r === 'function' && r(dev)) {
        match = { deviceId: dev.id, status: 'FULL', note: r.note || '完美原生支持' };
        break;
      } else if (typeof r === 'string') {
        if (dev.id === r || dev.categoryId === r || dev.id.startsWith(r)) {
          match = { deviceId: dev.id, status: 'FULL', note: rules.fullNote || '完美原生支持' };
          break;
        }
      } else if (typeof r === 'object') {
        if (dev.id === r.id || (r.cat && dev.categoryId === r.cat) || (r.prefix && dev.id.startsWith(r.prefix))) {
          match = { deviceId: dev.id, status: 'FULL', note: r.note || rules.fullNote || '完美原生支持' };
          break;
        }
      }
    }

    if (!match) {
      // 检查 partial
      for (const r of (rules.partial || [])) {
        if (typeof r === 'function' && r(dev)) {
          match = { deviceId: dev.id, status: 'PARTIAL', note: r.note || '部分支持' };
          break;
        } else if (typeof r === 'string') {
          if (dev.id === r || dev.categoryId === r || dev.id.startsWith(r)) {
            match = { deviceId: dev.id, status: 'PARTIAL', note: rules.partialNote || '部分支持' };
            break;
          }
        } else if (typeof r === 'object') {
          if (dev.id === r.id || (r.cat && dev.categoryId === r.cat) || (r.prefix && dev.id.startsWith(r.prefix))) {
            match = { deviceId: dev.id, status: 'PARTIAL', note: r.note || rules.partialNote || '部分支持' };
            break;
          }
        }
      }
    }

    if (!match) {
      // 检查 unsupported
      let unsupNote = rules.unsupportedNote || '不支持';
      for (const r of (rules.unsupported || [])) {
        if (typeof r === 'object' && (dev.id === r.id || dev.categoryId === r.cat)) {
          unsupNote = r.note || unsupNote;
          break;
        }
      }
      match = { deviceId: dev.id, status: 'UNSUPPORTED', note: unsupNote };
    }

    result.push(match);
  });

  return result;
}

const fullAccessories = [
  // ==========================================
  // 一、鼠标与触控外设 (Mice & Pointing Devices)
  // ==========================================
  {
    id: "surface-arc-mouse",
    name: "Surface Arc 鼠标 (Surface Arc Mouse)",
    category: "mouse",
    categoryName: "鼠标与触控外设",
    icon: "🖱️",
    tagline: "可弯折创新形态设计，展平关机弯曲开机，全触控面板支持水平与垂直双向滚动",
    features: [
      "展平即关机，弯曲即开机 (差旅轻薄收纳)",
      "全触控面板 (支持垂直与水平双向平滑手势滚动)",
      "Microsoft 蓝影追踪技术 (多种桌面材质精准定位)",
      "蓝牙 4.0/4.1/5.0 快速配对 (长达 6 个月续航)"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'pro', note: '原生免驱蓝牙直连，轻薄差旅黄金搭档' },
        { cat: 'laptop', note: '原生免驱蓝牙直连，平滑触控滚动' },
        { cat: 'sls', note: '原生免驱蓝牙直连' },
        { cat: 'go', note: '超便携机身轻巧搭档' },
        { cat: 'laptopgo', note: '极简便携办公搭配' },
        { cat: 'studio', note: '原生免驱蓝牙直连' },
        { cat: 'book', note: '原生免驱蓝牙直连' },
        { cat: 'duo', note: '支持 Android 蓝牙鼠标指针与滚轮滑动' },
        { cat: 'hub', note: '大屏巨幕蓝牙指针控制' }
      ],
      partial: [
        { id: 'pro-1', note: '需升级 Win 8.1 / Win 10 蓝牙 4.0 驱动' },
        { id: 'pro-2', note: '需升级 Win 8.1 / Win 10 蓝牙 4.0 驱动' }
      ],
      unsupportedNote: '不支持无蓝牙环境'
    })
  },
  {
    id: "surface-precision-mouse",
    name: "Surface 精准鼠标 (Surface Precision Mouse)",
    category: "mouse",
    categoryName: "鼠标与触控外设",
    icon: "🖱️",
    tagline: "专业创作者旗舰：支持 3 台设备无缝跨屏切换，磁吸可调节无级/段落双模滚轮",
    features: [
      "Smart Switch 智能跨屏 (最多在 3 台 Surface/PC 间无缝游走)",
      "磁吸双模滚轮 (可编程切换无级平滑滚动或段落滚动)",
      "人体工学拇指托与 3 个侧边可编程宏按键",
      "蓝牙无线 + Micro-USB 有线双模连接 (内置锂电池长达 3 个月续航)"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'studio', note: '创作者旗舰组合，安装《鼠标和键盘中心》支持多屏游走与侧键宏' },
        { cat: 'sls', note: '高性能创意工作站绝配，双模滚轮与侧键自定义' },
        { cat: 'book', note: '生产力工作站绝配，支持 3 台设备跨屏协同' },
        { cat: 'laptop', note: '旗舰级办公操控体验，支持蓝牙+有线双模' },
        { cat: 'pro', note: '二合一生产力桌面拓展主力鼠标' },
        { cat: 'go', note: '原生蓝牙支持，按键功能可通过驱动自定义' },
        { cat: 'laptopgo', note: '原生蓝牙支持，按键功能可通过驱动自定义' },
        { cat: 'hub', note: '原生蓝牙鼠标指针支持' }
      ],
      partial: [
        { cat: 'duo', note: '支持基础蓝牙指针，跨屏 Smart Switch 需 Windows 系统' }
      ],
      unsupportedNote: '不支持'
    })
  },
  {
    id: "surface-mobile-mouse",
    name: "Surface 便携移动鼠标 (Surface Mobile Mouse)",
    category: "mouse",
    categoryName: "鼠标与触控外设",
    icon: "🖱️",
    tagline: "极简轻巧扁平对称机身，顺滑铝制滚轮，Surface Go 与轻薄本随行良伴",
    features: [
      "精致金属铝合金平滑滚轮",
      "BlueTrack 蓝影技术 (木质/桌面顺畅追踪)",
      "低功耗蓝牙 4.2 直连 (无需 USB 接收器)",
      "双手通用优雅对称机身 (2 节 AAA 电池约 1 年续航)"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'go', note: 'Surface Go 标配伴侣，轻巧便携随身携带' },
        { cat: 'laptopgo', note: '轻薄本最佳搭配，手感紧凑' },
        { cat: 'pro', note: '轻薄便携差旅办公' },
        { cat: 'laptop', note: '随身移动办公' },
        { cat: 'sls', note: '原生免驱蓝牙连接' },
        { cat: 'book', note: '原生免驱蓝牙连接' },
        { cat: 'studio', note: '原生免驱蓝牙连接' },
        { cat: 'duo', note: 'Android 系统原生蓝牙指针支持' },
        { cat: 'hub', note: '原生蓝牙指针支持' }
      ],
      partial: [
        { id: 'pro-1', note: '需升级 Win 8.1+ 系统驱动' },
        { id: 'pro-2', note: '需升级 Win 8.1+ 系统驱动' }
      ]
    })
  },
  {
    id: "surface-ergonomic-mouse",
    name: "Surface 人体工学鼠标 (Surface Ergonomic Mouse)",
    category: "mouse",
    categoryName: "鼠标与触控外设",
    icon: "🖱️",
    tagline: "自然手型倾角工学设计，双色注塑柔软拇指托，长时间高强度办公健康选择",
    features: [
      "自然手部握持倾斜角 (有效缓解腕管压迫与疲劳)",
      "双色注塑一体成型软胶拇指槽与铝合金双向滚轮",
      "双侧边前后导航实体按键",
      "低延迟蓝牙 4.0+ 无线连接"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'studio', note: '桌面人体工学健康办公组合' },
        { cat: 'laptop', note: '重度桌面办公健康之选' },
        { cat: 'book', note: '高强度工作站健康操控' },
        { cat: 'pro', note: '桌面拓展办公首选' },
        { cat: 'sls', note: '桌面创作健康搭档' },
        { cat: 'go', note: '原生蓝牙免驱支持' },
        { cat: 'laptopgo', note: '原生蓝牙免驱支持' },
        { cat: 'hub', note: '原生蓝牙免驱支持' }
      ],
      partial: [
        { cat: 'duo', note: '基础蓝牙指针操控' }
      ]
    })
  },

  // ==========================================
  // 二、键盘与键盘盖外设 (Keyboards & Covers)
  // ==========================================
  {
    id: "flex-keyboard",
    name: "Surface Pro Flex 键盘",
    category: "keyboard",
    categoryName: "键盘与保护盖",
    icon: "⌨️",
    tagline: "蓝牙无线分离脱机 + 磁吸直连双模键盘，内置充电电池与触觉反馈触控板",
    features: [
      "蓝牙无线脱机输入 (高达 41 小时离线续航)",
      "磁吸笔槽无线充电 (收纳并为 Slim Pen 2 补电)",
      "触觉反馈精准触控板 (可调节拟真震动反馈)",
      "增强型碳纤维机身与静音机械键程"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-12-13-intel', note: '完美原生支持 (磁吸附与离机无线蓝牙均完美工作)' },
        { id: 'pro-12-13-snap', note: '完美原生支持 (磁吸附与离机无线蓝牙均完美工作)' },
        { id: 'pro-12-13', note: '完美原生支持 (磁吸附与离机无线蓝牙均完美工作)' },
        { id: 'pro-11-13', note: '完美原生支持 (磁吸附与离机无线蓝牙均完美工作)' },
        { id: 'pro-11-biz-snap', note: '完美原生支持 (磁吸附与离机无线蓝牙均完美工作)' },
        { id: 'pro-11-biz-intel', note: '完美原生支持 (磁吸附与离机无线蓝牙均完美工作)' },
        { id: 'pro-10-biz', note: '完美原生支持 (磁吸附与离机无线蓝牙均完美工作)' }
      ],
      partial: [
        { id: 'pro-9', note: '支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动' },
        { id: 'pro-9-biz', note: '支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动' },
        { id: 'pro-8', note: '支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动' },
        { id: 'pro-8-biz', note: '支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动' },
        { id: 'pro-x', note: '支持物理磁吸输入；ARM64 蓝牙离机输入需系统补丁' }
      ],
      unsupportedNote: '不支持 (物理磁吸接口与尺寸不兼容)'
    })
  },
  {
    id: "pro-signature-keyboard",
    name: "Surface Pro 特制版专业键盘盖 (带笔槽款)",
    category: "keyboard",
    categoryName: "键盘与保护盖",
    icon: "⌨️",
    tagline: "现代 Pro 标配：集成隐藏式 Slim Pen 磁吸无线充电笔槽与 Alcantara 欧缔兰面料",
    features: [
      "磁吸笔槽无线充电 (专为 Slim Pen 1/2 补电)",
      "Alcantara® 奢华欧缔兰防污面料",
      "全尺寸机械背光按键 (1.3mm 键程)",
      "大尺寸防误触玻璃触控板"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-12-13-intel', note: '完美原生支持 (物理磁吸附打字与笔槽感应充电)' },
        { id: 'pro-12-13-snap', note: '完美原生支持 (物理磁吸附打字与笔槽感应充电)' },
        { id: 'pro-12-13', note: '完美原生支持 (物理磁吸附打字与笔槽感应充电)' },
        { id: 'pro-11-13', note: '原生完美支持' },
        { id: 'pro-11-biz-snap', note: '原生完美支持' },
        { id: 'pro-11-biz-intel', note: '原生完美支持' },
        { id: 'pro-10-biz', note: '原生完美支持' },
        { id: 'pro-9', note: '原生完美支持' },
        { id: 'pro-9-biz', note: '原生完美支持' },
        { id: 'pro-8', note: '原生完美支持' },
        { id: 'pro-8-biz', note: '原生完美支持' },
        { id: 'pro-x', note: '原生完美支持' }
      ],
      unsupportedNote: '不支持 (接口物理不兼容)'
    })
  },
  {
    id: "pro-classic-type-cover",
    name: "Surface Pro 经典专业键盘盖 (Type Cover)",
    category: "keyboard",
    categoryName: "键盘与保护盖",
    icon: "⌨️",
    tagline: "二合一黄金时代标配：经典六针磁吸、剪刀脚机械背光按键与第二段磁吸倾斜条",
    features: [
      "经典 6-pin 磁吸金手指接口",
      "双折角磁吸设计 (吸附在下边框形成舒适打字倾角)",
      "全尺寸剪刀脚机械按键 + 3 级 LED 背光",
      "可选 Alcantara 欧缔兰特制版或传统超细纤维"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-7-plus', note: '完美原生支持 (黄金搭档)' },
        { id: 'pro-7', note: '完美原生支持 (黄金搭档)' },
        { id: 'pro-6', note: '完美原生支持' },
        { id: 'pro-6-biz', note: '完美原生支持' },
        { id: 'pro-5', note: '完美原生支持' },
        { id: 'pro-4', note: '完美原生支持' },
        { id: 'pro-3', note: '完美兼容 (机身尺寸完全吻合)' }
      ],
      unsupportedNote: '不支持 (物理接口或尺寸不兼容)'
    })
  },
  {
    id: "go-signature-type-cover",
    name: "Surface Go 特制版专业键盘盖 (Go Type Cover)",
    category: "keyboard",
    categoryName: "键盘与保护盖",
    icon: "⌨️",
    tagline: "Surface Go 全代际通用：紧凑全功能机械键盘、大尺寸精准玻璃触控板与奢华 Alcantara 面料",
    features: [
      "全机械按键套件 (剪刀脚结构带来舒适键程)",
      "精准大尺寸玻璃触控板",
      "自适应磁吸折叠角度",
      "Surface Go 1 / 2 / 3 / 4 全系通用"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'go-4', note: '原生完美支持 (Go 4 官方标配键盘)' },
        { id: 'go-3', note: '原生完美支持 (Go 3 标配)' },
        { id: 'go-3-biz', note: '原生完美支持' },
        { id: 'go-2', note: '原生完美支持 (Go 2 标配)' },
        { id: 'go-2-biz', note: '原生完美支持' },
        { id: 'go-1', note: '原生完美支持 (初代 Go 完全兼容)' }
      ],
      unsupportedNote: '不支持 (仅适用于 Surface Go 10.5 英寸机身系列)'
    })
  },
  {
    id: "surface-touch-cover",
    name: "Surface 早期经典触控键盘 (Touch / Type Cover 1~2)",
    category: "keyboard",
    categoryName: "键盘与保护盖",
    icon: "⌨️",
    tagline: "Surface 创世开山配件：3.2mm 极致轻薄压感感应键盘，见证二合一历史开端",
    features: [
      "革命性 3.2mm 极薄机身",
      "压感电容感应输入 (无实体机械活动部件)",
      "初代磁吸防误触智能感应",
      "Surface RT / Pro 1 / Pro 2 历史见证款"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-2', note: '原生完美匹配 (初代二代黄金磁吸接口)' },
        { id: 'pro-1', note: '原生完美匹配 (初代开山配件)' }
      ],
      unsupportedNote: '不支持 (仅适用于 Pro 1/2 及初代 RT 机型)'
    })
  },
  {
    id: "surface-keyboard-desktop",
    name: "Surface 蓝牙桌面无线键盘 (含 Modern Keyboard 指纹款)",
    category: "keyboard",
    categoryName: "键盘与保护盖",
    icon: "⌨️",
    tagline: "极简阳极氧化铝合金面板、静音剪刀脚手感，专为 Studio 与桌面工作站打造",
    features: [
      "优雅浅银灰阳极氧化铝合金金属顶盖",
      "优化的机械按键手感与静音回弹",
      "蓝牙 4.0/4.1 无线直连 (长达 1 年续航)",
      "Modern 版配备隐藏式 Windows Hello 指纹识别键"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'studio', note: 'Surface Studio 原厂标配桌面键盘' },
        { cat: 'laptop', note: '外接大屏桌面办公利器' },
        { cat: 'book', note: '外接显示器桌面办公' },
        { cat: 'pro', note: '二合一主机桌面办公利器' },
        { cat: 'sls', note: '外接大屏创作绝配' },
        { cat: 'go', note: '原生蓝牙直连' },
        { cat: 'laptopgo', note: '原生蓝牙直连' },
        { cat: 'hub', note: '大屏巨幕蓝牙键盘' }
      ],
      partial: [
        { cat: 'duo', note: '支持基础文字输入，部分快捷键针对 Windows 优化' }
      ]
    })
  },

  // ==========================================
  // 三、手写笔与压感外设 (Pens & Stylus)
  // ==========================================
  {
    id: "slim-pen-2",
    name: "Surface 超感触控笔 2 (Slim Pen 2)",
    category: "pen",
    categoryName: "手写笔与压感",
    icon: "✏️",
    tagline: "内置触觉反馈微型马达，在支持机型上还原纸上书写的真实触觉震动",
    features: [
      "触觉反馈微型马达 (触觉震动纸感书写)",
      "零力起笔 (墨水几乎在接触屏幕瞬间涌出)",
      "4096 级压感与连续倾斜着色",
      "磁吸无线感应充电 (需配合特制键盘或独立充电座)"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-12-13-intel', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-12-13-snap', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-12-13', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-11-13', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-11-biz-snap', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-11-biz-intel', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-10-biz', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-9', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-9-biz', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-8', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'pro-8-biz', note: '完美原生支持 (触觉震动 + 键盘无线充电)' },
        { id: 'sls-2', note: '完美原生支持 (机身底部吸附无线充 + 触觉震动)' },
        { id: 'sls-2-biz', note: '完美原生支持 (机身底部吸附无线充 + 触觉震动)' },
        { id: 'sls-1', note: '完美原生支持 (机身底部吸附无线充 + 触觉震动)' },
        { id: 'sls-1-biz', note: '完美原生支持 (机身底部吸附无线充 + 触觉震动)' }
      ],
      partial: [
        { id: 'pro-12-inch', note: '支持 4096 级压感与倾角书写；机身无震动马达驱动，需外置充电座' },
        { id: 'pro-12-inch-biz', note: '支持 4096 级压感与倾角书写；机身无震动马达驱动，需外置充电座' },
        { id: 'pro-7-plus', note: '支持书写绘图，无触觉震动，需外置充电座' },
        { id: 'pro-7', note: '支持书写绘图，无触觉震动，需外置充电座' },
        { id: 'pro-6', note: '支持书写绘图，无触觉震动，需外置充电座' },
        { id: 'pro-6-biz', note: '支持书写绘图，无触觉震动，需外置充电座' },
        { id: 'pro-5', note: '支持书写绘图，无触觉震动，需外置充电座' },
        { id: 'pro-4', note: '支持书写绘图，无触觉震动，需外置充电座' },
        { id: 'pro-3', note: '支持书写，无触觉震动，需外置充电座' },
        { id: 'pro-x', note: '支持书写与特制键盘无线充，无触觉震动' },
        { cat: 'go', note: '支持 4096 级压感书写，无触觉震动，需外置充电座' },
        { cat: 'book', note: '支持 4096 级压感书写，无触觉震动，需外置充电座' },
        { cat: 'studio', note: '支持 4096 级压感与倾斜书写，无触觉震动，需外置充电座' },
        { cat: 'duo', note: '支持 Android 手写墨迹，需外置充电夹' }
      ],
      unsupportedNote: '不支持 (Laptop 传统笔电屏幕不支持手写笔)'
    })
  },
  {
    id: "slim-pen-1",
    name: "Surface 超感触控笔一代 (Slim Pen 1)",
    category: "pen",
    categoryName: "手写笔与压感",
    icon: "✏️",
    tagline: "轻薄扁平木工铅笔手感，专为 Pro X / Pro 8+ 键盘槽收纳充电而生",
    features: [
      "扁平轻巧防滚动笔身",
      "4096 级压感与倾角支持",
      "磁吸感应充电",
      "蓝牙一键唤醒快捷操作"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-x', note: '初代 Slim Pen 黄金原生搭档' },
        { id: 'pro-8', note: '原生支持键盘收纳与无线充' },
        { id: 'pro-8-biz', note: '原生支持键盘收纳与无线充' },
        { id: 'pro-9', note: '原生支持' },
        { id: 'pro-9-biz', note: '原生支持' },
        { id: 'pro-10-biz', note: '原生支持' },
        { id: 'pro-11-13', note: '原生支持' },
        { id: 'pro-12-13', note: '原生支持' }
      ],
      partial: [
        { cat: 'pro', note: '支持正常书写，需配外置充电盒' },
        { cat: 'go', note: '支持书写，需外置充电盒' },
        { cat: 'book', note: '支持书写，需外置充电盒' },
        { cat: 'sls', note: '支持书写与机底磁吸' },
        { cat: 'studio', note: '支持书写，需外置充电盒' }
      ],
      unsupportedNote: '不支持'
    })
  },
  {
    id: "surface-pen-classic",
    name: "Surface 触控笔经典款 (Surface Pen 4096 级带笔夹/单侧磁吸)",
    category: "pen",
    categoryName: "手写笔与压感",
    icon: "✏️",
    tagline: "经久不衰的圆柱笔型经典：4096 级压感、倾斜着色、单侧磁吸与 AAAA 电池超长续航",
    features: [
      "4096 级压感与倾斜绘图着色支持",
      "单侧扁平磁吸附条 (牢固吸附在机身左侧边框)",
      "AAAA 碱性电池供电 (日常使用续航约 1 年)",
      "顶部物理橡皮擦 (按压一键唤醒，倒转即擦除)"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-7-plus', note: '完美原生支持 (4096 级压感 + 倾角 + 磁吸附)' },
        { id: 'pro-7', note: '完美原生支持 (4096 级压感 + 倾角 + 磁吸附)' },
        { id: 'pro-6', note: '完美原生支持 (4096 级压感 + 倾角 + 磁吸附)' },
        { id: 'pro-6-biz', note: '完美原生支持' },
        { id: 'pro-5', note: '完美原生支持 (首发 4096 级压感与倾角)' },
        { id: 'pro-4', note: '完美原生支持 (升级 4096 级与倾角)' },
        { id: 'pro-3', note: '完美原生支持 (支持 256/1024 级向后兼容)' },
        { cat: 'book', note: '完美原生支持 (屏侧牢固磁吸 + 4096 级)' },
        { cat: 'studio', note: '完美原生支持 (大屏创作黄金绘图笔)' },
        { cat: 'go', note: '完美原生支持 (4096 级书写 + 磁吸附)' },
        { id: 'sls-1', note: '完美支持屏幕书写与绘图' },
        { id: 'sls-2', note: '完美支持屏幕书写与绘图' },
        { id: 'pro-8', note: '支持 4096 级书写绘图' },
        { id: 'pro-9', note: '支持 4096 级书写绘图' },
        { id: 'pro-10-biz', note: '支持 4096 级书写绘图' },
        { id: 'pro-11-13', note: '支持 4096 级书写绘图' },
        { id: 'pro-12-13', note: '支持 4096 级书写绘图' }
      ],
      partial: [
        { id: 'pro-12-inch', note: '支持 4096 级书写绘图，机身侧边无磁吸定位槽' },
        { id: 'pro-12-inch-biz', note: '支持 4096 级书写绘图，机身侧边无磁吸定位槽' },
        { cat: 'duo', note: '支持手写笔记与绘图，无倾斜着色' }
      ],
      unsupportedNote: '不支持 (Laptop 传统笔电屏幕不支持手写笔)'
    })
  },
  {
    id: "surface-pen-pro3",
    name: "Surface 初代压感触控笔 (Pro 3 / 256级 紫色顶键)",
    category: "pen",
    categoryName: "手写笔与压感",
    icon: "✏️",
    tagline: "Surface 手写交互奠基之作：N-Trig 技术、顶部经典紫色按钮一键呼出 OneNote",
    features: [
      "N-Trig 初代 256 级高精度压感",
      "顶部物理紫色按键 (锁屏状态下一键呼出 OneNote 速记)",
      "AAAA 电池供电 + 2 粒纽扣电池供电蓝牙顶盖",
      "双侧边物理按键 (右键与擦除)"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-3', note: 'Surface Pro 3 原装标配手写笔，完美支持' }
      ],
      partial: [
        { id: 'pro-4', note: '向下兼容基础书写' },
        { id: 'pro-5', note: '向下兼容基础书写' },
        { id: 'pro-6', note: '向下兼容基础书写' },
        { id: 'pro-7', note: '向下兼容基础书写' },
        { cat: 'book', note: '向下兼容基础书写' }
      ],
      unsupportedNote: '不支持现代机型高级倾斜与高阶压感'
    })
  },

  // ==========================================
  // 四、拓展坞与转换器 (Docks, Hubs & Adapters)
  // ==========================================
  {
    id: "surface-dock-2",
    name: "Surface 拓展坞 2 代 (Surface Dock 2 磁吸口)",
    category: "dock",
    categoryName: "拓展坞与转换器",
    icon: "🔌",
    tagline: "199W 强劲供电与磁吸一线连：驱动双 4K 60Hz 巨幕与极速 10Gbps USB-C",
    features: [
      "199W 大功率原厂电源适配器 (为旗舰主机全力供电)",
      "Surface Connect 磁吸一线连 (充电 + 视频 + 数据)",
      "前置双 USB-C (10Gbps 数据传输 + 15W 手机快充)",
      "后置双 USB-C 显示输出 (双 4K@60Hz) + 双 USB-A + 千兆网口"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-12-13-intel', note: '完美一线连 (磁吸快充 + 双 4K 60Hz 显示输出 + 外设)' },
        { id: 'pro-12-13-snap', note: '完美一线连 (磁吸快充 + 双 4K 60Hz 显示输出 + 外设)' },
        { id: 'pro-11-13', note: '完美原生支持 (磁吸一线连)' },
        { id: 'pro-11-biz-snap', note: '完美原生支持 (磁吸一线连)' },
        { id: 'pro-11-biz-intel', note: '完美原生支持 (磁吸一线连)' },
        { id: 'pro-10-biz', note: '完美原生支持 (磁吸一线连)' },
        { id: 'pro-9', note: '完美原生支持 (磁吸一线连)' },
        { id: 'pro-9-biz', note: '完美原生支持 (磁吸一线连)' },
        { id: 'pro-8', note: '完美原生支持 (双 4K 60Hz)' },
        { id: 'pro-8-biz', note: '完美原生支持 (双 4K 60Hz)' },
        { id: 'pro-7-plus', note: '完美原生支持 (双 4K 60Hz)' },
        { id: 'sls-2', note: '完美支持 199W 强劲供电与双 4K 扩展' },
        { id: 'sls-2-biz', note: '完美支持 199W 强劲供电与双 4K 扩展' },
        { id: 'sls-1', note: '完美支持供电与双 4K 扩展' },
        { id: 'book-3-15', note: '完美支持双 4K 与高功率供电' },
        { id: 'book-3-135', note: '完美支持双 4K 与高功率供电' },
        { id: 'laptop-6-biz', note: '完美支持' },
        { id: 'laptop-5', note: '完美支持' },
        { id: 'laptop-4', note: '完美支持' },
        { id: 'laptop-3', note: '完美支持' }
      ],
      partial: [
        { id: 'pro-7', note: '支持充电与数据，双 4K 模式受限于主机架构限 30Hz 或单 4K 60Hz' },
        { id: 'pro-6', note: '支持充电与数据，双屏输出最高支持双 1080p 或单 4K 30Hz' },
        { id: 'pro-5', note: '支持充电与外设扩展，双外接屏受限' },
        { id: 'book-2-15', note: '支持供电与扩展' },
        { id: 'book-1', note: '支持供电与扩展' },
        { cat: 'go', note: '支持供电与拓展，受制于核显最高输出单 4K' },
        { cat: 'laptopgo', note: '支持供电与扩展' },
        { cat: 'studio', note: '仅支持数据与外设，Studio 采用专用电源输入' }
      ],
      unsupportedNote: '不支持 (无 Surface Connect 磁吸接口或物理尺寸不匹配)'
    })
  },
  {
    id: "surface-dock-1",
    name: "Surface 拓展坞 1 代 (Surface Dock 1 砖块形)",
    category: "dock",
    categoryName: "拓展坞与转换器",
    icon: "🔌",
    tagline: "Surface Connect 磁吸拓展基石：经典砖块配重设计，集成双 Mini DP 与 4 口 USB 3.0",
    features: [
      "经典沉稳砖块配重外形 (桌面稳固防滑)",
      "Surface Connect 磁吸一线连 (最高 60W 供电)",
      "2 × Mini DisplayPort (双屏扩展)",
      "4 × USB 3.0 Type-A 接口 + 千兆以太网口 + 3.5mm 音频口"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-7-plus', note: '完美原生兼容 (Mini DP 显示输出 + 磁吸供电)' },
        { id: 'pro-7', note: '完美原生兼容' },
        { id: 'pro-6', note: '完美原生兼容' },
        { id: 'pro-5', note: '完美原生兼容' },
        { id: 'pro-4', note: '完美原生兼容' },
        { id: 'pro-3', note: '完美原生兼容 (Pro 3 桌面黄金拓展站)' },
        { id: 'book-1', note: '完美原生兼容' },
        { id: 'book-2-15', note: '完美原生兼容' },
        { id: 'laptop-1', note: '完美原生兼容' },
        { id: 'laptop-2', note: '完美原生兼容' }
      ],
      partial: [
        { id: 'pro-8', note: '支持基础充电与外设连接，高负载供电略低于原装要求' },
        { id: 'pro-9', note: '支持基础供电与外设，建议 Dock 2 或雷电 4' },
        { id: 'pro-10-biz', note: '支持基础供电' },
        { id: 'pro-11-13', note: '支持基础供电' },
        { id: 'pro-12-13', note: '支持基础供电' },
        { cat: 'go', note: '支持供电与双 Mini DP 扩展' },
        { cat: 'laptopgo', note: '支持供电与外设扩展' }
      ],
      unsupportedNote: '不支持 (无 Surface Connect 磁吸口)'
    })
  },
  {
    id: "surface-tb4-dock",
    name: "Surface 雷电 4 拓展坞 (Thunderbolt 4 Dock)",
    category: "dock",
    categoryName: "拓展坞与转换器",
    icon: "🔌",
    tagline: "拥抱通用标准：USB4 / Thunderbolt 4 标准 Type-C 接口，高达 96W 反向快充与极速 40Gbps",
    features: [
      "通用 USB4 / Thunderbolt 4 Type-C 接口",
      "高达 96W USB-PD 反向供电 (充沛满足高负载运算)",
      "支持双 4K 60Hz 或单 8K 显示器输出",
      "环保机身设计 (采用 20% 回收海洋塑料树脂)"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-12-13-intel', note: '满血雷电 4 原生支持 (40Gbps 吞吐 + 96W PD 快充 + 双 4K@60Hz)' },
        { id: 'pro-12-13-snap', note: '满血 USB4 原生支持 (40Gbps 极速扩展)' },
        { id: 'pro-12-13', note: '满血 USB4 原生支持' },
        { id: 'pro-11-13', note: '满血 USB4 原生支持' },
        { id: 'pro-11-biz-snap', note: '满血 USB4 原生支持' },
        { id: 'pro-11-biz-intel', note: '满血雷电 4 原生支持' },
        { id: 'pro-10-biz', note: '满血雷电 4 原生支持' },
        { id: 'pro-9', note: '满血雷电 4 原生支持 (Intel 版) / USB4 (5G 骁龙版)' },
        { id: 'pro-9-biz', note: '满血雷电 4 原生支持' },
        { id: 'pro-8', note: '满血雷电 4 原生支持' },
        { id: 'pro-8-biz', note: '满血雷电 4 原生支持' },
        { id: 'sls-1', note: '满血雷电 4 原生支持 (双 4K 60Hz)' },
        { id: 'sls-2', note: '满血雷电 4 原生支持 (双 4K 60Hz)' },
        { id: 'laptop-5', note: '满血雷电 4 原生支持' },
        { id: 'laptop-6-biz', note: '满血雷电 4 原生支持' },
        { id: 'laptop-7-138', note: '满血 USB4 原生支持' },
        { id: 'laptop-7-150', note: '满血 USB4 原生支持' },
        { id: 'laptop-8-138', note: '满血 USB4 / 雷电 4 原生支持' },
        { id: 'laptop-8-150', note: '满血 USB4 / 雷电 4 原生支持' }
      ],
      partial: [
        { id: 'pro-7-plus', note: '降级为标准 USB-C 3.2 Gen 2 工作 (支持充电与单 4K 视频)' },
        { id: 'pro-7', note: '降级为 USB-C 3.1 工作 (支持充电与扩展)' },
        { id: 'pro-12-inch', note: '支持 USB-C 快速充电与外设扩展' },
        { id: 'pro-12-inch-biz', note: '支持 USB-C 快速充电与外设扩展' },
        { id: 'laptop-3', note: '降级为普通 USB-C 工作' },
        { id: 'laptop-4', note: '降级为普通 USB-C 工作' },
        { cat: 'go', note: '降级为普通 USB-C 工作' },
        { cat: 'laptopgo', note: '降级为普通 USB-C 工作' }
      ],
      unsupportedNote: '不支持 (早期机型无 USB-C / 雷电接口)'
    })
  },
  {
    id: "surface-travel-hub",
    name: "Surface 便携多功能扩展坞 (Surface USB-C Travel Hub)",
    category: "dock",
    categoryName: "拓展坞与转换器",
    icon: "🔌",
    tagline: "差旅人士五合一路演神器：HDMI 2.0 (4K@60Hz)、VGA 投影、千兆网口、USB-C 与 USB-A",
    features: [
      "自带一体式隐蔽收纳 USB-C 连接线",
      "HDMI 2.0 (支持 4K@60Hz 高清视频输出)",
      "VGA 模拟视频接口 (兼容老旧会议室投影机)",
      "千兆高速有线以太网 RJ45 + USB-A 3.2 + USB-C"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'laptop', note: '完美兼容 USB-C 差旅一线转接投影与外设' },
        { cat: 'pro', note: '二合一外出开会与出差黄金转接头' },
        { cat: 'sls', note: '完美兼容 USB-C 外设拓展' },
        { cat: 'go', note: 'Go 系列随身差旅绝配' },
        { cat: 'laptopgo', note: '轻薄本出行必备' },
        { cat: 'book', note: '支持 USB-C 机型扩展' }
      ],
      partial: [
        { cat: 'duo', note: '支持 HDMI 屏幕镜像与 USB-A 存储读取' }
      ],
      unsupportedNote: '不支持 (旧款机型无 Type-C 接口)'
    })
  },
  {
    id: "surface-connect-usbc",
    name: "Surface Connect 转 USB-C 适配器 (历史神器)",
    category: "dock",
    categoryName: "拓展坞与转换器",
    icon: "🔌",
    tagline: "让老款 Surface 满血复活：将磁吸充电口转换为全功能 USB-C (支持充电、数据与视频)",
    features: [
      "磁吸 Surface Connect 专属转换协议",
      "解锁标准 USB-PD 充电器补电能力",
      "支持 USB 3.1 数据传输",
      "支持 DisplayPort 视频输出扩展"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'pro-5', note: '完美支持：为 2017 款无 C 口机型带来现代全功能 Type-C 生态' },
        { id: 'pro-6', note: '完美支持：无需购买昂贵原装充电器，支持 PD 充电' },
        { id: 'laptop-1', note: '完美支持：初代 Laptop 升级 Type-C 神器' },
        { id: 'laptop-2', note: '完美支持：补齐 Type-C 接口遗憾' },
        { id: 'book-1', note: '完美支持磁吸转接 Type-C' }
      ],
      partial: [
        { id: 'pro-4', note: '支持部分数据与视频传输，需特定固件支持' },
        { id: 'pro-3', note: '仅支持部分外设数据读取' }
      ],
      unsupportedNote: '现代机型已原生标配全功能 Type-C / USB4，无需此转接器'
    })
  },

  // ==========================================
  // 五、音频与会议外设 (Audio & Conferencing)
  // ==========================================
  {
    id: "surface-headphones-2",
    name: "Surface 头戴式降噪耳机 2 代 (Surface Headphones 2)",
    category: "audio",
    categoryName: "音频与会议外设",
    icon: "🎧",
    tagline: "标志性左右耳罩双物理无级拨盘：左旋 13 级可调主动降噪，右旋音量，Omnisonic 沉浸声学",
    features: [
      "左右耳罩双物理精密旋转拨盘 (调降噪 / 调音量)",
      "13 级无级可调节主动降噪 (ANC)",
      "40mm Free Edge 驱动单元与 Omnisonic 沉浸声学",
      "多点连接技术 (同时连接 Surface 与手机，长达 20 小时续航)"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'pro', note: '全系蓝牙免驱配对，高保真办公与会议降噪' },
        { cat: 'laptop', note: '全系蓝牙免驱支持，多点双设备无缝切换' },
        { cat: 'sls', note: '创作者沉浸音频工作流' },
        { cat: 'studio', note: '全尺寸数字工作台专业监听' },
        { cat: 'book', note: '免驱蓝牙与 3.5mm 有线双模' },
        { cat: 'go', note: '全系原生免驱支持' },
        { cat: 'laptopgo', note: '全系原生免驱支持' },
        { cat: 'duo', note: 'Android 专属 Surface Audio App 调音支持' },
        { cat: 'hub', note: '视频会议与协同研讨音频支持' }
      ],
      partial: [
        { id: 'pro-1', note: '支持 3.5mm 有线直连或 Win 8.1 蓝牙驱动' },
        { id: 'pro-2', note: '支持 3.5mm 有线直连或 Win 8.1 蓝牙驱动' }
      ]
    })
  },
  {
    id: "surface-earbuds",
    name: "Surface 真无线耳塞式耳机 (Surface Earbuds)",
    category: "audio",
    categoryName: "音频与会议外设",
    icon: "🎧",
    tagline: "极具辨识度的超大圆形触控面板，四点耳甲腔稳固锚定，深度融合 Microsoft 365 办公生态",
    features: [
      "标志性超大圆形电容触控感应盘",
      "深度融合 Microsoft 365 (PPT 幻灯片手势翻页 / Word 实时听写)",
      "四点耳甲腔人体工学锚定 (全天佩戴零耳道压迫感)",
      "双阵列降噪麦克风 (精准过滤嘈杂背景通话人声)"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'laptop', note: '移动办公标配，支持 PPT 演示触控翻页' },
        { cat: 'pro', note: '出差差旅与移动会议绝配' },
        { cat: 'sls', note: '原生蓝牙低延迟音频' },
        { cat: 'go', note: '轻薄随行听歌办公' },
        { cat: 'laptopgo', note: '轻薄便携耳塞' },
        { cat: 'studio', note: '原生免驱蓝牙支持' },
        { cat: 'book', note: '原生免驱蓝牙支持' },
        { cat: 'duo', note: '双屏手机移动通话与听音黄金搭档' }
      ],
      partial: [
        { id: 'pro-1', note: '需升级 Win 8.1+ 蓝牙 4.0+ 驱动' },
        { id: 'pro-2', note: '需升级 Win 8.1+ 蓝牙 4.0+ 驱动' }
      ]
    })
  },
  {
    id: "surface-audio-dock",
    name: "Surface 智能会议音箱拓展坞 (Surface Audio Dock)",
    category: "audio",
    categoryName: "音频与会议外设",
    icon: "🎧",
    tagline: "工位极简四合一：高品质会议免提音箱 + Microsoft Teams 一键入会 + USB-C 拓展坞",
    features: [
      "全音域扬声器 (含低音扬声器，带来丰沛通话人声与音乐表现)",
      "双前向降噪麦克风 (清晰拾取办公工位人声)",
      "Microsoft Teams 专属联动实体键 (带指示灯一键静音/入会)",
      "集成拓展坞功能：HDMI 4K 视频输出 + 双 USB-C + USB-A + 60W 反充"
    ],
    compatibilityList: buildCompat({
      full: [
        { cat: 'laptop', note: '居家与工位混合办公神器，一条 Type-C 搞定供电、显示与会议' },
        { cat: 'pro', note: '二合一电脑桌面工位拓展利器' },
        { cat: 'sls', note: '高品质桌面音频与扩展' },
        { cat: 'go', note: '支持 Type-C 机型一线扩展' },
        { cat: 'laptopgo', note: '轻薄本桌面扩充' },
        { cat: 'studio', note: '外置专业会议免提麦克风音箱' }
      ],
      partial: [
        { cat: 'duo', note: '支持 Type-C 免提通话与投屏' }
      ],
      unsupportedNote: '不支持 (早期无 Type-C 接口机型无法通过一条线实现供电与视频扩展)'
    })
  },

  // ==========================================
  // 六、创意交互外设 (Creative & Accessibility)
  // ==========================================
  {
    id: "surface-dial",
    name: "Surface Dial 屏幕实体交互旋钮",
    category: "creative",
    categoryName: "创意交互外设",
    icon: "🎨",
    tagline: "重塑数字创意交互：屏幕吸附直接弹出径向工具轮，触觉触感震动反馈，非惯用手神级辅助",
    features: [
      "屏幕吸附交互 (吸附在 Studio 等机型屏幕表面直接激活径向菜单)",
      "触觉力反馈 (旋转时提供细腻可感知的物理阻尼顿挫感)",
      "离屏桌面蓝牙操作 (平放桌面旋转即可缩放时间线/调音量/滚动网页)",
      "精工一体成型铝合金机身与防滑硅胶底座"
    ],
    compatibilityList: buildCompat({
      full: [
        { id: 'studio-2-plus', note: '完美支持屏上吸附与径向菜单交互 (数字艺术创作神器)' },
        { id: 'studio-2-plus-biz', note: '完美支持屏上吸附与径向菜单交互' },
        { id: 'studio-2', note: '完美支持屏上吸附与径向菜单交互' },
        { id: 'studio-1', note: 'Surface Studio 标志性原厂神级交互配件' },
        { id: 'book-2-15', note: '支持屏幕吸附交互与径向轮' },
        { id: 'pro-7', note: '支持屏幕吸附感知与径向菜单' },
        { id: 'pro-6', note: '支持屏幕吸附感知与径向菜单' },
        { id: 'pro-5', note: '支持屏幕吸附感知与径向菜单' },
        { id: 'pro-4', note: '支持屏幕吸附感知与径向菜单' }
      ],
      partial: [
        { id: 'pro-12-13', note: '支持离屏桌面蓝牙旋转操作 (调音量、翻页、时间轴缩放)' },
        { id: 'pro-12-13-intel', note: '支持离屏桌面蓝牙旋转操作' },
        { id: 'pro-12-13-snap', note: '支持离屏桌面蓝牙旋转操作' },
        { id: 'pro-11-13', note: '支持离屏桌面蓝牙旋转操作' },
        { id: 'pro-10-biz', note: '支持离屏桌面蓝牙旋转操作' },
        { id: 'pro-9', note: '支持离屏桌面蓝牙旋转操作' },
        { id: 'pro-8', note: '支持离屏桌面蓝牙旋转操作' },
        { id: 'sls-2', note: '支持离屏桌面蓝牙旋转与参数调节' },
        { id: 'sls-1', note: '支持离屏桌面蓝牙旋转与参数调节' },
        { id: 'laptop-5', note: '支持桌面离屏蓝牙旋钮操作' },
        { id: 'go-4', note: '支持桌面离屏蓝牙旋钮操作' },
        { cat: 'laptop', note: '支持桌面离屏蓝牙旋钮操作' },
        { cat: 'go', note: '支持桌面离屏蓝牙旋钮操作' }
      ],
      unsupportedNote: '不支持'
    })
  }
];

console.log(`✅ 成功组装 23 款配件！开始校验数据完整性...`);

// 校验每一款配件与 70 款设备的对应完整性
fullAccessories.forEach(acc => {
  if (!acc.compatibilityList || acc.compatibilityList.length !== 70) {
    throw new Error(`配件 ${acc.name} 兼容列表长度错误: 期望 70, 实际 ${acc.compatibilityList ? acc.compatibilityList.length : 0}`);
  }
});
console.log(`🎉 23 款配件数据 100% 覆盖 70 款设备（共计 ${23 * 70} = 1610 条官方兼容判定）！`);

// 导出
module.exports = fullAccessories;
