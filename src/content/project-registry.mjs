import { approvedProjects, editorialPhotos } from './projects.mjs';

const text = (value, max = 2000) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
const key = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const serviceId = value => /^s0[1-7]$/.test(value);
/** Accept only same-site media assets; never infer consent from an image or a title. */
export const isSafeProjectMedia = value => typeof value === 'string' &&
  /^(?:\.\.\/|\/)?media\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpe?g|avif)$/i.test(value) && !value.includes('..', value.startsWith('../') ? 3 : 0);

/** A project is publishable only with consent, reviewed publication status and complete data. */
export function isPublishableProject(project) {
  if (!project || typeof project !== 'object' || Array.isArray(project)) return false;
  if (project.status !== 'publicado' || project.autorizacaoPublicacao !== true) return false;
  if (!key(project.id) || !key(project.slug) || !text(project.titulo, 160) || !text(project.resumo)) return false;
  if (!isSafeProjectMedia(project.imagemCapa)) return false;
  if (project.descricao !== undefined && !text(project.descricao, 12000)) return false;
  if (project.categoria !== undefined && !text(project.categoria, 160)) return false;
  if (project.localizacao !== undefined && (!text(project.localizacao, 160) || project.autorizacaoLocalizacao !== true)) return false;
  if (project.ano !== undefined && (!Number.isInteger(project.ano) || project.ano < 1900 || project.ano > new Date().getFullYear())) return false;
  if (project.servicosRelacionados !== undefined && (!Array.isArray(project.servicosRelacionados) || !project.servicosRelacionados.every(serviceId))) return false;
  if (project.galeria !== undefined && (!Array.isArray(project.galeria) || !project.galeria.every(isSafeProjectMedia))) return false;
  if (project.escopoConfirmado !== undefined && !text(project.escopoConfirmado)) return false;
  if (project.resultadosVerificados !== undefined && (!Array.isArray(project.resultadosVerificados) || !project.resultadosVerificados.every(value => text(value)))) return false;
  return true;
}

export function publishableProjects(records = approvedProjects) {
  if (!Array.isArray(records)) return [];
  const ids = new Set(), slugs = new Set();
  return records.filter(project => {
    if (!isPublishableProject(project) || ids.has(project.id) || slugs.has(project.slug)) return false;
    ids.add(project.id); slugs.add(project.slug); return true;
  });
}

export const atlasPhotos = editorialPhotos;
