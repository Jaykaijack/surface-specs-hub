const fs = require('fs');
const text = fs.readFileSync('js/comparison-engine.js', 'utf-8');

const pos = text.indexOf('formatFieldValue(');
if (pos !== -1) {
  fs.writeFileSync('.scratch/format_snippet.js', text.slice(pos, pos + 3000), 'utf-8');
  console.log('Wrote format_snippet');
} else {
  console.log('Not found');
}
