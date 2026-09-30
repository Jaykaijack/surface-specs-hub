/**
 * 校验并纠准 Xbox 控制器数据（对齐微软中国国行标准译名、真实限定款、美国限定标注）
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../js/xbox-lineup.js');
let content = fs.readFileSync(filePath, 'utf8');

// 匹配 XBOX_CONTROLLERS 数组
const startMark = 'var XBOX_CONTROLLERS = [';
const endMark = 'var XBOX_ACCESSORIES = [';

const startIndex = content.indexOf(startMark);
const endIndex = content.indexOf(endMark);

if (startIndex === -1 || endIndex === -1) {
  console.error('Cannot find marker in xbox-lineup.js');
  process.exit(1);
}

// 提取 XBOX_CONTROLLERS 的 JSON 文本
const jsonText = content.substring(startIndex + 'var XBOX_CONTROLLERS = '.length, content.lastIndexOf('];', endIndex) + 1);
let controllers;
try {
  controllers = eval(jsonText);
} catch (e) {
  console.error('Failed to parse controllers:', e);
  process.exit(1);
}

console.log('Original controllers count:', controllers.length);

controllers.forEach(ctrl => {
  // 1. 标准译名纠正
  if (ctrl.id === 'series-shock-blue') {
    ctrl.name = 'Xbox 无线控制器 - 波动蓝';
    ctrl.colorName = '波动蓝 (Shock Blue)';
    ctrl.image = './assets/products/xbox-series-controller-shock-blue.png';
  } else if (ctrl.id === 'series-electric-volt') {
    ctrl.name = 'Xbox 无线控制器 - 电光黄';
    ctrl.colorName = '电光黄 (Electric Volt)';
    ctrl.image = './assets/products/xbox-series-controller-electric-volt.png';
  } else if (ctrl.id === 'series-velocity-green') {
    ctrl.name = 'Xbox 无线控制器 - 速度绿';
    ctrl.colorName = '速度绿 (Velocity Green)';
    ctrl.image = './assets/products/xbox-wireless-controller-green.png';
  } else if (ctrl.id === 'series-astral-purple') {
    ctrl.name = 'Xbox 无线控制器 - 极光紫';
    ctrl.colorName = '极光紫 (Astral Purple)';
    ctrl.image = './assets/products/xbox-series-controller-purple.png';
  } else if (ctrl.id === 'series-deep-pink') {
    ctrl.name = 'Xbox 无线控制器 - 倾心粉';
    ctrl.colorName = '倾心粉 (Deep Pink)';
    ctrl.image = './assets/products/xbox-series-controller-deep-pink.png';
  } else if (ctrl.id === 'series-pulse-red') {
    ctrl.name = 'Xbox 无线控制器 - 脉冲红';
    ctrl.colorName = '脉冲红 (Pulse Red)';
    ctrl.image = './assets/products/xbox-series-controller-pulse-red.png';
  } else if (ctrl.id === 'series-sky-cipher') {
    ctrl.name = 'Xbox 无线控制器 - 苍穹幽灵特别版';
    ctrl.colorName = '苍穹幽灵 (Sky Cipher Special Edition)';
    ctrl.image = './assets/products/xbox-series-controller-sky-cipher.png';
  } else if (ctrl.id === 'series-ghost-cipher') {
    ctrl.name = 'Xbox 无线控制器 - 幽灵特工特别版';
    ctrl.colorName = '幽灵特工 (Ghost Cipher Special Edition)';
    ctrl.image = './assets/products/xbox-wireless-controller-white.png';
  } else if (ctrl.id === 'series-arctic-camo') {
    ctrl.name = 'Xbox 无线控制器 - 北极迷彩特别版';
    ctrl.colorName = '北极迷彩 (Arctic Camo Special Edition)';
    ctrl.image = './assets/products/xbox-wireless-controller-white.png';
  } else if (ctrl.id === 'series-daystrike-camo') {
    ctrl.name = 'Xbox 无线控制器 - 炽烈迷彩特别版';
    ctrl.colorName = '炽烈迷彩 (Daystrike Camo Special Edition)';
    ctrl.image = './assets/products/xbox-series-controller-red.png';
  } else if (ctrl.id === 'series-storm-breaker') {
    ctrl.name = 'Xbox 无线控制器 - 风暴蓝特别版';
    ctrl.nameEn = 'Xbox Wireless Controller - Stormcloud Vapor Special Edition';
    ctrl.colorName = '风暴蓝 (Stormcloud Vapor Special Edition)';
    ctrl.image = './assets/products/xbox-storm-breaker-special-edition.png';
  }

  // 2. 真实限定款替换虚构版本
  if (ctrl.id === 'series-forza-6') {
    ctrl.id = 'series-forza-5';
    ctrl.name = 'Xbox 无线控制器 -《极限竞速：地平线 5》限量版';
    ctrl.nameEn = 'Xbox Wireless Controller - Forza Horizon 5 Limited Edition';
    ctrl.colorName = '地平线 5 狂飙黄透明款 (Forza Horizon 5)';
    ctrl.image = './assets/products/xbox-forza-horizon-5-controller.png';
    ctrl.year = 2021;
    ctrl.description = '微软官方推出的高人气限量版控制器。采用亮黄色半透明定制外壳、首次引入的方向盘打孔赛车纹理握把与天蓝色底壳撞色，高度还原墨西哥开放世界的速度与狂欢。';
    ctrl.salesRegion = 'cn_official';
  } else if (ctrl.id === 'series-gears-e-day') {
    ctrl.id = 'series-gears-5';
    ctrl.name = 'Xbox 无线控制器 -《战争机器 5》凯特·迪亚兹限量版';
    ctrl.nameEn = 'Xbox Wireless Controller - Gears 5 Kait Diaz Limited Edition';
    ctrl.colorName = '雪原战甲战损风 (Gears 5 Kait Diaz)';
    ctrl.image = './assets/products/xbox-gears-5-kait-controller.png';
    ctrl.year = 2019;
    ctrl.description = '微软官方发售的硬派限定手柄。以女主角凯特·迪亚兹防寒装甲为灵感，呈现极地冰雪战损风蚀刻质感，背部雕刻有猩红齿轮标记，配备橡胶防滑握把。';
    ctrl.salesRegion = 'cn_official';
  } else if (ctrl.id === 'series-heart-breaker') {
    ctrl.id = 'series-starfield';
    ctrl.name = 'Xbox 无线控制器 -《星空》官方限量版';
    ctrl.nameEn = 'Xbox Wireless Controller - Starfield Limited Edition';
    ctrl.colorName = '群星宇航科技白 (Starfield Limited Edition)';
    ctrl.image = './assets/products/xbox-starfield-controller.png';
    ctrl.year = 2023;
    ctrl.description = '微软近年口碑顶峰的重磅限量版手柄。全透明扳机键内嵌青铜震动马达、飞船驾驶舱仪表盘式科技丝印、群星彩色星座条带标与双色科技握把。';
    ctrl.salesRegion = 'cn_official';
  } else if (ctrl.id === 'series-ice-breaker') {
    ctrl.id = 'series-20th-anniversary';
    ctrl.name = 'Xbox 无线控制器 - Xbox 20 周年特别版';
    ctrl.nameEn = 'Xbox Wireless Controller - 20th Anniversary Special Edition';
    ctrl.colorName = '20 周年半透明黑与荧光绿核心';
    ctrl.image = './assets/products/xbox-20th-anniversary-controller.png';
    ctrl.year = 2021;
    ctrl.description = '致敬初代 Xbox 诞生 20 周年的标志性特别版。半透明哑光黑外壳可窥见内部微观机械结构，经典初代荧光绿 X 导航键，连接主机可解锁专属纪念动态背景。';
    ctrl.salesRegion = 'cn_official';
  }

  // 3. 美国限定款（国行未售）醒目标注
  if (ctrl.salesRegion === 'us_only') {
    if (!ctrl.name.includes('[🇺🇸 美国限定·国行未售]')) {
      ctrl.name = ctrl.name.replace(/\[.*?\]/g, '').trim() + ' [🇺🇸 美国限定·国行未售]';
    }
    if (!ctrl.description.includes('【发售区域说明】')) {
      ctrl.description += '【发售区域说明】本款式为美国微软商店与海外地区独占发售，微软中国大陆官方未正式引进销售。';
    }
  }

  // 4. 图片确保为 png 路径
  if (ctrl.image.endsWith('.jpg')) {
    const pngPath = ctrl.image.replace('.jpg', '.png');
    ctrl.image = pngPath;
  }
});

const newJsonText = JSON.stringify(controllers, null, 2);
const newContent = content.substring(0, startIndex) +
  'var XBOX_CONTROLLERS = ' + newJsonText + ';\n\n' +
  content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated js/xbox-lineup.js with verified controllers!');
