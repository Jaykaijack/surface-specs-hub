// Evidence gaps are not proof that a manufacturer failed to disclose a value.
const fs=require('node:fs');
const data=require('../../js/surface-data');
const registry=require('../../docs/full-library-verification-registry.json');
const access=require('../../docs/evidence/source-access-20261009.json').sources;
const rows=registry.entries.filter(e=>e.verdict!=='VERIFIED').map(e=>{
 const d=data.devices.find(d=>d.id===e.deviceId),conflict=(d.dataConflicts||[]).find(c=>c.field===e.field);
 const urls=[...new Set([d.specs.officialDocUrl,d.learnDocUrl].filter(Boolean))];
 let needed='同型号、地区、配置的官方规格段落，明确支持该字段当前值；来源链接本身不够';
 if(e.value==='not_disclosed')needed='当前“官方未披露”来自旧记录，须核对完整适用官方资料；查不到或抓取失败不能证明未披露';
 if(e.value==='not_applicable')needed='证明该功能在该配置不适用的官方限制说明；不能只凭产品类别推断';
 if(e.value===null)needed='当前没有数值断言；需要官方明确数值后再录入，不从相邻型号推断';
 if(e.field==='colors')needed='官方颜色名称及适用SKU；颜色图还需独立原图来源与像素比对，十六进制色块不是实物颜色认证';
 if(['releaseDate','status','startingPriceCny'].includes(e.field))needed='带观察日期的地区销售/发布/价格证据，明确容量和配置；不得把预售/翻新/全球发售混用';
 if(e.field==='lastVerified')needed='历史记录日期仅作历史元数据，不是当前字段核验日期';
 return {deviceId:e.deviceId,field:e.field,valueHash:e.valueHash,state:conflict?'CONFIGURATION_CONFLICT':'NOT_REVIEWED_FIELD',sourceReviewRef:'full-model-source-review-20261009.json#'+e.deviceId,reason:conflict?conflict.reason:needed,candidateSources:urls.map(url=>({url,rawCaptureStatus:access.find(s=>s.url===url)?.status||'NOT_ATTEMPTED'})),requiredEvidence:needed};
});
fs.writeFileSync('docs/evidence/remaining-field-gaps-20261009.json',JSON.stringify({notice:'逐字段待办与材料缺口；不是已逐项完成事实认证。原文捕获失败不代表网页不存在，部分web文字仍可读取；未把待办伪装成已核验。',generatedAt:new Date().toISOString(),total:registry.entries.length,verified:registry.entries.length-rows.length,remaining:rows.length,entries:rows},null,2)+'\n');
console.log(rows.length+' unresolved field bindings mapped to source access and required evidence');
