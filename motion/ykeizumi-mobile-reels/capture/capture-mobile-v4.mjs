/**
 * Math Brands — Ykeizumi original mobile interaction capture for V4.
 * Production website remains immutable. This captures its real DOM, images,
 * text, video, native details, menu and circular gallery from local build.
 * Frames: 704 (23.467s), inserted at composition frame 136 (28s total).
 */
import {chromium} from 'playwright';
import {mkdir, rm, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const framesDir=join(root,'frames-v4');
const publicDir=join(root,'public');
const frames=704, vw=390, vh=844, dpr=3, fps=30;
const site=process.env.SITE_URL||'http://127.0.0.1:4173/';
await rm(framesDir,{recursive:true,force:true});
await mkdir(framesDir,{recursive:true});
await mkdir(publicDir,{recursive:true});
const browser=await chromium.launch({
  headless:true,args:['--autoplay-policy=no-user-gesture-required',
    '--disable-background-timer-throttling']
});
const ctx=await browser.newContext({
  viewport:{width:vw,height:vh},deviceScaleFactor:dpr,isMobile:true,
  hasTouch:true,colorScheme:'light',reducedMotion:'no-preference',
  serviceWorkers:'block'
});
const page=await ctx.newPage();
const errors=[], touches=[];
page.on('pageerror',e=>errors.push('PAGE ERROR '+e.message));
page.on('response',r=>{
  if(r.status()>=400&&new URL(r.url()).host==='127.0.0.1:4173'){
    errors.push('HTTP '+r.status()+' '+r.url());
  }
});
await page.goto(site,{waitUntil:'networkidle',timeout:60000});
await page.waitForSelector('.ha-mobile-menu summary');
await page.waitForSelector('#segmentos .sector-option summary');
await page.waitForSelector('#projetos .circular-gallery');

// Deliberate V3 correction retained: ONLY the local capture browser hides
// the giant sector photo. The production site and its git CSS are untouched.
await page.addStyleTag({content:[
  '#segmentos .sector-description figure {display:none !important;}',
  '#segmentos .sector-stage {display:none !important;}',
  '#segmentos .sector-showcase {min-height:0 !important;}',
  '#segmentos .sector-description > p {margin:0 0 1.4rem 0 !important;}'
].join('\n')});
await page.waitForFunction(()=>{
  const v=document.querySelector('.ha-video');
  return v&&v.readyState>=2&&!v.paused&&v.videoWidth>0;
},{timeout:30000});
const videoStatus=await page.locator('.ha-video').evaluate(v=>({
  src:v.currentSrc,videoWidth:v.videoWidth,videoHeight:v.videoHeight,
  paused:v.paused
}));
const components=await page.evaluate(()=>({
  viewport:{w:innerWidth,h:innerHeight,dpr:devicePixelRatio},
  heroTitle:document.querySelector('.ha-title')?.textContent,
  services:document.querySelectorAll('.home-service').length,
  accordions:document.querySelectorAll('#segmentos .sector-option').length,
  gallery:document.querySelectorAll('#projetos .circular-card').length,
  hiddenPhoto:[...document.querySelectorAll('#segmentos .sector-description figure')]
    .every(el=>getComputedStyle(el).display==='none')
}));
if(components.viewport.w!==vw||components.viewport.h!==vh||
   components.viewport.dpr!==dpr||components.accordions<3||
   components.gallery<3||!components.hiddenPhoto){
  throw Error('Source DOM/viewport/photo verification failed: '+JSON.stringify(components));
}
const absTop=sel=>page.locator(sel).first().evaluate(el=>
  el.getBoundingClientRect().top+scrollY);
const instantScroll=y=>page.evaluate(y=>scrollTo({top:Math.max(0,y),behavior:'instant'}),y);
const clamp=t=>Math.max(0,Math.min(1,t));
const smoother=t=>{t=clamp(t);return t*t*t*(t*(t*6-15)+10);};
const lerp=(a,b,t)=>a+(b-a)*smoother(t);

// Hermite scroll with continuous velocity through intro/services/green section.
// Zero endpoint slope, no "stop-and-restart" at individual sections.
function scrollSpline(f,points){
  if(f<=points[0][0])return points[0][1];
  const last=points.length-1;
  if(f>=points[last][0])return points[last][1];
  let i=0;while(i<last-1&&f>points[i+1][0])i++;
  const [t0,y0]=points[i],[t1,y1]=points[i+1],dt=t1-t0;
  const slope=j=>{
    if(j===0||j===last)return 0;
    return Math.max(0,(points[j+1][1]-points[j-1][1])/
      (points[j+1][0]-points[j-1][0]));
  };
  const t=(f-t0)/dt,t2=t*t,t3=t2*t;
  return (2*t3-3*t2+1)*y0+(t3-2*t2+t)*dt*slope(i)+
    (-2*t3+3*t2)*y1+(t3-t2)*dt*slope(i+1);
}
async function tapVisible(selector,frame,purpose){
  const rect=await page.locator(selector).first().boundingBox();
  if(!rect||rect.x<0||rect.y<6||rect.x+rect.width>vw||
    rect.y+rect.height>vh-8){
    errors.push('Touch not visible '+purpose+' '+JSON.stringify(rect));
    return false;
  }
  const x=Math.round(Math.min(vw-10,Math.max(10,rect.x+rect.width/2)));
  const y=Math.round(Math.min(vh-10,Math.max(10,rect.y+rect.height/2)));
  await page.touchscreen.tap(x,y);
  touches.push({frame,x,y,purpose});
  return true;
}
const introY=Math.max(0,await absTop('#introducao')-75);
const servicesY=Math.max(0,await absTop('#servicos-home')-20);
const segmentY=Math.max(0,await absTop('#segmentos')-10);
const points=[[126,0],[189,introY],[223,servicesY],
  [264,servicesY+490],[320,segmentY]];
const waypoints={introY,servicesY,segmentY,scrollPoints:points};
let start=segmentY,secondY=segmentY,thirdY=segmentY;
let galleryStart=segmentY,galleryY=segmentY;
try{
  for(let f=0;f<frames;f++){
    if(f===45)await tapVisible('.ha-mobile-menu summary',f,'menu-open');
    if(f===80)await tapVisible('.ha-mobile-menu summary',f,'menu-close');

    if(f>=126&&f<=320)await instantScroll(scrollSpline(f,points));

    if(f===321){
      start=await page.evaluate(()=>scrollY);
      secondY=Math.max(0,await absTop('#segmentos .sector-option:nth-child(2) summary')-vh*.54);
    }
    if(f>=322&&f<=336)await instantScroll(lerp(start,secondY,(f-322)/14));
    if(f===342)await tapVisible('#segmentos .sector-option:nth-child(2) summary',f,'sector-second');

    if(f===374){
      start=await page.evaluate(()=>scrollY);
      thirdY=Math.max(0,await absTop('#segmentos .sector-option:nth-child(3) summary')-vh*.54);
    }
    if(f>=375&&f<=394)await instantScroll(lerp(start,thirdY,(f-375)/19));
    if(f===402)await tapVisible('#segmentos .sector-option:nth-child(3) summary',f,'sector-third');

    if(f===421){
      start=await page.evaluate(()=>scrollY);
      thirdY=Math.max(0,await absTop('#segmentos .sector-option:nth-child(3) .sector-description')-vh*.38);
    }
    if(f>=422&&f<=461)await instantScroll(lerp(start,thirdY,(f-422)/39));

    if(f===467){
      galleryStart=await page.evaluate(()=>scrollY);
      galleryY=Math.max(0,await absTop('#projetos')-16);
      waypoints.galleryY=galleryY;
    }
    if(f>=468&&f<=605){
      await instantScroll(lerp(galleryStart,galleryY,(f-468)/137));
    }
    if(f===622)await tapVisible('#projetos [data-circular-next]',f,'gallery-next-1');
    if(f===660)await tapVisible('#projetos [data-circular-next]',f,'gallery-next-2');

    const image=join(framesDir,'frame-'+String(f+1).padStart(4,'0')+'.jpg');
    await page.screenshot({path:image,type:'jpeg',quality:92,animations:'allow'});
    if(f%100===0)console.log('V4 capture frame '+(f+1)+'/'+frames);
  }
}finally{
  await writeFile(join(publicDir,'touches-v4.json'),JSON.stringify(touches,null,2));
  await writeFile(join(root,'capture-report-v4.json'),JSON.stringify({
    source:site,sourceBranch:'feat/ykeizumi-mobile-reels-v3-premium',
    viewport:components.viewport,sourceComponents:components,
    videoStatus,captures:frames,fps,touches,waypoints,
    imageSuppressedOnlyInCapture:components.hiddenPhoto,errors
  },null,2));
  await browser.close();
}
const encoded=spawnSync('ffmpeg',[
  '-hide_banner','-loglevel','error','-y','-framerate',String(fps),
  '-i',join(framesDir,'frame-%04d.jpg'),
  '-c:v','libx264','-preset','fast','-crf','17',
  '-pix_fmt','yuv420p','-r',String(fps),'-movflags','+faststart',
  join(publicDir,'mobile-capture-v4.mp4')
],{stdio:'inherit',timeout:600000});
if(encoded.status!==0)throw Error('V4 capture encode failed: '+String(encoded.error||encoded.status));
if(errors.some(e=>e.startsWith('PAGE ERROR')||e.startsWith('HTTP'))){
  throw Error('V4 page errors: '+JSON.stringify(errors));
}
const required=['menu-open','menu-close','sector-second','sector-third',
  'gallery-next-1','gallery-next-2'];
if(required.some(p=>!touches.some(t=>t.purpose===p))){
  throw Error('Missing native interaction: '+JSON.stringify({touches,errors}));
}
console.log('V4 source capture validated: '+JSON.stringify({touches,components,errors}));
