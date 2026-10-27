// DOM/CSS3D adaptation: arc geometry, perspective, direct drag and bounded inertia.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
for(const gallery of document.querySelectorAll('.circular-gallery')){
 const viewport=gallery.querySelector('.circular-window'),cards=[...gallery.querySelectorAll('.circular-card')];
 const prev=gallery.querySelector('[data-circular-prev]'),next=gallery.querySelector('[data-circular-next]'),status=gallery.querySelector('.circular-status');
 if(!cards.length)continue;
 viewport.classList.add('is-enhanced');viewport.tabIndex=0;viewport.setAttribute('aria-label','Arraste horizontalmente ou use as setas para explorar as fotografias');
 let position=Math.min(2,cards.length-1),target=position,frame=0,visible=true,pointer=null,startX=0,startY=0,startPosition=0,dragging=false,moved=false,lastX=0,lastTime=0,velocity=0;
 const bound=n=>Math.max(0,Math.min(cards.length-1,n));
 const paint=()=>{
  const radius=innerWidth<768?470:740;
  cards.forEach((card,i)=>{const d=i-position,angle=d*.48,x=Math.sin(Math.max(-2.3,Math.min(2.3,angle)))*radius,y=(1-Math.cos(angle))*105,z=(Math.cos(angle)-1)*390;
   card.style.transform=`translateX(calc(-50% + ${x}px)) translateY(${y}px) translateZ(${z}px) rotateY(${-angle*24}deg)`;
   card.style.opacity=Math.abs(d)>2.8?'0':'1';card.style.visibility=Math.abs(d)>2.8?'hidden':'visible';card.style.zIndex=String(20-Math.round(Math.abs(d)*3));card.classList.toggle('is-active',i===Math.round(position));
  });
  prev.disabled=target<=0;next.disabled=target>=cards.length-1;status.textContent=`${Math.round(position)+1} / ${cards.length}`;
 };
 const tick=()=>{frame=0;if(!visible)return;position=reduced.matches?target:position+(target-position)*.14;if(Math.abs(position-target)<.002)position=target;paint();if(position!==target&&!dragging)frame=requestAnimationFrame(tick);};
 const schedule=()=>{if(!frame&&visible)frame=requestAnimationFrame(tick);};
 const choose=i=>{target=bound(i);schedule();};
 prev.onclick=()=>choose(Math.round(target)-1);next.onclick=()=>choose(Math.round(target)+1);
 viewport.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();choose(event.key==='Home'?0:event.key==='End'?cards.length-1:Math.round(target)+(event.key==='ArrowRight'?1:-1));}});
 cards.forEach((card,i)=>card.querySelector('a').addEventListener('focus',()=>choose(i)));
 viewport.addEventListener('pointerdown',event=>{if(event.button!==0||pointer!==null)return;pointer=event.pointerId;startX=lastX=event.clientX;startY=event.clientY;startPosition=position;lastTime=event.timeStamp;velocity=0;dragging=false;moved=false;cancelAnimationFrame(frame);frame=0;});
 viewport.addEventListener('pointermove',event=>{if(event.pointerId!==pointer)return;const dx=event.clientX-startX,dy=event.clientY-startY;if(!dragging){if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){pointer=null;return;}if(Math.abs(dx)<8)return;dragging=true;moved=true;viewport.setPointerCapture(pointer);viewport.classList.add('is-dragging');}const dt=Math.max(1,event.timeStamp-lastTime);velocity=(event.clientX-lastX)/dt;lastX=event.clientX;lastTime=event.timeStamp;position=target=bound(startPosition-dx/290);paint();});
 const release=event=>{if(event.pointerId!==pointer)return;pointer=null;viewport.classList.remove('is-dragging');if(dragging){dragging=false;choose(Math.round(bound(position-velocity*(reduced.matches?0:.38))));}};
 viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);addEventListener('pointerup',release);
 viewport.addEventListener('click',event=>{if(moved){event.preventDefault();event.stopPropagation();moved=false;}},true);
 viewport.addEventListener('dragstart',event=>event.preventDefault());
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){visible=e.isIntersecting;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;}}},{rootMargin:'100px'});observer.observe(viewport);}
 addEventListener('resize',paint,{passive:true});reduced.addEventListener('change',()=>{position=target;paint();});paint();
}
