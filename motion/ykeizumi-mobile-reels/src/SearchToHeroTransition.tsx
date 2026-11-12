/**
 * Single continuous, pixel-perfect SVG geometric object across:
 * field -> green real hero rectangle -> extreme top-right zoom -> round morph -> reveal.
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
const progressive=Easing.bezier(0.22,1,0.36,1);
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
 const box=SEARCH_BOX;
 if(frame<=93)return box;
 if(frame<114){
  const p=smooth(93,114,frame);
  return {
    x:lerp(box.x,hero.x,p),y:lerp(box.y,hero.y,p),
    w:lerp(box.w,hero.w,p),h:lerp(box.h,hero.h,p),
    r:lerp(box.r,0,p)
  };
 }
 const peak=13.2;
 const zin=ease(116,144,frame);
 const zout=smooth(166,190,frame);
 const zoom=1+(peak-1)*zin*(1-zout);
 const cornerX=hero.x+hero.w;
 const focalX=lerp(lerp(cornerX,695,zin),cornerX,zout);
 const focalY=lerp(lerp(hero.y,827,zin),hero.y,zout);
 const radius=hero.r*smooth(149,164,frame);
 return {
  x:focalX-zoom*hero.w,y:focalY,
  w:zoom*hero.w,h:zoom*hero.h,r:radius*zoom
 };
}
export function SearchToHeroTransition({frame,hero}:{frame:number;hero:Rect}){
 if(frame>204)return null;
 const box=heroGeometry(frame,hero);
 const green=smooth(93,110,frame);
 const fadeIn=smooth(3,13,frame);
 const opacity=frame<190?fadeIn:(1-smooth(190,202,frame));
 return <svg width={1080} height={1920} viewBox="0 0 1080 1920"
   style={{position:'absolute',inset:0,display:'block',overflow:'hidden',opacity}}
   aria-hidden="true">
   <path d={vectorPath(box)} fill={color(GRAY,GREEN,green)}/>
 </svg>;
}
