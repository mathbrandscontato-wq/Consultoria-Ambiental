import { routes, routeHref } from '../site.mjs';
/**
 * Hero A | Ykeizumi G2 V5 | proposta de implementação.
 * Topografia geométrica redesenhada por parâmetros medidos nas pranchas da Math Brands,
 * sem incorporar imagens ou logos protegidos do pacote.
 * Assets fotográficos, logo oficial e conteúdo definitivo seguem pendentes.
 */
const round = value => (Math.round(value * 10) / 10).toFixed(1);

const topoModels = Object.freeze([
  {
    key: "desktop",
    viewport: "675 118 704 602",
    start: [702,541],c1:[845,242.9],c2:[1006.8,242.9],
    end:[1114.6,375.4],smooth:[1296.6,469.2],finish:[1352,447.1],
    increments:[4.78,11.04,13.24,9.57,5.89,8.83],secondary:[675,449.1,907.32,394.1,1055.16,437.1,1379,389.1]
  },
  {
    key: "tablet",
    viewport: "22 505 724 190",
    start:[49,627.2],c1:[196.6,551.6],c2:[363.2,551.6],
    end:[474.2,585.2],smooth:[661.6,609],finish:[719,603.4],
    increments:[1.21,2.8,3.36,2.43,1.49,2.24],secondary:[22,609.5,260.92,554.5,412.96,597.5,746,549.5]
  },
  {
    key: "phone",
    viewport: "25 310 340 353",
    start:[52,551.2],c1:[111.3,387.6],c2:[185.7,387.6],
    end:[235.3,460.3],smooth:[319,511.8],finish:[338,499.7],
    increments:[2.63,6.06,7.27,5.25,3.23,4.85],secondary:[25,504.15,137.2,449.15,208.6,492.15,365,444.15]
  },
  {
    key: "small",
    viewport: "22 415 316 205",
    start:[49,548.1],c1:[102.8,464.4],c2:[171.4,464.4],
    end:[217.2,501.6],smooth:[294.4,528],finish:[311,521.8],
    increments:[1.35,3.1,3.72,2.69,1.65,2.48],secondary:[22,527.75,126.28,472.75,192.64,515.75,338,467.75]
  }
]);

function renderContours(model) {
  const values = [model.start,model.c1,model.c2,model.end,model.smooth,model.finish];
  const lines = Array.from({length:16},(_,i)=>{
    const v=values.map(([x,y],j)=>[x,round(y + model.increments[j]*i)]);
    return '<path d="M '+v[0].join(' ')+' C '+v[1].join(' ')+' '+v[2].join(' ')+' '+v[3].join(' ')+
      ' S '+v[4].join(' ')+' '+v[5].join(' ')+'" />';
  }).join("");
  const [x0,y0,x1,y1,x2,y2,x3,y3] = model.secondary;
  const accent = Array.from({length:5},(_,i)=>
    '<path d="M '+round(x0)+' '+round(y0+27*i)+
    ' Q '+round(x1)+' '+round(y1+23*i)+
    ' '+round(x2)+' '+round(y2+27*i)+
    ' T '+round(x3)+' '+round(y3+32*i)+'" />'
  ).join("");
  return '<svg class="ha-lines ha-lines--'+model.key+'" viewBox="'+model.viewport+'" preserveAspectRatio="none" focusable="false" aria-hidden="true">'+
    '<g fill="none" stroke="#ffffff" stroke-width=".8" stroke-opacity=".19">'+lines+'</g>'+
    '<g fill="none" stroke="#98ac97" stroke-width=".8" stroke-opacity=".26">'+accent+'</g>'+
    '</svg>';
}

const arrow='<span class="ha-arrow" aria-hidden="true"><svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span>';
export const heroCta = (variant, href="./contato/", label="Solicitar Proposta") =>
  '<a class="ha-cta '+variant+'" href="'+href+'"><span class="hover-dot" aria-hidden="true"></span><span class="hover-label">'+label+'</span><span class="hover-reveal" aria-hidden="true">'+label+' '+arrow+'</span>'+'</a>';

export function renderHeroA() {
  return [
    '<main id="conteudo" tabindex="-1">',
    '<section class="ha" data-design="G2V5-HERO-A" aria-labelledby="titulo-pagina">',
    '<div class="ha-media" aria-label="Paisagem natural">',
    '<img class="ha-photo" src="./media/hero-poster.webp" width="1280" height="720" decoding="async" fetchpriority="high" alt="Paisagem natural">',
    '<video class="ha-video" muted loop playsinline preload="none" poster="./media/hero-poster.webp" data-desktop="./media/hero-desktop.mp4" data-mobile="./media/hero-mobile.mp4" aria-hidden="true" tabindex="-1"></video>',
    '<div class="ha-photo-shade" aria-hidden="true"></div>',
    '<div class="ha-dots" aria-hidden="true"></div>',
    '<span class="ha-crop ha-crop--tl" aria-hidden="true"></span>',
    '<span class="ha-crop ha-crop--tr" aria-hidden="true"></span>',
    '<span class="ha-crop ha-crop--bl" aria-hidden="true"></span>',
    '<span class="ha-crop ha-crop--br" aria-hidden="true"></span>',
    '</div>',
    '<header class="ha-header">',
    '<a class="ha-logo" data-status="logo-oficial" href="./" aria-current="page" aria-label="Ykeizumi Consultoria Ambiental, início">',
    '<img class="brand-image" src="./media/logo-white.webp" width="1024" height="200" alt="Ykeizumi Consultoria Ambiental">',
    '</a>',
    '<nav class="ha-nav" aria-label="Navegação principal">'+routes.map(route=>'<a href="'+routeHref(route)+'">'+route.label+'</a>').join(''),
    heroCta("ha-cta--top"),'</nav>',
    '<details class="ha-mobile-menu"><summary aria-label="Abrir menu de navegação" aria-expanded="false" aria-controls="mobile-navigation"><span aria-hidden="true"><svg class="ui-icon" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M4 6h16M4 12h16M4 18h16"/></svg></span></summary>',
    '<nav id="mobile-navigation" aria-label="Menu de celular">'+routes.map(route=>'<a href="'+routeHref(route)+'">'+route.label+'</a>').join('')+'</nav>',
    '</details>',
    '</header>',
    '<div class="ha-main">',
    '<h1 id="titulo-pagina" class="ha-title">Consultoria Ambiental</h1>',
    '<h2 class="ha-subtitle">Visão Técnica sobre o território.</h2>',
    '<h3 class="ha-description">Atuação em licenciamento, estudos e demandas ambientais de diferentes setores. Atuação em Joinville e Litoral de Santa Catarina.</h3>',
    heroCta("ha-cta--services", "./servicos/", "Conheça nossos serviços"),
    '</div><a class="ha-scroll-hint" href="#introducao">Explore o território</a><button class="video-pause" type="button" aria-label="Pausar vídeo de fundo" aria-pressed="false">Ⅱ</button></section></main>'
  ].join("\n");
}
