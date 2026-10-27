import { renderFooter } from './footer.mjs';
import { renderHomeSections, renderInnerPage } from "./sections.mjs";
import { renderHeroA, heroCta } from "./hero-a.mjs";
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
  const pageTitle = {
    '': 'Ykeizumi | Consultoria ambiental em Joinville',
    sobre: 'Sobre a Ykeizumi e Lara Yumi | Consultoria ambiental',
    servicos: 'Serviços de consultoria ambiental | Ykeizumi',
    projetos: 'Projetos e galeria ilustrativa | Ykeizumi',
    contato: 'Contato | Ykeizumi Consultoria Ambiental',
  }[route.slug];
  const pageStyles={sobre:['about.css','about-tunnel.css'],servicos:['services.css'],projetos:['atlas.css']};
  const pageScripts={sobre:['about.mjs','about-tunnel.mjs'],servicos:['services.mjs'],'':['circular-gallery.mjs','map-pan.mjs','media.mjs']};
  const description = {
    '': 'Consultoria ambiental com base em Joinville e atuação no Norte e Litoral de Santa Catarina. Licenciamento, estudos e análise técnica para cada empreendimento.',
    sobre: 'Conheça a Ykeizumi, Lara Yumi e sua atuação na consultoria ambiental. Compreenda a abordagem técnica para analisar cada demanda.',
    servicos: 'Explore as sete áreas de atuação da Ykeizumi e identifique serviços relacionados a licenciamento, estudos, laudos e outras demandas ambientais.',
    projetos: 'Explore a galeria de paisagens ilustrativas da Ykeizumi. As imagens são referências visuais e não representam projetos realizados.',
    contato: 'Consulte o status dos canais de contato da Ykeizumi. O envio de solicitações pelo site permanece indisponível nesta versão.',
  }[route.slug];
  const html = `<!doctype html>
<html lang="${project.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${escapeHtml(project.name)}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <link rel="icon" type="image/png" sizes="512x512" href="${prefix}media/favicon.png">
  <link rel="apple-touch-icon" href="${prefix}media/favicon.png">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(pageTitle)}</title>
  <link rel="stylesheet" href="${prefix}styles/tokens.css">
  <link rel="stylesheet" href="${prefix}styles/base.css">
  <link rel="stylesheet" href="${prefix}styles/hero-a.css">
  <link rel="stylesheet" href="${prefix}styles/sections.css">
  <link rel="stylesheet" href="${prefix}styles/motion.css">
  <link rel="stylesheet" href="${prefix}styles/refinement.css">
  <link rel="stylesheet" href="${prefix}styles/footer.css">
  <link rel="stylesheet" href="${prefix}styles/unified.css">
  ${(pageStyles[route.slug]||[]).map(style=>`<link rel="stylesheet" href="${prefix}styles/${style}">`).join("\n  ")}
  <link rel="stylesheet" href="${prefix}styles/v5-editorial.css">
  <link rel="stylesheet" href="${prefix}styles/responsive-type.css">
  <script type="module" src="${prefix}scripts/mobile-menu.mjs"></script>
  <script type="module" src="${prefix}scripts/motion.mjs"></script>
  <script type="module" src="${prefix}scripts/unified.mjs"></script>
  ${(pageScripts[route.slug]||[]).map(script=>`<script type="module" src="${prefix}scripts/${script}"></script>`).join("\n  ")}
  <script type="module" src="${prefix}scripts/footer.mjs"></script>

</head>
<body data-stage="g5-design-review">
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand-placeholder" href="${prefix}" aria-label="Ykeizumi Consultoria Ambiental, início"><img class="brand-image" src="${prefix}media/logo-white.webp" width="1024" height="200" alt="Ykeizumi Consultoria Ambiental"></a>
      <nav class="site-desktop-nav" aria-label="Navegação principal"><ul class="site-nav">${nav(route, prefix)}</ul></nav>
      ${heroCta("ha-cta--top site-desktop-cta",prefix+"contato/")}
      <details class="ha-mobile-menu site-mobile-menu"><summary aria-label="Abrir menu de navegação" aria-expanded="false" aria-controls="mobile-navigation"><span aria-hidden="true"><svg class="ui-icon" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M4 6h16M4 12h16M4 18h16"/></svg></span></summary><nav id="mobile-navigation" aria-label="Menu de celular">${routes.map(r=>`<a href="${escapeHtml(routeHref(r,prefix))}"${r.slug===route.slug?' aria-current="page"':''}>${escapeHtml(r.label)}</a>`).join('')}</nav></details>
    </div>
  </header>
  ${route.slug ? renderInnerPage(route) : renderHeroA().replace("</main>",renderHomeSections()+"</main>")}
  ${renderFooter(prefix)}
</body>
</html>\n`;
  // Na Home o cabeçalho aprovado está integrado ao Hero A.
  return route.slug ? html : html.replace(/<header class="site-header">[\s\S]*?<\/header>/, "");
};
