/* Visual evidence runner for the two isolated spaceship laboratory routes.
 * Run in CI against a local static preview. Creates screenshots & JSON evidence;
 * no external APIs, user data, or production jobs. */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.env.BASE_URL || 'http://127.0.0.1:4173';
const DIR = join(process.cwd(), 'visual-proof');
mkdirSync(DIR,{recursive:true});
const summary={baseUrl:ROOT,createdAt:new Date().toISOString(),viewportResults:[],consoleErrors:[],pageErrors:[],requestsFailed:[],checks:[]};
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const checks=(label,ok,extra={})=>{summary.checks.push({label,pass:Boolean(ok),...extra});if(!ok)process.stderr.write('FAIL '+label+'\n');};
function instrument(page,tag){
  page.on('pageerror',err=>summary.pageErrors.push({tag,message:err.message}));
  page.on('console',msg=>{if(msg.type()==='error')summary.consoleErrors.push({tag,text:msg.text()});});
  page.on('requestfailed',req=>summary.requestsFailed.push({tag,url:req.url(),failure:req.failure()?.errorText}));
}
try{
  const desktop=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'no-preference'});
  const page=await desktop.newPage();instrument(page,'desktop');
  let response=await page.goto(ROOT+'/lab/voyage',{waitUntil:'networkidle'});
  checks('voyage HTTP 200',response?.status()===200);
  await page.waitForTimeout(1800);
  const model=await page.locator('[data-voyage-scene]').getAttribute('data-model');
  const graphics=await page.locator('[data-voyage]').getAttribute('data-graphics');
  summary.viewportResults.push({route:'/lab/voyage',size:'1440x900',model,graphics});
  checks('voyage graphics ready',graphics==='ready',{graphics});
  checks('ship glTF loaded',model==='ready',{model});
  await page.screenshot({path:join(DIR,'desktop-voyage.png'),fullPage:true,animations:'disabled'});
  await page.getByRole('button',{name:/Pause journey/}).click();
  const counterBefore=await page.locator('[data-voyage-counter]').innerText();
  await page.waitForTimeout(750);
  const counterAfter=await page.locator('[data-voyage-counter]').innerText();
  checks('pause freezes narrative beat',counterBefore===counterAfter,{counterBefore,counterAfter});
  await page.getByRole('link',{name:/Skip journey/}).click();
  checks('skip enters deck',page.url().includes('/lab/observation-deck'));
  await page.waitForTimeout(1200);
  await page.screenshot({path:join(DIR,'desktop-deck-risks.png'),fullPage:true,animations:'disabled'});
  const activeInitial=await page.locator('[data-deck-counter]').innerText();
  checks('deck starts on Risks 02 / 05',activeInitial.includes('02'),{activeInitial});
  const deckGL=await page.locator('[data-deck]').getAttribute('data-webgl');
  checks('deck graphics ready',deckGL==='ready',{deckGL});
  await page.getByRole('button',{name:'Next window'}).click();
  await page.waitForTimeout(1100);
  const activeNext=await page.locator('[data-deck-counter]').innerText();
  checks('deck arrow advances to 03 / 05',activeNext.includes('03'),{activeNext});
  await page.screenshot({path:join(DIR,'desktop-deck-benefits.png'),fullPage:true,animations:'disabled'});
  await desktop.close();

  const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:'no-preference'});
  const mobilePage=await mobile.newPage();instrument(mobilePage,'mobile');
  response=await mobilePage.goto(ROOT+'/lab/voyage',{waitUntil:'networkidle'});
  await mobilePage.waitForTimeout(900);
  await mobilePage.screenshot({path:join(DIR,'mobile-voyage.png'),fullPage:true,animations:'disabled'});
  checks('mobile voyage no horizontal overflow',await mobilePage.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth));
  await mobilePage.goto(ROOT+'/lab/observation-deck',{waitUntil:'networkidle'});
  await mobilePage.waitForTimeout(950);
  await mobilePage.screenshot({path:join(DIR,'mobile-deck.png'),fullPage:true,animations:'disabled'});
  checks('mobile deck no document horizontal overflow',await mobilePage.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth));
  const activeMobile=await mobilePage.locator('[data-deck-counter]').innerText();
  checks('mobile deck selection initialized',activeMobile.includes('02'),{activeMobile});
  await mobile.close();

  const reduced=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const reducedPage=await reduced.newPage();instrument(reducedPage,'reduced-motion');
  await reducedPage.goto(ROOT+'/lab/voyage',{waitUntil:'networkidle'});
  const nextVisible=await reducedPage.locator('[data-voyage-next]').isVisible();
  checks('reduced-motion manual next visible',nextVisible);
  await reducedPage.getByRole('button',{name:/Next chapter/}).click();
  const reducedTitle=await reducedPage.locator('[data-voyage-heading]').innerText();
  checks('manual chapter advances',reducedTitle.includes('decades'),{reducedTitle});
  await reducedPage.screenshot({path:join(DIR,'reduced-voyage.png'),fullPage:true,animations:'disabled'});
  await reduced.close();
}finally{await browser.close();}
writeFileSync(join(DIR,'report.json'),JSON.stringify(summary,null,2));
process.stdout.write(JSON.stringify({checks:summary.checks,errors:summary.pageErrors.length,consoleErrors:summary.consoleErrors.length,requestFailed:summary.requestsFailed.length},null,2)+'\n');
if(summary.checks.some(x=>!x.pass)||summary.pageErrors.length||summary.requestsFailed.length)process.exitCode=1;