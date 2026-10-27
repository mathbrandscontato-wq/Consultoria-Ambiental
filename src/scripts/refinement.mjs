const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover:hover) and (pointer:fine)');
for (const row of document.querySelectorAll('.cinematic-row')) {
  let pinned = false;
  row.querySelector('summary').addEventListener('click', event => {
    if (!fine.matches) return;
    event.preventDefault(); pinned = !pinned; row.open = pinned;
  });
  row.addEventListener('pointerenter', () => { if (fine.matches) row.open = true; });
  row.addEventListener('pointerleave', () => { if (fine.matches && !pinned && !row.contains(document.activeElement)) row.open = false; });
  row.addEventListener('keydown', event => { if (event.key === 'Escape') { pinned = false; row.open = false; row.querySelector('summary').focus(); } });
}
const sectors = document.querySelectorAll('.sector-item');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } },{threshold:.2});
  sectors.forEach(s => observer.observe(s));
}
for (const carousel of document.querySelectorAll('.photo-carousel')) {
  const track=carousel.querySelector('.project-gallery'), prev=carousel.querySelector('[data-carousel-prev]'), next=carousel.querySelector('[data-carousel-next]');
  const update=()=>{prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2;};
  const move=direction=>track.scrollBy({left:direction*(track.querySelector('.project-card').getBoundingClientRect().width+20),behavior:reduce.matches?'instant':'smooth'});
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  track.addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});
  track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}});update();
}
