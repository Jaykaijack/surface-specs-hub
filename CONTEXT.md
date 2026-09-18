# CONTEXT.md

Project domain model, hardware specifications, compliance redlines, and architectural constraints for the Microsoft Surface Specs Hub (微软 Surface 全系产品参数中心).

## 1. Project Background & Purpose

This project is a high-density, authoritative technical reference platform modeled after `HubWeb.cn`, engineered specifically for the entire Microsoft Surface product ecosystem (2012 - 2026). It serves training needs for livestream teams, sales consultants, tech enthusiasts, and IT procurement decision-makers.

## 2. Hardware Lineup & Technical Specifications (2026 / FY27)

All hardware represented in the Specs Hub must reflect official Microsoft technical whitepapers, architectural disclosures, and the official Microsoft Store China (`https://www.microsoftstore.com.cn/`).

### A. Surface Pro 13 英寸（第 12 代）商用版 [核心主推旗舰·双架构独立收录]
- **Pro 13 英寸 (第 12 代) 商用版 - Intel 版 (`pro-12-13-intel`)**:
  - 平台：英特尔® 酷睿™ Ultra 5 / Ultra 7 处理器 (第 3 代)，Intel® AI Boost NPU (50 TOPS)。
  - 屏幕：13.0 英寸 PixelSense Flow (2880 × 1920，120Hz 动态高刷)，Ultra 5 配备防反射 LCD / Ultra 7 配备双层串联 OLED。
  - 配色：**亮铂金 (Platinum) 与 典雅黑 (Black)** 商务双色（官方商用商城真实在售规格，严格无沙漫金/宝石蓝）。
  - 起售价：¥16,888 起 (仅商用直达)。
- **Pro 13 英寸 (第 12 代) 商用版 - 骁龙版 (`pro-12-13-snap`)**:
  - 平台：高通第二代骁龙® X2 Elite（12 核 Oryon 架构），Qualcomm Hexagon NPU (80 TOPS 算力巅峰)。
  - 屏幕：13.0 英寸 PixelSense Flow 双层串联 OLED 屏幕 (2880 × 1920，120Hz，100万:1 对比度)。
  - 配色：**亮铂金 (Platinum) 与 典雅黑 (Black)** 商务双色（官方商用商城真实在售规格，严格无沙漫金/宝石蓝）。
  - 起售价：¥15,488 起 (仅商用直达)。
- **配件生态**: Surface Pro Flex 键盘（支持离机蓝牙无线打字与磁吸直连双模，自带隐藏式笔槽无线充电）与 Surface 超薄触控笔 2（4096 级压感与触觉振动反馈）。

### B. Surface Pro, 12 英寸（第 1 代）[官方消费级轻薄 AI+ PC]
- **Target SKU**: 高通骁龙® X Plus (8 核心)，12.0 英寸 PixelSense 触控屏 (2196 × 1464)，45 TOPS NPU，轻至 686g。
- **定位与属性**: 个人与家庭消费级便携 AI+ PC (`isCommercial: false`)。
- **配色**: 亮铂金 (Platinum)、罗兰紫 (Violet)、碧海青 (Ocean) 时尚三色。
- **起售价**: ¥7,888 起 (消费商城直达)。

### C. Surface Laptop（第 8 代）商用版 [核心主推旗舰·独立架构解耦]
- **13.8 英寸商用版**: 独立拆分为 Intel 版 (`laptop-8-138-intel`，Ultra 5/7，50 TOPS，¥16,888起) 与 骁龙版 (`laptop-8-138-snap`，Snapdragon X2，80 TOPS，¥14,888起)。
- **15.0 英寸商用版**: 独立拆分为 Intel 版 (`laptop-8-150-intel`，Ultra X7，50 TOPS，¥18,888起) 与 骁龙版 (`laptop-8-150-snap`，Snapdragon X2，80 TOPS，¥16,888起)。
- **商用配色标准**: 严格且仅限 **亮铂金 (Platinum)** 与 **典雅黑 (Black)**（彻底剔除消费级宝石蓝、沙漫金、仙踪绿）。
- **CRITICAL REDLINE**: 屏幕支持手指十点触控，但**绝对不支持触控笔输入**。
- **独立消费版**: Surface Laptop (第 7 代) 消费版 (`laptop-7-138`) 保留时尚 4 色消费零售。

### D. Historical Full Genealogy (8 大品类、46 款机型全覆盖)
- **商用版与消费版彻底解耦**: 全系总计收录 46 款设备，商用机型打上 `isCommercial: true` 且仅配商务双色，购买链接 100% 直达微软中国官方商用商城选配页；消费机型打上 `isCommercial: false` 直达消费零售页，绝无混淆串门。
- **Surface Pro 系列 (15款)**: 第 12 代 13 英寸 (2026), 12 英寸 (第 1 代), 第 11 代, Pro 10 商用版, Pro 9 (Intel/5G), Pro 8, Pro 7+, Pro 7, Pro 6, Pro 5 (2017), Pro 4, Pro 3, Pro 2, Pro 1 (初代 2012), Pro X (ARM 超薄先锋).
- **Surface Laptop 系列 (9款)**: 第 8 代 (13.8" & 15"), 第 7 代, Laptop 6 商用版, Laptop 5, Laptop 4, Laptop 3, Laptop 2, 初代 Laptop.
- **Surface Laptop Studio 系列 (2款)**: SLS 2 (RTX 4060/4050 变形工作站), 初代 SLS.
- **Surface Book 系列 (4款)**: Book 3 (15" & 13.5"), Book 2 (15" & 13.5"), 初代 Book.
- **Surface Go 系列 (4款)**: Go 4 商用版 (Intel N200), Go 3, Go 2, 初代 Go.
- **Surface Laptop Go 系列 (3款)**: Laptop Go 3, Laptop Go 2, 初代 Laptop Go.
- **Surface Studio & Hub 系列 (4款)**: Studio 2+ (RTX 3060), Studio 2, 初代 Studio, Hub 2S.
- **Surface Duo 系列 (2款)**: Duo 2 (4.8mm 双屏 90Hz), 初代 Duo.

---

## 3. Strict Exclusions & Compliance Redlines

1. **Surface Pro 12-inch Official Inclusion**:
   - 微软官方商城（`microsoftstore.com.cn/commercial`）重点在售核心机型，必须全面收录其 13 大类权威参数。
2. **Superseded Generations**:
   - Do not refer to 11th edition or 7th edition as the latest flagship. Current flagships are Pro 13 (12th Gen), Pro 12-inch, and Laptop (8th Gen).
3. **Promotions & Giveaways**:
   - **Strictly prohibit inventing unauthorized discounts, vouchers, or free gifts**.
   - Pricing language: "以微软官方商城实时页面标价与活动为准" (Prices strictly subject to official real-time tags).
4. **Internal Routing Terms**:
   - Strictly avoid mentioning internal operational terms like "橙子建站" or "未开店".

---

## 4. Architecture & UI Constraints

- **Deliverable**: Single-page static web application (`index.html`), 100% offline self-contained, zero backend/database/API server dependency.
- **Visual Design**: Microsoft Fluent 2 Design System, Segoe UI typography, high contrast >4.5:1, Mica texture, true dark/light mode toggle.
- **Layout**: High information-density 3-column layout modeled after HubWeb.cn:
  - Left: Tree navigation by category & series.
  - Center: Main work area (Cards, Sticky Comparison Table, Product Detail, Analysis Tools).
  - Bottom: Sticky floating comparison dock (`#comparison-dock`).
- **Comparison Engine**:
  - Dual-axis sticky table: First column sticky left (`position: sticky; left: 0`), header card sticky top (`position: sticky; top: 48px`).
  - Difference highlighting (`row-diff`), "only show diffs" instant toggle, column swap (`◀ ▶`).
  - Horizontal smooth scrolling (`Shift + 滚轮` or drag).
- **Analysis Tools**:
  - 3:2 Screen Area Calculator (dynamic geometric deduction vs 16:9 / 16:10).
  - Processor Architecture & NPU TOPS Benchmark Ladder (40 TOPS Copilot+ redline).
  - Bidirectional Accessories Compatibility Matrix (Accessory -> Devices, Device -> Accessories, Full Table).
- **Asset Localization & Color Variant Switching**:
  - All product images stored locally in `assets/products/`.
  - Pro 13 (4 colors) & Laptop 8 (5 colors) equipped with interactive color swatches in cards, detail hero, and comparison table header.

---

## 5. Zero-Hallucination Data Governance Standards

1. **Four Parameter States**:
   - `VALID`: Verified value backed by official whitepapers.
   - `NOT_DISCLOSED`: Officially not disclosed (`官方未披露`), e.g. exact battery mAh or camera aperture when omitted by Microsoft.
   - `NOT_APPLICABLE`: Morphologically or physically not applicable (`不适用`), e.g. pen vibration for laptops, type cover for Duo.
   - `NULL`: Unknown / missing parameter (`—`).
2. **Source Authority Hierarchy**:
   - Tier 1: Microsoft Learn / Surface IT Pro Deployment Documentation.
   - Tier 2: Microsoft Store Official Technical Specifications.
   - Tier 3: FCC / 3C Official Certification Data & Manufacturer Whitepapers.
   - Tier 4: Authorized Third-Party Teardowns (e.g. iFixit).
3. **Audit Rule**:
   - Under no circumstances may an agent fabricate missing battery capacity, sensor specifications, or interface standards.
