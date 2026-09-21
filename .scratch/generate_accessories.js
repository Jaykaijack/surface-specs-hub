// 生成覆盖 2012~2026 全周期的 11 款核心官方配件兼容性数据库
const accessories = [
  {
    id: "flex-keyboard",
    name: "Surface Pro Flex 键盘",
    category: "keyboard",
    tagline: "蓝牙无线分离脱机 + 磁吸直连双模键盘，内置充电电池与触觉反馈触控板",
    features: [
      "蓝牙无线脱机输入 (高达 41 小时离线续航)",
      "磁吸笔槽无线充电 (收纳并为 Slim Pen 2 补电)",
      "触觉反馈精准触控板 (可调节拟真震动反馈)",
      "增强型碳纤维机身与静音机械键程"
    ],
    compatibilityList: [
      { deviceId: "pro-12-13-intel", status: "FULL", note: "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)" },
      { deviceId: "pro-12-13-snap", status: "FULL", note: "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)" },
      { deviceId: "pro-12-13", status: "FULL", note: "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)" },
      { deviceId: "pro-11-13", status: "FULL", note: "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)" },
      { deviceId: "pro-11-biz-snap", status: "FULL", note: "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)" },
      { deviceId: "pro-11-biz-intel", status: "FULL", note: "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)" },
      { deviceId: "pro-10-biz", status: "FULL", note: "完美原生支持 (磁吸附与离机无线蓝牙均完美工作)" },
      { deviceId: "pro-9", status: "PARTIAL", note: "支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动" },
      { deviceId: "pro-9-biz", status: "PARTIAL", note: "支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动" },
      { deviceId: "pro-8", status: "PARTIAL", note: "支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动" },
      { deviceId: "pro-8-biz", status: "PARTIAL", note: "支持磁吸直连；蓝牙离机无线连接需 Windows 11 最新固件与驱动" },
      { deviceId: "pro-x", status: "PARTIAL", note: "支持物理磁吸输入；ARM64 蓝牙离机输入需系统补丁" },
      { deviceId: "pro-12-inch", status: "UNSUPPORTED", note: "不支持 (12英寸轻薄机身尺寸与接口物理不匹配)" },
      { deviceId: "pro-12-inch-biz", status: "UNSUPPORTED", note: "不支持 (12英寸轻薄机身尺寸与接口物理不匹配)" },
      { deviceId: "pro-7-plus", status: "UNSUPPORTED", note: "不支持 (物理磁吸接口与折角不兼容)" },
      { deviceId: "pro-7", status: "UNSUPPORTED", note: "不支持 (物理磁吸接口与折角不兼容)" },
      { deviceId: "pro-6", status: "UNSUPPORTED", note: "不支持 (物理磁吸接口不兼容)" },
      { deviceId: "pro-5", status: "UNSUPPORTED", note: "不支持 (物理磁吸接口不兼容)" },
      { deviceId: "pro-4", status: "UNSUPPORTED", note: "不支持 (物理磁吸接口不兼容)" },
      { deviceId: "pro-3", status: "UNSUPPORTED", note: "不支持 (物理磁吸接口不兼容)" }
    ]
  },
  {
    id: "pro-signature-keyboard",
    name: "Surface Pro 特制版专业键盘盖 (带笔槽款)",
    category: "keyboard",
    tagline: "现代 Pro 标配：集成隐藏式 Slim Pen 磁吸无线充电笔槽与 Alcantara 欧缔兰面料",
    features: [
      "磁吸笔槽无线充电 (专为 Slim Pen 1/2 补电)",
      "Alcantara® 奢华欧缔兰防污面料",
      "全尺寸机械背光按键 (1.3mm 键程)",
      "大尺寸防误触玻璃触控板"
    ],
    compatibilityList: [
      { deviceId: "pro-12-13-intel", status: "FULL", note: "完美原生支持 (物理磁吸附打字与笔槽感应充电)" },
      { deviceId: "pro-12-13-snap", status: "FULL", note: "完美原生支持 (物理磁吸附打字与笔槽感应充电)" },
      { deviceId: "pro-12-13", status: "FULL", note: "完美原生支持 (物理磁吸附打字与笔槽感应充电)" },
      { deviceId: "pro-11-13", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-11-biz-snap", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-11-biz-intel", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-10-biz", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-9", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-9-biz", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-8", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-8-biz", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-x", status: "FULL", note: "原生完美支持" },
      { deviceId: "pro-12-inch", status: "UNSUPPORTED", note: "不支持 (12英寸轻便款机身宽度与接口不匹配)" },
      { deviceId: "pro-12-inch-biz", status: "UNSUPPORTED", note: "不支持 (12英寸轻便款机身宽度与接口不匹配)" },
      { deviceId: "pro-7-plus", status: "UNSUPPORTED", note: "不支持 (新版 8 针卡槽与 Pro 7 以前 6 针不兼容)" },
      { deviceId: "pro-7", status: "UNSUPPORTED", note: "不支持 (接口不兼容)" },
      { deviceId: "pro-6", status: "UNSUPPORTED", note: "不支持 (接口不兼容)" }
    ]
  },
  {
    id: "pro-classic-type-cover",
    name: "Surface Pro 经典专业键盘盖 (Type Cover)",
    category: "keyboard",
    tagline: "Pro 3 至 Pro 7+ 长达 8 年的经典常青标配，磁吸折角与稳定双角度人体工学支撑",
    features: [
      "经典 6 针 Pogo Pin 物理触点 (即插即用，零延迟)",
      "双折叠第二磁吸条 (提供舒适倾角输入与防晃动)",
      "可选带指纹识别款 (Windows Hello 生物识别解锁)",
      "机械剪刀脚背光键轴与精准触控板"
    ],
    compatibilityList: [
      { deviceId: "pro-7-plus", status: "FULL", note: "完美原生支持 (黄金搭档，全功能与倾斜磁吸条完美吸附)" },
      { deviceId: "pro-7", status: "FULL", note: "完美原生支持 (黄金搭档，全功能与倾斜磁吸条完美吸附)" },
      { deviceId: "pro-6", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-5", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-4", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-3", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-8", status: "UNSUPPORTED", note: "不支持 (Pro 8 起机身接口升级为新规格，物理不兼容)" },
      { deviceId: "pro-8-biz", status: "UNSUPPORTED", note: "不支持 (物理接口不兼容)" },
      { deviceId: "pro-9", status: "UNSUPPORTED", note: "不支持 (物理接口不兼容)" },
      { deviceId: "pro-10-biz", status: "UNSUPPORTED", note: "不支持 (物理接口不兼容)" },
      { deviceId: "pro-11-13", status: "UNSUPPORTED", note: "不支持 (物理接口不兼容)" },
      { deviceId: "pro-12-13", status: "UNSUPPORTED", note: "不支持 (物理接口不兼容)" }
    ]
  },
  {
    id: "go-signature-type-cover",
    name: "Surface Go 特制版专业键盘盖 (Go Type Cover)",
    category: "keyboard",
    tagline: "10.5 英寸专属伴侣：全系 Go 1~4 代外形 100% 互通，紧凑轻盈全机械手感",
    features: [
      "专属紧凑型 6 针磁吸接口 (机身严丝合缝闭合)",
      "可选奢华 Alcantara® 与经典超纤两种材质",
      "全尺寸键盘布局与全域平滑触控板",
      "独立 Windows 快捷键与三档背光调节"
    ],
    compatibilityList: [
      { deviceId: "go-4", status: "FULL", note: "完美原生支持 (Go 4 商用标配)" },
      { deviceId: "go-3", status: "FULL", note: "完美原生支持" },
      { deviceId: "go-3-biz", status: "FULL", note: "完美原生支持" },
      { deviceId: "go-2", status: "FULL", note: "完美原生支持" },
      { deviceId: "go-1", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-11-13", status: "UNSUPPORTED", note: "不支持 (物理宽度与触点专为 Go 设计)" },
      { deviceId: "pro-7", status: "UNSUPPORTED", note: "不支持 (尺寸不匹配)" }
    ]
  },
  {
    id: "slim-pen-2",
    name: "Surface 超感触控笔 2 (Slim Pen 2)",
    category: "pen",
    tagline: "微软旗舰触控笔：内置独立触觉震动马达，仿真纸张摩擦阻尼感与零压感起笔",
    features: [
      "触觉反馈震动马达 (内置触觉驱动器模拟真实纸笔触感)",
      "4096 级压感与极低初始起笔力 (零接触阻力)",
      "支持机身侧边 / 键盘笔槽无线磁吸充电",
      "顶部数字橡皮擦与蓝牙快捷动作按键"
    ],
    compatibilityList: [
      { deviceId: "pro-12-13-intel", status: "FULL", note: "完美原生支持 (纸感触觉震动 + 键盘笔槽无线快充)" },
      { deviceId: "pro-12-13-snap", status: "FULL", note: "完美原生支持 (纸感触觉震动 + 键盘笔槽无线快充)" },
      { deviceId: "pro-12-13", status: "FULL", note: "完美原生支持 (纸感触觉震动 + 键盘笔槽无线快充)" },
      { deviceId: "pro-11-13", status: "FULL", note: "完美原生支持 (纸感触觉震动 + 键盘笔槽无线快充)" },
      { deviceId: "pro-11-biz-snap", status: "FULL", note: "完美原生支持 (纸感触觉震动 + 键盘笔槽无线快充)" },
      { deviceId: "pro-11-biz-intel", status: "FULL", note: "完美原生支持 (纸感触觉震动 + 键盘笔槽无线快充)" },
      { deviceId: "pro-10-biz", status: "FULL", note: "完美原生支持 (纸感触觉震动 + 键盘笔槽无线快充)" },
      { deviceId: "pro-9", status: "FULL", note: "原生支持触觉震动与笔槽无线充电" },
      { deviceId: "pro-9-biz", status: "FULL", note: "原生支持触觉震动与笔槽无线充电" },
      { deviceId: "pro-8", status: "FULL", note: "原生支持触觉震动与笔槽无线充电" },
      { deviceId: "pro-8-biz", status: "FULL", note: "原生支持触觉震动与笔槽无线充电" },
      { deviceId: "sls-2", status: "FULL", note: "完美原生支持 (屏幕触觉反馈 + 掌托底部凹槽无线吸附补电)" },
      { deviceId: "sls-2-biz", status: "FULL", note: "完美原生支持 (屏幕触觉反馈 + 掌托底部凹槽无线吸附补电)" },
      { deviceId: "sls-1", status: "FULL", note: "完美原生支持 (屏幕触觉反馈 + 掌托底部凹槽无线吸附补电)" },
      { deviceId: "sls-1-biz", status: "FULL", note: "完美原生支持 (屏幕触觉反馈 + 掌托底部凹槽无线吸附补电)" },
      { deviceId: "pro-12-inch", status: "PARTIAL", note: "支持 4096 级压感与倾斜书写；机身无震动马达驱动，需配外置无线充电座" },
      { deviceId: "pro-12-inch-biz", status: "PARTIAL", note: "支持 4096 级压感与倾斜书写；机身无震动马达驱动，需配外置无线充电座" },
      { deviceId: "pro-7-plus", status: "PARTIAL", note: "支持压感书写与橡皮擦功能；无触觉震动，充电需使用 USB-C 独立充电机底座" },
      { deviceId: "pro-7", status: "PARTIAL", note: "支持书写绘图，无触觉震动，需外置充电座" },
      { deviceId: "pro-6", status: "PARTIAL", note: "支持书写绘图，无触觉震动，需外置充电座" },
      { deviceId: "pro-5", status: "PARTIAL", note: "支持书写绘图，无触觉震动，需外置充电座" },
      { deviceId: "pro-4", status: "PARTIAL", note: "支持书写绘图，无触觉震动，需外置充电座" },
      { deviceId: "pro-3", status: "PARTIAL", note: "支持基础书写，无倾角与触觉震动" },
      { deviceId: "go-4", status: "PARTIAL", note: "支持精准压感书写与防误触，无触觉震动" },
      { deviceId: "go-3", status: "PARTIAL", note: "支持精准压感书写，无触觉震动" },
      { deviceId: "go-2", status: "PARTIAL", note: "支持精准压感书写，无触觉震动" },
      { deviceId: "book-3-15", status: "PARTIAL", note: "支持 4096 级压感绘图，无触觉震动" },
      { deviceId: "book-3-135", status: "PARTIAL", note: "支持 4096 级压感绘图，无触觉震动" },
      { deviceId: "studio-2-plus", status: "PARTIAL", note: "支持 4096 级大屏压感书写绘图，无触觉震动" },
      { deviceId: "laptop-8-138", status: "UNSUPPORTED", note: "不支持 (Laptop 第 8 代触控屏官方未开放主动式手写笔协议)" },
      { deviceId: "laptop-7-138", status: "UNSUPPORTED", note: "不支持 (Laptop 第 7 代触控屏官方未开放主动式手写笔协议)" }
    ]
  },
  {
    id: "slim-pen-1",
    name: "Surface 超感触控笔一代 (Slim Pen 1)",
    category: "pen",
    tagline: "扁平木工铅笔造型首作，内置充电锂电池，为 Pro X 与早期轻薄设备打造",
    features: [
      "扁平薄型木工铅笔握持设计",
      "4096 级压感与倾角阴影涂抹",
      "集成锂聚合物充电电池",
      "支持独立 USB 磁吸充电底座"
    ],
    compatibilityList: [
      { deviceId: "pro-x", status: "FULL", note: "完美原生搭档 (键盘盖笔槽无缝无线收纳充电)" },
      { deviceId: "pro-8", status: "FULL", note: "原生支持 (可在特制键盘盖笔槽内无线充电，无 Slim Pen 2 触觉震动)" },
      { deviceId: "pro-9", status: "FULL", note: "原生支持 (可在特制键盘盖笔槽内无线充电，无触觉震动)" },
      { deviceId: "sls-1", status: "FULL", note: "原生支持 (掌托下凹槽充电)" },
      { deviceId: "pro-7-plus", status: "PARTIAL", note: "支持正常书写与橡皮擦，需配外置充电盒" },
      { deviceId: "pro-7", status: "PARTIAL", note: "支持正常书写，需配外置充电盒" },
      { deviceId: "go-3", status: "PARTIAL", note: "支持正常书写，需配外置充电盒" }
    ]
  },
  {
    id: "surface-pen-classic",
    name: "Surface 触控笔经典款 (Surface Pen 4096 级带笔夹/单侧磁吸)",
    category: "pen",
    tagline: "微软历代最普及的长青款触控笔：铝合金圆柱笔身、侧边强磁吸附、单节 AAAA 电池超长续航",
    features: [
      "单节 AAAA 电池提供长达 1 年续航 (无需充电焦虑)",
      "4096 级高精度压感与倾斜书写 (MPP 2.0 协议)",
      "可替换艺术笔尖组 (预装 HB，可选 2H/H/B 笔尖)",
      "笔身一整面强磁力吸附于机身左侧"
    ],
    compatibilityList: [
      { deviceId: "pro-7-plus", status: "FULL", note: "黄金搭档 (4096 级压感 + 倾斜着色 + 机身左侧完美磁吸附)" },
      { deviceId: "pro-7", status: "FULL", note: "黄金搭档 (4096 级压感 + 倾斜着色 + 机身左侧完美磁吸附)" },
      { deviceId: "pro-6", status: "FULL", note: "黄金搭档 (4096 级压感 + 倾角)" },
      { deviceId: "pro-5", status: "FULL", note: "黄金搭档 (4096 级压感 + 倾角首发支持)" },
      { deviceId: "pro-4", status: "FULL", note: "完美支持 (4096 级压感，但不支持倾斜笔触)" },
      { deviceId: "pro-3", status: "FULL", note: "完美支持 (256 级升级压感映射，蓝牙顶部按键打开 OneNote)" },
      { deviceId: "book-3-15", status: "FULL", note: "完美支持 (机身侧边磁吸附 + 4096 级专业绘图)" },
      { deviceId: "book-2-15", status: "FULL", note: "完美支持" },
      { deviceId: "book-1", status: "FULL", note: "完美支持" },
      { deviceId: "studio-2-plus", status: "FULL", note: "专业大屏首选 (28 英寸数字画板倾角墨迹与防误触)" },
      { deviceId: "studio-2", status: "FULL", note: "专业大屏首选" },
      { deviceId: "studio-1", status: "FULL", note: "专业大屏首选" },
      { deviceId: "laptop-5", status: "FULL", note: "支持触控屏墨迹输入" },
      { deviceId: "laptop-4", status: "FULL", note: "支持触控屏墨迹输入" },
      { deviceId: "laptop-3", status: "FULL", note: "支持触控屏墨迹输入" },
      { deviceId: "go-4", status: "FULL", note: "支持完整书写与侧边磁吸附" },
      { deviceId: "go-3", status: "FULL", note: "支持完整书写与侧边磁吸附" },
      { deviceId: "go-2", status: "FULL", note: "支持完整书写与侧边磁吸附" },
      { deviceId: "pro-8", status: "FULL", note: "完美支持书写与侧边磁吸附 (但无法放入新键盘笔槽)" },
      { deviceId: "pro-9", status: "FULL", note: "完美支持书写与侧边磁吸附" },
      { deviceId: "pro-10-biz", status: "FULL", note: "完美支持书写与侧边磁吸附" },
      { deviceId: "pro-11-13", status: "FULL", note: "完美支持书写与侧边磁吸附" },
      { deviceId: "pro-12-13", status: "FULL", note: "完美支持书写与侧边磁吸附" },
      { deviceId: "sls-2", status: "FULL", note: "完美支持屏幕压感书写绘图" },
      { deviceId: "sls-1", status: "FULL", note: "完美支持屏幕压感书写绘图" }
    ]
  },
  {
    id: "surface-dock-2",
    name: "Surface 拓展坞 2 代 (Surface Dock 2 磁吸口)",
    category: "dock",
    tagline: "199W 强劲供电与双 4K 60Hz 输出，专为 Surface Connect 磁吸接口深度调优",
    features: [
      "Surface Connect 经典磁吸接口 (一线解决供电与全量数据拓展)",
      "199W 大功率外置电源 (向主机输出高达 120W+ 快充)",
      "4 × USB-C 接口 (后置 2 口支持双 4K 60Hz 视频输出，前置 2 口 15W 快充)",
      "2 × USB-A 3.2 + 千兆有线网口 (RJ45) + 3.5mm 音频输入输出"
    ],
    compatibilityList: [
      { deviceId: "pro-12-13-intel", status: "FULL", note: "完美一线连 (磁吸快充 + 双 4K 60Hz 显示输出 + 外设)" },
      { deviceId: "pro-12-13-snap", status: "FULL", note: "完美一线连 (磁吸快充 + 双 4K 60Hz 显示输出 + 外设)" },
      { deviceId: "pro-11-13", status: "FULL", note: "完美原生支持 (磁吸一线连)" },
      { deviceId: "pro-10-biz", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-9", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-8", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-7-plus", status: "FULL", note: "完美原生支持" },
      { deviceId: "sls-2", status: "FULL", note: "完美原生支持 (支持 120W 磁吸快充与双屏扩展)" },
      { deviceId: "sls-1", status: "FULL", note: "完美原生支持" },
      { deviceId: "laptop-5", status: "FULL", note: "完美原生支持" },
      { deviceId: "laptop-4", status: "FULL", note: "完美原生支持" },
      { deviceId: "laptop-3", status: "FULL", note: "完美原生支持" },
      { deviceId: "book-3-15", status: "FULL", note: "完美原生支持" },
      { deviceId: "go-4", status: "FULL", note: "完美原生支持" },
      { deviceId: "go-3", status: "FULL", note: "完美原生支持" },
      { deviceId: "pro-7", status: "PARTIAL", note: "支持充电与数据，双 4K 模式受限于主机架构限 30Hz 或单 4K 60Hz" },
      { deviceId: "pro-6", status: "PARTIAL", note: "支持充电与 USB 扩展；视频输出最高仅支持双 4K 30Hz" },
      { deviceId: "pro-5", status: "PARTIAL", note: "支持充电与 USB 扩展" },
      { deviceId: "pro-4", status: "PARTIAL", note: "支持充电与 USB 扩展" }
    ]
  },
  {
    id: "surface-dock-1",
    name: "Surface 拓展坞 1 代 (Surface Dock 1 砖块形)",
    category: "dock",
    tagline: "Surface Connect 磁吸拓展基石：经典砖块配重设计，集成双 Mini DP 与 4 口 USB 3.0",
    features: [
      "经典沉稳砖块配重外形 (桌面稳固防滑)",
      "Surface Connect 磁吸一线连 (最高 60W 供电)",
      "2 × Mini DisplayPort (双屏扩展)",
      "4 × USB 3.0 Type-A 接口 + 千兆以太网口 + 3.5mm 音频口"
    ],
    compatibilityList: [
      { deviceId: "pro-7-plus", status: "FULL", note: "完美原生兼容 (Mini DP 显示输出 + 磁吸供电)" },
      { deviceId: "pro-7", status: "FULL", note: "完美原生兼容" },
      { deviceId: "pro-6", status: "FULL", note: "完美原生兼容" },
      { deviceId: "pro-5", status: "FULL", note: "完美原生兼容" },
      { deviceId: "pro-4", status: "FULL", note: "完美原生兼容" },
      { deviceId: "pro-3", status: "FULL", note: "完美原生兼容 (Pro 3 桌面黄金拓展站)" },
      { deviceId: "book-1", status: "FULL", note: "完美原生兼容" },
      { deviceId: "book-2-15", status: "FULL", note: "完美原生兼容" },
      { deviceId: "laptop-1", status: "FULL", note: "完美原生兼容" },
      { deviceId: "laptop-2", status: "FULL", note: "完美原生兼容" },
      { deviceId: "go-1", status: "FULL", note: "完美原生兼容" },
      { deviceId: "go-2", status: "FULL", note: "完美原生兼容" },
      { deviceId: "pro-8", status: "PARTIAL", note: "支持磁吸供电与基础 USB 扩展，但供电功率偏低 (60W)，不推荐用于现代旗舰" },
      { deviceId: "pro-9", status: "PARTIAL", note: "支持基础供电与外设，无 Type-C 视频输出" },
      { deviceId: "pro-11-13", status: "PARTIAL", note: "支持基础供电与外设，无 Type-C 视频输出" },
      { deviceId: "pro-12-13", status: "PARTIAL", note: "支持基础供电与外设，无 Type-C 视频输出" }
    ]
  },
  {
    id: "surface-tb4-dock",
    name: "Surface 雷电 4 拓展坞 (Thunderbolt 4 Dock)",
    category: "dock",
    tagline: "采用国际通用 USB-C / 雷电 4 协议，跨生态 96W 高功率快充与高速扩展中心",
    features: [
      "通用 Thunderbolt™ 4 / USB4 标准 (无需 Surface Connect 专有磁吸口)",
      "96W PD 高功率输出 (满足主机满负荷高速充电)",
      "3 × 雷电 4 / USB-C 接口 (支持双 4K 60Hz 或单 8K 超高清大屏)",
      "前后触觉盲插指示浮雕 + 2.5G 高速网络接口 (RJ45)"
    ],
    compatibilityList: [
      { deviceId: "pro-12-13-intel", status: "FULL", note: "完美满血雷电 4 (双 4K 60Hz + 96W PD 快充 + 40Gbps 高速数据)" },
      { deviceId: "pro-12-13-snap", status: "FULL", note: "完美兼容 (USB4 模式双 4K 60Hz + 96W PD 快充)" },
      { deviceId: "pro-12-13", status: "FULL", note: "完美兼容 (USB4 模式双 4K 60Hz + 96W PD 快充)" },
      { deviceId: "pro-11-13", status: "FULL", note: "完美兼容 (高通骁龙 USB4 协议满血直连)" },
      { deviceId: "pro-10-biz", status: "FULL", note: "完美原生支持 (Intel Thunderbolt 4 认证)" },
      { deviceId: "pro-9", status: "FULL", note: "Intel 款原生满血支持雷电 4；5G 款以 USB-C 3.2 模式降速运行" },
      { deviceId: "pro-8", status: "FULL", note: "完美原生支持 (Intel Thunderbolt 4 认证)" },
      { deviceId: "sls-2", status: "FULL", note: "完美原生支持 (双雷电 4 全功能扩展)" },
      { deviceId: "sls-1", status: "FULL", note: "完美原生支持 (双雷电 4 全功能扩展)" },
      { deviceId: "laptop-8-138-intel", status: "FULL", note: "完美原生支持" },
      { deviceId: "laptop-8-138-snap", status: "FULL", note: "完美原生支持 (USB4)" },
      { deviceId: "laptop-7-138", status: "FULL", note: "完美原生支持 (USB4)" },
      { deviceId: "laptop-6-biz", status: "FULL", note: "完美原生支持 (Thunderbolt 4)" },
      { deviceId: "laptop-5", status: "FULL", note: "完美原生支持 (Thunderbolt 4)" },
      { deviceId: "pro-12-inch", status: "PARTIAL", note: "主机为全功能 USB-C 模式，支持 96W 充电与单屏 4K 输出，无雷电 4 专属带宽" },
      { deviceId: "pro-12-inch-biz", status: "PARTIAL", note: "全功能 USB-C 模式，支持 96W 充电与单屏 4K 输出" },
      { deviceId: "go-4", status: "PARTIAL", note: "标准 USB-C 协议连接，支持供电与扩展显示输出" },
      { deviceId: "go-3", status: "PARTIAL", note: "标准 USB-C 协议连接，支持供电与扩展" },
      { deviceId: "pro-7-plus", status: "PARTIAL", note: "主机 Type-C 仅为 3.1 规格，无雷电协议支持" },
      { deviceId: "pro-7", status: "PARTIAL", note: "主机 Type-C 仅为 3.1 规格，无雷电协议支持" },
      { deviceId: "pro-6", status: "UNSUPPORTED", note: "不支持 (主机无 USB-C 接口，仅全尺寸 USB-A 与 Mini DP)" },
      { deviceId: "pro-5", status: "UNSUPPORTED", note: "不支持 (主机无 USB-C 接口)" },
      { deviceId: "pro-4", status: "UNSUPPORTED", note: "不支持 (主机无 USB-C 接口)" },
      { deviceId: "pro-3", status: "UNSUPPORTED", note: "不支持 (主机无 USB-C 接口)" }
    ]
  },
  {
    id: "surface-dial",
    name: "Surface Dial 屏幕实体交互旋钮",
    category: "dial",
    tagline: "从概念走入现实的革命性交互控制器：支持大屏原位吸附调色盘与离屏径向滚轮刻度手感",
    features: [
      "大屏原位贴合识别 (直接吸附在支持的屏幕表面生成径向控制环)",
      "铝合金阳极氧化精密转子与物理压感点击",
      "精细触觉阻尼反馈 (旋转时模拟真实机械齿轮刻度感)",
      "深度集成于 Adobe CC、Photoshop、Sketchable 及 Office 生产力套件"
    ],
    compatibilityList: [
      { deviceId: "studio-2-plus", status: "FULL", note: "帝王级原位交互 (直接贴合在 28 英寸 PixelSense 大屏上呼出专属环形调色菜单)" },
      { deviceId: "studio-2", status: "FULL", note: "帝王级原位交互 (屏幕表面原位吸附识别)" },
      { deviceId: "studio-1", status: "FULL", note: "帝王级原位交互 (屏幕表面原位吸附识别)" },
      { deviceId: "pro-7", status: "FULL", note: "支持屏幕原位吸附调色环与离屏桌面蓝牙操作" },
      { deviceId: "pro-6", status: "FULL", note: "支持屏幕原位吸附调色环与离屏桌面蓝牙操作" },
      { deviceId: "pro-5", status: "FULL", note: "支持屏幕原位吸附调色环与离屏桌面蓝牙操作" },
      { deviceId: "pro-4", status: "FULL", note: "支持屏幕原位吸附调色环与离屏桌面蓝牙操作" },
      { deviceId: "book-3-15", status: "FULL", note: "支持屏幕原位吸附操作" },
      { deviceId: "book-2-15", status: "FULL", note: "支持屏幕原位吸附操作" },
      { deviceId: "pro-12-13-intel", status: "PARTIAL", note: "支持离屏桌面蓝牙旋转、滚动与调色操作 (屏幕原位吸附功能需软件支持)" },
      { deviceId: "pro-12-13-snap", status: "PARTIAL", note: "支持离屏桌面蓝牙旋转、滚动与调色操作" },
      { deviceId: "pro-11-13", status: "PARTIAL", note: "支持离屏桌面蓝牙旋转操作" },
      { deviceId: "pro-9", status: "PARTIAL", note: "支持离屏桌面蓝牙旋转操作" },
      { deviceId: "pro-8", status: "PARTIAL", note: "支持离屏桌面蓝牙旋转操作" },
      { deviceId: "sls-2", status: "PARTIAL", note: "支持离屏桌面蓝牙旋转与参数调节" },
      { deviceId: "sls-1", status: "PARTIAL", note: "支持离屏桌面蓝牙旋转与参数调节" },
      { deviceId: "laptop-5", status: "PARTIAL", note: "支持桌面离屏蓝牙旋钮操作 (调音量、翻页、时间轴缩放)" },
      { deviceId: "go-4", status: "PARTIAL", note: "支持桌面离屏蓝牙旋钮操作" }
    ]
  }
];

module.exports = accessories;
