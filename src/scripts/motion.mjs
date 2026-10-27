// G7.1: original native implementation; no third-party runtime or copied component source.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const compact = matchMedia('(max-width: 820px)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const active = new Set();
const run = (element, frames, options) => {
  if (reduced.matches || !element.animate) return;
  const animation = element.animate(frames, {...options, fill:'backwards'});
  active.add(animation);
  animation.finished.then(() => active.delete(animation), () => active.delete(animation));
};
reduced.addEventListener('change', () => { if (reduced.matches) for (const animation of active) animation.cancel(); });

// Spans preserve original whitespace, <br>, <em> and responsive heading variants.
const split = heading => {
  const label = heading.getAttribute('aria-label') || heading.innerText.replace(/\s+/g,' ').trim();
  heading.setAttribute('aria-label', label);
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  const words=[];
  for(const node of nodes) {
    const fragment=document.createDocumentFragment();
    for(const part of node.textContent.split(/(\s+)/)) {
      if(!part || /^\s+$/.test(part)) fragment.append(document.createTextNode(part));
      else { const word=document.createElement('span'); word.className='motion-word'; word.textContent=part; word.setAttribute('aria-hidden','true'); fragment.append(word); words.push(word); }
    }
    node.replaceWith(fragment);
  }
  return words;
};
const headings = new Map();
if (!reduced.matches && Element.prototype.animate) for (const heading of document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')) if(!heading.hasAttribute('data-scroll-reveal')&&!heading.closest('.faq-question'))headings.set(heading, split(heading));
const heroOrder=['.ha-title','.ha-subtitle','.ha-description','.ha-cta--services','.ha-scroll-hint'];
const heroDelay=element=>{const index=heroOrder.findIndex(s=>element.matches(s));return index<0?0:index*240;};
const reveal = element => {
  const words=headings.get(element);
  if(words) {
    let index=0;
    for(const word of words) if(word.getClientRects().length) run(word,[{opacity:0,transform:`translateY(${compact.matches?7:12}px)`},{opacity:1,transform:'translateY(0)'}],{duration:compact.matches?450:560,delay:heroDelay(element)+Math.min(index++*42,240),easing:'cubic-bezier(.2,.7,.2,1)'});
  } else run(element,[{opacity:0,transform:`translateY(${compact.matches?12:16}px)`},{opacity:1,transform:'translateY(0)'}],{delay:heroDelay(element),duration:element.matches('img')?480:(compact.matches?420:520),easing:'cubic-bezier(.2,.7,.2,1)'});
};
if ('IntersectionObserver' in window && !reduced.matches) {
  // Observe individual blocks, never nested sections and heading together.
  const targets = new Set([...headings.keys(), ...document.querySelectorAll('[data-reveal],.ha-scroll-hint'), ...document.querySelectorAll('.ha-main > .ha-cta, .ha-logo, .ha-nav > a, .editorial-head > p, .editorial-copy, .editorial-segments, .editorial-service, .page-head > p, .editorial-end, .editorial-last > p, .page-profile img, .project-card:not(.project-card--placeholder) img')]);
  const observer = new IntersectionObserver(entries => { for(const entry of entries) if(entry.isIntersecting) { observer.unobserve(entry.target); reveal(entry.target); } }, {threshold:0.08});
  for(const element of targets) if(!element.closest('.circular-gallery')&&!element.hasAttribute('data-scroll-reveal')) observer.observe(element);
  reduced.addEventListener('change',()=>{if(reduced.matches) observer.disconnect();});
}
// Pointer listeners only on service cards; movement is coalesced to one frame.
for(const card of document.querySelectorAll('.service-row')) {
  let rect, frame, point;
  const clear=()=>{cancelAnimationFrame(frame);frame=null;card.classList.remove('spotlight-active');};
  card.addEventListener('pointerenter',()=>{if(finePointer.matches&&!reduced.matches)rect=card.getBoundingClientRect();});
  card.addEventListener('pointermove',event=>{
    if(!finePointer.matches||reduced.matches||!rect)return;
    point={x:event.clientX-rect.left,y:event.clientY-rect.top};
    if(!frame)frame=requestAnimationFrame(()=>{card.style.setProperty('--spot-x',point.x+'px');card.style.setProperty('--spot-y',point.y+'px');card.classList.add('spotlight-active');frame=null;});
  });
  card.addEventListener('pointerleave',clear); card.addEventListener('pointercancel',clear);
  finePointer.addEventListener('change',clear); reduced.addEventListener('change',clear);
}
// Enhance real-image anchors only. Placeholders never receive controls or animation.
const images=[...document.querySelectorAll('.project-image-link')];
if(images.length && typeof HTMLDialogElement!=='undefined' && HTMLDialogElement.prototype.showModal) {
  const dialog=document.createElement('dialog');dialog.className='project-lightbox';dialog.setAttribute('aria-label','Imagem ampliada da galeria');
  dialog.innerHTML='<div class="lightbox-controls"><button type="button" data-prev aria-label="Imagem anterior"><svg class="ui-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M19 12H5m7 7-7-7 7-7"/></svg></button><button type="button" data-next aria-label="Próxima imagem"><svg class="ui-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button><button type="button" data-close aria-label="Fechar imagem ampliada">Fechar</button></div><img alt=""><p class="lightbox-caption"></p>';
  document.body.append(dialog);
  const photo=dialog.querySelector('img'),caption=dialog.querySelector('p');let current=0,origin,oldOverflow;
  const show=index=>{current=(index+images.length)%images.length;const anchor=images[current],image=anchor.querySelector('img');photo.src=anchor.href;photo.alt=image.alt;caption.textContent=anchor.closest('.project-card').querySelector('.project-card__footer').textContent;};
  for(const [index,anchor] of images.entries()) anchor.addEventListener('click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();origin=anchor;show(index);oldOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';dialog.showModal();dialog.querySelector('[data-close]').focus();});
  dialog.querySelector('[data-close]').onclick=()=>dialog.close();
  dialog.querySelector('[data-prev]').onclick=()=>show(current-1);dialog.querySelector('[data-next]').onclick=()=>show(current+1);
  if(images.length<2)for(const b of dialog.querySelectorAll('[data-prev],[data-next]'))b.hidden=true;
  dialog.addEventListener('close',()=>{document.documentElement.style.overflow=oldOverflow;if(origin?.isConnected)origin.focus();});
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}
    if(event.key==='Tab'){const buttons=[...dialog.querySelectorAll('button:not([hidden])')];const first=buttons[0],last=buttons.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
  });
}
