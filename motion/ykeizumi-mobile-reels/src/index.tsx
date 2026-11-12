/**
 * Ykeizumi | V6.1 Directors Polish: message-field to measured SVG Hero and real DOM layers.
 * One 990-frame composition at 30FPS. No site source files modified.
 */
import React from 'react';
import {
 AbsoluteFill, Composition, Easing, Img, interpolate,
 OffthreadVideo, Sequence, registerRoot, staticFile, useCurrentFrame
} from 'remotion';
import manifest from '../public/v6-1-layer-manifest.json';
import timeline from '../timeline-v6-1.json';
import {SearchIntro} from './SearchIntro';
import {SearchToHeroTransition} from './SearchToHeroTransition';
const WIDTH=1080,HEIGHT=1920,FPS=timeline.fps,FRAMES=timeline.totalFrames,START=timeline.captureStart;
if(FRAMES!==990||FPS!==30||timeline.captureFrames!==800||START!==190)throw Error('V6 timeline mismatch');
const STAGE={x:85,y:-25,w:910,h:1970};
const SX=STAGE.w/390,SY=STAGE.h/844;
const CLAMP={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const smooth=(a:number,b:number,f:number)=>{
 const t=clamp((f-a)/(b-a));return t*t*t*(t*(t*6-15)+10);
};
const easing=Easing.bezier(0.16,1,0.3,1);
const enter=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...CLAMP,easing});
const round=(n:number)=>Number(n.toFixed(3));
type Rect={x:number;y:number;w:number;h:number;r:number};
type Layer={file:string;x:number;absY:number;w:number;h:number;text?:string;lines?:Array<{y:number;h:number}>};
type Manifest={heroVideo?:{video:{x:number;y:number;w:number;h:number};effectiveRadius:number};
 layers?:Record<string,Layer>;scrollTrack?:number[];galleryTitleYTrack?:number[];touches?:Array<{frame:number;x:number;y:number;purpose:string}>};
const data=manifest as Manifest;
function realHeroRect():Rect{
 const v=data.heroVideo?.video;
 if(!v)throw Error('V6 requires measured source DOM. Run capture-mobile-v6-1 capture script first.');
 return {x:STAGE.x+v.x*SX,y:STAGE.y+v.y*SY,w:v.w*SX,h:v.h*SY,
   r:(data.heroVideo?.effectiveRadius||0)*SX};
}
// Continuous Hermite motion track, preserving V4's subtle editorial camera.
function track(keys:readonly (readonly[number,number])[],f:number):number{
 if(f<=keys[0][0])return keys[0][1];
 const last=keys.length-1;if(f>=keys[last][0])return keys[last][1];
 let i=0;while(i<last-1&&f>keys[i+1][0])i++;
 const [a,v0]=keys[i],[b,v1]=keys[i+1],d=b-a,t=(f-a)/d,t2=t*t,t3=t2*t;
 const slope=(j:number)=>j===0||j===last?0:
  (keys[j+1][1]-keys[j-1][1])/(keys[j+1][0]-keys[j-1][0]);
 return (2*t3-3*t2+1)*v0+(t3-2*t2+t)*d*slope(i)+(-2*t3+3*t2)*v1+(t3-t2)*d*slope(i+1);
}
function camera(f:number){
 return {
  scale:track([[190,1],[270,1.015],[310,1.022],[405,1.018],
    [485,1.021],[599,1.018],[695,1.022],[800,1.02],
    [894,1.013],[951,1.019],[989,1.018]],f),
  x:track([[190,0],[305,-2],[416,2],[526,-3],[662,3],[805,-2],[989,0]],f),
  y:track([[190,0],[335,-8],[472,-10],[590,-11],[734,-9],[895,-11],[989,-8]],f)
 };
}
// V6 timeline single source of truth for text, browser capture and output.
const timing:Record<string,[number,number]>=Object.fromEntries(
 Object.entries(timeline.reveals).filter(([key,value])=>
  !key.startsWith('introLine') && Array.isArray(value)
 )
) as Record<string,[number,number]>;
function sourceScroll(f:number):number{
 const t=data.scrollTrack||[];
 return t[Math.max(0,Math.min(t.length-1,f-START))]||0;
}
function NativeLayer({id,f,scroll,from,to,line}:{
 id:string;f:number;scroll:number;from:number;to:number;line?:{y:number;h:number}
}){
 const l=data.layers?.[id];if(!l||f<from)return null;
 const dynamicY=id==='galleryTitle'?data.galleryTitleYTrack?.[Math.max(0,Math.min((data.galleryTitleYTrack?.length||1)-1,f-START))]:undefined;
 const p=enter(f,from,to);
 const lineY=line?Math.max(0,line.y-2):0;
 const h=line?Math.min(l.h-lineY,line.y+line.h+2-lineY):l.h;
 const fy=(dynamicY??l.absY)-scroll+lineY;
 // Pure geometry reveal: no opacity fade. This prevents gray ghosts and
 // semi-transparent source glyphs against the original video background.
 return <div style={{position:'absolute',left:l.x,top:fy,width:l.w,height:h,
   overflow:'hidden',pointerEvents:'none',opacity:1,
   transform:'translateY('+((1-p)*(line?6:9))+'px)',
   clipPath:'inset(0 0 '+Math.max(0,(1-p)*100)+'% 0)'}}>
   <Img src={staticFile(l.file)} style={{position:'absolute',left:0,
     top:line?-lineY:0,width:l.w,height:l.h,maxWidth:'none'}}/>
 </div>;
}
function NativeWords({f}:{f:number}){
 const scroll=sourceScroll(f);
 const lines=data.layers?.introHeading?.lines||[];
 return <>
 {Object.entries(timing).map(([id,[from,to]])=>{
  return <NativeLayer key={id} id={id} f={f} from={from} to={to} scroll={scroll}/>;
 })}
 {lines.slice(0,3).map((line,i)=><NativeLayer
   key={'original-line-'+i} id="introHeading" line={line}
   f={f} scroll={scroll} from={timeline.reveals.introLineStart+i*timeline.reveals.introLineStep} to={timeline.reveals.introLineStart+i*timeline.reveals.introLineStep+timeline.reveals.introLineDuration}/>)}
 </>;
}
function NativeTouchHints({f}:{f:number}){
 const touches=data.touches||[];
 return <>{touches.filter(t=>t.purpose.startsWith('sector-')).map(t=>{
  const age=f-START-t.frame;
  if(age< -6||age>14)return null;
  const born=smooth(-6,0,age),gone=smooth(4,14,age);
  const scale=.72+.3*born+.27*smooth(0,14,age);
  return <div key={t.purpose}
    style={{position:'absolute',left:t.x-13,top:t.y-13,width:26,height:26,
     border:'1.5px solid rgba(255,255,255,.94)',
     background:'rgba(245,250,247,.18)',borderRadius:'50%',
     opacity:born*(1-gone),transform:'scale('+scale+')',
     boxShadow:'0 0 0 2px rgba(23,50,38,.18)',
     pointerEvents:'none'}}/>;
 })}</>;
}
function SiteViewport({f}:{f:number}){
 const cam=camera(f),hero=realHeroRect(),t=smooth(190,205,f);
 const top=hero.y-STAGE.y,left=hero.x-STAGE.x;
 const right=STAGE.w-left-hero.w,bottom=STAGE.h-top-hero.h;
 const clip='inset('+round(mix(top,0,t))+'px '+round(mix(right,0,t))+'px '+
   round(mix(bottom,0,t))+'px '+round(mix(left,0,t))+'px round '+
   round(mix(hero.r,0,t))+'px)';
 return <div style={{position:'absolute',left:STAGE.x,top:STAGE.y,
   width:STAGE.w,height:STAGE.h,borderRadius:18,overflow:'hidden',
   background:'#ffffff',clipPath:clip,transformOrigin:'50% 50%',
   transform:'translate('+cam.x+'px,'+cam.y+'px) scale('+cam.scale+')',
   opacity:smooth(190,202,f)}}>
   <Sequence from={START} durationInFrames={FRAMES-START}>
    <OffthreadVideo src={staticFile('mobile-capture-v6-1.mp4')} muted
     style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
   </Sequence>
   <div style={{position:'absolute',left:0,top:0,width:390,height:844,
     transform:'scale('+SX+','+SY+')',transformOrigin:'top left',
     overflow:'visible',pointerEvents:'none'}}>
     <NativeWords f={f}/>
     <NativeTouchHints f={f}/>
   </div>
 </div>;
}
function V6(){
 const frame=useCurrentFrame();
 const hero=realHeroRect();
 return <AbsoluteFill style={{backgroundColor:'#ffffff',overflow:'hidden'}}>
  <SearchToHeroTransition frame={frame} hero={hero}/>
  {frame<103&&<SearchIntro frame={frame}/>}
  {frame>=START&&<SiteViewport f={frame}/>}
 </AbsoluteFill>;
}
export const YkeizumiMobileReels=V6;
export function RemotionRoot(){
 return <Composition id="YkeizumiMobileReels" component={YkeizumiMobileReels}
  width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={FRAMES}/>;
}
registerRoot(RemotionRoot);
