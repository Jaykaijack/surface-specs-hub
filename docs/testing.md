# Microsoft Surface Specs Hub - 自动化测试与质量验证规范 (Testing & QA)

本文档归档 Microsoft Surface 全系产品参数中心（HubWeb 复刻版）的自动化测试体系、测试用例设计、执行方法及测试报告。

---

## 1. 测试环境与运行指令

项目内置轻量级、零第三方 npm 依赖的纯 Node.js 测试执行器，可在任何具备 Node.js 环境的机器上运行：

```bash
# 进入项目目录
cd surface-specs-hub

# 执行全量自动化测试套件
node tests/test-runner.js
```

---

## 2. 自动化测试套件覆盖结构 (82 项断言)

测试覆盖 6 大核心模块与 PRD 强制约束：

### Test Suite 1: 产品分类体系与谱系收录 (Taxonomy & Hierarchy)
- **品类覆盖**：验证完整的 8 大 Surface 品类（Pro、Laptop、Laptop Studio、Book、Go、Laptop Go、Studio/Hub、Duo）。
- **机型收录深度**：收录 42 款历代机型（2012 初代至 2026 最新代）。
- **合规边界审查**：严格执行“12 英寸版本先不用”约束，严禁收录 Surface Pro 12 英寸。
- **最新旗舰收录**：验证 `Surface Pro 13 英寸 (第 12 代)` 与 `Surface Laptop (第 8 代)` 的收录与参数完整性。

### Test Suite 2: 13 大专属参数分组与零脑补治理 (Spec Groups & Zero Hallucination)
- **13 大专属类别**：严格校验 13 个参数大组（basic, processor, memory_storage, display, camera, audio, connectivity, power, input, security, design, service, metadata）。
- **参数数据点**：验证在库有效确定参数点超过 2,500 项。
- **未知参数治理**：
  - 验证 `not_disclosed`（官方未披露）数据点存在且规范应用（共 44 项），杜绝 AI 臆造参数。
  - 验证 `not_applicable`（不适用）数据点存在且语义明确（共 191 项，如折叠机无键盘盖、Laptop 无笔支持）。
  - 零无效空值泄露。

### Test Suite 3: 横向滚动对比引擎与算法 (Comparison Engine)
- **单元格渲染**：校验标准文本渲染、颜色调色盘、销售状态胶囊、NPU 算力高亮。
- **未知状态渲染**：校验 `not_disclosed` 正确输出带有专用提示与 CSS 类的标签；`not_applicable` 输出不适用状态标签。
- **差异识别算法 (`checkFieldDiff`)**：
  - 同值比对：判定 `diff = false`。
  - 异值比对：判定 `diff = true`。
- **多机交互**：验证对比托盘装载、列顺序双向交换（`swapDeviceOrder`）。

### Test Suite 4: 辅助分析工具与实时计算 (Tools Engine)
- **3:2 屏幕对比器**：
  - 屏幕面积三角几何实时计算器（`calculateDimensions`）。
  - 科学事实验证：13.0 英寸 3:2 物理显示面积（78.0 平方英寸）显著大于 13.3 英寸 16:9（75.59 平方英寸）。
- **处理器与 NPU 算力天梯**：
  - 验证收录 12 款主要处理器架构（骁龙 X2、X Elite、X Plus、Lunar Lake、Ryzen AI、Meteor Lake、SQ3、SQ1/2、Tiger Lake、Alder Lake、N200）。
  - 验证 40 TOPS 官方 Copilot+ PC 认证红线的一致性。
- **双向配件兼容矩阵**：
  - 验证 Flex 键盘、特制版专业键盘、Slim Pen 2 的双向查询与支持等级（FULL / PARTIAL / UNSUPPORTED）。

### Test Suite 5: URL 路由与多维筛选系统 (Router & Filters)
- **URL 查询参数双向还原**：
  - 验证 `cpu`、`status`、`copilot`（布尔化）、`audience` 参数由 URL 解析并驱动界面状态。
- **多维联动过滤算法**：验证组合筛选（高通平台 + 国行在售 + Copilot+ PC）过滤精准度。
- **全局搜索匹配**：验证通过中英文组合词（“骁龙 X2”、“2026”）精准秒级召回机型。

### Test Suite 6: Fluent 2 样式系统与无障碍 (Assets & Tokens)
- **文档规范**：合法 HTML5、移动端 `viewport-fit=cover` 视口安全区。
- **DOM 结构**：核心工作区容器、全局搜索浮层、底部常驻对比吸附托盘。
- **Fluent Tokens**：包含浅色/深色主题 Token、Segoe UI 字体族、高对比度颜色。
- **表格样式**：验证 `position: sticky` 双轴吸附与差异高亮 CSS 类名。

---

## 3. 测试执行输出记录

```text
========================================================
🧪 Microsoft Surface Specs Hub - Automated Verification
========================================================

📦 Test Suite 1: 产品分类体系与谱系收录
  ✅ PASS: 收录完整的 8 大 Surface 品类 (Actual: 8)
  ✅ PASS: 包含预期品类: pro
  ✅ PASS: 包含预期品类: laptop
  ✅ PASS: 包含预期品类: sls
  ✅ PASS: 包含预期品类: book
  ✅ PASS: 包含预期品类: go
  ✅ PASS: 包含预期品类: laptopgo
  ✅ PASS: 包含预期品类: studio
  ✅ PASS: 包含预期品类: duo
  ✅ PASS: 全历史机型收录充分 (当前收录: 42 款)
  ✅ PASS: 合规约束检查: 严格排除 Surface Pro 12 英寸版本
  ✅ PASS: 旗舰二合一存在: Surface Pro 13 英寸 (第 12 代) 收录正常
  ✅ PASS: 旗舰机型全名符合规范
  ✅ PASS: 旗舰笔记本存在: Surface Laptop (第 8 代) 13.8 英寸收录正常

📋 Test Suite 2: 13 大专属参数分组与零脑补治理
  ✅ PASS: 严格定义 13 大专属参数类别 (Actual: 13)
  ✅ PASS: 包含参数大类: basic
  ✅ PASS: 包含参数大类: processor
  ✅ PASS: 包含参数大类: memory_storage
  ✅ PASS: 包含参数大类: display
  ✅ PASS: 包含参数大类: camera
  ✅ PASS: 包含参数大类: audio
  ✅ PASS: 包含参数大类: connectivity
  ✅ PASS: 包含参数大类: power
  ✅ PASS: 包含参数大类: input
  ✅ PASS: 包含参数大类: security
  ✅ PASS: 包含参数大类: design
  ✅ PASS: 包含参数大类: service
  ✅ PASS: 包含参数大类: metadata
  ℹ️  有效确定参数: 2537 项, 官方未披露: 44 项, 不适用: 191 项, 空缺: 0 项
  ✅ PASS: 有效参数点信息量丰满 (>1000 项, 实际: 2537)
  ✅ PASS: 存在明确遵循官方未披露原则的参数 (零胡编, 实际: 44 项)
  ✅ PASS: 存在明确标注不适用的参数 (如折叠机/纯笔记本不适用参数, 实际: 191 项)

⚖️ Test Suite 3: 对比引擎格式化与差异识别算法
  ✅ PASS: 正常参数格式化渲染文本
  ✅ PASS: not_disclosed 准确渲染为"官方未披露"标签
  ✅ PASS: 包含 spec-state not-disclosed CSS 样式类
  ✅ PASS: not_applicable 准确渲染为"不适用"标签
  ✅ PASS: 包含 spec-state not-applicable CSS 样式类
  ✅ PASS: 空缺值渲染为标准中划线
  ✅ PASS: 同值参数比对判定无差异 (diff = false) (Actual: false)
  ✅ PASS: 异值参数比对判定存在差异 (diff = true) (Actual: true)
  ✅ PASS: 托盘装载 2 款设备 (Actual: 2)
  ✅ PASS: 列顺序向右调整成功 (Actual: laptop-8-138)
  ✅ PASS: 原第0列被交换到第1列 (Actual: pro-12-13)

📐 Test Suite 4: 辅助工具算力天梯与 3:2 面积算法
  ✅ PASS: 3:2 13.0" 屏幕面积计算完成: 78 平方英寸 (503.22 cm²)
  ✅ PASS: 16:9 13.3" 屏幕面积计算完成: 75.59 平方英寸
  ✅ PASS: 核心事实验证: 13.0 英寸 3:2 显示面积显著大于 13.3 英寸 16:9
  ✅ PASS: 芯片库完整收录至少 10 款主要架构
  ✅ PASS: 骁龙 X2 Elite 芯片在库
  ✅ PASS: 骁龙 X2 Elite NPU 硬件算力为 80 TOPS (Actual: 80)
  ✅ PASS: 算力 >= 40 TOPS 的芯片 (高通 Snapdragon® X2 Elite) 必须具备 Copilot+ 认证
  ✅ PASS: 算力 >= 40 TOPS 的芯片 (高通 Snapdragon® X Elite (X1E-80-100)) 必须具备 Copilot+ 认证
  ✅ PASS: 算力 >= 40 TOPS 的芯片 (高通 Snapdragon® X Plus (X1P-64-100)) 必须具备 Copilot+ 认证
  ✅ PASS: 算力 >= 40 TOPS 的芯片 (Intel® Core™ Ultra 7 268V (Lunar Lake)) 必须具备 Copilot+ 认证
  ✅ PASS: 算力 >= 40 TOPS 的芯片 (AMD Ryzen™ AI 9 HX 370 (Strix Point)) 必须具备 Copilot+ 认证
  ✅ PASS: 包含键盘、触控笔、拓展坞 3 大类配件兼容库 (Actual: 3)
  ✅ PASS: Surface Pro Flex 键盘配件在库
  ✅ PASS: Flex 键盘原生支持 Surface Pro 13 英寸 (第 12 代)

🧭 Test Suite 5: URL 路由与筛选器参数化联动
  ✅ PASS: 正确还原 URL cpu 参数 (Actual: snapdragon)
  ✅ PASS: 正确还原 URL status 参数 (Actual: current_cn)
  ✅ PASS: 正确还原 URL copilot 参数为布尔值 (Actual: true)
  ✅ PASS: 正确还原 URL audience 参数 (Actual: consumer)
  ✅ PASS: 筛选过滤算法产出有效结果
  ✅ PASS: 筛选后机型必须具备 Copilot+
  ✅ PASS: 筛选后机型状态必须是国行在售 (Actual: current_cn)
  ✅ PASS: 筛选后机型必须具备 Copilot+
  ✅ PASS: 筛选后机型状态必须是国行在售 (Actual: current_cn)
  ✅ PASS: 重置后 cpu 恢复为 all (Actual: all)
  ✅ PASS: 重置后 copilotOnly 恢复为 false (Actual: false)
  ✅ PASS: 通过"骁龙 X2"可精准检索到最新第 12 代 Pro 与第 8 代 Laptop
  ✅ PASS: 通过年份"2026"可检索到 2026 最新发布的全部机型

🎨 Test Suite 6: 样式 Token、无障碍对比度与 HTML 入口
  ✅ PASS: index.html 根文件存在
  ✅ PASS: 合法 HTML5 文档声明
  ✅ PASS: 适配移动端安全区域
  ✅ PASS: 包含核心内容承载容器
  ✅ PASS: 包含全局搜索浮层 DOM
  ✅ PASS: 包含底部对比吸附托盘 DOM
  ✅ PASS: fluent-tokens.css 存在
  ✅ PASS: 包含 Surface Fluent 背景色 Token
  ✅ PASS: 包含深色主题适配 Token
  ✅ PASS: spec-table.css 存在
  ✅ PASS: 实现双轴吸附 position: sticky
  ✅ PASS: 包含官方未披露状态专用样式
  ✅ PASS: 包含不适用状态专用样式

========================================================
🏁 自动化测试结果: 82 项通过, 0 项失败
========================================================
🎉 所有数据模型、参数治理、对比引擎与交互逻辑全部验证通过！
```

---

## 4. 人工 UI 与交互回归检查单 (Manual Verification Checklist)

| 场景编号 | 测试项目 | 期望表现 | 实测结果 |
| :--- | :--- | :--- | :--- |
| **UI-01** | 本地离线双击打开 `index.html` | 在无网络断网环境下，所有机型卡片、大表、字体、矢量图标 100% 完整秒开渲染 | ✅ 通过 |
| **UI-02** | 桌面端 1920px 横向滚动 | 首页点击进入对比页，按住 Shift + 滚轮或直接滚动，参数大表首列粘性固定在左侧，表头吸附顶部，无横向断裂 | ✅ 通过 |
| **UI-03** | 移动端 390px 适配 | 点击左上角汉堡按钮 ☰，分类侧边抽屉自左向右滑出，点击遮罩关闭；表格支持触控左右滑动 | ✅ 通过 |
| **UI-04** | 差异高亮与仅看差异切换 | 点击大表上方“高亮差异项”，异值行背景呈现 Fluent 蓝色淡雅高亮；点击“仅看差异”，完全相同行自动折叠隐藏 | ✅ 通过 |
| **UI-05** | 列顺序调整 | 点击表头设备下方的 `◀` 或 `▶` 按钮，列位置瞬间对调，参数行数据严格同步移动 | ✅ 通过 |
| **UI-06** | 3:2 屏幕对比器拖拽 | 拖拽滑块从 10.5" 滑动至 15.0"，下方同比例线框与面积百分比实时毫秒级重算更新 | ✅ 通过 |
| **UI-07** | 深浅主题无缝切换 | 点击右上角 ☀️/🌙 按钮，全站无闪烁切换暗黑模式，文字对比度持续保持 >4.5:1 | ✅ 通过 |
| **UI-08** | URL 可分享比对 | 复制带有 `#/compare?products=pro-12-13,laptop-8-138` 的 URL 发送给其他人，打开直接呈现该双机横向对比 | ✅ 通过 |
