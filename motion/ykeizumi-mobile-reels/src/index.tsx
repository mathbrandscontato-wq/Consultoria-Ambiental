/**
 * Ykeizumi | Full-Bleed Cinematic Flow V6.3.
 * Single source mobile layout, uniformly scaled to fill all 1080px horizontally.
 * Text and sections are REAL DOM rendered in capture, never duplicated or masked.
 * The site published for the client is untouched.
 */
import React from 'react';
import {
  AbsoluteFill, Composition, Easing, OffthreadVideo, Sequence,
  registerRoot, staticFile, useCurrentFrame
} from 'remotion';
import manifest from '../public/v6-3-layer-manifest.json';
import timeline from '../timeline-v6-3.json';
import {SearchIntro} from './SearchIntro';
import {SearchToHeroTransition} from './SearchToHeroTransition';
const W=1080,H=1920,FPS=30,FRAMES=990,START=190;
if(timeline.fps!==FPS||timeline.totalFrames!==FRAMES||timeline.captureFrames!==800||
   timeline.captureStart!==START||timeline.version!=='6.3'){
  throw Error('V6.3 timing / source mismatch');
}
// Actual source: 390x844 CSS px. Uniform fit-to-width is the only valid
// full-bleed scale; do NOT scale 390x844 independently to 1080x1920.
const SOURCE={w:390,h:844};
const Z=W/SOURCE.w;
const STAGE={x:0,y:0,w:W,h:SOURCE.h*Z};
const data=manifest as {
 heroVideo?:{video:{x:number;y:number;w:number;h:number};effectiveRadius:number};
 touches?:Array<{frame:number;x:number;y:number;purpose:string}>;
 scrollTrack?:number[];
};
type Rect={x:number;y:number;w:number;h:number;r:number};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const smooth=(a:number,b:number,f:number)=>{
 const t=clamp((f-a)/(b-a));return t*t*(3-2*t);
};
const num=(n:number)=>Number(n.toFixed(3));
function realHeroRect():Rect{
 const v=data.heroVideo?.video;
 if(!v)throw Error('Missing V6.3 genuine measured Hero geometry');
 return {x:v.x*Z,y:v.y*Z,w:v.w*Z,h:v.h*Z,
   r:(data.heroVideo?.effectiveRadius||0)*Z};
}
function NativeTouchHints({f}:{f:number}){
 const touches=data.touches||[];
 return <>{touches.filter(t=>t.purpose.startsWith('sector-')).map(t=>{
  const age=f-START-t.frame;
  if(age< -5||age>13)return null;
  const p=smooth(-5,0,age),gone=smooth(3,13,age);
  return <div key={t.purpose} style={{
   position:'absolute',left:t.x-10,top:t.y-10,
   width:20,height:20,borderRadius:'50%',
   border:'1px solid rgba(255,255,255,.85)',
   background:'rgba(255,255,255,.12)',
   opacity:p*(1-gone),transform:'scale('+(0.8+.22*p+.13*smooth(0,13,age))+')',
   pointerEvents:'none'
  }}/>;
 })}</>;
}
function SiteViewport({f}:{f:number}){
 const hero=realHeroRect();
 // Editorial micro-motion is strictly vertical; no horizontal stage crops,
 // no artificial phone frame and no empty margins.
 const drift=-2.8*smooth(START,400,f)+1.2*smooth(645,990,f);
 const enter=smooth(190,207,f);
 const originClipTop=hero.y,originClipLeft=hero.x;
 const right=STAGE.w-hero.x-hero.w;
 const bottom=STAGE.h-hero.y-hero.h;
 const clip='inset('+
  num((1-enter)*originClipTop)+'px '+
  num((1-enter)*right)+'px '+
  num((1-enter)*bottom)+'px '+
  num((1-enter)*originClipLeft)+'px round '+
  num((1-enter)*hero.r)+'px)';
 return <div style={{
  position:'absolute',left:0,top:drift,width:STAGE.w,height:STAGE.h,
  overflow:'hidden',background:'#ffffff',clipPath:clip,
  transformOrigin:'top center',opacity:smooth(190,202,f)
 }}>
  <Sequence from={START} durationInFrames={FRAMES-START}>
   <OffthreadVideo src={staticFile('mobile-capture-v6-3.mp4')} muted
    style={{position:'absolute',inset:0,width:'100%',height:'100%',
      objectFit:'fill'}}/>
  </Sequence>
  <div style={{position:'absolute',inset:0,width:SOURCE.w,height:SOURCE.h,
   transform:'scale('+Z+')',transformOrigin:'top left',pointerEvents:'none'}}>
   <NativeTouchHints f={f}/>
  </div>
 </div>;
}
function Reel(){
 const f=useCurrentFrame(),hero=realHeroRect();
 return <AbsoluteFill style={{background:'#ffffff',overflow:'hidden'}}>
  <SearchToHeroTransition frame={f} hero={hero}/>
  {f<105&&<SearchIntro frame={f}/>}
  {f>=START&&<SiteViewport f={f}/>}
 </AbsoluteFill>;
}
export const YkeizumiMobileReels=Reel;
export function RemotionRoot(){
 return <Composition id="YkeizumiMobileReels" component={YkeizumiMobileReels}
  width={W} height={H} fps={FPS} durationInFrames={FRAMES}/>;
}
registerRoot(RemotionRoot);
