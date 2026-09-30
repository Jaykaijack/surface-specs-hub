#!/usr/bin/env node
// Downloads only assets explicitly present in captured official sources.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const dir = path.join(root, 'releases/verification-20260930-batch03');
const selections = [
  { source: 'pro1-blog', id: 'pro-1', kind: 'photo',
    linked: 'http://blogs.windows.com/devices/wp-content/uploads/sites/43/2013/02/SurfacePro_5F00_48CAE52C.jpg',
    file: 'surface-pro-1-official-2013.jpg' },
  { source: 'pro2-support', id: 'pro-2', kind: 'diagram',
    alt: 'Surface Pro 2 具有正面功能', file: 'surface-pro-2-official-diagram.png' },
  { source: 'pro7-support', id: 'pro-7-plus', kind: 'diagram',
    alt: 'Surface Pro 7+ 设备的正面，带有表示硬件功能的数字。',
    file: 'surface-pro-7-plus-official-diagram.png' },
  { source: 'go3-support', id: 'go-3-biz', kind: 'diagram',
    alt: '标识了硬件功能的 Surface Go 3。', file: 'surface-go-3-official-diagram.png' },
];

async function main() {
  const thumbnailOnly = process.argv.includes('--pro1-thumbnail');
  const out = path.join(dir, thumbnailOnly ? 'image-source-ledger-pro1-thumbnail.json' : 'image-source-ledger.json');
  assert(!fs.existsSync(out), 'Choose a new batch before rerunning this immutable capture');
  const results = [];
  const choices = thumbnailOnly ? [{
    source: 'pro1-blog', id: 'pro-1', kind: 'photo', alt: 'SurfacePro',
    file: 'surface-pro-1-official-2013-thumb.jpg'
  }] : selections;
  for (const choice of choices) {
    const sourceFile = `releases/verification-20260930-batch03/evidence/${choice.source}.json`;
    const source = JSON.parse(fs.readFileSync(path.join(root, sourceFile)));
    assert.equal(source.httpStatus, 200);
    let raw;
    if (choice.linked) {
      assert(source.links.includes(choice.linked), 'Asset link missing in official article');
      raw = choice.linked.replace(/^http:/, 'https:');
    } else {
      const image = source.images.find(i => i.alt === choice.alt);
      assert(image, 'Model-bound official diagram missing');
      raw = new URL(image.src, source.resolvedUrl).href;
    }
    const allowed = ['blogs.windows.com', 'support.microsoft.com', 'winblogs.thesourcemediaassets.com'];
    assert(allowed.includes(new URL(raw).hostname));
    const response = await fetch(raw, { signal: AbortSignal.timeout(30000) });
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.startsWith('image/')) {
      results.push({ deviceId: choice.id, kind: choice.kind, sourceFile,
        pageUrl: source.resolvedUrl, requestedAssetUrl: raw,
        verdict: 'PENDING_ASSET_FETCH', status: response.status, contentType });
      continue;
    }
    assert(allowed.includes(new URL(response.url).hostname), 'Unexpected asset redirect');
    const buffer = Buffer.from(await response.arrayBuffer());
    const localFile = `assets/products/${choice.file}`;
    fs.writeFileSync(path.join(root, localFile), buffer, { flag: 'wx' });
    results.push({
      deviceId: choice.id, kind: choice.kind, sourceFile, pageUrl: source.resolvedUrl,
      requestedAssetUrl: raw, resolvedAssetUrl: response.url, contentType,
      retrievedAt: new Date().toISOString(), localFile,
      sha256: crypto.createHash('sha256').update(buffer).digest('hex'),
      bytes: buffer.length, modelBinding: choice.alt || source.headings[0],
      verdict: 'SOURCE_BOUND_PENDING_VISUAL_REVIEW',
      colorVerification: choice.kind === 'diagram' ? 'NOT_A_COLOR_PHOTOGRAPH' : 'PENDING',
    });
  }
  fs.writeFileSync(out, JSON.stringify(results, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify(results.map(r => ({ deviceId: r.deviceId, verdict: r.verdict, localFile: r.localFile }))));
}

main().catch(e => { console.error(e.message); process.exitCode = 1; });
