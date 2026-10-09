"""Index saved official image references without certifying local image identity."""
import hashlib,json,pathlib,re
root=pathlib.Path(__file__).resolve().parents[2]
registry=json.loads((root/'docs/evidence/image-verification-20261009.json').read_text())
page_refs={}
for p in sorted((root/'docs/evidence/field-review-extracts-20261009').glob('*.txt')):
 text=p.read_text();m=re.search(r'\((https?://[^\n]+)\)',text.splitlines()[0])
 if not m:continue
 refs=[]
 for line in text.splitlines():
  for ref in re.finditer(r'†Image:?([^†]*)(?:†([^]*))?',line):
   label=ref[1].strip()
   if label:refs.append({'label':label,'host':ref[2],'locator':line.split(':',1)[0]})
 if refs:page_refs[m[1]]={'extract':str(p.relative_to(root)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'visibleImageReferences':refs}
legacy={}
for name in ['found_images.json','more_images.json']:
 for image,page in json.loads((root/'scripts'/name).read_text()).items():legacy.setdefault(page,[]).append(image)
rows=[]
for r in registry['records']:
 page=r.get('candidateProductSourceUrl');saved=page_refs.get(page)
 row={k:r.get(k) for k in ['deviceId','path','sha256','role','color','angle']}
 row.update(sourcePage=page,localIdentityStatus=r['status'],pixelComparison='NOT_CERTIFIED',sourceCorrespondence=saved or None,priorDiscoveryImageUrls=sorted(set(legacy.get(page,[]))),priorDiscoveryNotice='历史脚本记录，仅作候选，未证明当前页面展示或本地像素相同')
 if r['deviceId']=='laptop-ultra-biz':
  row['currentOfficialCandidate']={'sourcePage':'https://www.microsoftstore.com.cn/surface/surface-laptop-ultra-for-business','imageUrl':'https://cdn.microsoftstore.com.cn/media/catalog/product/cache/ebb942237ce05d210b9907bfdb9fc80f/c/o/configure_338_x9q3z7_1.png','locator':'2026-10-09 page L27 gallery hero link','label':'Surface Laptop Ultra 商用版','method':'readable official gallery link resolved through web tool','identityWithLocalFile':'NOT_CERTIFIED','downloadToExecutionEnvironment':'NOT_ATTEMPTED'}
 row['remaining']='需核对具体配色、尺寸、处理器/地区、视角，并取得原图与本地像素比较；现有页面引用不是图片认证' if saved or row['priorDiscoveryImageUrls'] or row.get('currentOfficialCandidate') else '尚缺该产品页可定位的官方原图引用；本地图片保持待核验'
 rows.append(row)
out={'reviewedAt':'2026-10-09','notice':'逐条为现有图片映射关联现存原文中的图片引用及历史候选URL。没有借文件名或相似外观认证。未重试已知失败URL。', 'records':rows}
(root/'docs/evidence/image-source-correspondence-20261009.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
