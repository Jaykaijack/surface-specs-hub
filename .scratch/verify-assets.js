/* eslint-disable */
// 验证素材中心（未登录）与登录弹窗
const PW = 'C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core';
const { chromium } = require(PW);
const EXE = 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:8123/';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const notFound = [];
  page.on('response', (r) => { if (r.status() === 404) notFound.push(r.url()); });

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);

  const home = await page.evaluate(() => ({
    accountBtnText: (document.getElementById('cloud-account-btn') || {}).innerText || null,
    footerHasCloud: /云端数据库/.test(document.body.innerText),
  }));

  // 进入素材中心
  await page.goto(BASE + '#/assets', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);
  const assets = await page.evaluate(() => {
    const lock = document.querySelector('.cloud-lock-panel');
    return {
      lockPanel: !!lock,
      lockTitle: (document.querySelector('.cloud-lock-title') || {}).innerText || null,
      lockDesc: (document.querySelector('.cloud-lock-desc') || {}).innerText || null,
      pageTitle: (document.querySelector('.cloud-page-title') || {}).innerText || null,
      dropzone: !!document.querySelector('.cloud-drop'),
      hasLoginBtn: !!document.querySelector('[data-cloud-action="open-login"], [data-cloud-action="login"]'),
    };
  });

  // 打开登录弹窗
  const modal = await page.evaluate(() => {
    const btn = document.querySelector('[data-cloud-action="open-login"], [data-cloud-action="login"]');
    if (!btn) return { opened: false };
    btn.click();
    return { opened: true };
  });
  await page.waitForTimeout(1200);
  const modalState = await page.evaluate(() => {
    const card = document.querySelector('.cloud-modal-card');
    if (!card) return { modal: false };
    const tabs = Array.from(document.querySelectorAll('.cloud-tab, [data-cloud-tab]')).map((t) => (t.innerText || '').trim());
    return {
      modal: true,
      title: (document.querySelector('.cloud-modal-title') || {}).innerText || null,
      tabs,
      hasEmailInput: !!document.getElementById('cloud-email'),
      hasPasswordInput: !!document.getElementById('cloud-password'),
    };
  });
  await page.screenshot({ path: 'C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/.scratch/live-login-modal.png' });

  await browser.close();
  console.log(JSON.stringify({ base: BASE, home, assets, modal, modalState, notFound }, null, 2));
})();
