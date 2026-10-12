const assert=require('node:assert/strict');
require('./public-regression.test');
require('./evidence-delivery.test');
require('./standalone-release.test');
const C=global.Catalog,T=global.ToolsEngine,E=global.ComparisonEngine;
const checks=[];
const ok=(name,condition,value)=>checks.push({name,pass:!!condition,value});
const clone=d=>JSON.parse(JSON.stringify(d));
let d=C.getDevice('pro-7'),f=clone(d);
ok('source binds real field before mutation',!!C.evidenceFor(f,'cpuModel'));
f.specs.cpuModel='deliberately changed';ok('changed current value expires source',C.evidenceFor(f,'cpuModel')===null);
f=clone(d);f.id='different-sku';ok('different hardware id expires source',C.evidenceFor(f,'cpuModel')===null);
f=clone(d);f.evidenceSources=[];f.specs.officialDocUrl='https://example.invalid/';ok('removed permitted source expires source',C.evidenceFor(f,'cpuModel')===null);
f=clone(d);f.specEvidence.cpuModel.sourceUrl='http://support.microsoft.com/example';f.evidenceSources=[f.specEvidence.cpuModel.sourceUrl];ok('HTTP source cannot certify',C.evidenceFor(f,'cpuModel')===null);
ok('global source visibly qualified',/海外\/全球来源，非国行认证/.test(C.evidenceMarkup(d,'cpuModel')));
ok('unproven NPU is not ranked',C.deviceNpuScore({id:'unknown',specs:{npuTops:'80 TOPS'}})===null);
ok('chip missing precision proof is not ranked',C.chipNpuScore({id:'unknown',npuTops:80})===null);
ok('unknown is not false or zero',C.getSpec({specs:{penSupport:null}},'penSupport')===null);
ok('conflict masks canonical and alias values',C.getSpec({specs:{batteryCapacityWh:'47 Wh',batteryWh:'53 Wh'},dataConflicts:[{field:'batteryCapacityWh'}]},'batteryCapacityWh')===null);
ok('invalid alias cannot certify canonical',C.getSpec({specs:{batteryWh:'wrong'},unverifiedFields:['batteryWh']},'batteryCapacityWh')===undefined);
for(const val of ['最大9.56 kg','起重522g','i5：1534g；i7：1642g','1.2–1.4kg'])ok('mass bound/range does not become exact '+val,T.parseMass(val)===null);
for(const id of ['laptop-7-biz-intel','laptop-7-biz-snap']){
 const p=C.getDevice(id);ok('dated catalog price not launch budget '+id,T.guidePriceYuan(p)===null);ok('historical first price remains unknown '+id,C.getSpec(p,'startingPriceCny')===null);
}
const npu=clone(C.getDevice('pro-12-13'));if(npu.specEvidence.npuTops){npu.specEvidence.npuTops.precision='FP16';ok('NPU scoring rejects wrong precision',C.deviceNpuScore(npu)===null);}
const testPrice={id:'price',specs:{startingPriceCny:'8999元',officialDocUrl:'https://www.microsoftstore.com.cn/fixture'},specEvidence:{startingPriceCny:{configuration:'price',value:'8999元',sourceUrl:'https://www.microsoftstore.com.cn/fixture',region:'CN',reviewedAt:'2026-10-09'}}};
ok('positive price fixture ranks',T.guidePriceYuan(testPrice)===8999);testPrice.specs.startingPriceCny='7999元';ok('changed price no longer drives recommendations',T.guidePriceYuan(testPrice)===null);
const A=global.App,X=require('../js/xbox-lineup'),priceController=clone(X.controllers.find(x=>x.id==='series-starfield'));
ok('confirmed historical controller price remains visible',/79\.99/.test(A.controllerSpec(priceController,'msrp')));
priceController.msrp='¥999 / $9.99';ok('changed controller price loses its source',A.controllerSpec(priceController,'msrp')===null);
const unknownController={id:'unknown',msrp:'¥999',salesRegion:'cn_official'};ok('unbound controller price and China claim are unknown',A.controllerSpec(unknownController,'msrp')===null&&A.controllerSpec(unknownController,'salesRegion')===null);
const accessory=clone(X.accessories.find(a=>a.id==='xbox-complete-component-pack'));ok('known China directory snapshot price remains visible',/2026-10-11.*419/.test(A.xboxAccessoryPrice(accessory)));accessory.price='¥999';ok('changed accessory price loses its source',/^待核/.test(A.xboxAccessoryPrice(accessory)));
const guide=T.renderSmartGuide();ok('architecture label does not certify 80 TOPS',!guide.includes('超长续航/80 TOPS AI'));ok('functional qualification remains explicit',guide.includes('内存、系统和地区条件'));

assert.deepEqual(checks.filter(x=>!x.pass),[]);console.log(`Independent code contracts PASS: ${checks.length}; not a fact certification.`);
