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

// Page scroll advances the horizontal timeline; native horizontal scrolling is the fallback.
const timelineSection=document.querySelector('.about-approach');
if(timelineSection){
 const container=timelineSection.querySelector('.editorial-container');
 const scene=timelineSection.querySelector('.about-timeline-scene');
 const viewport=timelineSection.querySelector('.about-timeline-viewport');
 const track=timelineSection.querySelector('.about-timeline');
 const steps=[...track.children];
 let distance=0,travel=0,frame=0,enabled=false,positions=[];
 const update=()=>{
  frame=0;if(!enabled)return;
  const progress=Math.max(0,Math.min(1,(104-container.getBoundingClientRect().top)/travel));
  track.style.setProperty('--timeline-x',(-distance*progress)+'px');
  steps.forEach((step,i)=>{
   const appearance=Math.max(0,Math.min(1,(viewport.clientWidth-positions[i]+distance*progress)/180));
   step.style.setProperty('--step-opacity',appearance);
   step.style.setProperty('--step-x',((1-appearance)*44)+'px');
  });
 };
 const schedule=()=>{if(!frame&&enabled)frame=requestAnimationFrame(update);};
 const measure=()=>{
  enabled=false;timelineSection.classList.remove('is-timeline-enhanced');
  track.style.removeProperty('--timeline-x');
  steps.forEach(step=>{step.style.removeProperty('--step-opacity');step.style.removeProperty('--step-x');});
  if(reduced.matches||innerHeight<620)return;
  positions=steps.map(step=>step.getBoundingClientRect().left-track.getBoundingClientRect().left);
  distance=Math.max(0,track.scrollWidth-viewport.clientWidth);
  // Pin only when the complete heading and stage fit in the available screen.
  if(scene.getBoundingClientRect().height>innerHeight-120)return;
  travel=Math.max(innerHeight*.9,distance*1.1);
  container.style.setProperty('--timeline-travel',travel+'px');
  viewport.scrollLeft=0;
  timelineSection.classList.add('is-timeline-enhanced');enabled=true;update();
 };
 viewport.addEventListener('keydown',event=>{
  if(!enabled||!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
  event.preventDefault();
  const start=scrollY+container.getBoundingClientRect().top-104;
  const target=event.key==='Home'?start:event.key==='End'?start+travel:scrollY+(event.key==='ArrowRight'?1:-1)*travel/3;
  scrollTo({top:Math.max(start,Math.min(start+travel,target)),behavior:'instant'});
 });
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',measure,{passive:true});
 reduced.addEventListener('change',measure);
 if(document.fonts)document.fonts.ready.then(measure);else measure();
}
