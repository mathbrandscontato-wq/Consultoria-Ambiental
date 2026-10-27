import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../src/site.mjs";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
// Production export must contain only the five approved HTML entrypoints.
const exportedFiles=await readdir(join(root,'dist'),{recursive:true});
const expectedHtml=new Set(routes.map(route=>(route.slug?route.slug+'/':'')+'index.html'));
for(const name of exportedFiles){
 if(name.endsWith('.html'))assert.ok(expectedHtml.has(name),'HTML de QA/desenvolvimento fora das cinco rotas: '+name);
 assert.doesNotMatch(name,/contact-development|responsive-review|qa-v5/,'Arquivo de desenvolvimento não pode entrar no pacote');
}
for (const route of routes) {
  const prefix = route.slug ? "../" : "./";
  const path = join(root, "dist", route.slug, "index.html");
  const html = await readFile(path, "utf8");
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow"/);
  assert.match(html, /<a class="skip-link" href="#conteudo">/);
  assert.match(html, /<main id="conteudo" tabindex="-1"(?:\s[^>]*)?>/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes('href="' + prefix + 'styles/tokens.css"'));
  assert.ok(html.includes('href="' + prefix + 'styles/base.css"'));
  assert.ok(html.includes('href="' + prefix + 'styles/sections.css"'));
  assert.match(html, /<footer\b[\s\S]*?Ykeizumi Consultoria Ambiental/);
  assert.match(html, /<nav[^>]*aria-label="Institucional"/);
  assert.match(html, /© \d{4} Ykeizumi Consultoria Ambiental/);
  const footer=html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]||'';
  assert.doesNotMatch(footer, /<a\b[^>]*href="(?:#|\s*)"/, 'Rodapé não deve conter destino vazio ou fictício');
  assert.ok(!/em preparação<\/h1>/.test(html), 'Página não deve usar heading vazio de scaffold');
  assert.ok(html.includes('href="' + prefix + 'contato/"'));
  assert.ok(!/<form\b|type="submit"|enviado com sucesso/gi.test(html), "Não deve haver envio falso");
  if (!route.slug) {
    assert.match(html, /data-design="G2V5-HERO-A"/);
    assert.match(html, /hero-a\.css/);
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
