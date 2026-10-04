/**
 * G4 验收门自动化测试套件 (tests/g4-anti-regression.test.js)
 * 严格按照《surface.kaibase.cn 网站优化改进 PRD · v1.0》§10.5 阶段 4 运营发布与防返贫机制执行
 * 
 * 核心检查项：
 * 1. T-7 预发布流水线五项硬阻断扫描器完备性与可执行性
 * 2. 当前基线在预发布流水线五项扫描中必须 100% 全部通过
 * 3. T-7 模拟注入拦截演练 (PRD T-7 明确要求：“模拟注入一条内部备注，流水线正确拦截”)
 * 4. T-7 极限词模拟注入硬拦截演练
 * 5. 防返贫机制文档 (docs/maintenance-and-anti-regression.md) 完备性与月度复检留存 SOP
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const preflight = require('../scripts/preflight_check.js');

function runG4AntiRegressionTests(helpers) {
  const { assert, assertEqual } = helpers;
  console.log('\n🎯 Test Suite G4: 阶段 4 · 运营发布与防返贫验收门 (PRD §10.5 G4 门禁)');

  // ----------------------------------------------------
  // G4-01: T-7 流水线检查器存在性与导出完备性
  // ----------------------------------------------------
  const preflightScriptPath = path.join(REPO_ROOT, 'scripts', 'preflight_check.js');
  assert(fs.existsSync(preflightScriptPath), 'G4-01: scripts/preflight_check.js 必须存在');
  assert(typeof preflight.runPreflightPipeline === 'function', 'G4-01: preflight.runPreflightPipeline 必须为有效函数');
  assert(typeof preflight.checkInternalNotes === 'function', 'G4-01: preflight.checkInternalNotes 必须为有效函数');
  assert(typeof preflight.checkTerminology === 'function', 'G4-01: preflight.checkTerminology 必须为有效函数');
  assert(typeof preflight.checkExtremeWords === 'function', 'G4-01: preflight.checkExtremeWords 必须为有效函数');
  assert(typeof preflight.checkAltConsistency === 'function', 'G4-01: preflight.checkAltConsistency 必须为有效函数');
  assert(typeof preflight.checkImageBudgets === 'function', 'G4-01: preflight.checkImageBudgets 必须为有效函数');

  // ----------------------------------------------------
  // G4-02: 当前基线在预发布流水线五项扫描中必须 100% 全部通过
  // ----------------------------------------------------
  const noteRes = preflight.checkInternalNotes();
  assertEqual(noteRes.pass, true, 'G4-02: 当前源码内部备注扫描必须为 0 命中');

  const termRes = preflight.checkTerminology();
  assertEqual(termRes.pass, true, 'G4-02: 当前源码术语扫描必须 100% 对齐附录 B');

  const extRes = preflight.checkExtremeWords();
  assertEqual(extRes.pass, true, 'G4-02: 当前源码极限夸大修饰扫描必须为 0 命中');

  const altRes = preflight.checkAltConsistency();
  assertEqual(altRes.pass, true, 'G4-02: 当前图片 alt 一致性扫描必须 100% 对齐');

  const imgRes = preflight.checkImageBudgets();
  assertEqual(imgRes.pass, true, 'G4-02: 当前图片体积预算扫描必须 100% 达标');

  // ----------------------------------------------------
  // G4-03: T-7 模拟注入内部备注拦截演练 (PRD T-7 验收门必查)
  // ----------------------------------------------------
  // 临时创建一个注入了“官方写了上市月份…”的虚拟测试文件
  const mockTempFile = path.join(REPO_ROOT, 'tests', '.mock-note-violation.tmp');
  fs.writeFileSync(mockTempFile, 'const invalidNote = "官方写了上市月份，现在还不能标成国行在售。";\n', 'utf8');

  try {
    const mockCheckRes = preflight.checkInternalNotes({
      files: ['tests/.mock-note-violation.tmp']
    });
    assertEqual(mockCheckRes.pass, false, 'G4-03: 模拟注入内部批注时流水线必须触发阻断拦截 (pass === false)');
    assert(mockCheckRes.violations.length > 0, 'G4-03: 模拟注入拦截报告必须包含违规条目明细');
    assert(mockCheckRes.violations[0].keyword === '官方写了上市月份', 'G4-03: 模拟注入拦截报告必须指出命中的具体关键词');
  } finally {
    if (fs.existsSync(mockTempFile)) {
      fs.unlinkSync(mockTempFile);
    }
  }

  // ----------------------------------------------------
  // G4-04: T-7 模拟注入极限夸大词拦截演练
  // ----------------------------------------------------
  const mockExtremeFile = path.join(REPO_ROOT, 'tests', '.mock-extreme-violation.tmp');
  fs.writeFileSync(mockExtremeFile, 'const marketing = "这是行业巅峰之作，拥有极致性能";\n', 'utf8');

  try {
    const mockExtCheckRes = preflight.checkExtremeWords({
      files: ['tests/.mock-extreme-violation.tmp']
    });
    assertEqual(mockExtCheckRes.pass, false, 'G4-04: 模拟注入极限词时流水线必须触发阻断拦截 (pass === false)');
    assert(mockExtCheckRes.violations.some(v => v.word === '巅峰'), 'G4-04: 拦截报告必须捕获到「巅峰」');
    assert(mockExtCheckRes.violations.some(v => v.word === '极致'), 'G4-04: 拦截报告必须捕获到「极致」');
  } finally {
    if (fs.existsSync(mockExtremeFile)) {
      fs.unlinkSync(mockExtremeFile);
    }
  }

  // ----------------------------------------------------
  // G4-05: 长期维护与防返贫文档完备性 (docs/maintenance-and-anti-regression.md)
  // ----------------------------------------------------
  const docPath = path.join(REPO_ROOT, 'docs', 'maintenance-and-anti-regression.md');
  assert(fs.existsSync(docPath), 'G4-05: docs/maintenance-and-anti-regression.md 必须存在');

  if (fs.existsSync(docPath)) {
    const docContent = fs.readFileSync(docPath, 'utf8');
    assert(docContent.includes('T-7'), 'G4-05: 维护文档必须包含 T-7 预发布流水线规范');
    assert(docContent.includes('附录 C') || docContent.includes('发布前检查清单'), 'G4-05: 维护文档必须包含附录 C 发布前检查清单');
    assert(docContent.includes('定期复检') || docContent.includes('月度复检'), 'G4-05: 维护文档必须包含月度定期复检机制');
    assert(docContent.includes('单人维护') || docContent.includes('防返贫'), 'G4-05: 维护文档必须包含单人维护与防返贫红线机制');
    assert(docContent.includes('复检记录'), 'G4-05: 维护文档必须包含复检记录留存表格');
  }
}

module.exports = { runG4AntiRegressionTests };
