# 2026-10-09 开发交付与审查记录

分支：`fix/review-20261009`。基于干净工作树 `b0d44735ad42a5865f10a23f55cd2283c307d2a5`；只读查询远程 HEAD 仍为该提交。未推送、合并、部署，也未运行生产部署脚本。没有进入或修改旁边的无关项目。

## 材料与现网边界

- 已读目标仓库 AGENTS.md、CONTEXT.md 和相关代理约定；仓库没有 `.agents/skills`，工作区 `.agents` 未发现可读技能文件。
- 按当前 Library 技能及 materialization.md 获取指定报告。首次返回其他环境路径，本环境不存在；按要求仅以明确本地目标重试一次，获取了传输信息，但官方 helper 下载失败。**未取得报告正文，未声称读完报告**。本次按委托中逐项列明的问题实施。
- 线上首页在当前环境返回 HTTP 403（普通与提权只读请求均如此），网页工具也无法读取线上 JS；无代理直连无法解析域名。无法复核 4/9 脚本差异、90 台数据和新增芯片。因此不向旧数据集猜测添加 Ultra ID，不覆盖消费者版。**此分支不能直接覆盖现网**，须先回收并合并线上差异。
- 2026-10-09 成功读取微软中国 Ultra 商用产品页，核对分辨率、电池、尺寸、重量、内存、SSD 分代、保修、发货日和 FP4 算力口径。`docs/evidence/ultra-business-cn-20261009.json` 留存限定适用范围的结构化结果。

## 本次实际改动

1. 重量：支持结构化 `value/unit`、中英文 g/kg，以及一致的双单位写法；不选取多配置文字中的第一个数字，不使用 895g 回退。未知零件使总重保持未知。无具体型号的键盘、充电器、笔和鼠标不再按通用重量计入；暂未补齐这些配件的逐配置事实。选型评分也取消 2500g 伪回退。
2. 续航与升级：取消 0.68 视频转办公实测；同机显示无升级差异，刷新率与 NPU 不作默认补全；手写震动来自两机实际字段。SSD 页面保留入口和备份/恢复密钥提醒，移除无损保证及通用解密、安全设置和绕过流程。原有要求这些危险文案存在的测试改为检查安全说明与禁止承诺。
3. 搜索与显示：搜索词进入 HTML 前转义；Pro 11 按型号 ID 识别，避免中文代际名称和 Windows 11 干扰；搜索结果支持键盘 Enter/空格。核验表使用设备实际比例和状态，初代/Pro 2 为 16:9，Xbox 为不适用。比较支持单值重量单位、比例、刷新率、电池单位标准化；复杂范围/不同配置说明保留，不粗暴消除。
4. 兼容性：缺失匹配不再等同不支持，统一为待核验。已有具体兼容条目的真伪与矛盾尚未逐条证实，不能宣称全部解决。
5. NPU：FP4、petaflop、平台/GPU 指标不进入专用 NPU 数值解析，RTX Spark/FP4 芯片不进 NPU 排序；支持明确 scope/precision/unit 的结构化值。既有 legacy TOPS 值仍需证据补齐，结构化校验不证明来源真实性。
6. 核验账：旧 64 设备账归档到 `docs/evidence/legacy-registry-20260922.json`。当前 88 设备、5905 个 specs 字段记录值、SHA-256、地区口径、配置范围、审核日期和状态。无值绑定旧证据一律 PENDING，当前 VERIFIED 为 0。设备 ID 是记录范围，**不是精确 SKU 认证**；Xbox 保留既有 salesRegion 描述，不强写成中国参数。状态脚本撤销旧设备级已核验标志。页脚明确数据版本日期不等于全库核验日期。
7. SEO 与工程：站点构建输出 88 个 `/products/<id>/` 静态正文页面、逐页标题/描述/canonical、robots.txt、sitemap.xml。保留原 hash SPA 与 AVIF/WebP 链路。无需后台或技术栈迁移。build-info.json 记录 Git SHA、dirty 状态、数据/源码/证据摘要。站点与单文件构建前运行主测试、新回归及预检。
8. 窄屏：修正选择框水平溢出、结果弹层滚动、焦点可见性与底部托盘空间。浏览器已检查 1280 与 390 宽度；不是完整 WCAG 认证。
9. Ultra 定向更正模块：`scripts/verification/ultra-business-correction.js` 为纯函数；只接受唯一、官方中国商用 URL 且 isCommercial=true 的现网记录，否则拒绝。保留消费者版及其他地区记录，有隔离测试。**尚未对真实 Ultra 记录应用**，因为本地基线不存在该记录。

## 验证结果

- 开发前主测试：5631 通过，0 失败。
- 开发后主测试：5626 通过，0 失败。减少来自替换了要求通用绕过/迁移文案的旧测试，不是隐去失败；新增独立回归检查实际单位算术、未知值、同机、兼容缺失、XSS、搜索、预算、全部字段哈希及 Ultra 区域隔离。
- `node tests/review-regression.test.js`：通过。
- `node scripts/deploy/build-site.js`：通过（包含主测试、新回归与五项预检），静态资源引用检查通过。
- `node scripts/deploy/smoke-test.js`：14/14 请求通过。
- `node tests/review-browser.test.js`：通过。真实点击预算按钮、Pro 11 键盘导航、恶意搜索不执行、1220g 算术、390px 无水平溢出、Pro 1/2 和 Xbox 比例、静态正文/canonical/robots/sitemap、无 pageerror。
- 单文件快照构建：`python3 scripts/build_standalone.py --snapshot-only --release releases/verification-20261009-review.html` 通过。末轮工具小修后也已成功构建 `releases/verification-20261009-review-final.html`；原稳定交付物未覆盖。file:// 被浏览器管理策略阻止，HTTP 载入快照且拦截所有附加请求后无 pageerror。此替代验证不等同所有浏览器 file:// 验收。
- `node scripts/verification/audit-library.js`：已运行，发现型报告不作真实性通过证明。
- `node tests/verification-batch02.test.js`：**受阻/失败启动**，缺少 `releases/verification-20260930-batch02/evidence/surface-pro.json` 等被忽略的历史材料。未伪造证据、未跳过断言冒充通过。
- `git diff --check`：通过。

## 仍需完成（不能省略的发布前工作）

1. 取得报告正文，逐项复核未在委托文本中列出的要求。
2. 取得线上当前九个脚本及资产清单，回收两条 Ultra 和一个芯片以及其他增量，合并至本分支；执行中国商用定向更正、重新生成核验快照并回归。消费者版仍独立核验。
3. 对全库参数和配件逐字段补足原始证据、具体 SKU/地区/日期。现有字段值仍为历史数据，**不代表正确**。核验账当前全部 pending，旧历史账只供追溯。
4. 预算点击问题本地未复现，已加入实际点击回归；仍须在现网版本排查。兼容性已有条目的冲突还需逐条查证。
5. 复杂数值范围、多配置比较规范化、配件选型/单位化表单未全面完成；目前宁可未知，不输出虚构总重。
6. 静态可索引页面已构建，但尚未验证生产服务器是否优先提供真实 robots/sitemap/产品路径而非 SPA fallback；不修改服务器、DNS 或权限。搜索引擎收录及线上 canonical 效果需发布后另验。
7. SPA hash 路由仍保留，hash 页没有各自服务端正文；新静态路径提供索引入口。更深的首屏分包、全站信息层级改版、焦点陷阱/读屏器/所有机型窄屏复核未做，防止在无法获得最新线上代码时扩大重写。
8. 补齐 batch02 历史证据后重跑专项。生产部署/远程推送/合并均未运行，发布必须另行确认。

## 如何审查

`git diff --stat`、`git diff -- js scripts tests index.html css` 查看逻辑修改。先读本文件，再看 Ultra 证据与定向修正模块，最后抽查核验账的 valueHash、region、configurationScope、reviewedAt 与 verdict。

重跑：`node scripts/deploy/build-site.js` → `node scripts/deploy/smoke-test.js`。浏览器回归前在仓库根运行 `python3 -m http.server 8765 --bind 127.0.0.1`，然后 `node tests/review-browser.test.js`；可通过 CHROMIUM_PATH 指定系统 Chromium。本地预览为 `/dist/site/`，静态产品页为 `/dist/site/products/pro-1/`。所有构建操作均为本地，不包含部署。
