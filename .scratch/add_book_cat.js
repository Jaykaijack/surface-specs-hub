const fs = require('fs');
let text = fs.readFileSync('js/surface-data.js', 'utf-8');

const target = '"defaultModel": "sls-2-biz"\n  },';
const targetCRLF = '"defaultModel": "sls-2-biz"\r\n  },';

const insertBlock = `  {
    "id": "business-book",
    "seriesId": "book",
    "segment": "commercial",
    "name": "Surface Book 商用系列",
    "icon": "book",
    "desc": "企业级可拆卸独显图形工作站 (13.5\\" - 15.0\\")",
    "defaultModel": "book-3-biz"
  },`;

if (text.includes(target)) {
  text = text.replace(target, '"defaultModel": "sls-2-biz"\n  },\n' + insertBlock);
  console.log('Inserted LF');
} else if (text.includes(targetCRLF)) {
  text = text.replace(targetCRLF, '"defaultModel": "sls-2-biz"\r\n  },\r\n' + insertBlock.replace(/\n/g, '\r\n'));
  console.log('Inserted CRLF');
} else {
  console.log('Not found');
}

fs.writeFileSync('js/surface-data.js', text, 'utf-8');
console.log('Done.');
