const fs = require('fs');
const text = fs.readFileSync('tests/test-runner.js', 'utf-8');

const pos = text.indexOf('Test Suite 7:');
if (pos !== -1) {
  fs.writeFileSync('.scratch/test_snippet.js', text.slice(pos, pos + 4000), 'utf-8');
  console.log('Wrote test_snippet');
} else {
  console.log('Not found');
}
