const assert = require('node:assert/strict');
const fs = require('node:fs');
const {matches, provenance, INPUTS} = require('../scripts/deploy/prepare-standalone');
const expected = Object.fromEntries(INPUTS.map((file,i) => [file, String(i).padStart(64,'0')]));
const meta = {gitSha:'a'.repeat(40),fullFactCertification:false,files:{...expected}};
assert.ok(matches(provenance(`<script type="application/json" id="build-provenance">${JSON.stringify(meta)}</script>`),expected));
assert.equal(matches(provenance('<html>旧根目录离线包，无来源版本</html>'),expected),false);
for (const field of ['js/surface-data.js','js/app.js','css/fluent-tokens.css','docs/full-library-verification-registry.json']) {
 const changed={...expected,[field]:'new content hash'};
 assert.equal(matches(meta,changed),false,`${field} changed: old snapshot must fail`);
}
assert.equal(matches({...meta,files:{}},expected),false,'incomplete provenance must fail');
assert.equal(matches({...meta,fullFactCertification:true},expected),false);
const deploy=fs.readFileSync('scripts/deploy/deploy-remote.js','utf8');
assert.doesNotMatch(deploy,/const standalonePath|path\.join\(ROOT, ['"]surface-specs-hub-standalone/,'remote deployment cannot separately upload stale root pointer');
assert.match(fs.readFileSync('scripts/deploy/build-site.js','utf8'),/prepareStandalone\(OUT\)/);
console.log('Standalone release regression PASS: old/missing metadata rejected, code/data/CSS/evidence changes expire snapshots, only validated build artifact deployed');
