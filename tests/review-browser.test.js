const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1280,height:800}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/dist/site/#/tools/guide');
 await page.getByRole('button',{name:'入门便携',exact:false}).click();
 assert.equal(await page.evaluate(()=>ToolsEngine.guideBudget),'budget_entry');
 assert.match(await page.locator('#tool-smart-guide-container').innerText(),/符合条件 0 款/);
 await page.getByRole('button',{name:'主流进阶',exact:false}).click();
 assert.equal(await page.evaluate(()=>ToolsEngine.guideBudget),'budget_mid');
 assert.ok(await page.locator('.guide-card').count()>0);
 await page.evaluate(()=>App.handleGlobalSearch('Pro 11'));
 assert.ok(await page.locator('.search-result-item').count()>0);
 await page.locator('.search-result-item').first().focus();await page.keyboard.press('Enter');
 assert.match(page.url(),/pro-11/);
 await page.evaluate(()=>App.handleGlobalSearch('<img src=x onerror="window.pwned=true">'));
 assert.equal(await page.evaluate(()=>window.pwned),undefined);
 assert.equal(await page.locator('#search-results-modal img').count(),0);
 await page.evaluate(()=>App.closeSearchModal());
 await page.goto('http://127.0.0.1:8765/dist/site/#/tools/weight');
 await page.evaluate(()=>{ToolsEngine.weightDeviceId='laptop-13-inch';ToolsEngine.weightWithKeyboard=false;ToolsEngine.weightWithPen=false;ToolsEngine.weightWithMouse=false;ToolsEngine.weightCharger='none';ToolsEngine.onWeightOptionChange('device','laptop-13-inch')});
 assert.match(await page.locator('.weight-big-num').innerText(),/1220/);
 await page.setViewportSize({width:390,height:844});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth), 'mobile must not overflow horizontally');
 await page.screenshot({path:'/tmp/surface-mobile-weight.png',fullPage:true});
 await page.goto('http://127.0.0.1:8765/dist/site/#/audit');
 await page.evaluate(()=>{App.auditFilter='all';App.renderAuditView(document.getElementById('hub-main-content'))});
 for(const name of ['Surface Pro 初代', 'Surface Pro 2']) {
  const row=page.locator('tr').filter({hasText:name});assert.ok(await row.count()>0);assert.match(await row.first().innerText(),/16:9/);
 }
 const xbox=page.locator('tr').filter({hasText:'Xbox Series X 1TB（带光驱）'});assert.ok(await xbox.count()>0);assert.doesNotMatch(await xbox.first().innerText(),/3:2/);
 await page.goto('http://127.0.0.1:8765/dist/site/products/pro-1/');
 assert.match(await page.locator('main').innerText(),/16:9/);
 assert.match(await page.locator('link[rel=canonical]').getAttribute('href'),/products\/pro-1\//);
 for(const file of ['robots.txt','sitemap.xml','build-info.json']){const r=await page.request.get('http://127.0.0.1:8765/dist/site/'+file);assert.equal(r.status(),200);assert.doesNotMatch(await r.text(),/<!doctype html>/i)}
 assert.deepEqual(errors,[]);
 await browser.close();console.log('Browser PASS: desktop/mobile, real budget clicks, search keyboard + XSS, weight arithmetic, static detail/canonical/robots/sitemap/build metadata; no page errors');
})().catch(e=>{console.error(e);process.exit(1)});
