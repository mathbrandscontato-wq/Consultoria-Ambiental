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
const total = 760;
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
// Capture-only: remove oversized aerial photographs and their layout space.
// The published site and source CSS are completely unchanged.
await page.addStyleTag({content:[
 '#segmentos .sector-description figure {display:none !important;}',
 '#segmentos .sector-stage {display:none !important;}',
 '#segmentos .sector-showcase {min-height:0 !important;}',
 '#segmentos .sector-description > p {margin:0 0 1.4rem 0 !important;}'
].join('\n')});
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
 gallery:document.querySelectorAll('#projetos .circular-card').length,
 hiddenPhoto:[...document.querySelectorAll('#segmentos .sector-description figure')].every(el=>getComputedStyle(el).display==='none')
}));
if(sample.viewport.w!==390 || sample.viewport.h!==844)throw Error('Viewport mismatch: '+JSON.stringify(sample.viewport));
if(sample.accordions<3 || sample.gallery<3 || !sample.hiddenPhoto)throw Error('Required source components or capture-only photo removal missing: '+JSON.stringify(sample));
const touches=[];
const ease=(t)=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
const lerp=(a,b,t)=>a+(b-a)*ease(t);
const absTop=async(sel)=>page.locator(sel).first().evaluate(el=>el.getBoundingClientRect().top+scrollY);
const scroll=async(y)=>page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),Math.max(0,y));
const introY=Math.max(0,await absTop('#introducao')-75);
const servicesY=Math.max(0,await absTop('#servicos-home')-20);
const segmentY=Math.max(0,await absTop('#segmentos')-10);
let pathStart=segmentY,secondY=segmentY,thirdY=segmentY,galleryY=segmentY,galleryStart=segmentY;
const waypoints={introY,servicesY,segmentY};
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
    // Original Hero video and menu interaction; capture starts before the reveal.
    if(f===87)await tapIfVisible('.ha-mobile-menu summary',f,'menu-open');
    if(f===119)await tapIfVisible('.ha-mobile-menu summary',f,'menu-close');

    // One editorial scroll arc: introduction, service rows and the dark sector.
    if(f>=155&&f<=182)await scroll(lerp(0,introY,(f-155)/27));
    if(f>=183&&f<=208)await scroll(lerp(introY,servicesY,(f-183)/25));
    if(f>=209&&f<=246)await scroll(lerp(servicesY,servicesY+490,(f-209)/37));
    if(f>=247&&f<=306)await scroll(lerp(servicesY+490,segmentY,(f-247)/59));

    // Actual mobile details; two touches, photography suppressed ONLY in capture.
    if(f===335){pathStart=await page.evaluate(()=>scrollY);secondY=Math.max(0,await absTop('#segmentos .sector-option:nth-child(2) summary')-vh*.53);}
    if(f>=336&&f<=355)await scroll(lerp(pathStart,secondY,(f-336)/19));
    if(f===362)await tapIfVisible('#segmentos .sector-option:nth-child(2) summary',f,'sector-second');
    if(f===402){pathStart=await page.evaluate(()=>scrollY);thirdY=Math.max(0,await absTop('#segmentos .sector-option:nth-child(3) summary')-vh*.52);}
    if(f>=403&&f<=426)await scroll(lerp(pathStart,thirdY,(f-403)/23));
    if(f===435)await tapIfVisible('#segmentos .sector-option:nth-child(3) summary',f,'sector-third');
    if(f===455){pathStart=await page.evaluate(()=>scrollY);thirdY=Math.max(0,await absTop('#segmentos .sector-option:nth-child(3) .sector-description')-vh*.38);}
    if(f>=456&&f<=497)await scroll(lerp(pathStart,thirdY,(f-456)/41));

    // Continued native scroll into original responsive circular gallery.
    if(f===533){galleryStart=await page.evaluate(()=>scrollY);galleryY=Math.max(0,await absTop('#projetos')-16);waypoints.galleryY=galleryY;}
    if(f>=534&&f<=631)await scroll(lerp(galleryStart,galleryY,(f-534)/97));
    if(f===656)await tapIfVisible('#projetos [data-circular-next]',f,'gallery-next-1');
    if(f===695)await tapIfVisible('#projetos [data-circular-next]',f,'gallery-next-2');

    const file=join(framesDir,'frame-'+String(f+1).padStart(4,'0')+'.jpg');
    await page.screenshot({path:file,type:'jpeg',quality:92,animations:'allow'});
    if(f%120===0)console.log('Captured V3 frame',f+1,'/',total);
  }
} finally {
  await writeFile(join(publicDir,'touches-v3.json'),JSON.stringify(touches,null,2));
  await writeFile(join(root,'capture-report-v3.json'),JSON.stringify({
    source:url,branch:'feat/ykeizumi-redesign-unificado-20261027',
    viewport:sample.viewport,videoStatus,sourceComponents:sample,
    captures:total,fps:30,touches,waypoints,imageSuppressedOnlyInCapture:sample.hiddenPhoto,errors
  },null,2));
  await browser.close();
}
const ffmpeg=spawnSync('ffmpeg',[
 '-hide_banner','-loglevel','error','-y',
 '-framerate','30','-i',join(framesDir,'frame-%04d.jpg'),
 '-c:v','libx264','-preset','medium','-crf','18',
 '-pix_fmt','yuv420p','-r','30','-movflags','+faststart',
 join(publicDir,'mobile-capture-v3.mp4')
],{stdio:'inherit',timeout:300000});
if(ffmpeg.status!==0)throw Error('ffmpeg capture failed: '+JSON.stringify({status:ffmpeg.status,signal:ffmpeg.signal,error:String(ffmpeg.error||'none'),stderr:ffmpeg.stderr?.toString().slice(-3000)}));
if(errors.some(e=>e.startsWith('PAGE ERROR')||e.startsWith('HTTP')))throw Error('Page error(s): '+JSON.stringify(errors));
if(['menu-open','menu-close','sector-second','sector-third','gallery-next-1','gallery-next-2'].some(purpose=>!touches.some(t=>t.purpose===purpose))) {
 throw Error('Essential native mobile interactions were not captured: '+JSON.stringify(touches));
}
console.log('V3 browser capture complete:',JSON.stringify({videoStatus,touches,errors}));
