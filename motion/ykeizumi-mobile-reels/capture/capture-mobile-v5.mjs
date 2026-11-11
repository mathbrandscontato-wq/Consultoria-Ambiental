/**
 * Math Brands — Ykeizumi original mobile interaction capture for V5.1.
 * Production website remains immutable. This captures its real DOM, images,
 * text, video, native details, menu and circular gallery from local build.
 * Frames: 705 (23.500s), inserted at composition frame 135 (28s total).
 */
import {chromium} from 'playwright';
import {mkdir, rm, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const framesDir=join(root,'frames-v5');
const publicDir=join(root,'public');
const frames=705, vw=390, vh=844, dpr=3, fps=30;
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

/* Real DOM: the Hero video is a bounded region, not the page viewport. */
const heroVideo=await page.evaluate(()=>{
 const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};};
 const media=document.querySelector('.ha-media'),video=document.querySelector('.ha-video'),hero=document.querySelector('.ha');
 const geometry={video:rect(video),container:rect(media),hero:rect(hero),
   effectiveRadius:Math.max(parseFloat(getComputedStyle(hero).borderTopRightRadius)||0,
     parseFloat(getComputedStyle(media).borderTopRightRadius)||0)};
 if(['x','y','w','h'].some(k=>Math.abs(geometry.video[k]-geometry.container[k])>1) ||
   geometry.video.w>=innerWidth || geometry.video.h>=innerHeight || geometry.video.w<250 || geometry.video.h<350)
   throw Error('Invalid measured media rectangle '+JSON.stringify(geometry));
 return geometry;
});
console.log('ORIGINAL HERO VIDEO DOM RECTANGLE',JSON.stringify(heroVideo));
/* Separate browser for transparent source lettering, UI buttons and logo.
   Original DOM nodes are isolated on alpha; no text is re-typeset. */
const second=await ctx.newPage();
await second.goto(site,{waitUntil:'networkidle',timeout:60000});
await second.waitForSelector('#projetos .circular-gallery');
await second.addStyleTag({content:[
 '#segmentos .sector-description figure{display:none!important}',
 '#segmentos .sector-stage{display:none!important}',
 '#segmentos .sector-showcase{min-height:0!important}',
 'html:has(body.v5-isolate),body.v5-isolate{background:transparent!important}',
 'body.v5-isolate *{visibility:hidden!important}',
 'body.v5-isolate [data-v5-capture],body.v5-isolate [data-v5-capture] *{visibility:visible!important}',
 'body.v5-isolate .v5-ancestor{background:transparent!important;background-image:none!important;box-shadow:none!important;border-color:transparent!important}',
 'body.v5-isolate .v5-ancestor::before,body.v5-isolate .v5-ancestor::after{visibility:hidden!important}',
 '#introducao .scroll-word{opacity:1!important}',
 '.motion-word{opacity:1!important;transform:none!important}',
 '*,*::before,*::after{animation:none!important;transition:none!important}',
 '[data-reveal]{opacity:1!important;transform:none!important}'
].join('\n')});
await second.evaluate(async()=>document.fonts.ready);
const layerDir=join(publicDir,'v5-layers');
await rm(layerDir,{recursive:true,force:true});await mkdir(layerDir,{recursive:true});
const entries=[
 ['heroLogo','.ha-logo'],['heroTitle','.ha-main .ha-title'],
 ['heroSubtitle','.ha-main .ha-subtitle'],['heroDescription','.ha-main .ha-description'],
 ['heroCTA','.ha-main .ha-cta--services'],
 ['introHeading','#introducao .home-introduction h2'],
 ['introParagraph','#introducao .intro-support p'],['introLink','#introducao .intro-support a'],
 ['servicesHeading','#servicos-home .home-services-head h2'],
 ['servicesIntro','#servicos-home .home-services-head p'],
 ['service1Number','#servicos-home .home-service:nth-child(1) .service-number'],
 ['service1Body','#servicos-home .home-service:nth-child(1)>div'],
 ['service2Number','#servicos-home .home-service:nth-child(2) .service-number'],
 ['service2Body','#servicos-home .home-service:nth-child(2)>div'],
 ['service3Number','#servicos-home .home-service:nth-child(3) .service-number'],
 ['service3Body','#servicos-home .home-service:nth-child(3)>div'],
 ['galleryTitle','#projetos .project-section-head h2'],
 ['galleryFirstCard','#projetos .circular-card:nth-child(3)']
];
const layers={},scrollTrack=[],stateTrack=[];
for(const [id,selector] of entries){
 await second.evaluate(()=>{
  document.body.classList.remove('v5-isolate');
  document.querySelectorAll('[data-v5-capture]').forEach(el=>el.removeAttribute('data-v5-capture'));
  document.querySelectorAll('.v5-ancestor').forEach(el=>el.classList.remove('v5-ancestor'));
 });
 const loc=second.locator(selector).first();
 if(await loc.count()!==1)throw Error('Source DOM element not found '+selector);
 const top=await loc.evaluate(el=>el.getBoundingClientRect().top+scrollY);
 await second.evaluate(y=>scrollTo({top:Math.max(0,y),behavior:'instant'}),Math.max(0,top-155));
 await second.evaluate(()=>new Promise(ok=>requestAnimationFrame(()=>requestAnimationFrame(ok))));
 if(id==='galleryFirstCard')await second.waitForFunction(()=>{
  const im=document.querySelector('#projetos .circular-card:nth-child(3) img');
  return im?.complete&&im.naturalWidth>0;},{timeout:30000});
 let b=await loc.boundingBox();
 if(!b)throw Error('Element has no box '+id);
 if(b.y<0||b.y+b.height>vh){
  await second.evaluate(y=>scrollTo({top:Math.max(0,y),behavior:'instant'}),
    Math.max(0,top-Math.max(30,(vh-b.height)*.48)));
  await second.evaluate(()=>new Promise(ok=>requestAnimationFrame(ok)));
  b=await loc.boundingBox();
 }
 if(!b)throw Error('Element box vanished '+id);
 const box={x:Math.max(0,b.x),y:Math.max(0,b.y),
  w:Math.min(vw-Math.max(0,b.x),b.width-Math.max(0,-b.x)),
  h:Math.min(vh-Math.max(0,b.y),b.height-Math.max(0,-b.y))};
 if(box.w<1||box.h<1)throw Error('Invalid element crop '+id+' '+JSON.stringify(box));
 const detail=await loc.evaluate(el=>{
   const r=el.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(el);
   const groups=[];
   for(const q of range.getClientRects()){
    if(q.width<1||q.height<4)continue;
    let row=groups.find(g=>Math.abs(g.y-(q.y-r.y))<5);
    if(!row)groups.push({y:q.y-r.y,h:q.height});
    else {const top=Math.min(row.y,q.y-r.y),bottom=Math.max(row.y+row.h,q.y-r.y+q.height);
      row.y=top;row.h=bottom-top;}
   }
   return {text:el.textContent.trim(),font:getComputedStyle(el).fontFamily,
    lines:groups.sort((a,b)=>a.y-b.y)};
 });
 await second.evaluate(sel=>{
   const el=document.querySelector(sel);document.body.classList.add('v5-isolate');
   el.setAttribute('data-v5-capture','yes');
   let parent=el.parentElement;
   while(parent&&parent!==document.body){parent.classList.add('v5-ancestor');parent=parent.parentElement;}
 },selector);
 await second.evaluate(()=>new Promise(ok=>requestAnimationFrame(ok)));
 await second.screenshot({path:join(layerDir,id+'.png'),type:'png',omitBackground:true,
  clip:{x:box.x,y:box.y,width:box.w,height:box.h},animations:'disabled'});
 const scroll=await second.evaluate(()=>scrollY);
 layers[id]={file:'v5-layers/'+id+'.png',x:box.x,absY:box.y+scroll,
  w:box.w,h:box.h,text:detail.text,font:detail.font,lines:detail.lines};
 console.log('Native alpha layer',id,'pageY',layers[id].absY,'size',box.w,box.h);
}
await second.close();
if(layers.introHeading.lines.length<3)throw Error('Expected 3 original intro lines '+JSON.stringify(layers.introHeading.lines));
await page.addStyleTag({content:entries.filter(e=>e[0]!=='galleryFirstCard').map(e=>e[1]+'{visibility:hidden!important}').join('\n')});
const cardHide=await page.addStyleTag({content:'#projetos .circular-card:nth-child(3){visibility:hidden!important}'});

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
 const positions=[[144,0],[171,introY],[199,introY],[222,servicesY],
    [252,servicesY+430],[288,servicesY+910],[313,segmentY]];
 const spline=(f,k)=>{
  if(f<=k[0][0])return k[0][1];const n=k.length-1;
  if(f>=k[n][0])return k[n][1];let i=0;
  while(i<n-1&&f>k[i+1][0])i++;
  const [a,p0]=k[i],[b,p1]=k[i+1],dt=b-a,t=(f-a)/dt,t2=t*t,t3=t2*t;
  const m=j=>j===0||j===n?0:Math.max(0,(k[j+1][1]-k[j-1][1])/(k[j+1][0]-k[j-1][0]));
  return (2*t3-3*t2+1)*p0+(t3-2*t2+t)*dt*m(i)+(-2*t3+3*t2)*p1+(t3-t2)*dt*m(i+1);
 };
 let anchor=0,destination=0;
 for(let f=0;f<frames;f++){
  if(f===114)await tapVisible('.ha-mobile-menu summary',f,'menu-open');
  if(f===141)await tapVisible('.ha-mobile-menu summary',f,'menu-close');
  if(f>=144&&f<=313)await instantScroll(spline(f,positions));
  if(f===324){anchor=await page.evaluate(()=>scrollY);
    destination=Math.max(0,await absTop('#segmentos .sector-option:nth-child(2) summary')-vh*.53);}
  if(f>=325&&f<=343)await instantScroll(lerp(anchor,destination,(f-325)/18));
  if(f===355)await tapVisible('#segmentos .sector-option:nth-child(2) summary',f,'sector-second');
  if(f===385){anchor=await page.evaluate(()=>scrollY);
    destination=Math.max(0,await absTop('#segmentos .sector-option:nth-child(3) summary')-vh*.52);}
  if(f>=386&&f<=410)await instantScroll(lerp(anchor,destination,(f-386)/24));
  if(f===421)await tapVisible('#segmentos .sector-option:nth-child(3) summary',f,'sector-third');
  if(f===450){galleryStart=await page.evaluate(()=>scrollY);
    galleryY=Math.max(0,await absTop('#projetos')-16);waypoints.galleryY=galleryY;}
  if(f>=451&&f<=529)await instantScroll(lerp(galleryStart,galleryY,(f-451)/78));
  if(f===594)await cardHide.evaluate(el=>el.remove());
  if(f===611)await tapVisible('#projetos [data-circular-next]',f,'gallery-next-1');
  if(f===665)await tapVisible('#projetos [data-circular-next]',f,'gallery-next-2');
  if(f>=611&&f<695)await page.evaluate(()=>new Promise(ok=>requestAnimationFrame(ok)));
  const state=await page.evaluate(()=>({scroll:scrollY,
    sector:[...document.querySelectorAll('#segmentos .sector-option')].map(x=>x.open),
    gallery:document.querySelector('#projetos .circular-status')?.textContent?.trim()}));
  scrollTrack.push(state.scroll);
  if([354,356,420,422,610,650,680].includes(f))stateTrack.push({frame:f,...state});
  const path=join(framesDir,'frame-'+String(f+1).padStart(4,'0')+'.jpg');
  await page.screenshot({path,type:'jpeg',quality:94,animations:'allow'});
  if(f%120===0)console.log('V5 capture',f+1,'/',frames,'scroll',state.scroll);
 }
}finally{
  await writeFile(join(publicDir,'v5-layer-manifest.json'),JSON.stringify({
 version:'5.1',frames,offset:135,viewport:components.viewport,fps,
 heroVideo,components,photoSuppressedOnlyInCapture:true,
 layers,scrollTrack,stateTrack,video:videoStatus,touches,waypoints,errors
},null,2));
  await writeFile(join(publicDir,'touches-v5.json'),JSON.stringify(touches,null,2));
  await writeFile(join(root,'capture-report-v5.json'),JSON.stringify({
    source:site,sourceBranch:'feat/ykeizumi-mobile-reels-v4-directors-cut',
    viewport:components.viewport,heroVideo,layers:Object.keys(layers),stateTrack,sourceComponents:components,
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
  join(publicDir,'mobile-capture-v5.mp4')
],{stdio:'inherit',timeout:600000});
if(encoded.status!==0)throw Error('V5.1 capture encode failed: '+String(encoded.error||encoded.status));
if(errors.some(e=>e.startsWith('PAGE ERROR')||e.startsWith('HTTP'))){
  throw Error('V5.1 page errors: '+JSON.stringify(errors));
}
const required=['menu-open','menu-close','sector-second','sector-third',
  'gallery-next-1','gallery-next-2'];
if(required.some(p=>!touches.some(t=>t.purpose===p))){
  throw Error('Missing native interaction: '+JSON.stringify({touches,errors}));
}
console.log('V5.1 source capture validated: '+JSON.stringify({touches,components,errors}));
