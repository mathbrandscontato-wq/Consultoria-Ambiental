// Accessible two-column service selector; anchored links from Home and footer are preserved.
const explorer=document.querySelector('.service-explorer');
if(explorer){
 const tabs=[...explorer.querySelectorAll('.service-nav-item')];
 const panels=[...explorer.querySelectorAll('[data-service-panel]')];
 const valid=id=>panels.some(panel=>panel.id===id);
 const currentHash=()=>{try{return decodeURIComponent(location.hash.slice(1));}catch{return '';}};
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const select=(id,{updateUrl=false,focus=false,scroll=false}={})=>{
  if(!valid(id))return;
  for(const tab of tabs){
   const active=tab.getAttribute('aria-controls')===id;
   tab.classList.toggle('is-active',active);
   tab.setAttribute('aria-selected',String(active));
   tab.tabIndex=active?0:-1;
  }
  for(const panel of panels)panel.hidden=panel.id!==id;
  explorer.dataset.activeService=id;
  if(updateUrl&&location.hash!=='#'+id)history.pushState(null,'','#'+id);
  const activeTab=tabs.find(tab=>tab.getAttribute('aria-controls')===id);
  if(focus)activeTab?.focus({preventScroll:true});
  if(scroll)explorer.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'});
 };
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',event=>{
   if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   event.preventDefault();
   select(tab.getAttribute('aria-controls'),{updateUrl:true,focus:true});
  });
  tab.addEventListener('keydown',event=>{
   if(!['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
   event.preventDefault();
   let target=index;
   if(event.key==='Home')target=0;
   else if(event.key==='End')target=tabs.length-1;
   else target=(index+(event.key==='ArrowRight'||event.key==='ArrowDown'?1:-1)+tabs.length)%tabs.length;
   select(tabs[target].getAttribute('aria-controls'),{updateUrl:true,focus:true});
  });
 });
 explorer.classList.add('is-enhanced');
 const initial=currentHash();
 select(valid(initial)?initial:panels[0].id);
 if(valid(initial))requestAnimationFrame(()=>explorer.scrollIntoView({behavior:'instant',block:'start'}));
 const restore=()=>{
  const id=currentHash();
  select(valid(id)?id:panels[0].id);
  if(valid(id))explorer.scrollIntoView({behavior:'instant',block:'start'});
 };
 addEventListener('hashchange',restore);
 addEventListener('popstate',restore);
 for(const link of document.querySelectorAll('.context-service-link'))link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const id=link.hash.slice(1);
  if(!valid(id))return;
  event.preventDefault();
  select(id,{updateUrl:true,focus:true,scroll:true});
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
