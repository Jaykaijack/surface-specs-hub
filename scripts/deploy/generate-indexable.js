const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');
const data = require('../../js/surface-data');
const Catalog = require('../../js/catalog');
const escape = s => String(s ?? '待核验').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
module.exports = function generate(out) {
  const base = 'https://surface.kaibase.cn';
  const urls = [];
  for(const d of data.devices) {
    if(!/^[a-z0-9-]+$/.test(d.id)) throw new Error('Unsafe product ID');
    const url = `${base}/products/${d.id}/`;
    if (d.status !== 'pending') urls.push(url);
    const rows = Object.entries(d.specs || {}).filter(([,v])=>typeof v !== 'object' || v === null).map(([key,val])=> {
      const field = data.specGroups.flatMap(g=>g.fields || []).find(f=>f.key===key);
      const label = field ? (field.label || field.name || key) : key;
      val = Catalog.getSpec(d, key);
      const shown = val === 'not_applicable' ? '不适用' : val === 'not_disclosed' ? '官方未披露（原数据口径）' : val;
      return `<tr><th scope="row">${escape(label)}</th><td>${escape(shown)}</td></tr>`;
    }).join('');
    const dir = path.join(out,'products',d.id);fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,'index.html'),`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${d.status === 'pending' ? '<meta name="robots" content="noindex,follow">' : ''}<title>${escape(d.name)} 参数 | Surface 民间资料库</title><meta name="description" content="${escape(d.name)} 的配置参数及来源索引，非官方资料库，未完成全量真实性核验。"><link rel="canonical" href="${url}"><style>body{font:16px/1.6 system-ui;max-width:960px;margin:auto;padding:24px}table{width:100%;border-collapse:collapse}th,td{text-align:left;border-bottom:1px solid #ccc;padding:10px;overflow-wrap:anywhere}th{width:30%}a{color:#005a9e}</style></head><body><nav><a href="/">资料库首页</a></nav><main><h1>${escape(d.name)}</h1><p>民间非官方 Surface 参数资料库。以下为当前记录，未完成逐字段真实性核验；请核对地区、配置及原始来源。</p><p><a href="/#/surface/${d.categoryId}/${d.id}">打开交互详情与对比</a></p><table><caption>参数记录</caption><tbody>${rows}</tbody></table></main></body></html>`);
  }
  fs.writeFileSync(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
  fs.writeFileSync(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[base+'/',...urls].map(url=>`<url><loc>${url}</loc></url>`).join('')}</urlset>`);
  const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({gitSha:cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),dirty:!!cp.execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim(),datasetVersion:data.datasetVersion,dataSha256:crypto.createHash('sha256').update(JSON.stringify({devices:data.devices,chips:data.chips,accessories:data.accessories})).digest('hex'),evidenceSha256:crypto.createHash('sha256').update(hash('docs/full-library-verification-registry.json') + hash('docs/evidence/ultra-business-cn-20261009.json') + hash('docs/evidence/ultra-business-cn-field-ledger.json') + hash('docs/evidence/image-verification-20261009.json') + hash('docs/evidence/review-batch-current-20261009.json') + hash('docs/evidence/source-access-20261009.json') + hash('docs/evidence/accessory-and-ultra-images-20261009.json') + hash('docs/evidence/ultra-global-product-scope-20261009.json') + hash('docs/evidence/ultra-global-image-sources-20261009.json')).digest('hex'),sourceSha256:crypto.createHash('sha256').update(['index.html',...fs.readdirSync('js').sort().map(f=>'js/'+f),...fs.readdirSync('css').sort().map(f=>'css/'+f)].map(hash).join('')).digest('hex'),builtAt:new Date().toISOString(),deviceCount:data.devices.length,fullFactCertification:false},null,2));
};
