/**
 * 部署前三条 seam：规格只从 Catalog 读、机型图带身份、离线包脚本与网页入口一致。
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');

function runDeploySeamTests(helpers) {
  const { assert, assertEqual } = helpers;
  const SURFACE_DATA = global.SURFACE_DATA || require('../js/surface-data.js');
  const Catalog = global.Catalog || require('../js/catalog.js');
  const ComparisonEngine = global.ComparisonEngine || require('../js/comparison-engine.js');
  const App = global.App || require('../js/app.js');

  console.log('\n🧩 Test Suite: 部署 seam（规格出口 / 机型图身份 / 离线包）');

  const missing = Catalog.portrait(null);
  assertEqual(missing.identity, 'missing', '没有机型时，机型图身份是没有图');
  assert(String(missing.src).includes('surface-new-pro-hero.png'), '没有机型时仍给出代表图，卡片不会空白');

  const bare = { id: 'bare-device', specs: {} };
  const bareShot = Catalog.portrait(bare);
  assertEqual(bareShot.identity, 'missing', '没写图片的机型，身份是没有图');

  const pathKey = (rel) => String(rel || '').split('?')[0].replace(/^\.\//, '');
  const owners = new Map();
  SURFACE_DATA.devices.forEach((device) => {
    const paths = [];
    if (device.heroImage) paths.push(pathKey(device.heroImage));
    const colors = device.specs && device.specs.colors;
    if (Array.isArray(colors)) {
      colors.forEach((color) => {
        if (color && color.image) paths.push(pathKey(color.image));
      });
    }
    paths.forEach((file) => {
      if (!owners.has(file)) owners.set(file, new Set());
      owners.get(file).add(device.id);
    });
  });

  let sharedDevice = null;
  let officialDevice = null;
  let officialColor = '';
  SURFACE_DATA.devices.forEach((device) => {
    const hero = pathKey(device.heroImage);
    if (!sharedDevice && hero && owners.get(hero) && owners.get(hero).size > 1) {
      sharedDevice = device;
    }
    const colors = (device.specs && device.specs.colors) || [];
    colors.forEach((color) => {
      const file = pathKey(color.image);
      if (!officialDevice && file && owners.get(file) && owners.get(file).size === 1) {
        officialDevice = device;
        officialColor = color.name;
      }
    });
  });

  assert(Boolean(sharedDevice), '档案里存在同系列共用的机型图');
  assert(Boolean(officialDevice), '档案里存在只属于一台机器的配色图');

  const pro13 = SURFACE_DATA.devices.find((device) => device.id === 'pro-12-13-intel');
  const pro13Shot = Catalog.portrait(pro13);
  assertEqual(pro13Shot.identity, 'official', '同一代的 Intel、骁龙、消费版共用官方图，不叫代用图');
  assertEqual(Catalog.portraitMark(pro13), '', '国行在售的第 12 代不打「同系列示意」');
  const pro12 = SURFACE_DATA.devices.find((device) => device.id === 'pro-12-inch');
  assertEqual(Catalog.portrait(pro12).identity, 'official', '12 英寸消费版和商用版共用官方图，不叫代用图');
  const borrowed = SURFACE_DATA.devices.find((device) => device.id === 'pro-11-13');
  const sharedShot = Catalog.portrait(borrowed);
  assertEqual(sharedShot.identity, 'shared', '用了另一代机器的图，身份才是同系列代用图');
  assert(String(sharedShot.src).includes('?v='), '机型图地址带版本标记，服务器上换图后浏览器会重新取');
  assert(Catalog.portraitMark(borrowed).includes('同系列示意'), '代用图要标出「同系列示意」');

  const laptop8 = SURFACE_DATA.devices.find((device) => device.id === 'laptop-8-138');
  const laptop8Platinum = Catalog.portrait(laptop8, '亮铂金');
  assertEqual(laptop8Platinum.identity, 'official', '第 8 代消费版亮铂金用的是单独的官方配色图');
  assertEqual(Catalog.portraitMark(laptop8, '亮铂金'), '', '单独配色图不打代用标记');
  const laptop8Intel = SURFACE_DATA.devices.find((device) => device.id === 'laptop-8-138-intel');
  assertEqual(Catalog.portrait(laptop8Intel, '亮铂金').identity, 'official', '第 8 代 Intel 亮铂金和第 8 代主图是同一张，不叫代用图');
  const laptop1 = SURFACE_DATA.devices.find((device) => device.id === 'laptop-1');
  assertEqual(Catalog.portrait(laptop1).identity, 'official', '初代 Laptop 主图已换成 2017 年官方产品图');
  assertEqual(Catalog.portrait(laptop1, '亮铂金').identity, 'official', '初代 Laptop 亮铂金用的是 2017 年官方铂金图');
  assertEqual(Catalog.portrait(laptop1, '勃艮第红').identity, 'official', '初代 Laptop 勃艮第红用的是 2017 年官方红色图');
  const laptop2 = SURFACE_DATA.devices.find((device) => device.id === 'laptop-2');
  assertEqual(Catalog.portrait(laptop2).identity, 'official', 'Laptop 2 主图已换成自己的官方产品图');
  const pro1 = SURFACE_DATA.devices.find((device) => device.id === 'pro-1');
  assertEqual(Catalog.portrait(pro1).identity, 'shared', '初代 Pro 的主图和第 12 代典雅黑是同一张，要标示意');
  const pro8 = SURFACE_DATA.devices.find((device) => device.id === 'pro-8');
  const pro3 = SURFACE_DATA.devices.find((device) => device.id === 'pro-3');
  const pro4 = SURFACE_DATA.devices.find((device) => device.id === 'pro-4');
  const pro5 = SURFACE_DATA.devices.find((device) => device.id === 'pro-5');
  const pro6 = SURFACE_DATA.devices.find((device) => device.id === 'pro-6');
  const prox = SURFACE_DATA.devices.find((device) => device.id === 'pro-x');
  assertEqual(Catalog.portrait(pro8).identity, 'official', 'Pro 8 主图已换成自己的官方产品图');
  assertEqual(Catalog.portrait(pro5).identity, 'official', '2017 款 Surface Pro 主图已换成自己的官方产品图');
  assertEqual(Catalog.portrait(pro6).identity, 'official', 'Pro 6 主图已换成自己的官方产品图');
  assertEqual(Catalog.portrait(prox).identity, 'official', 'Pro X 主图已换成自己的官方产品图');
  assertEqual(Catalog.portrait(pro3).identity, 'official', 'Pro 3 主图已换成 2014 年官方产品图');
  assertEqual(Catalog.portrait(pro4).identity, 'shared', 'Pro 4 还没有自己的官方产品图，继续标示意');
  const hub2s = SURFACE_DATA.devices.find((device) => device.id === 'hub-2s');
  const hub3 = SURFACE_DATA.devices.find((device) => device.id === 'hub-3');
  assertEqual(Catalog.portrait(hub2s).identity, 'official', '文件名写明 Hub 2S 的图，仍属于 Hub 2S');
  assertEqual(Catalog.portrait(hub3).identity, 'shared', 'Hub 3 借用 Hub 2S 的图，要标示意');

  const officialShot = laptop8Platinum;

  const detailHtml = Catalog.frame(officialShot, { slot: 'detail', alt: '详情' });
  assert(detailHtml.includes('type="image/avif"'), '详情图先提供 AVIF，浏览器只下一张');
  assert(detailHtml.includes('type="image/webp"'), '不支持 AVIF 的浏览器用 WebP');
  assert(detailHtml.includes('fetchpriority="high"'), '详情主图是首屏高优先级');
  assert(detailHtml.includes('loading="eager"'), '详情主图立即加载');
  assert(!/src="[^"]+\.png/.test(detailHtml), '详情图不再直接下载原始大图');
  const cardHtml = Catalog.frame(officialShot, { slot: 'card', loading: 'lazy' });
  assert(cardHtml.includes('loading="lazy"'), '列表图可以晚一点加载');
  assert(!cardHtml.includes('fetchpriority="high"'), '列表图不抢最高优先级');
  assert(cardHtml.includes('sizes='), '列表图按真实卡片宽度选尺寸');
  const offlineHtml = Catalog.frame({ src: 'data:image/webp;base64,abc', identity: 'official' }, { slot: 'detail' });
  assert(offlineHtml.includes('data:image/webp;base64,abc'), '离线内嵌图保持原样');
  assert(!offlineHtml.includes('assets/delivery'), '离线内嵌图不再去找交付图');

  const aliasHtml = ComparisonEngine.renderComparisonTable([{
    id: 'alias-stub',
    name: '别名桩',
    categoryId: 'pro',
    generation: '测试',
    specs: { usbC: '2 × USB-C 3.2', usbA: '1 × USB-A' }
  }], false);
  assert(aliasHtml.includes('USB-A'), '对比表必须读出口拼出的 USB-A，不能只看到 USB-C');
  assert(!aliasHtml.includes('.specs'), '对比表页面不得再直读原始字段');

  const seriesBox = { innerHTML: '' };
  App.seriesViewMode = 'gallery';
  App.renderSeriesView(seriesBox, 'laptop', 'consumer');
  assert(seriesBox.innerHTML.includes('同系列示意'), '系列卡片上，代用图能被看见');

  ['js/app.js', 'js/comparison-engine.js', 'js/tools-engine.js'].forEach((rel) => {
    const text = fs.readFileSync(path.join(REPO, rel), 'utf8');
    assert(!text.includes('.specs'), `${rel} 页面与工具只通过规格出口读参数`);
  });

  const index = fs.readFileSync(path.join(REPO, 'index.html'), 'utf8');
  const pageScripts = [];
  const scriptRe = /<script\s+src="\.\/(js\/[^"?]+)/g;
  let match;
  while ((match = scriptRe.exec(index)) !== null) pageScripts.push(match[1]);

  const builder = fs.readFileSync(path.join(REPO, 'scripts/build_standalone.py'), 'utf8');
  const listMatch = builder.match(/JS_FILES\s*=\s*\[([\s\S]*?)\]/);
  assert(Boolean(listMatch), '离线打包脚本列有脚本清单');
  const packed = [];
  const fileRe = /'(js\/[^']+)'/g;
  while ((match = fileRe.exec(listMatch[1])) !== null) packed.push(match[1]);
  assertEqual(packed.join('|'), pageScripts.join('|'), 'U 盘单文件的脚本清单与网站入口一致');
}

if (require.main === module) {
  global.SURFACE_DATA = require('../js/surface-data.js');
  global.Catalog = require('../js/catalog.js');
  global.Taxonomy = require('../js/taxonomy.js');
  global.ComparisonEngine = require('../js/comparison-engine.js');
  global.ToolsEngine = require('../js/tools-engine.js');
  global.App = require('../js/app.js');
  let failed = 0;
  const assert = (condition, message) => {
    if (!condition) {
      failed += 1;
      console.error('FAIL', message);
    } else {
      console.log('PASS', message);
    }
  };
  const assertEqual = (actual, expected, message) => {
    assert(actual === expected, `${message} (Expected: ${expected}, Actual: ${actual})`);
  };
  runDeploySeamTests({ assert, assertEqual });
  process.exit(failed ? 1 : 0);
}

module.exports = { runDeploySeamTests };
