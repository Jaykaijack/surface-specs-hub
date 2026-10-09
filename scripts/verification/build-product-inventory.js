// Inventory distinguishes unread material from an actually unavailable source.
const fs = require('node:fs');
const data = require('../../js/surface-data');
const registry = require('../../docs/full-library-verification-registry.json');
const scoped = require('../../docs/evidence/review-batch-current-20261009.json');
const access = require('../../docs/evidence/source-access-20261009.json');
const full = require('../../docs/evidence/full-model-source-review-20261009.json');
const readable = new Set([...scoped.entries, ...full.entries].map(e => e.sourceUrl));
const devices = data.devices.map(d => {
  const rows = registry.entries.filter(e => e.deviceId === d.id);
  const pending = rows.filter(e => e.verdict !== 'VERIFIED');
  const sources = [...new Set([d.specs.officialDocUrl, d.learnDocUrl, ...(d.evidenceSources || [])].filter(Boolean))].map(url => ({
    url,
    readableEvidenceUsed: rows.some(e => e.verdict === 'VERIFIED' && e.sourceUrl === url),
    rawCaptureStatus: access.sources.find(s => s.url === url)?.status || 'NOT_ATTEMPTED',
    remainingAvailability: readable.has(url) ? 'Existing extract reviewed; remaining fields need additional explicit paragraphs/SKU evidence' : 'No readable extract reviewed in this batch; raw failure does not establish web-tool unavailability'
  }));
  return {deviceId:d.id, name:d.name, total:rows.length, verified:rows.length-pending.length,
    pending:pending.length, pendingFields:pending.map(e => e.field), sources, sourceChecks:full.attempts.filter(a=>a.deviceId===d.id),
    conflicts:d.dataConflicts || [], maskedFields:d.unverifiedFields || [],
    productFamilyEvidence:d.productFamilyEvidence || null};
});
fs.writeFileSync('docs/evidence/product-review-inventory-20261009.json', JSON.stringify({
  notice:'All device records inventoried, not all facts certified. Pending fields remain work items; source access failure is not nondisclosure or proof of incompatibility.',
  devices:devices.length, modelsWithSourceChecks:new Set(full.attempts.map(a=>a.deviceId)).size, total:registry.entries.length,
  verified:registry.entries.filter(e=>e.verdict==='VERIFIED').length,
  pending:registry.entries.filter(e=>e.verdict!=='VERIFIED').length,
  records:devices
},null,2)+'\n');
console.log('Inventoried '+devices.length+' devices without promoting unreviewed values');
