const assert = require('node:assert/strict');
const fs = require('fs');
const data = require('../js/surface-data.js');
global.SURFACE_DATA = data;
const Catalog = require('../js/catalog.js');
global.Catalog = Catalog;
global.Taxonomy = require('../js/taxonomy.js');
const App = require('../js/app.js');
const ComparisonEngine = require('../js/comparison-engine.js');
function text(v) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map(text).join('');
  if (v.type === 'sup' && v.props?.id) return '';
  return text(v.props?.children);
}
for (const [id, kind] of [['pro-12-inch-2', 'pro'], ['laptop-13-inch-2', 'laptop']]) {
  const capture = require(`../releases/verification-20260930-batch02/evidence/surface-${kind}.json`);
  const table = capture.components.find(c => c.component === 'product-comparison-table').props;
  const device = Catalog.getDevice(id);
  assert(table.columns[0].product.title.includes('第 2 代'));
  assert.equal(table.columns[0].product.price, '10月19日预售');
  assert.equal(device.status, 'upcoming');
  assert.equal(device.specs.status, 'upcoming');
  assert(device.specs.releaseDate.includes('10 月 19 日预售'));
  assert.equal(device.specs.startingPriceCny, null);
  assert(!device.specs.tagline.includes('9,688'));
  assert(device.specs.gpuModel.includes('Adreno'));
  assert(device.specs.warranty.includes('2 年'));
  const gpu = table.specsDialog.items.find(i => text(i.label) === '显卡');
  const warranty = table.specsDialog.items.find(i => text(i.label) === '保修');
  assert(text(gpu.content).includes('Adreno'));
  assert(text(warranty.content).includes('2年有限硬件保修'));
  assert.equal(Catalog.portrait(device).identity, 'pending');
  assert(Catalog.portraitMark(device).includes('图片待核验'));
  assert.equal(Catalog.isRecentLaunch(device, new Date(2026, 9, 1)), false);
  for (const color of device.specs.colors) {
    assert.equal(Catalog.portrait(device, color.name).identity, 'pending');
  }
}
const laptop = Catalog.getDevice('laptop-13-inch-2');
assert(Catalog.getSpec(laptop, 'usbPorts').includes('USB-A 3.2'));
assert(Catalog.getSpec(laptop, 'headphoneJack').includes('3.5'));
assert(Catalog.getSpec(laptop, 'fastCharging').includes('60W'));
assert(laptop.specs.chargingPower.includes('45W'), '标配功率和快充门槛是不同概念');
assert.equal(Catalog.getDevice('pro-12-inch-2').specs.surfaceConnect, null,
  '键盘连接器不得当作磁吸电源口');
const images = require('../releases/verification-20260930-batch02/evidence/image-comparison.json');
assert.equal(images.length, 6);
for (const row of images) {
  assert(fs.existsSync(row.localFile));
  assert(row.imageUrl.startsWith('https://cdn.microsoftstore.com.cn/'));
  if (row.verdict === 'VERIFIED_EXACT_PIXELS') assert.equal(row.decodedRgbaPixelsEqual, true);
  else assert(row.verdict.startsWith('PENDING_'), '不能把读取失败或像素不等误标为核验通过');
}
assert(App.portraitBadge(laptop).includes('图片待核验'));
assert(!App.portraitBadge(laptop).includes('hidden'));
assert(ComparisonEngine.renderComparisonTable([laptop, Catalog.getDevice('pro-12-inch-2')])
  .includes('图片待核验'));
const mark = { hidden: true, textContent: '' };
global.document = { getElementById: id => id.startsWith('portrait-mark-') ? mark : null };
for (const color of laptop.specs.colors) {
  App.previewCardColor(laptop.id, color.name, null);
  assert.equal(mark.hidden, false);
  assert.equal(mark.textContent, '图片待核验');
  ComparisonEngine.switchTableDeviceColor(laptop.id, 0, color.name, null);
  assert.equal(mark.hidden, false);
  assert.equal(mark.textContent, '图片待核验');
}
delete global.document;
const ledger = require('../releases/verification-20260930-batch02/field-ledger-r2.json');
assert.equal(ledger.canClaimFullLibraryAccuracy, false);
for (const row of ledger.devices) {
  const device = Catalog.getDevice(row.deviceId);
  assert.equal(row.entries.length, Object.keys(device.specs).length);
  for (const entry of row.entries) {
    assert.deepEqual(entry.value, device.specs[entry.field], `${row.deviceId}.${entry.field} 证据账与源码值一致`);
    if (entry.verdict === 'VERIFIED') {
      assert(entry.sourceUrl.startsWith('https://www.microsoftstore.com.cn/'));
      assert(entry.evidenceText && entry.sourceLocator);
    } else assert.equal(entry.verdict, 'PENDING');
  }
}
console.log('Batch02: 官方机型绑定、预售状态、价格待核验、接口、保修与图片证据检查通过');
