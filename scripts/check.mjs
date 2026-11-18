import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../src/site.mjs";
import { styleFilesFor } from "../src/lib/render.mjs";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
// Production export must contain only the four approved HTML entrypoints.
const exportedFiles=await readdir(join(root,'dist'),{recursive:true});
const expectedHtml=new Set(routes.map(route=>(route.slug?route.slug+'/':'')+'index.html'));
for(const name of exportedFiles){
 if(name.endsWith('.html'))assert.ok(expectedHtml.has(name),'HTML de QA/desenvolvimento fora das quatro rotas: '+name);
 assert.doesNotMatch(name,/contact-development|responsive-review|qa-v5/,'Arquivo de desenvolvimento não pode entrar no pacote');
}
for (const route of routes) {
  const prefix = route.slug ? "../" : "./";
  const path = join(root, "dist", route.slug, "index.html");
  const html = await readFile(path, "utf8");
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /<meta name="robots" content="index,follow"/);
  assert.match(html, /<a class="skip-link" href="#conteudo">/);
  assert.match(html, /<main id="conteudo" tabindex="-1"(?:\s[^>]*)?>/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  const styles=[...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)];
  assert.equal(styles.length,1,'A exportação deve carregar um único bundle CSS por rota');
  const bundleHref=styles[0][1];
  assert.ok(bundleHref.startsWith(prefix+'styles/site-'));
  assert.match(bundleHref,/site-[a-f0-9]{12}\.css$/);
  const bundle=await readFile(join(root,'dist/styles',bundleHref.split('/').at(-1)),'utf8');
  const originalCascade=(await Promise.all(styleFilesFor(route.slug).map(name=>readFile(join(root,'src/styles',name),'utf8')))).join('\n');
  assert.equal(bundle,originalCascade,'O bundle deve preservar cada byte e a ordem da cascata original');
  assert.match(html, /<footer\b[\s\S]*?Ykeizumi Consultoria Ambiental/);
  assert.match(html, /<nav[^>]*aria-label="Institucional"/);
  assert.match(html, /© \d{4} Ykeizumi Consultoria Ambiental/);
  const footer=html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]||'';
  assert.doesNotMatch(footer, /<a\b[^>]*href="(?:#|\s*)"/, 'Rodapé não deve conter destino vazio ou fictício');
  assert.ok(!/em preparação<\/h1>/.test(html), 'Página não deve usar heading vazio de scaffold');
  assert.ok(html.includes('href="' + prefix + 'contato/"'));
  if (route.slug === 'contato') {
    assert.match(html, /<form class="contact-form"/);
    assert.match(html, /<fieldset>/);
    assert.match(html, /action="https:\/\/formsubmit.co\/lara@ykeizumi.com.br" method="POST"/);
    assert.match(html, /Envie sua solicitação/);
    assert.doesNotMatch(html, /enviado com sucesso|<fieldset disabled>/i, 'Não pode simular entrega confirmada durante ativação pendente');
  } else assert.doesNotMatch(html, /<form\\b/i, 'Somente a página Contato pode conter formulário');

  if (!route.slug) {
    assert.match(html, /data-design="G2V5-HERO-A"/);
    assert.ok(styleFilesFor(route.slug).includes('hero-a.css'));
    assert.match(html, /mobile-menu\.mjs/);
    assert.match(html, /media\/hero-desktop\.mp4/);
    assert.doesNotMatch(html, /VÍDEO ILUSTRATIVO|ha-location/);
  }
  for (const target of routes) {
    const link = prefix + (target.slug ? target.slug + "/" : "");
    assert.ok(html.includes('href="' + link + '"'), `Falta link para ${target.slug || "home"}`);
  }
}
const css = await readFile(join(root, "dist/styles/base.css"), "utf8");
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /focus-visible/);
assert.match(css, /max-width: 48rem/);
console.info(`Inspeção estática OK: ${routes.length} rotas, links, HTML acessível básico e sem envio simulado.`);
