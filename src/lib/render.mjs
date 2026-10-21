import { project, routes, routeHref } from "../site.mjs";

export const escapeHtml = (input) => String(input).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);

const nav = (current, prefix) => routes.map((route) =>
  `<li><a href="${escapeHtml(routeHref(route, prefix))}"${route.slug === current.slug ? ' aria-current="page"' : ""}>${escapeHtml(route.label)}</a></li>`
).join("\n");

const main = (route) => {
  const isContact = route.slug === "contato";
  const home = route.slug === "";
  return `<main id="conteudo" tabindex="-1">
  <section class="foundation-slot" data-design-slot="${escapeHtml(route.slot)}" aria-labelledby="titulo-pagina">
    <div class="foundation-slot__content">
      <p class="foundation-slot__eyebrow">Ambiente de desenvolvimento · PR-01</p>
      <h1 id="titulo-pagina">${escapeHtml(route.title)} em preparação</h1>
      <p>Esta é somente uma estrutura técnica reversível. A composição visual e os conteúdos aprovados serão vinculados às pranchas originais do G2 V5 antes da implementação.</p>
      ${home ? '<p class="foundation-slot__notice">Hero A aprovado · implementação visual ainda não iniciada.</p>' : ""}
      ${isContact ? '<p class="foundation-slot__notice">O envio de formulários não está disponível. Nenhum dado é coletado nesta versão.</p>' : ""}
    </div>
  </section>
</main>`;
};

export const renderPage = (route) => {
  if (!routes.some((r) => r.slug === route.slug)) throw new Error("Rota não prevista");
  const prefix = route.slug ? "../" : "./";
  const pageTitle = route.slug ? `${route.label} | ${project.name}` : project.name;
  return `<!doctype html>
<html lang="${project.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <meta name="description" content="Protótipo técnico interno de ${escapeHtml(project.name)}. Sem publicação ou formulário ativo.">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(pageTitle)}</title>
  <link rel="stylesheet" href="${prefix}styles/tokens.css">
  <link rel="stylesheet" href="${prefix}styles/base.css">
</head>
<body data-stage="pr-01-foundation">
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand-placeholder" href="${prefix}" aria-label="Ykeizumi Consultoria Ambiental, início">Ykeizumi <span>Consultoria Ambiental</span></a>
      <nav aria-label="Navegação principal"><ul class="site-nav">${nav(route, prefix)}</ul></nav>
      <a class="cta" href="${prefix}contato/">${escapeHtml(project.cta)}</a>
    </div>
  </header>
  ${main(route)}
  <footer class="site-footer">
    <div class="site-footer__inner"><span>${escapeHtml(project.name)}</span><small>Fundação técnica sem publicação · Layout não homologado</small></div>
  </footer>
</body>
</html>\n`;
};
