/**
 * Math Brands | Search to Experience
 * Intentional, fictitious search bar — not a search engine or ranking claim.
 * Every letter is deterministically timed by Remotion frame.
 */
import React from 'react';
import {Easing} from 'remotion';

export const SEARCH_TEXT='Consultoria Ambiental em Joinville';
export const SEARCH_BOX={x:123,y:785,w:834,h:310,r:36};
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const progress=(f:number,a:number,b:number)=>clamp((f-a)/(b-a));
const ease=Easing.bezier(0.25,1,0.45,1);
const weights=[...SEARCH_TEXT].map((char,i)=>char===' '?2.0:(1+((i*17+7)%9)/25));
const total=weights.reduce((a,b)=>a+b,0);
const schedule=weights.reduce<number[]>((arr,w)=>{
  arr.push((arr.at(-1)??0)+w);return arr;
},[]);
function typedCount(frame:number){
 const time=progress(frame,12,71)*total;
 return schedule.filter(t=>t<=time).length;
}
const boxAppearance=(f:number)=>ease(progress(f,4,14));
export function SearchIntro({frame}:{frame:number}){
 if(frame>=103)return null;
 const p=boxAppearance(frame),filled=typedCount(frame);
 const fade=1-progress(frame,93,101);
 const text=SEARCH_TEXT.slice(0,filled);
 const press=progress(frame,80,84),release=progress(frame,84,90);
 const scale=frame<84?1-.06*ease(press):.94+.06*ease(release);
 const arrowY=frame<84?0:-6*ease(progress(frame,84,90));
 return <div style={{
  position:'absolute',inset:0,
  opacity:p*fade,pointerEvents:'none',
  fontFamily:'Arial, Helvetica, sans-serif'
 }}>
   <div style={{
     position:'absolute',
     left:SEARCH_BOX.x+47,top:SEARCH_BOX.y+52,
     width:SEARCH_BOX.w-105,
     fontWeight:400,fontSize:43,
     lineHeight:1.22,letterSpacing:'-1.25px',
     color:'#313131',whiteSpace:'normal',
     overflowWrap:'normal'
   }}>
     <span>{text}</span>
     {frame<92&&<span style={{
       display:'inline-block',verticalAlign:'baseline',
       width:2,height:45,marginLeft:4,
       background:'#737373',
       opacity:frame<=71?(frame%20<15?1:.15):1
     }}/>}
   </div>
   <div style={{
     position:'absolute',
     left:SEARCH_BOX.x+SEARCH_BOX.w-117,
     top:SEARCH_BOX.y+SEARCH_BOX.h-117,
     height:78,width:78,borderRadius:'50%',
     background:'#414141',
     transform:'scale('+scale+')',
     display:'grid',placeItems:'center'
   }}>
     <svg xmlns="http://www.w3.org/2000/svg"
       width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"
       style={{transform:'translateY('+arrowY+'px)'}}>
       <path d="M20 31V9 M11 18l9-9 9 9"
         stroke="#fff" strokeWidth={3.4}
         strokeLinecap="round" strokeLinejoin="round" fill="none"/>
     </svg>
   </div>
 </div>;
}
