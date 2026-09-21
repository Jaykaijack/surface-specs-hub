const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../js/surface-data.js');
let content = fs.readFileSync(dataFile, 'utf8');

const id0 = content.indexOf('"id": "intel-core-ultra-gen3"');
console.log('id0 index:', id0);
console.log('Surrounding id0:', JSON.stringify(content.slice(id0 - 20, id0 + 50)));

const id1 = content.indexOf('"id": "snapdragon-x2-elite"');
console.log('id1 index:', id1);
console.log('Surrounding id1:', JSON.stringify(content.slice(id1 - 20, id1 + 50)));
