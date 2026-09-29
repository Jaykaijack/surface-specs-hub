/**
 * Xbox consoles. Specs are copied from US Microsoft / Xbox pages opened on 2026-09-29.
 * Numbers that were not on those pages stay not_disclosed.
 */
var XBOX_LINEUP = (function () {
  var ND = 'not_disclosed';
  var NA = 'not_applicable';

  function blank() {
    return {
      releaseDate: '这次打开的官网页面没有写发售日期',
      generation: '',
      status: '',
      salesRegion: '',
      targetAudience: '家用游戏主机',
      tagline: '',
      colors: [],
      chassisMaterial: ND,
      kickstandType: NA,
      osAtLaunch: ND,
      cpuModel: ND,
      cpuArch: ND,
      cpuCores: ND,
      gpuModel: ND,
      npuModel: NA,
      npuTops: NA,
      copilotPlus: NA,
      ramSpec: ND,
      storageOptions: ND,
      ssdRemovable: ND,
      expandableStorage: ND,
      screenSize: NA,
      aspectRatio: NA,
      panelTech: NA,
      resolution: ND,
      ppi: NA,
      refreshRate: ND,
      brightness: NA,
      colorSupport: ND,
      touchAndPenProtocol: NA,
      frontCamera: NA,
      windowsHello: NA,
      rearCamera: NA,
      videoFeatures: ND,
      microphones: NA,
      speakers: NA,
      audioTech: ND,
      headphoneJack: ND,
      usbPorts: ND,
      thunderboltSupport: NA,
      surfaceConnect: NA,
      wireless: ND,
      cellular: NA,
      batteryCapacityWh: NA,
      batteryLifeOffice: NA,
      batteryLifeVideo: NA,
      chargingPower: ND,
      fastCharging: NA,
      compatibleKeyboard: NA,
      penHapticFeedback: NA,
      penChargingType: NA,
      trackpadType: NA,
      tpmChip: ND,
      securedCorePc: NA,
      biometrics: NA,
      enterpriseManage: NA,
      dimensionsMm: ND,
      weightGrams: ND,
      totalWeightWithKeyboard: NA,
      thermalDesign: ND,
      repairabilityScore: ND,
      replaceableParts: ND,
      warranty: ND,
      startingPriceCny: ND,
      sourceReliability: 'microsoft_official',
      lastVerified: '2026-09-29',
      officialDocUrl: ''
    };
  }

  function row(meta, spec) {
    var specs = blank();
    Object.keys(spec || {}).forEach(function (key) { specs[key] = spec[key]; });
    specs.generation = meta.generation;
    specs.status = meta.status;
    specs.tagline = meta.tagline;
    return {
      id: meta.id,
      categoryId: 'xbox',
      heroImage: '',
      name: meta.name,
      nameEn: meta.nameEn,
      generation: meta.generation,
      year: meta.year,
      status: meta.status,
      targetAudience: '家用游戏主机',
      flagship: !!meta.flagship,
      tagline: meta.tagline,
      prevGenerationId: meta.prev || null,
      nextGenerationId: meta.next || null,
      learnDocUrl: meta.url,
      isCommercial: false,
      segment: 'consumer',
      specs: specs
    };
  }

  var seriesCpu = '8 核 Custom Zen 2，3.8 GHz（开启 SMT 时 3.6 GHz）';
  var seriesPorts = '1 个 HDMI 2.1；3 个 USB 3.1 Gen 1';
  var seriesRadio = '802.11ac 双频；以太网 802.3 10/100/1000；专用双频 Xbox Wireless';
  var seriesAudio = 'Dolby Digital 5.1，DTS 5.1，Dolby TrueHD with Atmos，最高 7.1 L-PCM';
  var seriesExpand = '可加 Xbox Series X|S 存储扩展卡（另购，速度与内置一致）；也支持 USB 3.1 外接硬盘（另购）';
  var seriesIo = '2.4 GB/s（原始），4.8 GB/s（压缩，带专用硬件解压）';
  var seriesVideoExtras = 'HDMI：自动低延迟、可变刷新率、AMD FreeSync';

  return [
    row({
      id: 'xbox-original',
      name: '初代 Xbox',
      nameEn: 'Original Xbox',
      generation: '初代',
      year: null,
      status: 'discontinued',
      tagline: 'Xbox 主机的第一代。这次打开的美国官网页面没有给出芯片和容量数字。',
      next: 'xbox-360',
      url: 'https://news.xbox.com/en-us/2005/05/28/what-type-of-tv-will-you-need-for-the-xbox-360/'
    }, {
      salesRegion: '美国 Xbox Wire（2005-05-28）在讲 Xbox 360 电视输出时，顺带写了初代 Xbox 的视频输出。不是当前国行在售。芯片、内存、硬盘容量这次没有打开到单独的官方规格表，所以不填写。',
      resolution: '可输出 480i、480p、720p、1080i。同一篇说明写：当时只有少数 Xbox 游戏支持更高分辨率。',
      officialDocUrl: 'https://news.xbox.com/en-us/2005/05/28/what-type-of-tv-will-you-need-for-the-xbox-360/'
    }),
    row({
      id: 'xbox-360',
      name: 'Xbox 360',
      nameEn: 'Xbox 360',
      generation: 'Xbox 360',
      year: 2005,
      status: 'discontinued',
      tagline: '三核，512MB 内存。高端套装带 20GB 可拆硬盘。',
      prev: 'xbox-original',
      next: 'xbox-360-s',
      url: 'http://mktplassets.xbox.com/NR/rdonlyres/D535D3AF-6943-4B91-ABF2-70B2D43D6B27/0/ConsoleWarranty_LATAM_0801.pdf'
    }, {
      releaseDate: '2005 年 8 月 17 日公布价格，当年假期在北美、欧洲、日本上市（美国 Xbox Wire）',
      salesRegion: '硬件规格来自微软 Xbox 官网托管的 2008 年主机规格页。该文件的保修法律范围写的是墨西哥和哥伦比亚。上市套装来自美国 Xbox Wire。不是当前国行在售。',
      cpuModel: '定制 PowerPC',
      cpuArch: '3 个对称核心，3.2 GHz；每核 2 个硬件线程（共 6 线程）；1 MB 二级缓存；前端总线 2.7 GHz',
      cpuCores: '3 核 3.2 GHz',
      gpuModel: '定制 ATI，500 MHz；10 MB 嵌入式 DRAM（256 GB/s）；48 路并行浮点着色；统一着色器架构',
      ramSpec: '512 MB GDDR3，统一内存。系统软件会占用硬盘和记忆卡上的一部分内存，用户能用的少于标称值。',
      storageOptions: '2005 年 8 月 17 日 Xbox Wire：399.99 美元高端套装含 20GB 可拆硬盘；299.99 美元 Core 套装不含这块硬盘，硬盘可另购。',
      ssdRemovable: '高端套装的 20GB 硬盘可从主机上拆下（Xbox Wire 原文 detachable）',
      resolution: '游戏支持 16:9、抗锯齿，高清至少 720p。支持标清和高清输出。Wire 另写可输出 720p/1080i。',
      usbPorts: 'USB：前面 2 个、后面 1 个。另有记忆卡插槽 2 个、以太网、AV 口、电源口、红外接收。',
      wireless: '2.4 GHz 数字扩频，最多 4 名玩家',
      chargingPower: '电源以电源适配器铭牌为准（规格页原文 Refer to ratings plate）',
      dimensionsMm: '310 × 80 × 260 mm（约 12 × 3 × 10 英寸）',
      weightGrams: '3.5 kg（约 7.7 磅）',
      thermalDesign: '工作温度 5°C 至 35°C',
      officialDocUrl: 'http://mktplassets.xbox.com/NR/rdonlyres/D535D3AF-6943-4B91-ABF2-70B2D43D6B27/0/ConsoleWarranty_LATAM_0801.pdf'
    }),
    row({
      id: 'xbox-360-s',
      name: 'Xbox 360 S',
      nameEn: 'Xbox 360 S',
      generation: 'Xbox 360 S',
      year: 2010,
      status: 'discontinued',
      tagline: '2010 年新外形，250GB 硬盘，内置 Wi-Fi N。',
      prev: 'xbox-360',
      next: 'xbox-one',
      url: 'https://news.xbox.com/en-us/2010/06/14/announcing-the-new-xbox-360/'
    }, {
      releaseDate: '2010 年 6 月 14 日公布，当时可预订（美国 Xbox Wire）',
      salesRegion: '美国 Xbox Wire，2010 年 6 月 14 日。公告里的美国标价是 299 美元。不是当前国行在售。这篇公告没有重写处理器和内存，那些格子保持未披露。',
      chassisMaterial: '新设计（公告原文 New design）',
      storageOptions: '250 GB 硬盘',
      wireless: '内置 Wi-Fi N',
      officialDocUrl: 'https://news.xbox.com/en-us/2010/06/14/announcing-the-new-xbox-360/'
    }),
    row({
      id: 'xbox-one',
      name: 'Xbox One',
      nameEn: 'Xbox One',
      generation: 'Xbox One',
      year: 2013,
      status: 'discontinued',
      tagline: '8 核 x86，8GB 内存，带 Blu-ray。',
      prev: 'xbox-360-s',
      next: 'xbox-one-s',
      url: 'https://news.xbox.com/en-us/2013/05/23/marc-whitten-and-major-nelson-discuss-xbox-one-architecture/'
    }, {
      releaseDate: '2013 年 11 月 22 日。首发 13 个市场：澳大利亚、奥地利、巴西、加拿大、法国、德国、爱尔兰、意大利、墨西哥、新西兰、西班牙、英国、美国。',
      salesRegion: '美国 Xbox Wire。首发市场名单里没有中国大陆。不是当前国行在售。',
      cpuModel: '8 核 x86',
      cpuArch: '超过 50 亿个晶体管；原生 64 位',
      cpuCores: '8 核',
      ramSpec: '8GB',
      storageOptions: '大容量 Blu-ray 光驱（原文 huge capacity BluRay drive）。硬盘容量这篇说明没有写数字。',
      usbPorts: 'USB 3.0',
      wireless: 'Wi-Fi Direct',
      officialDocUrl: 'https://news.xbox.com/en-us/2013/05/23/marc-whitten-and-major-nelson-discuss-xbox-one-architecture/'
    }),
    row({
      id: 'xbox-one-s',
      name: 'Xbox One S',
      nameEn: 'Xbox One S',
      generation: 'Xbox One S',
      year: null,
      status: 'discontinued',
      tagline: '内置 4K Ultra HD 和 4K 视频串流。',
      prev: 'xbox-one',
      next: 'xbox-one-x',
      url: 'https://www.xbox.com/en-US/consoles/xbox-one-s'
    }, {
      salesRegion: '美国 xbox.com 的 Xbox One S 页面仍在。不是当前国行在售。页面没有写处理器、内存和硬盘容量，那些格子保持未披露。',
      videoFeatures: '内置 4K Ultra HD 和 4K 视频串流。HDR 需游戏和电视支持。',
      storageOptions: '4K UHD 蓝光、内置电源。Xbox Wire 在介绍 One X 时写明：和 One S 一样，有 4K UHD 蓝光、内置电源、3 个 USB 3.0（前面 1 个、后面 2 个）和红外。硬盘容量没有写数字。',
      usbPorts: '3 个 USB 3.0（前面 1 个、后面 2 个）；红外',
      chargingPower: '内置电源',
      officialDocUrl: 'https://www.xbox.com/en-US/consoles/xbox-one-s'
    }),
    row({
      id: 'xbox-one-x',
      name: 'Xbox One X',
      nameEn: 'Xbox One X',
      generation: 'Xbox One X',
      year: 2017,
      status: 'discontinued',
      tagline: '6 teraflops，12GB GDDR5，1TB 硬盘，4K UHD 蓝光。',
      prev: 'xbox-one-s',
      next: 'xbox-series-x',
      url: 'https://news.xbox.com/en-us/2017/06/11/xbox-one-x-e3-2017/'
    }, {
      releaseDate: '2017 年 11 月 7 日起在当时的 Xbox One 市场发售（美国 Xbox Wire）',
      salesRegion: '美国 Xbox Wire。公告里的美国标价是 499 美元。不是当前国行在售。',
      chassisMaterial: '黑色。可横放，或用另购支架竖放。',
      cpuModel: '8 核定制 AMD，2.3 GHz',
      cpuCores: '8 核 2.3 GHz',
      gpuModel: '6 teraflop GPU；内存带宽 326 GB/s',
      ramSpec: '12GB GDDR5',
      storageOptions: '1TB 硬盘；4K UHD 蓝光',
      resolution: '真 4K（2160p），HDR，宽色域',
      usbPorts: '3 个 USB 3.0（前面 1 个、后面 2 个）；红外',
      chargingPower: '内置电源',
      officialDocUrl: 'https://news.xbox.com/en-us/2017/06/11/xbox-one-x-e3-2017/'
    }),
    row({
      id: 'xbox-series-s-512',
      name: 'Xbox Series S 512GB',
      nameEn: 'Xbox Series S 512GB',
      generation: 'Xbox Series S',
      year: null,
      status: 'current_global',
      tagline: '全数字小主机，1440p，512GB 固态硬盘。',
      prev: 'xbox-one-x',
      next: 'xbox-series-s-1tb',
      url: 'https://www.xbox.com/en-US/consoles/xbox-series-s'
    }, {
      salesRegion: '美国 xbox.com 规格页，以及美国微软商店的 Xbox Series S – 512GB。国行微软商城另有一台 Xbox Series S 全数字版，标价 ¥2,399 起，页面没有写是 512GB 还是 1TB，所以这台不标成国行在售，也不把这个人民币价钱记进来。',
      colors: [{ name: '机器人白 Robot White', hex: '#f2f2f2' }],
      cpuModel: seriesCpu,
      cpuArch: 'Custom Zen 2',
      cpuCores: '8 核 3.8 GHz（SMT 时 3.6 GHz）',
      gpuModel: '4 TFLOPS，20 个计算单元，1.565 GHz，Custom RDNA 2',
      ramSpec: '10GB GDDR6，128 bit。8GB 带宽 224 GB/s，2GB 带宽 56 GB/s。',
      storageOptions: '512GB Custom NVMe SSD。全数字，规格表没有光驱。美国商店说明：光盘游戏不能在 Series S 上玩。',
      expandableStorage: '可加 1TB Xbox Series X|S 存储扩展卡（另购）；也支持 USB 3.1 外接硬盘（另购）。读写：' + seriesIo,
      resolution: '1440p',
      refreshRate: '最高 120 FPS',
      videoFeatures: seriesVideoExtras,
      audioTech: seriesAudio,
      usbPorts: seriesPorts,
      wireless: seriesRadio,
      dimensionsMm: '6.5 × 15.1 × 27.5 cm',
      weightGrams: '4.25 磅',
      officialDocUrl: 'https://www.xbox.com/en-US/consoles/xbox-series-s'
    }),
    row({
      id: 'xbox-series-s-1tb',
      name: 'Xbox Series S 1TB',
      nameEn: 'Xbox Series S 1TB',
      generation: 'Xbox Series S',
      year: null,
      status: 'current_global',
      tagline: '全数字，1TB。碳黑和机器人白两色，处理器与 512GB 相同。',
      prev: 'xbox-series-s-512',
      url: 'https://www.xbox.com/en-US/consoles/xbox-series-s'
    }, {
      salesRegion: '美国 xbox.com 规格页把碳黑 1TB 和机器人白 1TB 写成两台全数字 Series S。美国微软商店也能看到 1TB。国行商城的 Series S 页面没有单独写出 1TB。上市月份规格页没有写。',
      colors: [
        { name: '碳黑 Carbon Black', hex: '#2a2a2a' },
        { name: '机器人白 Robot White', hex: '#f2f2f2' }
      ],
      cpuModel: seriesCpu,
      cpuArch: 'Custom Zen 2',
      cpuCores: '8 核 3.8 GHz（SMT 时 3.6 GHz）',
      gpuModel: '4 TFLOPS，20 个计算单元，1.565 GHz，Custom RDNA 2',
      ramSpec: '10GB GDDR6，128 bit。8GB 带宽 224 GB/s，2GB 带宽 56 GB/s。',
      storageOptions: '1TB Custom NVMe SSD。碳黑和机器人白都是这一档。全数字，规格表没有光驱。',
      expandableStorage: '可加 1TB Xbox Series X|S 存储扩展卡（另购）；也支持 USB 3.1 外接硬盘（另购）。读写：' + seriesIo,
      resolution: '1440p',
      refreshRate: '最高 120 FPS',
      videoFeatures: seriesVideoExtras,
      audioTech: seriesAudio,
      usbPorts: seriesPorts,
      wireless: seriesRadio,
      dimensionsMm: '6.5 × 15.1 × 27.5 cm',
      weightGrams: '4.25 磅',
      officialDocUrl: 'https://www.xbox.com/en-US/consoles/xbox-series-s'
    }),
    row({
      id: 'xbox-series-x',
      name: 'Xbox Series X 1TB（带光驱）',
      nameEn: 'Xbox Series X 1TB',
      generation: 'Xbox Series X',
      year: null,
      status: 'current_global',
      flagship: true,
      tagline: '真 4K，12 TFLOPS，1TB 固态硬盘，4K UHD 蓝光。',
      prev: 'xbox-one-x',
      url: 'https://www.xbox.com/en-US/consoles/xbox-series-x'
    }, {
      salesRegion: '美国 xbox.com 规格页的碳黑 1TB。美国微软商店把 Xbox Series X 标成 799.99 美元（2026-09-29 页面显示缺货）。国行微软商城也在售一台 Xbox Series X：1TB 定制版 SSD、12 teraflops、磨砂黑手柄，标价 ¥4,299 起。国行页面没有写有没有光驱，所以不把这个人民币价钱记进价格栏，也不标成国行在售。',
      colors: [{ name: '碳黑 Carbon Black', hex: '#1c1c1c' }],
      cpuModel: seriesCpu,
      cpuArch: 'Custom Zen 2',
      cpuCores: '8 核 3.8 GHz（SMT 时 3.6 GHz）',
      gpuModel: '12 TFLOPS，52 个计算单元，1.825 GHz，Custom RDNA 2',
      ramSpec: '16GB GDDR6，320 bit。10GB 带宽 560 GB/s，6GB 带宽 336 GB/s。',
      storageOptions: '1TB Custom NVMe SSD。光驱：4K UHD Blu-ray。读写：' + seriesIo,
      ssdRemovable: ND,
      expandableStorage: seriesExpand,
      resolution: '真 4K；HDR 最高 8K',
      refreshRate: '最高 120 FPS',
      videoFeatures: seriesVideoExtras + '。光驱为 4K UHD Blu-ray。',
      audioTech: seriesAudio,
      usbPorts: seriesPorts,
      wireless: seriesRadio,
      dimensionsMm: '15.1 × 15.1 × 30.1 cm。官网尺寸图写的是带光驱的 Series X（高 301 mm，深和宽各 151 mm）。',
      weightGrams: '9.8 磅。这是带光驱那一栏的重量。',
      warranty: '国行商城这台 Series X：自发票起主机 2 年有限硬件保修，随附手柄 1 年。美国规格页没有写保修年限。',
      officialDocUrl: 'https://www.xbox.com/en-US/consoles/xbox-series-x'
    }),
    row({
      id: 'xbox-series-x-digital',
      name: 'Xbox Series X 1TB 数字版',
      nameEn: 'Xbox Series X 1TB Digital Edition',
      generation: 'Xbox Series X 数字版',
      year: null,
      status: 'current_global',
      tagline: '白色数字版，1TB，没有写光驱。重量比带光驱的轻。',
      prev: 'xbox-series-x',
      url: 'https://www.xbox.com/en-US/consoles/xbox-series-x'
    }, {
      salesRegion: '美国 xbox.com 规格页，以及美国微软商店的 Xbox Series X – 1TB Digital Edition (White)，标价 749.99 美元（2026-09-29 页面显示缺货）。国行商城的 Series X 页面没有单独写出白色数字版。上市月份规格页没有写。',
      colors: [{ name: '白色 White', hex: '#f7f7f7' }],
      cpuModel: seriesCpu,
      cpuArch: 'Custom Zen 2',
      cpuCores: '8 核 3.8 GHz（SMT 时 3.6 GHz）',
      gpuModel: '12 TFLOPS，52 个计算单元，1.825 GHz，Custom RDNA 2',
      ramSpec: '16GB GDDR6，320 bit。10GB 带宽 560 GB/s，6GB 带宽 336 GB/s。',
      storageOptions: '1TB Custom NVMe SSD。官方规格表的光驱一行只写了碳黑 1TB 和银河黑 2TB，没有写这一款。',
      expandableStorage: seriesExpand + '。读写：' + seriesIo,
      resolution: '真 4K；HDR 最高 8K',
      refreshRate: '最高 120 FPS',
      videoFeatures: seriesVideoExtras,
      audioTech: seriesAudio,
      usbPorts: seriesPorts,
      wireless: seriesRadio,
      dimensionsMm: '15.1 × 15.1 × 30.1 cm（规格页 Digital 一栏）',
      weightGrams: '7.9 磅（规格页 Digital 一栏）',
      officialDocUrl: 'https://www.xbox.com/en-US/consoles/xbox-series-x'
    }),
    row({
      id: 'xbox-series-x-2tb',
      name: 'Xbox Series X 2TB 银河黑',
      nameEn: 'Xbox Series X 2TB Galaxy Black',
      generation: 'Xbox Series X 2TB',
      year: null,
      status: 'discontinued',
      tagline: '2TB，银河黑，带 4K UHD 蓝光。',
      prev: 'xbox-series-x',
      url: 'https://www.xbox.com/en-US/consoles/xbox-series-x'
    }, {
      salesRegion: '美国 xbox.com 规格表仍列出银河黑 2TB。2026 年 9 月 29 日美国微软商店新品区没有看到这台新机，只看到官翻。不标成国行在售。上市月份规格页没有写。',
      colors: [{ name: '银河黑 Galaxy Black', hex: '#161616' }],
      cpuModel: seriesCpu,
      cpuArch: 'Custom Zen 2',
      cpuCores: '8 核 3.8 GHz（SMT 时 3.6 GHz）',
      gpuModel: '12 TFLOPS，52 个计算单元，1.825 GHz，Custom RDNA 2',
      ramSpec: '16GB GDDR6，320 bit。10GB 带宽 560 GB/s，6GB 带宽 336 GB/s。',
      storageOptions: '2TB Custom NVMe SSD。光驱：4K UHD Blu-ray。读写：' + seriesIo,
      expandableStorage: seriesExpand,
      resolution: '真 4K；HDR 最高 8K',
      refreshRate: '最高 120 FPS',
      videoFeatures: seriesVideoExtras + '。光驱为 4K UHD Blu-ray。',
      audioTech: seriesAudio,
      usbPorts: seriesPorts,
      wireless: seriesRadio,
      dimensionsMm: ND,
      weightGrams: ND,
      officialDocUrl: 'https://www.xbox.com/en-US/consoles/xbox-series-x'
    }),
    row({
      id: 'xbox-series-x25',
      name: 'Xbox Series X25 限量版',
      nameEn: 'Xbox Series X25 Limited Edition',
      generation: 'Xbox Series X25',
      year: 2026,
      status: 'upcoming',
      tagline: '半透明 OG 绿，1TB，带 4K UHD 蓝光。编号主机。',
      prev: 'xbox-series-x',
      url: 'https://www.microsoft.com/en-us/d/xbox-series-x25-limited-edition/8wg5vqp0x4h3'
    }, {
      releaseDate: '美国微软商店：2026 年 11 月 13 日上午 5:00。澳洲微软商店写的是 2026 年 11 月 12 日。',
      salesRegion: '美国微软商店在售页面（发售日前显示缺货），标价 899.99 美元起。澳洲微软商店另有页面。不是国行在售。',
      colors: [{ name: '半透明 OG 绿 translucent OG Green', hex: '#3d7a45' }],
      cpuModel: seriesCpu,
      cpuArch: 'Custom Zen 2。SOC 裸片 360.45 mm。制程 7nm Enhanced。',
      cpuCores: '8 核 3.8 GHz（SMT 时 3.6 GHz）',
      gpuModel: '12 TFLOPS，52 个计算单元，1.825 GHz，Custom RDNA 2',
      ramSpec: '16GB GDDR6，320 bit。10GB 带宽 560 GB/s，6GB 带宽 336 GB/s。',
      storageOptions: '1TB Custom NVMe SSD。光驱：4K UHD Blu-ray。附带半透明 OG 绿 X25 手柄、编号主机，以及 Halo: Campaign Evolved。读写：' + seriesIo,
      expandableStorage: '可加 1TB Xbox Series X|S 存储扩展卡（另购，与内置速度一致）；也支持 USB 3.1 外接硬盘（另购）。',
      resolution: '真 4K；HDR 最高 8K',
      refreshRate: '最高 120 FPS',
      videoFeatures: seriesVideoExtras + '。光驱为 4K UHD Blu-ray。',
      audioTech: seriesAudio,
      usbPorts: seriesPorts,
      wireless: seriesRadio,
      dimensionsMm: '15.1 × 15.1 × 30.1 cm（5.94 × 5.94 × 11.85 英寸）',
      weightGrams: '9.8 磅（4.4 kg）',
      officialDocUrl: 'https://www.microsoft.com/en-us/d/xbox-series-x25-limited-edition/8wg5vqp0x4h3'
    })
  ];
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = XBOX_LINEUP;
}
