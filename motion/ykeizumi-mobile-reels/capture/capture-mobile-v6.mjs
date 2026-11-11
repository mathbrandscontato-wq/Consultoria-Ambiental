/**
 * Math Brands — Ykeizumi V6 real mobile interaction capture.
 * Production website remains immutable. This captures its real DOM, images,
 * text, video, native details, menu and circular gallery from local build.
 * Frames: 756 (25.2s), inserted at composition frame 234 (33s total).
 */
import {chromium} from 'playwright';
import {mkdir, rm, readFile, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const framesDir=join(root,'frames-v6');
const publicDir=join(root,'public');
const timeline=JSON.parse(await readFile(join(root,'timeline-v6.json'),'utf8'));
const frames=timeline.captureFrames, vw=390, vh=844, dpr=3, fps=timeline.fps;
if(frames!==756||fps!==30||timeline.totalFrames!==990||timeline.captureStart!==234)throw Error('Invalid V6 frame config');
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
  'html,body,button,a,summary,*{-webkit-tap-highlight-color:transparent !important;}',
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
const layerDir=join(publicDir,'v6-layers');
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
 ['galleryTitle','#projetos .project-section-head h2']
];
const layers={},scrollTrack=[],stateTrack=[],galleryTitleYTrack=[],galleryStates=[];
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
 layers[id]={file:'v6-layers/'+id+'.png',x:box.x,absY:box.y+scroll,
  w:box.w,h:box.h,text:detail.text,font:detail.font,lines:detail.lines};
 console.log('Native alpha layer',id,'pageY',layers[id].absY,'size',box.w,box.h);
}
await second.close();
if(layers.introHeading.lines.length<3)throw Error('Expected 3 original intro lines '+JSON.stringify(layers.introHeading.lines));
await page.addStyleTag({content:entries.map(e=>e[1]+'{visibility:hidden!important}').join('\n')});

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
  // Fritsch-Carlson monotone slopes: exact zero velocity on reading holds,
  // no spline overshoot/backtracking at repeated scroll coordinates.
  const slope=j=>{
    if(j===0||j===last)return 0;
    const h0=points[j][0]-points[j-1][0];
    const h1=points[j+1][0]-points[j][0];
    const d0=(points[j][1]-points[j-1][1])/h0;
    const d1=(points[j+1][1]-points[j][1])/h1;
    if(d0<=0||d1<=0)return 0;
    const w1=2*h1+h0,w2=h1+2*h0;
    return (w1+w2)/(w1/d0+w2/d1);
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
const waypoints={
 introY,servicesY,segmentY,
 galleryY:Math.max(0,await absTop('#projetos')-110),
 scrollPoints:timeline.scrollPlan
};
const anchors={
 top:0,
 intro:introY,
 servicesHeading:Math.max(0,servicesY-115),
 service1:servicesY+120,
 service2:servicesY+440,
 service3:servicesY+740,
 sectors:Math.max(0,segmentY-62),
 sectorThird:Math.max(0,segmentY-62),
 gallery:waypoints.galleryY
};
let keys=timeline.scrollPlan.map(([frame,name])=>[frame,anchors[name]]);
if(keys.some(([f,y])=>!Number.isFinite(f)||!Number.isFinite(y)))throw Error('Bad scroll anchors');
const events=timeline.events,gallery=timeline.gallery;
let galleryReady=false;
const quintic=t=>{t=clamp(t);return t*t*t*(t*(t*6-15)+10);};
function galleryPosition(f){
 const [a,b]=gallery.transitions;
 if(f<a[0])return gallery.initialIndex;
 if(f<=a[1])return a[2]+(a[3]-a[2])*quintic((f-a[0])/(a[1]-a[0]));
 if(f<b[0])return a[3];
 if(f<=b[1])return b[2]+(b[3]-b[2])*quintic((f-b[0])/(b[1]-b[0]));
 return b[3];
}
// Exact original CSS3D arc geometry and real DOM cards. The native touch
// button still selects the next real item; only video-frame transition
// timing is driven deterministically rather than variable capture wall time.
async function paintNativeGallery(position){
 return page.evaluate(position=>{
  const cards=[...document.querySelectorAll('#projetos .circular-card')];
  const radius=innerWidth<768?470:740;
  cards.forEach((card,i)=>{
    const d=i-position,angle=d*.48;
    const x=Math.sin(Math.max(-2.3,Math.min(2.3,angle)))*radius;
    const y=(1-Math.cos(angle))*105;
    const z=(Math.cos(angle)-1)*390;
    card.style.setProperty('transform','translateX(calc(-50% + '+x+'px)) translateY('+y+'px) translateZ('+z+'px) rotateY('+(-angle*24)+'deg)','important');
    card.style.setProperty('opacity',Math.abs(d)>2.8?'0':'1','important');
    card.style.setProperty('visibility',Math.abs(d)>2.8?'hidden':'visible','important');
    card.style.setProperty('z-index',String(20-Math.round(Math.abs(d)*3)),'important');
    card.classList.toggle('is-active',i===Math.round(position));
  });
  const active=cards[Math.round(position)];
  return {
    frameCard:Math.round(position),activeLabel:active?.querySelector('.project-card__footer span')?.textContent,
    visibleCards:cards.filter(x=>getComputedStyle(x).visibility!=='hidden').length,
    loaded:cards.every(x=>x.querySelector('img')?.complete && x.querySelector('img')?.naturalWidth>0)
  };
 },position);
}
try{
 for(let f=0;f<frames;f++){
  if(f===events.sectorSecond)await tapVisible('#segmentos .sector-option:nth-child(2) summary',f,'sector-second');
  if(f===events.sectorThird)await tapVisible('#segmentos .sector-option:nth-child(3) summary',f,'sector-third');

  if(f===431){
   anchors.sectorThird=Math.max(0,await absTop('#segmentos .sector-option:nth-child(3) summary')-vh*.52);
   keys=timeline.scrollPlan.map(([frame,name])=>[frame,anchors[name]]);
  }
  if(f===511){
   waypoints.galleryY=Math.max(0,await absTop('#projetos')-110);
   anchors.gallery=waypoints.galleryY;
   keys=timeline.scrollPlan.map(([frame,name])=>[frame,anchors[name]]);
  }
  await instantScroll(scrollSpline(f,keys));

  if(f===550){
   // Source remains genuine: resolve all six original image URLs before video
   // captures the gallery; never render a blank or pending image in the reel.
   await page.evaluate(async()=>{
    const images=[...document.querySelectorAll('#projetos .circular-card img')];
    for(const im of images){im.loading='eager';await im.decode();}
   });
   await page.waitForFunction(()=>{
     const cards=[...document.querySelectorAll('#projetos .circular-card')];
     return cards.length>=3&&cards.every(card=>card.querySelector('img')?.naturalWidth>0);
   },{timeout:30000});
   galleryReady=true;
  }
  if(f===events.galleryNext1){
   if(!galleryReady)throw Error('Gallery not loaded before first native interaction');
   await tapVisible('#projetos [data-circular-next]',f,'gallery-next-1');
  }
  if(f===events.galleryNext2)await tapVisible('#projetos [data-circular-next]',f,'gallery-next-2');
  let visibleGallery=null;
  if(f>=550)visibleGallery=await paintNativeGallery(galleryPosition(f));

  const state=await page.evaluate(()=>({
    scroll:scrollY,
    sector:[...document.querySelectorAll('#segmentos .sector-option')].map(x=>x.open),
    gallery:document.querySelector('#projetos .circular-status')?.textContent?.trim(),
    galleryTitleDocumentY:document.querySelector('#projetos .project-section-head h2')?.getBoundingClientRect().top+scrollY
  }));
  scrollTrack.push(state.scroll);
  galleryTitleYTrack.push(state.galleryTitleDocumentY);
  if([398,414,432,473,475,511,550,602,637,653,672,695,712,732,750].includes(f)){
   stateTrack.push({frame:f,...state,visibleGallery});
   if(visibleGallery)galleryStates.push({frame:f,...visibleGallery});
  }
  const imagePath=join(framesDir,'frame-'+String(f+1).padStart(4,'0')+'.jpg');
  await page.screenshot({path:imagePath,type:'jpeg',quality:94,animations:'allow'});
  if(f%120===0)console.log('V6 capture',f+1,'/',frames,'scroll',state.scroll);
 }
}finally{
  await writeFile(join(publicDir,'v6-layer-manifest.json'),JSON.stringify({
 version:'6.0',frames,offset:timeline.captureStart,viewport:components.viewport,fps,timeline,
 heroVideo,components,photoSuppressedOnlyInCapture:true,
 layers,scrollTrack,stateTrack,galleryTitleYTrack,galleryStates,video:videoStatus,touches,waypoints,errors
},null,2));
  await writeFile(join(publicDir,'touches-v6.json'),JSON.stringify(touches,null,2));
  await writeFile(join(root,'capture-report-v6.json'),JSON.stringify({
    source:site,sourceBranch:'feat/ykeizumi-mobile-reels-v5-2-polish',
    viewport:components.viewport,heroVideo,layers:Object.keys(layers),stateTrack,galleryStates,sourceComponents:components,
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
  join(publicDir,'mobile-capture-v6.mp4')
],{stdio:'inherit',timeout:600000});
if(encoded.status!==0)throw Error('V6 capture encode failed: '+String(encoded.error||encoded.status));
if(errors.some(e=>e.startsWith('PAGE ERROR')||e.startsWith('HTTP'))){
  throw Error('V6 page errors: '+JSON.stringify(errors));
}
if(!galleryReady)throw Error('Gallery never passed image decode validation');
if(touches.some(t=>t.purpose.startsWith('menu')))throw Error('V6 forbids opening mobile menu');
const required=['sector-second','sector-third','gallery-next-1','gallery-next-2'];
if(required.some(p=>!touches.some(t=>t.purpose===p))||galleryStates.length<4){
  throw Error('Missing native interaction: '+JSON.stringify({touches,errors}));
}
console.log('V6 source capture validated: '+JSON.stringify({touches,components,errors}));
