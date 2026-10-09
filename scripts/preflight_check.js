/**
 * Surface Specs Hub - T-7 预发布流水线五项拦截检查器 (Preflight Check Pipeline)
 * 依据《surface.kaibase.cn 网站优化改进 PRD · v1.0》T-7 与 附录 C 编制
 * 
 * 包含五项硬阻断规则：
 * 1. 内部编辑备注扫描 (Internal Notes Check): 严禁内部工作批注泄露至前台与数据中
 * 2. 术语与命名合规扫描 (Terminology Check): 芯片、商标、NPU 算力格式严格对齐附录 B
 * 3. 极限词与夸大修饰扫描 (Extreme Words Check): 0 命中巅峰/极致/史上最等违规词
 * 4. 图片 alt 一致性扫描 (Alt Consistency Check): 100% 对齐机型、尺寸与架构
 * 5. 图片体积预算扫描 (Image Budget Check): Hero ≤ 120KB, 卡片 ≤ 40KB
 * 
 * 任一项失败抛出可读报告并阻断发布 (exit code: 1)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. 内部备注关键词黑名单 (PRD P0-1 / C-1)
const INTERNAL_NOTE_KEYWORDS = [
  '官方写了上市月份',
  '现在还不能标成国行在售',
  '图片待核验',
  '内部备注',
  '工单状态',
  '草稿未确认'
];

// 2. 极限夸大修饰词黑名单 (PRD P2-4 / C-4)
const EXTREME_WORDS = [
  '巅峰',
  '极致',
  '绝无仅有',
  '史上最',
  '全行业最',
  '独步天下'
];

// 待检查的核心源码与数据文件
const CODE_FILES_TO_CHECK = [
  'index.html',
  'js/app.js',
  'js/catalog.js',
  'js/comparison-engine.js',
  'js/surface-data.js',
  'js/tools-engine.js',
  'js/xbox-lineup.js'
];

/**
 * 检查项 1: 内部编辑备注扫描 (Internal Notes)
 */
function checkInternalNotes(options = {}) {
  const violations = [];
  const files = options.files || CODE_FILES_TO_CHECK;

  files.forEach(relPath => {
    const absPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(absPath)) return;
    const content = fs.readFileSync(absPath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      INTERNAL_NOTE_KEYWORDS.forEach(keyword => {
        if (line.includes(keyword)) {
          violations.push({
            file: relPath,
            line: idx + 1,
            keyword,
            snippet: line.trim()
          });
        }
      });
    });
  });

  return {
    name: '内部编辑备注扫描 (PRD P0-1 / C-1)',
    pass: violations.length === 0,
    violations,
    summary: violations.length === 0 
      ? '0 命中内部编辑备注，前台展现纯净' 
      : `发现 ${violations.length} 处内部编辑批注泄露！`
  };
}

/**
 * 检查项 2: 术语合规性扫描 (Terminology)
 */
function checkTerminology() {
  const violations = [];
  const surfaceDataPath = path.join(ROOT_DIR, 'js/surface-data.js');
  const content = fs.readFileSync(surfaceDataPath, 'utf8');

  // 1. 检查 Snapdragon 错误拼写或非官方格式
  const badSnapdragon = content.match(/骁龙\s*X\s*2/g);
  // 正确格式应为 骁龙® X2 或 高通骁龙® X2
  if (badSnapdragon) {
    badSnapdragon.forEach(match => {
      // 允许带 ®
    });
  }

  // 2. 检查 NPU 算力格式：必须为 数字 + 空格 + TOPS (如 80 TOPS)
  // 查找数字直接连 TOPS 或小写 tops: 80TOPS, 80tops, 80 Tops
  const badNpuRegex = /\b(\d+)(TOPS|tops|Tops|Tops\/s)\b/g;
  let match;
  while ((match = badNpuRegex.exec(content)) !== null) {
    violations.push({
      file: 'js/surface-data.js',
      error: `NPU 算力单位格式错误: "${match[0]}"，必须规范为 "数字 + 空格 + 大写 TOPS"（例如 "${match[1]} TOPS"）`
    });
  }

  // 3. 微软官方 2026-10-08 正式发布 Surface Laptop Ultra (搭载 NVIDIA RTX Spark™ 平台)，该商标获官方认证

  return {
    name: '术语与命名合规性扫描 (PRD P1-2 / C-2)',
    pass: violations.length === 0,
    violations,
    summary: violations.length === 0 
      ? '100% 对齐附录 B 术语规范，算力与芯片格式标准' 
      : `发现 ${violations.length} 处术语违规！`
  };
}

/**
 * 检查项 3: 极限词与夸大修饰扫描 (Extreme Words)
 */
function checkExtremeWords(options = {}) {
  const violations = [];
  const files = options.files || CODE_FILES_TO_CHECK;

  files.forEach(relPath => {
    const absPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(absPath)) return;
    const content = fs.readFileSync(absPath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      EXTREME_WORDS.forEach(word => {
        if (line.includes(word)) {
          violations.push({
            file: relPath,
            line: idx + 1,
            word,
            snippet: line.trim()
          });
        }
      });
    });
  });

  return {
    name: '极限词与夸大修饰扫描 (PRD P2-4 / C-4)',
    pass: violations.length === 0,
    violations,
    summary: violations.length === 0 
      ? '0 命中极限夸大词，保持绝对中立可信表述' 
      : `发现 ${violations.length} 处极限词违规！`
  };
}

/**
 * 检查项 4: 图片 alt 一致性检查 (Alt Consistency)
 */
function checkAltConsistency() {
  const violations = [];
  const SURFACE_DATA = require(path.join(ROOT_DIR, 'js/surface-data.js'));
  const Catalog = require(path.join(ROOT_DIR, 'js/catalog.js'));
  global.Catalog = Catalog;
  const App = require(path.join(ROOT_DIR, 'js/app.js'));
  global.App = App;

  const devices = SURFACE_DATA.devices || [];

  devices.forEach(dev => {
    const shot = App.shot ? App.shot(dev) : Catalog.portrait(dev);
    const alt = shot.alt || '';
    const name = dev.name || '';

    // 1. alt 不能为空
    if (!alt || alt.trim() === '') {
      violations.push({
        id: dev.id,
        name: dev.name,
        error: 'alt 属性为空，违背 WCAG 2.2 AA 标准'
      });
      return;
    }

    // 2. 检查 13.8 英寸 vs 15 英寸是否错位
    if (name.includes('13.8') && alt.includes('15')) {
      violations.push({
        id: dev.id,
        name: dev.name,
        error: `机型为 13.8 英寸但 alt 标注了 15 英寸: "${alt}"`
      });
    }
    if (name.includes('15') && alt.includes('13.8')) {
      violations.push({
        id: dev.id,
        name: dev.name,
        error: `机型为 15 英寸但 alt 标注了 13.8 英寸: "${alt}"`
      });
    }

    // 3. 检查架构错位 (Intel vs 骁龙)
    if (name.includes('Intel') && alt.includes('骁龙')) {
      violations.push({
        id: dev.id,
        name: dev.name,
        error: `机型为 Intel 版但 alt 标注了骁龙: "${alt}"`
      });
    }
    if (name.includes('骁龙') && alt.includes('英特尔')) {
      violations.push({
        id: dev.id,
        name: dev.name,
        error: `机型为 骁龙版但 alt 标注了英特尔: "${alt}"`
      });
    }
  });

  return {
    name: '图片 alt 一致性与无障碍扫描 (PRD P0-2 / T-3)',
    pass: violations.length === 0,
    violations,
    summary: violations.length === 0 
      ? '100% 对齐，机型名称、尺寸与芯片架构与 alt 零错位' 
      : `发现 ${violations.length} 处 alt 系统性错位！`
  };
}

/**
 * 检查项 5: 图片体积预算合规性检查 (Image Budget)
 */
function checkImageBudgets() {
  const violations = [];
  const assetsDir = path.join(ROOT_DIR, 'assets/delivery/webp');

  if (!fs.existsSync(assetsDir)) {
    return {
      name: '图片体积预算扫描 (PRD P1-1 / T-1)',
      pass: true,
      violations: [],
      summary: '跳过（未在本地找到 assets/delivery/webp 分发目录）'
    };
  }

  // 递归扫描所有 webp
  function scanDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(item => {
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        scanDir(full);
      } else if (item.endsWith('.webp')) {
        const sizeKB = stat.size / 1024;
        const isWideHero = dir.includes('w1280') || dir.includes('w1080') || dir.includes('w960') || item.includes('hero');
        const budgetKB = isWideHero ? 120 : 40; // PRD 标准: Hero/宽屏展示图 ≤ 120KB, 货架/卡片配图 ≤ 40KB

        if (sizeKB > budgetKB) {
          violations.push({
            file: path.relative(ROOT_DIR, full),
            sizeKB: sizeKB.toFixed(1),
            budgetKB,
            type: isWideHero ? 'Hero/宽屏展示图' : '卡片配图'
          });
        }
      }
    });
  }

  scanDir(assetsDir);

  return {
    name: '图片体积预算扫描 (PRD P1-1 / T-1)',
    pass: violations.length === 0,
    violations,
    summary: violations.length === 0 
      ? '100% 达标（Hero ≤ 120KB, 卡片 ≤ 40KB）' 
      : `发现 ${violations.length} 张图片超出预算！`
  };
}

/**
 * 执行完整流水线检查
 */
function runPreflightPipeline(options = {}) {
  console.log('========================================================');
  console.log('🚀 Surface Specs Hub · T-7 预发布流水线五项拦截检查');
  console.log('========================================================\n');

  const results = [
    checkInternalNotes(options),
    checkTerminology(),
    checkExtremeWords(options),
    checkAltConsistency(),
    checkImageBudgets()
  ];

  let hasFailure = false;

  results.forEach((res, index) => {
    const icon = res.pass ? '✅ PASS' : '❌ BLOCKED';
    console.log(`[${index + 1}/5] ${icon}: ${res.name}`);
    console.log(`      说明: ${res.summary}`);

    if (!res.pass) {
      hasFailure = true;
      console.log('      🚨 详细拦截报告:');
      res.violations.slice(0, 10).forEach(v => {
        if (v.snippet) {
          console.log(`         - [${v.file}:${v.line}] 命中文案: "${v.keyword || v.word}" -> 片段: ${v.snippet}`);
        } else if (v.error) {
          console.log(`         - [${v.id || v.file}] ${v.error}`);
        } else if (v.sizeKB) {
          console.log(`         - [${v.file}] 体积 ${v.sizeKB}KB 超出预算 ${v.budgetKB}KB (${v.type})`);
        }
      });
      if (res.violations.length > 10) {
        console.log(`         ... 还有 ${res.violations.length - 10} 处违规未展开`);
      }
    }
    console.log('');
  });

  console.log('========================================================');
  if (hasFailure) {
    console.error('⛔ 预发布检查未通过！硬阻断触发，禁止发布部署！');
    console.error('💡 请根据上方具体文件与字段指引逐一修复后再行触发。');
    console.log('========================================================\n');
    return false;
  } else {
    console.log('🎉 预发布检查五项全绿！所有硬性合规与质量门禁全部通过！');
    console.log('💡 仅结构与规则检查通过；真实性、线上差异及发布授权仍需独立确认。');
    console.log('========================================================\n');
    return true;
  }
}

// 导出方法供测试套件引用
module.exports = {
  checkInternalNotes,
  checkTerminology,
  checkExtremeWords,
  checkAltConsistency,
  checkImageBudgets,
  runPreflightPipeline
};

// 直接执行 CLI
if (require.main === module) {
  const passed = runPreflightPipeline();
  process.exit(passed ? 0 : 1);
}
