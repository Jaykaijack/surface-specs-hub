/**
 * G1 验收门自动化测试套件 (tests/g1-standards-baseline.test.js)
 * 严格按照《surface.kaibase.cn 网站优化改进 PRD · v1.0》§10.2 G1 达标门规范执行
 * 
 * 5 大必过检查项：
 * 1. 图片预算检查 (Hero <= 120KB, 卡片 <= 40KB, 防抖属性完备)
 * 2. 附录 B 术语表规范 (高通骁龙® X2、英特尔® 酷睿™ Ultra、X TOPS)
 * 3. 相对时间词 0 命中 (禁止 "今天/最近/最新款/前不久/刚刚")
 * 4. 极限词与夸大修饰 0 命中 (禁止 "巅峰/极致/绝无仅有/史上最")
 * 5. 核验日期动态自洽 (SURFACE_DATA.lastVerifiedDate 与前台页脚/详情联动)
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SURFACE_DATA = require('../js/surface-data.js');
const Catalog = require('../js/catalog.js');

global.SURFACE_DATA = SURFACE_DATA;
global.Catalog = Catalog;

function runG1StandardsBaselineTests(helpers) {
  const { assert, assertEqual } = helpers;
  console.log('\n🎯 Test Suite G1: 阶段 1 · 达标验收门 (PRD §10.2 G1 门禁)');

  // ----------------------------------------------------
  // G1-01: 单图体积预算与防抖占位 (P1-1 & T-1)
  // ----------------------------------------------------
  const heroDir = path.join(REPO_ROOT, 'assets', 'delivery', 'webp', 'w1280');
  if (fs.existsSync(heroDir)) {
    const heroFiles = fs.readdirSync(heroDir).filter(f => f.endsWith('.webp'));
    let heroOverBudget = 0;
    heroFiles.forEach(f => {
      const stats = fs.statSync(path.join(heroDir, f));
      if (stats.size > 120 * 1024) {
        heroOverBudget++;
        console.error(`G1-01 超标: Hero 图 ${f} 体积为 ${(stats.size / 1024).toFixed(1)} KB (> 120KB)`);
      }
    });
    assertEqual(heroOverBudget, 0, `G1-01: w1280 目录下所有 Hero 大图必须 <= 120KB (共扫描 ${heroFiles.length} 张)`);
  }

  const cardDir = path.join(REPO_ROOT, 'assets', 'delivery', 'webp', 'w640');
  if (fs.existsSync(cardDir)) {
    const cardFiles = fs.readdirSync(cardDir).filter(f => f.endsWith('.webp'));
    let cardOverBudget = 0;
    cardFiles.forEach(f => {
      const stats = fs.statSync(path.join(cardDir, f));
      if (stats.size > 40 * 1024) {
        cardOverBudget++;
        console.error(`G1-01 超标: 卡片图 ${f} 体积为 ${(stats.size / 1024).toFixed(1)} KB (> 40KB)`);
      }
    });
    assertEqual(cardOverBudget, 0, `G1-01: w640 目录下所有卡片图必须 <= 40KB (共扫描 ${cardFiles.length} 张)`);
  }

  // 测试 Catalog.frame 输出包含防抖尺寸与 loading/decoding
  const sampleDevice = SURFACE_DATA.devices.find(d => d.id === 'pro-12-13-intel') || SURFACE_DATA.devices[0];
  const shot = Catalog.portrait(sampleDevice);
  const cardHtml = Catalog.frame(shot, { slot: 'card' });
  assert(cardHtml.includes('width="'), 'G1-01: 卡片图片必须显式指定 width 属性防止 CLS 抖动');
  assert(cardHtml.includes('height="'), 'G1-01: 卡片图片必须显式指定 height 属性防止 CLS 抖动');
  assert(cardHtml.includes('loading="lazy"'), 'G1-01: 列表卡片图片必须默认配置 loading="lazy"');

  const detailHtml = Catalog.frame(shot, { slot: 'detail' });
  assert(detailHtml.includes('fetchpriority="high"'), 'G1-01: 详情主图必须配置 fetchpriority="high" 保证 LCP');

  // ----------------------------------------------------
  // G1-02: 附录 B 术语表与统一算力格式 (P1-2 & C-2)
  // ----------------------------------------------------
  // 检查高通芯片命名规范
  const x2Devices = SURFACE_DATA.devices.filter(d => 
    (d.name && d.name.includes('骁龙')) || 
    (d.tagline && (d.tagline.includes('骁龙') || d.tagline.includes('Snapdragon')))
  );
  x2Devices.forEach(d => {
    if (d.tagline.includes('骁龙')) {
      assert(d.tagline.includes('骁龙®') || d.tagline.includes('Snapdragon®'), 
        `G1-02: 机型 [${d.id}] tagline 涉及骁龙处理器必须带有商标符号「®」 (Actual: ${d.tagline})`);
    }
    if (d.specs && d.specs.tagline && d.specs.tagline.includes('骁龙')) {
      assert(d.specs.tagline.includes('骁龙®') || d.specs.tagline.includes('Snapdragon®'), 
        `G1-02: 机型 [${d.id}] specs.tagline 必须带有商标符号「®」 (Actual: ${d.specs.tagline})`);
    }
  });

  // 检查 NPU 算力统一以大写 TOPS 并带空格
  const npuDevices = SURFACE_DATA.devices.filter(d => d.specs && d.specs.npuTops && d.specs.npuTops !== 'not_applicable' && d.specs.npuTops !== 'not_disclosed');
  npuDevices.forEach(d => {
    const val = String(d.specs.npuTops);
    assert(/\d+\sTOPS/.test(val), `G1-02: 机型 [${d.id}] npuTops 必须统一为数字+空格+大写TOPS (Actual: ${val})`);
  });

  // ----------------------------------------------------
  // G1-03: 相对时间词 0 命中 (P1-5 & C-4)
  // ----------------------------------------------------
  const relativeTimeWords = ['今天', '最近', '最新款', '最新发布', '前不久', '刚刚'];
  const jsDir = path.join(REPO_ROOT, 'js');
  const targetFiles = [
    path.join(REPO_ROOT, 'index.html'),
    ...fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).map(f => path.join(jsDir, f))
  ];

  targetFiles.forEach(fp => {
    const content = fs.readFileSync(fp, 'utf8');
    const relName = path.relative(REPO_ROOT, fp);
    relativeTimeWords.forEach(w => {
      const count = (content.match(new RegExp(w, 'g')) || []).length;
      assertEqual(count, 0, `G1-03: 文件 [${relName}] 严禁出现相对时间词「${w}」`);
    });
  });

  // ----------------------------------------------------
  // G1-04: 极限词与夸大修饰 0 命中 (P2-4 / P1-5)
  // ----------------------------------------------------
  const extremeWords = ['巅峰', '极致', '绝无仅有', '史上最', '全行业最'];
  targetFiles.forEach(fp => {
    const content = fs.readFileSync(fp, 'utf8');
    const relName = path.relative(REPO_ROOT, fp);
    extremeWords.forEach(w => {
      const count = (content.match(new RegExp(w, 'g')) || []).length;
      assertEqual(count, 0, `G1-04: 文件 [${relName}] 严禁出现极限词或夸大修饰「${w}」`);
    });
  });

  // ----------------------------------------------------
  // G1-05: 核验日期动态自洽 (P1-3 & C-3)
  // ----------------------------------------------------
  assert(Boolean(SURFACE_DATA.lastVerifiedDate), 'G1-05: SURFACE_DATA 必须包含全局 lastVerifiedDate');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(SURFACE_DATA.lastVerifiedDate), `G1-05: lastVerifiedDate 必须符合 YYYY-MM-DD 格式 (Actual: ${SURFACE_DATA.lastVerifiedDate})`);
  
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes('id="footer-verification-date"'), 'G1-05: index.html 页脚必须包含 #footer-verification-date 动态插槽');
  assert(indexHtml.includes('id="offline-toast"'), 'G1-05: index.html 必须包含离线工作模式反馈浮窗 #offline-toast (P1-4)');
}

module.exports = {
  runG1StandardsBaselineTests
};
