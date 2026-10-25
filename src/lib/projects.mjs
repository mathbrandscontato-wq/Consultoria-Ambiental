import { approvedProjects, reviewSlots } from "../content/projects.mjs";
import { escapeHtml } from "./escape.mjs";

/**
 * Galeria visual aprovada como estrutura, não como portfólio com cases reais.
 * Slots explicitamente vazios não podem ser tratados como projetos realizados.
 */
export function renderProjectGallery({ compact = false } = {}) {
  const items = approvedProjects.length ? approvedProjects : reviewSlots;
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
    return '<li class="project-card"><div class="project-card__art project-card__art--photo">'+
      '<img loading="lazy" decoding="async" src="'+escapeHtml(project.image)+
      '" alt="'+escapeHtml(project.alt)+'" width="800" height="600"></div>'+
      '<div class="project-card__footer"><span>'+escapeHtml(project.title)+
      '</span><span>'+escapeHtml(project.category)+'</span></div></li>';
  }).join("\n");
  return '<ul class="project-gallery '+(compact?'project-gallery--compact':'')+
    '" aria-label="Galeria de projetos, materiais em revisão">'+markup+'</ul>';
}
export const hasApprovedProjects = () => approvedProjects.length > 0;
