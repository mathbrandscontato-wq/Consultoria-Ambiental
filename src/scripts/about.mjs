// Page-only native adaptations; no third-party runtime or data collection.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover: hover) and (pointer: fine)');
const topology=document.querySelector('.about-topography');
if(topology){
 let visible=false,frame=0,rect,point;
 const art=topology.querySelector('.topography-art');
 if('IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){visible=entry.isIntersecting;topology.classList.toggle('is-active',visible&&!reduced.matches);}},{threshold:.02});
  observer.observe(topology);
 }else{visible=true;topology.classList.toggle('is-active',!reduced.matches);}
 const clear=()=>{cancelAnimationFrame(frame);frame=0;rect=null;};
 topology.addEventListener('pointerenter',()=>{if(fine.matches&&!reduced.matches)rect=topology.getBoundingClientRect();});
 topology.addEventListener('pointermove',event=>{
  if(!visible||!fine.matches||reduced.matches||!rect)return;
  point={x:(event.clientX-rect.left)/rect.width*100,y:(event.clientY-rect.top)/rect.height*100};
  if(!frame)frame=requestAnimationFrame(()=>{art.style.setProperty('--light-x',point.x+'%');art.style.setProperty('--light-y',point.y+'%');frame=0;});
 });
 topology.addEventListener('pointerleave',clear);
 addEventListener('scroll',()=>{rect=null;},{passive:true});
 // Rect is refreshed at the first move after a scroll, without continuous measurement.
 topology.addEventListener('pointermove',()=>{if(visible&&fine.matches&&!reduced.matches&&!rect)rect=topology.getBoundingClientRect();});
 reduced.addEventListener('change',()=>{clear();topology.classList.toggle('is-active',visible&&!reduced.matches);});
 fine.addEventListener('change',clear);
}

const portrait=document.querySelector('[data-image-reveal]');
if(portrait&&'IntersectionObserver'in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);if(!reduced.matches&&entry.target.animate){const animation=entry.target.animate([{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:800,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});reduced.addEventListener('change',()=>{if(reduced.matches)animation.cancel();},{once:true});}}},{threshold:.15});
 observer.observe(portrait);
}

const story=document.querySelector('[data-about-story]');
if(story){
 const steps=[...story.querySelectorAll('[data-story-step]')],frames=[...story.querySelectorAll('[data-story-frame]')];
 let visible=true,frame=0;
 const update=()=>{
  frame=0;if(!visible)return;
  const rect=story.getBoundingClientRect(),view=innerHeight;
  const progress=Math.max(0,Math.min(1,(view*.55-rect.top)/Math.max(1,rect.height-view*.35)));
  let active=0,nearest=Infinity;
  for(const [i,step]of steps.entries()){const bounds=step.getBoundingClientRect(),distance=Math.abs(bounds.top+Math.min(bounds.height*.4,view*.2)-view*.45);if(distance<nearest){nearest=distance;active=i;}}
  story.style.setProperty('--story-progress',progress);
  steps.forEach((step,i)=>step.classList.toggle('is-active',i===active));frames.forEach((image,i)=>image.classList.toggle('is-active',i===active));
 };
 const schedule=()=>{if(!frame&&visible)frame=requestAnimationFrame(update);};
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){visible=entry.isIntersecting;if(visible)schedule();}},{rootMargin:'100px'});observer.observe(story);}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});update();
}

for(const card of document.querySelectorAll('[data-bento]')){
 let rect,frame=0,point;
 const clear=()=>{cancelAnimationFrame(frame);frame=0;card.classList.remove('is-lit');};
 card.addEventListener('pointerenter',()=>{if(fine.matches&&!reduced.matches)rect=card.getBoundingClientRect();});
 card.addEventListener('pointermove',event=>{
  if(!rect||!fine.matches||reduced.matches)return;
  point={x:event.clientX-rect.left,y:event.clientY-rect.top};
  if(!frame)frame=requestAnimationFrame(()=>{card.style.setProperty('--bento-x',point.x+'px');card.style.setProperty('--bento-y',point.y+'px');card.classList.add('is-lit');frame=0;});
 });
 card.addEventListener('pointerleave',clear);card.addEventListener('pointercancel',clear);reduced.addEventListener('change',clear);fine.addEventListener('change',clear);
}
