import { editorialHero, section, ctaBanner } from '../components.mjs';

const stages = [
  {
    "title": "Diagnóstico.",
    "text": "Análise da atividade, da área e da legislação aplicável, com definição do enquadramento e do órgão competente.",
    "media": "paisagem",
    "alt": "Fotografia de paisagem natural"
  },
  {
    "title": "Estratégia.",
    "text": "Definição dos estudos necessários, do cronograma e dos pontos de atenção do processo.",
    "media": "floresta",
    "alt": "Fotografia de paisagem natural"
  },
  {
    "title": "Elaboração.",
    "text": "Levantamentos de campo e elaboração dos estudos e documentos técnicos, com responsável técnico habilitado.",
    "media": "litoral",
    "alt": "Fotografia de paisagem natural"
  },
  {
    "title": "Acompanhamento.",
    "text": "Protocolo, atendimento a complementações e acompanhamento até a emissão da licença, incluindo a gestão de condicionantes.",
    "media": "montanhas",
    "alt": "Fotografia de paisagem natural"
  }
];

const stageIcons = [
 '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
 '<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',
 '<path d="M6 2h8l4 4v16H6V2Zm8 0v5h4M9 11h6m-6 4h6m-6 4h6"/>',
 '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'
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
 return '<main id="conteudo" tabindex="-1" class="inner-page about-page">'+
 editorialHero({label:'Sobre a Ykeizumi',title:'Licenciamento estruturado desde o diagnóstico.',text:'A Ykeizumi Consultoria Ambiental atua em licenciamento, estudos e regularização ambiental para empreendimentos privados e para o setor público. A empresa reúne experiência na elaboração de estudos ambientais e na análise técnica de processos de licenciamento, nos setores privado e público.',media:'ykeizumi-floresta-trilhos',classes:'about-hero page-banner--cream',expand:true})+
 section('lara-yumi','Fundadora','<div class="about-profile-grid"><div class="about-profile-identity"><header class="about-profile-heading"><h2>Lara Yumi Fand Ykeizumi</h2><p class="about-role">Engenheira Ambiental e Sanitarista</p></header><figure class="lara-portrait about-portrait" data-image-reveal><img src="../media/lara-yumi-640.webp" srcset="../media/lara-yumi-640.webp 640w, ../media/lara-yumi-1280.webp 1280w" sizes="(max-width:767px) 92vw, 42vw" width="640" height="641" loading="lazy" decoding="async" alt="Retrato de Lara Yumi Fand Ykeizumi"></figure></div><div class="about-profile-copy"><div class="editorial-copy" data-reveal><p>Engenheira Ambiental e Sanitarista pela Universidade do Vale do Itajaí (Univali) e Mestre em Tecnologia e Ambiente pelo Instituto Federal Catarinense (IFC). Atua há mais de dez anos em licenciamento ambiental, com passagem pelos setores privado e público.</p><p>No setor privado, coordenou processos de licenciamento ambiental de empreendimentos industriais, urbanos e de infraestrutura, com estudos ambientais de pequena a grande complexidade, incluindo EIA/RIMA. Atuou também no acompanhamento ambiental de obras de implantação de empreendimentos e da operação de indústrias, no gerenciamento de áreas contaminadas e na due diligence ambiental.</p><p>No setor público, foi analista ambiental, diretora de licenciamento e Secretária Municipal de Meio Ambiente de São Francisco do Sul/SC. Participou da elaboração do Código Municipal do Meio Ambiente e da estruturação de procedimentos de licenciamento. Atua também na assessoria técnica a consórcio intermunicipal na análise de processos de licenciamento ambiental.</p></div><a class="about-text-link" href="https://www.linkedin.com/in/larayumi" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div></div>','page-profile about-profile')+
 section('abordagem','Da compreensão aos encaminhamentos','<div class="about-timeline-scene"><div class="about-timeline-heading"><h2>Uma demanda. Diferentes perspectivas.</h2><p>Do diagnóstico ao acompanhamento do processo, cada etapa considera as características do projeto e os requisitos envolvidos.</p></div><div class="about-timeline-viewport" tabindex="0" role="region" aria-label="Etapas de atuação. Role a página ou use as setas para acompanhar a sequência horizontal."><ol class="about-timeline">'+stages.map((s,i)=>'<li class="about-timeline-step"><span class="about-timeline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+stageIcons[i]+'</svg></span><span class="about-timeline-number" aria-hidden="true">0'+(i+1)+'</span><h3>'+s.title.replace(/\.$/,'')+'</h3><p>'+s.text+'</p></li>').join('')+'</ol></div></div>','page-body about-approach')+
 section('principios','Perspectivas de atuação','<div class="about-section-head"><h2>Técnica, contexto e responsabilidade.</h2><p>Precisão técnica, leitura do contexto e responsabilidade profissional orientam cada trabalho.</p></div><div class="about-bento"><article class="about-bento-card about-bento-card--main" data-bento><span class="about-bento-number">01</span><div class="about-bento-contour" aria-hidden="true">'+topology+'</div><div><h3>Precisão técnica.</h3><p>Cada demanda é avaliada a partir dos meios físico, biótico e socioeconômico e dos requisitos legais aplicáveis à atividade.</p></div></article><article class="about-bento-card" data-bento><span class="about-bento-number">02</span><div><h3>Leitura do contexto.</h3><p>A localização, a atividade e a situação do empreendimento definem o enquadramento e a estratégia de cada caso.</p></div></article><article class="about-bento-card" data-bento><span class="about-bento-number">03</span><div><h3>Responsabilidade profissional.</h3><p>Escopo definido com clareza, responsabilidade técnica em cada documento e transparência sobre prazos e limites de cada processo.</p></div></article></div>','about-principles')+
 section('equipe','Equipe','<div class="about-section-head"><h2>Equipe</h2><p>Para cada trabalho, a Ykeizumi reúne profissionais das áreas necessárias, como engenharia ambiental e sanitária, engenharia civil, engenharia florestal, geologia e biologia, sob coordenação técnica única.</p></div>','about-team')+
 ctaBanner({id:'conversa',title:'Vamos avaliar o seu caso?',text:'',button:'Solicitar proposta'})+'</main>';
}
