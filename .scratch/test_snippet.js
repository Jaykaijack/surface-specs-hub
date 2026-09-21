Test Suite 7: 官方机型高清图像与外观配色展示集
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

// 检验新收录的官方 12 英寸机型
const pro12Inch = SURFACE_DATA.devices.find(d => d.id === 'pro-12-inch');
assert(Boolean(pro12Inch), '全系参数库正式收录官方 Surface Pro, 12 英寸 (第 1 代)');
assertEqual(pro12Inch.specs.resolution, '2196 × 1464', '12 英寸机型分辨率 2196x1464 准确无误');
assertEqual(pro12Inch.specs.npuTops, '45 TOPS', '12 英寸机型搭载 45 TOPS 高通 NPU');
assertEqual(pro12Inch.specs.startingPriceCny, '¥7,888 起 (消费版)', '12 英寸机型官方商城起售价准确无误 (Actual: ¥7,888 起)');
assert(pro12Inch.specs.officialDocUrl.includes('configure/surface-pro-12-inch'), '12 英寸官方商城直达选配页链接准确');
const pro12Colors = pro12Inch.specs.colors.map(c => c.name);
assert(pro12Colors.includes('亮铂金') && pro12Colors.includes('罗兰紫') && pro12Colors.includes('碧海青'), '12 英寸机型完整包含官网在售 3 色: 亮铂金、罗兰紫、碧海青');
assert(SURFACE_DATA.getDeviceImage(pro12Inch, '罗兰紫').includes('violet.png'), '12 英寸支持切换罗兰紫配色图');
assert(SURFACE_DATA.getDeviceImage(pro12Inch, '碧海青').includes('ocean.png'), '12 英寸支持切换碧海青配色图');

// ----------------------------------------------------
// 8. Matt Pocock 架构与工程规范校验 (Architecture & Governance)
// ----------------------------------------------------
console.log('