# Surface Specs Hub · Fluent 2 Design System Specification (v2.1.0)

> 本规范遵循《surface.kaibase.cn 网站优化改进 PRD · v1.0》第三章「设计重塑原则」与第十一章「设计系统要求 (D-1)」，为「Surface 参数中心 · 民间资料库」提供统一的设计语言、Design Tokens、组件行为与微动效准则。

---

## 1. 设计哲学与核心原则

1. **客观中性与工业理性 (Neutral & Rational)**
   - 参数数据库的生命线是客观真实，界面严禁喧宾夺主。
   - 去除所有浮夸宣传修饰，以清晰的数据组织、高对比度可读性为第一优先级。
2. **高信息密度与双轴冻结 (High Information Density)**
   - 借鉴 HubWeb.cn 经典三栏布局与 Excel 级对比能力，首列参数名 sticky 粘性悬浮、表头机型卡片 sticky 悬浮。
   - 紧凑排版、最小化无效空白，一屏尽览关键指标。
3. **Fluent 2 & Windows 11 设计触感 (Fluent Touch)**
   - 贯彻 Microsoft 官方 Fluent 2 设计语言规范（Mica 质感、Acrylic 亚克力半透明、柔和描边与深度阴影）。
   - 原生支持系统深色模式（Dark Mode）与浅色模式（Light Mode）无缝平滑切换。
4. **无障碍先行 (WCAG 2.2 AA Compliance)**
   - 核心文本色彩对比度严格大于 4.5:1。
   - 全局支持键盘 Tab 导航跳跃（`:focus-visible`）与系统级减弱动态偏好（`prefers-reduced-motion`）。

---

## 2. Design Tokens 设计令牌

### 2.1 色彩系统 (Color Tokens)

```css
:root {
  /* 品牌与主强调色 (Fluent Blue) */
  --ms-accent: #0078d4;
  --ms-accent-hover: #106ebe;
  --ms-accent-active: #005a9e;
  --ms-accent-subtle: rgba(0, 120, 212, 0.08);

  /* 状态与指示色 */
  --ms-status-success: #107c41;   /* 在售 / 国行现役 / 官方核验 */
  --ms-status-warning: #ffaa44;   /* 即将发售 / 官方预告 */
  --ms-status-neutral: #8a8886;   /* 已停售 / 历史机型 */
  --ms-status-danger: #d13438;    /* 错误 / 冲突 / 重置 */

  /* 差异比对高亮色 */
  --ms-highlight-diff: rgba(0, 120, 212, 0.12);
  --ms-highlight-diff-border: rgba(0, 120, 212, 0.35);

  /* 浅色主题表面 (Light Surface) */
  --ms-bg-page: #f8f9fa;
  --ms-bg-card: #ffffff;
  --ms-bg-card-hover: #f3f4f6;
  --ms-bg-card-secondary: #f0f2f5;
  --ms-border-subtle: #e5e7eb;
  --ms-border-strong: #d1d5db;
  --ms-text-primary: #111827;
  --ms-text-secondary: #4b5563;
  --ms-text-tertiary: #6b7280;
}

[data-theme="dark"] {
  /* 深色主题表面 (Dark Surface) */
  --ms-bg-page: #121212;
  --ms-bg-card: #1e1e1e;
  --ms-bg-card-hover: #292929;
  --ms-bg-card-secondary: #252525;
  --ms-border-subtle: #333333;
  --ms-border-strong: #444444;
  --ms-text-primary: #f9fafb;
  --ms-text-secondary: #d1d5db;
  --ms-text-tertiary: #9ca3af;
  --ms-highlight-diff: rgba(0, 120, 212, 0.22);
  --ms-highlight-diff-border: rgba(0, 120, 212, 0.50);
}
```

### 2.2 间距与栅格系统 (Spacing & Grid)

- **基准单位**: 8px (4px 细微调节 / 8px 基础 / 12px 适中 / 16px 标称 / 24px 大块 / 32px 栏目 / 48px 英雄区)
- **容器与栅格**:
  - 桌面端（Desktop > 1024px）: 三栏布局（左侧栏 260px，中央工作区自适应，右侧抽屉 380px）
  - 机型卡片网格: `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;`
  - 移动端（Mobile <= 768px）: 单栏自适应，左侧栏折叠为抽屉汉堡菜单，触控靶心保证 `>= 44px * 44px`。

### 2.3 排版字阶 (Typography Scale)

| 级别 | 字号 | 行高 | 字重 | 典型应用 |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 28px - 32px | 1.25 | 700 Bold | 详情页大标题、首页 Hero 主标 |
| **Title 1** | 20px - 22px | 1.3 | 700 Bold | 各大版块标题（国行在售、消费系列） |
| **Title 2** | 16px - 18px | 1.4 | 600 SemiBold | 卡片主标题、弹窗标题 |
| **Body** | 13.5px - 14px | 1.5 | 400 Regular / 500 Medium | 正文、参数值、说明段落 |
| **Caption** | 11.5px - 12px | 1.4 | 400 Regular / 600 SemiBold | 徽标、标签、更新时间、次要参数 |

- **字体栈**: `font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;`

### 2.4 圆角与阴影 (Radius & Elevation)

- **圆角**:
  - `var(--ms-radius-sm)`: 4px（徽标 Badge、状态指示小药丸）
  - `var(--ms-radius-md)`: 8px（输入框、次级卡片、对比单元格）
  - `var(--ms-radius-lg)`: 12px（机型卡片、弹窗模态框）
  - `var(--ms-radius-full)`: 9999px（主操作按钮、搜索框）
- **阴影**:
  - 卡片静态: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);`
  - 卡片悬浮: `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); transform: translateY(-2px);`
  - 浮窗 Toast / Dock: `box-shadow: 0 12px 36px rgba(0, 0, 0, 0.28);`

### 2.5 克制微动效 (Micro-Interactions)

- **缓动曲线**: `cubic-bezier(0.16, 1, 0.3, 1)`（自然回弹）与 `cubic-bezier(0.4, 0, 0.2, 1)`（标准平滑）。
- **持续时间**:
  - 快速微反馈（Hover / Active）: 150ms
  - 视图切换与抽屉展开: 240ms
  - 骨架屏微光流动: 1500ms 循环
- **减弱动效降级**: 遵循 `@media (prefers-reduced-motion: reduce)`，动效时间直接压缩为 0.01ms。

---

## 3. 全态反馈规范 (Feedback States)

1. **骨架屏加载状态 (Skeleton Pulse)**
   - 在数据解析或初次渲染前，使用波浪渐变占位块呈现布局轮廓，消除白屏突兀感。
2. **空状态引导 (Empty States)**
   - 搜索无结果：提供清晰的文字提示、友好示意图与“清空搜索词”操作按钮。
   - 对比托盘为空：提示“请在任意机型卡片勾选右上角进行横向比对”，并提供一键加入推荐旗舰机型操作。
3. **离线断网自洽 (Offline Toast)**
   - 网络断开即时呼出悬浮通知，明确告知用户“全站参数已内嵌离线保存，可继续高速浏览”。

---

## 4. 招牌体验：Surface 14 年演进编年史

- 设立专属时间轴中枢（`#/timeline`），以时间分水岭串联 2012-2026 硬件演进：
  - 2012: 初代 Surface RT / Pro（二合一形态创立）
  - 2015: Surface Book（动态支点铰链 + 独立显卡分离）
  - 2016: Surface Studio（零重力铰链 + 28 寸大画布）
  - 2020: Surface Duo（双屏便携计算新尝试）
  - 2024: Copilot+ PC 开启（高通骁龙 X 架构革命）
  - 2026: 骁龙 X2 80 TOPS 旗舰代际（多模态 AI 生产力全面落地）
