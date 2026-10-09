const assert = require('node:assert/strict');
const fs = require('fs');
const crypto = require('crypto');
global.SURFACE_DATA = require('../js/surface-data');
global.Catalog = require('../js/catalog');
global.ComparisonEngine = require('../js/comparison-engine');
global.ToolsEngine = require('../js/tools-engine');
const App = require('../js/app');
const t = ToolsEngine;
for(const value of ['1.22 千克','1.22 kg','1220 g','1220 克',{value:1.22,unit:'kg'}]) assert.equal(t.parseMass(value),1220);
for(const value of [null,'not_disclosed','not_applicable','1.2–1.4 kg','约 895 g / 900 g','895',{value:-1,unit:'g'}]) assert.equal(t.parseMass(value),null);
assert.equal(t.sumMass([1220,120,14,82]),1436);
assert.equal(t.sumMass([1220,null]),null);
assert.equal(t.sumMass([null,0]),null);
t.weightDeviceId='laptop-13-inch';t.weightWithKeyboard=false;t.weightWithPen=false;t.weightWithMouse=false;t.weightCharger='none';
assert.match(t.renderWeightCalculator(),/待确认配置/,'未绑定的消费者旧重量不能用于计算');
t.weightDeviceId='laptop-13-inch-biz';assert.match(t.renderWeightCalculator(),/>1220 </);
t.weightWithPen=true;assert.match(t.renderWeightCalculator(),/待确认配置/);
assert.doesNotMatch(t.renderWeightCalculator(),/0\.68|真实办公续航估算/);
t.upgradeOldId='pro-7';t.upgradeNewId='pro-7';
assert.match(t.renderUpgradeAdvisor(),/同一设备，无升级差异/);
assert.doesNotMatch(t.renderUpgradeAdvisor(),/Slim Pen 2 纸感震动马达/);
const device = Catalog.getDevice('pro-7');const saved=device.specs.refreshRate;delete device.specs.refreshRate;
assert.doesNotMatch(t.renderUpgradeAdvisor(),/120Hz/);device.specs.refreshRate=saved;
const d = v => ({specs:{weightGrams:v}});
assert.equal(ComparisonEngine.checkFieldDiff([d('1.22 千克'),d('1220 g')],'weight'),false);
assert.equal(ComparisonEngine.checkFieldDiff([d(null),d('1220 g')],'weight'),false,'未知不能推断为差异');
assert.equal(Catalog.npuScore('1 petaflop FP4'),null);
assert.equal(t.chipNpuScore({name:'RTX Spark',npuTops:1000,highlights:'1 petaflop FP4'}),null);
assert.equal(Catalog.npuScore({value:1000,scope:'platform',precision:'FP4',unit:'TOPS'}),null);
assert.equal(Catalog.npuScore({value:45,scope:'npu',precision:'INT8',unit:'TOPS'}),45);
assert.equal(t.getCompatStatus('flex-keyboard','no-such-device').status,'UNKNOWN');
const modal={innerHTML:'',style:{}};global.document={getElementById:()=>modal};
App.handleGlobalSearch('<img src=x onerror=alert(1)>');
assert.doesNotMatch(modal.innerHTML,/<img src=x/);assert.match(modal.innerHTML,/&lt;img/);
App.handleGlobalSearch('Pro 11');assert.match(modal.innerHTML,/pro-11-13/);
for(const budget of ['budget_entry','budget_mid','budget_high','budget_pro']) {
 t.onGuideFilterChange('budget',budget); assert.equal(t.guideBudget,budget);
 for(const dev of t.matchRecommendedDevices().matches) assert.ok(t.guidePassesFilters(dev));
}
const registry=JSON.parse(fs.readFileSync('docs/full-library-verification-registry.json'));
const fields=SURFACE_DATA.devices.flatMap(d=>Object.entries(d.specs).map(([field,value])=>({d,field,value})));
assert.equal(registry.entries.length,fields.length);
for(const {d,field,value} of fields){const e=registry.entries.find(e=>e.deviceId===d.id&&e.field===field);assert.ok(e);assert.equal(e.valueHash,crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex'));assert.equal(e.region,e.verdict === 'VERIFIED' ? e.region : d.specs.salesRegion || (d.categoryId === 'xbox' ? 'UNKNOWN' : 'CN'));assert.equal(e.configuration,d.id);if(e.verdict==='VERIFIED'){assert.ok(['CN','GLOBAL'].includes(e.region));assert.ok(e.reviewedAt&&e.sourceUrl);assert.ok(e.sourceUrl===d.specs.officialDocUrl||(d.evidenceSources||[]).includes(e.sourceUrl));assert.ok(!(d.unverifiedFields || []).includes(field))}}
assert.equal(require('../js/verification-status').resolve('pro-12-13-intel').status,'pending');
const evidence=require('../docs/evidence/ultra-business-cn-20261009.json');
assert.equal(evidence.region,'CN');assert.equal(evidence.consumerOrOtherRegionApplicable,false);assert.equal(evidence.values.batteryCapacityWh.minimum,89);assert.equal(evidence.values.npuInt8Tops,null);
assert.doesNotMatch(t.renderStorageGuide(),/100%|BYPASSNRO|10秒内无损/);
console.log('Review regression: mass arithmetic / unknowns / same-device / units / NPU scope / compatibility / XSS / search / budgets / all field hashes PASS');
const {correctUltraBusiness}=require('../scripts/verification/ultra-business-correction');
const consumer={id:'consumer-fixture',isCommercial:false,specs:{resolution:'unchanged'}};
const overseas={id:'overseas-fixture',isCommercial:true,specs:{officialDocUrl:'https://www.microsoft.com/en-us/surface',warranty:'unchanged'}};
const cn={id:'cn-fixture',isCommercial:true,specs:{officialDocUrl:evidence.sourceUrl,weight:'wrong'}};
const fixture={devices:[consumer,overseas,cn]};const corrected=correctUltraBusiness(fixture);
assert.deepEqual(corrected.dataset.devices[0],consumer);assert.deepEqual(corrected.dataset.devices[1],overseas);
assert.equal(corrected.dataset.devices[2].specs.resolution,'3270 × 2180');
assert.equal(corrected.dataset.devices[2].specs.weight,'2.0 kg');assert.equal(cn.specs.weight,'wrong');
assert.equal(corrected.dataset.devices[2].availability.shippingStarts,'2026-10-16');
assert.throws(()=>correctUltraBusiness({devices:[]}),/唯一/);
assert.throws(()=>correctUltraBusiness({devices:[cn,cn]}),/唯一/);
console.log('Ultra correction fixture PASS: exact China business source, consumer/other region preserved, no guessed IDs');
const ultra=Catalog.getDevice('laptop-ultra-biz');const ultraConsumer=Catalog.getDevice('laptop-ultra');
assert.equal(SURFACE_DATA.devices.length,90);
assert.equal(Catalog.getSpec(ultra,'resolution'),'3270 × 2180');
assert.equal(Catalog.getSpec(ultra,'weight'),'2.0 kg');
assert.equal(Catalog.getSpec(ultra,'npuTops'),null);
assert.match(Catalog.getSpec(ultra,'batteryCapacityWh'),/92.*89/);
assert.match(Catalog.getSpec(ultra,'dimensionsMm'),/328.8.*238.7.*17.99.*19.16/);
assert.match(Catalog.getSpec(ultra,'ramSpec'),/24 GB/);
assert.match(Catalog.getSpec(ultra,'storageOptions'),/512 GB 第 4 代.*1 TB.*2 TB 第 5 代/);
assert.match(Catalog.getSpec(ultra,'warranty'),/3 年/);
assert.equal(ultra.status,'upcoming');assert.equal(ultra.availability.shippingStarts,'2026-10-16');
assert.equal(Catalog.getSpec(ultra,'repairabilityScore'),null);
assert.match(Catalog.getSpec(ultra,'cpuArch'),/Arm/);
assert.doesNotMatch(Catalog.getSpec(ultra,'cpuArch'),/3nm/);
assert.equal(Catalog.getSpec(ultraConsumer,'resolution'),null);
assert.equal(ultraConsumer.specs.resolution,require('../docs/evidence/production-20261009/ultra-input.json').devices[1].specs.resolution);
assert.equal(Catalog.getSpec(ultraConsumer,'warranty'),null);
assert.equal(Catalog.getSpec(ultraConsumer,'npuTops'),null);
for(const acc of Catalog.accessories())assert.equal(t.getCompatStatus(acc.id,ultra.id).status,acc.category==='pen'?'UNSUPPORTED':'UNKNOWN');
console.log('Real Ultra import PASS: 90 records, China-business facts corrected, consumer raw values retained but not asserted, unknown configuration compatibility');

assert.equal(ComparisonEngine.checkFieldDiff([{specs:{resolution:'3270 x 2180 (262 PPI)'}},{specs:{resolution:'3270 × 2180'}}],'resolution'),false);
assert.equal(ComparisonEngine.checkFieldDiff([{specs:{aspectRatio:'3:2 黄金生产力比例'}},{specs:{aspectRatio:'3:2'}}],'aspectRatio'),false);
// Full-report and upstream reconciliation regressions.
assert.equal(new Set(SURFACE_DATA.devices.map(d=>d.id)).size,90);
assert.equal(new Set(SURFACE_DATA.chips.map(d=>d.id)).size,SURFACE_DATA.chips.length);
assert.equal(t.parseMass('1 lb'),453.59237);
for (const term of ['pro11','Pro 11','Pro 第11代','Pro 第十一版']) { App.handleGlobalSearch(term); assert.match(modal.innerHTML,/pro-11-13/); }
for (const bad of [{devices:[{id:'x',status:'invented'}]},{devices:[{id:'x',officialDocUrl:'javascript:alert(1)'}]},{devices:{}},{devices:[{id:'x',specs:[]}]},{devices:[{id:'x'},{id:'x'}]},{devices:[{id:'x',name:'<img src=x onerror=alert(1)>'}]}]) {
 const before=Catalog.getSnapshot(); assert.equal(Catalog.applySnapshot(bad),false); assert.equal(Catalog.getSnapshot(),before);
}
const {updateUltra}=require('../scripts/update-surface-laptop-ultra');
const updated=updateUltra(SURFACE_DATA);
assert.deepEqual(updated.devices.find(d=>d.id==='laptop-ultra'),JSON.parse(JSON.stringify(ultraConsumer)));
assert.equal(updated.devices.find(d=>d.id==='laptop-ultra-biz').specs.resolution,'3270 × 2180');
assert.equal(updated.chips.find(c=>c.id==='nvidia-rtx-spark-n1x').npuTops,null);
assert.deepEqual(updateUltra(updated),updated,'scoped updater must be idempotent');
const images=require('../docs/evidence/image-verification-20261009.json');
for(const row of images.records) {
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(row.path)).digest('hex'),row.sha256,'image evidence invalidated when pixels change');
 if(row.status==='BLOCKED') {
  const shot=Catalog.portrait(Catalog.getDevice(row.deviceId),row.color);
  assert.equal(shot.identity,'blocked'); assert.match(shot.src,/^data:image\/svg/); assert.doesNotMatch(Catalog.frame(shot),/assets\//);
 }
 for(const child of row.derivatives) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(child.path)).digest('hex'),child.sha256);
}
assert.match(Catalog.portraitLabel(Catalog.portrait(Catalog.getDevice('laptop-8-138'))),/待核验/);
assert.doesNotMatch(fs.readFileSync('css/specs-layout.css','utf8'),/<<<<<<<|>>>>>>>/);
assert.match(fs.readFileSync('css/specs-layout.css','utf8'),/guide-container select/);
console.log('Upstream/report regression PASS: unique IDs, safe updater, search aliases, atomic snapshot rejection, image hashes/blocked rendering/pending state, active narrow-screen CSS');

assert.equal(Catalog.portrait({id:'pro-1',name:'Pro 初代',heroImage:'data:image/png;base64,AAA',specs:{}}).identity,'blocked','inline build must preserve mapping block');

const scoped=require('../docs/evidence/review-batch-current-20261009.json');
for(const e of scoped.entries) {
 const d=Catalog.getDevice(e.deviceId), current=Catalog.getSpec(d,e.field);
 if(JSON.stringify(current)===JSON.stringify(e.value)) assert.deepEqual(current,e.value);
 else if ((d.dataConflicts || []).some(c=>c.field===e.field)) {
  assert.equal(current,null);assert.equal(Catalog.evidenceFor(d,e.field),null);
 } else {
  const replacement=require('../docs/evidence/full-model-source-review-20261009.json').entries.find(n=>n.deviceId===e.deviceId&&n.field===e.field);
  assert.ok(replacement, '旧核验改变后必须有新的字段证据');
  assert.deepEqual(current,replacement.value);
  assert.deepEqual(Catalog.evidenceFor(d,e.field).value,current);
  assert.notDeepEqual(current,e.value, '旧值不得继续为新值背书');
 }
}
for(const e of scoped.compatibility)assert.equal(t.getCompatStatus(e.accessoryId,e.deviceId).status,e.status);
assert.equal(Catalog.getSpec(Catalog.getDevice('pro-12-13-snap'),'batteryCapacityWh'),null);
assert.doesNotMatch(Catalog.getSpec(Catalog.getDevice('laptop-8-150-snap'),'usbPorts'),/MicroSD/);
assert.equal(Catalog.portrait(Catalog.getDevice('duo-2'),'冰川白').identity,'blocked');
console.log('Current-lineup source batch and explicit conflicts PASS');

for(const source of scoped.sourceExtracts)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source.path)).digest('hex'),source.sha256);
const gaps=require('../docs/evidence/remaining-field-gaps-20261009.json');assert.equal(gaps.remaining,registry.entries.filter(e=>e.verdict!=='VERIFIED').length);assert.equal(gaps.total,registry.entries.length);
const inventory=require('../docs/evidence/product-review-inventory-20261009.json');
assert.equal(inventory.records.length,Catalog.listDevices().length);
assert.equal(inventory.verified,registry.entries.filter(e=>e.verdict==='VERIFIED').length);
assert.equal(inventory.pending,gaps.remaining);
assert.equal(t.parseMass(Catalog.getSpec(Catalog.getDevice('pro-1'),'weight')),null,'less-than bound is not an exact mass');
assert.equal(t.parseMass(Catalog.getSpec(Catalog.getDevice('pro-2'),'weight')),907.18474);
for(const id of ['pro-1','pro-2'])assert.doesNotMatch(Catalog.getSpec(Catalog.getDevice(id),'chargingPower'),/最低|1536/);
const family=require('../docs/evidence/ultra-global-product-scope-20261009.json');
assert.equal(family.status,'PRODUCT_FAMILY_EVIDENCE_ONLY_NOT_CN_SKU_VERIFICATION');
assert.match(Catalog.getDevice('laptop-ultra').productFamilyEvidence.scope,/不能确认中国/);
assert.equal(registry.entries.filter(e=>e.deviceId==='laptop-ultra'&&e.verdict==='VERIFIED').length,0);
assert.doesNotMatch(Catalog.presentSpec('not_disclosed'),/从未对外正式披露/);
for(const id of ['pro-12-13-intel','laptop-8-138','laptop-8-150','laptop-8-138-intel','laptop-8-138-snap','laptop-8-150-intel','laptop-8-150-snap'])assert.equal(Catalog.getSpec(Catalog.getDevice(id),'cpuArch'),null,'unconfirmed process/core architecture must not be shown as verified');
assert.match(Catalog.getSpec(Catalog.getDevice('pro-12-13-intel'),'trackpadType'),/键盘另售/);

const accessoryImages=require('../docs/evidence/accessory-and-ultra-images-20261009.json');
for(const row of [...accessoryImages.accessories,...accessoryImages.ultraAssets])assert.equal(crypto.createHash('sha256').update(fs.readFileSync(row.path)).digest('hex'),row.sha256);
for(const acc of Catalog.accessories()){assert.equal(Catalog.accessoryPortrait(acc).identity,'pending');assert.match(Catalog.frame(Catalog.accessoryPortrait(acc)),/配件型号与视角待核验/);}

const accessoryView={innerHTML:""};
App.renderSurfaceAccessoriesView(accessoryView,"all");
assert.doesNotMatch(accessoryView.innerHTML,/官方认证全量|零杜撰参数|完美支持/);
const claimedIds=[...accessoryView.innerHTML.matchAll(/App.navigateToDetail\('', '([^']+)'\)/g)].map(m=>m[1]);
for(const id of claimedIds)assert.ok(Catalog.accessories().some(a=>t.getCompatStatus(a.id,id).status==="FULL"));

// Current-value certification must expire when the value or its allowed source changes.
const fullReview=require('../docs/evidence/full-model-source-review-20261009.json');
assert.equal(new Set(fullReview.attempts.map(a=>a.deviceId)).size,90);
for(const d of Catalog.listDevices()) assert.ok(fullReview.attempts.some(a=>a.deviceId===d.id));
for(const e of fullReview.entries){const d=Catalog.getDevice(e.deviceId);assert.deepEqual(d.specs[e.field],e.value);assert.ok(!(d.unverifiedFields||[]).includes(e.field));assert.ok(Catalog.evidenceFor(d,e.field));}
const reviewedDevice=Catalog.getDevice('pro-7');
const reviewFixture=JSON.parse(JSON.stringify(reviewedDevice));
assert.match(Catalog.evidenceMarkup(reviewFixture,'cpuModel'),/海外\/全球来源，非国行认证/);
reviewFixture.specs.cpuModel='changed';assert.equal(Catalog.evidenceFor(reviewFixture,'cpuModel'),null);
reviewFixture.specs.cpuModel=reviewedDevice.specs.cpuModel;reviewFixture.evidenceSources=[];reviewFixture.specs.officialDocUrl='https://example.org';assert.equal(Catalog.evidenceFor(reviewFixture,'cpuModel'),null);
for(const bound of ['最大9.56 kg','起重522g','i5：1534g；i7：1642g','1.2–1.4kg'])assert.equal(t.parseMass(bound),null);
assert.equal(Catalog.getSpec(Catalog.getDevice('book-3-15'),'cpuModel'),null);
assert.equal(Catalog.getSpec(Catalog.getDevice('laptop-go-3'),'cpuModel'),null);
assert.match(Catalog.getSpec(Catalog.getDevice('pro-12-inch'),'ramSpec'),/12GB/);
const correction=App.createCorrectionDraft('pro-7','resolution','https://support.microsoft.com/test','<img src=x onerror=alert(1)>');
assert.equal(correction.status,'USER_DRAFT_NOT_VERIFIED');assert.equal(correction.currentRawValue,Catalog.getDevice('pro-7').specs.resolution);
assert.throws(()=>App.createCorrectionDraft('pro-7','resolution','javascript:alert(1)','bad'));
assert.throws(()=>App.createCorrectionDraft('pro-7','invented','https://example.org','bad'));
console.log('Full source review PASS: 90 attempted models, scoped value binding expiry, configuration conflicts, safe correction drafts');

const wrongConfig=JSON.parse(JSON.stringify(reviewedDevice));wrongConfig.id='another-sku';assert.equal(Catalog.evidenceFor(wrongConfig,'cpuModel'),null);

// Independently transcribed regression anchors for new, explicitly scoped evidence.
assert.match(Catalog.getSpec(Catalog.getDevice('pro-7-plus'),'ramSpec'), /32GB/);
assert.match(Catalog.getSpec(Catalog.getDevice('pro-7-plus'),'batteryCapacityWh'), /47.4.*45.8/);
assert.match(Catalog.getSpec(Catalog.getDevice('go-2-biz'),'cpuModel'), /菲律宾.*m3/);
assert.match(Catalog.getSpec(Catalog.getDevice('book-3-biz'),'gpuModel'), /RTX.*3000/);
assert.match(Catalog.getSpec(Catalog.getDevice('sls-2'),'usbPorts'), /MicroSDXC/);
assert.match(Catalog.getSpec(Catalog.getDevice('laptop-3'),'ssdRemovable'), /不供用户自行拆卸.*技术人员/);
assert.match(Catalog.evidenceFor(Catalog.getDevice('go-4'),'warranty').configurationScope, /翻新版/);
for(const source of fullReview.fieldReviewExtracts) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source.path)).digest('hex'),source.sha256);
console.log('Expanded field review PASS: SKU-limited data, service restrictions, preserved source extract hashes');

// An explicit canonical value is not invalidated by an unrelated stale alias.
assert.equal(Catalog.getSpec({specs:{batteryCapacityWh:'47 Wh',batteryWh:'wrong'},unverifiedFields:['batteryWh']},'batteryCapacityWh'),'47 Wh');
assert.equal(Catalog.getSpec({specs:{batteryWh:'wrong'},unverifiedFields:['batteryWh']},'batteryCapacityWh'),undefined);
assert.equal(t.guidePriceYuan(Catalog.getDevice('laptop-13-inch')),null,'unverified historic price must not drive recommendations');
const priceFixture={id:'fixture',specs:{startingPriceCny:'8999元',officialDocUrl:'https://www.microsoftstore.com.cn/fixture'},specEvidence:{startingPriceCny:{configuration:'fixture',value:'8999元',sourceUrl:'https://www.microsoftstore.com.cn/fixture',region:'CN',reviewedAt:'2026-10-09'}}};
assert.equal(t.guidePriceYuan(priceFixture),8999);
priceFixture.specs.startingPriceCny='7999元';assert.equal(t.guidePriceYuan(priceFixture),null,'changed price expires old evidence');
assert.match(Catalog.getSpec(Catalog.getDevice('pro-11-biz-intel'),'batteryCapacityWh'), /额定47 Wh；最小46 Wh/);
assert.doesNotMatch(Catalog.getSpec(Catalog.getDevice('pro-11-biz-intel'),'batteryCapacityWh'), /53/);
assert.match(Catalog.getSpec(Catalog.getDevice('laptop-go-2'),'headphoneJack'), /尺寸待核验/);
for (const d of Catalog.listDevices().filter(d=>d.id.startsWith('xbox-series-s'))) {
  assert.equal(Catalog.getSpec(d,'cpuCores'),null,'conflicting CPU clocks must not leak through an alias');
}
console.log('Scoped corrections PASS: Intel battery, uncertain jack size, conflicting Series S clocks');

assert.equal(Catalog.getSpec(Catalog.getDevice('laptop-13-inch-intel-biz'),'ramSpec'),null);
assert.equal(Catalog.confirmedSpec({specs:{npuTops:'80 TOPS'}},'npuTops'),null);
assert.equal(t.chipNpuScore({id:'unverified',npuTops:80}),null);
assert.match(ComparisonEngine.getDecisionSummary({specs:{weight:'最低900克',batteryLifeOffice:'12小时'}}).portText,/待核验/);
const certifiedFixture = (id,key,value) => ({id,specs:{[key]:value,officialDocUrl:'https://www.microsoft.com/fixture'},specEvidence:{[key]:{configuration:id,value,sourceUrl:'https://www.microsoft.com/fixture',region:'GLOBAL',reviewedAt:'2026-10-09'}}});
assert.equal(ComparisonEngine.checkFieldDiff([certifiedFixture('a','weight','1.22 千克'),certifiedFixture('b','weight','1220 g')],'weight'),false);
assert.equal(ComparisonEngine.checkFieldDiff([certifiedFixture('a','weight','1.22 千克'),certifiedFixture('b','weight','1300 g')],'weight'),true);
const bounded=certifiedFixture('bounded','weightGrams','轻至879克（不含键盘）');
assert.match(ComparisonEngine.getDecisionSummary(bounded).portText,/轻至879克（不含键盘）/);
for (const d of Catalog.listDevices()) for (const conflict of d.dataConflicts || []) {
 assert.equal(Catalog.getSpec(d,conflict.field),null);
 assert.equal(Catalog.evidenceFor(d,conflict.field),null);
 assert.equal(t.spec(d,conflict.field),null);
 assert.equal(App.spec(d,conflict.field),null);
}
assert.equal(App.spec(Catalog.getDevice('laptop-13-inch'),'weightGrams'),null,'逐项审查未支持的重量必须屏蔽');
assert.equal(Catalog.getSpec({specs:{wifi:'wrong'},dataConflicts:[{field:'wifi'}]},'wireless'),undefined);
console.log('Uncertainty paths PASS: conflicts masked, pending labels, no unverified numeric differences, bounded summaries preserved');
