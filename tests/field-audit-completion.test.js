const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
global.SURFACE_DATA=require('../js/surface-data');
const Catalog=require('../js/catalog');
const input=require('../docs/evidence/field-audit-1131-input-20261009.json');
const audit=require('../docs/evidence/field-audit-1131-decisions-20261009.json');
const key=e=>`${e.deviceId}:${e.field}`;
assert.equal(input.items.length,1131);
assert.equal(audit.entries.length,1131);
assert.equal(new Set(audit.entries.map(key)).size,1131);
assert.deepEqual(audit.entries.map(key).sort(),input.items.map(key).sort());
const originals=new Map(input.items.map(e=>[key(e),e]));
for(const e of audit.entries){
 const original=originals.get(key(e));
 assert.deepEqual(e.originalValue,original.originalValue);
 assert.equal(e.originalValueHash,original.originalValueHash);
 assert.ok(e.checkedSources.length&&e.finding&&e.individualFieldReviewCompleted);
 const d=Catalog.getDevice(e.deviceId);
 if(e.result==='UNRESOLVED'){
  assert.equal(Catalog.getSpec(d,e.field),null,key(e)+' must stay masked');
  assert.equal(Catalog.evidenceFor(d,e.field),null,key(e)+' cannot retain old proof');
  assert.ok(d.unverifiedFields.includes(e.field));
 }else{
  assert.equal(e.result,'SUPPORTED_SCOPED');
  assert.deepEqual(Catalog.getSpec(d,e.field),e.supportedValue,key(e));
  const proof=Catalog.evidenceFor(d,e.field);assert.ok(proof,key(e));
  assert.deepEqual(proof.value,e.supportedValue);
  assert.ok(proof.configurationScope&&proof.region&&proof.reviewedAt);
 }
}
// Separate, hand-transcribed anchors guard scope and arithmetic-driving details.
assert.match(Catalog.getSpec(Catalog.getDevice('pro-9-biz'),'securityFeatures'),/Intel.*TCM.*SQ3.*Pluton/);
assert.match(Catalog.getSpec(Catalog.getDevice('pro-11-biz-snap'),'nfc'),/仅.*Wi-Fi/);
assert.equal(Catalog.getSpec(Catalog.getDevice('laptop-7-biz-snap'),'fastCharging'),null);
assert.match(Catalog.getSpec(Catalog.getDevice('laptop-13-inch-intel-biz'),'usbPorts'),/DP 2.1/);
assert.match(Catalog.getSpec(Catalog.getDevice('sls-2-biz'),'charger'),/Iris Xe.*102 W.*NVIDIA.*120 W/);
for(const placeholder of ['not_applicable','not_disclosed'])assert.match(Catalog.presentSpec(placeholder),/未知.*待核验/);
const images=require('../docs/evidence/image-source-correspondence-20261009.json').records;
assert.equal(images.length,require('../docs/evidence/image-verification-20261009.json').records.length);
for(const e of images){assert.equal(e.pixelComparison,'NOT_CERTIFIED');assert.equal(crypto.createHash('sha256').update(fs.readFileSync(e.path)).digest('hex'),e.sha256);}
console.log('Field audit completion PASS: 1131 unique frozen inputs, scoped values or explicitly masked gaps, image references not promoted to certification');
