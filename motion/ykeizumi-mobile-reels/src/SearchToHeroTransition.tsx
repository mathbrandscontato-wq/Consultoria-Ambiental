/**
 * V6.3 — unfilled right-corner outline with actual Hero geometry.
 * Three explicit material phases: search field → gray vector outline →
 * corner-round micro-dolly → filled native Hero. All SVG in output pixels.
 */
import React from 'react';
import {Easing} from 'remotion';
import {SEARCH_BOX} from './SearchIntro';
export type Rect={x:number;y:number;w:number;h:number;r:number};
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const round=(n:number)=>Number(n.toFixed(3));
const smooth=(a:number,b:number,f:number)=>{
 const v=clamp((f-a)/(b-a));return v*v*(3-2*v);
};
const dolly=Easing.bezier(.26,.04,.24,1);
const progress=(a:number,b:number,f:number)=>dolly(clamp((f-a)/(b-a)));
function vectorPath(s:Rect){
 const x=round(s.x),y=round(s.y),X=round(s.x+s.w),Y=round(s.y+s.h);
 const r=round(Math.min(s.r,s.w/2,s.h/2));
 if(r<=.001)return 'M '+x+' '+y+' H '+X+' V '+Y+' H '+x+' Z';
 return 'M '+round(x+r)+' '+y+' H '+round(X-r)+
  ' A '+r+' '+r+' 0 0 1 '+X+' '+round(y+r)+
  ' V '+round(Y-r)+' A '+r+' '+r+' 0 0 1 '+round(X-r)+' '+Y+
  ' H '+round(x+r)+' A '+r+' '+r+' 0 0 1 '+x+' '+round(Y-r)+
  ' V '+round(y+r)+' A '+r+' '+r+' 0 0 1 '+round(x+r)+' '+y+' Z';
}
export function heroGeometry(f:number,hero:Rect):Rect{
 const field=SEARCH_BOX;
 if(f<=90)return field;
 if(f<115){
  const p=progress(90,115,f);
  return {x:mix(field.x,hero.x,p),y:mix(field.y,hero.y,p),
   w:mix(field.w,hero.w,p),h:mix(field.h,hero.h,p),
   r:mix(field.r,0,p)};
 }
 if(f<149){
  const p=progress(122,149,f);
  const z=mix(1,10.8,p);
  const right=mix(hero.x+hero.w,742,p);
  const top=mix(hero.y,662,p);
  return {x:right-z*hero.w,y:top,w:z*hero.w,h:z*hero.h,r:0};
 }
 const radius=smooth(147,166,f);
 const pull=smooth(162,190,f);
 const tinyMotion=smooth(149,176,f);
 const z=mix(10.8+.23*tinyMotion,1,pull);
 const right=mix(742+9*tinyMotion,hero.x+hero.w,pull);
 const top=mix(662-10*tinyMotion,hero.y,pull);
 return {x:right-z*hero.w,y:top,w:z*hero.w,h:z*hero.h,
  r:hero.r*z*radius};
}
export function SearchToHeroTransition({frame:f,hero}:{frame:number;hero:Rect}){
 if(f>207)return null;
 const r=heroGeometry(f,hero);
 const fieldFade=1-smooth(90,112,f);
 const greenFill=smooth(179,199,f);
 const strokeVisible=smooth(91,105,f)*(1-smooth(187,201,f));
 const opacity=f<190?1:(1-smooth(190,207,f));
 return <svg width={1080} height={1920} viewBox="0 0 1080 1920"
  aria-hidden="true"
  style={{position:'absolute',inset:0,overflow:'hidden',
   pointerEvents:'none',opacity}}>
   <path d={vectorPath(r)} fill="#f3f3f3" fillOpacity={fieldFade}/>
   <path d={vectorPath(r)} fill="#1e3b2d" fillOpacity={greenFill}/>
   <path d={vectorPath(r)} fill="none" stroke="#414141"
     strokeOpacity={strokeVisible} strokeWidth={3.4}
     strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
 </svg>;
}
