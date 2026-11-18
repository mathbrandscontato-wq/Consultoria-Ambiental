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

// The build concatenates this exact cascade without rewriting any selectors or URLs.
export const styleFilesFor = (slug) => [
  'tokens.css','base.css','hero-a.css','sections.css','motion.css',
  'refinement.css','footer.css','unified.css',
  ...({'':['services.css'],sobre:['about.css'],servicos:['services.css'],projetos:['atlas.css']}[slug]||[]),
  'v5-editorial.css','responsive-type.css','client-revision.css','services-mobile.css','ux-v2.css',
];
export const renderPage = (route, {styleBundle} = {}) => {
  if (!routes.some((r) => r.slug === route.slug)) throw new Error("Rota não prevista");
  const prefix = route.slug ? "../" : "./";
  const pageTitle = {
    '': 'Ykeizumi | Consultoria ambiental em Joinville/SC',
    sobre: 'Sobre a Ykeizumi | Consultoria ambiental',
    servicos: 'Serviços ambientais | Ykeizumi',
    projetos: 'Projetos e galeria ilustrativa | Ykeizumi',
    contato: 'Contato | Ykeizumi Consultoria Ambiental',
  }[route.slug];
  const pageScripts={sobre:['about.mjs'],servicos:['services.mjs'],contato:['contact-delivery.mjs'],'':['services.mjs','circular-gallery.mjs','map-pan.mjs','media.mjs']};
  const description = {
    '': 'Licenciamento ambiental, estudos ambientais, EIV, regularização fundiária, laudos técnicos e defesa administrativa para empreendimentos e para o setor público.',
    sobre: 'Conheça a Ykeizumi, sua fundadora e a experiência em licenciamento, estudos e regularização ambiental.',
    servicos: 'Conheça as nove frentes de atuação da Ykeizumi, do licenciamento ambiental à assessoria técnica ao setor público.',
    projetos: 'Explore a galeria de paisagens ilustrativas da Ykeizumi. As imagens são referências visuais e não representam projetos realizados.',
    contato: 'Entre em contato com a Ykeizumi Consultoria Ambiental. Atendimento em Joinville/SC e no Sul do Brasil.',
  }[route.slug];
  const html = `<!doctype html>
<html lang="${project.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index,follow">
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${escapeHtml(project.name)}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <link rel="icon" type="image/png" sizes="512x512" href="${prefix}media/favicon.png">
  <link rel="apple-touch-icon" href="${prefix}media/favicon.png">
  <meta name="color-scheme" content="light">
  ${!route.slug?'<link rel="preload" as="image" href="./media/hero-poster.webp" fetchpriority="high">':""}
  <title>${escapeHtml(pageTitle)}</title>
  ${styleBundle
    ? `<link rel="stylesheet" href="${prefix}styles/${escapeHtml(styleBundle)}">`
    : styleFilesFor(route.slug).map(style=>`<link rel="stylesheet" href="${prefix}styles/${style}${style==='client-revision.css'?'?v=ux-20261118-home-footer-v6':['services-mobile.css','ux-v2.css'].includes(style)?'?v=ux-v2-20261118':''}">`).join("\n  ")}\n  <script type="module" src="${prefix}scripts/mobile-menu.mjs"></script>
  <script type="module" src="${prefix}scripts/motion.mjs"></script>
  <script type="module" src="${prefix}scripts/unified.mjs?v=ux-v2-20261118"></script>
  ${(pageScripts[route.slug]||[]).map(script=>`<script type="module" src="${prefix}scripts/${script}${script==='services.mjs'?'?v=ux-20261113-2':script==='contact-delivery.mjs'?'?v=contact-20261118-2':''}"></script>`).join("\n  ")}
  <script type="module" src="${prefix}scripts/footer.mjs?v=ux-v2-20261118"></script>

</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand-placeholder" href="${prefix}" aria-label="Ykeizumi Consultoria Ambiental, início"><img class="brand-image" src="${prefix}media/logo-white.webp" width="1024" height="200" alt="Ykeizumi Consultoria Ambiental"></a>
      <nav class="site-desktop-nav" aria-label="Navegação principal"><ul class="site-nav">${nav(route, prefix)}</ul></nav>
      ${heroCta("ha-cta--top site-desktop-cta",prefix+"contato/")}
      <details class="ha-mobile-menu site-mobile-menu"><summary aria-label="Abrir menu de navegação" aria-expanded="false" aria-controls="mobile-navigation"><span aria-hidden="true"><svg class="ui-icon" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M4 6h16M4 12h16M4 18h16"/></svg></span></summary><nav id="mobile-navigation" aria-label="Menu de celular">${routes.map(r=>`<a href="${escapeHtml(routeHref(r,prefix))}"${r.slug===route.slug?' aria-current="page"':''}>${escapeHtml(r.label)}</a>`).join('')}${heroCta('ha-cta--menu',prefix+'contato/')}</nav></details>
    </div>
  </header>
  ${route.slug ? renderInnerPage(route) : renderHeroA().replace("</main>",renderHomeSections()+"</main>")}
  ${renderFooter(prefix)}
</body>
</html>\n`;
  // Na Home o cabeçalho aprovado está integrado ao Hero A.
  return route.slug ? html : html.replace(/<header class="site-header">[\s\S]*?<\/header>/, "");
};
