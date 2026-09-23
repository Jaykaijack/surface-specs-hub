# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.4.1] - 2026-09-23 - SSD System Installation & Migration Master (固态换装与系统迁移终极实操)

### Added
- **Surface 官方可拆卸 SSD (rSSD) 系统安装迁移终极实操模块升级 (`#/tools/storage`)**:
  - **三轨制系统部署方案选项卡切换**:
    1. **🟢 方案 A：全盘 1:1 无损热克隆（最省心 · 保留全软件/微信/配置换上即用）**:
       - 深度解构并防范 **BitLocker 48位数字恢复密钥锁死陷阱**（提供详细关解密与微软账号密钥备份指引）。
       - 完整提供 DiskGenius / 傲梅轻松备份迁移步骤，严谨规范 **C 盘等比自动扩容拉满操作**，根治换完 1TB 后多出 750G 变成死空间的痛点。
       - 手把手指引拆换小仓门、T3/T4 螺丝刀操作、30° 斜插金手指，以及旧盘装盒废物利用秒变 1000MB/s 高速 U 盘教程。
    2. **🔵 方案 B：微软官方专用 Recovery 镜像出厂恢复（最纯净 · 专机专用出厂驱动与色彩校准）**:
       - 明确 Surface UEFI 固件 **FAT32 唯一识别铁律**及大于 32GB U 盘强格式化技巧。
       - 凭机身支架 12 位纯数字 SN 序列号精准下载原厂出厂镜像，杜绝解压目录“套娃”。
       - 揭秘 Surface 官方标准硬件手势：**长按【音量减键 -】+ 轻按【电源键】至白圆点旋转**引导进 WinRE。
       - 详细说明从驱动器恢复流程，实现出厂级自动分区、系统写入与正版自动激活。
    3. **🟣 方案 C：微软通用 Win11 安装介质（应急备选 · 绕过开箱卡网）**:
       - 独家披露开箱阶段无 Wi-Fi 驱动卡死在“让我们为您连接到网络”界面的神级破解术：`Shift + F10` 执行 `OOBE\BYPASSNRO` 激活「我没有 Internet 连接」跳过联网创建本地账户。
       - 配合官方 MSI 固件驱动包一键双击补齐全部触控、笔与外设。
  - **换盘现场四大典型高频翻车事故与急救指南 (FAQ)**:
    - 事故 1：开机出现红色锁头 / Red Surface Logo（UEFI 安全启动密钥重建）。
    - 事故 2：开机直接进 BIOS 找不到固态（M.2 金手指 30° 斜向插紧防虚接）。
    - 事故 3：1TB 换好只显示 256GB（傲梅/DiskGenius 无损合并未分配空间）。
    - 事故 4：克隆后开机提示输入 BitLocker 恢复密钥（微软账号 recoverykey 网址查验）。
- **不可变版本快照**: 输出 `releases/surface-specs-hub-standalone-v1.4.1-20260923-ssd-migration-master.html` (13.71 MB)。
- **自动化测试断言扩充**: `tests/test-runner.js` 新增对三种系统安装迁移方案关键指令、规约与流程的自动化测试。

---

## [v1.4.0] - 2026-09-23 - Smart Tools Suite (特色辅助选机工具矩阵)

### Added
- **四大硬核特色辅助分析工具全面上线 (`#/tools`)**:
  1. **🎯 场景化智能选型向导 (`#/tools/guide`)**:
     - 支持预算（入门便携/主流进阶/旗舰高端/专业顶配）、场景（移动差旅/商务办公/创意设计/高校学习/专业工程）、形态（二合一分离/传统翻盖/双屏）及芯片架构（全部/骁龙ARM/酷睿Intel）4 维即时联动筛选。
     - 自动推演并输出「🥇 场景最佳首选」与「🥈 高性价比/均衡备选」卡片，并附带针对该场景的深度选购理由与避坑警示。
  2. **🎒 差旅背包综合负重与外勤测算器 (`#/tools/weight`)**:
     - 解决“买电脑只看裸机净重”的痛点，支持勾选搭配专业键盘盖、手写笔、鼠标及电源适配器（第三方 65W GaN 轻量头 / 官方原装磁吸充 / 纯电池外勤）。
     - 动态计算整套外勤负重（精确到克与千克）并评定便携等级（S/A/B/C 级），同时根据机身标称电量推算真实办公离电可用工时。
  3. **⚖️ 跨代升级价值评估透视镜 (`#/tools/upgrade`)**:
     - 自由选择持有中的老机型与心仪的新机型进行跨代 PK。
     - 全方位剖析芯片算力代际提升、NPU 算力质变、120Hz 动态高刷、接口演进与官方外设兼容度，并给出权威置换建议评级。
  4. **🛠️ 可拆卸 SSD 升级与避坑省钱指南 (`#/tools/storage`)**:
     - 全面盘点 Surface Pro 7+~12 及 Laptop 3~8 的免拆机更换 rSSD 特性。
     - 为用户测算自行购买原厂规格 M.2 2230 固态硬盘与官方高配差价，指导用户轻松立省 ¥1,500 ~ ¥3,000。
     - 详细提供 M.2 2230 辨析、BitLocker 恢复密钥备份及微软官方一键恢复镜像制作与激活避坑指引。
- **左侧导航栏直达矩阵**: 在「特色辅助分析工具」分组下将 4 大新工具依序置顶，配备专属 Fluent 图标与醒目属性徽标（`推荐首选`、`外勤实测`、`新旧PK`、`省¥1500+`）。
- **自动化测试套件扩充**: `tests/test-runner.js` 新增 Test Suite 4b，全量断言四大工具渲染完整性、推荐匹配算法准确性与负重/续航数值计算。
- **不可变版本快照**: 交付 `releases/surface-specs-hub-standalone-v1.4.0-20260923-smart-tools-suite.html`。

### Changed
- **单文件离线发布**: 重新打包单文件 `surface-specs-hub-standalone.html`（13.68 MB），四大工具交互与 CSS 样式系统 100% 离线打包内嵌。
- **版本标牌更新**: 界面顶部导航栏版本号明示为 `HubWeb Replica · v1.4.0 (2026.09.23)`。

---

## [v1.3.0] - 2026-09-23 - Accessories Full & Header Fix

### Added
- **23 款官方全生态配件真实图源**: 完整补齐并落盘 `assets/accessories/` 全系 23 款硬件高清配图（键盘盖类、手写笔类、鼠标外设类、拓展坞与转换器类、音频会议外设类、创意交互类），100% 源自微软官方商城 CDN、官方新闻发布母盘与经权威核验的真实硬件原图。
- **配件多视图双向图文联动展示**:
  - `renderByAccessoryView`（按配件查设备）：新增左侧硬件高清图品类卡片。
  - `renderByDeviceView`（按设备查配件）：在各配件行新增微缩硬件缩略图，直观易认。
  - `renderFullCompatTable`（全景总表）：表头新增硬件微缩图标识。
- **自动化测试断言**: `tests/test-runner.js` 新增 Test Suite 4-8，针对全系 23 款配件的 `image` 字段声明、文件物理存在性与体积完整性进行自动化硬卡点断言。
- **发布快照机制**: 输出不可变版本发布快照 `releases/surface-specs-hub-standalone-v1.3.0-20260923-accessories-full.html`。

### Fixed
- **数据核验大表表头遮挡首行 Bug**:
  - **根因**: `css/spec-table.css` 中 `.spec-table thead th { top: 48px; }` 在局部带 `overflow: auto` 的容器内会下沉 48px，导致表头上方留白且直接向下遮挡压住首行机型。
  - **修复**: 在 `spec-table.css` 中增加 `.spec-table.audit-table thead th, .has-internal-scroll .spec-table thead th { top: 0 !important; }`，并修正 `app.js` 的表格类名与 `border-collapse: separate`，使表头牢牢吸附在容器顶端。

### Changed
- **单文件离线构建脚本全面升级**: `scripts/build_standalone.py` 扩充图片扫描与转码管线，自动扫描 `assets/accessories/` 并将 23 款配件图全部转为 WebP Base64 内嵌至离线单文件，确保完全离线使用时配件图文完整无损。
- **界面版本明示**: 界面顶部导航栏副标题明示构建版本号 `HubWeb Replica · v1.3.0 (2026.09.23)`。

---

## [v1.2.0] - 2026-09-22 - Image Clustering & Data Normalization

### Added
- 双机型/多色机型图源精细化拆分与官方商城原图映射。
- 自动化图源防混淆与防冒充断言测试套件 (`image-mapping-p0.test.js`)。

### Fixed
- 修正 Pro 9、Pro 7、Laptop 5、Laptop 8 的部分颜色冒充与跨代图源混淆问题。

---

## [v1.0.0] - 2026-09-16 - Initial Release

- 纯粹复刻 HubWeb.cn 三段式横向比对工作台。
- 100% 纯静态离线单文件 SPA 架构。
- 微软 Fluent 2 设计系统，涵盖 2012~2026 Surface 全品类编年史规格。
