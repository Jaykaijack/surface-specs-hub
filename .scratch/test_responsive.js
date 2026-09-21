const { chromium } = require('C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });

  // Tablet 900x900
  const pageTablet = await browser.newPage({ viewport: { width: 900, height: 900 } });
  await pageTablet.goto('file:///C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/index.html', { waitUntil: 'domcontentloaded' });
  await pageTablet.screenshot({ path: '.scratch/verified_instant_tablet_900.png' });

  // Mobile 390x844
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('file:///C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/index.html', { waitUntil: 'domcontentloaded' });
  await pageMobile.screenshot({ path: '.scratch/verified_instant_mobile_390.png' });

  console.log('Mobile and tablet screenshots captured successfully.');
  await browser.close();
})();
