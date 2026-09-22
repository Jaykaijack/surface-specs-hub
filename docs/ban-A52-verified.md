# BAN A52 核验落库摘要

- 生成时间：2026-09-22 09:21 CST (Asia/Shanghai)
- 输入：`/tmp/surfacehub-ban-A52-results.json`（52 条，全部 VERIFIED）
- 分支：`fix/p0-spec-verification-20260922`（PR #1）
- 数据文件：`js/surface-data.js`
- 基线远端 commit：`bf6258a1`（215 条自动闭合后，PENDING=52）

## 落库规则

- 按 `recommendedValue` 更新对应 `specs` 字段；若值已正确则仅补 registry / source。
- **不覆盖**本轮已修 P0 / Batch1 / Batch2 / Batch3 字段。
- registry 对应 52 条全部改为 `VERIFIED`，写入 `sourceUrl` / `evidenceQuote`；**不得留 PENDING**。

## 统计

| 项 | 数量 |
|---|---:|
| A52 输入 | 52 |
| 全部 VERIFIED | 52 |
| JS 字段文本实际变化 | 48 |
| 值已正确仅补 registry | 4 |

## 交付

- `docs/ban-A52-surface-data.patch.b64`（gzip+base64 增量补丁）
- `docs/full-library-verification-registry.json.gz.b64`（最终 registry）
- `docs/ban-A52-verified.md`（本摘要）
- Actions `p0-apply-surface-data-patch` 还原并提交大文件 `js/surface-data.js` 与 registry JSON

明细 52 条见输入 JSON；全库 100% 结论见 `docs/full-library-verification-final.md`（远端落地复验后）。
