// Online delivery only. The canonical database and offline snapshot stay complete.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

module.exports = function splitRuntimeEvidence(out) {
  const target = path.join(out, 'js/surface-data.js');
  const raw = fs.readFileSync(target, 'utf8');
  const start = raw.indexOf('{');
  const end = raw.indexOf('\n};') + 2;
  if (start < 0 || end < start) throw new Error('Cannot locate canonical data object');
  const data = JSON.parse(raw.slice(start, end));
  const evidence = {};
  for (const device of data.devices) {
    evidence[device.id] = device.specEvidence || {};
    delete device.specEvidence;
  }
  const payload = JSON.stringify(evidence);
  const version = crypto.createHash('sha256').update(payload).digest('hex');
  const filename = `field-evidence.${version.slice(0, 12)}.js`;
  data.evidenceDeferred = true;
  data.evidenceVersion = version;
  data.evidenceAsset = './js/' + filename;
  const core = raw.slice(0, start) + JSON.stringify(data) + raw.slice(end);
  const chunk = `if (!Catalog.installEvidence(${JSON.stringify(version)},${payload})) throw new Error('Evidence version mismatch');\n`;
  fs.writeFileSync(target, core);
  fs.writeFileSync(path.join(out, 'js', filename), chunk);
  return {fullBytes: Buffer.byteLength(raw), initialBytes: Buffer.byteLength(core), deferredBytes: Buffer.byteLength(chunk), evidenceAsset: filename};
};
