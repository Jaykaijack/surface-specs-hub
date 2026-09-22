# SurfaceHub 全库核验报告（已撤销安全 100% 宣称）

- **时间**：2026-09-22 10:05 CST（Asia/Shanghai）
- **仓库**：Jaykaijack/surface-specs-hub
- **分支**：`fix/p0-spec-verification-20260922`
- **PR**：https://github.com/Jaykaijack/surface-specs-hub/pull/1

## 结论（强制）

**`canClaimSafe100Percent` = false**

### 撤销原因

1. **假徽章**：`js/app.js` 全量规格表核验列曾写死「✓ 已核验」，不读取 `docs/full-library-verification-registry.json`。用户截图已证实 UI 与官网页/registry 不一致。现已改为读取 `js/verification-status.js`（由 registry 派生）。
2. **消费价 404 回退**：设备 `pro-12-13`（消费）原消费专页 `https://www.microsoftstore.com.cn/surface/surface-pro-12th-edition-13-inch` 实测 **HTTP 404**；`startingPriceCny` 必须为 `price_unavailable`（POLICY_SAFE_PRICE_UNAVAILABLE），禁止口播具体国行消费价（含旧值 ¥11,988）。
3. **NPU 笼统口播风险**：消费汇总行不得笼统说「80 TOPS」；须分列骁龙 80 / Intel 50。

此前报告中的 `canClaimSafe100Percent = true` **作废**，不得再对外宣称。

## 本轮 P0 hotfix

| 项 | 处理 |
|---|---|
| 核验列 | `getDeviceVerificationBadge(deviceId)` 读 `VERIFICATION_STATUS.byDeviceId` |
| pro-12-13 价 | `price_unavailable（消费专页 404…）` + registry POLICY_SAFE_PRICE_UNAVAILABLE |
| pro-12-13 NPU | `骁龙 X2：80 TOPS；Intel Core Ultra 第3代：50 TOPS（勿笼统说80）` |
| pro-12-13 officialDocUrl | 改用仍 200 的商用汇总页，并注明消费专页 404 |
| pro-12-inch 价 | ¥6,788 起 + 实时选配页 caveat（测试断言 7888→6788） |
| 商用 pro-12-13-snap / intel | ¥15,488 / ¥16,888 保留（与商城 200 页一致） |

## 核验列显示规则

- 9 个关键口播字段全部 `VERIFIED` → **已核验**（绿）
- 存在 `POLICY_SAFE_*` 且无 `PENDING`/`MISMATCH` → **部分可讲/政策禁讲**（橙）
- 任一关键字段 `PENDING`/`MISMATCH`/缺 registry → **待核验**（红/橙），禁止显示已核验

## 截图相关机型预期徽章

| deviceId | 预期核验列 |
|---|---|
| pro-12-13 | 部分可讲/政策禁讲（价 POLICY_SAFE） |
| pro-12-inch | 已核验 |
| pro-12-13-intel | 已核验 |
| pro-12-13-snap | 已核验 |
