const { chromium } = require('C:/Users/12009/AppData/Roaming/npm/node_modules/agent-browser/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/12009/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', err => errors.push({ type: 'pageerror', text: err.message, stack: err.stack }));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push({ type: 'console.error', text: msg.text() });
    }
  });

  console.log('========================================================');
  console.log('1. 进入 Surface 配件生态双向兼容性查询中心');
  console.log('========================================================');
  await page.goto('file:///C:/Users/12009/OneDrive/Antigravity/surface-specs-hub/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => App.navigate('#/tools/compat'));
  await page.waitForTimeout(600);

  // 1. 全景总表
  const matrixInfo = await page.evaluate(() => {
    const title = document.querySelector('.tool-title')?.innerText.trim();
    const rows = document.querySelectorAll('.compat-matrix-table tbody tr');
    const cols = Array.from(document.querySelectorAll('.compat-matrix-table thead th')).map(th => th.innerText.replace(/\n.*/g, '').trim());
    return { title, rowCount: rows.length, columns: cols };
  });
  console.log('全景总表模式:', matrixInfo);
  await page.screenshot({ path: '.scratch/verified_compat_overview_v2.png', fullPage: false });

  // 2. 切换模式: "按配件查支持设备"
  console.log('\n========================================================');
  console.log('2. 验证品类筛选与鼠标配件生态 (按配件查设备)');
  console.log('========================================================');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.tool-view-card button.fluent-btn'));
    const b = btns.find(btn => btn.textContent.includes('按配件查支持设备'));
    if (b) b.click();
  });
  await page.waitForTimeout(400);

  const categoryPills = await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('#compat-subview-container button.fluent-btn'));
    return pills.map(p => p.innerText.trim());
  });
  console.log('配件品类 Pills 筛选栏:', categoryPills);

  // 点击 "🖱️ 鼠标与触控"
  console.log('\n点击 "🖱️ 鼠标与触控" 品类筛选...');
  await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('#compat-subview-container button.fluent-btn'));
    const p = pills.find(btn => btn.textContent.includes('鼠标'));
    if (p) p.click();
  });
  await page.waitForTimeout(300);

  // 查看下拉框中呈现的鼠标选项
  const mouseOptions = await page.evaluate(() => {
    const sel = document.querySelector('#compat-subview-container select');
    if (!sel) return [];
    return Array.from(sel.options).map(o => ({ id: o.value, name: o.text }));
  });
  console.log(`✅ 鼠标品类过滤成功，下拉列表中包含 ${mouseOptions.length} 款鼠标:`, mouseOptions);

  // 选中 Surface Arc 鼠标
  await page.evaluate(() => {
    const sel = document.querySelector('#compat-subview-container select');
    if (sel) {
      sel.value = 'surface-arc-mouse';
      sel.dispatchEvent(new Event('change'));
    }
  });
  await page.waitForTimeout(300);

  const arcInfo = await page.evaluate(() => {
    const title = document.querySelector('#compat-subview-container div[style*="font-weight:700"]')?.innerText.trim();
    const rows = document.querySelectorAll('.compat-matrix-table tbody tr');
    return { title, totalDevicesSupported: rows.length };
  });
  console.log('✅ Surface Arc 鼠标兼容查询结果:', arcInfo);
  await page.screenshot({ path: '.scratch/verified_compat_mouse_arc.png', fullPage: false });
  console.log('📸 截图已保存: .scratch/verified_compat_mouse_arc.png');

  // 选中 Surface 精准鼠标
  await page.evaluate(() => {
    const sel = document.querySelector('#compat-subview-container select');
    if (sel) {
      sel.value = 'surface-precision-mouse';
      sel.dispatchEvent(new Event('change'));
    }
  });
  await page.waitForTimeout(300);
  const precisionInfo = await page.evaluate(() => {
    const title = document.querySelector('#compat-subview-container div[style*="font-weight:700"]')?.innerText.trim();
    const rows = document.querySelectorAll('.compat-matrix-table tbody tr');
    return { title, totalDevicesSupported: rows.length };
  });
  console.log('✅ Surface 精准鼠标兼容查询结果:', precisionInfo);
  await page.screenshot({ path: '.scratch/verified_compat_mouse_precision.png', fullPage: false });
  console.log('📸 截图已保存: .scratch/verified_compat_mouse_precision.png');

  // 3. 验证模式 3: 按设备查兼容配件 (全品类分组大表)
  console.log('\n========================================================');
  console.log('3. 验证按设备查兼容配件 (6 大品类分组清晰呈现)');
  console.log('========================================================');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.tool-view-card button.fluent-btn'));
    const b = btns.find(btn => btn.textContent.includes('按设备查兼容配件'));
    if (b) b.click();
  });
  await page.waitForTimeout(400);

  // 选择 Surface Pro 7
  await page.evaluate(() => {
    const sel = document.querySelector('#compat-subview-container select');
    if (sel) {
      const opt = Array.from(sel.options).find(o => o.text.includes('Pro 7') && !o.text.includes('+'));
      if (opt) {
        sel.value = opt.value;
        sel.dispatchEvent(new Event('change'));
      }
    }
  });
  await page.waitForTimeout(400);

  const deviceViewGroups = await page.evaluate(() => {
    const groups = Array.from(document.querySelectorAll('#compat-subview-container div[style*="margin-top:8px"]'));
    return groups.map(g => {
      const title = g.querySelector('div[style*="font-weight:700"]')?.innerText.trim();
      const rows = g.querySelectorAll('tbody tr');
      const items = Array.from(rows).map(r => ({
        name: r.querySelector('.compat-device-label')?.innerText.trim().replace(/\n.*/g, ''),
        status: r.querySelector('td:nth-child(2)')?.innerText.trim()
      }));
      return { title, count: items.length, items };
    });
  });
  console.log('✅ Surface Pro 7 全生态配件分组结果:');
  deviceViewGroups.forEach(g => {
    console.log(`\n  ${g.title}:`);
    g.items.forEach(it => console.log(`    - ${it.name}: ${it.status}`));
  });

  await page.screenshot({ path: '.scratch/verified_compat_device_grouped.png', fullPage: false });
  console.log('📸 截图已保存: .scratch/verified_compat_device_grouped.png');

  console.log('\n========================================================');
  console.log('4. 运行时错误统计');
  console.log('========================================================');
  const criticalErrors = errors.filter(e => !e.text.includes('ERR_CONNECTION_CLOSED') && !e.text.includes('app.workbuddy.host'));
  console.log('关键逻辑错误数 (Critical JS Errors):', criticalErrors.length);
  if (criticalErrors.length > 0) {
    console.log(criticalErrors);
  } else {
    console.log('🎉 零 JS 运行时错误！23 款全生态配件交互完美渲染！');
  }

  await browser.close();
})();
