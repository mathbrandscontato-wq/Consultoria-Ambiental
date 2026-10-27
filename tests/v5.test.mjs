import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { renderPage } from '../src/lib/render.mjs';
import { routes } from '../src/site.mjs';
import { clamp, cardState } from '../src/scripts/tunnel-model.mjs';

const source = relative => readFile(new URL('../'+relative, import.meta.url), 'utf8');
const page = slug => renderPage(routes.find(route => route.slug === slug));
function sections(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, 'A página precisa de um main semântico');
  let depth = 0, start = 0;
  const result=[];
  for (const match of main.matchAll(/<\/?section\b[^>]*>/g)) {
    if (match[0].startsWith('</')) { depth--; if (!depth) result.push(main.slice(start, match.index+match[0].length)); }
    else { if (!depth) start=match.index; depth++; }
  }
  assert.equal(depth,0,'Seções devem fechar corretamente');
  return result;
}

test('V5 mantém as cinco rotas de homologação e um H1 semântico por página',()=>{
  assert.deepEqual(routes.map(route=>route.slug),['','sobre','servicos','projetos','contato']);
  for(const route of routes){
    const html=renderPage(route);
    assert.match(html,/<meta name="robots" content="noindex,nofollow">/,route.slug);
    assert.equal((html.match(/<h1\b/g)||[]).length,1,route.slug);
    assert.match(html,/<a class="skip-link" href="#conteudo">/,route.slug);
    assert.doesNotMatch(html,/<h1\b[^>]*aria-hidden="true"/,route.slug);
  }
});

test('V5 heros internos fotográficos contêm texto, fotografia e um único CTA de contato',()=>{
  for(const slug of ['sobre','servicos','projetos']){
    const hero=sections(page(slug))[0];
    assert.match(hero,/\bunified-hero\b/,slug);
    assert.match(hero,/<h1\b/,slug);
    assert.match(hero,/class="editorial-hero-media/,slug);
    assert.equal((hero.match(/href="\.\.\/contato\/"/g)||[]).length,1,slug+' deve ter um CTA, sem duplicação desktop/mobile');
    assert.ok(hero.indexOf('<h1')<hero.indexOf('<figure'),slug+' deve manter texto antes da mídia no DOM');
    assert.doesNotMatch(hero,/\bscroll-expand\b|\babout-tunnel\b/,slug+' não pode receber fullscreen expand nem tunnel no hero');
  }
  assert.match(sections(page(''))[0],/class="ha-video"/,'Home mantém hero em vídeo');
});

test('V5 Perspective Tunnel pertence apenas à seção 02 de Sobre e preserva Lara',()=>{
  const about=sections(page('sobre'));
  assert.equal(about.length,6,'Seis seções de Sobre devem ser preservadas');
  assert.match(about[1],/id="lara-yumi"/);
  assert.match(about[1],/\babout-tunnel\b/);
  assert.match(about[1],/<h2[^>]*>Lara Yumi<\/h2>/);
  assert.match(about[1],/src="\.\.\/media\/lara-yumi-640.webp"/);
  assert.match(about[1],/alt="Retrato de Lara Yumi"/);
  assert.match(about[1],/Joinville/);
  assert.doesNotMatch(about[1],/<canvas\b|class="[^"]*is-enhanced/,'Conteúdo é estático antes do aprimoramento JS');
  for(const [i,section] of about.entries())if(i!==1)assert.doesNotMatch(section,/\babout-tunnel\b/,'Tunnel fora da seção 02');
  for(const slug of ['','servicos','projetos','contato'])assert.doesNotMatch(page(slug),/class="[^"]*\babout-tunnel\b/,slug);
});

test('V5 rodapés não apresentam navegação social fictícia nem âncoras mortas',()=>{
  for(const route of routes){
    const footer=renderPage(route).match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
    assert.ok(footer,route.slug+' precisa de footer');
    for(const anchor of footer.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)){
      assert.ok(anchor[1].trim()&&!/^#?$|^(?:javascript|data):/i.test(anchor[1]),route.slug+': destino inválido '+anchor[1]);
    }
    assert.doesNotMatch(footer,/<a\b[^>]*class="[^"]*bwf-soc[^" ]*[^>]*href="[^" ]*#"/,'Não converter ícone sem URL em link fictício');
  }
});

function tunnelHarness(script,{reduce=false}={}){
  const listeners=[], frames=new Map(), classes=new Set();
  let nextFrame=0, top=0;
  const style=()=>({setProperty(key,value){this[key]=value;},removeProperty(key){delete this[key];}});
  const anchor={style:style()},cards=Array.from({length:6},()=>({style:style()}));
  const stage={clientWidth:1100,clientHeight:900,offsetHeight:900};
  const section={style:style(),offsetHeight:1800,getBoundingClientRect:()=>({top}),classList:{toggle(key,on){if(on)classes.add(key);else classes.delete(key);}},querySelector(selector){return selector==='.about-tunnel-stage'?stage:anchor;},querySelectorAll(){return cards;}};
  const media={matches:reduce,addEventListener(type,fn){listeners.push({target:'media',type,fn});}};
  const context={document:{querySelector:()=>section},window:{},innerWidth:1440,matchMedia:()=>media,clamp,cardState,Math,requestAnimationFrame(fn){const id=++nextFrame;frames.set(id,fn);return id;},cancelAnimationFrame(id){frames.delete(id);},addEventListener(type,fn,options){listeners.push({target:'window',type,fn,options});}};
  vm.runInNewContext(script.replace(/^import[^\n]*\n/,''),context);
  let time=0;
  const settle=()=>{for(let i=0;i<110&&frames.size;i++){time+=16;const pending=[...frames.values()];frames.clear();for(const fn of pending)fn(time);}};
  return {listeners,classes,anchor,cards,frames,settle,scroll(value){top=value;listeners.find(entry=>entry.target==='window'&&entry.type==='scroll').fn();settle();}};
}

test('V5 tunnel acompanha rolagem real reversível, sem interceptar wheel ou touch',async()=>{
  const script=await source('src/scripts/about-tunnel.mjs');
  const harness=tunnelHarness(script);harness.settle();
  const initial=harness.cards[0].style.transform;
  harness.scroll(-700);const progressed=harness.cards[0].style.transform;
  assert.notEqual(progressed,initial,'A posição no eixo Z deve mudar com scroll');
  for(const card of harness.cards)assert.equal(Number.parseFloat(card.style.height)/Number.parseFloat(card.style.width),1.25,'Cards preservam enquadramento 4:5 independente do CSS de perfil');
  harness.scroll(0);assert.equal(harness.cards[0].style.transform,initial,'Voltar na página reverte o estado');
  assert.equal(harness.frames.size,0,'O loop deve parar quando o estado estável é alcançado');
  assert.ok(harness.listeners.some(entry=>entry.type==='scroll'&&entry.options?.passive===true));
  assert.ok(harness.listeners.every(entry=>!['wheel','touchmove','touchstart'].includes(entry.type)),'Tunnel não pode capturar navegação vertical');
  assert.doesNotMatch(script,/preventDefault\s*\(|scrollTo\s*\(|scrollBy\s*\(/,'Tunnel não reposiciona o scroll do usuário');
});

test('V5 reduced motion mantém perfil estático sem iniciar quadros de animação',async()=>{
  const harness=tunnelHarness(await source('src/scripts/about-tunnel.mjs'),{reduce:true});
  assert.equal(harness.classes.has('is-enhanced'),false);
  assert.equal(harness.frames.size,0);
  assert.equal(harness.anchor.style.transform,undefined);
  assert.ok(harness.cards.every(card=>card.style.transform===undefined));
  const css=await source('src/styles/about-tunnel.css');
  assert.match(css,/\.about-tunnel-images\s*\{\s*display:none/,'As fotos decorativas não ocultam conteúdo no fallback');
});

function lightboxHarness(script){
 const document={activeElement:null,documentElement:{style:{overflow:'clip'}}};
 const node=()=>({events:new Map(),isConnected:true,addEventListener(type,fn){this.events.set(type,fn);},setAttribute(){},focus(){document.activeElement=this;}});
 const photo=node();photo.setPointerCapture=id=>{photo.capture=id;};
 const caption=node(),previous=node(),next=node(),close=node();
 const buttons=[previous,next,close];
 const dialog=node();dialog.querySelector=selector=>({'img':photo,'p':caption,'[data-prev]':previous,'[data-next]':next,'[data-close]':close})[selector];
 dialog.querySelectorAll=()=>buttons.filter(button=>!button.hidden);
 dialog.showModal=()=>{dialog.open=true;};
 dialog.close=()=>{dialog.open=false;dialog.events.get('close')?.();};
 const images=Array.from({length:3},(_,i)=>Object.assign(node(),{href:'/media/photo-'+i+'.webp',querySelector:()=>({alt:'Foto '+i}),closest:()=>({querySelector:()=>({textContent:'Foto '+i+' · Imagem ilustrativa'})})}));
 document.querySelectorAll=selector=>selector==='.project-image-link'?images:[];
 document.createElement=()=>dialog;
 document.body={append(){}};
 const context={document,matchMedia:()=>({matches:false,addEventListener(){}}),Element:{prototype:{}},window:{},Set,Map,HTMLDialogElement:{prototype:{showModal(){}}}};
 vm.runInNewContext(script,context);
 const event=extra=>({preventDefault(){this.prevented=true;},...extra});
 return {document,dialog,photo,caption,images,previous,next,close,event};
}

test('V5 lightbox preserva scroll e foco, com navegação por teclado e modificadores',async()=>{
 const harness=lightboxHarness(await source('src/scripts/motion.mjs'));
 const {document,dialog,photo,images,close,event}=harness;
 const modified=event({ctrlKey:true});images[0].events.get('click')(modified);
 assert.notEqual(dialog.open,true,'Clique com modificador mantém o comportamento do link');
 const click=event();images[0].events.get('click')(click);
 assert.equal(click.prevented,true);
 assert.equal(photo.src,images[0].href);
 assert.equal(document.documentElement.style.overflow,'hidden');
 assert.equal(document.activeElement,close);
 const right=event({key:'ArrowRight'});dialog.events.get('keydown')(right);
 assert.equal(photo.src,images[1].href);assert.equal(right.prevented,true);
 const tab=event({key:'Tab'});dialog.events.get('keydown')(tab);
 assert.equal(document.activeElement,harness.previous,'Tab do último controle retorna ao primeiro');
 harness.close.onclick();
 assert.equal(document.documentElement.style.overflow,'clip');
 assert.equal(document.activeElement,images[0],'Fechar restaura o foco na imagem de origem');
});

test('V5 swipe da lightbox distingue ponteiros, direção, cancelamento e fechamento',async()=>{
 const h=lightboxHarness(await source('src/scripts/motion.mjs'));
 h.images[0].events.get('click')(h.event());
 const down=(id,x=160,y=50)=>h.photo.events.get('pointerdown')({pointerType:'touch',pointerId:id,clientX:x,clientY:y});
 const up=(id,x=50,y=55)=>h.photo.events.get('pointerup')({pointerType:'touch',pointerId:id,clientX:x,clientY:y});
 down(1);assert.equal(h.photo.capture,1);up(2);assert.equal(h.photo.src,h.images[0].href,'Outro ponteiro não pode concluir swipe');
 up(1);assert.equal(h.photo.src,h.images[1].href);
 down(3);up(3,155,160);assert.equal(h.photo.src,h.images[1].href,'Gesto vertical não navega imagens');
 down(4);h.photo.events.get('pointercancel')();up(4);assert.equal(h.photo.src,h.images[1].href);
 down(5);h.close.onclick();h.images[0].events.get('click')(h.event());up(5);assert.equal(h.photo.src,h.images[0].href,'Swipe antigo não sobrevive ao fechamento');
});
