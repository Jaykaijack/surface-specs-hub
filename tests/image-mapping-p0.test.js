/**
 * IMG-P0-01…08 图源映射验收（可证伪）
 * 断言映射 + 文件 MD5，禁止「改文件名、字节不变」糊弄。
 * 独立运行: node tests/image-mapping-p0.test.js
 * 也可由 tests/test-runner.js 调用 runImageMappingP0Tests。
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SURFACE_DATA = require('../js/surface-data.js');

const REPO_ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(REPO_ROOT, 'assets', 'products');

const PRO_34578_HEROES = [
  'surface-pro-3-hero.png',
  'surface-pro-4-hero.png',
  'surface-pro-5-hero.png',
  'surface-pro-7-hero.png',
  'surface-pro-8-hero.png'
];

const PRO_126X_HEROES = [
  'surface-pro-1-hero.png',
  'surface-pro-2-hero.png',
  'surface-pro-6-hero.png',
  'surface-pro-x-hero.png'
];

const FAKE_DUAL_COLOR_IDS = [
  'pro-7-plus',
  'pro-11-biz-snap',
  'pro-11-biz-intel',
  'laptop-7-biz-snap',
  'laptop-7-biz-intel',
  'pro-9-biz',
  'pro-8-biz',
  'laptop-5-biz',
  'go-3-biz'
];

const COMMERCIAL_GEN8_IDS = [
  'laptop-8-138-intel',
  'laptop-8-138-snap',
  'laptop-8-150-intel',
  'laptop-8-150-snap'
];

const PRO12_ALLOWED_COLORS = ['亮铂金', '典雅黑', '沙漫金', '铂金', '黑', '沙丘', '典黑'];

function fileMd5(absPath) {
  if (!fs.existsSync(absPath)) return null;
  return crypto.createHash('md5').update(fs.readFileSync(absPath)).digest('hex');
}

function assetAbs(fileName) {
  return path.join(ASSETS_DIR, fileName);
}

function resolveMappedFile(relPath) {
  if (!relPath || typeof relPath !== 'string') return null;
  return path.resolve(REPO_ROOT, relPath.replace(/^\.\//, ''));
}

function mappedFileName(relPath) {
  if (!relPath || typeof relPath !== 'string') return '';
  return path.basename(relPath.split('?')[0]);
}

function colorNames(device) {
  return ((device && device.specs && device.specs.colors) || []).map((c) => c.name);
}

function colorEntry(device, names) {
  const colors = (device && device.specs && device.specs.colors) || [];
  const wanted = Array.isArray(names) ? names : [names];
  return colors.find((c) => wanted.includes(c.name)) || null;
}

function dualColorPair(device) {
  const platinum = colorEntry(device, ['亮铂金', '铂金']);
  const black = colorEntry(device, ['典雅黑', '典黑']);
  return { platinum, black };
}

function runImageMappingP0Tests(helpers) {
  const { assert, assertEqual } = helpers;

  console.log('\n🖼️  Test Suite P0: 图源映射与 MD5 分代/分色（IMG-P0-01…08）');

  // ---------- IMG-P0-01 ----------
  const pro1213 = SURFACE_DATA.devices.find((d) => d.id === 'pro-12-13');
  assert(Boolean(pro1213), 'IMG-P0-01: 收录消费版 pro-12-13');
  if (pro1213) {
    const names = colorNames(pro1213);
    assert(!names.includes('宝石蓝'), 'IMG-P0-01: pro-12-13 配色不含宝石蓝（第 11 代色，非第 12 代在售）');
    const extra = names.filter((n) => !PRO12_ALLOWED_COLORS.includes(n));
    assert(
      extra.length === 0,
      `IMG-P0-01: pro-12-13 仅公开三色铂金/黑/沙丘或其国区等价名 (Actual: ${names.join(', ')})`
    );
    assert(names.length >= 2 && names.length <= 3, `IMG-P0-01: pro-12-13 公开三色规模 (Actual: ${names.length})`);
  }

  // ---------- IMG-P0-02 ----------
  const pro34578Md5s = PRO_34578_HEROES.map((name) => {
    const abs = assetAbs(name);
    const exists = fs.existsSync(abs);
    assert(exists, `IMG-P0-02: 文件存在 ${name}`);
    return exists ? fileMd5(abs) : null;
  });
  const unique34578 = new Set(pro34578Md5s.filter(Boolean));
  assert(
    unique34578.size === PRO_34578_HEROES.length,
    `IMG-P0-02: surface-pro-{3,4,5,7,8}-hero.png 两两 MD5 不全相同且各自独立 (unique=${unique34578.size}/${PRO_34578_HEROES.length})`
  );

  // ---------- IMG-P0-03 ----------
  const pro13BlackMd5 = fileMd5(assetAbs('surface-pro-13-black.png'));
  assert(Boolean(pro13BlackMd5), 'IMG-P0-03: surface-pro-13-black.png 存在');
  PRO_126X_HEROES.forEach((name) => {
    const md5 = fileMd5(assetAbs(name));
    assert(Boolean(md5), `IMG-P0-03: 文件存在 ${name}`);
    assert(
      md5 !== pro13BlackMd5,
      `IMG-P0-03: ${name} MD5 ≠ surface-pro-13-black.png（禁止现代黑 Pro 冒充旧代/Pro X）`
    );
  });

  // ---------- IMG-P0-04 ----------
  const newLaptopHeroMd5 = fileMd5(assetAbs('surface-new-laptop-hero.png'));
  assert(Boolean(newLaptopHeroMd5), 'IMG-P0-04: surface-new-laptop-hero.png 存在');
  ['surface-laptop-1-hero.png', 'surface-laptop-5-hero.png'].forEach((name) => {
    const md5 = fileMd5(assetAbs(name));
    assert(Boolean(md5), `IMG-P0-04: 文件存在 ${name}`);
    assert(
      md5 !== newLaptopHeroMd5,
      `IMG-P0-04: ${name} MD5 ≠ surface-new-laptop-hero.png 簇（禁止新 Laptop 铂金冒充 Laptop 1/5）`
    );
  });

  // ---------- IMG-P0-05 ----------
  const laptopBlackMd5 = fileMd5(assetAbs('surface-laptop-black.png'));
  const laptop2HeroMd5 = fileMd5(assetAbs('surface-laptop-2-hero.png'));
  assert(Boolean(laptopBlackMd5), 'IMG-P0-05: surface-laptop-black.png 存在');
  assert(Boolean(laptop2HeroMd5), 'IMG-P0-05: surface-laptop-2-hero.png 存在');
  assert(
    laptop2HeroMd5 !== laptopBlackMd5,
    'IMG-P0-05: laptop-2 hero MD5 ≠ surface-laptop-black.png（禁止现代黑 Laptop 冒充 Laptop 2）'
  );

  // ---------- IMG-P0-06 ----------
  ['pro-8-biz', 'pro-9-biz'].forEach((id) => {
    const device = SURFACE_DATA.devices.find((d) => d.id === id);
    assert(Boolean(device), `IMG-P0-06: 收录 ${id}`);
    if (!device) return;
    const heroName = mappedFileName(device.heroImage);
    assert(
      heroName !== 'surface-new-pro-hero.png',
      `IMG-P0-06: ${id} hero 不绑 surface-new-pro-hero.png（≡ pro-13 铂金）`
    );
    const { platinum, black } = dualColorPair(device);
    assert(Boolean(platinum && platinum.image), `IMG-P0-06: ${id} 有亮铂金图`);
    assert(Boolean(black && black.image), `IMG-P0-06: ${id} 有典雅黑图`);
    if (platinum && black && platinum.image && black.image) {
      assert(
        platinum.image !== black.image,
        `IMG-P0-06: ${id} 典雅黑 image 路径 ≠ 亮铂金 image 路径`
      );
      const platMd5 = fileMd5(resolveMappedFile(platinum.image));
      const blackMd5 = fileMd5(resolveMappedFile(black.image));
      assert(Boolean(platMd5), `IMG-P0-06: ${id} 亮铂金文件存在`);
      assert(Boolean(blackMd5), `IMG-P0-06: ${id} 典雅黑文件存在`);
      assert(platMd5 !== blackMd5, `IMG-P0-06: ${id} 典雅黑文件 MD5 ≠ 亮铂金文件 MD5`);
    }
  });

  // ---------- IMG-P0-06b ----------
  FAKE_DUAL_COLOR_IDS.forEach((id) => {
    const device = SURFACE_DATA.devices.find((d) => d.id === id);
    assert(Boolean(device), `IMG-P0-06b: 收录 ${id}`);
    if (!device) return;
    const { platinum, black } = dualColorPair(device);
    assert(Boolean(platinum && platinum.image), `IMG-P0-06b: ${id} 有亮铂金/铂金图`);
    assert(Boolean(black && black.image), `IMG-P0-06b: ${id} 有典雅黑/典黑图`);
    if (platinum && black && platinum.image && black.image) {
      assert(
        platinum.image !== black.image,
        `IMG-P0-06b: ${id} 双色路径不得相同 (Actual: ${platinum.image})`
      );
      const platMd5 = fileMd5(resolveMappedFile(platinum.image));
      const blackMd5 = fileMd5(resolveMappedFile(black.image));
      assert(Boolean(platMd5 && blackMd5), `IMG-P0-06b: ${id} 双色文件均存在`);
      assert(platMd5 !== blackMd5, `IMG-P0-06b: ${id} 双色文件 MD5 不得相同`);
    }
  });

  // ---------- IMG-P0-07 ----------
  const pro9 = SURFACE_DATA.devices.find((d) => d.id === 'pro-9');
  assert(Boolean(pro9), 'IMG-P0-07: 收录消费版 pro-9');
  if (pro9) {
    const colors = (pro9.specs && pro9.specs.colors) || [];
    colors.forEach((c) => {
      const fileName = mappedFileName(c.image);
      assert(
        !fileName.startsWith('surface-pro-13-'),
        `IMG-P0-07: pro-9「${c.name}」色图不以 surface-pro-13- 为前缀 (Actual: ${fileName})`
      );
    });
  }

  // ---------- IMG-P0-08 ----------
  const laptop8138 = SURFACE_DATA.devices.find((d) => d.id === 'laptop-8-138');
  assert(Boolean(laptop8138), 'IMG-P0-08: 收录消费版 laptop-8-138');
  const laptop3HeroMd5 = fileMd5(assetAbs('surface-laptop-3-hero.png'));
  assert(Boolean(laptop3HeroMd5), 'IMG-P0-08: surface-laptop-3-hero.png 存在');
  if (laptop8138) {
    const dune = colorEntry(laptop8138, ['沙漫金', '沙丘', '砂岩金']);
    if (dune && dune.image) {
      const duneMd5 = fileMd5(resolveMappedFile(dune.image));
      assert(Boolean(duneMd5), 'IMG-P0-08: laptop-8-138 沙漫金文件存在');
      assert(
        duneMd5 !== laptop3HeroMd5,
        'IMG-P0-08: laptop-8-138 沙漫金图 MD5 ≠ surface-laptop-3-hero.png'
      );
    }
  }
  COMMERCIAL_GEN8_IDS.forEach((id) => {
    const device = SURFACE_DATA.devices.find((d) => d.id === id);
    assert(Boolean(device), `IMG-P0-08: 收录商用第 8 代 ${id}`);
    if (!device) return;
    const names = colorNames(device);
    const hasPlatinum = names.some((n) => n === '亮铂金' || n === '铂金');
    const hasBlack = names.some((n) => n === '典雅黑' || n === '典黑');
    assert(hasPlatinum && hasBlack, `IMG-P0-08: ${id} 商用双色名保持亮铂金+典雅黑 (Actual: ${names.join(', ')})`);
    assertEqual(names.length, 2, `IMG-P0-08: ${id} 商用仅双色`);
  });
}

if (require.main === module) {
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
  console.log('🧪 Surface Specs Hub - IMG-P0 image mapping tests');
  console.log('========================================================');

  runImageMappingP0Tests({ assert, assertEqual });

  console.log('\n========================================================');
  console.log(`🏁 IMG-P0 测试结果: ${passedTests} 项通过, ${failedTests} 项失败`);
  console.log('========================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

module.exports = { runImageMappingP0Tests };
