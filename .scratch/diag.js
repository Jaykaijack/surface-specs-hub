/* eslint-disable */
// 精确诊断：读取 SurfaceCloud 真实回退原因，并直接复现 SDK 查询
const PW = 'C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core';
const { chromium } = require(PW);
const EXE = 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const URL = process.argv[2] || 'http://127.0.0.1:8123/';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message));

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(9000);

  const diag = await page.evaluate(async () => {
    const sc = window.SurfaceCloud || {};
    const out = {
      sdkGlobal: typeof window.WorkBuddyCloud,
      sdkReady: sc.sdkReady,
      dataSource: sc.dataSource,
      fallbackReason: sc.fallbackReason,
      datasetVersion: sc.datasetVersion,
      chunkCount: sc.chunkCount,
      cloudDeviceCount: sc.cloudDeviceCount,
      hasClient: !!sc.client,
      maxUploadBytes: (window.SURFACE_CLOUD_CONFIG || {}).maxUploadBytes,
    };
    try {
      const cfg = window.SURFACE_CLOUD_CONFIG || {};
      const lib = window.WorkBuddyCloud;
      const cloud = lib.createWorkBuddyCloud({ endpoint: cfg.endpoint, publishableKey: cfg.publishableKey });
      const res = await cloud.database.from('surface_dataset').select('id, version, payload').order('id', { ascending: true });
      out.rawError = res && res.error ? JSON.stringify(res.error) : null;
      out.rowCount = res && res.data ? res.data.length : null;
      out.rows = (res && res.data || []).map((r) => ({ id: r.id, version: r.version, payloadType: typeof r.payload, payloadLen: r.payload ? r.payload.length : 0 }));
      if (res && res.data && res.data.length) {
        const joined = res.data.map((r) => r.payload).join('');
        out.joinedLen = joined.length;
        try {
          const bin = atob(joined);
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
          const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
          const text = await new Response(stream).text();
          out.inflateOk = true;
          out.inflateLen = text.length;
          const parsed = JSON.parse(text);
          out.parsedKeys = Object.keys(parsed);
          out.parsedDevices = Array.isArray(parsed.devices) ? parsed.devices.length : null;
        } catch (e) { out.inflateOk = false; out.inflateErr = String(e && e.message || e); }
      }
    } catch (e) {
      out.directErr = String(e && e.stack || e);
    }
    return out;
  });

  const ui = await page.evaluate(() => ({
    accountBtn: !!document.querySelector('#cloud-account-btn'),
    assetsLink: !!document.querySelector('[data-route="#/assets"]'),
    srcBadgeHTML: (document.querySelector('.cloud-src-badge') || {}).outerHTML || null,
    footerText: (document.querySelector('footer') || {}).innerText ? String(document.querySelector('footer').innerText).slice(0, 300) : null,
  }));

  await browser.close();
  console.log(JSON.stringify({ url: URL, diag, ui, logs }, null, 2));
})();
