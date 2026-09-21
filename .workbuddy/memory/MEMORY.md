# Surface 参数中心 · 项目长期记忆

## 项目定位
纯静态单页应用（SPA），无构建步骤、无 npm 依赖。`index.html` 是唯一交付入口，须保持 100% 自包含（离线可用）。

## 云服务接入（已上线）
- 应用 appId：`wbapp_5G7lpzS2MtDdTV2YQYxUj6`（**发布时必须复用此 id**，否则会丢掉已保留域名与云端登录 Origin）
- endpoint：`https://surface-specs-hub.app.workbuddy.host`
- 线上地址：`https://surface-specs-hub.app.workbuddy.host/`
- SDK 形态：CDN `<script>` 全局 `WorkBuddyCloud`（项目无构建步骤，不使用 import / npm 包）

## 硬性约定（踩坑后固化，务必遵守）
1. **云 SDK 必须自托管**：放在 `js/vendor/workbuddy-cloud-sdk.global.js`，`index.html` 优先加载本地副本，CDN 仅作兜底。不要只依赖 `cdn.jsdelivr.net` —— 浏览器实测会被 reset（Node 侧却 200，极易误判）。
2. **加载顺序**：`surface-data.js` → `comparison-engine.js` → `tools-engine.js` → SDK → `cloud-config.js` → `cloud-client.js` → `cloud-ui.js` → `app.js`。
3. **数据应用方式**：`SURFACE_DATA` 是 `const` 对象，无法整体重新赋值 → 由 `cloud-client.js` 原地覆盖 7 个数据键（`categories / consumerCategories / commercialCategories / specGroups / devices / chips / accessories`）。
4. **启动时序**：`App.init()` 必须等 `SurfaceCloud.ready` 完成后再执行，否则首屏会先渲染本地数据。
5. **离线兜底**：云端任何环节失败都静默回退到本地基线，回退原因写在 `SurfaceCloud.fallbackReason`（**不是** `lastError`）。
6. **前端绝不发送 `owner_id`**：由表默认值 `auth.uid()` + RLS 决定归属。
7. **RLS 双闸门**：表 GRANT 与行策略相互独立，授权必须同时给 `authenticated` 和 `anon`，否则报 `42501`。
8. **存储访问**：无公开桶/公开 URL，仅登录成员；路径 `shared/<uid>/...`，访问用短期签名 URL。
9. **登录能力仅限正式发布域**：localhost / 预览域不支持登录流程。

## 数据表
| 表 | 读取权限 | 说明 |
|---|---|---|
| `surface_dataset` | 公开只读（anon + authenticated） | 数据集分片，gzip+base64；当前版本 `2026.09.18`，5 分片，70 款机型 |
| `surface_assets` | 仅登录成员，owner 作用域 | 素材索引行；文件在云端存储 |

## 本地验证方法（推荐）
不使用 `agent-browser` CLI（本机执行会异常中断）。改用 Node 直接驱动 `playwright-core`：
- 依赖：`C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core`
- 浏览器：`C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe`
- 启动参数：`--no-sandbox,--disable-gpu`
- 关键断言：`SurfaceCloud.dataSource === 'cloud'`、`datasetVersion`、`chunkCount`、`cloudDeviceCount`
- 脚本模板见 `.scratch/`（`final-verify.js`、`diag.js`、`serve.js` 等）

## 环境注意
- 本机 Bash 环境不完整（缺 `ls/grep/head/tail/find/cat`），命令执行优先用 PowerShell 并把输出写文件再读；Node 脚本执行正常。
- **OneDrive 同步会静默回滚编辑**：Edit 报告成功 ≠ 改动留存（同步间隙用云端旧版覆盖本地，单次任务可达 1/3 编辑丢失）。对策：每处编辑后必须 grep/Read 验证真的写入，丢失即重补；同一文件多处编辑务必顺序执行、逐一验证，不要并行写同一文件。

## UI 设计系统要点（2026-09-18 统一后）
- 响应式断点体系：1200（隐藏副标签）→ 1024（收窄间距）→ 900（顶栏图标化 `.btn-label` 隐藏 + 账号名隐藏 + dock 压缩）→ 768（抽屉侧栏 + 全局降档 + 隐藏搜索框）。
- 顶栏按钮文字必须包 `<span class="btn-label">`；账号名用 `.cloud-account-name` —— 否则 900px 图标化失效。
- 按钮变体：`.fluent-btn` / `.primary` / `.success`（商城 CTA 语义绿，用 `--ms-success` 令牌，禁止内联 hex）/ `.active` / `.fluent-btn-sm`；卡片操作行统一 36px（`.device-card-mini` 作用域覆盖）。
- 指标卡唯一来源：hubweb-layout.css 的 `.screen-metrics-grid`（minmax 300px）+ `.metric-box`；tools.css 只用 `.screen-ctrl-panel` 作用域做 3 列布局覆盖，**禁止再重复定义组件样式**。
- 对比托盘：`dock-left min-width:0` + pill `max-width:220px` 截断是防崩关键；折叠按钮纯图标 ▲▼。
