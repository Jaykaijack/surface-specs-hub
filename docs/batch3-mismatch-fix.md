# Batch3 MISMATCH 修复说明（2026-09-22）

范围：Batch3（早期 legacy + 全部 discontinued）的核验报告中的 **6 条 MISMATCH**。  
分支：`fix/p0-spec-verification-20260922`（PR #1）。数据文件：`js/surface-data.js`。  
口径：仅采用微软公开渠道的明确值；值内附官方出处。官方未披露时必须写 `not_disclosed`，不得猜测。本批 6 条均有明确官方值，因此没有使用 `not_disclosed`。

| # | 机型.字段 | 原值 | 最终值 | 微软公开出处 |
|---|-----------|------|--------|--------------|
| 1 | `pro-4.batteryCapacityWh` | 38.2 Wh | 39.47 Wh（PDS 额定） | https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/legal-compliance-and-ethics/Microsoft_Lithium_Ion_PDS_1July2025C.pdf |
| 2 | `book-2-15.cpuModel` | Intel® 第 8 代酷睿™ i7-8650U | Intel® 第 8 代酷睿™ i5-8350U / i7-8650U（15 英寸官方配置） | https://support.microsoft.com/en-us/surface/models/surface-book-2-specs-and-features |
| 3 | `book-2-15.batteryCapacityWh` | 90.0 Wh（底座 72 Wh + 平板 18 Wh） | 85.4 Wh（顶盖 23.2 Wh + GPU 底座 62.2 Wh，PDS 额定） | https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/legal-compliance-and-ethics/Microsoft_Lithium_Ion_PDS_1July2025C.pdf |
| 4 | `book-1.batteryCapacityWh` | 69.0 Wh（底座 51 Wh + 平板 18 Wh） | 71.66 Wh（屏幕 18.90 Wh + 底座 52.76 Wh，PDS 额定） | https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/legal-compliance-and-ethics/Microsoft_Lithium_Ion_PDS_1July2025C.pdf |
| 5 | `studio-1.cpuModel` | Intel® 第 6 代酷睿™ i5-6440HQ / i7-6700HQ | Intel® 第 6 代酷睿™ i5-6440HQ / i7-6820HQ | https://news.microsoft.com/windows-event-2016-assets/Surface-Studio-Fact-Sheet.pdf |
| 6 | `pro-8-biz.cpuModel` | 第 11 代英特尔® 酷睿™ i5-1145G7 / i7-1185G7 | 第 11 代英特尔® 酷睿™ i3-1115G4 / i5-1145G7 / i7-1185G7（商用版） | https://news.microsoft.com/wp-content/uploads/prod/sites/617/2021/09/Surface-Pro-8-Fact-Sheet.pdf |

## 交付方式

新增 `docs/batch3-surface-data.patch.b64`，由既有 Actions 工作流 `p0-apply-surface-data-patch` 按 P0 → Batch1 → Batch2 → Batch3 顺序还原并应用补丁，再提交大文件 `js/surface-data.js`。工作流同时校验本批 6 条最终值。

本说明仅闭合 Batch3 上述 6 条 MISMATCH，不宣称其余 BAN 项已修复。
