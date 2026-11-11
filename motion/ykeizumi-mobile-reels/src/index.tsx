import React from 'react';
import {
  AbsoluteFill, Composition, Easing, interpolate,
  OffthreadVideo, Sequence, registerRoot, staticFile, useCurrentFrame,
} from 'remotion';
import touches from '../public/touches-v3.json';

const WIDTH=1080, HEIGHT=1920, FPS=30, FRAMES=870;
const GREEN='#1e3b2d';
const CLAMP={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const out=Easing.bezier(0.22,1,0.36,1);
const inOut=Easing.bezier(0.45,0,0.16,1);
const standard=Easing.bezier(0.2,0.68,0.23,1);
const tw=(f:number,a:number,b:number,v0:number,v1:number,ease=out)=>
 v0+(v1-v0)*ease(Math.max(0,Math.min(1,(f-a)/(b-a))));

type Rect={x:number;y:number;w:number;h:number;r:number};
type Touch={frame:number;x:number;y:number;purpose:string};

function geometry(f:number):Rect {
  const p=tw(f,106,135,0,1,inOut);
  return {
    x:435+(85-435)*p,
    y:855+(-25-855)*p,
    w:210+(910-210)*p,
    h:210+(1970-210)*p,
    r:tw(f,67,98,0,23,inOut)+(18-23)*p,
  };
}

// C1-continuous cubic Hermite interpolation through camera keyframes.
// Unlike independently eased scene transitions, velocities flow across knots.
function sampleTrack(keys:readonly (readonly [number,number])[],frame:number):number{
  if(frame<=keys[0][0])return keys[0][1];
  const last=keys.length-1;
  if(frame>=keys[last][0])return keys[last][1];
  let i=0;while(i<last-1&&frame>keys[i+1][0])i++;
  const [t0,p0]=keys[i], [t1,p1]=keys[i+1],dt=t1-t0;
  const slope=(j:number)=>j===0?(keys[1][1]-keys[0][1])/(keys[1][0]-keys[0][0]):
    j===last?(keys[last][1]-keys[last-1][1])/(keys[last][0]-keys[last-1][0]):
    (keys[j+1][1]-keys[j-1][1])/(keys[j+1][0]-keys[j-1][0]);
  const u=(frame-t0)/dt,u2=u*u,u3=u2*u;
  return (2*u3-3*u2+1)*p0+(u3-2*u2+u)*dt*slope(i)
       +(-2*u3+3*u2)*p1+(u3-u2)*dt*slope(i+1);
}

function CameraController(f:number,rect:Rect){
  if(f<=135){
    const zoom=f<=18?1:f<=62?tw(f,18,62,1,13.5,out):
      f<=95?13.5:tw(f,95,135,13.5,1,inOut);
    const cornerX=rect.x+rect.w,cornerY=rect.y;
    const focusX=f<=95?tw(f,18,62,645,603,standard):tw(f,95,135,603,995,inOut);
    const focusY=f<=95?tw(f,18,62,855,932,standard):tw(f,95,135,932,-25,inOut);
    return {
      scale:zoom,
      x:focusX-645-zoom*(cornerX-645),
      y:focusY-855-zoom*(cornerY-855),
      originX:645,originY:855
    };
  }
  return {
    scale:sampleTrack([
      [135,1],[176,1.026],[245,1.045],[302,1.037],
      [392,1.065],[470,1.073],[567,1.055],
      [657,1.079],[745,1.054],[835,1.045],[869,1.02]
    ],f),
    x:sampleTrack([[135,0],[250,-4],[398,8],[530,-5],[657,9],[760,-8],[869,0]],f),
    y:sampleTrack([[135,0],[245,-14],[390,-19],[490,-28],[610,-16],[742,-19],[869,0]],f),
    originX:540,originY:960
  };
}

function TouchIndicator({sourceFrame,rect}:{sourceFrame:number;rect:Rect}){
  return <>{(touches as Touch[]).map((touch,index)=>{
    const age=sourceFrame-touch.frame;
    if(age<-3||age>12)return null;
    const opacity=interpolate(age,[-3,0,3,12],[0,.26,.32,0],CLAMP);
    const radius=interpolate(age,[-3,1,12],[.75,.95,1.22],CLAMP);
    return <div key={index} style={{
      position:'absolute',pointerEvents:'none',
      left:touch.x/390*rect.w-10,top:touch.y/844*rect.h-10,
      height:20,width:20,borderRadius:'50%',
      border:'1.25px solid rgba(250,255,248,.9)',
      background:'rgba(31,59,45,.13)',
      transform:'scale('+radius+')',opacity
    }}/>;
  })}</>;
}

function YkeizumiCanvas(){
  const frame=useCurrentFrame();
  const rect=geometry(frame),camera=CameraController(frame,rect);
  const introOpacity=tw(frame,4,18,0,1,standard);
  const revealVideo=tw(frame,113,135,0,1,standard);
  return <AbsoluteFill style={{backgroundColor:'#ffffff',overflow:'hidden'}}>
    <AbsoluteFill style={{
      transformOrigin:camera.originX+'px '+camera.originY+'px',
      transform:'translate('+camera.x+'px,'+camera.y+'px) scale('+camera.scale+')',
      willChange:'transform'
    }}>
      {/* Native resolution-independent vector geometry. Corner radius morphs at 13.5x. */}
      <svg width={WIDTH} height={HEIGHT} style={{position:'absolute',inset:0,overflow:'visible',opacity:introOpacity}}>
        <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h}
              rx={rect.r} ry={rect.r} fill={GREEN}/>
      </svg>
      {frame>=110&&<div style={{
        position:'absolute',left:rect.x,top:rect.y,
        width:rect.w,height:rect.h,borderRadius:rect.r,
        overflow:'hidden',opacity:revealVideo,
        backgroundColor:GREEN
      }}>
        <Sequence from={110} durationInFrames={760}>
          <OffthreadVideo src={staticFile('mobile-capture-v3.mp4')} muted
            style={{height:'100%',width:'100%',objectFit:'fill'}} />
        </Sequence>
        <TouchIndicator sourceFrame={frame-110} rect={rect}/>
      </div>}
    </AbsoluteFill>
  </AbsoluteFill>;
}

export const YkeizumiMobileReels=YkeizumiCanvas;
export function RemotionRoot(){
  return <Composition id="YkeizumiMobileReels" component={YkeizumiMobileReels}
    width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={FRAMES}/>;
}
registerRoot(RemotionRoot);
