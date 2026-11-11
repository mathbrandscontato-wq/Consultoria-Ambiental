import React from 'react';
import {
  AbsoluteFill, Composition, Easing, OffthreadVideo, Sequence,
  interpolate, registerRoot, staticFile, useCurrentFrame
} from 'remotion';
import touches from '../public/touches.json';

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;
const MOBILE_WIDTH = 780; // Real 390px CSS mobile viewport at 2x device scale.
const MOBILE_HEIGHT = 1688; // Real 844px CSS mobile viewport at 2x.
const FOREST = '#1e3b2d';
const CLAMP = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.22, 0.66, 0.25, 1);

function Scene01Geometry() {
  const frame = useCurrentFrame();
  const appearance = interpolate(frame, [3, 23], [0, 1], CLAMP);
  const width = interpolate(frame, [0, 24, 52, 78, 118], [0, 210, 260, 260, MOBILE_WIDTH], CLAMP);
  const height = interpolate(frame, [0, 24, 52, 78, 118], [0, 210, 260, 260, MOBILE_HEIGHT], CLAMP);
  const radius = interpolate(frame, [0, 46, 78, 118], [0, 0, 30, 16], CLAMP);
  const x = interpolate(frame, [0, 30, 54, 80, 118], [0, 0, -48, -24, 0], CLAMP);
  const y = interpolate(frame, [0, 30, 54, 80, 118], [0, 0, 54, 24, 0], CLAMP);
  const opacity = appearance * interpolate(frame, [119, 128], [1, 0], CLAMP);
  return (
    <AbsoluteFill style={{backgroundColor: '#fff', opacity}}>
      <div style={{
        position: 'absolute', left: WIDTH/2 + x, top: HEIGHT/2 + y,
        width, height, borderRadius: radius, backgroundColor: FOREST,
        transform: 'translate(-50%, -50%)',
        boxShadow: frame > 86 ? '0 18px 54px rgba(18, 42, 32, .08)' : 'none',
        overflow: 'hidden'
      }}/>
    </AbsoluteFill>
  );
}

type Tap = {frame: number; x: number; y: number; purpose?: string};

function TouchIndicator({frame}: {frame: number}) {
  return <>{(touches as Tap[]).map((tap, idx) => {
    const age = frame - tap.frame;
    if (age < -4 || age > 18) return null;
    const opacity = interpolate(age, [-4, 1, 7, 18], [0, .5, .22, 0], CLAMP);
    const scale = interpolate(age, [-4, 1, 18], [.65, .86, 1.55], CLAMP);
    return <div key={idx} style={{
      position: 'absolute', left: tap.x*2-18, top: tap.y*2-18,
      width: 36, height: 36, borderRadius: '50%',
      background: 'rgba(255,255,255,.50)', border: '1px solid rgba(45,74,50,.55)',
      opacity, transform: 'scale(' + scale + ')',
      pointerEvents: 'none'
    }}/>;
  })}</>;
}

function MobileExperience() {
  const frame = useCurrentFrame(); // 0-839: captured, actual mobile web browser.
  const scale = interpolate(
    frame, [0, 50, 145, 180, 265, 385, 465, 620, 740, 839],
    [1, 1.008, 1.008, 1, 1.012, 1, 1.012, 1, 1.017, 1],
    {...CLAMP, easing: ease}
  );
  const cameraY = interpolate(
    frame, [0, 180, 245, 389, 466, 620, 710, 839],
    [0, 0, 5, 0, -5, 0, -8, 0],
    {...CLAMP, easing: ease}
  );
  const reveal = interpolate(frame, [0, 9], [0, 1], CLAMP);
  return (
    <AbsoluteFill style={{backgroundColor:'#fff'}}>
      <div style={{
        position:'absolute', left:'50%', top:'50%', width:MOBILE_WIDTH, height:MOBILE_HEIGHT,
        transform:'translate(-50%, -50%) scale(' + scale + ') translateY(' + cameraY + 'px)',
        borderRadius: 16, overflow:'hidden',
        boxShadow:'0 18px 54px rgba(18,42,32,.075)',
        opacity: reveal
      }}>
        <OffthreadVideo src={staticFile('mobile-capture.mp4')} muted
          style={{width:'100%',height:'100%',objectFit:'cover'}} />
        <TouchIndicator frame={frame}/>
      </div>
    </AbsoluteFill>
  );
}

export function YkeizumiMobileReels() {
  return <AbsoluteFill style={{backgroundColor:'#fff'}}>
    <Sequence from={0} durationInFrames={129}><Scene01Geometry/></Sequence>
    <Sequence from={120} durationInFrames={840}><MobileExperience/></Sequence>
  </AbsoluteFill>;
}

export function RemotionRoot() {
  return <Composition
    id="YkeizumiMobileReels"
    component={YkeizumiMobileReels}
    width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={960}
  />;
}

registerRoot(RemotionRoot);
