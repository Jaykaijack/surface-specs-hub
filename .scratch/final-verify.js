/* eslint-disable */
// 最终验收：数据来源 + 素材登录拦截 + RLS 安全边界
const PW = 'C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core';
const { chromium } = require(PW);
const EXE = 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const URL = process.argv[2];

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const bad = [];
  page.on('response', (r) => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });

  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(9000);

  const core = await page.evaluate(async () => {
    const sc = window.SurfaceCloud || {};
    const out = {
      dataSource: sc.dataSource, datasetVersion: sc.datasetVersion, chunkCount: sc.chunkCount,
      cloudDeviceCount: sc.cloudDeviceCount, fallbackReason: sc.fallbackReason,
      localDeviceCount: (window.SURFACE_DATA && window.SURFACE_DATA.devices || []).length,
      accountBtn: (document.getElementById('cloud-account-btn') || {}).innerText || null,
      faviconDeclared: !!document.querySelector('link[rel="icon"]'),
      secureContext: window.isSecureContext,
    };
    const lib = window.WorkBuddyCloud, cfg = window.SURFACE_CLOUD_CONFIG || {};
    const cloud = lib.createWorkBuddyCloud({ endpoint: cfg.endpoint, publishableKey: cfg.publishableKey });

    // 1) 匿名读取素材表：应被拒绝（RLS 仅登录成员可读）
    try {
      const r = await cloud.database.from('surface_assets').select('id').limit(1);
      out.anonReadAssets = { error: r.error ? (r.error.message || r.error.code || JSON.stringify(r.error)) : null, rows: r.data ? r.data.length : null };
    } catch (e) { out.anonReadAssets = { thrown: String(e && e.message || e) }; }

    // 2) 匿名写入数据集：应被拒绝（公开只读）
    try {
      const w = await cloud.database.from('surface_dataset').insert({ id: 'probe:forbidden:' + Date.now(), version: 'x', encoding: 'none', payload: 'x' });
      out.anonWriteDataset = { error: w.error ? (w.error.message || w.error.code || JSON.stringify(w.error)) : null, wrote: !w.error };
    } catch (e) { out.anonWriteDataset = { thrown: String(e && e.message || e) }; }
    return out;
  });

  await page.screenshot({ path: 'C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/.scratch/final-home.png' });
  await page.goto(URL + '#/assets', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(4000);
  const assets = await page.evaluate(() => ({
    lockPanel: !!document.querySelector('.cloud-lock-panel'),
    lockTitle: (document.querySelector('.cloud-lock-title') || {}).innerText || null,
    dropzone: !!document.querySelector('.cloud-drop'),
  }));

  await browser.close();
  console.log(JSON.stringify({ url: URL, core, assets, badRequests: bad }, null, 2));
})();
