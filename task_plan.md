# Task Plan: Surface 与 Xbox 参数中心深度交接与事实治理总路线图

## Goal
全面接手并深化维护 `Jaykaijack/surface-specs-hub` 参数中心。以交接资料包（截至 2026-10-12 CST）为基础，将 4553 条来源绑定、高精度数据模型与官方原图资产安全合流。严格恪守“假说—验证闭环”，攻坚原 14 项图片缺口与 137 项未闭合事实缺口，实现“数据真实、溯源清晰、视觉合规、代码健壮”的标杆级参数中心。

### Next Step
交接工作全部完成并成功交付！已输出不可变单文件快照 `releases/surface-specs-hub-standalone-v2.4.0-20261012-handover-reconciliation.html` 与根目录稳定指针 `surface-specs-hub-standalone.html`。

## Current Phase
Phase 5: 全平台回归、离线单文件封装与交付 (已圆满完成 ✅)

## Phases

### Phase 1: 基线对齐与工作区稳固 (Baseline Alignment & Git Reconciliation)
- [x] 1.1 整理本地未提交构建产物，建立安全备份分支 `backup/local-00574ea`
- [x] 1.2 本地主干快进合流至 `origin/main`（基线 `b90efdf`），合并 20 次架构演进
- [x] 1.3 建立 `.scratch/handover-reconciliation/` 任务票据与对齐底账
- [x] 1.4 运行本地测试套件，确立初始测试基线指标
- **Status:** completed

### Phase 2: 数据集与 4553 条来源绑定安全合流 (Data & Source Binding Integration)
- [x] 2.1 将 `01 当前修正版数据与来源/docs/sources/`（`verified-fields.json` 3.3MB 与 `image-mappings.json`）引入工程体系
- [x] 2.2 归档 `Surface数据.json`（4.9MB）、`Xbox主机数据.json`、`Xbox手柄数据.json`、`Xbox配件数据.json` 与 `来源绑定索引.csv`
- [x] 2.3 引入测试预期与辅助断言（`current-expectations.json` 3.0MB、`current-dispositions.js`）
- [x] 2.4 编制《137 项未闭合残余问题追踪总账》（93 缺证据、35 访问受阻、6 官方矛盾、2 未展开）
- **Status:** completed

### Phase 3: 官方图源专项治理 (攻坚 14 项图片缺口与资产映射)
- [x] 3.1 梳理 Surface 笔记本类 6 项（Laptop 3 主图/亮铂金 2 项；Laptop 2 亮铂金 1 项；Laptop Go 2 冰晶蓝/砂岩金/亮铂金 3 项）
- [x] 3.2 梳理 Surface Pro 类 2 项（Pro 6 消费/商用亮铂金，区分 Silver 与 Platinum）
- [x] 3.3 梳理 Xbox 硬件与手柄类 6 项（Xbox 360 S 3 项；星空、极限竞速 5、战争机器 5 手柄 3 项）
- [x] 3.4 导入 109 款官方资产至 `assets/products/`，更新 `image-mappings.json`
- **Status:** completed

### Phase 4: 重点官方矛盾与关键机型深核 (Core Lineup & Conflict Resolution)
- [x] 4.1 Pro 13 英寸（第 12 代）核验：Intel 版 vs 骁龙版 CPU/NPU 算力（80 TOPS）、OLED 屏配置、消费版 vs 商用版彻底隔离
- [x] 4.2 Laptop（第 8 代）与 Laptop 7 续航与快充口径：核验 20~22 小时视频续航测试条件与 65W 最低快充门槛
- [x] 4.3 消费版 Pro 电池 Wh 与标称时长：保留双方官方数据并标明测试 SKU、亮度与测试方法，绝不编造办公续航保证
- [x] 4.4 SLS 1 Secured-core 规范与初代 Xbox 日本上市日期差异：保留双信源原文与时间戳
- [x] 4.5 锁定最新四大主力：Pro 13（第 12 代）、Pro 12（第 1 代）、Laptop（第 8 代）、Surface Laptop Ultra
- **Status:** completed

### Phase 5: 全平台回归、离线单文件封装与交付 (Full Regression & Artifact Build)
- [x] 5.1 运行全量自动化测试（`test-runner.js` 4987 项全部通过，field-audit 1131 项全部通过，evidence-delivery 通过，standalone-release 通过，review-regression 全部通过）
- [x] 5.2 运行 T-7 预发布五项硬阻断拦截（内部备注 0 命中、术语 100% 对齐、极限词 0 命中、alt 100% 对齐、体积预算达标）全部五项全绿
- [x] 5.3 桌面端与 320px 移动端视觉核验（搜索连续输入、对比表双轴粘性滚动、条件抽屉完整性）
- [x] 5.4 编译全新不可变发布快照与单文件封装 `releases/surface-specs-hub-standalone-v2.4.0-20261012-handover-reconciliation.html` (23 MB) 与 `surface-specs-hub-standalone.html` (23 MB)
- [x] 5.5 更新 `CHANGELOG.md`，编制最终交接闭环报告
- **Status:** completed
