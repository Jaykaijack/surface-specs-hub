# Microsoft Surface 产品体系分类与状态规范 (Surface Taxonomy)

## 1. 产品一级分类架构 (Top-Level Categories)

本系统将 Microsoft Surface 历代硬件归类为 8 大核心设备家族 + 1 大定制处理器芯片库 + 1 大配件库：

```
Surface Product Hub
├── 1. Surface Pro 系列 (二合一平板生产力旗舰)
├── 2. Surface Laptop 系列 (经典触控轻薄本)
├── 3. Surface Laptop Studio 系列 (三段式变形图形工作站)
├── 4. Surface Book 系列 (可拆卸铰链独显性能本 - 历史经典)
├── 5. Surface Go 系列 (轻巧便携二合一)
├── 6. Surface Laptop Go 系列 (灵动入门轻薄本)
├── 7. Surface Studio & Hub 系列 (28" 一体机与巨幕会议白板)
├── 8. Surface Duo 系列 (双屏铰链移动折叠手机 - 探索经典)
├── 9. 微软定制处理器与芯片库 (Snapdragon X, SQ, Core Ultra, AMD SE)
└── 10. Surface 配件与互联生态 (Flex 键盘, Slim Pen 2, Surface Dock)
```

---

## 2. 产品生命周期与销售状态机 (Product Status Lifecycle)

为兼顾“快速找在售”与“查阅历史全代际”，每个设备均打上严格的状态标签：

| 状态码 (Status Key) | 显示名称 | 业务定义 | 默认展示策略 |
| :--- | :--- | :--- | :--- |
| `current_cn` | **国行在售** | 微软中国官方商城 / 抖音官方旗舰店正式在售主力机型 | 首页与分类默认置顶显示 |
| `current_global` | **海外在售** | 微软海外市场在售，但未在国行官方正规渠道发售 | 筛选可选查看 |
| `upcoming` | **即将发售** | 微软官方已正式发布或预告，尚未正式现货开售 | 带“即将发售”醒目标签 |
| `discontinued` | **正式停售** | 官方已停止销售，但处于支持周期内的前代机型 | 归入历史对比库 |
| `legacy` | **历史机型** | 早期经典机型 (2012 ~ 2018 初期代际)，已进入技术归档 | 归入历史对比库 |
| `region_limited` | **特定市场** | 仅供特定国家运营商或政府教育采购的特殊型号 | 标记区域范围 |

---

## 3. 双轨产品线区分：消费者版 (Consumer) vs 商用版 (Business)

在 Surface 体系中，同代产品常存在清晰的商用版与消费者版分野（如 Surface Pro 11 Snapdragon vs Surface Pro 10 Commercial Intel Ultra；Surface Laptop 7 vs Laptop 6 Commercial）：

- **消费者版 (Consumer)**：
  - 侧重：消费娱乐、AI 原生体验、高通高能效架构 (ARM64)、轻巧时尚外观、Windows 11 家庭版；
  - 典型：Surface Pro 13 (第12代)、Surface Laptop 13.8"/15" (第8代)、Surface Pro 11、Surface Laptop 7。
- **商用版 (Commercial / for Business)**：
  - 侧重：传统 x86 遗留工业软件 100% 兼容、Intel Core Ultra / vPro 硬件安全、NFC 安全密钥卡登录、反射抑制防眩光涂层、Windows 11 专业版、可更换备件全周期供应；
  - 典型：Surface Pro 10 商用版、Surface Laptop 6 商用版、Surface Go 4 商用版。

系统支持按“全部 / 消费者版 / 商用版”快速切换过滤。
