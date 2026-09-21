const fs = require('fs');
const content = fs.readFileSync('./js/surface-data.js', 'utf8');
const accIdx = content.indexOf('"accessories":');
console.log('After accIdx:');
console.log(content.slice(accIdx + content.slice(accIdx).lastIndexOf(']')));
