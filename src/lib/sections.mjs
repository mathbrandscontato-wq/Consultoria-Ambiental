/**
 * G6 — UI editorial REVISIONAL: estrutura de V1.2, sem promessas e sem
 * assumir a aprovação final de layout/contato/credenciais pela Vic.
 * Esta implementação não pode ir a produção antes do gate de homologação.
 */
const cards = [
  ["01","Licenciamento ambiental","Acompanhamento técnico das etapas e exigências do licenciamento ambiental, conforme o empreendimento."],
  ["02","Estudos ambientais","Estudos e levantamentos que apoiam a compreensão do território e dos impactos de cada projeto."],
  ["03","Laudos técnicos","Avaliação e caracterização de aspectos ambientais, geológicos e hidrogeológicos."],
  ["04","Defesas e assistência técnica","Apoio técnico especializado em procedimentos administrativos e demandas periciais, dentro da competência profissional."],
  ["05","Áreas contaminadas","Avaliações ambientais e apoio técnico em processos de identificação de passivos e due diligence."],
  ["06","Assessoria ao poder público","Apoio técnico a prefeituras e consórcios intermunicipais em demandas ambientais."],
  ["07","Audiências e órgãos ambientais","Apoio técnico em audiências públicas e na interlocução sobre requisitos ambientais."],
];
export const serviceCards = Object.freeze(cards.map(([num,title,description])=>Object.freeze({num,title,description,slug:"s"+num})));
const cta = (href="./contato/",label="Solicitar proposta")=>'<a class="editorial-link" href="'+href+'">'+label+'<span aria-hidden="true">↗</span></a>';
const wrap = (id,label,inner,extra="")=>'<section id="'+id+'" class="editorial-section '+extra+'" aria-label="'+label+'"><div class="editorial-container">'+inner+'</div></section>';
export function renderHomeSections(){
  return [
    wrap("solucoes","Áreas de atuação",
      '<div class="editorial-head"><p class="editorial-kicker">01 / O que fazemos</p><h2>Soluções para decisões sobre o <em>território.</em></h2>'+
      '<p>Das primeiras análises às demandas de regularização, cada contexto exige uma leitura ambiental consistente.</p></div>'+
      '<div class="editorial-services">'+
      serviceCards.slice(0,3).map((s,i)=>'<article class="editorial-service '+(i===0?'is-lead':'')+'"><span class="editorial-index">'+s.num+'</span><h3>'+s.title+'</h3><p>'+s.description+'</p><a href="./servicos/#'+s.slug+'" aria-label="Conheça: '+s.title+'">Conheça a atuação <span aria-hidden="true">↗</span></a></article>').join('')+'</div>'+
      '<div class="editorial-end">'+cta("./servicos/","Conhecer todos os serviços")+'</div>',"editorial-section--light"),
    wrap("segmentos","Segmentos de atuação",
      '<div class="editorial-split"><div><p class="editorial-kicker">02 / Para quem</p><h2>Projetos diferentes.<br><em>Demandas específicas.</em></h2></div>'+
      '<div class="editorial-segments"><p>Atuação técnica voltada às necessidades ambientais de diferentes organizações e empreendimentos.</p>'+
      '<ul><li>Incorporação e construção</li><li>Indústria e empreendimentos</li><li>Prefeituras e consórcios públicos</li><li>Escritórios de advocacia, em demandas técnicas</li></ul></div></div>',"editorial-section--forest"),
    wrap("abordagem","Nossa abordagem",
      '<div class="editorial-split"><div><p class="editorial-kicker">03 / Perspectiva técnica</p><h2>Compreender o processo.<br><em>Interpretar o contexto.</em></h2></div><div class="editorial-copy"><p>A Ykeizumi reúne experiência nos processos de elaboração e análise de demandas ambientais. Uma perspectiva que contribui para estudar cada situação com responsabilidade técnica.</p>'+cta("./sobre/","Sobre a consultoria")+'</div></div>',"editorial-section--cream"),
    wrap("regiao","Região atendida",
      '<div class="editorial-region"><div><p class="editorial-kicker">04 / Onde estamos</p><h2>Joinville.<br>Norte e Litoral<br><em>catarinense.</em></h2></div><div class="editorial-region-shape" aria-hidden="true"><span>SC</span><span class="editorial-region-dot"></span></div></div>',"editorial-section--sage"),
    wrap("conversa","Solicitar proposta",
      '<div class="editorial-last"><p class="editorial-kicker">05 / Próximo passo</p><h2>Seu projeto exige uma<br><em>conversa técnica.</em></h2><p>Apresente sua necessidade e receba orientação sobre os próximos passos para uma proposta personalizada.</p>'+cta("./contato/")+'</div>',"editorial-section--dark")
  ].join("\n");
}
const intro = (index,title,description)=>
  '<div class="page-head"><span class="editorial-kicker">'+index+'</span><h1 id="titulo-pagina">'+title+'</h1><p>'+description+'</p></div>';
const section = (className,body)=>'<section class="'+className+'"><div class="editorial-container">'+body+'</div></section>';
const contactNote = '<p class="contact-unavailable" role="status">Os canais oficiais e o envio do formulário estão em preparação. Esta versão de revisão não coleta dados nem envia mensagens.</p>';
export function renderInnerPage(route){
 if(route.slug==="servicos"){
  return '<main id="conteudo" tabindex="-1" class="inner-page">'+
   section("page-banner page-banner--green",intro("01 / Áreas de atuação","Atuação ambiental com diferentes perspectivas.","Conheça as frentes técnicas apresentadas no planejamento institucional. As descrições abaixo permanecem em revisão técnica e editorial."))+
   section("page-body",'<div class="service-list">'+serviceCards.map((s,i)=>
      '<article class="service-row" id="'+s.slug+'"><span class="service-number">'+s.num+' / 07</span><div><h2>'+s.title+'</h2><p>'+s.description+'</p></div><a href="../contato/" class="service-row-link" aria-label="Solicitar proposta sobre '+s.title+'">Solicitar proposta ↗</a></article>').join('')+'</div>')+
   section("page-outro",'<p class="editorial-kicker">Orientação</p><h2>Não sabe por onde começar?</h2><p>Apresentar o contexto da demanda é o primeiro passo para direcionar a conversa técnica.</p>'+cta("../contato/"))+
   '</main>';
 }
 if(route.slug==="sobre"){
  return '<main id="conteudo" tabindex="-1" class="inner-page">'+
   section("page-banner page-banner--cream",intro("02 / Institucional","Uma perspectiva técnica sobre o ambiente.","A Ykeizumi é uma consultoria ambiental sediada em Joinville, com atuação principalmente no Norte e Litoral catarinense."))+
   section("page-body",'<div class="editorial-split"><div><p class="editorial-kicker">Nossa atuação</p><h2>Experiência na elaboração e na análise.</h2></div><div class="editorial-copy"><p>A atuação reúne conhecimento das diferentes etapas que envolvem estudos e processos ambientais, incluindo vivência no setor público e privado, conforme informações institucionais em revisão.</p><p>Essa perspectiva orienta o olhar técnico sobre as particularidades de cada demanda.</p></div></div>')+
   section("page-profile",'<div class="editorial-split"><div><p class="editorial-kicker">Responsável técnica</p><h2>Lara Yumi</h2></div><div class="editorial-copy"><p>A apresentação detalhada da trajetória, formações e registros profissionais será publicada após validação da responsável pelo projeto.</p><p>Atendimento com base em Joinville, contemplando atividades técnicas e reuniões conforme a necessidade e a viabilidade de cada demanda.</p></div></div>')+
   section("page-outro",'<p class="editorial-kicker">Contato</p><h2>Conte sobre seu projeto.</h2>'+cta("../contato/"))+'</main>';
 }
 if(route.slug==="contato"){
  return '<main id="conteudo" tabindex="-1" class="inner-page">'+
   section("page-banner page-banner--green",intro("03 / Propostas","Vamos entender sua demanda.","A Ykeizumi avalia o contexto de cada solicitação para estruturar uma proposta técnico-comercial individualizada."))+
   section("page-contact",'<div class="editorial-split"><div><p class="editorial-kicker">Entre em contato</p><h2>Uma conversa<br><em>é o começo.</em></h2></div><div class="editorial-copy">'+contactNote+
   '<p>Os dados oficiais de contato, o destinatário e os requisitos de privacidade devem ser confirmados antes da ativação dos canais. Nenhum formulário fictício foi disponibilizado.</p><div class="contact-region">Joinville · Santa Catarina<br>Norte e Litoral catarinense</div></div></div>')+'</main>';
 }
 throw new Error("Unsupported route: "+route.slug);
}
