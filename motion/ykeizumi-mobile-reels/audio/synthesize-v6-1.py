#!/usr/bin/env python3
"""Original, sample-free Ykeizumi ambient sound design for the Math Brands V6.1 reel.

All tones and noise are mathematically synthesized; no sound recordings,
commercial samples, copyrighted melodies or third-party audio tracks.
"""
from __future__ import annotations
import math, random, struct, wave, pathlib

SR=32000
DURATION=33
N=SR*DURATION
OUT=pathlib.Path(__file__).resolve().parents[1]/"public"/"v6-1-original-ambience.wav"
OUT.parent.mkdir(parents=True,exist_ok=True)
random.seed(611)
TAU=2*math.pi

def smooth(x:float)->float:
    x=max(0.,min(1.,x))
    return x*x*(3-2*x)

def cue(t:float,point:float)->float:
    a=t-point
    if a<0 or a>.23:return 0.
    # Restrained, soft, low-pitched interaction accent rather than a hard UI click.
    return math.exp(-22*a)*(math.sin(TAU*390*a)*.013+math.sin(TAU*170*a)*.016)

def sweep(t:float)->float:
    a=t-3.8
    if not 0<a<2.7:return 0.
    env=smooth(a/.7)*(1-smooth((a-1.75)/.95))
    # Gentle original rising texture; does not mimic any branded sound.
    return math.sin(TAU*(80*a+25*a*a))*.009*env

notes=((98.00,.0081),(146.83,.0072),(196.00,.0050),(293.66,.0020))
events=(2.79,20.82,22.34,27.74,30.13)
waveform=[]
noise_state=0.
for i in range(N):
    t=i/SR
    fade=smooth(t/1.3)*(1-smooth((t-31.65)/1.35))
    breath=.72+.24*math.sin(TAU*.058*t)
    # Warm, quiet non-melodic cluster with gentle temporal movement.
    harmonic=sum(a*math.sin(TAU*f*t+(.3+f/120)*math.sin(TAU*.013*t))
                 for f,a in notes)
    # Air: one-pole filtered deterministic procedural noise.
    noise_state=.986*noise_state+.014*(random.random()*2-1)
    air=noise_state*.009
    clicks=sum(cue(t,p) for p in events)
    # The sound supports the images; it never asserts a particular event.
    v=(harmonic*breath+air+sweep(t)+clicks)*fade
    v=max(-.80,min(.80,v))
    waveform.append(struct.pack('<h',int(v*32767)))
with wave.open(str(OUT),'wb') as audio:
    audio.setnchannels(1)
    audio.setsampwidth(2)
    audio.setframerate(SR)
    audio.writeframes(b''.join(waveform))
print(f'Original ambient audio generated: {OUT}, {DURATION}s, {SR}Hz, {OUT.stat().st_size} bytes')
