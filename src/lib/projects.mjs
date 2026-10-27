import { publishableProjects } from '../content/project-registry.mjs';
import { reviewSlots, editorialPhotos } from "../content/projects.mjs";
import { escapeHtml } from "./escape.mjs";

/**
 * Galeria visual aprovada como estrutura, não como portfólio com cases reais.
 * Slots explicitamente vazios não podem ser tratados como projetos realizados.
 */
export function renderProjectGallery({ compact = false, prefix = "./" } = {}) {
  const verified=publishableProjects().map(project=>({title:project.titulo,alt:project.titulo,image:project.imagemCapa,category:project.categoria||"Projeto documentado",state:"verified"}));
  const items = verified.length ? verified : editorialPhotos.length ? editorialPhotos : reviewSlots;
  const visible = compact ? items.slice(0, 3) : items;
  const markup = visible.map((project, index) => {
    if (project.state === "awaiting-approval") {
      const number = String(index + 1).padStart(2, "0");
      return '<li class="project-card project-card--placeholder '+
        (index === 0 ? 'project-card--feature' : '') +
        '" aria-label="Espaço reservado para projeto '+number+' ainda não aprovado">'+
        '<div class="project-card__art" aria-hidden="true">'+
        '<span class="project-card__arc project-card__arc--one"></span>'+
        '<span class="project-card__arc project-card__arc--two"></span>'+
        '<span class="project-card__axis"></span>'+
        '<span class="project-card__number">'+number+'</span></div>'+
        '<div class="project-card__footer"><span>Projeto '+number+'</span>'+
        '<span>Conteúdo pendente</span></div>'+
        '</li>';
    }
    // Para entradas futuras, exige imagem e consentimento previamente verificados.
    const image = project.state === 'editorial' ? prefix+'media/'+project.id+'-1280.webp' : project.image;
    const responsive = project.state === 'editorial' ? ' srcset="'+escapeHtml(prefix+'media/'+project.id+'-640.webp')+' 640w, '+escapeHtml(image)+' 1280w" sizes="(max-width:650px) 100vw, 60vw"' : '';
    return '<li class="project-card '+(index === 0 ? 'project-card--feature' : '')+'"><div class="project-card__art project-card__art--photo">'+
      '<a class="project-image-link" href="'+escapeHtml(image)+'" aria-label="Ampliar imagem: '+escapeHtml(project.title)+'"><img loading="lazy" decoding="async" src="'+escapeHtml(image)+
      '"'+responsive+' alt="'+escapeHtml(project.alt)+'" width="800" height="600"></a></div>'+
      '<div class="project-card__footer"><span>'+escapeHtml(project.title)+
      '</span><span>'+escapeHtml(project.category)+'</span></div></li>';
  }).join("\n");
  return '<ul class="project-gallery '+(compact?'project-gallery--compact':'')+
    '" aria-label="Galeria de imagens ilustrativas">'+markup+'</ul>';
}
export const hasApprovedProjects = () => publishableProjects().length > 0;
