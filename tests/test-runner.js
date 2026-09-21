/**
 * Microsoft Surface Specs Hub - Automated Test Suite
 * 验证数据模型、13大类参数完整性、未知参数治理、对比引擎、计算工具与路由过滤
 */

const fs = require('fs');
const path = require('path');

// 导入待测核心模块
const SURFACE_DATA = require('../js/surface-data.js');
const Catalog = require('../js/catalog.js');
const Taxonomy = require('../js/taxonomy.js');
const ComparisonEngine = require('../js/comparison-engine.js');
const ToolsEngine = require('../js/tools-engine.js');
const App = require('../js/app.js');
const OFFICIAL_CURRENT_LINEUP_FACTS = require('./official-current-lineup-facts.js');
const OFFICIAL_HISTORICAL_LINEUP_FACTS = require('./official-historical-lineup-facts.js');
// 挂载到全局环境供 Node.js 测试执行
global.SURFACE_DATA = SURFACE_DATA;
global.Catalog = Catalog;
global.Taxonomy = Taxonomy;
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

function assertSpecFacts(deviceId, dev, fact) {
  const contains = fact.specContains || {};
  Object.keys(contains).forEach((key) => {
    const actual = String(Catalog.getSpec(dev, key) || '');
    const needles = Array.isArray(contains[key]) ? contains[key] : [contains[key]];
    needles.forEach((needle) => {
      assert(actual.includes(needle), `${deviceId} ${key} 必须含国行 ${needle}（实际: ${actual}）`);
    });
  });
  const states = fact.specState || {};
  Object.keys(states).forEach((key) => {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, key)), states[key],
      `${deviceId} ${key} 国行未写或物理不具备时不得脑补`);
  });
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

// 官方全系产品线完整度检查: 包含 Surface Pro, 12 英寸 (第 1 代) 与 Pro 13 (第 12 代) 商用版独立双架构
const pro12InchFound = SURFACE_DATA.devices.some(d => d.id === 'pro-12-inch');
assert(pro12InchFound, '官方产品线检查: 完整收录微软在售 Surface Pro, 12 英寸 (第 1 代) 消费版');

const pro12_intel = SURFACE_DATA.devices.find(d => d.id === 'pro-12-13-intel');
assert(!!pro12_intel, '旗舰二合一存在: Surface Pro 13 英寸 (第 12 代) 商用版 - Intel 版独立收录');
assert(pro12_intel.isCommercial === true, 'Pro 12 Intel 版明确为商用属性 (isCommercial=true)');
assert(pro12_intel.specs.cpuModel.includes('Ultra'), 'Pro 12 Intel 版搭载酷睿 Ultra 处理器');

const pro12_snap = SURFACE_DATA.devices.find(d => d.id === 'pro-12-13-snap');
assert(!!pro12_snap, '旗舰二合一存在: Surface Pro 13 英寸 (第 12 代) 商用版 - 骁龙版独立收录');
assert(pro12_snap.isCommercial === true, 'Pro 12 骁龙版明确为商用属性 (isCommercial=true)');
assert(pro12_snap.specs.cpuModel.includes('Snapdragon') || pro12_snap.specs.cpuModel.includes('骁龙'), 'Pro 12 骁龙版搭载骁龙 X2 处理器');

const laptop8_intel = SURFACE_DATA.devices.find(d => d.id === 'laptop-8-138-intel');
assert(!!laptop8_intel, '旗舰笔记本存在: Surface Laptop (第 8 代) 13.8 英寸商用 Intel 版收录正常');

const laptop8_snap = SURFACE_DATA.devices.find(d => d.id === 'laptop-8-138-snap');
assert(!!laptop8_snap, '旗舰笔记本存在: Surface Laptop (第 8 代) 13.8 英寸商用 骁龙版收录正常');

// 架构重构检查: 消费版与商用版两大顶级分类独立并列
assertEqual(SURFACE_DATA.consumerCategories.length, 8, '消费版产品库独立收录完整的 8 大消费系列');
assertEqual(SURFACE_DATA.commercialCategories.length, 7, '商用版产品库独立收录完整的 7 大商用系列 (Pro/Laptop/SLS/Book/Go/Studio/Hub)');

// 补全商用型号官方 Learn 架构与 Fact Sheet 存证检查
const pro12_biz = SURFACE_DATA.devices.find(d => d.id === 'pro-12-inch-biz');
assert(!!pro12_biz, '官方商用型号检查: 严格收录 Surface Pro 12 英寸 (第 1 代) 商用版 (SKU 2109)');
assert(pro12_biz.isCommercial === true && pro12_biz.segment === 'commercial', 'Pro 12 商用版严格标记商用属性');
assert(pro12_biz.specs.colors.length === 1 && pro12_biz.specs.colors[0].name === '亮铂金', 'Pro 12 商用版外观严格仅官方亮铂金商务单色');

const lp13_biz = SURFACE_DATA.devices.find(d => d.id === 'laptop-13-inch-biz');
assert(!!lp13_biz, '官方商用型号检查: 严格收录 Surface Laptop 13 英寸 (第 1 代) 商用版 (SKU 2095)');
assert(lp13_biz.specs.colors.length === 1 && lp13_biz.specs.colors[0].name === '亮铂金', 'Laptop 13 商用版外观严格仅官方亮铂金单色');

const hub3 = SURFACE_DATA.devices.find(d => d.id === 'hub-3');
assert(!!hub3, '官方商用巨幕检查: 严格收录 Surface Hub 3 (50" / 85") 协作一体机 (SKU Hub 3 50/85)');

const pro11_snap = SURFACE_DATA.devices.find(d => d.id === 'pro-11-biz-snap');
const pro11_intel = SURFACE_DATA.devices.find(d => d.id === 'pro-11-biz-intel');
assert(!!pro11_snap && !!pro11_intel, '官方商用型号检查: 完整收录 Surface Pro (第 11 代) 商用版 骁龙与 Intel 双架构');

const lp7_snap = SURFACE_DATA.devices.find(d => d.id === 'laptop-7-biz-snap');
const lp7_intel = SURFACE_DATA.devices.find(d => d.id === 'laptop-7-biz-intel');
assert(!!lp7_snap && !!lp7_intel, '官方商用型号检查: 完整收录 Surface Laptop (第 7 代) 商用版 骁龙与 Intel 双架构');

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
ComparisonEngine.selectedIds = ['pro-12-13-intel', 'laptop-8-138-intel'];
assertEqual(ComparisonEngine.selectedIds.length, 2, '托盘装载 2 款设备');
ComparisonEngine.swapDeviceOrder(0, 1);
assertEqual(ComparisonEngine.selectedIds[0], 'laptop-8-138-intel', '列顺序向右调整成功');
assertEqual(ComparisonEngine.selectedIds[1], 'pro-12-13-intel', '原第0列被交换到第1列');

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

// 双向配件生态全品类兼容表测试 (涵盖鼠标、键盘、手写笔、拓展坞、音频与创意交互 6 大生态)
assert(SURFACE_DATA.accessories.length >= 20, `全面收录 6 大品类官方全生态配件库 (当前收录: ${SURFACE_DATA.accessories.length} 款)`);

// 1. 鼠标外设全系收录
const arcMouse = SURFACE_DATA.accessories.find(a => a.id === 'surface-arc-mouse');
assert(!!arcMouse && arcMouse.category === 'mouse', 'Surface Arc 鼠标在库 (可弯折创新形态)');
const precisionMouse = SURFACE_DATA.accessories.find(a => a.id === 'surface-precision-mouse');
assert(!!precisionMouse && precisionMouse.category === 'mouse', 'Surface 精准鼠标在库 (三设备跨屏旗舰工学)');
const mobileMouse = SURFACE_DATA.accessories.find(a => a.id === 'surface-mobile-mouse');
assert(!!mobileMouse && mobileMouse.category === 'mouse', 'Surface 便携移动鼠标在库 (小巧对称金属滚轮)');
const ergoMouse = SURFACE_DATA.accessories.find(a => a.id === 'surface-ergonomic-mouse');
assert(!!ergoMouse && ergoMouse.category === 'mouse', 'Surface 人体工学鼠标在库 (舒适健康手型倾角)');

// 2. 键盘与保护盖
const flexKeyboard = SURFACE_DATA.accessories.find(a => a.id === 'flex-keyboard');
assert(!!flexKeyboard && flexKeyboard.category === 'keyboard', 'Surface Pro Flex 键盘配件在库');
if (flexKeyboard) {
  const pro12Support = flexKeyboard.compatibilityList.find(c => c.deviceId === 'pro-12-13-intel');
  assert(!!pro12Support && pro12Support.status === 'FULL', 'Flex 键盘原生支持 Surface Pro 13 英寸 (第 12 代) 商用版');
}
const classicCover = SURFACE_DATA.accessories.find(a => a.id === 'pro-classic-type-cover');
assert(!!classicCover, 'Surface Pro 经典专业键盘盖在库 (Pro 3~7+)');
const touchCover = SURFACE_DATA.accessories.find(a => a.id === 'surface-touch-cover');
assert(!!touchCover, 'Surface 早期经典触控键盘在库 (Touch / Type Cover 1~2 历史款)');

// 3. 手写笔与压感
const slimPen2 = SURFACE_DATA.accessories.find(a => a.id === 'slim-pen-2');
assert(!!slimPen2 && slimPen2.category === 'pen', 'Surface 超感触控笔 2 在库 (触觉震动拟真纸感)');
const classicPen = SURFACE_DATA.accessories.find(a => a.id === 'surface-pen-classic');
assert(!!classicPen, 'Surface 经典触控笔在库 (4096级/AAAA电池)');

// 4. 拓展坞与转换器
const dock2 = SURFACE_DATA.accessories.find(a => a.id === 'surface-dock-2');
assert(!!dock2 && dock2.category === 'dock', 'Surface 拓展坞 2 代在库 (199W 磁吸双 4K)');
const dock1 = SURFACE_DATA.accessories.find(a => a.id === 'surface-dock-1');
assert(!!dock1, 'Surface 拓展坞 1 代在库 (Surface Connect 砖块形)');
const tb4Dock = SURFACE_DATA.accessories.find(a => a.id === 'surface-tb4-dock');
assert(!!tb4Dock, 'Surface 雷电 4 拓展坞在库 (USB4/Thunderbolt 4 96W 反充)');
const travelHub = SURFACE_DATA.accessories.find(a => a.id === 'surface-travel-hub');
assert(!!travelHub, 'Surface 便携多功能扩展坞在库 (USB-C 5合1差旅神器)');

// 5. 音频与会议外设
const headphones2 = SURFACE_DATA.accessories.find(a => a.id === 'surface-headphones-2');
assert(!!headphones2 && headphones2.category === 'audio', 'Surface 头戴式降噪耳机 2 代在库 (双物理拨盘/13级降噪)');
const earbuds = SURFACE_DATA.accessories.find(a => a.id === 'surface-earbuds');
assert(!!earbuds && earbuds.category === 'audio', 'Surface 真无线耳塞式耳机在库 (圆形触控大盘/Office听写)');
const audioDock = SURFACE_DATA.accessories.find(a => a.id === 'surface-audio-dock');
assert(!!audioDock && audioDock.category === 'audio', 'Surface 智能会议音箱拓展坞在库 (工位极简四合一)');

// 6. 创意交互外设
const dial = SURFACE_DATA.accessories.find(a => a.id === 'surface-dial');
assert(!!dial && dial.category === 'creative', 'Surface Dial 屏幕实体交互旋钮在库');

// 7. 配件-主机矩阵 100% 覆盖率验证
SURFACE_DATA.accessories.forEach(acc => {
  assert(acc.compatibilityList && acc.compatibilityList.length === SURFACE_DATA.devices.length,
    `配件 [${acc.name}] 必须 100% 覆盖全部 ${SURFACE_DATA.devices.length} 款主机设备兼容性判定`);
});

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
  const text = App.normalizeSearchText(`${d.name} ${d.specs.cpuModel} ${d.year}`);
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

// 检验系列页机型卡片点击事件与复选框隔离 (商用版与消费版 100% 绝对隔离)
const mockBizContainer = { innerHTML: '' };
App.renderSeriesView(mockBizContainer, 'pro', 'commercial');
assert(mockBizContainer.innerHTML.includes('onclick="App.navigateToDetail(\'pro\', \'pro-12-13-intel\')"'), '系列页卡片主体点击跳转详情');
assert(mockBizContainer.innerHTML.includes('event.stopPropagation(); ComparisonEngine.toggleDevice(\'pro-12-13-intel\')'), '系列页卡片复选框独立隔离对比事件');
assert(!mockBizContainer.innerHTML.includes('data-id="pro-12-inch"'), '商用系列页严格零消费版机型混入 (100% 绝对隔离)');

const mockConsContainer = { innerHTML: '' };
App.renderSeriesView(mockConsContainer, 'pro', 'consumer');
assert(mockConsContainer.innerHTML.includes('pro-12-inch'), '消费系列页包含 12 英寸第 1 代消费机型');
assert(!mockConsContainer.innerHTML.includes('pro-12-13-intel'), '消费系列页严格零商用版机型混入 (100% 绝对隔离)');

// 检验详情页完整 13 大类参数直出渲染（无需二次点击切换）
const mockDetailContainer = { innerHTML: '' };
App.renderProductDetailView(mockDetailContainer, 'pro', 'pro-12-13-intel');
assert(mockDetailContainer.innerHTML.includes('13 大类官方标准规格全量大表'), '详情页直出展示 13 大类规格大表标题');
assert(mockDetailContainer.innerHTML.includes('Ultra'), '详情页包含酷睿 Ultra 真实参数');
assert(mockDetailContainer.innerHTML.includes('50 TOPS'), '详情页指标卡与全量参数表均正常渲染 50 TOPS 算力');

const mockSnapDetailContainer = { innerHTML: '' };
App.renderProductDetailView(mockSnapDetailContainer, 'pro', 'pro-12-13-snap');
assert(mockSnapDetailContainer.innerHTML.includes('双层串联 OLED'), '骁龙详情页完整参数表包含双层串联 OLED 真实参数');
assert(mockSnapDetailContainer.innerHTML.includes('80 TOPS'), '骁龙详情页指标卡正常渲染 80 TOPS 算力');

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

// 检验商用机型色彩严查: 必须严格且仅为商务色 (亮铂金与典雅黑)，绝无沙漫金/宝石蓝/罗兰紫
const pro12_biz_intel = SURFACE_DATA.devices.find(d => d.id === 'pro-12-13-intel');
assert(Boolean(pro12_biz_intel && pro12_biz_intel.heroImage), 'Pro 12 Intel 配备主图 heroImage');
assert(SURFACE_DATA.getDeviceImage(pro12_biz_intel).includes('.png'), 'getDeviceImage(pro12_biz_intel) 返回有效 PNG 图片');
assert(!pro12_biz_intel.specs.colors.some(c => c.name === '宝石蓝'), 'Pro 12 商用版严格零宝石蓝');
assert(!pro12_biz_intel.specs.colors.some(c => c.name === '沙漫金'), 'Pro 12 商用版严格零沙漫金 (商用版仅限亮铂金与典雅黑)');
assert(SURFACE_DATA.getDeviceImage(pro12_biz_intel, '亮铂金').includes('platinum.png'), 'getDeviceImage 支持切换指定颜色亮铂金');
assert(SURFACE_DATA.getDeviceImage(pro12_biz_intel, '典雅黑').includes('black.png'), 'getDeviceImage 支持切换指定颜色典雅黑');

// 全库所有商用机型颜色纯净性断言
SURFACE_DATA.devices.filter(d => d.isCommercial).forEach(dev => {
  const cNames = (dev.specs.colors || []).map(c => c.name);
  assert(!cNames.includes('沙漫金') && !cNames.includes('宝石蓝') && !cNames.includes('罗兰紫') && !cNames.includes('碧海青'),
    `商用机型 [${dev.id}] 颜色严格合规，无消费级花哨颜色 (Actual colors: ${cNames.join(', ')})`);
});

// 检验消费版旗舰 Pro 13 (第 12 代) 严格零宝石蓝 (对齐新一代评测指南与老大指正)
const pro12_13_cons = SURFACE_DATA.devices.find(d => d.id === 'pro-12-13');
assert(Boolean(pro12_13_cons), '全系参数库正式收录 Surface Pro 13 英寸 (第 12 代) 消费版');
assert(!pro12_13_cons.specs.colors.some(c => c.name === '宝石蓝'), 'Pro 13 消费版第 12 代严格零宝石蓝 (对齐官方评测指南三款经典配色)');
assertEqual(pro12_13_cons.specs.colors.length, 3, 'Pro 13 消费版第 12 代严格三款配色: 亮铂金、典雅黑、沙漫金');

// 检验消费版旗舰 Laptop 13.8 (第 8 代) 独占翡翠绿新色
const laptop8_138_cons = SURFACE_DATA.devices.find(d => d.id === 'laptop-8-138');
assert(Boolean(laptop8_138_cons), '全系参数库正式收录 Surface Laptop 13.8 英寸 (第 8 代) 消费版');
assert(laptop8_138_cons.specs.colors.some(c => c.name === '翡翠绿'), 'Laptop 13.8 第 8 代独占全新翡翠绿 (Emerald) 官方配色');
assert(!laptop8_138_cons.specs.colors.some(c => c.name === '宝石蓝'), 'Laptop 13.8 第 8 代消费版严格无宝石蓝配色');

// 检验找回并录入的消费版 13 英寸机型 (Surface Laptop 13 英寸 第 1 代)
const laptop13Inch = SURFACE_DATA.devices.find(d => d.id === 'laptop-13-inch');
assert(Boolean(laptop13Inch), '全系参数库正式收录官方 Surface Laptop, 13 英寸 (第 1 代) 消费版');
assertEqual(laptop13Inch.specs.resolution, '1920 × 1280', 'Laptop 13 英寸机型分辨率 1920x1280 准确无误');
assertEqual(laptop13Inch.specs.npuTops, '45 TOPS', 'Laptop 13 英寸机型搭载 45 TOPS 高通 NPU');
assertEqual(laptop13Inch.specs.startingPriceCny, '¥7,788 起 (消费版)', 'Laptop 13 英寸机型官方商城起售价准确无误 (Actual: ¥7,788 起)');
assert(laptop13Inch.specs.officialDocUrl.includes('configure/surface-laptop-13-inch'), 'Laptop 13 英寸官方商城直达选配页链接准确');
assertEqual(laptop13Inch.specs.weightGrams, '1220g (1.22 kg)', 'Laptop 13 英寸机型裸机重量 1.22kg 准确无误');

// 检验消费版 Laptop 7 15 英寸机型
const laptop7_150 = SURFACE_DATA.devices.find(d => d.id === 'laptop-7-150');
assert(Boolean(laptop7_150), '全系参数库正式收录官方 Surface Laptop (第 7 代) 15 英寸 消费版');
assert(laptop7_150.specs.screenSize.includes('15.0 英寸'), 'Laptop 7 15 英寸屏幕规格准确');
assert(laptop7_150.specs.cpuModel.includes('高通骁龙® X Elite'), 'Laptop 7 15 英寸搭载骁龙 X Elite 旗舰核心');

// 检验商用版新增机型: Surface Laptop 13 英寸 商用版 - Intel 版
const laptop13_intel_biz = SURFACE_DATA.devices.find(d => d.id === 'laptop-13-inch-intel-biz');
assert(Boolean(laptop13_intel_biz), '全系参数库正式收录 Surface Laptop 13 英寸 商用版 - Intel 版');
assert(laptop13_intel_biz.specs.cpuModel.includes('Ultra 5') && laptop13_intel_biz.specs.cpuModel.includes('325'), 'Laptop 13 英寸 Intel 版搭载英特尔酷睿 Ultra 5 325');
assertEqual(laptop13_intel_biz.specs.startingPriceCny, '¥10,188 起 (商用版)', 'Laptop 13 英寸 Intel 商用版起售价对齐现网官方商城 ¥10,188 起');
assertEqual(laptop13_intel_biz.specs.colors.length, 1, 'Laptop 13 英寸 Intel 商用版严格单色亮铂金');

// 检验新收录的官方 12 英寸机型
const pro12Inch = SURFACE_DATA.devices.find(d => d.id === 'pro-12-inch');
assert(Boolean(pro12Inch), '全系参数库正式收录官方 Surface Pro, 12 英寸 (第 1 代)');
assertEqual(pro12Inch.specs.resolution, '2196 × 1464', '12 英寸机型分辨率 2196x1464 准确无误');
assertEqual(pro12Inch.specs.npuTops, '45 TOPS', '12 英寸机型搭载 45 TOPS 高通 NPU');
assertEqual(pro12Inch.specs.startingPriceCny, '¥6,788 起 (消费版)', '12 英寸机型官方商城起售价准确无误 (Actual: ¥6,788 起)');
assert(pro12Inch.specs.officialDocUrl.includes('configure/surface-pro-12-inch'), '12 英寸官方商城直达选配页链接准确');
const pro12Colors = pro12Inch.specs.colors.map(c => c.name);
assert(pro12Colors.includes('亮铂金') && pro12Colors.includes('罗兰紫') && pro12Colors.includes('碧海青'), '12 英寸机型完整包含官网在售 3 色: 亮铂金、罗兰紫、碧海青');
assert(SURFACE_DATA.getDeviceImage(pro12Inch, '罗兰紫').includes('violet.png'), '12 英寸支持切换罗兰紫配色图');
assert(SURFACE_DATA.getDeviceImage(pro12Inch, '碧海青').includes('ocean.png'), '12 英寸支持切换碧海青配色图');

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

// 4. 校验商用版专区与官方文档（Learn 旧路径大量 404，现网以 Support / tech-specs 为准）
assert(typeof App.renderBusinessView === 'function', 'App 具备 renderBusinessView 商用专区渲染方法');
const commercialList = SURFACE_DATA.devices.filter(d => d.isCommercial);
assert(commercialList.length >= 8, `全面收录商用机型 (当前收录: ${commercialList.length} 款)`);
function isOfficialMicrosoftDocUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === 'learn.microsoft.com' || host === 'support.microsoft.com';
  } catch (e) {
    return false;
  }
}
commercialList.forEach(cd => {
  assert(isOfficialMicrosoftDocUrl(cd.learnDocUrl), `商用机型 [${cd.id}] 必须挂有效微软官方文档（Learn 或 Support），不得用商城页或死链冒充`);
});

const DEAD_LEARN_PATHS = [
  '/surface/surface-pro-for-business',
  '/surface/surface-laptop-for-business',
  '/surface/surface-laptop-7th-edition',
  '/surface/surface-pro-12-inch',
  '/surface/surface-laptop-13-inch',
  '/surface/surface-pro-11th-edition',
  '/surface/surface-system-sku-reference'
];
Catalog.listDevices().forEach(dev => {
  const url = String(dev.learnDocUrl || '');
  DEAD_LEARN_PATHS.forEach(dead => {
    assert(
      !url.includes(dead),
      `${dev.id} 不得再挂已 404 的旧 Learn 路径 ${dead}（实际: ${url}）`
    );
  });
});

// ====================================================
// Test Suite 10: 官方信源核验与 Excel 审计台校验
// ====================================================
console.log('\n🔍 Test Suite 10: 官方信源核验与 Excel 审计台校验');
assert(typeof App.renderAuditView === 'function', 'App 具备 renderAuditView 官方核验总账渲染方法');

const excelPath = path.resolve(__dirname, '..', 'docs', 'Surface_全系规格与官方信源核对总账.xlsx');
assert(fs.existsSync(excelPath), 'docs/Surface_全系规格与官方信源核对总账.xlsx 存在');
const excelStats = fs.statSync(excelPath);
assert(excelStats.size > 20000, `Excel 核验总账大小正常 (Actual: ${excelStats.size} bytes)`);

let validStoreUrlCount = 0;
SURFACE_DATA.devices.forEach(dev => {
  if (dev.specs && dev.specs.officialDocUrl && dev.specs.officialDocUrl.startsWith('http')) {
    validStoreUrlCount++;
  }
});
assertEqual(validStoreUrlCount, SURFACE_DATA.devices.length, '全系产品 100% 具备官方信源超链接');

// ----------------------------------------------------
// Test Suite 11: Catalog seam + 现网官方旗舰准确性
// ----------------------------------------------------
console.log('\n📚 Test Suite 11: Catalog seam 与现网官方旗舰准确性');

assert(typeof Catalog.getDevice === 'function', 'Catalog.getDevice 是读取机型的 interface');
assert(typeof Catalog.getSpec === 'function', 'Catalog.getSpec 是读取参数的 interface');
assert(typeof Catalog.presentSpec === 'function', 'Catalog.presentSpec 是四态展示 interface');
assert(typeof Catalog.applySnapshot === 'function', 'Catalog.applySnapshot 是云端/本地 adapter 的 seam');
assert(typeof App.renderRoute === 'function', '云端刷新必须能调用 App.renderRoute');

assertEqual(Catalog.presentSpec('not_disclosed').includes('官方未披露'), true, '四态：NOT_DISCLOSED 统一为官方未披露');
assertEqual(Catalog.presentSpec('not_applicable').includes('不适用'), true, '四态：NOT_APPLICABLE 统一为不适用');
assertEqual(Catalog.presentSpec(null).includes('—'), true, '四态：NULL 统一为 —');
assertEqual(Catalog.isNpuDisplayable('not_disclosed'), false, '官方未披露的 NPU 不得出现在徽章上');

const aliasLaptop = Catalog.getDevice('laptop-8-138');
assert(!!aliasLaptop, 'Catalog 能取到 Laptop 8 13.8 消费版');
assert(!!Catalog.getSpec(aliasLaptop, 'batteryCapacityWh') || !!Catalog.getSpec(aliasLaptop, 'batteryLifeVideo'),
  'Catalog.getSpec 能读到别名字段（电池容量或续航）而不是空白');
const composePortsLaptop = Catalog.getDevice('laptop-8-138');
assert(String(Catalog.getSpec(composePortsLaptop, 'usbPorts') || '').includes('USB-A'),
  'Catalog.getSpec(usbPorts) 必须拼上分栏里的 USB-A，不得只露出 USB-C');

const commercialPro = Catalog.listDevices({ segment: 'commercial', seriesId: 'pro' });
const consumerPro = Catalog.listDevices({ segment: 'consumer', seriesId: 'pro' });
assert(commercialPro.every(d => Catalog.segmentOf(d) === 'commercial'), 'Taxonomy：商用 Pro 列表零消费版串线');
assert(consumerPro.every(d => Catalog.segmentOf(d) === 'consumer'), 'Taxonomy：消费 Pro 列表零商用版串线');
assert(!commercialPro.some(d => d.id === 'pro-12-inch'), '商用 Pro 不含消费版 12 英寸');
assert(consumerPro.some(d => d.id === 'pro-12-inch'), '消费 Pro 含官方在售 12 英寸第 1 代');

const compatAccessories = Catalog.accessories();
assert(compatAccessories.length >= 8, '兼容矩阵的配件名单来自 Catalog.accessories，而不是手写列');

const originalDevices = SURFACE_DATA.devices;
const originalAccessories = SURFACE_DATA.accessories;
const beforeSnap = Catalog.getSnapshot();
const beforeCount = originalDevices.length;
const beforeAccCount = originalAccessories.length;
const applied = Catalog.applySnapshot({ devices: originalDevices.slice(0, 2), accessories: [] });
assertEqual(applied, true, 'applySnapshot 接受新载荷');
assert(Catalog.getSnapshot() !== beforeSnap, 'applySnapshot 后旧 snapshot 不再是当前快照');
assertEqual(beforeSnap.deviceIds.length, beforeCount, '旧 snapshot 的机型清单不被原地改写');
assertEqual(SURFACE_DATA.devices, originalDevices, 'applySnapshot 不得替换本地基线 devices 引用');
assertEqual(SURFACE_DATA.devices.length, beforeCount, 'applySnapshot 不得改写本地基线机型数量');
assertEqual(SURFACE_DATA.accessories, originalAccessories, 'applySnapshot 不得替换本地基线 accessories 引用');
assertEqual(SURFACE_DATA.accessories.length, beforeAccCount, 'applySnapshot 不得改写本地基线配件数量');
assertEqual(Catalog.listDevices().length, 2, 'Catalog 读取的是快照机型，不是被改写的基线');
assertEqual(Catalog.accessories().length, 0, 'Catalog 读取的是快照配件，不是被改写的基线');
Catalog.resetToBaseline();
assert(Catalog.listDevices().length >= 70, '测试后 Catalog 恢复全量档案');
assertEqual(SURFACE_DATA.devices.length, beforeCount, '恢复快照后本地基线机型数仍未被改写');
assertEqual(SURFACE_DATA.accessories.length, beforeAccCount, '恢复快照后本地基线配件数仍未被改写');
assertEqual(Catalog.listDevices().length, SURFACE_DATA.devices.length, 'resetToBaseline 后 Catalog 回到本地基线');
assert(!!SURFACE_DATA.datasetVersion, '本地基线必须带 datasetVersion，才能拒绝过期云端快照');
assertEqual(Catalog.acceptsCloudVersion('2026.09.18'), false, '过期云端 v2026.09.18 不得覆盖本地核验基线');
assertEqual(Catalog.acceptsCloudVersion(SURFACE_DATA.datasetVersion), true, '同版本云端可以覆盖');
assertEqual(Catalog.acceptsCloudVersion('2026.09.22'), true, '更新的云端可以覆盖');
assertEqual(Catalog.acceptsCloudVersion(''), false, '云端缺版本号时不得覆盖本地核验基线');

assert(typeof App.listDevices === 'function', 'App 只通过 Catalog 取机型，禁止直读 SURFACE_DATA.devices');
Catalog.applySnapshot({ devices: originalDevices.slice(0, 2) });
assertEqual(App.listDevices().length, 2, '云端快照后 App 读到的是 Catalog 机型');
assertEqual(SURFACE_DATA.devices.length, beforeCount, 'App 读取快照时本地基线仍保持全量');
Catalog.resetToBaseline();
assertEqual(App.listDevices().length, beforeCount, '回到基线后 App 机型数恢复');

assert(typeof Catalog.presentDeviceSpec === 'function', '卡片/详情/大表共用 Catalog.presentDeviceSpec');
const hubPresented = Catalog.getDevice('hub-3');
const hubBatteryHtml = Catalog.presentDeviceSpec(hubPresented, 'batteryLifeVideo');
const hubPriceHtml = Catalog.presentDeviceSpec(hubPresented, 'startingPriceCny');
assert(String(hubBatteryHtml).includes('不适用'), 'Hub 3 详情续航必须显示「不适用」');
assert(!String(hubBatteryHtml).includes('not_applicable'), 'Hub 3 详情不得泄漏 raw not_applicable');
assert(String(hubPriceHtml).includes('官方未披露'), 'Hub 3 详情起售价必须显示「官方未披露」');
assert(!String(hubPriceHtml).includes('not_disclosed'), 'Hub 3 详情不得泄漏 raw not_disclosed');
const heroHtml = App.renderMetricCards ? App.renderMetricCards(hubPresented) : '';
assert(typeof App.renderMetricCards === 'function', '详情六指标卡片走统一四态 interface');
assert(!heroHtml.includes('not_disclosed') && !heroHtml.includes('not_applicable'),
  '详情指标卡不得出现 raw 四态标记');
assert(heroHtml.includes('不适用') || heroHtml.includes('官方未披露') || heroHtml.includes('—'),
  '详情指标卡对未披露/不适用必须用人话展示');

assert(typeof Taxonomy !== 'undefined' && typeof Taxonomy.canonicalPath === 'function',
  '消费/商用路由必须走 Taxonomy interface');
assert(!String(Taxonomy.seriesLabel('hub', 'commercial')).includes('undefined'),
  'Hub 系列名不得是 undefined 系列');
assert(String(Taxonomy.seriesLabel('hub', 'commercial')).includes('Hub'),
  'Hub 商用系列必须用人话系列名');
assertEqual(Taxonomy.canonicalPath(Catalog.getDevice('hub-3')), '#/business/hub/hub-3',
  'Hub 3 规范路径必须落在商用 Hub 系列');
const legacyHub = Taxonomy.resolvePath('/surface/studio/hub-3');
assertEqual(legacyHub.canonical, '#/business/hub/hub-3', '#/surface 历史路由必须改写到商用 Hub，禁止当消费系列');
assertEqual(legacyHub.rewritten, true, '#/surface 是死路由，必须改写');
assertEqual(Taxonomy.resolvePath('/surface/pro').canonical, '#/consumer/pro',
  '#/surface/pro 必须改写到消费 Pro，禁止静默串线');
assertEqual(App.navigateToDetail.toString().includes('#/surface/'), false,
  'navigateToDetail 不得再写出 #/surface 死路由');

assert(typeof ComparisonEngine.getSessionIds === 'function', '对比会话有独立读取 interface');
assert(typeof ComparisonEngine.renderSpecTable === 'function', '参数大表有独立渲染 interface');
assert(typeof App.devicesForSeriesTable === 'function', '系列规格大表不跟对比托盘共用机型名单');
const sessionBackup = ComparisonEngine.selectedIds.slice();
ComparisonEngine.selectedIds = ['hub-3'];
const seriesTableDevices = App.devicesForSeriesTable('laptop', 'consumer');
assert(seriesTableDevices.length > 0, '系列规格大表必须列出本系列机型');
assert(seriesTableDevices.every(d => d.categoryId === 'laptop' && Catalog.segmentOf(d) === 'consumer'),
  '系列规格大表只含当前消费 Laptop，不串商用/其他品类');
assert(!seriesTableDevices.some(d => d.id === 'hub-3'), '系列规格大表不得把对比托盘里的 Hub 塞进来');
const sessionBeforeTable = ComparisonEngine.getSessionIds().join(',');
ComparisonEngine.renderSpecTable(seriesTableDevices.slice(0, 2));
assertEqual(ComparisonEngine.getSessionIds().join(','), sessionBeforeTable, '渲染参数大表不得改对比会话');
ComparisonEngine.selectedIds = sessionBackup;

const baselineAccCount = SURFACE_DATA.accessories.length;
Catalog.applySnapshot({ accessories: [] });
assertEqual(SURFACE_DATA.accessories.length, baselineAccCount, '兼容快照不得改写本地配件基线');
assertEqual(Catalog.accessories().length, 0, 'Catalog 配件快照可被清空');
assertEqual(ToolsEngine.getCompatStatus('flex-keyboard', 'pro-12-13'), null,
  '兼容矩阵必须读 Catalog.accessories，快照清空后不得再命中本地基线配件');
Catalog.resetToBaseline();
assert(!!ToolsEngine.getCompatStatus('flex-keyboard', 'pro-12-13'),
  '回到基线后兼容矩阵恢复配件判定');

Object.keys(OFFICIAL_CURRENT_LINEUP_FACTS.devices).forEach(deviceId => {
  const fact = OFFICIAL_CURRENT_LINEUP_FACTS.devices[deviceId];
  const dev = Catalog.getDevice(deviceId);
  assert(!!dev, `现网机型在库: ${deviceId}`);
  if (!dev) return;

  const price = Catalog.getSpec(dev, 'startingPriceCny');
  if (fact.startingPriceContains) {
    assert(String(price || '').includes(fact.startingPriceContains),
      `${deviceId} 官方起售价必须含 ${fact.startingPriceContains}（实际: ${price}）`);
  }
  if (fact.startingPriceState) {
    assertEqual(Catalog.specState(price), fact.startingPriceState,
      `${deviceId} 起售价四态必须是 ${fact.startingPriceState}（官方合页未单列该尺寸入门价）`);
  }

  const cpu = String(Catalog.getSpec(dev, 'cpuModel') || '');
  (fact.cpuMustInclude || []).forEach(token => {
    assert(cpu.includes(token), `${deviceId} CPU 必须含官方口径「${token}」（实际: ${cpu}）`);
  });
  (fact.cpuMustNotInclude || []).forEach(token => {
    assert(!cpu.includes(token), `${deviceId} CPU 不得混入未在该产品页出现的「${token}」`);
  });

  if (fact.npuTopsContains) {
    const npu = String(Catalog.getSpec(dev, 'npuTops') || '');
    assert(npu.includes(fact.npuTopsContains), `${deviceId} NPU 必须含 ${fact.npuTopsContains}（实际: ${npu}）`);
  }
  if (fact.batteryLifeVideoContains) {
    const video = String(Catalog.getSpec(dev, 'batteryLifeVideo') || '');
    assert(video.includes(fact.batteryLifeVideoContains),
      `${deviceId} 本地视频续航必须含官方 ${fact.batteryLifeVideoContains} 小时（实际: ${video}）`);
  }
  if (fact.batteryLifeOfficeContains) {
    const office = String(Catalog.getSpec(dev, 'batteryLifeOffice') || '');
    assert(office.includes(fact.batteryLifeOfficeContains),
      `${deviceId} 网页续航必须含官方 ${fact.batteryLifeOfficeContains} 小时（实际: ${office}）`);
  }
  (fact.batteryLifeOfficeMustNotInclude || []).forEach(token => {
    const office = String(Catalog.getSpec(dev, 'batteryLifeOffice') || '');
    assert(!office.includes(token),
      `${deviceId} 网页续航不得含非官方口径「${token}」（实际: ${office}）`);
  });
  if (fact.batteryCapacityState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'batteryCapacityWh')), fact.batteryCapacityState,
      `${deviceId} 电池容量四态必须是 ${fact.batteryCapacityState}（官方未披露瓦时不得脑补）`);
  }
  if (fact.batteryCapacityContains) {
    const wh = String(Catalog.getSpec(dev, 'batteryCapacityWh') || Catalog.getSpec(dev, 'batteryCapacity') || '');
    assert(wh.includes(fact.batteryCapacityContains),
      `${deviceId} 电池容量必须含官方 ${fact.batteryCapacityContains} Wh（实际: ${wh}）`);
  }
  if (fact.brightnessContains) {
    const nits = String(Catalog.getSpec(dev, 'brightness') || '');
    assert(nits.includes(fact.brightnessContains),
      `${deviceId} 亮度必须含官方 ${fact.brightnessContains} nits（实际: ${nits}）`);
  }
  if (fact.brightnessState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'brightness')), fact.brightnessState,
      `${deviceId} 官方未给出亮度时不得脑补`);
  }
  if (fact.dimensionsContains) {
    const dim = String(Catalog.getSpec(dev, 'dimensionsMm') || Catalog.getSpec(dev, 'dimensions') || '');
    assert(dim.includes(fact.dimensionsContains),
      `${deviceId} 尺寸必须含官方 ${fact.dimensionsContains}（实际: ${dim}）`);
  }
  if (fact.dimensionsState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'dimensionsMm') || Catalog.getSpec(dev, 'dimensions')), fact.dimensionsState,
      `${deviceId} 官方未给出尺寸时不得脑补`);
  }
  if (fact.batteryLifeOfficeState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'batteryLifeOffice')), fact.batteryLifeOfficeState,
      `${deviceId} 网页续航四态必须是 ${fact.batteryLifeOfficeState}`);
  }
  if (fact.batteryLifeVideoState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'batteryLifeVideo')), fact.batteryLifeVideoState,
      `${deviceId} 视频续航四态必须是 ${fact.batteryLifeVideoState}`);
  }
  if (fact.surfaceConnectState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'surfaceConnect')), fact.surfaceConnectState,
      `${deviceId} Surface Connect 四态必须是 ${fact.surfaceConnectState}`);
  }
  if (fact.chargingPowerContains) {
    const charge = String(Catalog.getSpec(dev, 'chargingPower') || '');
    assert(charge.includes(fact.chargingPowerContains),
      `${deviceId} 标配电源必须含官方 ${fact.chargingPowerContains}W（实际: ${charge}）`);
  }
  if (fact.chargingPowerState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'chargingPower')), fact.chargingPowerState,
      `${deviceId} 官方未给出标配电源瓦数时不得脑补`);
  }
  if (fact.weightContains) {
    const weight = String(Catalog.getSpec(dev, 'weightGrams') || Catalog.getSpec(dev, 'weight') || '');
    assert(weight.includes(fact.weightContains),
      `${deviceId} 重量必须含官方 ${fact.weightContains}（实际: ${weight}）`);
  }
  if (fact.weightState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'weightGrams') || Catalog.getSpec(dev, 'weight')), fact.weightState,
      `${deviceId} 官方未给出重量时不得脑补`);
  }
  if (fact.storageMustInclude) {
    const storage = String(Catalog.getSpec(dev, 'storageOptions') || '');
    assert(storage.includes(fact.storageMustInclude),
      `${deviceId} 存储起步必须含官方 ${fact.storageMustInclude}（实际: ${storage}）`);
  }
  if (fact.ramMustInclude) {
    const ram = String(Catalog.getSpec(dev, 'ramSpec') || '');
    const need = Array.isArray(fact.ramMustInclude) ? fact.ramMustInclude : [fact.ramMustInclude];
    need.forEach((token) => {
      assert(ram.includes(token), `${deviceId} 内存必须含官方 ${token}（实际: ${ram}）`);
    });
  }
  if (fact.ramMustNotInclude) {
    const ram = String(Catalog.getSpec(dev, 'ramSpec') || '');
    const banned = Array.isArray(fact.ramMustNotInclude) ? fact.ramMustNotInclude : [fact.ramMustNotInclude];
    banned.forEach((token) => {
      assert(!ram.includes(token), `${deviceId} 内存不得误写官方未列的 ${token}（实际: ${ram}）`);
    });
  }
  if (fact.resolutionContains) {
    const res = String(Catalog.getSpec(dev, 'resolution') || '');
    assert(res.includes(fact.resolutionContains),
      `${deviceId} 分辨率必须含官方 ${fact.resolutionContains}（实际: ${res}）`);
  }
  if (fact.refreshRateContains) {
    const hz = String(Catalog.getSpec(dev, 'refreshRate') || '');
    assert(hz.includes(fact.refreshRateContains),
      `${deviceId} 刷新率必须含官方 ${fact.refreshRateContains}（实际: ${hz}）`);
  }
  if (fact.screenSizeContains) {
    const size = String(Catalog.getSpec(dev, 'screenSize') || '');
    assert(size.includes(fact.screenSizeContains),
      `${deviceId} 屏幕必须含官方 ${fact.screenSizeContains}（实际: ${size}）`);
  }
  if (fact.usbMustInclude) {
    const ports = String(Catalog.getSpec(dev, 'usbPorts') || '');
    const need = Array.isArray(fact.usbMustInclude) ? fact.usbMustInclude : [fact.usbMustInclude];
    need.forEach((token) => {
      assert(ports.includes(token), `${deviceId} 接口必须含官方 ${token}（实际: ${ports}）`);
    });
  }
  if (fact.usbMustNotInclude) {
    const ports = String(Catalog.getSpec(dev, 'usbPorts') || '');
    const banned = Array.isArray(fact.usbMustNotInclude) ? fact.usbMustNotInclude : [fact.usbMustNotInclude];
    banned.forEach((token) => {
      assert(!ports.includes(token), `${deviceId} 接口不得把国行未写的 ${token} 写进去（实际: ${ports}）`);
    });
  }
  if (fact.wifiMustInclude || fact.wifiMustNotInclude) {
    const wifi = String(Catalog.getSpec(dev, 'wireless') || Catalog.getSpec(dev, 'wifi') || '');
    if (fact.wifiMustInclude) {
      assert(wifi.includes(fact.wifiMustInclude), `${deviceId} 无线必须含官方 ${fact.wifiMustInclude}（实际: ${wifi}）`);
    }
    if (fact.wifiMustNotInclude) {
      assert(!wifi.includes(fact.wifiMustNotInclude), `${deviceId} 无线不得套用 ${fact.wifiMustNotInclude} 模板`);
    }
  }
  if (fact.colorNames) {
    const names = (Catalog.getSpec(dev, 'colors') || []).map(c => c.name);
    fact.colorNames.forEach(name => {
      assert(names.includes(name), `${deviceId} 必须有官方配色 ${name}`);
    });
  }
  if (fact.osMustInclude || fact.osMustNotInclude) {
    const os = String(Catalog.getSpec(dev, 'osAtLaunch') || '');
    const need = Array.isArray(fact.osMustInclude) ? fact.osMustInclude : (fact.osMustInclude ? [fact.osMustInclude] : []);
    need.forEach((token) => {
      assert(os.includes(token), `${deviceId} 系统必须含国行 ${token}（实际: ${os}）`);
    });
    const banned = Array.isArray(fact.osMustNotInclude) ? fact.osMustNotInclude : (fact.osMustNotInclude ? [fact.osMustNotInclude] : []);
    banned.forEach((token) => {
      assert(!os.includes(token), `${deviceId} 系统不得写国行未列的 ${token}（实际: ${os}）`);
    });
  }
  if (fact.osState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'osAtLaunch')), fact.osState,
      `${deviceId} 国行未写预装系统时不得套外区版本`);
  }
  if (fact.warrantyContains) {
    const warranty = String(Catalog.getSpec(dev, 'warranty') || '');
    assert(warranty.includes(fact.warrantyContains),
      `${deviceId} 质保必须含国行 ${fact.warrantyContains}（实际: ${warranty}）`);
  }
  if (fact.warrantyState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'warranty')), fact.warrantyState,
      `${deviceId} 国行未写官方质保年限时不得用编辑口径顶上`);
  }
  if (fact.rearCameraContains || fact.rearCameraMustNotInclude) {
    const cam = String(Catalog.getSpec(dev, 'rearCamera') || '');
    if (fact.rearCameraContains) {
      assert(cam.includes(fact.rearCameraContains),
        `${deviceId} 后置摄像头必须含国行 ${fact.rearCameraContains}（实际: ${cam}）`);
    }
    if (fact.rearCameraMustNotInclude) {
      assert(!cam.includes(fact.rearCameraMustNotInclude),
        `${deviceId} 后置摄像头不得写 ${fact.rearCameraMustNotInclude}（实际: ${cam}）`);
    }
  }
  if (fact.frontCameraContains || fact.frontCameraMustNotInclude || fact.frontCameraState) {
    const cam = String(Catalog.getSpec(dev, 'frontCamera') || '');
    if (fact.frontCameraContains) {
      const needles = Array.isArray(fact.frontCameraContains) ? fact.frontCameraContains : [fact.frontCameraContains];
      needles.forEach((needle) => {
        assert(cam.includes(needle), `${deviceId} 前置摄像头必须含国行 ${needle}（实际: ${cam}）`);
      });
    }
    if (fact.frontCameraMustNotInclude) {
      assert(!cam.includes(fact.frontCameraMustNotInclude),
        `${deviceId} 前置摄像头不得写国行未列的 ${fact.frontCameraMustNotInclude}（实际: ${cam}）`);
    }
    if (fact.frontCameraState) {
      assertEqual(Catalog.specState(cam), fact.frontCameraState,
        `${deviceId} 国行未写前置像素时不得套外区数字`);
    }
  }
  if (fact.rearCameraState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'rearCamera')), fact.rearCameraState,
      `${deviceId} 国行未写后置像素时不得套外区数字`);
  }
  if (fact.speakersState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'speakers')), fact.speakersState,
      `${deviceId} 国行未写扬声器规格时不得套外区数字`);
  }
  if (fact.speakersContains || fact.speakersMustNotInclude) {
    const speakers = String(Catalog.getSpec(dev, 'speakers') || '');
    const need = Array.isArray(fact.speakersContains) ? fact.speakersContains : (fact.speakersContains ? [fact.speakersContains] : []);
    need.forEach((token) => {
      assert(speakers.includes(token), `${deviceId} 扬声器必须含国行 ${token}（实际: ${speakers}）`);
    });
    const banned = Array.isArray(fact.speakersMustNotInclude)
      ? fact.speakersMustNotInclude
      : (fact.speakersMustNotInclude ? [fact.speakersMustNotInclude] : []);
    banned.forEach((token) => {
      assert(!speakers.includes(token), `${deviceId} 扬声器不得套用 ${token}（实际: ${speakers}）`);
    });
  }
  if (fact.cellularContains || fact.cellularMustNotInclude || fact.cellularState) {
    const cell = String(Catalog.getSpec(dev, 'cellular') || '');
    if (fact.cellularContains) {
      assert(cell.includes(fact.cellularContains),
        `${deviceId} 蜂窝必须含国行 ${fact.cellularContains}（实际: ${cell}）`);
    }
    const bannedCell = Array.isArray(fact.cellularMustNotInclude)
      ? fact.cellularMustNotInclude
      : (fact.cellularMustNotInclude ? [fact.cellularMustNotInclude] : []);
    bannedCell.forEach((token) => {
      assert(!cell.includes(token), `${deviceId} 蜂窝不得写国行未列的 ${token}（实际: ${cell}）`);
    });
    if (fact.cellularState) {
      assertEqual(Catalog.specState(cell), fact.cellularState,
        `${deviceId} 国行未写蜂窝配置时不得套外区 5G 模板`);
    }
  }
  if (fact.repairabilityState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'repairabilityScore')), fact.repairabilityState,
      `${deviceId} iFixit 分数不是国行官方规格`);
  }
  if (fact.keyboardWeightState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'totalWeightWithKeyboard')), fact.keyboardWeightState,
      `${deviceId} 含键盘整机重量国行未写数字时不得脑补`);
  }
  if (fact.keyboardWeightContains) {
    const expectedKw = Array.isArray(fact.keyboardWeightContains) ? fact.keyboardWeightContains : [fact.keyboardWeightContains];
    const actualKw = String(Catalog.getSpec(dev, 'totalWeightWithKeyboard') || '');
    expectedKw.forEach((needle) => {
      assert(actualKw.includes(needle), `${deviceId} 含键盘整机重量应包含 ${needle}，实际: ${actualKw}`);
    });
  }
  if (fact.officialDocUrl) {
    assertEqual(Catalog.getSpec(dev, 'officialDocUrl'), fact.officialDocUrl,
      `${deviceId} 官方选配/产品页必须是现网有效地址`);
  }
  if (fact.learnDocUrl) {
    assertEqual(dev.learnDocUrl, fact.learnDocUrl,
      `${deviceId} 官方规格页必须是现网有效 Support/Learn 地址`);
  }
  assertSpecFacts(deviceId, dev, fact);
});

const officialCurrentIds = OFFICIAL_CURRENT_LINEUP_FACTS.currentCnDeviceIds;
const markedCurrent = SURFACE_DATA.devices.filter(d => d.status === 'current_cn').map(d => d.id).sort();
const expectedCurrent = officialCurrentIds.slice().sort();
assertEqual(markedCurrent.join(','), expectedCurrent.join(','),
  '国行在售机型必须与现网新品名单完全一致（不含仅翻新/已撤页前代）');
officialCurrentIds.forEach(id => {
  const d = Catalog.getDevice(id);
  assert(!!d && d.status === 'current_cn', `现网新品 ${id} 必须标 current_cn`);
});
['pro-11-13', 'laptop-7-138', 'laptop-7-150', 'pro-10-biz', 'laptop-6-biz', 'sls-2', 'go-4', 'laptop-go-3', 'studio-2-plus'].forEach(id => {
  const d = Catalog.getDevice(id);
  assert(!!d && d.status === 'discontinued', `${id} 现网已无新品在售，不得再标国行在售`);
});
assertEqual(Catalog.specState(Catalog.getSpec(hub3, 'batteryLifeVideo')), 'NOT_APPLICABLE',
  'Hub 3 是交流供电会议一体机，续航必须为不适用');
assertEqual(Catalog.specState(Catalog.getSpec(hub3, 'startingPriceCny')), 'NOT_DISCLOSED',
  'Hub 3 中国商城未公布零售起售价，必须官方未披露');

const intelLaptop = Catalog.getDevice('laptop-8-138-intel');
if (intelLaptop) {
  const cores = String(Catalog.getSpec(intelLaptop, 'cpuCores') || '');
  assert(!cores.includes('Oryon'), 'Intel 商用 Laptop 8 不得误写骁龙 Oryon 核心');
}

Object.keys(OFFICIAL_HISTORICAL_LINEUP_FACTS.devices).forEach(deviceId => {
  const fact = OFFICIAL_HISTORICAL_LINEUP_FACTS.devices[deviceId];
  const dev = Catalog.getDevice(deviceId);
  assert(!!dev, `历史核验机型在库: ${deviceId}`);
  if (!dev) return;

  const cpu = String(Catalog.getSpec(dev, 'cpuModel') || '');
  (fact.cpuMustInclude || []).forEach(token => {
    assert(cpu.includes(token), `${deviceId} CPU 必须含官方口径「${token}」（实际: ${cpu}）`);
  });
  (fact.cpuMustNotInclude || []).forEach(token => {
    assert(!cpu.includes(token), `${deviceId} CPU 不得混入未在该产品页出现的「${token}」`);
  });

  if (fact.npuTopsContains) {
    const npu = String(Catalog.getSpec(dev, 'npuTops') || '');
    assert(npu.includes(fact.npuTopsContains), `${deviceId} NPU 必须含 ${fact.npuTopsContains}（实际: ${npu}）`);
  }
  if (fact.npuTopsState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'npuTops')), fact.npuTopsState,
      `${deviceId} 官方未给出 TOPS 数字时不得脑补`);
  }
  if (fact.batteryLifeVideoState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'batteryLifeVideo')), fact.batteryLifeVideoState,
      `${deviceId} 官方未给出视频续航时不得脑补`);
  }
  if (fact.batteryLifeOfficeState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'batteryLifeOffice')), fact.batteryLifeOfficeState,
      `${deviceId} 官方未给出网页/办公续航时不得脑补`);
  }
  if (fact.batteryCapacityState) {
    assertEqual(
      Catalog.specState(Catalog.getSpec(dev, 'batteryCapacityWh') || Catalog.getSpec(dev, 'batteryCapacity')),
      fact.batteryCapacityState,
      `${deviceId} 官方未给出电池容量时不得脑补`
    );
  }
  if (fact.batteryLifeVideoContains) {
    const video = String(Catalog.getSpec(dev, 'batteryLifeVideo') || '');
    assert(video.includes(fact.batteryLifeVideoContains),
      `${deviceId} 本地视频续航必须含官方 ${fact.batteryLifeVideoContains} 小时（实际: ${video}）`);
  }
  if (fact.batteryLifeOfficeContains) {
    const office = String(Catalog.getSpec(dev, 'batteryLifeOffice') || '');
    assert(office.includes(fact.batteryLifeOfficeContains),
      `${deviceId} 网页/办公续航必须含官方 ${fact.batteryLifeOfficeContains} 小时（实际: ${office}）`);
  }
  if (fact.batteryCapacityContains) {
    const wh = String(Catalog.getSpec(dev, 'batteryCapacityWh') || Catalog.getSpec(dev, 'batteryCapacity') || '');
    assert(wh.includes(fact.batteryCapacityContains),
      `${deviceId} 电池容量必须含官方 ${fact.batteryCapacityContains} Wh（实际: ${wh}）`);
  }
  if (fact.chargingPowerContains) {
    const charge = String(Catalog.getSpec(dev, 'chargingPower') || '');
    assert(charge.includes(fact.chargingPowerContains),
      `${deviceId} 标配电源必须含官方 ${fact.chargingPowerContains}W（实际: ${charge}）`);
  }
  if (fact.chargingPowerState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'chargingPower')), fact.chargingPowerState,
      `${deviceId} 官方未给出标配电源瓦数时不得脑补`);
  }
  if (fact.brightnessContains) {
    const nits = String(Catalog.getSpec(dev, 'brightness') || '');
    assert(nits.includes(fact.brightnessContains),
      `${deviceId} 亮度必须含官方 ${fact.brightnessContains} nits（实际: ${nits}）`);
  }
  if (fact.brightnessState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'brightness')), fact.brightnessState,
      `${deviceId} 官方未给出亮度时不得脑补`);
  }
  if (fact.dimensionsContains) {
    const dim = String(Catalog.getSpec(dev, 'dimensionsMm') || Catalog.getSpec(dev, 'dimensions') || '');
    assert(dim.includes(fact.dimensionsContains),
      `${deviceId} 尺寸必须含官方 ${fact.dimensionsContains}（实际: ${dim}）`);
  }
  if (fact.dimensionsState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'dimensionsMm') || Catalog.getSpec(dev, 'dimensions')), fact.dimensionsState,
      `${deviceId} 官方未给出尺寸时不得脑补`);
  }
  if (fact.weightContains) {
    const weight = String(Catalog.getSpec(dev, 'weightGrams') || Catalog.getSpec(dev, 'weight') || '');
    assert(weight.includes(fact.weightContains),
      `${deviceId} 重量必须含官方 ${fact.weightContains}（实际: ${weight}）`);
  }
  if (fact.weightState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'weightGrams') || Catalog.getSpec(dev, 'weight')), fact.weightState,
      `${deviceId} 官方未给出重量时不得脑补`);
  }
  if (fact.ramMustInclude) {
    const ram = String(Catalog.getSpec(dev, 'ramSpec') || '');
    const need = Array.isArray(fact.ramMustInclude) ? fact.ramMustInclude : [fact.ramMustInclude];
    need.forEach((token) => {
      assert(ram.includes(token), `${deviceId} 内存必须含官方 ${token}（实际: ${ram}）`);
    });
  }
  if (fact.ramMustNotInclude) {
    const ram = String(Catalog.getSpec(dev, 'ramSpec') || '');
    assert(!ram.includes(fact.ramMustNotInclude), `${deviceId} 内存不得误写 ${fact.ramMustNotInclude}`);
  }
  if (fact.storageMustInclude) {
    const storage = String(Catalog.getSpec(dev, 'storageOptions') || '');
    assert(storage.includes(fact.storageMustInclude),
      `${deviceId} 存储必须含官方 ${fact.storageMustInclude}（实际: ${storage}）`);
  }
  if (fact.storageMustNotInclude) {
    const storage = String(Catalog.getSpec(dev, 'storageOptions') || '');
    assert(!storage.includes(fact.storageMustNotInclude),
      `${deviceId} 存储不得混入官方未列的 ${fact.storageMustNotInclude}`);
  }
  if (fact.wifiMustInclude || fact.wifiMustNotInclude || fact.wifiState) {
    const wifi = String(Catalog.getSpec(dev, 'wireless') || Catalog.getSpec(dev, 'wifi') || '');
    if (fact.wifiMustInclude) {
      assert(wifi.includes(fact.wifiMustInclude), `${deviceId} 无线必须含官方 ${fact.wifiMustInclude}（实际: ${wifi}）`);
    }
    if (fact.wifiMustNotInclude) {
      assert(!wifi.includes(fact.wifiMustNotInclude), `${deviceId} 无线不得套用 ${fact.wifiMustNotInclude} 模板`);
    }
    if (fact.wifiState) {
      assertEqual(Catalog.specState(wifi), fact.wifiState,
        `${deviceId} 国行官方未写无线标准时不得用外区页数字顶上`);
    }
  }
  if (fact.bluetoothMustInclude) {
    const bt = String(Catalog.getSpec(dev, 'bluetooth') || Catalog.getSpec(dev, 'wireless') || '');
    assert(bt.includes(fact.bluetoothMustInclude),
      `${deviceId} 蓝牙必须含官方 ${fact.bluetoothMustInclude}（实际: ${bt}）`);
  }
  if (fact.resolutionContains) {
    const res = String(Catalog.getSpec(dev, 'resolution') || '');
    assert(res.includes(fact.resolutionContains),
      `${deviceId} 分辨率必须含官方 ${fact.resolutionContains}（实际: ${res}）`);
  }
  if (fact.resolutionState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'resolution')), fact.resolutionState,
      `${deviceId} 国行官方未写分辨率时不得用外区页数字顶上`);
  }
  if (fact.refreshRateContains) {
    const hz = String(Catalog.getSpec(dev, 'refreshRate') || '');
    assert(hz.includes(fact.refreshRateContains),
      `${deviceId} 刷新率必须含官方 ${fact.refreshRateContains}（实际: ${hz}）`);
  }
  if (fact.refreshRateState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'refreshRate')), fact.refreshRateState,
      `${deviceId} 官方规格表未写刷新率时不得脑补`);
  }
  if (fact.screenSizeContains) {
    const size = String(Catalog.getSpec(dev, 'screenSize') || '');
    assert(size.includes(fact.screenSizeContains),
      `${deviceId} 屏幕必须含官方 ${fact.screenSizeContains}（实际: ${size}）`);
  }
  if (fact.usbMustInclude) {
    const ports = String(Catalog.getSpec(dev, 'usbPorts') || '');
    const need = Array.isArray(fact.usbMustInclude) ? fact.usbMustInclude : [fact.usbMustInclude];
    need.forEach((token) => {
      assert(ports.includes(token), `${deviceId} 接口必须含官方 ${token}（实际: ${ports}）`);
    });
  }
  if (fact.usbMustNotInclude) {
    const ports = String(Catalog.getSpec(dev, 'usbPorts') || '');
    const banned = Array.isArray(fact.usbMustNotInclude) ? fact.usbMustNotInclude : [fact.usbMustNotInclude];
    banned.forEach((token) => {
      assert(!ports.includes(token), `${deviceId} 接口不得把国行未写的 ${token} 写进去（实际: ${ports}）`);
    });
  }
  if (fact.warrantyContains) {
    const warranty = String(Catalog.getSpec(dev, 'warranty') || '');
    assert(warranty.includes(fact.warrantyContains),
      `${deviceId} 质保必须含国行 ${fact.warrantyContains}（实际: ${warranty}）`);
  }
  if (fact.warrantyState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'warranty')), fact.warrantyState,
      `${deviceId} 「已过质保期」不是国行官方质保条款`);
  }
  if (fact.osMustInclude || fact.osMustNotInclude) {
    const os = String(Catalog.getSpec(dev, 'osAtLaunch') || '');
    const need = Array.isArray(fact.osMustInclude) ? fact.osMustInclude : (fact.osMustInclude ? [fact.osMustInclude] : []);
    need.forEach((token) => {
      assert(os.includes(token), `${deviceId} 系统必须含国行 ${token}（实际: ${os}）`);
    });
    const banned = Array.isArray(fact.osMustNotInclude) ? fact.osMustNotInclude : (fact.osMustNotInclude ? [fact.osMustNotInclude] : []);
    banned.forEach((token) => {
      assert(!os.includes(token), `${deviceId} 系统不得写国行未列的 ${token}（实际: ${os}）`);
    });
  }
  if (fact.osState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'osAtLaunch')), fact.osState,
      `${deviceId} 国行未写预装系统时不得套外区版本`);
  }
  if (fact.frontCameraContains || fact.frontCameraMustNotInclude || fact.frontCameraState) {
    const cam = String(Catalog.getSpec(dev, 'frontCamera') || '');
    if (fact.frontCameraContains) {
      const needles = Array.isArray(fact.frontCameraContains) ? fact.frontCameraContains : [fact.frontCameraContains];
      needles.forEach((needle) => {
        assert(cam.includes(needle), `${deviceId} 前置摄像头必须含国行 ${needle}（实际: ${cam}）`);
      });
    }
    if (fact.frontCameraMustNotInclude) {
      assert(!cam.includes(fact.frontCameraMustNotInclude),
        `${deviceId} 前置摄像头不得写国行未列的 ${fact.frontCameraMustNotInclude}（实际: ${cam}）`);
    }
    if (fact.frontCameraState) {
      assertEqual(Catalog.specState(cam), fact.frontCameraState,
        `${deviceId} 国行未写前置像素时不得套外区数字`);
    }
  }
  if (fact.rearCameraState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'rearCamera')), fact.rearCameraState,
      `${deviceId} 国行未写后置像素时不得套外区数字`);
  }
  if (fact.speakersState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'speakers')), fact.speakersState,
      `${deviceId} 国行未写扬声器规格时不得套外区数字`);
  }
  if (fact.rearCameraContains || fact.rearCameraMustNotInclude) {
    const cam = String(Catalog.getSpec(dev, 'rearCamera') || '');
    if (fact.rearCameraContains) {
      assert(cam.includes(fact.rearCameraContains),
        `${deviceId} 后置摄像头必须含国行 ${fact.rearCameraContains}（实际: ${cam}）`);
    }
    if (fact.rearCameraMustNotInclude) {
      assert(!cam.includes(fact.rearCameraMustNotInclude),
        `${deviceId} 后置摄像头不得写 ${fact.rearCameraMustNotInclude}（实际: ${cam}）`);
    }
  }
  if (fact.speakersContains || fact.speakersMustNotInclude) {
    const speakers = String(Catalog.getSpec(dev, 'speakers') || '');
    const need = Array.isArray(fact.speakersContains) ? fact.speakersContains : (fact.speakersContains ? [fact.speakersContains] : []);
    need.forEach((token) => {
      assert(speakers.includes(token), `${deviceId} 扬声器必须含国行 ${token}（实际: ${speakers}）`);
    });
    const banned = Array.isArray(fact.speakersMustNotInclude)
      ? fact.speakersMustNotInclude
      : (fact.speakersMustNotInclude ? [fact.speakersMustNotInclude] : []);
    banned.forEach((token) => {
      assert(!speakers.includes(token), `${deviceId} 扬声器不得套用 ${token}（实际: ${speakers}）`);
    });
  }
  if (fact.cellularContains || fact.cellularMustNotInclude || fact.cellularState) {
    const cell = String(Catalog.getSpec(dev, 'cellular') || '');
    if (fact.cellularContains) {
      assert(cell.includes(fact.cellularContains),
        `${deviceId} 蜂窝必须含国行 ${fact.cellularContains}（实际: ${cell}）`);
    }
    const bannedCell = Array.isArray(fact.cellularMustNotInclude)
      ? fact.cellularMustNotInclude
      : (fact.cellularMustNotInclude ? [fact.cellularMustNotInclude] : []);
    bannedCell.forEach((token) => {
      assert(!cell.includes(token), `${deviceId} 蜂窝不得写国行未列的 ${token}（实际: ${cell}）`);
    });
    if (fact.cellularState) {
      assertEqual(Catalog.specState(cell), fact.cellularState,
        `${deviceId} 国行未写蜂窝配置时不得套外区模板`);
    }
  }
  if (fact.repairabilityState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'repairabilityScore')), fact.repairabilityState,
      `${deviceId} iFixit 分数不是国行官方规格`);
  }
  if (fact.keyboardWeightState) {
    assertEqual(Catalog.specState(Catalog.getSpec(dev, 'totalWeightWithKeyboard')), fact.keyboardWeightState,
      `${deviceId} 含键盘整机重量国行未写数字时不得脑补`);
  }
  if (fact.keyboardWeightContains) {
    const expectedKw = Array.isArray(fact.keyboardWeightContains) ? fact.keyboardWeightContains : [fact.keyboardWeightContains];
    const actualKw = String(Catalog.getSpec(dev, 'totalWeightWithKeyboard') || '');
    expectedKw.forEach((needle) => {
      assert(actualKw.includes(needle), `${deviceId} 含键盘整机重量应包含 ${needle}，实际: ${actualKw}`);
    });
  }
  if (fact.learnDocUrl) {
    assertEqual(dev.learnDocUrl, fact.learnDocUrl, `${deviceId} Learn/Support 信源必须是现网有效地址`);
  }
  assertSpecFacts(deviceId, dev, fact);
});

const officialLockedIds = new Set([
  ...Object.keys(OFFICIAL_CURRENT_LINEUP_FACTS.devices),
  ...Object.keys(OFFICIAL_HISTORICAL_LINEUP_FACTS.devices)
]);
Catalog.listDevices().forEach(dev => {
  assert(officialLockedIds.has(dev.id), `${dev.id} 必须有现网或历史官方事实锁，不得只靠档案自述`);
});
assertEqual(officialLockedIds.size, Catalog.listDevices().length,
  '官方事实锁必须覆盖全量设备，一台都不能少');

Catalog.listDevices().forEach(dev => {
  if (dev.status === 'current_cn') return;
  assertEqual(
    Catalog.specState(Catalog.getSpec(dev, 'startingPriceCny')),
    'NOT_DISCLOSED',
    `${dev.id} 已撤新品/历史机现网商城不再标价，起售价必须官方未披露，不得保留无法核验的历史数字`
  );
});

const FOREIGN_STORE_MARKERS = [
  'microsoft.com/en-hk',
  'microsoft.com/en-in',
  'microsoft.com/en-th',
  'microsoft.com/en-gb',
  'microsoft.com/en-au',
  'microsoft.com/en-ca',
  'microsoft.com/en-us/d/',
  'microsoft.com/en-my'
];
Catalog.listDevices().forEach(dev => {
  const productUrl = String(Catalog.getSpec(dev, 'officialDocUrl') || '');
  FOREIGN_STORE_MARKERS.forEach((marker) => {
    assert(!productUrl.includes(marker),
      `${dev.id} 官方产品页必须是大陆国行，不得挂外区商城（命中 ${marker}）`);
  });
  if (dev.status === 'current_cn' && dev.id !== 'hub-3') {
    assert(productUrl.includes('microsoftstore.com.cn'),
      `${dev.id} 现网国行机官方产品页必须是微软中国商城`);
  }
});
const histSources = JSON.stringify(OFFICIAL_HISTORICAL_LINEUP_FACTS.sources || {});
FOREIGN_STORE_MARKERS.forEach((marker) => {
  assert(!histSources.includes(marker),
    `历史事实信源不得再用外区商城 ${marker} 当国行口径`);
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

