/**
 * Ykeizumi | V6 Search to Experience: message-field to measured SVG Hero and real DOM layers.
 * One 990-frame composition at 30FPS. No site source files modified.
 */
import React from 'react';
import {
 AbsoluteFill, Composition, Easing, Img, interpolate,
 OffthreadVideo, Sequence, registerRoot, staticFile, useCurrentFrame
} from 'remotion';
import manifest from '../public/v6-layer-manifest.json';
import timeline from '../timeline-v6.json';
import {SearchIntro} from './SearchIntro';
import {SearchToHeroTransition} from './SearchToHeroTransition';
const WIDTH=1080,HEIGHT=1920,FPS=timeline.fps,FRAMES=timeline.totalFrames,START=timeline.captureStart;
if(FRAMES!==990||FPS!==30||timeline.captureFrames!==756||START!==234)throw Error('V6 timeline mismatch');
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
 layers?:Record<string,Layer>;scrollTrack?:number[];galleryTitleYTrack?:number[]};
const data=manifest as Manifest;
function realHeroRect():Rect{
 const v=data.heroVideo?.video;
 if(!v)throw Error('V6 requires measured source DOM. Run capture-mobile-v5 capture script first.');
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
  scale:track([[234,1],[294,1.016],[350,1.022],[434,1.019],
    [500,1.024],[598,1.018],[677,1.022],[766,1.02],
    [863,1.014],[944,1.012],[989,1.006]],f),
  x:track([[234,0],[315,-3],[418,2],[525,-3],[652,3],[800,-2],[989,0]],f),
  y:track([[234,0],[348,-8],[475,-10],[590,-13],[736,-9],[884,-12],[989,-8]],f)
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
 const p=enter(f,from,to),y=(dynamicY??l.absY)-scroll+(line?.y||0);
 const lineY=Math.max(0,line?.y||0);
 const h=line?Math.min(l.h-lineY,line.h+2):l.h;
 return <div style={{position:'absolute',left:l.x,top:y,width:l.w,height:h,
   overflow:'hidden',pointerEvents:'none',opacity:p,
   transform:'translateY('+((1-p)*9)+'px)',
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
function SiteViewport({f}:{f:number}){
 const cam=camera(f),hero=realHeroRect(),t=smooth(234,252,f);
 const top=hero.y-STAGE.y,left=hero.x-STAGE.x;
 const right=STAGE.w-left-hero.w,bottom=STAGE.h-top-hero.h;
 const clip='inset('+round(mix(top,0,t))+'px '+round(mix(right,0,t))+'px '+
   round(mix(bottom,0,t))+'px '+round(mix(left,0,t))+'px round '+
   round(mix(hero.r,0,t))+'px)';
 return <div style={{position:'absolute',left:STAGE.x,top:STAGE.y,
   width:STAGE.w,height:STAGE.h,borderRadius:18,overflow:'hidden',
   background:'#ffffff',clipPath:clip,transformOrigin:'50% 50%',
   transform:'translate('+cam.x+'px,'+cam.y+'px) scale('+cam.scale+')',
   opacity:smooth(234,245,f)}}>
   <Sequence from={START} durationInFrames={FRAMES-START}>
    <OffthreadVideo src={staticFile('mobile-capture-v6.mp4')} muted
     style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
   </Sequence>
   <div style={{position:'absolute',left:0,top:0,width:390,height:844,
     transform:'scale('+SX+','+SY+')',transformOrigin:'top left',
     overflow:'visible',pointerEvents:'none'}}>
     <NativeWords f={f}/>
   </div>
 </div>;
}
function V6(){
 const frame=useCurrentFrame();
 const hero=realHeroRect();
 return <AbsoluteFill style={{backgroundColor:'#ffffff',overflow:'hidden'}}>
  <SearchToHeroTransition frame={frame} hero={hero}/>
  {frame<119&&<SearchIntro frame={frame}/>}
  {frame>=234&&<SiteViewport f={frame}/>}
 </AbsoluteFill>;
}
export const YkeizumiMobileReels=V6;
export function RemotionRoot(){
 return <Composition id="YkeizumiMobileReels" component={YkeizumiMobileReels}
  width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={FRAMES}/>;
}
registerRoot(RemotionRoot);
