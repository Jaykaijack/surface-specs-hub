// Portable delivery contracts: reject incomplete chunks before exposing any evidence.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm');
const split=require('../scripts/deploy/split-runtime-evidence'),root=path.resolve(__dirname,'..'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'surface-evidence-'));
try {
 fs.mkdirSync(path.join(dir,'js'));
 const original=fs.readFileSync(path.join(root,'js/surface-data.js'),'utf8');fs.writeFileSync(path.join(dir,'js/surface-data.js'),original);
 const delivery=split(dir);assert.ok(delivery.initialBytes<delivery.fullBytes*.65);
 const context=vm.createContext({URL});vm.runInContext(fs.readFileSync(path.join(dir,'js/surface-data.js'),'utf8'),context);vm.runInContext(fs.readFileSync(path.join(root,'js/catalog.js'),'utf8'),context);
 assert.equal(vm.runInContext('Catalog.listDevices().length',context),90);
 assert.equal(vm.runInContext("Catalog.evidenceFor(Catalog.getDevice('pro-7'),'cpuModel')",context),null);
 assert.equal(vm.runInContext("Catalog.installEvidence('wrong-version', {})",context),false);
 const chunk=fs.readFileSync(path.join(dir,'js',delivery.evidenceAsset),'utf8');let payload,version;
 vm.runInNewContext(chunk,{Catalog:{installEvidence:(v,p)=>{version=v;payload=p;return true;}}});
 const partial=JSON.parse(JSON.stringify(payload));delete partial['pro-7'];context.partial=partial;context.version=version;
 assert.equal(vm.runInContext('Catalog.installEvidence(version,partial)',context),false);
 assert.equal(vm.runInContext('SURFACE_DATA.evidenceDeferred',context),true);
 assert.equal(vm.runInContext('SURFACE_DATA.devices.some(d=>d.specEvidence!==undefined)',context),false,'failed hydration stays atomic');
 vm.runInContext(chunk,context);assert.equal(vm.runInContext('Catalog.pendingEvidenceAsset()',context),null);
 assert.match(vm.runInContext("Catalog.evidenceFor(Catalog.getDevice('pro-7'),'cpuModel').value",context),/i3-1005G1/);
 assert.equal(fs.readFileSync(path.join(root,'js/surface-data.js'),'utf8'),original);
 console.log('Evidence delivery PASS: wrong/partial chunks rejected atomically, full hydration, canonical data unchanged.');
} finally { fs.rmSync(dir,{recursive:true,force:true}); }
