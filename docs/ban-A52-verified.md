# BAN A52 核验落库摘要

- 生成时间：2026-09-22 09:36 CST (Asia/Shanghai)
- 输入：`/tmp/surfacehub-ban-A52-results.json`（52 条，全部 VERIFIED）
- 分支：`fix/p0-spec-verification-20260922`（PR #1）
- 数据落地 commit：`7fcf12c52e632035967c4f638e1e37fa3f012c07`
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

## 全库闭合后计数（576）

| verdict | count |
|---|---:|
| VERIFIED | 437 |
| POLICY_SAFE_NOT_DISCLOSED | 43 |
| POLICY_SAFE_NOT_APPLICABLE | 39 |
| POLICY_SAFE_PRICE_UNAVAILABLE | 57 |
| PENDING / MISMATCH / UNREVIEWED / BAD_URL | 0 |

## 交付

- `docs/ban-A52-surface-data.patch.b64`
- `docs/full-library-verification-registry.json`（最终版，SHA-256 `e989ead3…`）
- `docs/ban-A52-verified.md`（本摘要）
- `docs/full-library-verification-final.md`（远端落地复验，`canClaimSafe100Percent=true`）
