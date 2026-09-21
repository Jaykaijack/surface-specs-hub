const fs = require('fs');
const text = fs.readFileSync('js/comparison-engine.js', 'utf-8');

const pos = text.indexOf('renderComparisonTable(');
if (pos !== -1) {
  fs.writeFileSync('.scratch/render_table_snippet.js', text.slice(pos, pos + 5000), 'utf-8');
  console.log('Wrote render_table_snippet');
} else {
  console.log('Not found');
}
