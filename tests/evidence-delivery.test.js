const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const split = require('../scripts/deploy/split-runtime-evidence');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'surface-evidence-'));
try {
  fs.mkdirSync(path.join(dir, 'js'));
  const original = fs.readFileSync('js/surface-data.js', 'utf8');
  fs.writeFileSync(path.join(dir, 'js/surface-data.js'), original);
  const delivery = split(dir);
  assert.ok(delivery.initialBytes < delivery.fullBytes * 0.65, 'initial data should omit verbose evidence and formatting');
  const context = vm.createContext({URL});
  vm.runInContext(fs.readFileSync(path.join(dir, 'js/surface-data.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync('js/catalog.js', 'utf8'), context);
  assert.equal(vm.runInContext('Catalog.listDevices().length', context), 90);
  assert.match(vm.runInContext('Catalog.pendingEvidenceAsset()', context), /field-evidence\.[a-f0-9]{12}\.js$/);
  assert.equal(vm.runInContext("Catalog.evidenceFor(Catalog.getDevice('laptop-ultra-biz'),'resolution')", context), null);
  assert.equal(vm.runInContext("Catalog.installEvidence('wrong-version', {})", context), false);
  assert.equal(vm.runInContext('Catalog.installEvidence(SURFACE_DATA.evidenceVersion, {})', context), false);
  assert.equal(vm.runInContext('SURFACE_DATA.evidenceDeferred', context), true, 'failed hydration must be atomic');
  vm.runInContext(fs.readFileSync(path.join(dir, 'js', delivery.evidenceAsset), 'utf8'), context);
  assert.equal(vm.runInContext('Catalog.pendingEvidenceAsset()', context), null);
  assert.match(vm.runInContext("Catalog.evidenceFor(Catalog.getDevice('laptop-ultra-biz'),'resolution').value", context), /3270/);
  assert.equal(fs.readFileSync('js/surface-data.js', 'utf8'), original, 'online split must not change canonical/offline database');
  console.log('Evidence delivery PASS: smaller core, complete hydration, wrong/partial version rejected, canonical data preserved');
} finally {
  fs.rmSync(dir, {recursive: true, force: true});
}
