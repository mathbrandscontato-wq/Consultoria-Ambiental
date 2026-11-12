import {routes, routeHref} from '../site.mjs'
import {serviceCards} from '../content/services.mjs'
import {escapeHtml as esc} from './escape.mjs'

const arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
const link=(label,href)=>'<li class="bwf-fade"><a class="bwf-link" href="'+esc(href)+'"><span class="bwf-link-t">'+esc(label)+'</span>'+arrow+'</a></li>'
export function renderFooter(prefix='./') {
  const palette='--bwf-bg:#102a20;--bwf-bg-rgb:16,42,32;--bwf-ink:#e3ebde;--bwf-ink-rgb:227,235,222;--bwf-muted:#a2b49b;--bwf-acc:127,153,98;--bwf-lit:174,205,144;--bwf-wt:#527442;--bwf-wf:#132d20;--bwf-sans:var(--font-interface);--bwf-ww:500;--bwf-ang:118deg;--bwf-b:58%;--bwf-px:50%;--bwf-py:50%;--bwf-g:0;--bwf-top:0px;--bwf-bot:100%'
  const word=Array.from('Ykeizumi').map((letter,i)=>'<span class="bwf-lw" style="--bwf-d:'+(260+i*75)+'ms"><span class="bwf-l">'+letter+'</span></span>').join('')
  return '<footer class="bwf" style="'+palette+'">'+
    '<div class="bwf-rule" aria-hidden="true"></div>'+
    '<div class="bwf-sky" aria-hidden="true"><div class="bwf-wash"></div><div class="bwf-bands"></div><div class="bwf-beam"></div><div class="bwf-glow"></div><div class="bwf-grain"></div></div>'+
    '<div class="bwf-inner">'+
      '<div class="bwf-col"><p class="bwf-label">Ykeizumi Consultoria Ambiental</p>'+
        '<div class="bwf-contact"><p><a href="tel:+5547999519658">(47) 99951-9658</a></p><p><a href="mailto:lara@ykeizumi.com.br">lara@ykeizumi.com.br</a></p></div>'+
        '<div class="bwf-credits"><p class="bwf-fade">Visão técnica para licenciar <b>com segurança.</b></p><p class="bwf-fade">Joinville/SC</p></div></div>'+
      '<nav class="bwf-col" aria-label="Institucional"><p class="bwf-label">Institucional</p><ul class="bwf-links">'+routes.map(r=>link(r.label,routeHref(r,prefix))).join('')+'</ul></nav>'+
      '<nav class="bwf-col" aria-label="Atuação"><p class="bwf-label">Atuação</p><ul class="bwf-links">'+serviceCards.map(s=>link(s.title,prefix+'servicos/#'+s.slug)).join('')+'</ul></nav>'+
    '</div>'+
    '<div class="bwf-word"><p class="sr-only">Ykeizumi</p><div class="bwf-word-box"><div class="bwf-word-in" aria-hidden="true">'+word+'</div></div><div class="bwf-foot" aria-hidden="true"></div></div>'+
    '<div class="bwf-bottom"><span>© '+new Date().getFullYear()+' Ykeizumi Consultoria Ambiental Ltda.</span></div></footer>'
}
