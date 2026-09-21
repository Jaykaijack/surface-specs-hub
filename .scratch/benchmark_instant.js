const { chromium } = require('C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const t0 = Date.now();
  await page.goto('file:///C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/index.html', { waitUntil: 'domcontentloaded' });
  const tDOMContentLoaded = Date.now() - t0;

  const contentInfo = await page.evaluate(() => {
    const main = document.getElementById('hub-main-content');
    const side = document.getElementById('hub-sidebar-content');
    const hero = document.querySelector('.home-hero-card');
    const devices = document.querySelectorAll('.product-card, .series-item, .sidebar-nav-item');
    return {
      mainTextLen: main ? main.innerText.length : 0,
      sidebarTextLen: side ? side.innerText.length : 0,
      hasHero: !!hero,
      elementsCount: devices.length,
      accountBtnText: (document.getElementById('cloud-account-btn') || {}).innerText || null
    };
  });
  const tMeasured = Date.now() - t0;

  console.log(`DOMContentLoaded in: ${tDOMContentLoaded}ms`);
  console.log(`Measured render in: ${tMeasured}ms`);
  console.log('Content info:', JSON.stringify(contentInfo, null, 2));

  // Take screenshot
  await page.screenshot({ path: '.scratch/verified_instant_1440.png' });
  console.log('Saved screenshot to .scratch/verified_instant_1440.png');

  await browser.close();
})();
