import { editorialHero, section, photo, ctaBanner } from '../components.mjs';

const stages = [
 { title:'Compreensão do contexto.', text:'A localização, o tipo de atividade e a necessidade apresentada são o ponto de partida para compreender a demanda.', media:'paisagem', alt:'Paisagem aberta com árvores, imagem ilustrativa' },
 { title:'Análise técnica.', text:'Os aspectos ambientais e os requisitos envolvidos ajudam a identificar quais frentes técnicas podem estar relacionadas ao projeto.', media:'floresta', alt:'Vista aérea de vegetação florestal, imagem ilustrativa' },
 { title:'Orientação e encaminhamento.', text:'A partir do escopo avaliado, a conversa pode avançar para os próximos encaminhamentos possíveis.', media:'litoral', alt:'Vista aérea de litoral com vegetação, imagem ilustrativa' }
];

// Original SVG contours; not a copied shader or a substitute photograph.
function contours(){
 const lines=Array.from({length:30},(_,i)=>{
  const radius=75+i*16;
  const points=Array.from({length:121},(_,j)=>{
   const angle=j/120*Math.PI*2;
   const variation=1+.105*Math.sin(angle*3+.7)+.07*Math.cos(angle*5-.5)+.045*Math.sin(angle*2+i*.035);
   return [(960+Math.cos(angle)*radius*variation*1.75).toFixed(1),(380+Math.sin(angle)*radius*variation).toFixed(1)].join(',');
  });
  return '<path d="M'+points.join(' L')+'Z"/>';
 }).join('');
 return '<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" stroke-width=".8" aria-hidden="true" focusable="false">'+'<defs><g id="about-contours">'+lines+'</g></defs><use href="#about-contours"/></svg>';
}

export function renderAbout(){
 const topology=contours();
 const topologyEcho='<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" stroke-width=".8" aria-hidden="true" focusable="false"><use href="#about-contours"/></svg>';
 return '<main id="conteudo" tabindex="-1" class="inner-page about-page">'+
 editorialHero({label:'Sobre a Ykeizumi',title:'Uma leitura técnica para decisões que transformam o território.',text:'Com base em Joinville, uma consultoria voltada ao contexto de cada demanda ambiental.',media:'territorio',classes:'about-hero page-banner--cream',expand:true})+
 section('lara-yumi','Lara Yumi','<div class="about-profile-grid"><figure class="lara-portrait about-portrait" data-image-reveal><img src="../media/lara-yumi-640.webp" srcset="../media/lara-yumi-640.webp 640w, ../media/lara-yumi-1280.webp 1280w" sizes="(max-width:767px) 92vw, 42vw" width="640" height="641" loading="lazy" decoding="async" alt="Retrato de Lara Yumi"></figure><div class="about-profile-copy"><h2>Lara Yumi</h2><p class="about-role" data-reveal>À frente da Ykeizumi Consultoria Ambiental.</p><div class="editorial-copy" data-reveal><p>A consultoria considera o contexto de cada projeto e as particularidades de cada demanda ambiental.</p><p>Atendimento com base em Joinville, com atuação no Norte e Litoral de Santa Catarina, conforme a necessidade e a viabilidade de cada demanda.</p></div><a class="about-text-link" href="../servicos/">Conheça as áreas de atuação <span aria-hidden="true"><svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></div></div>','page-profile about-profile')+
 section('visao','Visão de atuação','<div class="topography-art" aria-hidden="true"><div class="topography-base">'+topology+'</div><div class="topography-light">'+topologyEcho+'</div></div><div class="topography-copy"><h2 data-scroll-reveal>Cada território apresenta desafios próprios.</h2><p data-reveal>Uma demanda ambiental precisa ser compreendida em relação ao lugar, à atividade e aos requisitos envolvidos.</p></div>','about-topography')+
 section('abordagem','Da compreensão aos encaminhamentos','<div class="about-section-head"><h2>Uma demanda.<br>Diferentes perspectivas.</h2><p>Uma representação editorial das questões que orientam a compreensão de uma demanda ambiental. O encaminhamento depende do escopo de cada projeto.</p></div><div class="about-story" data-about-story><div class="about-story-steps"><div class="about-story-progress" aria-hidden="true"><span></span></div>'+stages.map((s,i)=>'<article class="about-story-step'+(!i?' is-active':'')+'" data-story-step="'+i+'"><span class="about-step-number">0'+(i+1)+'</span><div><h3>'+s.title+'</h3><p>'+s.text+'</p><figure class="about-story-mobile-media">'+photo(s.media,'../',s.alt)+'<figcaption>Imagem ilustrativa</figcaption></figure></div></article>').join('')+'</div><div class="about-story-media" aria-hidden="true">'+stages.map((s,i)=>'<figure class="about-story-frame'+(!i?' is-active':'')+'" data-story-frame="'+i+'">'+photo(s.media,'../','')+'<figcaption>Imagem ilustrativa</figcaption></figure>').join('')+'</div></div>','page-body about-approach')+
 section('principios','Perspectivas de atuação','<div class="about-section-head"><h2>Técnica, contexto<br>e responsabilidade.</h2><p>Três conceitos editoriais para compreender as diferentes dimensões de uma demanda ambiental.</p></div><div class="about-bento"><article class="about-bento-card about-bento-card--main" data-bento><span class="about-bento-number">01</span><div class="about-bento-contour" aria-hidden="true">'+topologyEcho+'</div><div><h3>Precisão técnica.</h3><p>Relacionar a demanda aos aspectos ambientais, geológicos e hidrogeológicos que precisam ser avaliados.</p></div></article><article class="about-bento-card" data-bento><span class="about-bento-number">02</span><div><h3>Leitura contextual.</h3><p>Considerar o território, a atividade e as particularidades de cada situação.</p></div></article><article class="about-bento-card" data-bento><span class="about-bento-number">03</span><div><h3>Responsabilidade profissional.</h3><p>Compreender o escopo técnico e os limites da atuação em cada demanda.</p></div></article></div>','about-principles')+
 ctaBanner({id:'conversa',title:'Vamos compreender o seu projeto?',text:'Converse com a Ykeizumi sobre as necessidades ambientais do seu projeto.',button:'Solicitar uma proposta'})+'</main>';
}
