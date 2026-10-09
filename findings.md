# Findings & Decisions: surface.kaibase.cn 优化改进

## Requirements
来源于《surface.kaibase.cn 网站优化改进 PRD · v1.0》：
- **P0 级问题 (4项，必须在阶段 0 清零)**:
  - **P0-1 (C-1)**: 内部编辑批注泄露在前台（如 `js/app.js` 中的“官方写了上市月份，现在还不能标成国行在售。共 5 款。”以及图片“图片待核验”）。
  - **P0-2 (T-3/C-6)**: 图片 alt 文本系统性错位（13.8 英寸 vs 15 英寸、第1代商用写成第7代商用骁龙版、标题 Intel 但 alt 写骁龙、系列卡消费/商用反转、Hub 3 错用 Hub 2S 图），违背 WCAG 2.2 AA 承诺。
  - **P0-3 (D-5)**: `<title>` 与全站标题以 "Microsoft" 开头，存在官方冒充与商标侵权风险，需彻底去官化。
  - **P0-4 (C-4)**: “共 19 款”计数歧义（实际上还有即将发售 5 款），需改为“在售 19 款 · 即将发售 5 款”的组合式计数规范。
- **P1 级问题 (5项，阶段 1 清零)**:
  - **P1-1 (T-1)**: 图片体积过大，存在单张超 1MB PNG 直出，需全量 WebP 响应式并实行体积预算（Hero≤120KB, 卡片≤40KB）。
  - **P1-2 (C-2)**: 术语不统一，高通芯片与 AI 算力单位混用，需以附录 B 为规范建立术语字典。
  - **P1-3 (C-3)**: 页脚核验日期（2026-09-16）停滞过期，与 9月23日新品收录事实冲突，需动态同步。
  - **P1-4 (T-6)**: 缺乏监控与可靠性缓存策略，曾发生空白故障，需提供优雅降级页面与缓存防护。
  - **P1-5 (C-4)**: 禁用“今天新上/最新”等相对时间，一律改为绝对发布时间（如“9 月新发布”）。
- **P2 级问题 (4项，阶段 2 清零)**:
  - **P2-1 (C-5)**: Xbox 板块定位尴尬（47款手柄/14款主机），需增加显性收录说明并降级/弱化。
  - **P2-2 (D-3)**: 对比卡只有标题没有决策价值，需补充 3 行关键决策摘要（续航/算力/重量）。
  - **P2-3 (T-5)**: 缺失 schema.org/Product 与 BreadcrumbList 结构化数据，未获得搜索引擎富摘要。
  - **P2-4 (C-4)**: 极限词（巅峰/极致/旗舰/最）高频出现，违背“严禁虚假宣传”承诺，需中性化替换。
- **待核验事实 (2项)**:
  - **F-1**: “Surface Laptop Ultra” 条目所写“NVIDIA RTX Spark 芯片”无官方来源依据。
  - **F-2**: 第 8 代消费版 Laptop 出现“极致触”字符截断/乱码。

## Research & Codebase Findings

### 1. 源码架构与关键文件对应关系
- **前端页面与样式**:
  - `index.html`: 单页面根入口文件。
  - `css/fluent-tokens.css`: Fluent 2 设计 Token（色彩、圆角、阴影、层级）。
  - `css/specs-layout.css`: Fluent 2 高信息密度三段式布局体系。
  - `css/spec-table.css`: 双轴冻结参数对比表样式。
  - `css/tools.css`: 工具面板（选购助手、充电计算器等）样式。
- **核心数据与渲染逻辑**:
  - `js/surface-data.js`: 全量 Surface 8 大产品线规格原始数据（SSOT）。
  - `js/xbox-lineup.js`: Xbox 专区数据与手柄/主机收录库。
  - `js/catalog.js`: 规格出口（Seam）、机型图身份判定、卡片与列表渲染。
  - `js/app.js`: 页面交互初始化、DOM 事件绑定、视图切换与计数展示。
  - `js/comparison-engine.js`: 多机型对比引擎。
  - `js/tools-engine.js`: 购机决策辅助工具。
- **构建与交付**:
  - `scripts/build_standalone.py`: Python 构建脚本，将所有 css、js、图片 Base64 编译为单一离线 HTML 文件。
  - `surface-specs-hub-standalone.html` / `dist/surface-specs-hub-standalone.html`: 根目录与 dist 目录的自包含离线交付物。
  - `releases/`: 历史版本不可变发布库。
  - `tests/test-runner.js`: 包含 5058 项自动化校验断言。

### 2. 缺陷定位排查事实
- **关于 P0-1 批注**:
  - `js/app.js` 第 434 行：`<p style="margin:-8px 0 16px; font-size:13px; color:var(--ms-text-secondary);">官方写了上市月份，现在还不能标成国行在售。共 ${upcomingDevices.length} 款。</p>`。此行直接在前台渲染内部工作批注。
  - `js/catalog.js` 第 557 行：`if (shot.identity === 'pending') return '图片待核验';`，前台卡片角标露出了内部工单状态。
- **关于 P0-2 alt 错位**:
  - 检查发现卡片主图渲染与系列卡图在生成 `<img>` 标签的 `alt` 属性时，部分写死了固定字符串或引用了错误的字段，没有经过 `portrait(device)` 的校验对齐。
- **关于 P0-3 站名**:
  - `index.html` 第 6 行：`<title>Microsoft Surface 产品参数中心 | 全系列技术规格与深度对比</title>`，直接以 "Microsoft" 领衔。
- **关于 P0-4 计数**:
  - 在售区统计文案为裸“共 X 款”，容易让用户误以为是全站收录总量。
- **关于 F-1 RTX Spark**:
  - `js/surface-data.js` 中存在未确认的非官方爆料条目或非公开命名。官方微软发布历史中并无 "RTX Spark" 芯片命名。
- **关于 F-2 截断乱码**:
  - 源码中存在由于 UTF-8 特殊符号或文件编码转存引入的截断字符。

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| 严格执行 G0 阶段验收门，禁止提前进入美化阶段 | PRD 与用户规则双重铁律：必须首先解决信息可信与合规问题 |
| 建立前台关键词与字段隔离扫描机制 (C-1) | 模板只渲染 `content`，`editor_note` 与 `pending` 状态绝不进入前台可见 DOM |
| alt 规则统一：`[产品名] [关键区分规格] [视角/配色]` | 满足 WCAG 2.2 AA 可访问性，并实现编译期与自动化测试断言拦截 |
| 数据治理采用纯事实来源 | 凡无微软官方/发布会来源的参数一律下架或严正标注，落实“零幻觉”政策 |

## Visual/Browser Findings
- 页面排版采用 Fluent 2 风格，包含明暗模式切换。
- 对比表具备横向横滑和冻结首列特性，但移动端卡片信息需要更紧凑的垂直字段栈呈现。
- 页脚声明需更加显眼突出“民间非官方资料库”以彻底去官化并规避商标风险。
