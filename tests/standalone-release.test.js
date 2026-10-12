// Portable expiry contracts use public input names and do not invoke a deployment.
const assert=require('node:assert/strict');
const {matches,provenance,INPUTS}=require('../scripts/deploy/prepare-standalone');
const expected=Object.fromEntries(INPUTS.map((file,i)=>[file,String(i).padStart(64,'0')]));
const meta={gitSha:'a'.repeat(40),dirty:false,fullFactCertification:false,files:{...expected}};
assert.ok(matches(provenance(`<script type="application/json" id="build-provenance">${JSON.stringify(meta)}</script>`),expected));
assert.equal(matches(provenance('<html>Missing provenance</html>'),expected),false);
for(const field of INPUTS){assert.equal(matches(meta,{...expected,[field]:'changed-input-hash'}),false,field+' changed: previous snapshot expires');}
assert.equal(matches({...meta,files:{}},expected),false);
assert.equal(matches({...meta,dirty:true},expected),false);
assert.equal(matches({...meta,fullFactCertification:true},expected),false);
assert.equal(matches({...meta,gitSha:'invalid'},expected),false);
console.log('Standalone release PASS: every public input expires a stale snapshot; absent/dirty/overclaimed provenance rejected.');
