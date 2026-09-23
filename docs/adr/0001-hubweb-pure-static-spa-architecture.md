# ADR-0001: 采用零依赖纯静态单页架构（SPA）与双轴粘性排版

## 状态
已采纳 (Accepted) - 2026-09-16

## 上下文
本项目为面向抖音直播团队培训、销售顾问与技术人员的“微软 Surface 全系产品参数中心”。
业务目标是纯粹复刻 HubWeb.cn 的高信息密度参数查阅体验，并具备以下特性：
1. 双击 `index.html` 离线即可秒开运行，无需 Node.js、Python 或任何 Web 后端服务器支撑。
2. 即使在直播间断网或内网严苛环境下，所有数据、图表、比对算法与计算工具均能正常运行。
3. 参数对比表在纵向滚动时表头机型卡吸顶，在横向滑动时首列参数名吸左，确保多机比对时视野不迷航。

## 决策
1. **纯原生前端单页架构**：采用纯原生 HTML5 + CSS3 (CSS Variables & Flex/Grid) + 模块化 Vanilla ES6 JavaScript，零构建步骤（No Webpack/Vite），零 npm 运行时依赖。
2. **纯客户端 Hash 路由**：通过 `window.location.hash`（如 `#/compare?products=pro-12-13,laptop-8-138`）实现深链接直达、书签收藏与多设备即时分享。
3. **双轴吸附表格体系**：
   - 首列参数标签：`position: sticky; left: 0; z-index: 10;`。
   - 表头机型信息卡：`position: sticky; top: 48px; z-index: 20;`。
   - 左上角表头交叉单元格：`position: sticky; left: 0; top: 48px; z-index: 30;`。
4. **纯客户端差异比对与折叠**：通过数据层对比判定异同，并利用 CSS 选择器（`.hide-same-rows tr:not(.row-diff)`）实现毫秒级折叠相同行。

## 后果
- **优势**：
  - 交付物极度纯粹稳定，分发成本为零。
  - 性能极致，首屏毫秒级就绪，无网络加载时延与 CORS 阻碍。
- **代价**：
  - 数据集全量打包在客户端内存（`surface-data.js`），但全历史 42 款机型及配件仅占用约 200KB 内存，远低于现代移动端与 PC 内存安全阈值。


## 修订（2026-09-22）

允许**可选云端叠层**（资产库/同步），但须满足：

1. `js/cloud-config.js` 默认 `enabled: false`，且不得写死生产 WorkBuddy endpoint/key 为默认开启态。
2. `enabled !== true` 时不加载依赖云端的网络请求；双击 `index.html`（含 `file://`）核心参数查阅/比对/工具必须可用。
3. 云端能力不得成为核心规格数据的唯一真源；真源仍为打包进仓库的 `js/surface-data.js`（及本仓静态资源）。

> **本修订已被部分取代**（2026-09-22）：上述"可选云端叠层"条款由
> [ADR-0005](0005-remove-optional-cloud-layer.md) 取代 —— 该叠层已因业务上不需要而被彻底移除。
> 本 ADR 其余关于纯静态、零依赖架构的决策继续有效。
