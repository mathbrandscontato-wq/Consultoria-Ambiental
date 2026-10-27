import { clamp, cardState, titleState } from './tunnel-model.mjs';
// Native page scrolling drives one shared camera; no wheel/touch interception.
const section=document.querySelector('.tunnel-scroll');
if(section) {
 const stage=section.querySelector('.tunnel-stage'),title=stage.querySelector('.editorial-head'),images=[...stage.querySelectorAll('.tunnel-images img')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,visible=true,current=0,target=0,last=0;
 const paint=()=>{
  const box=stage.getBoundingClientRect(),mobile=innerWidth<768;
  const typography=reduced.matches?{scale:1,opacity:1}:titleState(current);
  title.style.transform=`scale(${typography.scale})`;
  title.style.opacity=typography.opacity;
  images.forEach((img,index)=>{
   const state=cardState(current,index,images.length,mobile);
   const angle=state.angle;
   const width=mobile?Math.max(100,Math.min(180,box.width*.38)):Math.max(180,Math.min(270,box.width*.18));
   img.style.width=width+'px';img.style.height=width*1.25+'px';
   const z=reduced.matches?-500:state.z;
   const x=Math.cos(angle)*box.width*state.radiusX,y=Math.sin(angle)*box.height*state.radiusY;
   img.style.left='50%';img.style.top='50%';img.style.zIndex=index+1;
   img.style.transform=`translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),${z}px) rotateZ(${state.rotation}deg)`;
   // Fade before the projected rectangle reaches an edge, so no opaque card is cut.
   const perspective=mobile?900:1200,projection=perspective/(perspective-z);
   const radians=Math.abs(state.rotation)*Math.PI/180;
   const halfW=(width*Math.cos(radians)+width*1.25*Math.sin(radians))/2*projection;
   const halfH=(width*Math.sin(radians)+width*1.25*Math.cos(radians))/2*projection;
   const clearance=Math.min(box.width/2-Math.abs(x*projection)-halfW,box.height/2-Math.abs(y*projection)-halfH);
   const edgeOpacity=clamp(clearance/(mobile?28:55));
   img.style.opacity=reduced.matches?.38:state.opacity*edgeOpacity;
  });
 };
 const tick=time=>{frame=0;const dt=last?Math.min(50,time-last):16;last=time;current+= (target-current)*(1-Math.exp(-dt/95));if(Math.abs(target-current)<.0001)current=target;paint();if(visible&&Math.abs(target-current)>.0001)frame=requestAnimationFrame(tick);};
 const schedule=()=>{
  const rect=section.getBoundingClientRect();target=reduced.matches?0:clamp(-rect.top/Math.max(1,section.offsetHeight-stage.offsetHeight));
  if(reduced.matches){current=0;paint();return;}
  if(visible&&!frame){last=0;frame=requestAnimationFrame(tick);}
 };
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();},{rootMargin:'100px'}).observe(section);
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',schedule);schedule();
}
