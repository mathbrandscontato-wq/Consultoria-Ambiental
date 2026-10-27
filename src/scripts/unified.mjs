const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const clamp=v=>Math.max(0,Math.min(1,v));
// Continuous, reversible word opacity and media width follow document scroll.
const scrollItems=[];
for(const heading of document.querySelectorAll('[data-scroll-reveal]')){
 const label=heading.textContent.trim();heading.setAttribute('aria-label',label);
 const words=label.split(/\s+/).map(word=>{const span=document.createElement('span');span.textContent=word;span.setAttribute('aria-hidden','true');span.className='scroll-word';return span;});
 heading.replaceChildren(...words.flatMap((word,i)=>i?[document.createTextNode(' '),word]:[word]));
 scrollItems.push({element:heading,words});
}
for(const media of document.querySelectorAll('.scroll-expand'))scrollItems.push({element:media,expand:true});
let frame=0;const visible=new Set(scrollItems);
function update(){frame=0;for(const item of visible){const rect=item.element.getBoundingClientRect();if(item.expand){const p=reduce.matches?1:clamp((innerHeight*.95-rect.top)/(innerHeight*.65));item.element.style.width=(88+12*p)+'%';item.element.style.borderRadius=(24*(1-p))+'px';}else{const p=reduce.matches?1:clamp((innerHeight*.86-rect.top)/(innerHeight*.62));item.words.forEach((word,i)=>{word.style.opacity=String(.32+.68*clamp(p*(item.words.length+2)-i));});}}}
const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){const item=scrollItems.find(i=>i.element===e.target);if(e.isIntersecting)visible.add(item);else visible.delete(item);}schedule();},{rootMargin:'100px'});scrollItems.forEach(i=>observer.observe(i.element));}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduce.addEventListener('change',()=>{for(const item of scrollItems)visible.add(item);schedule();});update();
// Same selected state drives context, media and accessible selection feedback.
for(const showcase of document.querySelectorAll('.sector-showcase')){
 const items=[...showcase.querySelectorAll('.sector-option')],images=[...showcase.querySelectorAll('.sector-stage img')];
 showcase.classList.add('is-enhanced');let active=0;
 const choose=i=>{active=i;items.forEach((item,n)=>{item.open=n===i;item.querySelector('summary').setAttribute('aria-expanded',String(n===i));});images.forEach((image,n)=>image.classList.toggle('is-active',n===i));};
 items.forEach((item,i)=>{const trigger=item.querySelector('summary');trigger.addEventListener('click',e=>{e.preventDefault();choose(i);});trigger.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?items.length-1:(active+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;choose(next);items[next].querySelector('summary').focus();}});});choose(0);
}
// Grid-row height transition keeps every FAQ answer in ordinary document flow.
for(const button of document.querySelectorAll('.faq-trigger')){
 const panel=document.getElementById(button.getAttribute('aria-controls'));button.setAttribute('aria-expanded','false');panel.classList.add('is-enhanced');panel.inert=true;panel.setAttribute('aria-hidden','true');
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));panel.classList.toggle('is-open',open);panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));});
}
