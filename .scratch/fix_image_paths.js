const fs = require('fs');
let text = fs.readFileSync('js/surface-data.js', 'utf-8');

// fix book-3-biz
text = text.replace(
  '"heroImage": "./assets/products/surface-book-platinum.png"',
  '"heroImage": "./assets/products/surface-book-hero.png"'
);
text = text.replace(
  '"image": "./assets/products/surface-book-platinum.png"',
  '"image": "./assets/products/surface-book-hero.png"'
);

// fix go-2-biz
text = text.replace(
  '"heroImage": "./assets/products/surface-go-platinum.png"',
  '"heroImage": "./assets/products/surface-go-hero.png"'
);
text = text.replace(
  '"image": "./assets/products/surface-go-platinum.png"',
  '"image": "./assets/products/surface-go-hero.png"'
);

// fix pro-6-biz
text = text.replace(
  '"heroImage": "./assets/products/surface-pro-platinum.png"',
  '"heroImage": "./assets/products/surface-pro-6-hero.png"'
);
text = text.replace(
  '"image": "./assets/products/surface-pro-platinum.png"',
  '"image": "./assets/products/surface-pro-13-platinum.png"'
);
text = text.replace(
  '"image": "./assets/products/surface-pro-black.png"',
  '"image": "./assets/products/surface-pro-13-black.png"'
);

fs.writeFileSync('js/surface-data.js', text, 'utf-8');
console.log('Fixed image paths in js/surface-data.js');
