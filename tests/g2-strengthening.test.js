/**
 * tests/g2-strengthening.test.js
 * 
 * 阶段 2 · 强化实施（验收门 G2）自动化门禁测试套件
 * 严格按照《surface.kaibase.cn 网站优化改进 PRD · v1.0》强化阶段要求：
 * - G2-01 (P2-1 / C-5): Xbox 板块三大专区生态收录说明与层级降级
 * - G2-02 (P2-2 / D-3): 对比卡 3 行决策摘要（续航/算力/重量）与差异高亮
 * - G2-03 (P2-3 / T-5): schema.org 结构化数据 (JSON-LD) 完备性与多路由动态注入
 * - G2-04 (T-2 / T-4): 语义化 <table> 结构（caption, thead, th scope="col", th scope="row"）
 * - G2-05 (T-3): WCAG 2.2 AA 无障碍深度保障（skip-to-content, sr-only, focus-visible, prefers-reduced-motion）
 * - G2-06 (P2-4 / C-4): 强化阶段极限词零容忍扫描
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function runG2StrengtheningTests(helpers) {
  const { assert, assertEqual } = helpers;
  console.log('\n🎯 Test Suite G2: 阶段 2 · 强化验收门 (PRD §10.3 G2 门禁)');

  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const appJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'app.js'), 'utf8');
  const comparisonJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'comparison-engine.js'), 'utf8');
  const layoutCssPath = fs.existsSync(path.join(ROOT_DIR, 'css', 'specs-layout.css'))
    ? path.join(ROOT_DIR, 'css', 'specs-layout.css')
    : path.join(ROOT_DIR, 'css', 'hubweb-layout.css');
  const layoutCss = fs.readFileSync(layoutCssPath, 'utf8');
  const tableCss = fs.readFileSync(path.join(ROOT_DIR, 'css', 'spec-table.css'), 'utf8');

  // =========================================================================
  // G2-01 (P2-1 / C-5): Xbox 生态降级与显性收录说明
  // =========================================================================
  assert(appJs.includes('Xbox 生态补充'), 'G2-01: app.js 侧边栏必须明确标明「Xbox 生态补充」');
  const surfaceAccIdx = appJs.indexOf('Surface 配件');
  const xboxIdx = appJs.indexOf('Xbox 生态补充');
  assert(xboxIdx > surfaceAccIdx, 'G2-01: app.js 侧边栏层级 Xbox 必须排在 Surface 配件之后');

  assert(appJs.includes('【微软硬件生态拓展收录】'), 'G2-01: app.js 必须包含【微软硬件生态拓展收录】提示文字');
  assert(appJs.includes('class="xbox-scope-callout" role="note"'), 'G2-01: app.js 中收录横幅必须声明 role="note" 语义');
  assert(appJs.includes('本专区作为 Microsoft 硬件生态的补充资料，收录历代 Xbox 主机规格参数'), 'G2-01: Xbox 主机专区必须包含生态补充说明');
  assert(appJs.includes('本专区作为 Microsoft 硬件生态的补充资料，全量收录历代 Xbox 官方无线控制器'), 'G2-01: Xbox 手柄专区必须包含生态补充说明');
  assert(appJs.includes('本专区作为 Microsoft 硬件生态的补充资料，收录 Xbox 官方存储扩展卡、无线双模耳机及核心周边配件'), 'G2-01: Xbox 配件专区必须包含生态补充说明');

  // =========================================================================
  // G2-02 (P2-2 / D-3): 对比卡 3 行决策摘要与差异高亮
  // =========================================================================
  assert(typeof ComparisonEngine !== 'undefined' && typeof ComparisonEngine.getDecisionSummary === 'function',
    'G2-02: ComparisonEngine.getDecisionSummary 必须为可用方法');

  const proDev = Catalog.getDevice('pro-12-13-snap');
  assert(Boolean(proDev), 'G2-02: Catalog 必须能查到 Surface Pro 13 骁龙版 (pro-12-13-snap)');
  const proSummary = ComparisonEngine.getDecisionSummary(proDev);
  assert(proSummary.batText && proSummary.batText !== '续航未披露', 'G2-02: Pro 13 决策摘要续航必须披露');
  assert(proSummary.coreText.includes('骁龙® X2') && proSummary.coreText.includes('80 TOPS'), 'G2-02: Pro 13 决策摘要必须含高通骁龙 X2 与 80 TOPS');
  assert(proSummary.portText.includes('13') && proSummary.portText.includes('895g（不含键盘）'), 'G2-02: Pro 13 决策摘要必须含 13" 屏幕与机身重量');

  const laptopDev = Catalog.getDevice('laptop-8-138-snap');
  assert(Boolean(laptopDev), 'G2-02: Catalog 必须能查到 Surface Laptop 8 13.8寸 (laptop-8-138-snap)');
  const laptopSummary = ComparisonEngine.getDecisionSummary(laptopDev);
  assert(laptopSummary.batText && laptopSummary.batText !== '续航未披露', 'G2-02: Laptop 8 13.8寸 决策摘要续航必须披露');
  assert(laptopSummary.coreText.includes('骁龙® X2') && laptopSummary.coreText.includes('80 TOPS'), 'G2-02: Laptop 8 13.8寸 决策摘要必须含高通骁龙 X2 与 80 TOPS');
  assert(laptopSummary.portText.includes('13.8'), 'G2-02: Laptop 8 13.8寸 决策摘要必须含 13.8" 屏幕');

  assert(comparisonJs.includes('table-device-decision-summary'), 'G2-02: 对比表表头卡片必须包含 table-device-decision-summary 样式结构');
  assert(comparisonJs.includes('🔋') && comparisonJs.includes('⚡') && comparisonJs.includes('⚖️'),
    'G2-02: 对比表决策摘要必须包含 🔋 续航、⚡ 动力算力、⚖️ 便携规格三行图标');

  // =========================================================================
  // G2-03 (P2-3 / T-5): schema.org 结构化数据 (JSON-LD) 完备性
  // =========================================================================
  assert(indexHtml.includes('<script type="application/ld+json" id="structured-data-jsonld">'),
    'G2-03: index.html 必须包含 id="structured-data-jsonld" 的 JSON-LD 标签');

  const match = indexHtml.match(/<script\s+type="application\/ld\+json"\s+id="structured-data-jsonld">([\s\S]*?)<\/script>/);
  assert(Boolean(match), 'G2-03: index.html 中必须能提取出初始 JSON-LD 内容');
  let parsedInit;
  try {
    parsedInit = JSON.parse(match[1].trim());
  } catch (e) {
    parsedInit = null;
  }
  assert(Boolean(parsedInit), 'G2-03: index.html 初始 JSON-LD 必须为合法 JSON 文本');
  assertEqual(parsedInit && parsedInit['@context'], 'https://schema.org', 'G2-03: 初始 JSON-LD @context 必须为 https://schema.org');
  const webSiteNode = parsedInit && parsedInit['@graph'] && parsedInit['@graph'].find(n => n['@type'] === 'WebSite');
  const breadcrumbNode = parsedInit && parsedInit['@graph'] && parsedInit['@graph'].find(n => n['@type'] === 'BreadcrumbList');
  assert(Boolean(webSiteNode) && Boolean(breadcrumbNode), 'G2-03: 初始 JSON-LD 必须包含 WebSite 与 BreadcrumbList 节点');

  assert(typeof App.updateStructuredData === 'function', 'G2-03: App 对象必须提供 updateStructuredData 方法');

  // 模拟触发 Product 结构化数据注入
  const mockScript = { textContent: '' };
  const origDocument = global.document;
  global.document = {
    getElementById: (id) => (id === 'structured-data-jsonld' ? mockScript : null)
  };

  try {
    App.activeRoute = { path: '/consumer/pro/pro-12-13-snap', query: {} };
    App.updateStructuredData();
    assert(mockScript.textContent.length > 0, 'G2-03: updateStructuredData 必须成功向 script 标签写入内容');
    const productParsed = JSON.parse(mockScript.textContent);
    const product = productParsed['@graph'].find(n => n['@type'] === 'Product');
    assert(Boolean(product), 'G2-03: 详情页路由必须生成 Product 节点');
    assert(product.name.includes('Surface Pro 13 英寸') && product.name.includes('第 12 代'), 'G2-03: Product 节点 name 必须准确');
    assertEqual(product.brand && product.brand.name, 'Microsoft', 'G2-03: Product 节点品牌必须为 Microsoft');
    assert(!product.offers, 'G2-03: 非电商资料库不得虚构报价及库存');
    const detailBreadcrumb = productParsed['@graph'].find(n => n['@type'] === 'BreadcrumbList');
    assert(Boolean(detailBreadcrumb) && detailBreadcrumb.itemListElement.length === 3,
      'G2-03: 详情页路由必须生成包含 3 级项的面包屑导航 (首页 > 系列 > 机型)');
  } finally {
    global.document = origDocument;
  }

  // =========================================================================
  // G2-04 (T-2 / T-4): 语义化 <table> 结构
  // =========================================================================
  assert(comparisonJs.includes('<caption class="sr-only">'), 'G2-04: spec-table 必须包含无障碍 caption');
  assert(comparisonJs.includes('<th scope="col" class="corner-header'), 'G2-04: spec-table 首列交叉头必须声明 scope="col"');
  assert(comparisonJs.includes('<th scope="col" class="table-single-header-th">'), 'G2-04: 单机表头必须声明 scope="col"');
  assert(comparisonJs.includes('<th scope="col">'), 'G2-04: 对比表列头必须声明 scope="col"');
  assert(comparisonJs.includes('scope="colgroup"'), 'G2-04: 参数大类分组行必须声明 scope="colgroup"');
  assert(comparisonJs.includes('<th scope="row" class="spec-param-name">${field.label}</th>'),
    'G2-04: 参数名首列必须使用语义化 th scope="row" 标签');

  assert(comparisonJs.includes('<table class="spec-accordion-table">'), 'G2-04: 单机详情手风琴表格必须存在');
  assert(comparisonJs.includes('<caption class="sr-only">${dev.name} - ${group.name} 技术规格参数</caption>'),
    'G2-04: 单机手风琴表格必须包含专属无障碍 caption');

  assert(tableCss.includes('.spec-table tbody th.spec-param-name'), 'G2-04: spec-table.css 必须为 th.spec-param-name 提供粘性固定样式');

  // =========================================================================
  // G2-05 (T-3): WCAG 2.2 AA 无障碍保障
  // =========================================================================
  assert(indexHtml.includes('<a href="#hub-main-content" class="skip-to-content sr-only">跳至主要内容</a>'),
    'G2-05: index.html 必须包含 skip-to-content 无障碍跳转链接');
  assert(layoutCss.includes('.sr-only'), 'G2-05: specs-layout.css 必须声明 .sr-only 无障碍屏幕阅读器专用隐藏类');
  assert(layoutCss.includes('.skip-to-content.sr-only:focus'), 'G2-05: specs-layout.css 必须声明 .skip-to-content Tab 聚焦浮出样式');
  assert(layoutCss.includes(':focus-visible'), 'G2-05: specs-layout.css 必须声明全局 :focus-visible 高对比度焦点环');
  assert(layoutCss.includes('@media (prefers-reduced-motion: reduce)'), 'G2-05: specs-layout.css 必须支持系统级减弱动态效果偏好');

  // =========================================================================
  // G2-06 (P2-4 / C-4): 强化阶段极限词零容忍扫描
  // =========================================================================
  const forbiddenExtremes = ['巅峰', '极致', '绝无仅有', '史上最', '全行业最', '独步天下'];
  const filesToAudit = [
    'index.html',
    'js/app.js',
    'js/comparison-engine.js',
    'js/surface-data.js'
  ];

  filesToAudit.forEach(fileRel => {
    const fullPath = path.join(ROOT_DIR, fileRel);
    const content = fs.readFileSync(fullPath, 'utf8');
    forbiddenExtremes.forEach(word => {
      const matches = content.match(new RegExp(word, 'g')) || [];
      assertEqual(matches.length, 0, `G2-06: 文件 [${fileRel}] 严禁包含极限夸大修饰词「${word}」`);
    });
  });
}

module.exports = { runG2StrengtheningTests };
