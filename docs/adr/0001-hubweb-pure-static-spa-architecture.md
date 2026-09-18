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
