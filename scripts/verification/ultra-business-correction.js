/** Pure, scoped correction for the live record once recovered. Never creates IDs. */
const evidence = require('../../docs/evidence/ultra-business-cn-20261009.json');
function correctUltraBusiness(dataset) {
  const copy = structuredClone(dataset);
  const matches = copy.devices.filter(d => d.isCommercial === true &&
    (d.specs?.officialDocUrl || d.officialDocUrl) === evidence.sourceUrl);
  if(matches.length !== 1) throw new Error('需要唯一的中国 Ultra 商用现网记录；不创建或猜测设备 ID');
  const d = matches[0];
  const corrections = {
    resolution:'3270 × 2180', ppi:'262 PPI',
    batteryCapacityWh:'额定 92 Wh / 最小 89 Wh',
    dimensionsMm:'328.8 × 238.7 mm；厚度不含脚垫 17.99 mm / 含脚垫 19.16 mm',
    weightGrams:'2.0 kg',
    ramSpec:'24 GB / 32 GB / 48 GB / 64 GB / 128 GB LPDDR5x 统一内存',
    storageOptions:'512 GB 第 4 代 SSD；1 TB / 2 TB 第 5 代 SSD',
    warranty:'自购买凭证（发票）标注时间起，主机 3 年有限硬件保修（中国商用页）',
    npuTops:null
  };
  Object.assign(d.specs, corrections);
  // Alias precedence must not leave the old English/Chinese weight active.
  if(Object.hasOwn(d.specs,'weight')) d.specs.weight = '2.0 kg';
  d.status='upcoming'; if(Object.hasOwn(d.specs,'status'))d.specs.status='upcoming';
  d.availability={phase:'preorder',shippingStarts:'2026-10-16',observedAt:evidence.reviewedAt,region:'CN'};
  const entries = Object.entries(corrections).map(([field,value])=>({deviceId:d.id,field,value,region:'CN',configuration:d.id,reviewedAt:evidence.reviewedAt,sourceUrl:evidence.sourceUrl,verdict:field==='npuTops'?'PENDING':'VERIFIED'}));
  return {dataset:copy,entries};
}
module.exports = {correctUltraBusiness};
