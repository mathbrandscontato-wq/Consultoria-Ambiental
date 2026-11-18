// One content tree: native disclosures on mobile, editorial tabs on desktop.
const explorer=document.querySelector('.service-explorer');
if(explorer){
 const tabs=[...explorer.querySelectorAll('.service-nav-item')];
 const panels=[...explorer.querySelectorAll('[data-service-panel]')];
 const items=[...explorer.querySelectorAll('.service-accordion-item')];
 const mobile=matchMedia('(max-width:760px)');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const valid=id=>panels.some(panel=>panel.id===id);
 const hash=()=>{try{return decodeURIComponent(location.hash.slice(1));}catch{return '';}};
 let selected=valid(hash())?hash():panels[0].id;
 const mobileOpen=new Set(valid(hash())?[hash()]:[]);
 const updateHash=id=>{if(location.hash!=='#'+id)history.pushState(null,'','#'+id);};
 const summaryFor=id=>explorer.querySelector('#accordion-'+id);
 const select=(id,{focus=false,scroll=false,history=false}={})=>{
  if(!valid(id))return;
  selected=id;
  if(history)updateHash(id);
  for(const tab of tabs){const active=tab.getAttribute('aria-controls')===id;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;}
  if(mobile.matches){
   mobileOpen.add(id);
   const item=items.find(item=>item.dataset.serviceItem===id);item.open=true;summaryFor(id).setAttribute('aria-expanded','true');
  }else for(const panel of panels)panel.hidden=panel.id!==id;
  explorer.dataset.activeService=id;
  const target=mobile.matches?summaryFor(id):tabs.find(tab=>tab.getAttribute('aria-controls')===id);
  if(focus)target.focus({preventScroll:true});
  if(scroll)(mobile.matches?items.find(item=>item.dataset.serviceItem===id):explorer).scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
 };
 const layout=(first=false)=>{
  const hadFocus=explorer.contains(document.activeElement);
  explorer.dataset.serviceMode=mobile.matches?'accordion':'tabs';
  items.forEach(item=>{
   const panel=item.querySelector('[data-service-panel]'),summary=item.querySelector('summary');
   panel.setAttribute('role',mobile.matches?'region':'tabpanel');
   panel.setAttribute('aria-labelledby',(mobile.matches?'accordion-':'tab-')+panel.id);
   panel.tabIndex=mobile.matches?-1:0;
   panel.hidden=mobile.matches?false:panel.id!==selected;
   item.open=mobile.matches?mobileOpen.has(panel.id):true;
   summary.setAttribute('aria-expanded',String(item.open));
  });
  if(!first&&hadFocus)(mobile.matches?summaryFor(selected):tabs.find(tab=>tab.getAttribute('aria-controls')===selected)).focus({preventScroll:true});
  explorer.dataset.activeService=selected;
 };
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();select(tab.getAttribute('aria-controls'),{focus:true,history:true});});
  tab.addEventListener('keydown',event=>{
   if(!['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Home','End',' '].includes(event.key))return;
   event.preventDefault();let target=index;
   if(event.key==='Home')target=0;else if(event.key==='End')target=tabs.length-1;
   else if(event.key!==' ')target=(index+(['ArrowRight','ArrowDown'].includes(event.key)?1:-1)+tabs.length)%tabs.length;
   select(tabs[target].getAttribute('aria-controls'),{focus:true,history:true});
  });
 });
 for(const item of items)item.addEventListener('toggle',()=>{
  if(!mobile.matches)return;
  const id=item.dataset.serviceItem;summaryFor(id).setAttribute('aria-expanded',String(item.open));
  if(item.open){mobileOpen.add(id);selected=id;explorer.dataset.activeService=id;}else mobileOpen.delete(id);
 });
 explorer.classList.add('is-enhanced');layout(true);
 if(valid(hash()))requestAnimationFrame(()=>select(hash(),{scroll:true}));
 mobile.addEventListener('change',()=>layout());
 const restore=()=>{if(valid(hash()))select(hash(),{scroll:true});};
 addEventListener('hashchange',restore);addEventListener('popstate',restore);
 for(const link of document.querySelectorAll('.context-service-link'))link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const id=link.hash.slice(1);if(!valid(id))return;event.preventDefault();select(id,{focus:true,scroll:true,history:true});
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
