// Beam Wordmark Footer by Kedhareswer Naidu: owner-supplied source ported to native DOM.
const root=document.querySelector('.bwf');
if(root){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),word=root.querySelector('.bwf-word'),inner=root.querySelector('.bwf-word-in'),letters=[...root.querySelectorAll('.bwf-l')];
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const approach=(from,to,k,dt)=>to+(from-to)*Math.pow(1-clamp(k,0,1),clamp(dt,0,.1)*60);
 let frame=0,visible=false,seen=false,last=0,b=58,px=0,py=0,g=0;
 const pointer={u:.5,x:0,y:0,inside:false};
 root.querySelectorAll('.bwf-fade,.bwf-label').forEach((el,i)=>el.style.setProperty('--bwf-d',(i+1)*70+'ms'));
 const place=()=>{
  const r=root.getBoundingClientRect();root.style.setProperty('--bwf-rw',r.width+'px');root.style.setProperty('--bwf-rh',r.height+'px');
  let top=0;
  letters.forEach((s,i)=>{let x=0,y=0,el=s;while(el&&el!==root){x+=el.offsetLeft;y+=el.offsetTop;el=el.offsetParent;}s.style.setProperty('--bwf-x',x+'px');s.style.setProperty('--bwf-y',y+'px');if(i===0)top=y;});
  root.style.setProperty('--bwf-top',top+'px');root.style.setProperty('--bwf-bot',top+parseFloat(inner.style.fontSize)*.92+'px');
 };
 const fit=()=>{
  const box=inner.parentElement,padding=parseFloat(getComputedStyle(box).paddingLeft)||0,target=box.clientWidth-padding*2;
  inner.style.fontSize='100px';const measured=inner.offsetWidth,size=measured?Math.min(100*target/measured,target*.42):100;
  const style=getComputedStyle(inner),ctx=document.createElement('canvas').getContext('2d');let baseline=.8;
  if(ctx){ctx.font=style.fontWeight+' 100px '+style.fontFamily;const m=ctx.measureText('Ykeizumi');if(m.fontBoundingBoxAscent>0)baseline=clamp(((100-m.fontBoundingBoxAscent-m.fontBoundingBoxDescent)/2+m.fontBoundingBoxAscent)/100,.5,1.2);}
  inner.style.fontSize=size+'px';word.style.height=Math.max(0,size*(baseline+.04))+'px';place();
 };
 const set=()=>{root.style.setProperty('--bwf-b',b.toFixed(2)+'%');root.style.setProperty('--bwf-px',px.toFixed(1)+'px');root.style.setProperty('--bwf-py',py.toFixed(1)+'px');root.style.setProperty('--bwf-g',g.toFixed(3));};
 const tick=now=>{frame=0;if(!visible||reduced.matches)return;const dt=last?Math.min(.1,(now-last)/1000):1/60;last=now;const t=now/1000,idle=58+9*(.7*Math.sin(t*.21)+.3*Math.sin(t*.077+1.3));const target=pointer.inside?(30+52*clamp(pointer.u,0,1))*.75+idle*.25:idle;b=approach(b,target,.035,dt);px=approach(px,pointer.x,.16,dt);py=approach(py,pointer.y,.16,dt);g=approach(g,pointer.inside?1:0,.06,dt);set();frame=requestAnimationFrame(tick);};
 const start=()=>{if(visible&&!reduced.matches&&!frame){last=0;frame=requestAnimationFrame(tick);}};
 const onPointer=event=>{const r=root.getBoundingClientRect();pointer.x=event.clientX-r.left;pointer.y=event.clientY-r.top;pointer.u=pointer.x/r.width;pointer.inside=event.type!=='pointerleave';if(reduced.matches){b=58;px=pointer.x;py=pointer.y;g=pointer.inside?1:0;set();}};
 ['pointermove','pointerenter','pointerleave'].forEach(type=>root.addEventListener(type,onPointer,{passive:true}));
 for(const letter of letters){letter.addEventListener('click',()=>{if(reduced.matches)return;letter.classList.remove('is-hop');void letter.offsetWidth;letter.classList.add('is-hop');});letter.addEventListener('animationend',()=>letter.classList.remove('is-hop'));}
 root.querySelectorAll('[data-social-placeholder]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
 if('IntersectionObserver'in window)new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){seen=true;root.dataset.in='true';start();}else {cancelAnimationFrame(frame);frame=0;}},{threshold:.12}).observe(root);else{visible=true;start();}
 reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;root.dataset.in=seen||reduced.matches?'true':'false';if(reduced.matches){b=58;g=0;set();}else start();});
 fit();root.dataset.in=reduced.matches?'true':'false';if('ResizeObserver'in window)new ResizeObserver(fit).observe(root);else addEventListener('resize',fit,{passive:true});document.fonts?.ready.then(fit);
}
