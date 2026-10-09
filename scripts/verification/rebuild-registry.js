// Snapshot binding is not fact certification. Unreviewed values stay pending.
const fs = require('fs');
const crypto = require('crypto');
const data = require('../../js/surface-data');
const target = 'docs/full-library-verification-registry.json';
const previous = JSON.parse(fs.readFileSync(target, 'utf8'));
const official = [...require('../../docs/evidence/ultra-business-cn-field-ledger.json').entries, ...require('../../docs/evidence/review-batch-current-20261009.json').entries];
const entries = data.devices.flatMap(d => Object.entries(d.specs || {}).map(([field,value]) => {
  const confirmed = official.find(e => e.deviceId === d.id && e.configuration === d.id && e.sourceUrl === d.specs.officialDocUrl && e.field === field && JSON.stringify(e.value) === JSON.stringify(value) && !(d.unverifiedFields || []).includes(field));
  const region = confirmed ? confirmed.region : d.specs.salesRegion || (d.categoryId === 'xbox' ? 'UNKNOWN' : 'CN');
  const hash = crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
  const old = (previous.entries || []).find(e => e.deviceId === d.id && e.field === field);
  const preserved = old && old.valueHash === hash && old.region === region && old.configuration === d.id && old.reviewedAt && old.sourceUrl === d.specs.officialDocUrl && !(d.unverifiedFields || []).includes(field);
  if (confirmed) return {...confirmed, valueHash:hash};
  return {deviceId:d.id, field, value, valueHash:hash, region, configuration:d.id, configurationScope:'设备记录；具体 SKU 适用性未逐项核验',
    reviewedAt: preserved ? old.reviewedAt : null,
    verdict: preserved ? old.verdict : 'PENDING',
    sourceUrl: preserved ? old.sourceUrl : null,
    reason: preserved ? old.reason : '未绑定当前值的逐字段证据；旧来源链接不构成真实性核验'};
}));
fs.writeFileSync(target, JSON.stringify({schemaVersion:2,generatedAt:new Date().toISOString(),datasetVersion:data.datasetVersion,canClaimSafe100Percent:false,scope:`${data.devices.length} devices; ${entries.length} spec fields; snapshot only`,entries},null,2)+'\n');
console.log(`${data.devices.length} devices / ${entries.length} bound fields; verified ${entries.filter(e=>e.verdict==='VERIFIED').length}`);
