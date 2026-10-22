/** Hero A G2 V5. Copy, logo and media are explicitly provisional. */
const contours = Array.from({length: 28}, (_, i) =>
  '<path d="M -30 ' + (375-i*7) + ' C 130 ' + (195-i*4) +
  ' 190 ' + (115-i*3) + ' 340 ' + (230-i*2) +
  ' S 555 ' + (400-i*3) + ' 790 ' + (165+i*5) + '" />'
).join('');

const arrow = '<span class="ha-arrow" aria-hidden="true">↗</span>';
const cta = (variant) =>
  '<a class="ha-cta ' + variant + '" href="./contato/"><span>Solicitar proposta</span>' + arrow + '</a>';

export function renderHeroA() {
  return [
    '<main id="conteudo" tabindex="-1">',
    '<section class="ha" data-design="G2V5-HERO-A" aria-labelledby="titulo-pagina">',
    '<header class="ha-header">',
      '<a class="ha-logo" data-status="logo-oficial-nao-publicado" href="./" aria-current="page" aria-label="Ykeizumi Consultoria Ambiental, início">',
        '<span class="ha-symbol" aria-hidden="true">YK</span><span class="ha-wordmark" aria-hidden="true">Y K E I Z U M I<small>CONSULTORIA AMBIENTAL</small></span>',
      '</a>',
      '<nav class="ha-nav" aria-label="Navegação principal"><a href="./servicos/">Serviços</a><a href="./sobre/">Sobre</a><a href="./contato/">Contato</a>',
        cta("ha-cta--top"), '</nav>',
      '<details class="ha-mobile-menu"><summary aria-label="Abrir menu de navegação"><span aria-hidden="true">☰</span></summary>',
        '<nav aria-label="Menu de celular"><a href="./">Início</a><a href="./servicos/">Serviços</a><a href="./sobre/">Sobre</a><a href="./contato/">Contato</a></nav>',
      '</details>',
    '</header>',
    '<div class="ha-main">',
    '<p class="ha-eyebrow">CONSULTORIA AMBIENTAL <span>· JOINVILLE / SC</span></p>',
    '<h1 id="titulo-pagina" class="ha-title">AMBIENTAL.</h1>',
    '<div class="ha-divider" aria-hidden="true"></div>',
    '<h2 class="ha-subtitle" aria-label="Visão técnica sobre o território">',
    '<span class="ha-subtitle--desktop" aria-hidden="true">VISÃO TÉCNICA SOBRE<br> O TERRITÓRIO.</span>',
    '<span class="ha-subtitle--tablet" aria-hidden="true">VISÃO TÉCNICA.<br> SOBRE O TERRITÓRIO.</span>',
    '<span class="ha-subtitle--phone" aria-hidden="true">VISÃO TÉCNICA<br> SOBRE O<br> TERRITÓRIO.</span>',
    '</h2>',
    '<div class="ha-media" role="img" aria-label="Campo fotográfico provisório com grafismo topográfico conceitual">',
    '<svg aria-hidden="true" class="ha-lines" viewBox="0 0 760 540" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#c0d3c4" stroke-width=".8" opacity=".20">',
      contours,
    '</g></svg><span class="ha-media-label">ÁREA FOTOGRÁFICA PENDENTE</span>',
    '</div>',
    '<p class="ha-description">Atuação em licenciamento, estudos e demandas ambientais de diferentes setores.</p>',
    cta("ha-cta--main"),
    '<div class="ha-location"><small>ATUAÇÃO DOCUMENTADA</small><strong>Joinville</strong><span>Norte e Litoral de SC</span></div>',
    '<p class="ha-provisional">TEXTO E FOTOGRAFIA PROVISÓRIOS</p>',
    '</div></section></main>'
  ].join("\n");
}
