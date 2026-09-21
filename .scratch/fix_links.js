const fs = require('fs');
let text = fs.readFileSync('js/surface-data.js', 'utf-8');

text = text.replace(
  'https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-go-3-for-business',
  'https://www.microsoftstore.com.cn/surface/surface-laptop-go-3'
);

text = text.replace(
  'https://www.microsoftstore.com.cn/surface/certified-refurbished-surface-laptop-go-3-for-business',
  'https://www.microsoftstore.com.cn/surface/surface-laptop-go-3'
);

// Specifically for consumer laptop-go-3:
const target = `"id": "laptop-go-3",
    "categoryId": "laptopgo",
    "heroImage": "./assets/products/surface-laptop-go-platinum.png",
    "name": "Surface Laptop Go 3",
    "nameEn": "Surface Laptop Go 3",
    "generation": "第 3 代 (2023)",
    "year": 2023,
    "status": "current_cn",
    "targetAudience": "consumer",
    "flagship": true,
    "tagline": "轻巧便携入门触控笔记本，日常生产力绝佳伴侣",
    "prevGenerationId": "laptop-go-2",
    "nextGenerationId": null,
    "specs": {`;

const idx = text.indexOf(target);
if (idx !== -1) {
  const endIdx = text.indexOf('},', idx + 1000);
  let block = text.slice(idx, endIdx);
  block = block.replace(
    '"learnDocUrl": "https://learn.microsoft.com/en-us/surface/surface-laptop-go-3"',
    '"learnDocUrl": "https://support.microsoft.com/zh-cn/surface/surface-laptop-go-3-%E7%89%B9%E6%80%A7"'
  );
  text = text.slice(0, idx) + block + text.slice(endIdx);
  console.log('Consumer laptop-go-3 learnDocUrl updated!');
}

fs.writeFileSync('js/surface-data.js', text, 'utf-8');
console.log('Saved js/surface-data.js');
