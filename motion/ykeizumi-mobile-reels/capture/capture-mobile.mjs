/**
 * Ykeizumi mobile source capture.
 * Captures the REAL site (built locally from the linked GitHub branch)
 * at a real touch viewport. No UI markup, labels or behaviors are recreated.
 * Raw frames are encoded to a 30fps video for deterministic Remotion playback.
 */
import {chromium} from 'playwright';
import {mkdir, rm, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const framesDir = join(root,'frames');
const publicDir = join(root,'public');
const total = 840;
const vw = 390, vh = 844;
const url = process.env.SITE_URL || 'http://127.0.0.1:4173/';
await rm(framesDir,{recursive:true,force:true});
await mkdir(framesDir,{recursive:true});
await mkdir(publicDir,{recursive:true});

const browser = await chromium.launch({
  headless:true,
  args:['--autoplay-policy=no-user-gesture-required', '--disable-background-timer-throttling']
});
const ctx = await browser.newContext({
  viewport:{width:vw,height:vh}, deviceScaleFactor:2, isMobile:true,
  hasTouch:true, colorScheme:'light', reducedMotion:'no-preference',
  serviceWorkers:'block'
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror',e=>errors.push('PAGE ERROR '+e.message));
page.on('response',r=>{if(r.status()>=400 && new URL(r.url()).host === '127.0.0.1:4173')errors.push('HTTP '+r.status()+' '+r.url());});
await page.goto(url,{waitUntil:'networkidle',timeout:60000});
await page.waitForSelector('.ha-mobile-menu summary');
await page.waitForSelector('#segmentos .sector-option summary');
await page.waitForSelector('#projetos .circular-gallery');
await page.waitForFunction(()=>{
 const v=document.querySelector('.ha-video');
 return v && v.readyState >= 2 && !v.paused && v.videoWidth > 0;
},{timeout:30000});
const videoStatus=await page.locator('.ha-video').evaluate(v=>({
 src:v.currentSrc,videoWidth:v.videoWidth,videoHeight:v.videoHeight,paused:v.paused
}));
const sample=await page.evaluate(()=>({
 viewport:{w:innerWidth,h:innerHeight,dpr:devicePixelRatio},
 heroTitle:document.querySelector('.ha-title')?.textContent,
 services:document.querySelectorAll('.home-service').length,
 accordions:document.querySelectorAll('#segmentos .sector-option').length,
 gallery:document.querySelectorAll('#projetos .circular-card').length
}));
if(sample.viewport.w!==390 || sample.viewport.h!==844)throw Error('Viewport mismatch: '+JSON.stringify(sample.viewport));
if(sample.accordions<2 || sample.gallery<2)throw Error('Required interactive components are missing: '+JSON.stringify(sample));
const touches=[];
const ease=(t)=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
const lerp=(a,b,t)=>a+(b-a)*ease(t);
const absTop=async(sel)=>page.locator(sel).first().evaluate(el=>el.getBoundingClientRect().top+scrollY);
const scroll=async(y)=>page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),Math.max(0,y));
const introY=Math.max(0,await absTop('#introducao')-56);
const servicesY=Math.max(0,await absTop('#servicos-home')-30);
const segmentY=Math.max(0,await absTop('#segmentos')-22);
let secondY=segmentY;
let galleryY=0;
let galleryStart=0;
async function tapIfVisible(selector, frame, purpose) {
 const target=page.locator(selector).first();
 const box=await target.boundingBox();
 if(!box || box.x<0 || box.y<10 || box.x+box.width>vw || box.y+box.height>vh-8) {
   errors.push('Touch not visible (skipped, no artificial jump): '+purpose+' '+JSON.stringify(box));
   return false;
 }
 const x=Math.min(vw-10,Math.max(10,box.x+box.width*.5));
 const y=Math.min(vh-10,Math.max(10,box.y+box.height*.5));
 await page.touchscreen.tap(x,y); // Real touch device event.
 touches.push({frame,x:Math.round(x),y:Math.round(y),purpose});
 return true;
}

try {
  for(let f=0;f<total;f++) {
    // Scene 02, 00:04-00:10: original animated mobile Hero and real disclosure menu.
    if(f===110)await tapIfVisible('.ha-mobile-menu summary',f,'open-mobile-menu');
    if(f===148)await tapIfVisible('.ha-mobile-menu summary',f,'close-mobile-menu');

    // Scene 03, 00:10-00:17: native scroll to service rows; no desktop hover.
    if(f>=180 && f<=247)await scroll(lerp(0,introY,(f-180)/(247-180)));
    if(f>=248 && f<=320)await scroll(lerp(introY,servicesY,(f-248)/(320-248)));
    if(f>=321 && f<=389)await scroll(lerp(servicesY,servicesY+510,(f-321)/(389-321)));

    // Scene 04, 00:17-00:25: actual mobile details/select behavior.
    if(f>=390 && f<=464)await scroll(lerp(servicesY+510,segmentY,(f-390)/(464-390)));
    if(f===465)secondY=Math.max(0,(await absTop('#segmentos .sector-option:nth-child(2) summary'))-vh*.59);
    if(f>=465 && f<=508)await scroll(lerp(segmentY,secondY,(f-465)/(508-465)));
    if(f===511)await tapIfVisible('#segmentos .sector-option:nth-child(2) summary',f,'select-second-sector');
    if(f===553) {
      // Slow native scroll to show the revealed description; no invented behavior.
      const second=await absTop('#segmentos .sector-option:nth-child(2) .sector-description');
      secondY=Math.max(0,second-vh*.30);
      galleryStart=await page.evaluate(()=>scrollY);
    }
    if(f>=554 && f<=607)await scroll(lerp(galleryStart,secondY,(f-554)/(607-554)));

    // Scene 05, 00:25-00:32: arc gallery with native touch controls.
    if(f===630) {
      galleryStart=await page.evaluate(()=>scrollY);
      galleryY=Math.max(0,await absTop('#projetos')-35);
    }
    if(f>=630 && f<=715)await scroll(lerp(galleryStart,galleryY,(f-630)/(715-630)));
    if(f===743)await tapIfVisible('#projetos [data-circular-next]',f,'next-gallery-image');
    if(f===787)await tapIfVisible('#projetos [data-circular-next]',f,'next-gallery-image');

    const file=join(framesDir,'frame-'+String(f+1).padStart(4,'0')+'.jpg');
    await page.screenshot({path:file,type:'jpeg',quality:90,animations:'allow'});
    if(f%120===0)console.log('Captured frame',f+1,'/',total);
  }
} finally {
  await writeFile(join(publicDir,'touches.json'),JSON.stringify(touches,null,2));
  await writeFile(join(root,'capture-report.json'),JSON.stringify({
    source:url,branch:'feat/ykeizumi-redesign-unificado-20261027',
    viewport:sample.viewport,videoStatus,sourceComponents:sample,
    captures:total,fps:30,touches,errors
  },null,2));
  await browser.close();
}
const ffmpeg=spawnSync('ffmpeg',[
 '-hide_banner','-loglevel','error','-y',
 '-framerate','30','-i',join(framesDir,'frame-%04d.jpg'),
 '-c:v','libx264','-preset','medium','-crf','18',
 '-pix_fmt','yuv420p','-r','30','-movflags','+faststart',
 join(publicDir,'mobile-capture.mp4')
],{stdio:'inherit',timeout:300000});
if(ffmpeg.status!==0)throw Error('ffmpeg capture failed: '+JSON.stringify({status:ffmpeg.status,signal:ffmpeg.signal,error:String(ffmpeg.error||'none'),stderr:ffmpeg.stderr?.toString().slice(-3000)}));
if(errors.some(e=>e.startsWith('PAGE ERROR')||e.startsWith('HTTP')))throw Error('Page error(s): '+JSON.stringify(errors));
if(!touches.some(t=>t.purpose==='open-mobile-menu')||!touches.some(t=>t.purpose==='select-second-sector')) {
 throw Error('Essential native mobile interactions were not captured: '+JSON.stringify(touches));
}
console.log('Browser capture complete:',JSON.stringify({videoStatus,touches,errors}));
