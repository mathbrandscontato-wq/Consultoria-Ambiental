import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../src/site.mjs";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
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
  assert.ok(html.includes('Conteúdo e composição em revisão'));
  assert.ok(!/em preparação<\/h1>/.test(html), 'Página não deve usar heading vazio de scaffold');
  assert.ok(html.includes('href="' + prefix + 'contato/"'));
  assert.ok(!/<form\b|type="submit"|enviado com sucesso/gi.test(html), "Não deve haver envio falso");
  if (!route.slug) {
    assert.match(html, /data-design="G2V5-HERO-A"/);
    assert.match(html, /hero-a\.css/);
    assert.match(html, /mobile-menu\.mjs/);
    assert.match(html, /images\.unsplash\.com\/photo-1654361700413-b4db34d37fc8/);
    assert.match(html, /FOTOGRAFIA EDITORIAL · PROVISÓRIA/);
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
