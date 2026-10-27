import { serviceCards } from '../../content/services.mjs';
import { editorialHero, section, photo, ctaBanner } from '../components.mjs';
import { escapeHtml as esc } from '../escape.mjs';

const serviceLink = (slug) => {
  const item=serviceCards.find(s=>s.slug===slug);
  return `<a href="#${slug}" class="context-service-link">${esc(item.title)} <span aria-hidden="true"><svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a>`;
};
const contexts = [
  ['Preciso iniciar ou regularizar um empreendimento.','O licenciamento ambiental envolve etapas e exigências próprias de cada empreendimento. Conheça o acompanhamento técnico dessa frente.',['s01']],
  ['Preciso compreender as condições ambientais de uma área.','Antes de adquirir ou desenvolver uma área, conhecer suas condições ambientais apoia a decisão. Estudos e laudos podem contribuir, conforme a avaliação necessária.',['s02','s03']],
  ['Estou lidando com uma exigência ou procedimento administrativo.','Uma exigência ambiental pede compreensão do que foi solicitado. A análise técnica ajuda a avaliar a questão e os requisitos envolvidos, dentro da competência profissional.',['s04','s07']],
  ['Preciso avaliar possíveis passivos ambientais.','Conhecer as condições de uma área pode envolver a avaliação de possíveis passivos ambientais. O escopo do apoio técnico depende da situação e das informações disponíveis.',['s05']],
  ['Represento uma prefeitura ou consórcio público.','Demandas ambientais de interesse público podem exigir análise especializada. Conheça a assessoria técnica a prefeituras e consórcios intermunicipais.',['s06']]
];
const steps=[
  ['Entender','Compreender o contexto, a localização e as necessidades apresentadas.'],
  ['Analisar','Identificar os aspectos técnicos e requisitos envolvidos na demanda.'],
  ['Orientar','Definir, conforme o escopo avaliado, os próximos encaminhamentos possíveis.']
];

function explorer(){
  const items=serviceCards.map(s=>`<details class="service-feature" id="${s.slug}" open>
    <summary aria-controls="content-${s.slug}"><span class="service-feature-number">${s.num}</span><h3>${esc(s.title)}</h3><span class="service-feature-indicator" aria-hidden="true">+</span></summary>
    <div class="service-feature-content" id="content-${s.slug}"><p>${esc(s.description)}</p><figure class="service-mobile-media">${photo(s.media,'../',`${s.title}: imagem ilustrativa do território`)}<figcaption>Imagem ilustrativa</figcaption></figure><a class="service-proposal" href="../contato/" aria-label="Solicitar proposta sobre ${esc(s.title)}">Solicitar proposta <span aria-hidden="true"><svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></div>
  </details>`).join('');
  const media=serviceCards.map((s,i)=>`<figure class="service-feature-media ${i===0?'is-active':''}" data-service-media="${s.slug}" aria-hidden="true">${photo(s.media,'../','')}<figcaption><span>${s.num} / 07</span><span>Imagem ilustrativa</span></figcaption></figure>`).join('');
  return section('explorador','Explorador de serviços',`<div class="services-section-heading"><h2>Uma atuação.<br>Diferentes necessidades.</h2><p>Explore as áreas de atuação e conheça as possibilidades de acompanhamento técnico.</p></div><div class="service-explorer"><div class="service-feature-list">${items}</div><div class="service-media-stage">${media}</div></div>`,'services-explorer-section');
}

export function renderServices(){
 return '<main id="conteudo" tabindex="-1" class="inner-page services-page">'+
  editorialHero({label:'01 / Áreas de atuação',title:'Soluções ambientais para decisões mais seguras.',text:'Conheça as frentes de atuação da Ykeizumi e encontre o caminho mais adequado para apresentar sua demanda ambiental.',media:'floresta',classes:'services-hero'})+
  explorer()+
  section('contextos','Contextos de atuação',`<div class="services-context-layout"><div class="services-section-heading"><h2>Cada demanda começa por um contexto diferente.</h2><p>Entenda quais áreas podem estar relacionadas à sua necessidade.</p><p class="services-editorial-note">Esses caminhos orientam a navegação e não substituem uma avaliação técnica da demanda.</p></div><div class="services-context-list">${contexts.map(([title,text,ids],i)=>`<details class="service-context"><summary><span class="service-feature-number">0${i+1}</span><h3>${esc(title)}</h3><span class="service-feature-indicator" aria-hidden="true">+</span></summary><div class="service-context-content"><p>${esc(text)}</p><div class="context-links">${ids.map(serviceLink).join('')}</div></div></details>`).join('')}</div></div>`,'services-context-section')+
  section('abordagem-tecnica','Abordagem técnica',`<div class="services-section-heading"><h2>Clareza para compreender cada etapa.</h2><p>Cada demanda exige uma leitura específica do contexto, dos requisitos envolvidos e dos próximos passos possíveis.</p></div><ol class="service-process" data-service-process>${steps.map(([title,text],i)=>`<li class="service-process-step"><span class="service-step-number" aria-hidden="true">0${i+1}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol><p class="services-editorial-note">Uma representação editorial para compreender a demanda, e não uma metodologia proprietária ou um protocolo oficial.</p>`,'services-process-section')+
  ctaBanner({label:'Orientação técnica',title:'Seu projeto precisa de uma orientação ambiental?',text:'Apresente o contexto da sua demanda e descubra o próximo passo.'})+
  '</main>';
}
