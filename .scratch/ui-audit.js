/* eslint-disable */
// 多路由 × 多视口 UI 巡检截图
const PW = 'C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core';
const { chromium } = require(PW);
const EXE = 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:8123/';
const OUT = process.argv[3] || 'C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/.scratch/audit-shots';

const ROUTES = [
  ['home', ''],
  ['series-pro-table', '#/consumer/pro'],
  ['business', '#/business'],
  ['compare', '#/compare?products=pro-12-13-intel,pro-12-13-snap'],
  ['timeline', '#/timeline'],
  ['tool-chip', '#/tool/chips'],
  ['audit', '#/audit'],
  ['assets', '#/assets'],
];

(async () => {
  const fs = require('fs');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--no-sandbox', '--disable-gpu'] });

  // 桌面 1600
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(8000);
  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/d-${name}.png` });
  }
  // 详情页（需要先知道一个设备 id，先抓首页）
  const detailUrl = await page.evaluate(() => {
    const d = (window.SURFACE_DATA.devices || [])[0];
    return d ? `#/consumer/${d.categoryId}/${d.id}` : null;
  });
  if (detailUrl) {
    await page.goto(BASE + detailUrl, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${OUT}/d-detail.png` });
  }
  // 画廊模式
  await page.goto(BASE + '#/consumer/pro', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => { App.switchSeriesViewMode('gallery'); });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/d-series-pro-gallery.png` });
  await page.close();

  // 平板 900
  const page2 = await browser.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 1 });
  await page2.goto(BASE, { waitUntil: 'load', timeout: 60000 });
  await page2.waitForTimeout(8000);
  for (const [name, route] of [['home', ''], ['series-pro-table', '#/consumer/pro'], ['compare', '#/compare?products=pro-12-13-intel,pro-12-13-snap'], ['business', '#/business']]) {
    await page2.goto(BASE + route, { waitUntil: 'load', timeout: 60000 });
    await page2.waitForTimeout(2500);
    await page2.screenshot({ path: `${OUT}/t-${name}.png` });
  }
  await page2.close();

  // 手机 390
  const page3 = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page3.goto(BASE, { waitUntil: 'load', timeout: 60000 });
  await page3.waitForTimeout(8000);
  for (const [name, route] of [['home', ''], ['series-pro-table', '#/consumer/pro'], ['compare', '#/compare?products=pro-12-13-intel,pro-12-13-snap'], ['timeline', '#/timeline'], ['assets', '#/assets']]) {
    await page3.goto(BASE + route, { waitUntil: 'load', timeout: 60000 });
    await page3.waitForTimeout(2500);
    await page3.screenshot({ path: `${OUT}/m-${name}.png` });
  }
  await page3.close();

  await browser.close();
  console.log('done -> ' + OUT);
})();
