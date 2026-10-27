const expandable=document.querySelector('.expand-map');
if(expandable){
 const trigger=expandable.querySelector('.expand-map-trigger'),panel=expandable.querySelector('.expand-map-panel'),label=trigger.querySelector('[data-expand-label]');
 trigger.addEventListener('click',()=>{
  const open=trigger.getAttribute('aria-expanded')!=='true';
  trigger.setAttribute('aria-expanded',String(open));panel.hidden=!open;expandable.classList.toggle('is-open',open);
  label.textContent=open?'Recolher mapa':'Explore nossa região de atuação';
  dispatchEvent(new Event('resize'));
 });
}
// Bounded dragging of the existing high-resolution map. No external runtime or tracking.
const viewport=document.querySelector('.map-viewport');
if(viewport){
 const image=viewport.querySelector('img');
 let zoom=1,x=0,y=0,width=0,height=0,activePointer=null,startX=0,startY=0,originX=0,originY=0;
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 const paint=()=>{x=clamp(x,Math.min(0,viewport.clientWidth-width),0);y=clamp(y,Math.min(0,viewport.clientHeight-height),0);image.style.transform=`translate3d(${x}px,${y}px,0)`;};
 const resize=()=>{
  if(!viewport.clientWidth||!viewport.clientHeight)return;
  const oldWidth=width,oldHeight=height,oldX=x,oldY=y;
  width=Math.max(1050,viewport.clientWidth*1.18)*zoom;height=width*.75;
  image.style.width=width+'px';image.style.height=height+'px';
  x=oldWidth?oldX/oldWidth*width:viewport.clientWidth*.65-width*.6;
  y=oldHeight?oldY/oldHeight*height:viewport.clientHeight*.58-height*.3;
  paint();
 };
 viewport.addEventListener('pointerdown',event=>{
  if(event.button!==0||activePointer!==null)return;
  activePointer=event.pointerId;startX=event.clientX;startY=event.clientY;originX=x;originY=y;
  viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');viewport.focus({preventScroll:true});
 });
 viewport.addEventListener('pointermove',event=>{if(event.pointerId!==activePointer)return;x=originX+event.clientX-startX;y=originY+event.clientY-startY;paint();});
 const stop=()=>{activePointer=null;viewport.classList.remove('is-dragging');};
 viewport.addEventListener('pointerup',stop);viewport.addEventListener('pointercancel',stop);viewport.addEventListener('lostpointercapture',stop);
 viewport.addEventListener('dragstart',event=>event.preventDefault());
 viewport.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key))return;
  event.preventDefault();const step=event.shiftKey?160:70;
  if(event.key==='ArrowLeft')x+=step;if(event.key==='ArrowRight')x-=step;if(event.key==='ArrowUp')y+=step;if(event.key==='ArrowDown')y-=step;
  if(event.key==='Home'){x=viewport.clientWidth*.65-width*.6;y=viewport.clientHeight*.58-height*.3;}
  paint();
 });
 for(const button of document.querySelectorAll('[data-map-zoom]'))button.addEventListener('click',()=>{
  const next=Math.max(1,Math.min(2.5,zoom+(button.dataset.mapZoom==='in'?.25:-.25)));
  const ratio=next/zoom;x=(x-viewport.clientWidth/2)*ratio+viewport.clientWidth/2;y=(y-viewport.clientHeight/2)*ratio+viewport.clientHeight/2;
  zoom=next;width=Math.max(1050,viewport.clientWidth*1.18)*zoom;height=width*.75;image.style.width=width+'px';image.style.height=height+'px';paint();
 });
 document.querySelector('[data-map-reset]')?.addEventListener('click',()=>{zoom=1;width=0;height=0;resize();});
 if('ResizeObserver'in window)new ResizeObserver(resize).observe(viewport);else addEventListener('resize',resize,{passive:true});resize();
}
