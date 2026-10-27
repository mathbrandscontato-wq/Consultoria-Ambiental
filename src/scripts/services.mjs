// Native adaptation of Feature01: one selected service, shared stable crossfade media.
const explorer=document.querySelector('.service-explorer');
if(explorer){
 const items=[...explorer.querySelectorAll('.service-feature')];
 const media=[...explorer.querySelectorAll('[data-service-media]')];
 const valid=id=>items.some(item=>item.id===id);
 const hashId=()=>{try{return decodeURIComponent(location.hash.slice(1));}catch{return '';}};
 const select=(id,updateUrl=false)=>{
  if(!valid(id))return;
  for(const item of items){const selected=item.id===id;item.open=selected;item.querySelector('summary').setAttribute('aria-expanded',String(selected));}
  for(const frame of media)frame.classList.toggle('is-active',frame.dataset.serviceMedia===id);
  explorer.dataset.activeService=id;
  if(updateUrl&&location.hash!=='#'+id)history.pushState(null,'','#'+id);
 };
 for(const [index,item] of items.entries()){
  const summary=item.querySelector('summary');
  summary.addEventListener('click',event=>{event.preventDefault();select(item.id,true);});
  summary.addEventListener('keydown',event=>{
   if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
   event.preventDefault();let next=index;
   if(event.key==='ArrowDown')next=(index+1)%items.length;
   if(event.key==='ArrowUp')next=(index-1+items.length)%items.length;
   if(event.key==='Home')next=0;if(event.key==='End')next=items.length-1;
   select(items[next].id,true);items[next].querySelector('summary').focus({preventScroll:true});
  });
 }
 const fromUrl=()=>select(valid(hashId())?hashId():items[0].id);
 addEventListener('hashchange',fromUrl);addEventListener('popstate',fromUrl);
 explorer.classList.add('is-enhanced');fromUrl();
 // Contextual links select the correct item without browser anchor jumps.
 for(const link of document.querySelectorAll('.context-service-link'))link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const id=link.hash.slice(1);if(!valid(id))return;
  event.preventDefault();select(id,true);
  explorer.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
  items.find(item=>item.id===id).querySelector('summary').focus({preventScroll:true});
 });
}
// Custom progress extends the editorial three-step reference; no automatic rotation.
const process=document.querySelector('[data-service-process]');
if(process){
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');
 const steps=[...process.querySelectorAll('.service-process-step')];
 let visible=true,frame=0;
 const update=()=>{
  frame=0;if(!visible)return;
  const box=process.getBoundingClientRect();
  const progress=reduce.matches?1:Math.max(0,Math.min(1,(innerHeight*.82-box.top)/(box.height+innerHeight*.28)));
  process.style.setProperty('--process-progress',String(progress));
  steps.forEach((step,index)=>step.classList.toggle('is-active',reduce.matches||progress>=index/(steps.length-1)));
 };
 const queue=()=>{if(visible&&!frame)frame=requestAnimationFrame(update);};
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);if(visible)queue();},{rootMargin:'100px'}).observe(process);
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});reduce.addEventListener('change',queue);queue();
}
