/**
 * tests/g3-redesign.test.js
 * 
 * 阶段 3 · 重塑实施（验收门 G3）自动化门禁测试套件
 * 严格按照《surface.kaibase.cn 网站优化改进 PRD · v1.0》§10.4 G3 门禁与第十一章设计重塑要求执行：
 * - G3-01 (D-1): 完整设计语言与 Design Tokens 文档完备性
 * - G3-02 (D-2): 首页 10 秒选机叙事结构与 Hero 重塑
 * - G3-03 (D-4): 全态反馈系统（骨架屏、空状态组件系统）
 * - G3-04 (D-6): 移动端自适应与横滑引导提示 (mobile-scroll-hint)
 * - G3-05 (招牌体验): 2012~2026 Surface 14 年家族演进时间轴与 5 大技术代际分水岭
 * - G3-06 (P2-4 / C-4): 重塑阶段极限词零容忍扫描
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function runG3RedesignTests(helpers) {
  const { assert, assertEqual } = helpers;
  console.log('\n🎯 Test Suite G3: 阶段 3 · 重塑验收门 (PRD §10.4 G3 门禁)');

  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const appJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'app.js'), 'utf8');
  const comparisonJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'comparison-engine.js'), 'utf8');
  const layoutCss = fs.readFileSync(path.join(ROOT_DIR, 'css', 'hubweb-layout.css'), 'utf8');
  const tokensCss = fs.readFileSync(path.join(ROOT_DIR, 'css', 'fluent-tokens.css'), 'utf8');
  const designDocPath = path.join(ROOT_DIR, 'docs', 'design-system.md');

  // =========================================================================
  // G3-01 (D-1): 完整设计系统文档与 Design Tokens
  // =========================================================================
  assert(fs.existsSync(designDocPath), 'G3-01: docs/design-system.md 设计系统文档必须存在');
  const designDoc = fs.readFileSync(designDocPath, 'utf8');
  assert(designDoc.includes('Design Tokens'), 'G3-01: 设计系统文档必须包含 Design Tokens 章节');
  assert(designDoc.includes('色彩系统') || designDoc.includes('Color Tokens'), 'G3-01: 设计系统文档必须定义色彩体系');
  assert(designDoc.includes('排版字阶') || designDoc.includes('Typography Scale'), 'G3-01: 设计系统文档必须定义排版音阶');
  assert(designDoc.includes('WCAG 2.2 AA'), 'G3-01: 设计系统文档必须明示无障碍规范');
  assert(tokensCss.includes('--ms-accent'), 'G3-01: fluent-tokens.css 必须声明基础强调色 --ms-accent');

  // =========================================================================
  // G3-02 (D-2): 首页 10 秒选机叙事结构与 Hero 重塑
  // =========================================================================
  assert(appJs.includes('home-hero-banner'), 'G3-02: 首页必须包含高阶叙事 Hero 横幅 (home-hero-banner)');
  assert(appJs.includes('scenario-quick-grid'), 'G3-02: 首页必须包含 10 秒找机型场景导流网格 (scenario-quick-grid)');
  assert(appJs.includes('轻量便携与二合一'), 'G3-02: 场景导流卡片必须包含二合一移动办公路线');
  assert(appJs.includes('长效续航与传统轻薄本'), 'G3-02: 场景导流卡片必须包含传统轻薄本路线');
  assert(appJs.includes('创意设计与重度生产力'), 'G3-02: 场景导流卡片必须包含创意设计生产力路线');
  assert(appJs.includes('14 年演进编年史'), 'G3-02: 场景导流卡片必须包含 14 年演进编年史路线');

  // =========================================================================
  // G3-03 (D-4): 全态反馈系统（骨架屏、空状态组件系统）
  // =========================================================================
  assert(layoutCss.includes('.skeleton-box'), 'G3-03: hubweb-layout.css 必须定义骨架屏基础类 .skeleton-box');
  assert(layoutCss.includes('skeleton-pulse'), 'G3-03: hubweb-layout.css 必须包含骨架屏流动微光动画 @keyframes skeleton-pulse');
  assert(layoutCss.includes('.hub-empty-state'), 'G3-03: hubweb-layout.css 必须定义空状态通用组件 .hub-empty-state');
  assert(layoutCss.includes('.empty-actions'), 'G3-03: hubweb-layout.css 必须定义空状态操作区 .empty-actions');

  // 验证对比表空状态
  const emptyComparisonHtml = ComparisonEngine.renderComparisonTable([]);
  assert(emptyComparisonHtml.includes('hub-empty-state'), 'G3-03: 对比表在设备为空时必须渲染 hub-empty-state 结构');
  assert(emptyComparisonHtml.includes('一键比对双旗舰'), 'G3-03: 对比表空状态必须提供一键比对双旗舰引导');

  // 验证搜索弹窗空状态与清理方法
  assert(appJs.includes('clearGlobalSearch'), 'G3-03: App 对象必须提供 clearGlobalSearch 方法');
  assert(typeof App.clearGlobalSearch === 'function', 'G3-03: App.clearGlobalSearch 必须为有效函数');

  // =========================================================================
  // G3-04 (D-6): 移动端自适应与横滑引导提示 (mobile-scroll-hint)
  // =========================================================================
  assert(layoutCss.includes('.mobile-scroll-hint'), 'G3-04: hubweb-layout.css 必须声明 .mobile-scroll-hint 样式');
  assert(layoutCss.includes('@media (max-width: 768px)'), 'G3-04: hubweb-layout.css 必须包含移动端 768px 响应式断点');
  assert(comparisonJs.includes('mobile-scroll-hint'), 'G3-04: 横向对比大表必须渲染移动端横滑指示条');
  assert(appJs.includes('mobile-scroll-hint'), 'G3-04: 首页货架卡片前必须渲染移动端横滑指示条');

  // =========================================================================
  // G3-05 (招牌体验): 2012~2026 演进时间轴与 5 大技术代际分水岭
  // =========================================================================
  assert(appJs.includes('timeline-era-banner'), 'G3-05: 时间轴必须包含代际技术分水岭横幅 .timeline-era-banner');
  assert(appJs.includes('Copilot+ PC 算力革命纪元'), 'G3-05: 时间轴必须包含 2024~2026 Copilot+ PC 算力革命纪元');
  assert(appJs.includes('形态深化与动态编织铰链纪元'), 'G3-05: 时间轴必须包含 2021~2023 动态编织铰链纪元');
  assert(appJs.includes('ARM 初探与双屏探索纪元'), 'G3-05: 时间轴必须包含 2019~2020 ARM与双屏探索纪元');
  assert(appJs.includes('形态爆发与专业工作台纪元'), 'G3-05: 时间轴必须包含 2015~2018 形态爆发纪元');
  assert(appJs.includes('二合一品类奠基与创生纪元'), 'G3-05: 时间轴必须包含 2013~2014 创生奠基纪元');

  // 模拟时间轴渲染
  const mockTimelineContainer = { innerHTML: '' };
  App.renderTimelineView(mockTimelineContainer);
  assert(mockTimelineContainer.innerHTML.includes('2013 年'), 'G3-05: 时间轴渲染结果必须完整包含初代 2013 年节点');
  assert(mockTimelineContainer.innerHTML.includes('2026 年'), 'G3-05: 时间轴渲染结果必须完整包含最新 2026 年节点');
  assert(mockTimelineContainer.innerHTML.includes('timeline-milestone-pill'), 'G3-05: 时间轴渲染卡片必须包含里程碑胶囊');

  // =========================================================================
  // G3-06 (P2-4 / C-4): 极限词零容忍扫描
  // =========================================================================
  const forbiddenExtremes = ['巅峰', '极致', '绝无仅有', '史上最', '全行业最', '独步天下'];
  const filesToAudit = [
    'index.html',
    'js/app.js',
    'js/comparison-engine.js',
    'js/surface-data.js',
    'docs/design-system.md'
  ];

  filesToAudit.forEach(fileRel => {
    const fullPath = path.join(ROOT_DIR, fileRel);
    if (!fs.existsSync(fullPath)) return;
    const content = fs.readFileSync(fullPath, 'utf8');
    forbiddenExtremes.forEach(word => {
      const matches = content.match(new RegExp(word, 'g')) || [];
      assertEqual(matches.length, 0, `G3-06: 重塑后文件 [${fileRel}] 严禁包含极限夸大修饰词「${word}」`);
    });
  });
}

module.exports = { runG3RedesignTests };
