// Evidence gaps are not proof that a manufacturer failed to disclose a value.
const fs=require('node:fs');
const data=require('../../js/surface-data');
const registry=require('../../docs/full-library-verification-registry.json');
const access=require('../../docs/evidence/source-access-20261009.json').sources;
const review=require('../../docs/evidence/full-model-source-review-20261009.json');
const metadataFields=new Set(['lastVerified','sourceReliability','officialDocUrl','officialConfigureUrl','officialCommercialConfigureUrl','targetAudience','tagline','generation']);
const rows=registry.entries.filter(e=>e.verdict!=='VERIFIED').map(e=>{
 const d=data.devices.find(d=>d.id===e.deviceId),conflict=(d.dataConflicts||[]).find(c=>c.field===e.field);
 const urls=[...new Set([d.specs.officialDocUrl,d.learnDocUrl,...(d.evidenceSources||[])].filter(Boolean))];
 const passes=(review.fieldReviewPasses||[]).filter(p=>p.deviceId===d.id);
 const attempts=review.attempts.filter(a=>a.deviceId===d.id);
 let state=passes.length?'UNRESOLVED_AFTER_EXTRACT_REVIEW':'NOT_REVIEWED_FIELD';
 if(!passes.length && attempts.some(a=>a.result==='SOURCE_SCOPE_MISMATCH'))state='SOURCE_SCOPE_MISMATCH';
 if(e.value==='not_disclosed'||e.value==='not_applicable')state='LEGACY_PLACEHOLDER_UNCONFIRMED';
 if(e.value===null)state='NO_ASSERTED_VALUE';
 if(metadataFields.has(e.field))state='EDITORIAL_METADATA_NOT_CERTIFIED';
 if(conflict)state='CONFIGURATION_CONFLICT';
 let needed='同型号、地区、配置的官方规格段落，明确支持该字段当前值；来源链接本身不够';
 if(e.value==='not_disclosed')needed='当前“官方未披露”来自旧记录，须核对完整适用官方资料；查不到或抓取失败不能证明未披露';
 if(e.value==='not_applicable')needed='证明该功能在该配置不适用的官方限制说明；不能只凭产品类别推断';
 if(e.value===null)needed='当前没有数值断言；需要官方明确数值后再录入，不从相邻型号推断';
 if(e.field==='colors')needed='官方颜色名称及适用SKU；颜色图还需独立原图来源与像素比对，十六进制色块不是实物颜色认证';
 if(['releaseDate','status','startingPriceCny'].includes(e.field))needed='带观察日期的地区销售/发布/价格证据，明确容量和配置；不得把预售/翻新/全球发售混用';
 if(e.field==='lastVerified')needed='历史记录日期仅作历史元数据，不是当前字段核验日期';
 return {deviceId:e.deviceId,field:e.field,valueHash:e.valueHash,state,sourceReviewRef:'full-model-source-review-20261009.json#'+e.deviceId,reason:conflict?conflict.reason:needed,reviewedExtractRefs:[...new Set(passes.map(p=>p.sourceIndex))],candidateSources:urls.map(url=>({url,rawCaptureStatus:access.find(s=>s.url===url)?.status||'NOT_ATTEMPTED'})),requiredEvidence:needed};
});
fs.writeFileSync('docs/evidence/remaining-field-gaps-20261009.json',JSON.stringify({notice:'逐字段证据缺口；UNRESOLVED_AFTER_EXTRACT_REVIEW只说明已审阅该型号限定摘录但尚不能绑定当前字段，不证明厂家未披露或整页已完整获取。旧占位、编辑元数据、配置冲突和未审阅项分别保留，均不计入真实性认证。',generatedAt:new Date().toISOString(),total:registry.entries.length,verified:registry.entries.length-rows.length,remaining:rows.length,stateCounts:rows.reduce((counts,r)=>(counts[r.state]=(counts[r.state]||0)+1,counts),{}),entries:rows},null,2)+'\n');
console.log(rows.length+' unresolved field bindings mapped to source access and required evidence');
