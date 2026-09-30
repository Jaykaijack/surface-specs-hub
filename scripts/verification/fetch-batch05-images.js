// Download only model-bound images named in the Batch05 official Support snapshots.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '../..');
const selections = [
  {
    sourceFile: 'releases/verification-20260930-batch05/evidence/pro6-support.json',
    id: 'pro-6-biz',
    alt: '显示 Surface Pro 6 的屏幕，其有5个按钮和端口，分别用数字表示',
    file: 'surface-pro-6-official-diagram.png'
  },
  {
    sourceFile: 'releases/verification-20260930-batch05/evidence/laptop13-consumer-support.json',
    id: 'laptop-13-inch',
    alt: 'Surface Laptop 13 英寸 (第 1 版) ，其硬件功能标记。',
    file: 'surface-laptop-13-consumer-official-diagram.jpg'
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
  const ledger = path.join(root, 'releases/verification-20260930-batch05/image-source-ledger.json');
  if (fs.existsSync(ledger)) throw new Error(`${ledger} already exists`);
  fs.mkdirSync(path.dirname(ledger), { recursive: true });
  fs.writeFileSync(ledger, JSON.stringify(out, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify(out.map(item => ({ deviceId: item.deviceId, localFile: item.localFile }))));
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
