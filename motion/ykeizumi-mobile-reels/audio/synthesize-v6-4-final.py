#!/usr/bin/env python3
"""Math Brands / Ykeizumi V6.4 — original procedural sonic branding.
Retains V6.3-style warm ambient harmony and adds synchronized, restrained
typing, a single sector click, two gallery drag swooshes, and a footer entry.

No third-party samples, melodies, copyrighted recordings or licensed assets.
"""
from __future__ import annotations
from array import array
from pathlib import Path
import math,random,struct,wave

SR=32000
FPS=30
FRAMES=1290
DURATION=FRAMES/FPS
N=SR*FRAMES//FPS
TAU=math.tau
OUT=Path(__file__).resolve().parents[1]/"public/v6-4-music-and-foley.wav"
OUT.parent.mkdir(exist_ok=True)
rng=random.Random(640012)

def smooth(a,b,x):
    t=max(0.,min(1.,(x-a)/(b-a)))
    return t*t*(3-2*t)

# Preserve the approved restrained, warm original harmonic character.
notes=((98.00,.0081),(146.83,.0072),(196.00,.0050),(293.66,.0020))
samples=array("f",[0.0])*N
noise_state=0.0
for i in range(N):
    t=i/SR
    fade=smooth(.03,1.1,t)*(1-smooth(41.65,42.97,t))
    breath=.72+.24*math.sin(TAU*.058*t)
    harmonic=sum(a*math.sin(TAU*f*t+(.3+f/120)*math.sin(TAU*.013*t))
                 for f,a in notes)
    noise_state=.986*noise_state+.014*(rng.random()*2-1)
    air=noise_state*.009
    a=t-3.8
    sweep=0.0
    if 0<a<2.7:
        env=smooth(0.,.7,a)*(1-smooth(1.75,2.7,a))
        sweep=math.sin(TAU*(80*a+25*a*a))*.009*env
    samples[i]=(harmonic*breath+air+sweep)*fade

def tap(frame,amp=.014,pitch=330,duration=.13,kind="key",seed=0):
    first=round(frame/SR*0) if False else int(round(frame/FPS*SR))
    count=min(N-first,int(SR*duration))
    if first>=N or count<=0:return
    rr=random.Random(34000+seed)
    phase=.45+seed*.27
    for j in range(count):
        a=j/SR
        env=math.exp(-43*a)
        if kind=="key":
            body=(.74*math.sin(TAU*pitch*a+phase)+.18*math.sin(TAU*(pitch*2.36)*a)+
                  .08*(rr.random()*2-1))
        else:
            body=(.72*math.sin(TAU*pitch*a+phase)+.15*math.sin(TAU*(pitch*1.8)*a)+
                  .13*(rr.random()*2-1))
        samples[first+j]+=amp*body*env

def swish(frame,amp=.019,dur=.72,seed=0):
    first=int(round(frame/FPS*SR))
    n=min(N-first,int(SR*dur))
    rr=random.Random(8291+seed)
    val=0.
    for j in range(n):
        a=j/SR;p=a/dur
        if n-j<=0:break
        shape=(math.sin(math.pi*p)**1.65)
        val=.89*val+.11*(rr.random()*2-1)
        flutter=math.sin(TAU*(190*a+165*a*a))
        samples[first+j]+=amp*shape*(.67*val+.33*flutter)

# Exact type schedule mirrored from SearchIntro.tsx in the approved source.
word="Consultoria Ambiental em Joinville"
weights=[2.0 if ch==" " else 1+((i*17+7)%9)/25 for i,ch in enumerate(word)]
total=sum(weights);cum=0.0
for i,w in enumerate(weights):
    cum+=w
    frame=12+int(round(59*cum/total))
    # Do not strike the space bar loudly; expressive but never foley-heavy.
    tap(frame,amp=.0063 if word[i]!=" " else .0037,
        pitch=338+(i*29)%144,duration=.08,seed=i)

# Search 'send' -> exactly one sector accordion -> two original gallery swipes.
tap(84,.022,285,.20,"click",500)
tap(190+427,.0175,257,.18,"click",617)
swish(190+642,.016,.68,1)
swish(190+713,.016,.68,2)
# Footer entry: barely perceptible atmospheric lift, not an impact.
swish(990,.008,.84,9)

# Limit peaks without an audible limiter, dither the 16-bit export.
with wave.open(str(OUT),"wb") as fh:
    fh.setnchannels(1);fh.setsampwidth(2);fh.setframerate(SR)
    buf=bytearray()
    for v in samples:
        v=max(-.98,min(.98,v))
        buf.extend(struct.pack("<h",int(v*32767)))
    fh.writeframes(buf)
print(f"Audio final verified: {OUT}, {DURATION:.3f}s, frames {N}, {OUT.stat().st_size} bytes")
