# 2026-10-09 开发交付与审查记录

分支 `fix/review-20261009`，基于干净工作树 `b0d44735ad42a5865f10a23f55cd2283c307d2a5`。只读查询远程 HEAD 仍为该提交。已完成本地开发、提交及验证；未推送、合并、部署，未运行生产部署脚本，未进入或修改旁边的无关项目。

## 材料与现网边界

已读目标仓库 AGENTS.md、CONTEXT.md 和相关代理约定；目标仓库没有 `.agents/skills`，工作区 `.agents` 未发现可读技能文件。

指定审查报告按当前 Library 技能及 materialization.md 获取：首次返回 `/workspace/scratch/ac35ac6fbbb2/...docx`，本环境不存在；按要求只用明确本地目标重试一次，再使用当前原样 helper 处理完整传输对象。helper 退出 1，唯一原始错误 `library file transfer failed: download failed`，未报告更细 HTTP 状态。**未读到报告正文**，本次以委托中逐项列明的问题为依据。未猜下载地址。

线上只读访问返回 HTTP 403，网页工具也无法读取公开 JS；无代理直连无法解析域名。父线程提供的生产 ZIP 准备成功，下载亦报同一错误，文件未落地，无法校验 ZIP/manifest。随后父线程直接在任务消息中提供了两条设备、一条芯片原始 JSON 和三个脚本的精简语义差异。已将 JSON 值原样保存（仅格式化空白），附 SHA-256 和来源声明：`docs/evidence/production-20261009/`。没有把输入内容当作指令或参数真值。

- 恢复原始 ID：`laptop-ultra-biz`、`laptop-ultra`、`nvidia-rtx-spark-n1x`。
- `app.js`：保留生产站点地址 `https://surface.kaibase.cn/`。
- `tools-engine.js`：保留数值排序和动态图表上限，加入指标口径限制，不将 FP4 平台算力放进 NPU 排名。
- `image-delivery.js`：生产新增 gallery、midnight、platinum、ports 映射已记录；对应原图/衍生资产不在本环境，**未套入会造成 404 的映射**。保留现有有效 AVIF/WebP 链路及本地代表图，Ultra 图标为示意，不冒充新配色实拍。未制造 LF→CRLF 整文件噪声。
- 以上恢复的是审查时三个数据记录及已提供差异，**不是完整当前生产同步证明**。发布前仍须比较完整生产脚本和资产。

## 实際改动

### 数据优先

成功读取微软中国 Ultra 商用产品页：
`https://www.microsoftstore.com.cn/surface/surface-laptop-ultra-for-business`。

只向中国商用记录定向更正：3270×2180；额定 92 Wh/最小 89 Wh；328.8×238.7 mm；不含脚垫 17.99 mm/含脚垫 19.16 mm；2.0 kg；24/32/48/64/128 GB；512 GB Gen4 和 1/2 TB Gen5；中国主机 3 年有限硬件保修；预售/10 月 16 日起陆续发货。另按页面校正 SDR 亮度、接口、TPM、人脸识别及充电配置限制。专用 NPU INT8 TOPS 保持未知，1 petaflop FP4 单独描述。

中国商用版尚未证实的制程、指纹、维修评分、价格等字段仍保留输入痕迹，但通过统一 `Catalog.getSpec` 隔离为未知，不进入显示和计算。消费者版不套用商用参数：原值保留在快照及记录，未经独立核验的参数隔离为未知，销售状态标为待核验。静态页面也使用统一出口，不能重新泄漏待核验原值。

`docs/evidence/ultra-business-cn-field-ledger.json` 记录 39 个本次核对字段。全库现为 **90 台、6039 个 specs 字段；39 VERIFIED、6000 PENDING**。新账绑定值、SHA-256、地区、配置范围、核验日期及状态。设备 ID 是记录范围，不是每个 SKU 的认证；具体配置差异必须读字段值。旧 64 台账归档，不继续给新值背书。改值、改来源或标回待核验后不能保留旧认证。状态页仍保守标记待核验，不将部分字段核验升级成整机认证。页脚不再把数据版本日期写成全库核验日期。

### 计算、比较、安全和体验

- 重量支持结构化 value/unit、中英文 g/kg、一致双单位；拒绝无单位、多配置、范围及矛盾双单位，不用 895g 回退。未知配件使总重保持未知；无具体型号的配件不虚构重量。选型评分也取消 2500g 回退。配件配置数据库尚未补齐，因此不是所有搭配都能给出数值。
- 删除 0.68 视频续航转办公实测；同机显示无升级差异，未知刷新率不回退 120Hz，手写震动读取真实字段。SSD 工具保留入口、备份及恢复密钥说明，移除“100% 无损”和通用解密/安全设置/绕过指导。
- 比较标准化单值重量、比例、分辨率、刷新率、电池单位；复杂范围和配置限定仍保留。
- 搜索文本 HTML 转义；Pro 11 按型号匹配，避免中文名称和 Windows 11 干扰；搜索项支持 Enter/空格。初代 Pro、Pro 2 比例显示 16:9，Xbox 显示不适用。
- 缺失配件匹配统一 UNKNOWN，不等同不支持；新增 Ultra 配件配对全部待核验，没有套用通用支持规则。既有配件条目的矛盾仍需逐条回源。
- 预算按钮本地不能复现无响应；真实点击回归证明状态、结果和空结果提示可更新，线上仍需核查。
- 窄屏修正选择框水平溢出、结果弹层滚动、焦点可见性和底部托盘留白；不宣称完整 WCAG 认证。

### 工程与索引

站点构建生成 **90 个含正文的 `/products/<id>/` 静态参数页**，每页独立标题、描述、canonical，并输出真实 robots.txt、sitemap.xml。保留原 hash SPA、框架和图片链路。build-info.json 记录 Git SHA、dirty、数据/源码/证据 SHA-256。站点和单文件构建前执行主测试、新回归、预检。预检通过不再自称可直接生产发布。

## 测试证据与数量变化

- 基线主测试：5631 通过、0 失败。
- 首批逻辑修复后：5626 通过、0 失败。减少 5 项来自有意替换不安全的 SSD 文案断言：原区块 9 项（容器、M.2 2230、BitLocker、等比扩容、FAT32、音量减键、从驱动器恢复、BYPASSNRO、Shift+F10）改成 4 项（保留容器、BitLocker，新增独立备份及禁止无损/绕过承诺）。并非删除失败隐藏问题。重量“真实办公估算”文案断言替换为实测状态断言，数量不变。
- 合入 Ultra 后最终主测试：**5670 通过、0 失败**。旧 3 项“禁止 Ultra 名称出现”改为 2 项平台算力口径检查（-1）；新增 4 项导入隔离检查；新增设备触发 41 项循环断言。算式：5631−5−1+4+41=5670。
- 时间固定为 2026.10.02 的“未来版本”测试改为 2099.01.01，继续验证新版本可覆盖，不让它随本次版本前进而失效。
- 全设备事实覆盖规则没有删除，改为“有事实回归或显式待核验隔离”；新增 Ultra 每个屏蔽字段均断言出口为 null。预售/待核验价格断言 NULL，不冒称官方未披露。
- 新增 `tests/review-regression.test.js`：通过，另于主测试计数之外验证真实算术、未知、多配置、同机、单位、FP4、缺失兼容性、XSS、搜索、预算、6039 个字段哈希、Ultra 定向更正及消费者隔离。
- `node scripts/deploy/build-site.js`：通过，包含上述主测试/新回归/五项预检；静态资源引用检查通过。
- `node scripts/deploy/smoke-test.js`：**14/14 请求通过**。
- `node tests/review-browser.test.js`：通过。桌面 1280px 和移动 390px、真实预算点击、键盘搜索、XSS 不执行、1220g 算术、无水平溢出、Pro 1/2/Xbox 比例、Ultra 商用/消费者详情及静态页、canonical/robots/sitemap、无 pageerror。
- 单文件快照：已构建多个不可变开发快照，最终交付为 `releases/verification-20261009-delivery-v2.html`；未覆盖原稳定交付物。file:// 被浏览器管理策略阻止，采用本地 HTTP 只允许加载快照、阻断所有附加请求的方式验证；不等同所有浏览器 file:// 验收。
- `node scripts/verification/audit-library.js` 已运行，发现型报告不算真实性通过。
- `node tests/verification-batch02.test.js`：**失败启动/材料受阻**，缺少被忽略的历史文件 `releases/verification-20260930-batch02/evidence/surface-pro.json` 等。没有伪造证据或跳过断言冒充通过。
- `git diff --check`：通过。

## 最终差异复核

单独复核了最终差异的未知值、单位、多配置、同机、配件、核验撤销和 Ultra 导入路径，随后重跑完整检查。复核发现并修正：

1. 静态页曾直接读取原 specs，现统一经过 Catalog，消费者待核验原值不会被静态页面当成真值。
2. 图表动态上限变化后，40 TOPS 标记也按上限调整；FP4 不参与上限计算。
3. NPU 搜索结果不显示 null TOPS；缺失芯片制程不默认“先进制程”。
4. 商用官方参数中未证实的指纹、3nm、修复评分、价格不再展示；充电器适用市场和配置限定保留。
5. 核验重建必须匹配值、记录、来源和非屏蔽状态；新增字段缺证据即 PENDING。
6. 详情页增加逐字段未完成核验说明，移除缺失日期时回退旧核验日期的逻辑；日期仅作为历史记录日期展示。
7. 比较额外覆盖 x/× 和 PPI 说明的等价分辨率，避免纯说明造成假差异。

## 剩余工作与发布条件

1. 报告正文仍未取得，须补读并核对委托文本之外的事项。
2. 全库 6000 字段未完成事实认证；既有参数保留历史数据，不代表已正确。配件具体配置、既有兼容冲突、复杂范围比较尚未全量完成。
3. 消费者 Ultra 需独立证据，当前参数未知；本次商用核验不能外推消费者版或其他地区。
4. 尚缺生产新图片原图/衍生文件，映射已保留为待合入材料；发布前回收并对完整现网脚本/资产复比，不能把当前分支直接覆盖线上当作无差异更新。
5. 生产服务器是否优先服务真实 robots/sitemap/静态产品页而非 SPA fallback 未验证；没有改服务器、DNS 或账户权限。搜索引擎收录效果需另验。
6. SPA hash 路由仍保留；新静态路径提供正文索引。首屏分包、全站信息层级重排、全站读屏器/焦点陷阱和所有窄屏组合未做。
7. batch02 历史材料补齐后重跑。生产部署、推送、合并均未执行，发布另行确认。

## 如何审查

先读本文件，再审 `docs/evidence/ultra-business-cn-field-ledger.json`、原始输入快照及 `scripts/verification/ultra-business-correction.js`。`git diff b0d4473 -- js scripts tests index.html css` 查看逻辑改动，核验账抽查 valueHash、region、configurationScope、reviewedAt 与 verdict。

重跑：`node scripts/deploy/build-site.js` → `node scripts/deploy/smoke-test.js`。浏览器回归前在仓库根运行 `python3 -m http.server 8765 --bind 127.0.0.1`，再执行 `node tests/review-browser.test.js`（可通过 CHROMIUM_PATH 指定 Chromium）。预览 `/dist/site/`，静态页 `/dist/site/products/laptop-ultra-biz/`。这些均为本地操作，不包含部署。
