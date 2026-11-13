import {serviceCards} from '../../content/services.mjs'
import {editorialHero, section, photo, ctaBanner} from '../components.mjs'
import {escapeHtml as esc} from '../escape.mjs'

/* Revisão oficial da cliente, 12/11/2026. */
const contexts=[
  {
    "title": "Preciso implantar, operar ou regularizar um empreendimento.",
    "text": "Viabilidade, licenças e estudos exigidos pelo órgão ambiental e pela prefeitura.",
    "ids": [
      "s01",
      "s02",
      "s03"
    ]
  },
  {
    "title": "Preciso conhecer as condições ambientais de uma área.",
    "text": "Consulta prévia, due diligence e laudos antes de comprar, projetar ou ocupar um terreno.",
    "ids": [
      "s01",
      "s04"
    ]
  },
  {
    "title": "Preciso manter minha licença e minhas obrigações em dia.",
    "text": "Acompanhamento de licenças, condicionantes, monitoramento e cadastros.",
    "ids": [
      "s06"
    ]
  },
  {
    "title": "Recebi uma notificação, auto de infração ou embargo.",
    "text": "Atendimento a exigências e defesa no processo administrativo.",
    "ids": [
      "s07"
    ]
  },
  {
    "title": "Preciso avaliar possíveis passivos ambientais.",
    "text": "Investigação de áreas contaminadas e recuperação de áreas degradadas.",
    "ids": [
      "s05"
    ]
  },
  {
    "title": "Preciso de suporte técnico em um processo judicial.",
    "text": "Perícia, assistência técnica e pareceres.",
    "ids": [
      "s08"
    ]
  },
  {
    "title": "Represento uma prefeitura ou consórcio público.",
    "text": "Apoio na análise de processos, normas e estruturação do órgão ambiental.",
    "ids": [
      "s09"
    ]
  }
]

const serviceLink=(slug)=>{
  const item=serviceCards.find(s=>s.slug===slug)
  if(!item) throw Error('Grupo de serviço inexistente: '+slug)
  return '<a href="#'+esc(slug)+'" class="context-service-link">'+esc(item.title)+' <span aria-hidden="true">↗</span></a>'
}
const contextSection=()=>section('contextos','Contextos de atuação',
  '<div class="services-context-layout"><div class="services-section-heading"><h2>Cada demanda começa por um contexto diferente.</h2><p>Identifique a sua situação e veja quais serviços se relacionam a ela.</p></div>'+
  '<div class="services-context-list">'+
  contexts.map((c,i)=>'<details class="service-context"><summary><span class="service-feature-number">0'+(i+1)+'</span><h3>'+esc(c.title)+'</h3><span class="service-feature-indicator" aria-hidden="true">+</span></summary><div class="service-context-content"><p>'+esc(c.text)+'</p><div class="context-links">'+c.ids.map(serviceLink).join('')+'</div></div></details>').join('')+'</div></div>',
  'services-context-section')
function explorer(){
  const navigation='<nav class="service-selector" aria-label="Selecionar frente de atuação"><div class="service-selector-list" role="tablist" aria-label="Nove frentes de atuação">'+
    serviceCards.map((s,i)=>'<a href="#'+esc(s.slug)+'" id="tab-'+esc(s.slug)+'" class="service-nav-item'+(i===0?' is-active':'')+'" role="tab" aria-selected="'+(i===0?'true':'false')+'" aria-controls="'+esc(s.slug)+'" tabindex="'+(i===0?'0':'-1')+'"><span class="service-nav-number">'+esc(s.num)+'</span><span class="service-nav-name">'+esc(s.title)+'</span><span class="service-nav-arrow" aria-hidden="true">→</span></a>').join('')+
    '</div></nav>';
  const panels='<div class="service-panel-stage">'+serviceCards.map((s,i)=>
    '<article class="service-info-panel" id="'+esc(s.slug)+'" role="tabpanel" aria-labelledby="tab-'+esc(s.slug)+'" tabindex="0" data-service-panel="'+esc(s.slug)+'">'+
    '<span class="service-panel-count">'+esc(s.num)+' / 09</span>'+
    '<h3>'+esc(s.title)+'</h3>'+
    '<p class="service-panel-description">'+esc(s.description)+'</p>'+
    '<ul class="service-panel-details">'+s.details.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul>'+
    '<a class="service-panel-cta" href="../contato/" aria-label="Solicitar proposta sobre '+esc(s.title)+'">Solicitar proposta <span aria-hidden="true">↗</span></a>'+
    '</article>').join('')+'</div>';
  return section('explorador','Explorador de serviços',
    '<div class="services-section-heading"><h2>As nove frentes de atuação</h2><p>Selecione uma frente para ver os serviços incluídos.</p></div>'+
    '<div class="service-explorer">'+navigation+panels+'</div>',
    'services-explorer-section');
}
export function renderServices(){
  return '<main id="conteudo" tabindex="-1" class="inner-page services-page">'+
  editorialHero({label:'Serviços',title:'Soluções ambientais para decisões mais seguras.',text:'Conheça as frentes de atuação da Ykeizumi e encontre o caminho mais adequado para apresentar sua demanda ambiental.',media:'ykeizumi-estrada-vegetacao',classes:'services-hero'})+
  contextSection()+explorer()+
  ctaBanner({label:'Orientação técnica',title:'Não encontrou o serviço que procura?',text:'Descreva o seu caso e indicamos o caminho.',button:'Solicitar proposta'})+'</main>'
}
