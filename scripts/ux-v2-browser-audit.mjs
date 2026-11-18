// Isolated GitHub runner QA. This file is not included in the production export.
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {createRequire} from 'node:module';
import {serveStatic} from './ux-v2-audit-server.mjs';
const [baseline,candidate,tools]=process.argv.slice(2);
if(!baseline||!candidate||!tools)throw Error('Expected baseline, candidate and tooling directories');
const require=createRequire(join(resolve(tools),'package.json'));
const {chromium}=require('playwright');
const axeModule=require('@axe-core/playwright');
const AxeBuilder=axeModule.default||axeModule.AxeBuilder;
const out=resolve(candidate,'artifacts/ux-v2/browser');await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const results=[],issues=[];
const routes=['','sobre','servicos','contato'];
const widths=[320,360,375,390,414,720,768,1024,1280,1440,1920];
async function ready(page){await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);}
try{
 for(const [phase,directory] of [['before',baseline],['after',candidate]]){
  const server=await serveStatic(join(directory,'dist'));
  try{
   for(const width of phase==='before'?[390,1440]:widths){
    const context=await browser.newContext({viewport:{width,height:900},isMobile:width<=414,hasTouch:width<=414});
    const page=await context.newPage();
    for(const slug of routes){
     const key=(slug||'home')+'-'+width;
     const errors=[];const errorListener=e=>errors.push(e.message);page.on('pageerror',errorListener);
     await page.goto(server.url+'/'+(slug?slug+'/':''),{waitUntil:'networkidle'});await ready(page);
     const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('main h1').length,duplicateIds:[...document.querySelectorAll('[id]')].map(x=>x.id).filter((id,index,ids)=>ids.indexOf(id)!==index),brokenImages:[...document.querySelectorAll('img[src]')].filter(x=>x.complete&&!x.naturalWidth).map(x=>x.getAttribute('src')),headingOverflow:[...document.querySelectorAll('main h1,main h2,main h3')].filter(x=>x.getClientRects().length&&getComputedStyle(x).visibility!=='hidden').filter(x=>{const r=x.getBoundingClientRect();return r.left< -1||r.right>innerWidth+1}).map(x=>x.textContent)}));
     const row={phase,route:slug||'home',viewport:width,...metrics,pageErrors:errors};results.push(row);
     if(phase==='after'&&width===1440){
      const links=await page.locator('a[href]').evaluateAll(elements=>[...new Set(elements.map(a=>a.href))]);
      row.internalLinks=[];
      for(const href of links){
       const target=new URL(href);if(target.origin!==server.url)continue;
       const response=await page.request.get(target.origin+target.pathname);
       row.internalLinks.push({href:target.pathname+target.hash,status:response.status()});
       if(response.status()!==200)issues.push(key+': broken internal link '+target.pathname);
       if(target.hash&&response.ok()){
        const id=decodeURIComponent(target.hash.slice(1));
        const body=await response.text();
        if(!body.includes('id="'+id+'"'))issues.push(key+': missing anchor '+target.pathname+target.hash);
       }
      }
     }
     if(phase==='after'){
      if(metrics.scroll>metrics.width+1)issues.push(key+': horizontal overflow');
      if(metrics.h1!==1)issues.push(key+': H1 count '+metrics.h1);
      if(metrics.duplicateIds.length)issues.push(key+': duplicate IDs '+metrics.duplicateIds.join(','));
      if(errors.length)issues.push(key+': page error '+errors.join(';'));
      if(metrics.brokenImages.length)issues.push(key+': broken images');
     }
     if([390,1440].includes(width)){
      // Visit the section content before axe so entry effects have a chance to finish.
      for(const section of await page.locator('main>section').all()){await section.scrollIntoViewIfNeeded();await page.waitForTimeout(180);}
      await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(1000);
      await page.screenshot({path:join(out,phase+'-'+key+'.png'),fullPage:true});
      const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
      await writeFile(join(out,phase+'-'+key+'-axe.json'),JSON.stringify(axe,null,2));
      row.axeViolations=axe.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,description:v.description}));
      row.axeIncomplete=axe.incomplete.map(v=>({id:v.id,count:v.nodes.length}));
      if(phase==='after')for(const v of axe.violations)if(['critical','serious'].includes(v.impact))issues.push(key+': axe '+v.id+' ('+v.nodes.length+')');
     }
     page.off('pageerror',errorListener);
    }
    if(phase==='after'&&[390,1440].includes(width)){
     for(const slug of ['','servicos']){
      await page.goto(server.url+'/'+(slug?slug+'/':''),{waitUntil:'networkidle'});await ready(page);
      const explorer=page.locator('.service-explorer');
      if(width===390){
       for(const id of ['s01','s02','s03','s04','s05','s06','s07','s08','s09']){
        const item=page.locator('details[data-service-item="'+id+'"]'),summary=item.locator('summary');
        await summary.tap();assert.equal(await item.getAttribute('open')!==null,true,'touch expands '+id);
        assert.equal(await summary.getAttribute('aria-expanded'),'true');
        assert.ok((await item.locator('.service-panel-cta').getAttribute('href')).endsWith('contato/'));
        await summary.tap();assert.equal(await item.getAttribute('open'),null,'touch closes '+id);
       }
       const first=page.locator('details[data-service-item="s01"] summary');await first.focus();await first.press('Space');
       assert.equal(await page.locator('details[data-service-item="s01"]').getAttribute('open')!==null,true,'Space opens accordion');
       await first.press('Enter');assert.equal(await page.locator('details[data-service-item="s01"]').getAttribute('open'),null,'Enter closes accordion');
       await page.goto(server.url+'/'+(slug?slug+'/':'')+'#s09',{waitUntil:'networkidle'});await ready(page);
       assert.equal(await page.locator('details[data-service-item="s09"]').getAttribute('open')!==null,true,'deep anchor opens service09');
       const anchor=await page.locator('details[data-service-item="s09"] summary').boundingBox();
       if(anchor.y<0)issues.push((slug||'home')+': deep anchor clipped above viewport');
       await page.screenshot({path:join(out,'after-'+(slug||'home')+'-mobile-service09.png'),fullPage:false});
      }else{
       assert.equal(await explorer.locator('[role="tab"]').count(),9);
       await page.locator('#tab-s01').click();await page.locator('#tab-s01').press('End');
       assert.equal(await explorer.getAttribute('data-active-service'),'s09');
       await page.locator('#tab-s09').press('Home');assert.equal(await explorer.getAttribute('data-active-service'),'s01');
       assert.equal(await page.locator('[role="tabpanel"]:visible').count(),1);
       await explorer.screenshot({path:join(out,'after-'+(slug||'home')+'-desktop-explorer.png')});
      }
     }
     if(width===390){
      await page.goto(server.url+'/contato/',{waitUntil:'networkidle'});await ready(page);
      const menu=page.locator('.site-mobile-menu');await menu.locator('summary').click();assert.equal(await menu.getAttribute('open')!==null,true);
      await menu.locator('summary').press('Escape');assert.equal(await menu.getAttribute('open'),null,'Escape closes mobile menu');
     }
    }
    await context.close();
   }
  }finally{await server.close();}
 }
}catch(error){issues.push(error.stack||String(error));}
finally{await browser.close();await writeFile(join(out,'results.json'),JSON.stringify({method:'Chromium responsive and touch/keyboard checks plus axe WCAG A/AA. Width720 simulates the effective layout width of1440 at200%; width320 tests reflow but does not claim physical browser zoom or full WCAG conformance.',baseline:process.env.BASELINE_SHA,candidate:process.env.CANDIDATE_SHA,results,issues},null,2));}
console.log(JSON.stringify({combinations:results.length,issues},null,2));
if(issues.length)process.exitCode=1;
