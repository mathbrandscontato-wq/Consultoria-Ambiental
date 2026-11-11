/**
 * Ykeizumi | Directors Cut V5.1: measured Hero video and real source DOM layers.
 * One 840-frame composition at 30FPS. No site source files modified.
 */
import React from 'react';
import {
 AbsoluteFill, Composition, Easing, Img, interpolate,
 OffthreadVideo, Sequence, registerRoot, staticFile, useCurrentFrame
} from 'remotion';
import manifest from '../public/v5-layer-manifest.json';
const WIDTH=1080,HEIGHT=1920,FPS=30,FRAMES=840,START=135;
const STAGE={x:85,y:-25,w:910,h:1970};
const SX=STAGE.w/390,SY=STAGE.h/844,GREEN='#1e3b2d';
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
 layers?:Record<string,Layer>;scrollTrack?:number[]};
const data=manifest as Manifest;
function realHeroRect():Rect{
 const v=data.heroVideo?.video;
 if(!v)throw Error('V5 requires measured source DOM. Run capture-mobile-v5 first.');
 return {x:STAGE.x+v.x*SX,y:STAGE.y+v.y*SY,w:v.w*SX,h:v.h*SY,
   r:(data.heroVideo?.effectiveRadius||0)*SX};
}
// Camera focal point stays at top right. Radius only begins after full zoom-in
// and fully finishes BEFORE zoom-out. SVG paths drawn in output pixels.
function opening(f:number):Rect{
 const shape=realHeroRect();
 const peak=14.3,zoomIn=smooth(12,69,f),zoomOut=smooth(105,135,f);
 const z=1+(peak-1)*zoomIn*(1-zoomOut);
 const x=mix(mix(shape.x+shape.w,690,zoomIn),shape.x+shape.w,zoomOut);
 const y=mix(mix(shape.y,835,zoomIn),shape.y,zoomOut);
 const r=shape.r*smooth(72,103,f);
 return {x:x-z*shape.w,y,w:z*shape.w,h:z*shape.h,r:r*z};
}
function path(s:Rect):string{
 const x=round(s.x),y=round(s.y),X=round(s.x+s.w),Y=round(s.y+s.h);
 const r=round(Math.min(s.r,s.w/2,s.h/2));
 if(r<=0.001)return 'M '+x+' '+y+' H '+X+' V '+Y+' H '+x+' Z';
 return 'M '+round(x+r)+' '+y+' H '+round(X-r)+' A '+r+' '+r+' 0 0 1 '+X+' '+round(y+r)+
  ' V '+round(Y-r)+' A '+r+' '+r+' 0 0 1 '+round(X-r)+' '+Y+
  ' H '+round(x+r)+' A '+r+' '+r+' 0 0 1 '+x+' '+round(Y-r)+
  ' V '+round(y+r)+' A '+r+' '+r+' 0 0 1 '+round(x+r)+' '+y+' Z';
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
 scale:track([[135,1],[205,1.018],[275,1.028],[365,1.012],
  [454,1.022],[545,1.034],[625,1.022],[720,1.018],[839,1.01]],f),
 x:track([[135,0],[225,-3],[330,3],[440,-4],[545,4],[650,-3],[839,0]],f),
 y:track([[135,0],[255,-8],[375,-12],[500,-16],[635,-10],[755,-15],[839,-8]],f)
 };
}
const timing:Record<string,[number,number]>={
 heroLogo:[144,171],heroTitle:[161,194],heroSubtitle:[183,215],
 heroDescription:[203,235],heroCTA:[221,248],
 introParagraph:[321,342],introLink:[330,348],
 servicesHeading:[343,357],servicesIntro:[347,362],
 service1Number:[351,366],service1Body:[353,369],
 service2Number:[365,379],service2Body:[367,384],
 service3Number:[379,393],service3Body:[381,398],
 galleryTitle:[635,660],galleryFirstCard:[646,684]
};
function sourceScroll(f:number):number{
 const t=data.scrollTrack||[];
 return t[Math.max(0,Math.min(t.length-1,f-START))]||0;
}
function NativeLayer({id,f,scroll,from,to,line}:{
 id:string;f:number;scroll:number;from:number;to:number;line?:{y:number;h:number}
}){
 const l=data.layers?.[id];if(!l||f<from)return null;
 const p=enter(f,from,to),y=l.absY-scroll+(line?.y||0);
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
  if(id==='galleryFirstCard'&&f>=729)return null;
  return <NativeLayer key={id} id={id} f={f} from={from} to={to} scroll={scroll}/>;
 })}
 {lines.slice(0,3).map((line,i)=><NativeLayer
   key={'original-line-'+i} id="introHeading" line={line}
   f={f} scroll={scroll} from={291+i*12} to={311+i*12}/>)}
 </>;
}
function SiteViewport({f}:{f:number}){
 const cam=camera(f),hero=realHeroRect(),t=smooth(137,160,f);
 const top=hero.y-STAGE.y,left=hero.x-STAGE.x;
 const right=STAGE.w-left-hero.w,bottom=STAGE.h-top-hero.h;
 const clip='inset('+round(mix(top,0,t))+'px '+round(mix(right,0,t))+'px '+
   round(mix(bottom,0,t))+'px '+round(mix(left,0,t))+'px round '+
   round(mix(hero.r,0,t))+'px)';
 return <div style={{position:'absolute',left:STAGE.x,top:STAGE.y,
   width:STAGE.w,height:STAGE.h,borderRadius:18,overflow:'hidden',
   background:'#ffffff',clipPath:clip,transformOrigin:'50% 50%',
   transform:'translate('+cam.x+'px,'+cam.y+'px) scale('+cam.scale+')',
   opacity:smooth(135,155,f)}}>
   <Sequence from={START} durationInFrames={FRAMES-START}>
    <OffthreadVideo src={staticFile('mobile-capture-v5.mp4')} muted
     style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
   </Sequence>
   <div style={{position:'absolute',left:0,top:0,width:390,height:844,
     transform:'scale('+SX+','+SY+')',transformOrigin:'top left',
     overflow:'visible',pointerEvents:'none'}}>
     <NativeWords f={f}/>
   </div>
 </div>;
}
function V51(){
 const f=useCurrentFrame();
 return <AbsoluteFill style={{backgroundColor:'#ffffff',overflow:'hidden'}}>
  {f<=155 && <svg width={WIDTH} height={HEIGHT} viewBox={'0 0 '+WIDTH+' '+HEIGHT}
   style={{position:'absolute',inset:0,display:'block',opacity:1}}>
    <path d={path(opening(Math.min(f,135)))} fill={GREEN}/>
   </svg>}
  {f>=135&&<SiteViewport f={f}/>}
 </AbsoluteFill>;
}
export const YkeizumiMobileReels=V51;
export function RemotionRoot(){
 return <Composition id="YkeizumiMobileReels" component={YkeizumiMobileReels}
  width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={FRAMES}/>;
}
registerRoot(RemotionRoot);
