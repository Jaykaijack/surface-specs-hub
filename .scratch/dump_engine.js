const fs = require('fs');
const text = fs.readFileSync('js/comparison-engine.js', 'utf-8');

const pos = text.indexOf('renderTable');
if (pos !== -1) {
  fs.writeFileSync('.scratch/engine_snippet.js', text.slice(pos, pos + 4000), 'utf-8');
  console.log('Wrote engine_snippet from renderTable');
} else {
  fs.writeFileSync('.scratch/engine_snippet.js', text.slice(0, 4000), 'utf-8');
  console.log('Wrote top 4000 chars');
}
