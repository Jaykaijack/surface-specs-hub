const fs = require('fs');
const SURFACE_DATA = require('../js/surface-data.js');

console.log('SURFACE_DATA loaded successfully!');
console.log('Devices count:', SURFACE_DATA.devices.length);
console.log('Categories count:', SURFACE_DATA.categories.length);

const lines = {};
const series = {};
SURFACE_DATA.devices.forEach(d => {
  lines[d.line] = (lines[d.line] || 0) + 1;
  series[d.series] = (series[d.series] || 0) + 1;
});
console.log('Lines:', JSON.stringify(lines, null, 2));
console.log('Series:', JSON.stringify(series, null, 2));

const report = {
  consumer: {},
  business: {}
};

SURFACE_DATA.devices.forEach(d => {
  const line = d.line || 'unknown';
  const ser = d.series || 'unknown';
  if (!report[line]) report[line] = {};
  if (!report[line][ser]) report[line][ser] = [];
  report[line][ser].push({
    id: d.id,
    name: d.name,
    generation: d.generation,
    subSeries: d.subSeries,
    colors: d.colors,
    chips: d.chips,
    startingPrice: d.startingPrice,
    sourceUrl: d.sourceUrl
  });
});

fs.writeFileSync('.scratch/db_summary.json', JSON.stringify(report, null, 2), 'utf-8');
console.log('Written .scratch/db_summary.json');
