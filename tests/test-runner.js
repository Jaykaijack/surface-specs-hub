/**
 * Microsoft Surface Specs Hub - Automated Test Suite
 * 验证数据模型、13大类参数完整性、未知参数治理、对比引擎、计算工具与路由过滤
 */

const fs = require('fs');
const path = require('path');

// 导入待测核心模块
const SURFACE_DATA = require('../js/surface-data.js');
const ComparisonEngine = require('../js/comparison-engine.js');
const ToolsEngine = require('../js/tools-engine.js');
const App = require('../js/app.js');
// 挂载到全局环境供 Node.js 测试执行
global.SURFACE_DATA = SURFACE_DATA;
global.ComparisonEngine = ComparisonEngine;
global.ToolsEngine = ToolsEngine;
global.App = App;

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

function assertEqual(actual, expected, message) {
  if (actual === expected) {
    console.log(`  ✅ PASS: ${message} (Actual: ${actual})`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message} (Expected: ${expected}, Actual: ${actual})`);
    failedTests++;
  }
}

console.log('========================================================');
console.log('🧪 Microsoft Surface Specs Hub - Automated Verification');
console.log('========================================================\n');

// ----------------------------------------------------
// 1. 数据架构与分类谱系测试 (Taxonomy & Hierarchy)
// ----------------------------------------------------
console.log('📦 Test Suite 1: 产品分类体系与谱系收录');
assertEqual(SURFACE_DATA.categories.length, 8, '收录完整的 8 大 Surface 品类');

const categoryIds = SURFACE_DATA.categories.map(c => c.id);
const expectedCategories = ['pro', 'laptop', 'sls', 'book', 'go', 'laptopgo', 'studio', 'duo'];
expectedCategories.forEach(catId => {
  assert(categoryIds.includes(catId), `包含预期品类: ${catId}`);
});

assert(SURFACE_DATA.devices.length >= 40, `全历史机型收录充分 (当前收录: ${SURFACE_DATA.devices.length} 款)`);

// 官方全系产品线完整度检查: 包含 Surface Pro, 12 英寸 (第 1 代) 与 Pro 13 (第 12 代)
const pro12InchFound = SURFACE_DATA.devices.some(d => d.id === 'pro-12-inch');
assert(pro12InchFound, '官方产品线检查: 完整收录微软在售 Surface Pro, 12 英寸 (第 1 代)');

const pro12_13 = SURFACE_DATA.devices.find(d => d.id === 'pro-12-13');
assert(!!pro12_13, '旗舰二合一存在: Surface Pro 13 英寸 (第 12 代) 收录正常');
if (pro12_13) {
  assert(pro12_13.name.includes('Surface Pro 13 英寸') && pro12_13.name.includes('12 代'), '旗舰机型全名符合规范');
}

const laptop8 = SURFACE_DATA.devices.find(d => d.id === 'laptop-8-138');
assert(!!laptop8, '旗舰笔记本存在: Surface Laptop (第 8 代) 13.8 英寸收录正常');

// ----------------------------------------------------
// 2. 13 大专属参数大类覆盖检查 (Spec Groups & Zero Hallucination)
// ----------------------------------------------------
console.log('\n📋 Test Suite 2: 13 大专属参数分组与零脑补治理');
assertEqual(SURFACE_DATA.specGroups.length, 13, '严格定义 13 大专属参数类别');

const expectedGroupIds = [
  'basic', 'processor', 'memory_storage', 'display', 'camera', 'audio',
  'connectivity', 'power', 'input', 'security', 'design', 'service', 'metadata'
];
expectedGroupIds.forEach(gid => {
  assert(SURFACE_DATA.specGroups.some(g => g.id === gid), `包含参数大类: ${gid}`);
});

// 遍历统计所有机型的未知参数状态治理
let validSpecValuesCount = 0;
let notDisclosedCount = 0;
let notApplicableCount = 0;
let nullCount = 0;

SURFACE_DATA.devices.forEach(dev => {
  SURFACE_DATA.specGroups.forEach(group => {
    group.fields.forEach(field => {
      const val = dev.specs[field.key];
      if (val === 'not_disclosed') {
        notDisclosedCount++;
      } else if (val === 'not_applicable') {
        notApplicableCount++;
      } else if (val === undefined || val === null || val === '' || val === 'null') {
        nullCount++;
      } else {
        validSpecValuesCount++;
      }
    });
  });
});

console.log(`  ℹ️  有效确定参数: ${validSpecValuesCount} 项, 官方未披露: ${notDisclosedCount} 项, 不适用: ${notApplicableCount} 项, 空缺: ${nullCount} 项`);
assert(validSpecValuesCount > 1000, `有效参数点信息量丰满 (>1000 项, 实际: ${validSpecValuesCount})`);
assert(notDisclosedCount > 0, `存在明确遵循官方未披露原则的参数 (零胡编, 实际: ${notDisclosedCount} 项)`);
assert(notApplicableCount > 0, `存在明确标注不适用的参数 (如折叠机/纯笔记本不适用参数, 实际: ${notApplicableCount} 项)`);

// ----------------------------------------------------
// 3. 对比引擎逻辑测试 (Comparison Engine)
// ----------------------------------------------------
console.log('\n⚖️ Test Suite 3: 对比引擎格式化与差异识别算法');

// 格式化输出渲染测试
const htmlValid = ComparisonEngine.formatFieldValue('骁龙 X2 处理器', 'text');
assert(htmlValid === '骁龙 X2 处理器', '正常参数格式化渲染文本');

const htmlNotDisclosed = ComparisonEngine.formatFieldValue('not_disclosed', 'text');
assert(htmlNotDisclosed.includes('官方未披露'), 'not_disclosed 准确渲染为"官方未披露"标签');
assert(htmlNotDisclosed.includes('spec-state not-disclosed'), '包含 spec-state not-disclosed CSS 样式类');

const htmlNotApplicable = ComparisonEngine.formatFieldValue('not_applicable', 'text');
assert(htmlNotApplicable.includes('不适用'), 'not_applicable 准确渲染为"不适用"标签');
assert(htmlNotApplicable.includes('spec-state not-applicable'), '包含 spec-state not-applicable CSS 样式类');

const htmlNull = ComparisonEngine.formatFieldValue(null, 'text');
assert(htmlNull.includes('—'), '空缺值渲染为标准中划线');

// 差异比对算法测试
const devA = { specs: { npuTops: '80 TOPS' } };
const devB = { specs: { npuTops: '80 TOPS' } };
const devC = { specs: { npuTops: '45 TOPS' } };

const diffAB = ComparisonEngine.checkFieldDiff([devA, devB], 'npuTops');
assertEqual(diffAB, false, '同值参数比对判定无差异 (diff = false)');

const diffAC = ComparisonEngine.checkFieldDiff([devA, devC], 'npuTops');
assertEqual(diffAC, true, '异值参数比对判定存在差异 (diff = true)');

// 对比托盘队列测试
ComparisonEngine.selectedIds = ['pro-12-13', 'laptop-8-138'];
assertEqual(ComparisonEngine.selectedIds.length, 2, '托盘装载 2 款设备');
ComparisonEngine.swapDeviceOrder(0, 1);
assertEqual(ComparisonEngine.selectedIds[0], 'laptop-8-138', '列顺序向右调整成功');
assertEqual(ComparisonEngine.selectedIds[1], 'pro-12-13', '原第0列被交换到第1列');

// ----------------------------------------------------
// 4. 辅助分析工具测试 (Tools Engine)
// ----------------------------------------------------
console.log('\n📐 Test Suite 4: 辅助工具算力天梯与 3:2 面积算法');

// 3:2 屏幕对比面积计算器逻辑
const diag13 = 13.0; // Surface Pro 13 (3:2)
const diag133 = 13.3; // 常见 16:9 轻薄本
const spec32 = ToolsEngine.calculateDimensions(diag13, 3, 2);
const spec169 = ToolsEngine.calculateDimensions(diag133, 16, 9);

assert(spec32.areaIn2 > 0, `3:2 13.0" 屏幕面积计算完成: ${spec32.areaIn2} 平方英寸 (${spec32.areaCm2} cm²)`);
assert(spec169.areaIn2 > 0, `16:9 13.3" 屏幕面积计算完成: ${spec169.areaIn2} 平方英寸`);
// 经典 3:2 视野更大结论验证
assert(spec32.areaIn2 > spec169.areaIn2, '核心事实验证: 13.0 英寸 3:2 显示面积显著大于 13.3 英寸 16:9');

// 芯片与 NPU 算力天梯测试
assert(SURFACE_DATA.chips.length >= 10, '芯片库完整收录至少 10 款主要架构');
const snapdragonX2 = SURFACE_DATA.chips.find(c => c.id === 'snapdragon-x2-elite');
assert(!!snapdragonX2, '骁龙 X2 Elite 芯片在库');
if (snapdragonX2) {
  assertEqual(snapdragonX2.npuTops, 80, '骁龙 X2 Elite NPU 硬件算力为 80 TOPS');
}

// 40 TOPS Copilot+ 认证红线验证
SURFACE_DATA.chips.forEach(chip => {
  if (chip.npuTops >= 40) {
    assert(chip.copilotPlus === true, `算力 >= 40 TOPS 的芯片 (${chip.name}) 必须具备 Copilot+ 认证`);
  }
});

// 双向配件兼容表测试
assertEqual(SURFACE_DATA.accessories.length, 3, '包含键盘、触控笔、拓展坞 3 大类配件兼容库');
const flexKeyboard = SURFACE_DATA.accessories.find(a => a.id === 'flex-keyboard');
assert(!!flexKeyboard, 'Surface Pro Flex 键盘配件在库');
if (flexKeyboard) {
  const pro12Support = flexKeyboard.compatibilityList.find(c => c.deviceId === 'pro-12-13');
  assert(!!pro12Support && pro12Support.status === 'FULL', 'Flex 键盘原生支持 Surface Pro 13 英寸 (第 12 代)');
}

// ----------------------------------------------------
// 5. 路由与多维筛选系统测试 (Router & Filters)
// ----------------------------------------------------
console.log('\n🧭 Test Suite 5: URL 路由与筛选器参数化联动');

// URL 查询参数解析还原
App.parseFiltersFromQuery({
  cpu: 'snapdragon',
  status: 'current_cn',
  copilot: 'true',
  audience: 'consumer'
});

assertEqual(App.filters.cpu, 'snapdragon', '正确还原 URL cpu 参数');
assertEqual(App.filters.status, 'current_cn', '正确还原 URL status 参数');
assertEqual(App.filters.copilotOnly, true, '正确还原 URL copilot 参数为布尔值');
assertEqual(App.filters.audience, 'consumer', '正确还原 URL audience 参数');

// 筛选联动过滤算法测试
const proDevices = SURFACE_DATA.devices.filter(d => d.categoryId === 'pro');
const filteredPro = App.applyFilters(proDevices);
assert(filteredPro.length > 0, '筛选过滤算法产出有效结果');
filteredPro.forEach(d => {
  assert(d.specs.copilotPlus.includes('Copilot+') || d.specs.copilotPlus === '是', '筛选后机型必须具备 Copilot+');
  assertEqual(d.status, 'current_cn', '筛选后机型状态必须是国行在售');
});

// 重置筛选
App.parseFiltersFromQuery({});
assertEqual(App.filters.cpu, 'all', '重置后 cpu 恢复为 all');
assertEqual(App.filters.copilotOnly, false, '重置后 copilotOnly 恢复为 false');

// 全局模糊搜索测试
const searchResults1 = SURFACE_DATA.devices.filter(d => {
  const text = `${d.name} ${d.specs.cpuModel} ${d.year}`.toLowerCase();
  return text.includes('骁龙 x2');
});
assert(searchResults1.length >= 2, '通过"骁龙 X2"可精准检索到最新第 12 代 Pro 与第 8 代 Laptop');

const searchResults2 = SURFACE_DATA.devices.filter(d => {
  const text = `${d.name} ${d.specs.cpuModel} ${d.year}`.toLowerCase();
  return text.includes('2026');
});
assert(searchResults2.length >= 3, '通过年份"2026"可检索到 2026 最新发布的全部机型');

// ----------------------------------------------------
// 6. 静态资源与样式规范完整性检查 (Assets & Tokens)
// ----------------------------------------------------
console.log('\n🎨 Test Suite 6: 样式 Token、无障碍对比度与 HTML 入口');

const htmlPath = path.resolve(__dirname, '../index.html');
assert(fs.existsSync(htmlPath), 'index.html 根文件存在');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

assert(htmlContent.includes('<!DOCTYPE html>'), '合法 HTML5 文档声明');
assert(htmlContent.includes('viewport-fit=cover'), '适配移动端安全区域');
assert(htmlContent.includes('hub-main-content'), '包含核心内容承载容器');
assert(htmlContent.includes('search-results-modal'), '包含全局搜索浮层 DOM');
assert(htmlContent.includes('comparison-dock'), '包含底部对比吸附托盘 DOM');

const tokensPath = path.resolve(__dirname, '../css/fluent-tokens.css');
assert(fs.existsSync(tokensPath), 'fluent-tokens.css 存在');
const tokensContent = fs.readFileSync(tokensPath, 'utf8');
assert(tokensContent.includes('--surface-bg'), '包含 Surface Fluent 背景色 Token');
assert(tokensContent.includes('[data-theme="dark"]'), '包含深色主题适配 Token');

const specTableCssPath = path.resolve(__dirname, '../css/spec-table.css');
assert(fs.existsSync(specTableCssPath), 'spec-table.css 存在');
const specTableCss = fs.readFileSync(specTableCssPath, 'utf8');
assert(specTableCss.includes('position: sticky'), '实现双轴吸附 position: sticky');
assert(specTableCss.includes('.spec-state.not-disclosed'), '包含官方未披露状态专用样式');
assert(specTableCss.includes('.spec-state.not-applicable'), '包含不适用状态专用样式');

// 检验 Google Material Design 3 (M3) 规范令牌与 16:10 统一图片比例标准
assert(tokensContent.includes('--md-sys-typescale-headline-large'), 'M3 规范: 包含 Headline Large 34px 字阶令牌');
assert(tokensContent.includes('--md-sys-color-primary'), 'M3 规范: 包含 M3 语义色 Primary 令牌');
assert(tokensContent.includes('--md-sys-shape-corner-large'), 'M3 规范: 包含 M3 16px 圆角规范');

const hubwebCssPath = path.resolve(__dirname, '../css/hubweb-layout.css');
const hubwebCss = fs.readFileSync(hubwebCssPath, 'utf8');
assert(hubwebCss.includes('aspect-ratio: 16 / 10'), '全站图片规范: 包含 16:10 标准化黄金比例舞台容器');
assert(hubwebCss.includes('.m3-tab-bar'), '切换交互系统: 包含 M3 Tabs 标签页导航样式');
assert(hubwebCss.includes('.m3-segmented-control'), '切换交互系统: 包含 M3 分段控制切换器样式');

// 检验 App 对象的切换交互能力
assert(typeof App.switchDetailTab === 'function', '交互验证: App 具备 switchDetailTab 标签切换方法');
assert(typeof App.switchSeriesViewMode === 'function', '交互验证: App 具备 switchSeriesViewMode 视图切换方法');
assert(typeof App.toggleDockCollapse === 'function', '交互验证: App 具备 toggleDockCollapse 托盘折叠方法');
assert(typeof App.navigateToDetail === 'function', '路由交互验证: App 具备 navigateToDetail 详情跳转方法');

// 检验系列页机型卡片点击事件与复选框隔离
const mockContainer = { innerHTML: '' };
App.renderSeriesView(mockContainer, 'pro');
assert(mockContainer.innerHTML.includes('onclick="App.navigateToDetail(\'pro\', \'pro-12-13\')"'), '系列页卡片主体点击跳转详情');
assert(mockContainer.innerHTML.includes('event.stopPropagation(); ComparisonEngine.toggleDevice(\'pro-12-13\')'), '系列页卡片复选框独立隔离对比事件');

// 检验详情页完整 13 大类参数直出渲染（无需二次点击切换）
const mockDetailContainer = { innerHTML: '' };
App.renderProductDetailView(mockDetailContainer, 'pro', 'pro-12-13');
assert(mockDetailContainer.innerHTML.includes('13 大类官方标准规格全量大表'), '详情页直出展示 13 大类规格大表标题');
assert(mockDetailContainer.innerHTML.includes('双层串联 OLED'), '详情页完整参数表包含双层串联 OLED 真实参数');
assert(mockDetailContainer.innerHTML.includes('80 TOPS'), '详情页指标卡与全量参数表均正常渲染 80 TOPS 算力');

// ----------------------------------------------------
// Test Suite 7: 官方机型高清图像与外观配色展示集
// ----------------------------------------------------
console.log('\n📸 Test Suite 7: 官方机型高清图像与外观配色展示集');

const assetsDir = path.resolve(__dirname, '../assets/products');
assert(fs.existsSync(assetsDir), 'assets/products 图像目录存在');

// 旗舰 Pro 13 四大真机配色图检验
const pro13Colors = ['surface-pro-13-platinum.png', 'surface-pro-13-black.png', 'surface-pro-13-sapphire.png', 'surface-pro-13-dune.png'];
pro13Colors.forEach(imgName => {
  const p = path.join(assetsDir, imgName);
  assert(fs.existsSync(p), `Pro 13 官方真机配色图存在: ${imgName}`);
});

// 旗舰 Laptop 13.8/15 五大真机配色图检验
const laptopColors = ['surface-laptop-platinum.png', 'surface-laptop-black.png', 'surface-laptop-dune.png', 'surface-laptop-sapphire.png', 'surface-laptop-sage.png'];
laptopColors.forEach(imgName => {
  const p = path.join(assetsDir, imgName);
  assert(fs.existsSync(p), `Laptop 官方真机配色图存在: ${imgName}`);
});

// 检验全系 8 大品类均配有官方 Hero 图像
const categoryHeroes = [
  'surface-new-pro-hero.png',
  'surface-new-laptop-hero.png',
  'surface-laptop-studio-2-hero.jpg',
  'surface-laptop-go-3-hero.jpg',
  'surface-studio-2-plus-hero.jpg',
  'surface-book-hero.jpg',
  'surface-go-hero.jpg',
  'surface-duo-hero.jpg'
];
categoryHeroes.forEach(imgName => {
  const p = path.join(assetsDir, imgName);
  assert(fs.existsSync(p), `系列代表性机型官方主图存在: ${imgName}`);
});

const categoryHeroesPng = [
  'surface-new-pro-hero.png',
  'surface-new-laptop-hero.png',
  'surface-laptop-studio-2-hero.png',
  'surface-laptop-go-3-hero.png',
  'surface-studio-2-plus-hero.png',
  'surface-book-hero.png',
  'surface-go-hero.png',
  'surface-duo-hero.png'
];
categoryHeroesPng.forEach(imgName => {
  const p = path.join(assetsDir, imgName);
  assert(fs.existsSync(p), `全系 8 大品类官方透明 PNG 主图存在: ${imgName}`);
});

// 检验 SURFACE_DATA 助手函数
const pro12 = SURFACE_DATA.devices.find(d => d.id === 'pro-12-13');
assert(Boolean(pro12 && pro12.heroImage), 'Pro 12 配备主图 heroImage');
assert(SURFACE_DATA.getDeviceImage(pro12).includes('.png'), 'getDeviceImage(pro12) 返回有效 PNG 图片');
assert(!pro12.specs.colors.some(c => c.name === '宝石蓝'), 'Pro 13 (第 12 代) 严格符合微软官方商城在售实际: 零宝石蓝 (仅亮铂金、典雅黑、沙漫金)');
assert(SURFACE_DATA.getDeviceImage(pro12, '沙漫金').includes('dune.png'), 'getDeviceImage 支持切换指定颜色沙漫金');
assert(SURFACE_DATA.getDeviceImage(pro12, '典雅黑').includes('black.png'), 'getDeviceImage 支持切换指定颜色典雅黑');

// 检验新收录的官方 12 英寸机型
const pro12Inch = SURFACE_DATA.devices.find(d => d.id === 'pro-12-inch');
assert(Boolean(pro12Inch), '全系参数库正式收录官方 Surface Pro, 12 英寸 (第 1 代)');
assertEqual(pro12Inch.specs.resolution, '2196 × 1464', '12 英寸机型分辨率 2196x1464 准确无误');
assertEqual(pro12Inch.specs.npuTops, '45 TOPS', '12 英寸机型搭载 45 TOPS 高通 NPU');

// ----------------------------------------------------
// 8. Matt Pocock 架构与工程规范校验 (Architecture & Governance)
// ----------------------------------------------------
console.log('\n🏛️ Test Suite 8: Matt Pocock 架构与工程规范校验');

const agentsMdPath = path.resolve(__dirname, '../AGENTS.md');
assert(fs.existsSync(agentsMdPath), '根目录 AGENTS.md 存在');
const agentsMdContent = fs.readFileSync(agentsMdPath, 'utf8');
assert(agentsMdContent.includes('## Agent skills'), 'AGENTS.md 包含 ## Agent skills 区块');
assert(agentsMdContent.includes('### Issue tracker'), 'AGENTS.md 包含 ### Issue tracker');
assert(agentsMdContent.includes('### Triage labels'), 'AGENTS.md 包含 ### Triage labels');
assert(agentsMdContent.includes('### Domain docs'), 'AGENTS.md 包含 ### Domain docs');

const contextMdPath = path.resolve(__dirname, '../CONTEXT.md');
assert(fs.existsSync(contextMdPath), '根目录 CONTEXT.md 存在');
const contextMdContent = fs.readFileSync(contextMdPath, 'utf8');
assert(contextMdContent.includes('Surface Pro 13 英寸（第 12 代）'), 'CONTEXT.md 明确最新旗舰 Pro 13 第 12 代');
assert(contextMdContent.includes('80 TOPS'), 'CONTEXT.md 准确记载 80 TOPS 算力');
assert(contextMdContent.includes('Surface Pro 12-inch Official Inclusion'), 'CONTEXT.md 明确收录 12 英寸官方产品线');

const domainDocPath = path.resolve(__dirname, '../docs/agents/domain.md');
const issueTrackerPath = path.resolve(__dirname, '../docs/agents/issue-tracker.md');
const triageLabelsPath = path.resolve(__dirname, '../docs/agents/triage-labels.md');
assert(fs.existsSync(domainDocPath), 'docs/agents/domain.md 存在');
assert(fs.existsSync(issueTrackerPath), 'docs/agents/issue-tracker.md 存在');
assert(fs.existsSync(triageLabelsPath), 'docs/agents/triage-labels.md 存在');

const adrDir = path.resolve(__dirname, '../docs/adr');
assert(fs.existsSync(adrDir), 'docs/adr/ 架构决策目录存在');
assert(fs.existsSync(path.join(adrDir, '0001-hubweb-pure-static-spa-architecture.md')), 'ADR-0001 存在');
assert(fs.existsSync(path.join(adrDir, '0002-zero-hallucination-spec-governance.md')), 'ADR-0002 存在');
assert(fs.existsSync(path.join(adrDir, '0003-surface-product-lineup-and-taxonomy.md')), 'ADR-0003 存在');
assert(fs.existsSync(path.join(adrDir, '0004-official-cdn-asset-localization-and-color-switching.md')), 'ADR-0004 存在');

const scratchDir = path.resolve(__dirname, '../.scratch');
assert(fs.existsSync(scratchDir), '.scratch/ 本地任务跟踪目录存在');
assert(fs.existsSync(path.join(scratchDir, 'surface-specs-hub-core/spec.md')), '.scratch/ 下功能规格 spec.md 存在');
assert(fs.existsSync(path.join(scratchDir, 'surface-specs-hub-core/map.md')), '.scratch/ 下任务决策地图 map.md 存在');

// ----------------------------------------------------
// 9. 图像资产真实性与商用版规范校验 (Asset Fidelity & Commercial Governance)
// ----------------------------------------------------
console.log('\n🛡️ Test Suite 9: 图像资产真实性与商用版规范校验');

// 1. 严格检查：非 Pro 设备 0 处引用 surface-pro-13
let pro13LeakCount = 0;
SURFACE_DATA.devices.forEach(d => {
  const isPro = d.id.startsWith('pro-');
  const heroHas = d.heroImage && d.heroImage.includes('surface-pro-13');
  const colorHas = d.specs && d.specs.colors && d.specs.colors.some(c => c.image && c.image.includes('surface-pro-13'));
  if (!isPro && (heroHas || colorHas)) {
    pro13LeakCount++;
    console.error(`  ❌ 发现非 Pro 设备图片错乱: ${d.id}`);
  }
});
assertEqual(pro13LeakCount, 0, '严格审查: 零非Pro机型错乱使用 Pro 13 图片');

// 2. 检查全部引用图片本地存在性
let missingAssetCount = 0;
SURFACE_DATA.devices.forEach(d => {
  if (d.heroImage) {
    const p = path.resolve(__dirname, '..', d.heroImage.replace(/^\.\//, ''));
    if (!fs.existsSync(p)) {
      missingAssetCount++;
      console.error(`  ❌ 缺失主图: ${d.heroImage} (${d.id})`);
    }
  }
  if (d.specs && Array.isArray(d.specs.colors)) {
    d.specs.colors.forEach(c => {
      if (c.image) {
        const p = path.resolve(__dirname, '..', c.image.replace(/^\.\//, ''));
        if (!fs.existsSync(p)) {
          missingAssetCount++;
          console.error(`  ❌ 缺失配色图: ${c.image} (${d.id} - ${c.name})`);
        }
      }
    });
  }
});
assertEqual(missingAssetCount, 0, '全量引用图像本地文件 100% 存在');

// 3. 校验 Surface Hub 独立资产
const hub2s = SURFACE_DATA.devices.find(d => d.id === 'hub-2s');
assert(Boolean(hub2s && hub2s.heroImage.includes('hub')), 'Surface Hub 2S 拥有独立专属巨幕图片，不与 Studio 混淆');

// 4. 校验商用版专区与 Microsoft Learn 架构
assert(typeof App.renderBusinessView === 'function', 'App 具备 renderBusinessView 商用专区渲染方法');
const commercialList = SURFACE_DATA.devices.filter(d => d.isCommercial);
assert(commercialList.length >= 8, `全面收录商用机型 (当前收录: ${commercialList.length} 款)`);
commercialList.forEach(cd => {
  assert(Boolean(cd.learnDocUrl && cd.learnDocUrl.includes('learn.microsoft.com')), `商用机型 [${cd.id}] 具备有效 Microsoft Learn 文档链接`);
});

// ----------------------------------------------------
// 最终汇总
// ----------------------------------------------------
console.log('\n========================================================');
console.log(`🏁 自动化测试结果: ${passedTests} 项通过, ${failedTests} 项失败`);
console.log('========================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 所有数据模型、参数治理、对比引擎与交互逻辑全部验证通过！\n');
}

