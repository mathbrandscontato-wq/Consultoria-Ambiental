import { section, editorialHero, ctaBanner } from '../components.mjs';
import { escapeHtml as esc } from '../escape.mjs';
import { publishableProjects, atlasPhotos } from '../../content/project-registry.mjs';
import { serviceCards } from '../../content/services.mjs';

function renderArchive() {
  const projects = publishableProjects();
  if (!projects.length) return '<div class="archive-empty" data-reveal><span class="archive-empty-mark" aria-hidden="true"><svg viewBox="0 0 160 120" fill="none"><path d="M8 92 47 56l29 20 39-51 37 43M8 106h144"/><path d="M30 81v25m34-36v36m34-59v59m34-64v64"/><circle cx="115" cy="25" r="5"/></svg></span><div><p class="archive-status">Ainda não há projetos publicados.</p><h3>Um acervo em construção.</h3><p>Os projetos serão apresentados neste espaço conforme houver documentação disponível e autorização para divulgação.</p></div></div>';
  return '<div class="verified-projects">'+projects.map(project => '<article class="verified-project" data-reveal><img src="'+esc(project.imagemCapa)+'" width="1280" height="900" loading="lazy" decoding="async" alt="'+esc(project.titulo)+'"><h3>'+esc(project.titulo)+'</h3><p>'+esc(project.resumo)+'</p>'+(project.localizacao?'<p class="verified-location">'+esc(project.localizacao)+'</p>':'')+'</article>').join('')+'</div>';
}

function renderAtlas() {
  return '<div class="atlas-masonry"><ul class="project-gallery" aria-label="Atlas visual de fotografias ilustrativas">'+atlasPhotos.map((photo, index) => '<li class="project-card" data-reveal><div class="project-card__art project-card__art--photo"><a class="project-image-link" href="../media/'+esc(photo.id)+'-1280.webp" aria-label="Ampliar imagem: '+esc(photo.title)+'"><img src="../media/'+esc(photo.id)+'-1280.webp" srcset="../media/'+esc(photo.id)+'-640.webp 640w, ../media/'+esc(photo.id)+'-1280.webp 1280w" sizes="(max-width:600px) 92vw, (max-width:1023px) 45vw, 30vw" width="1280" height="'+[1680,1000,1440,1180,1460,1040][index]+'" loading="lazy" decoding="async" alt="'+esc(photo.alt)+'"><span class="atlas-expand" aria-hidden="true"><svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></div><div class="project-card__footer"><span>'+esc(photo.title)+'</span><span>Imagem ilustrativa</span></div></li>').join('')+'</ul></div>';
}

export function renderProjectsPage() {
  return '<main id="conteudo" tabindex="-1" class="inner-page atlas-page">'+
    editorialHero({label:'04 / Projetos',title:'Cada projeto começa com uma leitura do território.',text:'Uma perspectiva sobre os diferentes contextos ambientais e os projetos que poderão integrar o acervo da Ykeizumi.',media:'montanhas',classes:'atlas-hero',expand:true})+
    section('perspectiva','Uma perspectiva técnica','<div class="atlas-introduction"><div><h2 data-scroll-reveal>Uma leitura própria para cada contexto.</h2><p data-reveal>Cada demanda ambiental envolve características, requisitos e particularidades que precisam ser compreendidos antes da definição de seus encaminhamentos.</p><p class="atlas-editorial-note" data-reveal>Este espaço reunirá projetos documentados conforme sua disponibilidade e autorização para divulgação.</p></div></div>','atlas-intro')+
    section('acervo','Projetos e experiências documentadas','<div class="atlas-section-heading"><h2>Projetos e experiências documentadas.</h2></div>'+renderArchive(),'atlas-archive')+
    section('atlas','Atlas visual ilustrativo','<div class="atlas-section-heading"><h2>Diferentes paisagens.<br>Diferentes leituras.</h2><p>Um acervo visual ilustrativo sobre a diversidade das paisagens e dos territórios. As fotografias não representam trabalhos realizados pela Ykeizumi.</p></div>'+renderAtlas(),'page-project-gallery atlas-visual')+
    section('conhecimento-aplicado','Conhecimento aplicado','<div class="atlas-context-heading"><h2>O conhecimento técnico aplicado a diferentes demandas.</h2></div><div class="atlas-context-links">'+serviceCards.slice(0,3).map(service => '<a href="../servicos/#'+service.slug+'" data-reveal><span class="atlas-context-number">'+service.num+'</span><div><h3>'+esc(service.title)+'</h3><p>'+esc(service.description)+'</p></div><span class="atlas-context-arrow" aria-hidden="true"><svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a>').join('')+'</div>','atlas-context')+
    ctaBanner({id:'conversa',label:'Vamos conversar',title:'Seu projeto também começa por uma conversa.',text:'Apresente o contexto da sua demanda e conheça as possibilidades de acompanhamento técnico.'})+
    '</main>';
}
