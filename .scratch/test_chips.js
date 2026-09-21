const { chromium } = require('C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const logs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[error] ${e.stack || e.message}`));

  await page.goto('file:///C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/index.html#/tools/chips', { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  const state = await page.evaluate(() => {
    const main = document.getElementById('hub-main-content');
    const rows = document.querySelectorAll('.chip-ladder-row');
    const buttons = document.querySelectorAll('.chip-filter-bar button');
    return {
      mainHtmlLen: main ? main.innerHTML.length : 0,
      rowsCount: rows.length,
      buttonsCount: buttons.length,
      buttonTexts: Array.from(buttons).map(b => b.innerText)
    };
  });
  console.log('Chips page state:', JSON.stringify(state, null, 2));

  // Try clicking filter buttons
  const clickResults = [];
  for (let i = 0; i < state.buttonsCount; i++) {
    const btnText = state.buttonTexts[i];
    await page.click(`.chip-filter-bar button:nth-child(${i+1})`);
    await page.waitForTimeout(300);
    const rowCount = await page.evaluate(() => document.querySelectorAll('.chip-ladder-row').length);
    clickResults.push({ btn: btnText, rowCount });
  }
  console.log('Filter click results:', JSON.stringify(clickResults, null, 2));

  await page.screenshot({ path: '.scratch/chips_view_test.png' });

  console.log('Logs:', JSON.stringify(logs, null, 2));

  await browser.close();
})();
