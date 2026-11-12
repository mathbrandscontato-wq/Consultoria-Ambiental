/**
 * Single continuous, pixel-perfect SVG geometric object across:
 * field -> IMMEDIATE close-up of real Hero top-right corner -> radius morph -> pull-back.
 * Coordinates are in output pixel-space (never raster-scaled).
 */
import React from 'react';
import {Easing} from 'remotion';
import {SEARCH_BOX} from './SearchIntro';

export type Rect={x:number;y:number;w:number;h:number;r:number};
const GREEN=[30,59,45],GRAY=[243,243,243];
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(a:number,b:number,f:number)=>{
 const x=clamp((f-a)/(b-a));
 return x*x*x*(x*(x*6-15)+10);
};
const progressive=Easing.bezier(0.28,0.06,0.22,1);
const ease=(a:number,b:number,f:number)=>progressive(clamp((f-a)/(b-a)));
const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
const round=(n:number)=>Number(n.toFixed(3));
const color=(a:number[],b:number[],p:number)=>
 'rgb('+a.map((v,i)=>Math.round(lerp(v,b[i],p))).join(',')+')';

function vectorPath(s:Rect){
 const x=round(s.x),y=round(s.y),X=round(s.x+s.w),Y=round(s.y+s.h);
 const r=round(Math.min(s.r,s.w/2,s.h/2));
 if(r<=.001)return 'M '+x+' '+y+' H '+X+' V '+Y+' H '+x+' Z';
 return 'M '+round(x+r)+' '+y+' H '+round(X-r)+' A '+r+' '+r+' 0 0 1 '+X+' '+round(y+r)+
  ' V '+round(Y-r)+' A '+r+' '+r+' 0 0 1 '+round(X-r)+' '+Y+
  ' H '+round(x+r)+' A '+r+' '+r+' 0 0 1 '+x+' '+round(Y-r)+
  ' V '+round(y+r)+' A '+r+' '+r+' 0 0 1 '+round(x+r)+' '+y+' Z';
}
export function heroGeometry(frame:number,hero:Rect):Rect{
 const field=SEARCH_BOX;
 // The viewer travels into the right-hand corner INSTEAD of waiting for
 // the full green Hero rectangle to appear. There is one vector throughout.
 if(frame<=90)return field;
 const peak=11.7;
 const targetCornerX=720,targetCornerY=790;
 if(frame<120){
  const p=ease(90,120,frame);
  const width=lerp(field.w,hero.w*peak,p);
  const height=lerp(field.h,hero.h*peak,p);
  const right=lerp(field.x+field.w,targetCornerX,p);
  const top=lerp(field.y,targetCornerY,p);
  const radius=field.r*(1-smooth(91,111,frame));
  return {x:right-width,y:top,w:width,h:height,r:radius};
 }
 // Corner stays anchored during the rounding, with a gentle continuing
 // micro-dolly. Zoom-out begins before this micro-dolly finishes, so the
 // direction never pauses or changes abruptly.
 const drift=smooth(120,153,frame);
 const dollyOut=smooth(143,190,frame);
 const nearZoom=peak+.35*drift;
 const z=lerp(nearZoom,1,dollyOut);
 const right=lerp(targetCornerX+10*drift,hero.x+hero.w,dollyOut);
 const top=lerp(targetCornerY-18*drift,hero.y,dollyOut);
 const radius=hero.r*z*smooth(122,150,frame);
 return {x:right-hero.w*z,y:top,w:hero.w*z,h:hero.h*z,r:radius};
}
export function SearchToHeroTransition({frame,hero}:{frame:number;hero:Rect}){
 if(frame>204)return null;
 const box=heroGeometry(frame,hero);
 const green=smooth(90,113,frame);
 const fadeIn=smooth(3,13,frame);
 const opacity=frame<190?fadeIn:(1-smooth(190,202,frame));
 return <svg width={1080} height={1920} viewBox="0 0 1080 1920"
   style={{position:'absolute',inset:0,display:'block',overflow:'hidden',opacity}}
   aria-hidden="true">
   <path d={vectorPath(box)} fill={color(GRAY,GREEN,green)}/>
 </svg>;
}
