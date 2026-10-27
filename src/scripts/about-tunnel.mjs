import { clamp, cardState } from './tunnel-model.mjs';
// Supplied 21st.dev geometry adapted to the existing static stack and native scroll.
// No wheel/touch handler, lock, animation framework, tracker or external asset.
const section=document.querySelector('.about-tunnel');
if(section){
 const stage=section.querySelector('.about-tunnel-stage');
 const anchor=section.querySelector('.about-tunnel-anchor');
 const cards=[...section.querySelectorAll('.about-tunnel-card')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,visible=false,current=0,target=0,last=0,dimensions;
 function measure(){dimensions={width:stage.clientWidth,height:stage.clientHeight,mobile:innerWidth<768};}
 function paint(){
  const {width,height,mobile}=dimensions;
  const selected=mobile?cards.slice(0,4):cards;
  anchor.style.transform=`translateZ(${-100+160*current}px)`;
  cards.forEach((image,index)=>{
   if(index>=selected.length){image.style.opacity=0;return;}
   const state=cardState(current,index,selected.length,mobile);
   const cardWidth=mobile?Math.max(120,Math.min(170,width*.38)):Math.max(180,Math.min(270,width*.18));
   const x=Math.cos(state.angle)*width*state.radiusX;
   const y=Math.sin(state.angle)*height*state.radiusY;
   image.style.width=cardWidth+'px';image.style.height=cardWidth*1.25+'px';
   image.style.transform=`translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),${state.z}px) rotateZ(${state.rotation}deg)`;
   image.style.opacity=state.opacity;
  });
  section.style.setProperty('--tunnel-progress',current.toFixed(4));
 }
 function tick(time){frame=0;if(!visible||reduced.matches)return;const dt=last?Math.min(50,time-last):16;last=time;current+=(target-current)*(1-Math.exp(-dt/95));if(Math.abs(target-current)<.0001)current=target;paint();if(Math.abs(target-current)>.0001)frame=requestAnimationFrame(tick);}
 function schedule(){
  if(reduced.matches)return;
  const rect=section.getBoundingClientRect();
  target=.14+.86*clamp(-rect.top/Math.max(1,section.offsetHeight-stage.offsetHeight));
  if(visible&&!frame){last=0;frame=requestAnimationFrame(tick);}
 }
 function configure(){
  cancelAnimationFrame(frame);frame=0;
  section.classList.toggle('is-enhanced',!reduced.matches);
  if(reduced.matches){anchor.style.removeProperty('transform');cards.forEach(i=>i.style.removeProperty('transform'));return;}
  measure();schedule();
 }
 if('IntersectionObserver'in window){new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'100px'}).observe(section);}else visible=true;
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',()=>{measure();schedule();},{passive:true});
 reduced.addEventListener('change',configure);
 addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;});
 configure();
}
