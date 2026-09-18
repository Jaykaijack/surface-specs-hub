# CONTEXT.md

Project domain model, hardware specifications, compliance redlines, and architectural constraints for the Microsoft Surface Specs Hub (微软 Surface 全系产品参数中心).

## 1. Project Background & Purpose

This project is a high-density, authoritative technical reference platform modeled after `HubWeb.cn`, engineered specifically for the entire Microsoft Surface product ecosystem (2012 - 2026). It serves training needs for livestream teams, sales consultants, tech enthusiasts, and IT procurement decision-makers.

## 2. Hardware Lineup & Technical Specifications (2026 / FY27)

All hardware represented in the Specs Hub must reflect official Microsoft technical whitepapers, architectural disclosures, and the official Microsoft Store China (`https://www.microsoftstore.com.cn/`).

### A. Surface Pro 13 英寸（第 12 代）[核心主推旗舰]
- **Target SKU Anchor**: Surface Pro 13 英寸 (第 12 代), Qualcomm Snapdragon® X2 Elite, PixelSense Flow OLED 触控屏, 16GB/32GB/64GB RAM, 512GB/1TB/2TB SSD.
- **Form Factor**: 旗舰二合一分离式平板电脑，阳极氧化铝合金机身，单机净重约 895g，165° 一体成型无级阻尼铰链支架。
- **Display**: 13.0 英寸 PixelSense Flow OLED 触控屏（2880 × 1920，3:2 效率黄金比例，100万:1 对比度，120Hz 动态高刷，支持杜比视界 IQ）。
- **Platform**: 高通第二代骁龙® X2 Elite（12 核 Oryon 架构），内置高达 80 TOPS 硬件算力的 Qualcomm Hexagon NPU（全球 AI 算力巅峰）。
- **Key Accessories**: Surface Pro Flex 键盘（支持离机蓝牙无线打字与磁吸直连双模，自带隐藏式笔槽无线充电）与 Surface 超薄触控笔 2（4096 级压感与触觉振动反馈）。
- **Official Colorways**: 亮铂金 (Platinum)、典雅黑 (Black)、沙漫金 (Dune) 官方三色（严格按微软官方商城商业专区在售真实规格，无宝石蓝）。

### B. Surface Laptop 13.8 英寸与 15 英寸（第 8 代）[核心主推旗舰]
- **Target SKU Anchor**: Surface Laptop 13.8 英寸 & 15 英寸 (第 8 代), Qualcomm Snapdragon® X2 Elite, PixelSense 触控屏, 16GB/32GB/64GB RAM.
- **Form Factor**: 极简全金属精工超轻薄笔记本，13.8" 净重约 1.34kg，15" 净重约 1.66kg，支持单手丝滑开合。
- **Display**: 13.8 英寸 (2304 × 1536) / 15.0 英寸 (2496 × 1664) PixelSense 触控屏，3:2 纵向黄金视野，超窄微边框，120Hz 动态高刷。
- **Platform**: 高通第二代骁龙® X2 Elite，全铝合金均热板静音温凉散热。
- **Battery**: 本地视频播放长达 20~22 小时，日常综合办公离电 10~12 小时。
- **Keyboard & Touchpad**: 全域触觉振动触控板（Haptic Precision Touchpad），1.3mm 键程静音剪刀脚键盘。
- **CRITICAL REDLINE**: 屏幕支持手指十点触控，但**绝对不支持触控笔输入**（严禁为 Laptop 标注或推荐手写笔）。
- **Official Colorways**: 亮铂金 (Platinum)、典黑 (Black)、沙漫金 (Dune)、宝石蓝 (Sapphire)、仙踪绿 (Sage)。

### C. Commercial Editions (x86 Compatibility) & 12-inch Portable Lineup
- **Surface Pro 12-inch (1st Edition)**: 微软官方商城商业专区与 Learn 重点在售轻薄 Copilot+ PC（高通骁龙 X Plus 8 核，686g 羽量机身，2196×1464 屏幕）。
- **Surface Pro, 13 英寸(第 12 代) 商用版** 与 **Surface Laptop (第 8 代) 商用版**: 涵盖高通 X2 与 Intel 酷睿 Ultra 架构。
- **Surface Pro 10 Commercial** & **Surface Laptop 6 Commercial**: Powered by Intel® Core™ Ultra processors (Meteor Lake) with Intel AI Boost NPU, designed for legacy enterprise industrial software and hardware dongle compatibility.

### D. Historical Full Genealogy (8 大品类、43 款机型全覆盖)
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
