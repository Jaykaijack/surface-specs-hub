const { chromium } = require('C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  const consoleLogs = [];
  const pageErrors = [];
  page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => pageErrors.push(err.message));

  console.log('Navigating to file:///C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/index.html...');
  const t0 = Date.now();
  await page.goto('file:///C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/index.html', { waitUntil: 'load' });
  const tLoaded = Date.now() - t0;
  console.log(`Page 'load' event fired after ${tLoaded}ms`);

  const initialMainText = await page.evaluate(() => {
    const el = document.getElementById('hub-main-content');
    return el ? el.innerText : 'NO #hub-main-content';
  });
  console.log('Initial #hub-main-content content length:', initialMainText.length);
  console.log('Initial #hub-main-content snippet:', initialMainText.slice(0, 100));

  await page.waitForTimeout(3000);
  const after3sMainText = await page.evaluate(() => {
    const el = document.getElementById('hub-main-content');
    return el ? el.innerText : 'NO #hub-main-content';
  });
  console.log('After 3s #hub-main-content content length:', after3sMainText.length);

  await page.screenshot({ path: '.scratch/file_load_after3s.png' });

  console.log('Console logs:', JSON.stringify(consoleLogs, null, 2));
  console.log('Page errors:', JSON.stringify(pageErrors, null, 2));

  await browser.close();
})();
