/** Apply only value-bound China business evidence. Default is a read-only check. */
const fs = require('node:fs');
const path = require('node:path');
const {correctUltraBusiness} = require('./verification/ultra-business-correction');
const ledger = require('../docs/evidence/ultra-business-cn-field-ledger.json');
function updateUltra(input) {
  const serializable = JSON.parse(JSON.stringify(input));
  const {dataset} = correctUltraBusiness(serializable);
  const device = dataset.devices.find(d => d.id === 'laptop-ultra-biz');
  for (const e of ledger.entries) {
    if (e.deviceId !== device.id || e.region !== 'CN' || e.verdict !== 'VERIFIED' || e.sourceUrl !== device.specs.officialDocUrl) continue;
    device.specs[e.field] = e.value;
  }
  for (const chip of dataset.chips || []) if (chip.id === 'nvidia-rtx-spark-n1x') chip.npuTops = null;
  return dataset;
}
if (require.main === module) {
  const file = path.join(__dirname,'../js/surface-data.js');
  const input = require(file), output = updateUltra(input);
  if (process.argv.includes('--write')) {
    const text = fs.readFileSync(file,'utf8'), tail = text.indexOf('(function attachXboxLineup()');
    if (tail < 0) throw new Error('Unsupported data file format; no write performed');
    fs.writeFileSync(file, 'const SURFACE_DATA = '+JSON.stringify(output,null,2)+';\n\n'+text.slice(tail));
    console.log('Applied scoped evidence; rebuild verification registry before build.');
  } else {
    console.log(JSON.stringify(output) === JSON.stringify(JSON.parse(JSON.stringify(input))) ? 'PASS: scoped Ultra evidence is current' : 'Pending scoped changes; review before --write');
  }
}
module.exports = {updateUltra};
