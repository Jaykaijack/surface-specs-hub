const fs = require('fs');
const path = require('path');

const surfaceDataPath = path.resolve(__dirname, '../js/surface-data.js');
const xboxLineupPath = path.resolve(__dirname, '../js/xbox-lineup.js');

const rawSurface = fs.readFileSync(surfaceDataPath, 'utf-8');
const marker = '};\n\n(function attachXboxLineup()';
const idx = rawSurface.indexOf(marker);
if (idx === -1) {
  throw new Error('Could not find marker in surface-data.js');
}

const jsonPart = rawSurface.slice('const SURFACE_DATA = '.length, idx).trim() + '}';
const surfaceData = JSON.parse(jsonPart);
const tail = rawSurface.slice(idx + 1); // includes ";\n\n(function attachXboxLineup()..."

const updates = {
  'pro-8': [
    { name: '亮铂金', hex: '#d8d8d8', material: '特种阳极氧化铝', image: './assets/products/surface-pro-8-hero.png' },
    { name: '典黑', hex: '#262626', material: '特种阳极氧化铝 (石墨黑)', image: './assets/products/surface-pro-13-black.png' }
  ],
  'pro-x': [
    { name: '亮铂金', hex: '#d8d8d8', material: '特种阳极氧化铝', image: './assets/products/surface-pro-x-hero.png' },
    { name: '典黑', hex: '#262626', material: '特种阳极氧化铝 (哑光黑)' }
  ],
  'pro-7': [
    { name: '亮铂金', hex: '#d8d8d8', material: '特制镁合金 VaporMg', image: './assets/products/surface-pro-7-hero.png' },
    { name: '典黑', hex: '#262626', material: '特制镁合金 (哑光黑涂层)' }
  ],
  'pro-6': [
    { name: '亮铂金', hex: '#d8d8d8', material: '特制镁合金 VaporMg', image: './assets/products/surface-pro-6-hero.png' },
    { name: '典黑', hex: '#262626', material: '特制镁合金 (哑光黑涂层)' }
  ],
  'pro-7-plus': [
    { name: '亮铂金', hex: '#d8d8d8', material: '特制镁合金 VaporMg' },
    { name: '典黑', hex: '#262626', material: '特制镁合金 (哑光黑涂层)' }
  ],
  'pro-6-biz': [
    { name: '亮铂金', hex: '#d8d8d8', material: '特制镁合金' },
    { name: '典雅黑', hex: '#262626', material: '特制镁合金' }
  ],
  'laptop-6-biz': [
    { name: '亮铂金', hex: '#d8d8d8', material: '阳极氧化铝一体机身', image: './assets/products/surface-laptop-6-biz-hero.png' },
    { name: '典黑', hex: '#262626', material: '阳极氧化铝一体机身', image: './assets/products/surface-laptop-black.png' }
  ],
  'laptop-5': [
    { name: '亮铂金', hex: '#d8d8d8', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-5-hero.png' },
    { name: '典黑', hex: '#262626', material: '阳极氧化铝金属掌托', image: './assets/products/surface-laptop-black.png' },
    { name: '森野绿', hex: '#3b5323', material: '阳极氧化铝金属掌托', image: './assets/products/surface-laptop-sage.png' },
    { name: '砂岩金', hex: '#d2b48c', material: '阳极氧化铝金属掌托', image: './assets/products/surface-laptop-dune.png' }
  ],
  'laptop-5-biz': [
    { name: '亮铂金', hex: '#d8d8d8', material: '阳极氧化铝金属机身' },
    { name: '典雅黑', hex: '#262626', material: '阳极氧化铝金属机身' }
  ],
  'laptop-4': [
    { name: '亮铂金', hex: '#d8d8d8', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-4-hero.png' },
    { name: '典黑', hex: '#262626', material: '阳极氧化铝金属掌托', image: './assets/products/surface-laptop-black.png' },
    { name: '冰晶蓝', hex: '#a4c2f4', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-sapphire.png' },
    { name: '砂岩金', hex: '#d2b48c', material: '阳极氧化铝金属掌托', image: './assets/products/surface-laptop-dune.png' }
  ],
  'laptop-3': [
    { name: '亮铂金', hex: '#d8d8d8', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-3-hero.png' },
    { name: '典黑', hex: '#262626', material: '阳极氧化铝金属掌托', image: './assets/products/surface-laptop-black.png' },
    { name: '砂岩金', hex: '#d2b48c', material: '阳极氧化铝金属掌托', image: './assets/products/surface-laptop-dune.png' },
    { name: '钴蓝色', hex: '#0047ab', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-1-cobalt.png' }
  ],
  'laptop-2': [
    { name: '亮铂金', hex: '#d8d8d8', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-2-hero.png' },
    { name: '典黑', hex: '#262626', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-black.png' },
    { name: '勃艮第红', hex: '#800020', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-1-burgundy.png' },
    { name: '深钴蓝', hex: '#0047ab', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-1-cobalt.png' }
  ],
  'laptop-1': [
    { name: '亮铂金', hex: '#d8d8d8', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-1-hero.png' },
    { name: '石墨金', hex: '#cfb53b', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-1-gold.png' },
    { name: '勃艮第红', hex: '#800020', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-1-burgundy.png' },
    { name: '深钴蓝', hex: '#0047ab', material: 'Alcantara® 欧缔兰织物掌托', image: './assets/products/surface-laptop-1-cobalt.png' }
  ],
  'laptop-go-1': [
    { name: '冰晶蓝', hex: '#a4c2d6', material: '阳极氧化铝 + 复合材质基座', image: './assets/products/surface-laptop-sapphire.png' },
    { name: '砂岩金', hex: '#d2b48c', material: '阳极氧化铝 + 复合材质基座', image: './assets/products/surface-laptop-dune.png' },
    { name: '亮铂金', hex: '#d8d8d8', material: '阳极氧化铝 + 复合材质基座', image: './assets/products/surface-laptop-platinum.png' }
  ],
  'laptop-go-2': [
    { name: '仙踪绿', hex: '#8a9a86', material: '阳极氧化铝 + 复合材质基座', image: './assets/products/surface-laptop-sage.png' },
    { name: '冰晶蓝', hex: '#a4c2d6', material: '阳极氧化铝 + 复合材质基座', image: './assets/products/surface-laptop-sapphire.png' },
    { name: '砂岩金', hex: '#d2b48c', material: '阳极氧化铝 + 复合材质基座', image: './assets/products/surface-laptop-dune.png' },
    { name: '亮铂金', hex: '#d8d8d8', material: '阳极氧化铝 + 复合材质基座', image: './assets/products/surface-laptop-platinum.png' }
  ],
  'go-3': [
    { name: '亮铂金', hex: '#d8d8d8', material: '特制镁合金', image: './assets/products/surface-go-3-hero.png' }
  ],
  'go-3-biz': [
    { name: '亮铂金', hex: '#d8d8d8', material: '特制镁合金' }
  ],
  'xbox-360': [
    { name: '典雅冷白 Chill White', hex: '#e2e8f0', image: './assets/products/xbox-360-original-hero.png' },
    { name: '精英黑 Elite Matte Black', hex: '#1e293b', image: './assets/products/xbox-360-elite-hero.png' }
  ],
  'xbox-360-s': [
    { name: '亮面钢琴黑 Liquid Black', hex: '#0a0a0a', image: './assets/products/xbox-360-s-hero.png' },
    { name: '哑光黑 Matte Black', hex: '#1e2229', image: './assets/products/xbox-360-s-hero.png' }
  ],
  'xbox-one-x': [
    { name: '哑光深空黑 Matte Space Black', hex: '#1c1917', image: './assets/products/xbox-one-x-hero.png' },
    { name: '机器人白 Robot White', hex: '#f8fafc', image: './assets/products/xbox-series-x-digital-white-hero.png' }
  ],
  'xbox-series-s-1tb': [
    { name: '碳黑 Carbon Black', hex: '#1c1c1c', image: './assets/products/xbox-series-s-transparent.png' },
    { name: '机器人白 Robot White', hex: '#f8fafc', image: './assets/products/xbox-series-s-512-hero.png' }
  ]
};

let patchedCount = 0;
surfaceData.devices.forEach(dev => {
  if (updates[dev.id]) {
    dev.specs.colors = updates[dev.id];
    patchedCount++;
    console.log(`✅ Patched colors for [${dev.id}] (${dev.name})`);
  }
});

console.log(`Total devices patched: ${patchedCount}`);

// 写回 surface-data.js
const newContent = 'const SURFACE_DATA = ' + JSON.stringify(surfaceData, null, 2) + tail;
fs.writeFileSync(surfaceDataPath, newContent, 'utf-8');
console.log('✅ Updated js/surface-data.js successfully!');
