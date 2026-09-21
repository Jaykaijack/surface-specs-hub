/* eslint-disable */
const PW = 'C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core';
const { chromium } = require(PW);
const EXE = 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const URL = 'https://surface-specs-hub.app.workbuddy.host/';
const OUT = 'C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/.scratch/shots';

(async () => {
  const fs = require('fs');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });

  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(9000);
  await page.screenshot({ path: OUT + '/01-home.png' });

  await page.goto(URL + '#/assets', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: OUT + '/02-assets-lock.png' });

  await page.evaluate(() => {
    const b = document.querySelector('[data-cloud-action="open-login"], [data-cloud-action="login"]');
    if (b) b.click();
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: OUT + '/03-login-modal.png' });

  await browser.close();
  console.log('shots saved to ' + OUT);
})();
