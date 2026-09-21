/* eslint-disable */
const PW = 'C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core';
const { chromium } = require(PW);
const EXE = 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const URL = process.argv[2];

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  const bad = [];
  page.on('response', (r) => { if (r.status() >= 400) bad.push({ status: r.status(), url: r.url() }); });
  page.on('requestfailed', (r) => bad.push({ failed: true, url: r.url(), err: r.failure() && r.failure().errorText }));
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(6000);
  await page.goto(URL + '#/assets', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);
  await browser.close();
  console.log(JSON.stringify({ url: URL, bad }, null, 2));
})();
