# Batch1 MISMATCH 修复说明（2026-09-22）

范围：`status=current_cn` Batch1 核验报告中的 **6 条 MISMATCH**（未跑 Batch2）。
分支：`fix/p0-spec-verification-20260922`（PR #1）。数据文件：`js/surface-data.js`。

| # | 机型.字段 | 修正后 | 出处 |
|---|-----------|--------|------|
| 1 | `pro-12-13-snap.batteryCapacityWh` | LCD 额定 53 Wh / OLED 额定 47 Wh；注明与全球页 LCD47/OLED53 冲突，对华以国区商城为准 | https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch-for-business-snapdragon |
| 2 | `pro-12-inch-biz.startingPriceCny` | ¥9,788 起（以商用汇总/实时页为准） | https://www.microsoftstore.com.cn/commercial |
| 3 | `pro-11-biz-intel.npuTops`（及 `npuModel` 同步） | 40/48 TOPS（Intel AI Boost，按 Ultra 5/7 SKU） | https://learn.microsoft.com/en-us/surface/tech-specs/surface-pro-intel-tech-specs |
| 4 | `laptop-7-biz-intel.touchAndPenProtocol` / `penCompat` | 不支持触控笔 | https://www.microsoft.com/en-us/surface/business/surface-laptop-for-business-models（官方说明仅优化触控交互，不支持笔输入） |
| 5 | `laptop-7-biz-intel.startingPriceCny` | ¥14,488 起（以实时页为准） | https://www.microsoftstore.com.cn/commercial |
| 6 | `laptop-go-3-biz.touchAndPenProtocol` / `penCompat` | 不支持手写笔（与消费版一致） | https://www.microsoft.com/en-us/surface/business/surface-laptop-go-3 |

推送：新增 `docs/batch1-surface-data.patch.b64`（相对 PR 原 HEAD `37ba3de` 的增量），由 Actions `p0-apply-surface-data-patch` 依次应用既有 P0 patch 与 Batch1 增量 patch → 提交 `js/surface-data.js`。

本说明不宣称全库百分百；仅闭合 Batch1 上述 6 条 MISMATCH。
