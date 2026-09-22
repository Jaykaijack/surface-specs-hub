# BAN 自动闭合落库报告

- 生成时间：2026-09-22T09:14:11+08:00（UTC+8）
- 输入计划：`/tmp/surfacehub-ban-closure-plan.json`
- 数据基线：PR 分支 `fix/p0-spec-verification-20260922` 的最新 raw `js/surface-data.js`
- 自动闭合合计：**215**
- Remaining：**52**（仅 A 类；本轮按规则不修改）

## 分类与落库数

| 分类 | 计划中信息完整 | 已落库 | JS 字段文本实际变化 | 处理 |
|---|---:|---:|---:|---|
| B. POLICY_SAFE_NOT_DISCLOSED | 43 | 43 | 43 | 写 `not_disclosed`，附微软公开资料未披露、禁用推测值及官方核验源 |
| C. POLICY_SAFE_NOT_APPLICABLE | 39 | 39 | 5 | 写 `not_applicable` |
| D. POLICY_SAFE_PRICE_UNAVAILABLE | 57 | 57 | 57 | 写 `price_unavailable`，明确禁讲区域/历史官价，并记录已尝试官方源 |
| E. BAD_URL_ONLY | 54 | 54 | 54 | 替换为计划推荐的微软公开 URL |
| F. DATA_MISSING_NEEDS_FIX | 22 | 22 | 22 | 仅按计划同时具备微软 `sourceUrl` 与推荐值的条目补录 |
| **合计** | **215** | **215** | **181** | A 类未改 |

> “已落库”包含数据字段、政策 verdict 和官方来源绑定；部分条目若前序修复后已与目标一致，则“JS 字段文本实际变化”可能小于落库数。

## Registry

新增 `docs/full-library-verification-registry.json`：64 台设备 × 9 字段 = 576 条。

- VERIFIED：385
- POLICY_SAFE_NOT_DISCLOSED：43
- POLICY_SAFE_NOT_APPLICABLE：39
- POLICY_SAFE_PRICE_UNAVAILABLE：57
- PENDING：52

## Remaining（A 类，不修改）

共 **52** 条，详见 registry 中 `verdict=PENDING` 的条目；其微软线索源已录入 `sourceUrl`，继续逐值复核后才能转为 VERIFIED。
