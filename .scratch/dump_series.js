const fs = require('fs');
const text = fs.readFileSync('js/app.js', 'utf-8');

const pos = text.indexOf('renderSeriesView(');
if (pos !== -1) {
  fs.writeFileSync('.scratch/series_snippet.js', text.slice(pos, pos + 4000), 'utf-8');
  console.log('Wrote series_snippet');
} else {
  console.log('renderSeriesView not found');
}
