/**
 * Ykeizumi | Mobile Reels V4 — Director's Cut
 * 1080 x 1920 • 30fps • 840 frames (28s)
 *
 * The opening geometry is projected into final output pixel coordinates on
 * EVERY frame. The SVG is NEVER transformed/scaled as a composited layer.
 * The mobile site below is original Chromium footage, not recreated UI.
 */
import React from 'react';
import {
  AbsoluteFill, Composition, OffthreadVideo,
  Sequence, registerRoot, staticFile, useCurrentFrame,
} from 'remotion';

const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;
const FRAMES = 840;
const REVEAL_FRAME = 136;
const BG = '#ffffff';
const GREEN = '#1e3b2d';

type Rect = {x: number; y: number; w: number; h: number; r: number};
type Camera = {scale: number; x: number; y: number};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
// C2 continuous at both ends (velocity and acceleration approach zero).
const smootherstep = (a: number, b: number, f: number) => {
  const t = clamp01((f - a) / (b - a));
  return t * t * t * (t * (t * 6 - 15) + 10);
};
const blend = (f: number, a: number, b: number, from: number, to: number) =>
  mix(from, to, smootherstep(a, b, f));
const px = (v: number) => Number(v.toFixed(3));

// The corner is fully sharp until frame 63. Morph occurs at maximum magnification.
function shape(f: number): Rect {
  const morph = smootherstep(98, REVEAL_FRAME, f);
  let r = blend(f, 63, 100, 0, 23);
  r = mix(r, 18, smootherstep(109, REVEAL_FRAME, f));
  return {
    x: mix(435, 85, morph),
    y: mix(855, -25, morph),
    w: mix(210, 910, morph),
    h: mix(210, 1970, morph),
    r,
  };
}

// Resolve the ENTIRE path directly in 1080x1920 output coordinates.
// Deliberately no CSS/SVG transform, transformed wrapper or bitmap upscaling.
function projectedShape(f: number, model: Rect): Rect {
  const zoomIn = smootherstep(9, 72, f);
  const zoomOut = smootherstep(83, REVEAL_FRAME, f);
  const scale = 1 + 14.5 * zoomIn * (1 - zoomOut);
  const cornerX = blend(f, 9, 72, 645, 715)
    + (995 - 715) * smootherstep(88, REVEAL_FRAME, f);
  const cornerY = blend(f, 9, 72, 855, 930)
    + (-25 - 930) * smootherstep(88, REVEAL_FRAME, f);
  return {
    x: cornerX - scale * model.w,
    y: cornerY,
    w: model.w * scale,
    h: model.h * scale,
    r: model.r * scale,
  };
}

function vectorPath(rect: Rect): string {
  const l = px(rect.x), t = px(rect.y), right = px(rect.x + rect.w);
  const bottom = px(rect.y + rect.h);
  const r = px(Math.max(0, Math.min(rect.r, rect.w / 2, rect.h / 2)));
  if (r < 0.001) {
    return 'M ' + l + ' ' + t + ' H ' + right + ' V ' + bottom +
      ' H ' + l + ' Z';
  }
  // Four exact circular SVG arcs in destination coordinates, rasterized once.
  return 'M ' + px(l+r) + ' ' + t +
    ' H ' + px(right-r) +
    ' A ' + r + ' ' + r + ' 0 0 1 ' + right + ' ' + px(t+r) +
    ' V ' + px(bottom-r) +
    ' A ' + r + ' ' + r + ' 0 0 1 ' + px(right-r) + ' ' + bottom +
    ' H ' + px(l+r) +
    ' A ' + r + ' ' + r + ' 0 0 1 ' + l + ' ' + px(bottom-r) +
    ' V ' + px(t+r) +
    ' A ' + r + ' ' + r + ' 0 0 1 ' + px(l+r) + ' ' + t +
    ' Z';
}

// Small hand-directed drift across scene boundaries, with matched tangents.
// Unlike hard per-scene ease resets, the first derivatives are continuous.
function track(points: ReadonlyArray<readonly [number, number]>, f: number): number {
  if (f <= points[0][0]) return points[0][1];
  const last = points.length - 1;
  if (f >= points[last][0]) return points[last][1];
  let i = 0;
  while (i < last - 1 && f > points[i + 1][0]) i++;
  const [a, y0] = points[i], [b, y1] = points[i + 1];
  const slope = (j: number): number => {
    if (j === 0 || j === last) return 0;
    return (points[j + 1][1] - points[j - 1][1]) /
      (points[j + 1][0] - points[j - 1][0]);
  };
  const d = b-a, t = (f-a)/d, t2=t*t, t3=t2*t;
  return (2*t3-3*t2+1)*y0 + (t3-2*t2+t)*d*slope(i) +
    (-2*t3+3*t2)*y1 + (t3-t2)*d*slope(i+1);
}

function editorialCamera(f: number): Camera {
  return {
    scale: track([
      [136,1], [205,1.018], [275,1.028], [365,1.012],
      [454,1.022], [545,1.034], [625,1.022], [720,1.018], [839,1.01],
    ], f),
    x: track([
      [136,0], [225,-3], [330,3], [440,-4], [545,4], [650,-3], [839,0],
    ], f),
    y: track([
      [136,0], [255,-8], [375,-12], [500,-16], [635,-10], [755,-15], [839,-8],
    ], f),
  };
}

function YkeizumiMobileDirectorCut() {
  const frame = useCurrentFrame();
  const model = shape(frame);
  const p = projectedShape(frame, model);
  const opacity = smootherstep(2, 14, frame);
  const reveal = smootherstep(131, 154, frame);
  const camera = editorialCamera(frame);

  return <AbsoluteFill style={{backgroundColor:BG, overflow:'hidden'}}>
    {/* SCREEN-SPACE vector: no group transform, no CSS scale, no bitmap. */}
    <svg width={WIDTH} height={HEIGHT} viewBox={'0 0 ' + WIDTH + ' ' + HEIGHT}
      style={{position:'absolute',inset:0,display:'block',opacity}}>
      <path d={vectorPath(p)} fill={GREEN}/>
    </svg>
    {frame >= 131 && <div style={{
      position:'absolute', left:85, top:-25, width:910, height:1970,
      borderRadius:18, overflow:'hidden', background:GREEN,
      opacity:reveal,
      transformOrigin:'50% 50%',
      transform:'translate(' + camera.x + 'px,' + camera.y +
        'px) scale(' + camera.scale + ')',
    }}>
      <Sequence from={REVEAL_FRAME} durationInFrames={FRAMES-REVEAL_FRAME}>
        <OffthreadVideo src={staticFile('mobile-capture-v4.mp4')} muted
          style={{height:'100%',width:'100%',objectFit:'cover'}}/>
      </Sequence>
    </div>}
  </AbsoluteFill>;
}

export const YkeizumiMobileReels = YkeizumiMobileDirectorCut;
export function RemotionRoot() {
  return <Composition id="YkeizumiMobileReels" component={YkeizumiMobileReels}
    width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={FRAMES}/>;
}
registerRoot(RemotionRoot);
