import React from 'react';
import {
  AbsoluteFill, Composition, Easing, Img, OffthreadVideo, Sequence,
  interpolate, registerRoot, staticFile, useCurrentFrame
} from 'remotion';
import capture from './capture-data.json';

// Design-source: website Ykeizumi, não reproduções fictícias.
// O único texto exibido vem de capturas reais do DOM original.
const W=1440, H=900, CW=1080, CH=1920, GREEN='#1e3b2d';
const ease=Easing.inOut(Easing.cubic);
const lerp=(f,a,b,x,y)=>interpolate(f,[a,b],[x,y],{
  extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease
});
const clamp=(n)=>Math.max(0,Math.min(1,n));
const fade=(f,start,duration=12)=>lerp(f,start,start+duration,0,1);
const delayedFade=(f,start,finish,soft=12)=>
  clamp(fade(f,start,soft) * (1-lerp(f,finish-soft,finish,0,1)));

function viewport(scale,moveX=0,moveY=0) {
  return {
    position:'absolute',left:(CW-W*scale)/2+moveX,
    top:(CH-H*scale)/2+moveY,width:W*scale,height:H*scale,
    overflow:'hidden'
  };
}
function Screenshot({name,scale,moveX=0,moveY=0,opacity=1,children}) {
  const view=viewport(scale,moveX,moveY);
  return <div style={{...view,opacity,backgroundColor:'#fff'}}>
    <Img src={staticFile('motion/captures/'+name+'.png')}
      style={{position:'absolute',inset:0,width:'100%',height:'100%'}} />
    {children}
  </div>;
}
function Hero({scale,moveX=0,moveY=0,opacity=1,video=true}) {
  const r=capture.hero;
  const view=viewport(scale,moveX,moveY);
  return <div style={{...view,opacity,backgroundColor:'#fff'}}>
    <Img src={staticFile('motion/captures/hero.png')}
      style={{width:'100%',height:'100%',position:'absolute',inset:0}} />
    {video && <div style={{
      position:'absolute',left:r.x*scale,top:r.y*scale,
      width:r.width*scale,height:r.height*scale,
      borderRadius:16*scale,overflow:'hidden',background:GREEN
    }}>
      <OffthreadVideo src={staticFile('media/hero-desktop.mp4')}
        muted style={{
          width:'100%',height:'100%',objectFit:'cover',
          filter:'saturate(.78) contrast(1.1) brightness(.86)'
        }} />
      <div style={{position:'absolute',inset:0,
        background:'linear-gradient(90deg,rgba(9,33,22,.79) 0%,rgba(9,33,22,.58) 53%,rgba(9,33,22,.34) 100%),linear-gradient(0deg,rgba(9,33,22,.6),transparent 48%)'
      }}/>
    </div>}
    {video && <Img src={staticFile('motion/captures/hero-overlay.png')}
      style={{position:'absolute',inset:0,width:'100%',height:'100%'}} />}
  </div>;
}
function Cursor({frame,scale,moveX=0,moveY=0,from,to,first=0,last=65,opacity=1}) {
  const x=lerp(frame,first,last,from.x,to.x);
  const y=lerp(frame,first,last,from.y,to.y);
  const view=viewport(scale,moveX,moveY);
  return <div style={{
    position:'absolute',left:view.left+x*scale,top:view.top+y*scale,
    width:31,height:41,zIndex:20,
    opacity:opacity*fade(frame,first-8,8),pointerEvents:'none'
  }}>
    <svg viewBox="0 0 27 37" width="31" height="41">
      <path d="M2 2v28l7.5-7.5 5 11 5.4-2.7-5-11.1H25Z"
        fill="#fff" stroke="#1e3b2d" strokeWidth="2.2" strokeLinejoin="round"/>
    </svg>
  </div>;
}
function Scene01() {
  const f=useCurrentFrame();
  const p=lerp(f,70,125,0,1);
  const w=lerp(f,70,125,260,1010),h=lerp(f,70,125,260,633);
  const radius=lerp(f,70,120,0,12);
  const appear=lerp(f,4,26,0,1);
  return <AbsoluteFill style={{backgroundColor:'#fff'}}>
    <div style={{
      position:'absolute',left:(CW-w)/2,top:(CH-h)/2,
      width:w,height:h,borderRadius:radius,
      background:GREEN,opacity:appear,
      transform:'scale('+lerp(f,0,35,.82,1)+')',
      overflow:'hidden'
    }}>
      <div style={{
        position:'absolute',width:50,height:50,
        right:lerp(f,30,70,20,3),top:lerp(f,30,70,20,3),
        borderRight:'2px solid rgba(255,255,255,.22)',
        borderTop:'2px solid rgba(255,255,255,.22)',
        borderTopRightRadius:radius
      }}/>
    </div>
    {f>96 && <Hero scale={lerp(f,96,133,.54,.702)}
      opacity={lerp(f,98,132,0,1)} video={false}/>}
  </AbsoluteFill>;
}
function Scene02() {
  const f=useCurrentFrame();
  const s=lerp(f,0,160,.702,.86);
  const moveY=lerp(f,0,160,0,-54);
  const op=delayedFade(f,0,164,14);
  return <AbsoluteFill style={{backgroundColor:'#fff'}}>
    <Hero scale={s} moveX={lerp(f,60,165,0,22)} moveY={moveY}
      opacity={op} video />
  </AbsoluteFill>;
}
function Scene03() {
  const f=useCurrentFrame();
  const s=lerp(f,0,170,.79,1.07);
  const moveX=lerp(f,0,170,0,25);
  const moveY=lerp(f,0,170,42,-40);
  const base=delayedFade(f,0,180,10);
  return <AbsoluteFill style={{backgroundColor:'#fff'}}>
    {f<38 && <Screenshot name="intro" scale={.79}
      moveY={lerp(f,0,38,100,-110)}
      opacity={base*(1-lerp(f,22,38,0,1))}/>}
    <Screenshot name="service-idle" scale={s} moveX={moveX} moveY={moveY}
      opacity={base*fade(f,26,16)}/>
    {f>=48 && <Screenshot name="service-1" scale={s}
      moveX={moveX} moveY={moveY}
      opacity={base*fade(f,51,14)*(1-lerp(f,105,119,0,1))}/>}
    {f>=108 && <Screenshot name="service-2" scale={s}
      moveX={moveX} moveY={moveY}
      opacity={base*fade(f,112,14)}/>}
    {f>=40 && f<170 && <Cursor frame={f} scale={s} moveX={moveX} moveY={moveY}
      from={{x:810,y:810}}
      to={f<106?capture.serviceTargets[0]:capture.serviceTargets[1]}
      first={f<106?40:106} last={f<106?60:126}
      opacity={base}/>}
  </AbsoluteFill>;
}
function Scene04() {
  const f=useCurrentFrame();
  const s=lerp(f,0,220,.79,1.02);
  const moveY=lerp(f,0,230,68,-45);
  const base=delayedFade(f,0,240,12);
  return <AbsoluteFill style={{backgroundColor:'#fff'}}>
    <Screenshot name="sector-0" scale={s} moveY={moveY} opacity={base}/>
    {f>=54 && <Screenshot name="sector-1" scale={s} moveY={moveY}
      opacity={base*fade(f,62,16)*(1-lerp(f,144,160,0,1))}/>}
    {f>=148 && <Screenshot name="sector-2" scale={s} moveY={moveY}
      opacity={base*fade(f,155,16)}/>}
    {f>=29 && f<=225 && <Cursor frame={f} scale={s} moveY={moveY}
      from={f<145?{x:780,y:650}:capture.sectorTargets[0]}
      to={f<145?capture.sectorTargets[0]:capture.sectorTargets[1]}
      first={f<145?30:139} last={f<145?67:160}
      opacity={base}/>}
  </AbsoluteFill>;
}
function Scene05() {
  const f=useCurrentFrame();
  // Final revela progressivamente mais da composição original, sem cartelas.
  const s=lerp(f,0,205,1.00,.70);
  const moveY=lerp(f,0,205,40,0);
  const base=fade(f,0,16);
  return <AbsoluteFill style={{backgroundColor:'#fff'}}>
    <Screenshot name="gallery-0" scale={s} moveY={moveY} opacity={base}/>
    {f>=64 && <Screenshot name="gallery-1" scale={s} moveY={moveY}
      opacity={base*fade(f,68,16)*(1-lerp(f,126,143,0,1))}/>}
    {f>=132 && <Screenshot name="gallery-2" scale={s} moveY={moveY}
      opacity={base*fade(f,138,18)}/>}
    {f>=35 && f<154 && <Cursor frame={f} scale={s} moveY={moveY}
      from={{x:980,y:650}} to={capture.galleryTarget}
      first={37} last={74}
      opacity={1-lerp(f,137,154,0,1)}/>}
  </AbsoluteFill>;
}

const Reels=()=> <AbsoluteFill style={{backgroundColor:'#fff'}}>
  <Sequence from={0} durationInFrames={135}><Scene01/></Sequence>
  <Sequence from={135} durationInFrames={165}><Scene02/></Sequence>
  <Sequence from={300} durationInFrames={180}><Scene03/></Sequence>
  <Sequence from={480} durationInFrames={240}><Scene04/></Sequence>
  <Sequence from={720} durationInFrames={210}><Scene05/></Sequence>
</AbsoluteFill>;

const Root=()=> <Composition id="YkeizumiReels" component={Reels}
  width={1080} height={1920} fps={30} durationInFrames={930}/>;
registerRoot(Root);
