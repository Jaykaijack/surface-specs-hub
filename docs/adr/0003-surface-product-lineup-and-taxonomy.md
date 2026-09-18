# ADR-0003: 确立 Surface 全系 8 大品类谱系规范与 12 英寸排除红线

## 状态
已采纳 (Accepted) - 2026-09-16

## 上下文
微软 Surface 拥有从 2012 年至 2026 年长达 14 年的产品演进历程，形态涵盖二合一、传统笔记本、分体变形本、巨幕一体机与双屏折叠机。
在业务定位与合规上，业务负责人明确强调：
1. 2026 最新主推旗舰必须为 **Surface Pro 13 英寸 (第 12 代)** 与 **Surface Laptop (第 8 代)**。
2. **严禁收录或混淆 Surface Pro 12 英寸版本**（明确业务禁令：“12 英寸的版本先不用”）。
3. 严格区分消费版与商用版（如 Pro 10 商用版与 Laptop 6 商用版）。

## 决策
1. **8 大标准品类树**：
   - `pro` (Surface Pro 系列，14款)
   - `laptop` (Surface Laptop 系列，9款)
   - `sls` (Surface Laptop Studio 系列，2款)
   - `book` (Surface Book 系列，4款)
   - `go` (Surface Go 系列，4款)
   - `laptopgo` (Surface Laptop Go 系列，3款)
   - `studio` (Surface Studio & Hub 系列，4款)
   - `duo` (Surface Duo 系列，2款)
2. **严格排除红线**：
   - 数据库及前端界面彻底剔除任何 12 英寸 Pro 机型，自动化测试添加硬性校验。
3. **Copilot+ PC 准入门槛红线**：
   - 严格遵循微软官方 40 TOPS NPU 算力门槛，凡搭载骁龙 X 系列、Intel Lunar Lake、AMD Strix Point 等 >=40 TOPS 机型标注 Copilot+ PC 认证徽标。

## 后果
- **优势**：
  - 谱系清晰完备，完全覆盖 2012-2026 全历史 42 款机型。
  - 严守客户业务禁令与合规红线，绝不发生越界错误。
