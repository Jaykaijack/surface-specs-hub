# CONTEXT.md

Project domain model, hardware specifications, compliance redlines, and architectural constraints for the Microsoft Surface Specs Hub (微软 Surface 全系产品参数中心).

## 1. Project Background & Purpose

This project is a high-density, authoritative technical reference platform modeled after `HubWeb.cn`, engineered specifically for the entire Microsoft Surface product ecosystem (2012 - 2026). It serves training needs for livestream teams, sales consultants, tech enthusiasts, and IT procurement decision-makers.

## 2. Hardware Lineup & Technical Specifications (2026 / FY27)

All hardware represented in the Specs Hub must reflect official Microsoft technical whitepapers, architectural disclosures, and the official Microsoft Store China (`https://www.microsoftstore.com.cn/`).

### A. Surface Pro 13 英寸（第 12 代）商用版与消费版 [核心主推旗舰]
现网核验日期：2026-09-21，信源为微软中国官方商城产品页（不以旧样机底账覆盖现网标价）。
- **Pro 13 英寸 (第 12 代) 消费版 (`pro-12-13`)**:
  - 平台：骁龙® X2 Plus（10 核） / X2 Elite（12 核），80 TOPS NPU。消费页不出现英特尔 SKU。
  - 配色：**亮铂金、典雅黑、沙漫金** 3 色。
  - 起售价：¥12,888 起；本地视频续航 15.5 小时；标配 39W 电源。
- **Pro 13 英寸 (第 12 代) 商用版 - Intel 版 (`pro-12-13-intel`)**:
  - 平台：英特尔® 酷睿™ Ultra 5 335 / Ultra 7 366H（第 3 代），Intel® AI Boost 50 TOPS。
  - 配色：**亮铂金与典雅黑**。
  - 起售价：¥16,888 起；本地视频续航 17 小时。
- **Pro 13 英寸 (第 12 代) 商用版 - 骁龙版 (`pro-12-13-snap`)**:
  - 平台：骁龙® X2 Plus / X2 Elite，Hexagon 80 TOPS。
  - 配色：**亮铂金与典雅黑**。
  - 起售价：¥15,488 起；本地视频续航 15.5 小时。
- **配件生态**: Surface Pro Flex 键盘与 Surface 超薄触控笔 2。

### B. Surface Pro, 12 英寸（第 1 代）[官方便携 AI+ PC 双线并收录]
- **消费版 (`pro-12-inch`)**:
  - 骁龙® X Plus (8 核心)，12.0 英寸 PixelSense (2196 × 1464)，45 TOPS，686g。
  - 配色：亮铂金、罗兰紫、碧海青。
  - 起售价：¥6,788 起；本地视频续航 16 小时。
- **商用版 (`pro-12-inch-biz`)**:
  - Windows 11 专业版，仅亮铂金；内存 16GB / 24GB；电池额定 38 Wh。
  - 起售价：¥9,788 起。官方页：`/surface/surface-pro-11th-edition-12-inch-for-business`。

### C. Surface Laptop 系列最新在售核心阵容
- **Laptop（第 8 代）13.8 消费版 (`laptop-8-138`)**: 仅骁龙 X2 Plus / Elite，¥11,488 起，20 小时，39W。
- **Laptop（第 8 代）15 消费版 (`laptop-8-150`)**: 仅骁龙 X2 Plus / Elite，¥12,888 起，19 小时，65W，内存最高 32GB。
- **Laptop, 13 英寸 (第 1 代) 消费版 (`laptop-13-inch`)**: 骁龙 X Plus 8 核，1.22kg，¥7,788 起，23 小时。
- **Laptop 13 英寸 商用骁龙 (`laptop-13-inch-biz`)**: X Plus，16/24GB，¥10,788 起，23 小时。
- **Laptop 13 英寸 商用 Intel (`laptop-13-inch-intel-biz`)**: Ultra 5 **325**（第 3 代，不是 125），8/16/24GB，¥10,188 起，22 小时，47 TOPS。
- **Laptop（第 8 代）商用版 (13.8" & 15")**:
  - 13.8 Intel (`laptop-8-138-intel`)：¥16,888 起；Ultra 5 335 / Ultra 7 366H / Ultra X7 368H；23 小时；256GB 起；39W。
  - 13.8 骁龙 (`laptop-8-138-snap`)：¥14,888 起；X2 Plus / Elite；20 小时；256GB–2TB；39W。
  - 15 Intel (`laptop-8-150-intel`)：分辨率 3270×2180 (262 PPI)；21 小时；65W。15 英寸独立入门价官方合页未单列 → `not_disclosed`。
  - 15 骁龙 (`laptop-8-150-snap`)：3270×2180 (262 PPI)；19 小时；65W。15 英寸独立入门价同样 `not_disclosed`。
  - 商用配色：仅亮铂金与典雅黑。
  - 铁律：十点触控，**不支持触控笔**。

### C2. 仍在售的前代商用 AI+ PC（2026-09-21 现网仍有独立产品页）
- **Pro 11 商用骁龙 (`pro-11-biz-snap`)**：¥11,239 起；X Plus（10 核）/ X Elite（12 核）；45 TOPS；本地视频 14 小时。
- **Pro 11 商用 Intel (`pro-11-biz-intel`)**：¥14,488 起；Ultra 5 236V/238V、Ultra 7 266V/268V；40/48 TOPS；本地视频 14 小时。
- **Laptop 7 商用骁龙 (`laptop-7-biz-snap`)**：¥11,329 起；13.8 英寸 X Plus/X Elite，15 英寸仅 Elite；20/22 小时。
- **Laptop 7 商用 Intel (`laptop-7-biz-intel`)**：¥14,488 起；同上 V 系列；13.8 英寸 20 小时 / 15 英寸 22 小时。不得再写 135H 或 11.5 TOPS。
- **Hub 3 (`hub-3`)**：企业询价，中国商城无零售起售价 → `not_disclosed`。交流供电，**禁止写电池续航**。信源：Microsoft Learn tech specs。

### C3. 已从国行新品页撤下（不得再标 `current_cn`）
消费购机页「选择你的全新 Surface」仅保留 Pro 12/13 与 Laptop 13/13.8/15（第 8 代）。以下现网只剩认证翻新、404 或已撤下，状态改为 `discontinued`：
`pro-11-13`、`laptop-7-138`、`laptop-7-150`、`pro-10-biz`、`laptop-6-biz`、`sls-2`、`sls-2-biz`、`go-4`、`laptop-go-3`、`laptop-go-3-biz`、`studio-2-plus`、`studio-2-plus-biz`。

### D. 完整谱系结构 (共 70 款设备，消费版与商用版彻底物理隔离)
- **商用版与消费版彻底解耦**: 全系收录 70 款设备（消费版 40 款，商用版 30 款），从导航侧边栏、路由（`#/consumer/` 与 `#/business/`）、系列卡片、参数对比表到底部官方信源完全独立闭环，杜绝任何商用跳转消费的错位体验。
- **消费版产品谱系 (40 款，8 大系列)**:
  - Surface Pro 消费系列 (14款)
  - Surface Laptop 消费系列 (9款，含 Laptop 13 英寸与 Laptop 7 15 英寸)
  - Surface Laptop Studio 消费系列 (2款)
  - Surface Book 消费系列 (3款)
  - Surface Go 消费系列 (3款)
  - Surface Laptop Go 消费系列 (3款)
  - Surface Studio 消费系列 (4款)
  - Surface Duo 消费系列 (2款)
- **商用版产品谱系 (30 款，7 大系列，对齐 Microsoft Learn System SKU 参考表与 CommercialCofig)**:
  - Surface Pro 商用系列 (9款: Pro 12-13 Intel/Snap, Pro 12 Biz, Pro 11 Intel/Snap, Pro 10, Pro 9 Biz, Pro 8 Biz, Pro 7+, Pro 6 Biz)
  - Surface Laptop 商用系列 (8款: Laptop 8 13.8/15 Intel/Snap, Laptop 13 Biz Snap/Intel, Laptop 7 Biz Intel/Snap, Laptop 6, Laptop 5 Biz)
  - Surface Laptop Studio 商用系列 (2款: SLS 2 Biz, SLS 1 Biz)
  - Surface Book 商用系列 (1款: Book 3 Biz 独占 Quadro RTX 3000)
  - Surface Go 商用系列 (3款: Go 4, Go 3 Biz, Go 2 Biz)
  - Surface Laptop Go 商用系列 (1款: Laptop Go 3 Biz)
  - Surface Hub & Studio 商用系列 (6款: Hub 3 50/85, Hub 2S, Studio 2+ Biz 等)

---

## 3. Strict Exclusions & Compliance Redlines

1. **只收录大陆国行口径**：
   - 档案数字必须来自微软中国商城、国行 Support / 国行新闻，或国行认证翻新规格表。
   - 美区、欧区、港台、东南亚商城或外区 Support 的配置、SKU、尺寸、重量、电池不得填入国行档案。国行没写就标 `not_disclosed`。
2. **Surface Pro 12-inch Official Inclusion**:
   - 微软官方商城（`microsoftstore.com.cn/commercial`）重点在售核心机型，必须全面收录其 13 大类权威参数。
3. **Superseded Generations**:
   - Do not refer to 11th edition or 7th edition as the latest flagship. Current flagships are Pro 13 (12th Gen), Pro 12-inch, and Laptop (8th Gen).
4. **Promotions & Giveaways**:
   - **Strictly prohibit inventing unauthorized discounts, vouchers, or free gifts**.
   - Pricing language: "以微软官方商城实时页面标价与活动为准" (Prices strictly subject to official real-time tags).
5. **Internal Routing Terms**:
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
