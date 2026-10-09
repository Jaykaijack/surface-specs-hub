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
  assert(String(missing.src).startsWith('data:image/svg+xml,'), '没有机型时使用文字占位，不借其他产品图');

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
  assertEqual(pro13Shot.identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assert(Catalog.portraitMark(pro13).includes('待核验'), '国行在售的第 12 代不打「同系列示意」');
  const pro12 = SURFACE_DATA.devices.find((device) => device.id === 'pro-12-inch');
  assertEqual(Catalog.portrait(pro12).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  const borrowed = SURFACE_DATA.devices.find((device) => device.id === 'pro-11-13');
  assertEqual(Catalog.portrait(borrowed).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  const older = SURFACE_DATA.devices.find((device) => device.id === 'pro-8-biz');
  const sharedShot = Catalog.portrait(older, '亮铂金');
  assertEqual(sharedShot.identity, 'shared', '用了另一代机器的图，身份才是同系列代用图');
  assert(String(sharedShot.src).includes('?v='), '机型图地址带版本标记，服务器上换图后浏览器会重新取');
  assert(Catalog.portraitMark(older, '亮铂金').includes('同系列示意'), '代用图要标出「同系列示意」');

  const laptop8 = SURFACE_DATA.devices.find((device) => device.id === 'laptop-8-138');
  const laptop8Platinum = Catalog.portrait(laptop8, '亮铂金');
  assertEqual(laptop8Platinum.identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assert(Catalog.portraitMark(laptop8, '亮铂金').includes('待核验'), '单独配色图不打代用标记');
  const laptop8Intel = SURFACE_DATA.devices.find((device) => device.id === 'laptop-8-138-intel');
  assertEqual(Catalog.portrait(laptop8Intel, '亮铂金').identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  const laptop1 = SURFACE_DATA.devices.find((device) => device.id === 'laptop-1');
  assertEqual(Catalog.portrait(laptop1).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assertEqual(Catalog.portrait(laptop1, '亮铂金').identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assertEqual(Catalog.portrait(laptop1, '勃艮第红').identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  const laptop2 = SURFACE_DATA.devices.find((device) => device.id === 'laptop-2');
  assertEqual(Catalog.portrait(laptop2).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  const pro1 = SURFACE_DATA.devices.find((device) => device.id === 'pro-1');
  assertEqual(Catalog.portrait(pro1).identity, 'blocked', '文件名及共用关系不能替代逐图来源核验');
  const pro8 = SURFACE_DATA.devices.find((device) => device.id === 'pro-8');
  const pro3 = SURFACE_DATA.devices.find((device) => device.id === 'pro-3');
  const pro4 = SURFACE_DATA.devices.find((device) => device.id === 'pro-4');
  const pro5 = SURFACE_DATA.devices.find((device) => device.id === 'pro-5');
  const pro6 = SURFACE_DATA.devices.find((device) => device.id === 'pro-6');
  const prox = SURFACE_DATA.devices.find((device) => device.id === 'pro-x');
  assertEqual(Catalog.portrait(pro8).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assertEqual(Catalog.portrait(pro5).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assertEqual(Catalog.portrait(pro6).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assertEqual(Catalog.portrait(prox).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assertEqual(Catalog.portrait(pro3).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assertEqual(Catalog.portrait(pro4).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  const hub2s = SURFACE_DATA.devices.find((device) => device.id === 'hub-2s');
  const hub3 = SURFACE_DATA.devices.find((device) => device.id === 'hub-3');
  assertEqual(Catalog.portrait(hub2s).identity, 'pending', '文件名及共用关系不能替代逐图来源核验');
  assertEqual(Catalog.portrait(hub3).identity, 'blocked', '文件名及共用关系不能替代逐图来源核验');

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
  App.renderSeriesView(seriesBox, 'studio', 'consumer');
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

  const asOf = new Date(2026, 8, 25);
  const recentIds = Catalog.listDevices()
    .filter((device) => Catalog.isRecentLaunch(device, asOf))
    .map((device) => device.id)
    .sort();
  assertEqual(recentIds.join(','), [
    'laptop-8-138',
    'laptop-8-138-intel',
    'laptop-8-138-snap',
    'laptop-8-150',
    'laptop-8-150-intel',
    'laptop-8-150-snap',
    'pro-12-13',
    'pro-12-13-intel',
    'pro-12-13-snap'
  ].sort().join(','), '2026 年 9 月 25 日往前 6 个月内发售的机型标为新品');
  assert(!Catalog.isRecentLaunch(Catalog.getDevice('pro-12-inch'), asOf), '只写了年份、没有月份的 12 英寸第 1 代不标新品');
  assert(!Catalog.isRecentLaunch(Catalog.getDevice('laptop-13-inch'), asOf), '2025 年 10 月的 13 英寸第 1 代已超过半年，不标新品');
  assert(!Catalog.isRecentLaunch(Catalog.getDevice('pro-12-inch-biz'), asOf), '2025 年 5 月的商用 12 英寸不标新品');
  assert(!Catalog.isRecentLaunch({ specs: { releaseDate: '2026 年 2 月' } }, asOf), '早于 6 个月不标新品');
  assert(Catalog.isRecentLaunch({ specs: { releaseDate: '2026 年 3 月' } }, asOf), '正好满 6 个月仍标新品');

  const deviceCardHtml = (html, id) => {
    const token = `id="card-${id}"`;
    const start = html.indexOf(token);
    if (start < 0) return '';
    const next = html.indexOf('class="device-card-mini', start + token.length);
    return html.slice(start, next === -1 ? html.length : next);
  };
  const home = { innerHTML: '' };
  App.renderHomeView(home);
  assert(!deviceCardHtml(home.innerHTML, 'pro-12-inch-2').includes('>新品<'), '10 月 19 日才预售的 Pro 第 2 代不得提前标已发售新品');
  assert(deviceCardHtml(home.innerHTML, 'laptop-8-138').includes('>新品<'), '首页 13.8 英寸 Laptop 第 8 代要标新品');
  assert(!deviceCardHtml(home.innerHTML, 'pro-12-inch').includes('>新品<'), '首页 12 英寸 Pro 第 1 代不标新品');

  const series = { innerHTML: '' };
  App.renderSeriesView(series, 'pro', 'consumer');
  assert(!deviceCardHtml(series.innerHTML, 'pro-12-inch-2').includes('>新品<'), '系列页未到预售日期的机型不标已发售新品');
  assert(!deviceCardHtml(series.innerHTML, 'pro-12-inch').includes('>新品<'), '系列页里超过半年的机型不标新品');

  const table = ComparisonEngine.renderComparisonTable([
    Catalog.getDevice('pro-12-inch-2'),
    Catalog.getDevice('pro-12-inch')
  ]);
  const columns = table.split('<th>').slice(1);
  const columnFor = (id) => columns.find((col) => new RegExp(`table-thumb-${id}-\\d+(?![\\d-])`).test(col)) || '';
  assert(!columnFor('pro-12-inch-2').includes('>新品<'), '对比表未到预售日期的机型不标已发售新品');
  assert(!columnFor('pro-12-inch').includes('>新品<'), '对比表里第 1 代不标新品');
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
