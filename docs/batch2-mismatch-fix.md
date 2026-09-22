# Batch2 MISMATCH 修复说明（2026-09-22）

范围：`status=legacy`、`year>=2018` 的 Batch2 核验报告中的 **7 条 MISMATCH**。
分支：`fix/p0-spec-verification-20260922`（PR #1）。数据文件：`js/surface-data.js`（字段名 `batteryCapacityWh` / `resolution`）。
口径：值必须带微软公开出处；官方未披露或官方渠道冲突时写 `not_disclosed` / 明确禁讲，不猜数。锂电池 Wh 以微软锂电池 PDS 额定值为准；产品页 typical mAh 可并列，不换算冒充 Wh。

| # | 机型.字段 | 原值 | 新值 | 出处 |
|---|-----------|------|------|------|
| 1 | `duo-2.batteryWh` | 17.1 Wh (4449 mAh 双电芯并联) | 16.70 Wh 额定（PDS 13.96 Wh + 2.74 Wh）；产品页另列 4449 mAh typical 双电芯 | https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/legal-compliance-and-ethics/Microsoft_Lithium_Ion_PDS_1July2025C.pdf |
| 2 | `pro-7-plus.batteryWh` | 50.4 Wh | `not_disclosed`（Support/Store 标称 47.4 Wh、最小 45.8 Wh；PDS 额定 48.9 Wh，口径冲突，禁讲单一 Wh） | https://www.microsoft.com/en-us/p/surface-pro-7-for-business/8p43n3k93409 |
| 3 | `book-3-135.batteryWh` | 69.0 Wh (底座 51Wh + 屏幕 18Wh) | 非GPU：顶盖 18 Wh + 底座 54.8 Wh = 72.8 Wh；GPU：顶盖 18 Wh + 底座 57.3 Wh = 75.3 Wh（PDS 额定） | https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/legal-compliance-and-ethics/Microsoft_Lithium_Ion_PDS_1July2025C.pdf |
| 4 | `book-3-15.batteryWh` | 85.0 Wh (底座 67Wh + 屏幕平板 18Wh) | 85.4 Wh（顶盖 23.2 Wh + GPU 底座 62.2 Wh，PDS 额定） | https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/legal-compliance-and-ethics/Microsoft_Lithium_Ion_PDS_1July2025C.pdf |
| 5 | `duo-1.batteryWh` | 13.8 Wh (3577 mAh 双电芯并联) | 13.5 Wh 额定（PDS 10.7 Wh + 2.8 Wh）；Support 另列 3577 mAh typical 双电芯 | https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/legal-compliance-and-ethics/Microsoft_Lithium_Ion_PDS_1July2025C.pdf |
| 6 | `hub-2s.resolution` | 3840 × 2560 (50 英寸 4K+ 3:2) | 50 英寸 3840 × 2560 (3:2)；85 英寸 3840 × 2160 (16:9) | https://learn.microsoft.com/en-us/surface-hub/surface-hub-2s-techspecs ；https://learn.microsoft.com/en-us/surface-hub/surface-hub-2s-85 |
| 7 | `go-1.batteryWh` | 26.1 Wh | 26.77 Wh（PDS 额定） | https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/legal-compliance-and-ethics/Microsoft_Lithium_Ion_PDS_1July2025C.pdf |

推送：新增 `docs/batch2-surface-data.patch.b64`（相对当前 P0+Batch1 后的 `js/surface-data.js` 增量），由 Actions `p0-apply-surface-data-patch` 依次应用 P0 → Batch1 → Batch2 patch → 提交 `js/surface-data.js`。

本说明不宣称全库百分百；仅闭合 Batch2 上述 7 条 MISMATCH。
