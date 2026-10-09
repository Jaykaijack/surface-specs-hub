const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const http=require('node:http');
const target=process.argv[2];
if(!target)throw new Error('Pass the exact immutable offline HTML snapshot path');
(async()=>{
 // Managed Chromium blocks file://. Serve only the unchanged HTML bytes locally;
 // deny every subsequent resource request, including requests to localhost.
 const payload=fs.readFileSync(path.resolve(target));
 const server=http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(payload);});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url=`http://127.0.0.1:${server.address().port}/snapshot.html`;
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{if(route.request().url()===url&&route.request().isNavigationRequest())return route.continue();external.push(route.request().url());return route.abort();});
  await page.goto(url);
  await page.waitForFunction(()=>typeof Catalog!=='undefined'&&typeof App!=='undefined');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).margin),'0px','merged stylesheet must retain global layout rules');
  assert.ok(await page.evaluate(()=>[...document.styleSheets].reduce((n,s)=>n+s.cssRules.length,0)>100),'unclosed theme rule must not swallow later styles');
  const info=await page.locator('#build-provenance').textContent();const meta=JSON.parse(info);
  assert.equal(meta.fullFactCertification,false);assert.equal(meta.dirty,false);
  for(const [file,hash] of Object.entries(meta.files))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),hash,'snapshot differs from '+file);
  const audit=require('../docs/evidence/field-audit-1131-decisions-20261009.json');
  const invalid=await page.evaluate(entries=>entries.filter(e=>JSON.stringify(Catalog.getSpec(Catalog.getDevice(e.deviceId),e.field))!==JSON.stringify(e.result==='UNRESOLVED'?null:e.supportedValue)).map(e=>`${e.deviceId}:${e.field}`),audit.entries);
  assert.deepEqual(invalid,[],'offline has all field decisions');
  await page.evaluate(()=>App.navigate('#/business/laptop/laptop-ultra-biz'));
  assert.match(await page.locator('#hub-main-content').innerText(),/3270.*2180/s);
  await page.evaluate(()=>{App.navigate('#/tools/weight');ToolsEngine.weightWithKeyboard=false;ToolsEngine.weightWithPen=false;ToolsEngine.weightWithMouse=false;ToolsEngine.weightCharger='none';ToolsEngine.onWeightOptionChange('device','laptop-13-inch-biz');});
  assert.match(await page.locator('.weight-big-num').innerText(),/1220/);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await page.locator('script[src],link[rel=stylesheet][href]').count(),0);
  assert.deepEqual(external,[],'offline must not request external resources');assert.deepEqual(errors,[]);
  console.log('Offline single-document browser PASS: exact source/evidence hashes, clean committed source, all 1131 decisions, Ultra correction, 1220g arithmetic, narrow viewport, zero additional requests/errors. file:// opening remains blocked by environment policy.');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
