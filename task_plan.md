# Task Plan: surface.kaibase.cn 网站优化改进 PRD 执行路线图

## Goal
全面贯彻执行《surface.kaibase.cn 网站优化改进 PRD · v1.0》，严格遵守“阶段门没过不开下一扇”与“假说-验证闭环”铁律，先止血（阶段 0 清零 P0 与合规风险），再达标（阶段 1 清零 P1 体验缺陷），进阶强化（阶段 2 吃掉 P2 与技术 SEO/无障碍），最终实现 Awwwards/Webby 级品质重塑（阶段 3）与可持续运营（阶段 4）。

### Next Step
进入阶段 3 · 重塑实施（D-1 完整设计语言与 Token、D-2 首页 10 秒找机型叙事重塑、D-4 全态反馈系统、D-6 移动端深度重排、招牌原创体验 Surface 家族演进时间轴），冲击 G3 验收门。

## Current Phase
Phase 5: 阶段 4 · 运营发布与防返贫机制 (T-7 预发布流水线与长期复检)

## Phases

### Phase 0: 止血筹备与决策拍板 (G0 筹备)
- [x] 解析 PRD 全文与 13 项缺陷/2项事实/7大开放问题
- [x] 建立持久化规划文件 (`task_plan.md`, `findings.md`, `progress.md`)
- [x] 梳理代码库现有实现与 PRD 审计发现的精确映射
- [x] 针对 OQ-1（Xbox 定位）、OQ-2（去官化新站名）、OQ-3（RTX Spark 处置）给出专业推荐方案并请老大拍板
- **Status:** complete

### Phase 1: 阶段 0 · 止血实施 (清零 P0 级风险与打脸承诺)
- [x] **P0-1 (C-1)**: 下线前台所有内部编辑备注与状态标注（如“官方写了上市月份…”、“图片待核验”），建立隔离机制
- [x] **P0-2 (T-3 / C-6)**: 修复全站图片 alt 文本系统性错位（13.8寸、第1代商用、Intel/骁龙混淆、系列卡相反、Hub 3图），实现 alt 100% 对齐
- [x] **P0-3 (D-5)**: 全站标题与站名去除 “Microsoft” 前缀，改用选定新站名，显化常驻非官方声明
- [x] **P0-4 (C-4)**: 修复“共 19 款”计数歧义，规范为组合式计数（在售 19 款 · 即将发售 4 款）
- [x] **F-1 / F-2 事实核验 (C-3)**: 下架存疑的“NVIDIA RTX Spark”，排查修复乱码截断字符
- [x] **验收门 G0 验证**: 运行专用门禁测试，确保内部备注 0 命中、alt-标题一致性 100%、标题合规、F-1/F-2 闭环（5271 PASS）
- [x] **产出不可变发布快照**: `releases/surface-specs-hub-standalone-v1.8.0-20261001-p0-stop-bleeding.html` 并更新 `CHANGELOG.md`
- **Status:** complete

### Phase 2: 阶段 1 · 达标实施 (清零 P1 体验缺陷与建基线)
- [x] **P1-1 (T-1)**: 全量推行响应式 WebP / 矢量图，执行单图体积预算（Hero≤120KB，卡片≤40KB），配置 fetchpriority 与尺寸防抖占位
- [x] **P1-2 (C-2)**: 贯彻术语表规范（附录 B），统一芯片名称（骁龙® X2）、®/™ 首次规则、算力统一为“X TOPS”
- [x] **P1-3 (C-3)**: 落实事实核验与核验日期动态展示机制，页脚“最后核验日期”与实际发布同步
- [x] **P1-4 (T-6)**: 落实可靠性保障：缓存策略优化、断网离线提示浮窗 (`#offline-toast`)
- [x] **P1-5 (C-4)**: 全局清理“今天/最近/最新”等相对时间表述，一律改为绝对日期；极限词全面清零
- [x] **验收门 G1 验证**: 编写专用门禁测试 `tests/g1-standards-baseline.test.js`，5436 项测试 100% PASS
- [x] **产出不可变发布快照**: `releases/surface-specs-hub-standalone-v1.9.0-20261001-p1-standards-baseline.html` 并更新 `CHANGELOG.md`
- **Status:** complete

### Phase 3: 阶段 2 · 强化实施 (吃掉 P2、结构化数据与无障碍)
- [x] **P2-1 (C-5)**: 落实 Xbox 板块定位决策（显性收录说明 + 层级降级或折叠）
- [x] **P2-2 (D-3)**: 对比卡从“只有标题”升级为“3行决策摘要（续航/算力/重量）”，提供差异高亮
- [x] **P2-3 (T-5)**: 上线 schema.org/Product 与 BreadcrumbList 结构化数据
- [x] **P2-4 (C-4)**: 全站极限词（巅峰/极致/旗舰/最）在中性实测表述基础上做全量稳固
- [x] **T-2 / T-4**: 源码层技术 SEO 审计与真 `<table>` 语义化标签强化
- [x] **T-3**: WCAG 2.2 AA 无障碍深度自查（对比度、键盘焦点、ARIA 标签、减弱动画）
- [x] **验收门 G2 验证**: 编写专用门禁测试 `tests/g2-strengthening.test.js`，5504 项测试 100% PASS
- [x] **产出不可变发布快照**: `releases/surface-specs-hub-standalone-v2.0.0-20261001-p2-strengthening.html` 并更新 `CHANGELOG.md`
- **Status:** complete

### Phase 4: 阶段 3 · 重塑实施 (Awwwards 级设计与招牌体验)
- [x] **D-1**: 输出完整设计语言文档（`docs/design-system.md`：Tokens、8px 栅格、排版音阶、无障碍）
- [x] **D-2**: 首页 10 秒找机型叙事结构重塑（Hero 叙事横幅与 4 大典型场景分流网格）
- [x] **D-4**: 全态反馈系统（骨架屏 `.skeleton-box`、空状态 `.hub-empty-state` 双旗舰一键对比与清空引导）
- [x] **D-6**: 移动端专属重排（`.mobile-scroll-hint` 768px 横滑友好导引与自适应）
- [x] **招牌体验 (维度三)**: 原创信息组织（2013~2026 家族技术演进时间轴，5 大技术代际分水岭横幅）
- [x] **验收门 G3 验证**: 编写专用门禁测试 `tests/g3-redesign.test.js`，5567 项测试 100% PASS
- [x] **产出不可变发布快照**: `releases/surface-specs-hub-standalone-v2.1.0-20261001-p3-redesign.html` 并更新 `CHANGELOG.md`
- **Status:** complete

### Phase 5: 阶段 4 · 运营发布与防返贫机制
- [x] 固化 T-7 预发布流水线五项拦截检查（内部备注、术语、极限词、alt、体积）
- [x] 编写专用门禁运行脚本 `scripts/preflight_check.js` 并接入 CI/CD
- [x] 产出完整长期维护与防返贫 SOP 指南 (`docs/maintenance-and-anti-regression.md`)
- [x] 编写 G4 验收门自动化测试套件 (`tests/g4-anti-regression.test.js`) 并达标 5591 PASS
- [x] 产出阶段 4 最终不可变发布快照 (`v2.2.0`) 并更新根目录稳定指针
- [x] 登记标准 CHANGELOG.md 审计日志
- [x] 全量工程验证与最终交付汇报
- **Status:** complete

## Key Questions
1. **OQ-1 (Xbox定位)**: 保留并显化收录说明（推荐），还是暂时下线？
2. **OQ-2 (去官化站名)**: 使用「Surface 参数中心 · 民间资料库」（推荐），还是「Surface 参数资料库（民间）」？
3. **OQ-3 (F-1 RTX Spark)**: 无法找到微软官方一手发布依据，是否整行下架剔除（推荐），或标注为“网络传闻”？
4. **OQ-7 (对比卡决策摘要维度)**: 默认三行维度是否敲定为「续航时间 / 芯片与 NPU 算力 / 整机重量与尺寸」？

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| 严格按照 PRD 阶段门推进，不跨阶段施工 | PRD 明确规定“验收门没过不开下一扇”、“P0 止血门没过不做美化”。可信度是参数站的生命线 |
| 本地源码作为单一真实信源 (SSOT) | 当前工程已包含完整的 index.html、js/、css/ 与 Python 单文件构建脚本，无需外部提取源码即可完成全面重构 |
| 阶段 0 优先下线前台批注并修复 alt 系统性错位 | 直达用户的错误信息和无障碍打脸属于最高优先级红线 |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| .git/index.lock 遗留导致 git 操作报锁错误 | 1 | 确认进程无活跃写入后安全清除陈旧的 0 字节 index.lock 并恢复 index 干净状态 |

## Notes
- 每次构建发布必须严格遵守工程铁律：生成 `releases/` 不可变快照、同步更新根目录稳定入口、更新 `CHANGELOG.md` 并明示版本号。
- 遵循零幻觉原则：绝不编造未披露数据，所有参数需具备可追溯性。
