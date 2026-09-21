const { chromium } = require('C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();

  await page.goto('file:///C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/index.html', { waitUntil: 'load' });

  for (let s = 1; s <= 15; s++) {
    await page.waitForTimeout(1000);
    const status = await page.evaluate(() => {
      const sc = window.SurfaceCloud || {};
      const el = document.getElementById('hub-main-content');
      const side = document.getElementById('hub-sidebar-content');
      return {
        appInitialized: !!(window.App && window.App.initialized), // check if App.init completed
        dataSource: sc.dataSource,
        fallbackReason: sc.fallbackReason,
        mainLen: el ? el.innerText.length : -1,
        sidebarLen: side ? side.innerText.length : -1,
      };
    });
    console.log(`[Second ${s}]`, JSON.stringify(status));
    if (status.mainLen > 0) break;
  }

  await browser.close();
})();
