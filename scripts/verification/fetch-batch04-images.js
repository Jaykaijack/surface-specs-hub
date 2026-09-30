// Download only model-bound images named in the Batch04 official Support snapshots.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '../..');
const selections = [
  {
    sourceFile: 'releases/verification-20260930-batch04-book3-go2/evidence/book3-support.json',
    id: 'book-3-biz',
    alt: 'J 1',
    file: 'surface-book-3-official-diagram.png'
  },
  {
    sourceFile: 'releases/verification-20260930-batch04-book3-go2/evidence/go2-support.json',
    id: 'go-2-biz',
    alt: '带编号的 Surface Go 2，标识每项功能。',
    file: 'surface-go-2-official-diagram.png'
  },
  {
    sourceFile: 'releases/verification-20260930-batch04-laptop13-intel/evidence/laptop13-intel-support.json',
    id: 'laptop-13-inch-intel-biz',
    alt: 'Surface Laptop 13 英寸 (第 1 版) ，其硬件功能标记。',
    file: 'surface-laptop-13-official-diagram.png'
  }
];

async function main() {
  const out = [];
  for (const choice of selections) {
    const source = JSON.parse(fs.readFileSync(path.join(root, choice.sourceFile), 'utf8'));
    if (source.httpStatus !== 200) throw new Error(`${choice.id}: source HTTP ${source.httpStatus}`);
    const image = source.images.find(item => item.alt === choice.alt);
    if (!image) throw new Error(`${choice.id}: model-bound image missing`);
    const assetUrl = new URL(image.src, source.resolvedUrl).href;
    const response = await fetch(assetUrl, { signal: AbortSignal.timeout(30000) });
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.startsWith('image/')) {
      throw new Error(`${choice.id}: image HTTP ${response.status} ${contentType}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const localFile = `assets/products/${choice.file}`;
    const abs = path.join(root, localFile);
    if (fs.existsSync(abs)) throw new Error(`${localFile} already exists`);
    fs.writeFileSync(abs, buffer, { flag: 'wx' });
    out.push({
      deviceId: choice.id,
      sourceFile: choice.sourceFile,
      pageUrl: source.resolvedUrl,
      requestedAssetUrl: assetUrl,
      resolvedAssetUrl: response.url,
      contentType,
      retrievedAt: new Date().toISOString(),
      localFile,
      sha256: crypto.createHash('sha256').update(buffer).digest('hex'),
      bytes: buffer.length,
      modelBinding: choice.alt,
      verdict: 'SOURCE_BOUND_PENDING_VISUAL_REVIEW',
      colorVerification: 'NOT_A_COLOR_PHOTOGRAPH'
    });
  }
  const ledger = path.join(root, 'releases/verification-20260930-batch04/image-source-ledger.json');
  if (fs.existsSync(ledger)) throw new Error(`${ledger} already exists`);
  fs.mkdirSync(path.dirname(ledger), { recursive: true });
  fs.writeFileSync(ledger, JSON.stringify(out, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify(out.map(item => ({ deviceId: item.deviceId, localFile: item.localFile }))));
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
