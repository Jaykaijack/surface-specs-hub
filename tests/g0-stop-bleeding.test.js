/**
 * G0 验收门自动化测试套件 (tests/g0-stop-bleeding.test.js)
 * 严格按照《surface.kaibase.cn 网站优化改进 PRD · v1.0》§10.1 G0 止血门规范执行
 * 
 * 4 大必过检查项：
 * 1. 内部备注扫描 (零命中)
 * 2. alt-标题一致性 (100% 对齐，特别是 5 处历史错位场景)
 * 3. 标题与品牌去官化合规 (无 Microsoft 领衔，明示民间资料库)
 * 4. F-1 / F-2 事实闭环 (限定 RTX Spark 算力口径，修复截断乱码)
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SURFACE_DATA = require('../js/surface-data.js');
const Catalog = require('../js/catalog.js');
const App = require('../js/app.js');

global.SURFACE_DATA = SURFACE_DATA;
global.Catalog = Catalog;
global.App = App;

function runG0StopBleedingTests(helpers) {
  const { assert, assertEqual } = helpers;
  console.log('\n🛑 Test Suite G0: 阶段 0 · 止血验收门 (PRD §10.1 G0 门禁)');

  // ----------------------------------------------------
  // G0-01: 内部编辑备注扫描 (P0-1 & C-1)
  // ----------------------------------------------------
  const bannedKeywords = [
    '官方写了上市月份',
    '现在还不能标成国行在售',
    '图片待核验',
    '还不能标'
  ];

  const appJsContent = fs.readFileSync(path.join(REPO_ROOT, 'js', 'app.js'), 'utf8');
  const indexHtmlContent = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  const catalogJsContent = fs.readFileSync(path.join(REPO_ROOT, 'js', 'catalog.js'), 'utf8');

  bannedKeywords.forEach((kw) => {
    assert(!appJsContent.includes(kw), `G0-01: js/app.js 严禁包含内部编辑批注「${kw}」`);
    assert(!indexHtmlContent.includes(kw), `G0-01: index.html 严禁包含内部编辑批注「${kw}」`);
  });

  // 测试 Catalog.portraitLabel 对 pending 状态绝不吐出 "图片待核验"
  const pendingShot = { identity: 'pending', src: './assets/test.png' };
  assertEqual(Catalog.portraitLabel(pendingShot), '', 'G0-01: Catalog.portraitLabel(pending) 前台徽标必须返回空字符串');

  // ----------------------------------------------------
  // G0-02: 全站 alt 与标题逐一对齐 (P0-2 & T-3 & C-6)
  // ----------------------------------------------------
  // 1. 全量机型测试: 每款机型 portrait 导出的 alt 必须精准包含自身名称
  SURFACE_DATA.devices.forEach((dev) => {
    const shot = Catalog.portrait(dev);
    assert(Boolean(shot.alt), `G0-02: 机型 [${dev.id}] portrait 必须附带 alt (Actual: ${shot.alt})`);
    assert(shot.alt.includes(dev.name), `G0-02: 机型 [${dev.id}] alt 必须包含机型完整名「${dev.name}」`);
  });

  // 2. 重点核验审计暴露的 5 处错位场景：
  // 场景 1: 13.8 英寸 Laptop 绝不能被标为 15 英寸
  const laptop138 = Catalog.getDevice('laptop-8-138');
  assert(Boolean(laptop138), 'G0-02: 收录 laptop-8-138');
  if (laptop138) {
    const shot138 = Catalog.portrait(laptop138);
    assert(shot138.alt.includes('13.8 英寸'), `G0-02: laptop-8-138 alt 必须包含 13.8 英寸 (Actual: ${shot138.alt})`);
    assert(!shot138.alt.includes('15 英寸'), `G0-02: laptop-8-138 alt 严禁错标为 15 英寸 (Actual: ${shot138.alt})`);
  }

  // 场景 2: Laptop 13 英寸 (第 1 代) 商用版 绝不能被标为 第 7 代商用版-骁龙版
  const laptop13Biz = Catalog.getDevice('laptop-13-inch-biz');
  assert(Boolean(laptop13Biz), 'G0-02: 收录 laptop-13-inch-biz');
  if (laptop13Biz) {
    const shot13Biz = Catalog.portrait(laptop13Biz);
    assert(shot13Biz.alt.includes('第 1 代'), `G0-02: laptop-13-inch-biz alt 必须包含第 1 代 (Actual: ${shot13Biz.alt})`);
    assert(!shot13Biz.alt.includes('第 7 代'), `G0-02: laptop-13-inch-biz alt 严禁错标为第 7 代`);
    assert(!shot13Biz.alt.includes('骁龙版'), `G0-02: laptop-13-inch-biz alt 严禁错标为骁龙版`);
  }

  // 场景 3: Intel 版标题绝不能配 骁龙版 alt
  const laptop7BizIntel = Catalog.getDevice('laptop-7-biz-intel');
  if (laptop7BizIntel) {
    const shot = Catalog.portrait(laptop7BizIntel);
    assert(shot.alt.includes('Intel 版'), `G0-02: laptop-7-biz-intel alt 必须标明 Intel 版 (Actual: ${shot.alt})`);
    assert(!shot.alt.includes('骁龙版'), `G0-02: laptop-7-biz-intel alt 严禁错标为骁龙版`);
  }

  const pro11BizIntel = Catalog.getDevice('pro-11-biz-intel');
  if (pro11BizIntel) {
    const shot = Catalog.portrait(pro11BizIntel);
    assert(shot.alt.includes('Intel 版'), `G0-02: pro-11-biz-intel alt 必须标明 Intel 版 (Actual: ${shot.alt})`);
    assert(!shot.alt.includes('骁龙版'), `G0-02: pro-11-biz-intel alt 严禁错标为骁龙版`);
  }

  // 场景 4: 系列卡 消费系列绝不能标 商用系列，反之亦然
  (SURFACE_DATA.consumerCategories || []).forEach((cat) => {
    assert(cat.name.includes('消费系列'), `G0-02: 消费分类 [${cat.id}] 标题必须含消费系列`);
    assert(!cat.name.includes('商用系列'), `G0-02: 消费分类 [${cat.id}] 标题严禁含商用系列`);
  });
  (SURFACE_DATA.commercialCategories || []).forEach((cat) => {
    assert(cat.name.includes('商用系列') || cat.name.includes('商用协作系列'), `G0-02: 商用分类 [${cat.id}] 标题必须含商用系列`);
    assert(!cat.name.includes('消费系列'), `G0-02: 商用分类 [${cat.id}] 标题严禁含消费系列`);
  });

  // 场景 5: Hub 3 卡片 alt 必须正确指向 Hub 3
  const hub3 = Catalog.getDevice('hub-3');
  if (hub3) {
    const shot = Catalog.portrait(hub3);
    assert(shot.alt.includes('Surface Hub 3'), `G0-02: Hub 3 alt 必须为 Surface Hub 3 (Actual: ${shot.alt})`);
  }

  // ----------------------------------------------------
  // G0-03: 标题与品牌去官化合规 (P0-3 & D-5)
  // ----------------------------------------------------
  const titleMatch = indexHtmlContent.match(/<title>([^<]+)<\/title>/i);
  const titleText = titleMatch ? titleMatch[1].trim() : '';
  assert(!titleText.startsWith('Microsoft'), `G0-03: <title> 严禁以 Microsoft 开头 (Actual: ${titleText})`);
  assert(titleText.includes('Surface 参数中心 · 民间资料库'), `G0-03: <title> 必须使用新站名「Surface 参数中心 · 民间资料库」 (Actual: ${titleText})`);

  // 导航栏去官化
  assert(!indexHtmlContent.includes('Surface 官方资料库'), 'G0-03: 导航栏严禁自称「Surface 官方资料库」');
  assert(indexHtmlContent.includes('民间资料库'), 'G0-03: 导航栏必须明示民间资料库属性');

  // 页脚非官方声明常驻
  assert(indexHtmlContent.includes('民间非官方声明'), 'G0-03: 页脚必须包含常驻的民间非官方声明');

  // ----------------------------------------------------
  // G0-04: F-1 与 F-2 事实闭环
  // ----------------------------------------------------
  // 2026-10-09 官方商用页面已收录，旧的名称禁令不能删除线上新增产品。
  const spark = SURFACE_DATA.chips.find(c => /RTX Spark/i.test(c.name || ''));
  if (spark) assert(spark.npuTops == null || spark.npuTops === 'not_disclosed', 'G0-04: 平台 FP4 不冒充专用 NPU INT8 TOPS');
  assert(!/1000\s*TOPS/.test(String(spark && spark.npuTops)), 'G0-04: 不把平台 1 petaflop 放入 NPU 排序');

  // F-2: 截断乱码与极限词修复
  const dataJsContent = fs.readFileSync(path.join(REPO_ROOT, 'js', 'surface-data.js'), 'utf8');
  assert(!dataJsContent.includes('极致触觉触控板'), 'G0-04: F-2 修复截断乱码风险词，替换为中性客观表述');
}

module.exports = {
  runG0StopBleedingTests
};

if (require.main === module) {
  let passed = 0;
  let failed = 0;
  const helpers = {
    assert: (cond, msg) => {
      if (cond) {
        console.log(`  ✅ PASS: ${msg}`);
        passed++;
      } else {
        console.error(`  ❌ FAIL: ${msg}`);
        failed++;
      }
    },
    assertEqual: (act, exp, msg) => {
      if (act === exp) {
        console.log(`  ✅ PASS: ${msg}`);
        passed++;
      } else {
        console.error(`  ❌ FAIL: ${msg} (Expected: ${exp}, Actual: ${act})`);
        failed++;
      }
    }
  };
  runG0StopBleedingTests(helpers);
  console.log(`\n🏁 运行结果: ${passed} 项通过, ${failed} 项失败\n`);
  if (failed > 0) process.exit(1);
}
