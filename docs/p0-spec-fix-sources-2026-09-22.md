# P0 规格修正出处（2026-09-22）

强制规则：口播字段必须可追溯到微软公开渠道；未核验禁讲。

| 机型 | 字段 | 修正后 | 出处 |
|------|------|--------|------|
| laptop-8-150-* | resolution | 3270×2180 | microsoft.com Surface Laptop 规格；微软中国商城商用第8代 15″ 页 |
| pro-12-13-intel | batteryCapacityWh | LCD 47Wh / OLED 53Wh | 微软中国商城 Surface Pro 13″ 第12代 Intel 商用规格 |
| pro-12-13-snap | batteryCapacityWh | LCD 47Wh / OLED 53Wh | 微软中国商城 Surface Pro 13″ 第12代骁龙商用规格 |
| pro-12-13 | batteryCapacityWh | 约 47–53Wh | 同上商用同源（消费专页曾 404） |
| hub-3 | touchAndPenProtocol | 50″ 10点+2笔 / 85″ 20点+2笔 | https://learn.microsoft.com/en-us/surface-hub/surface-hub-3-techspecs |
| pro-12-inch | startingPriceCny | ¥6,788 起 | 微软中国商城选配页（实时价为准） |
| laptop-7-biz-snap | penCompat / touchAndPenProtocol | 不支持触控笔 | microsoft.com Surface Laptop for Business 规格 |
| go-4 | batteryCapacityWh | 标准 29Wh（最小约 28Wh） | 微软公开 Surface Go 4 规格 |

说明：历史机型上的 `2496×1664`（如 Laptop 5/7 15″）未改，因非本轮 P0 冲突项。价格类字段一律标注「以实时页为准」。渠道不限于中国商城，凡微软公开渠道均可，但必须写明出处。


## 闭合说明（2026-09-22）

- P0 冲突项（分辨率/Pro13电池/Hub3触控/Pro12寸价/Laptop7笔/Go4电池/snap电池分列）已按微软公开渠道对齐并标注出处。
- Go4 **中国区全新官价**无公开在售页可核：政策为禁讲国内全新官价；可引用美国商城公开美元价并必须声明不可换算为国内官价。
- **不宣称**全库 64 台 / 全部 current_cn 字段百分百；仅宣称本轮 P0 冲突清单已闭合。
