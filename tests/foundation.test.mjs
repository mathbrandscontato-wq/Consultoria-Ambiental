import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../src/site.mjs";
import { renderPage, escapeHtml } from "../src/lib/render.mjs";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("rotas internas únicas e restritas ao escopo", () => {
  assert.deepEqual(routes.map((r) => r.slug), ["", "sobre", "servicos", "projetos", "contato"]);
  assert.equal(new Set(routes.map((r) => r.slug)).size, routes.length);
});
test("escapamento de conteúdo e navegação com página atual", () => {
  assert.equal(escapeHtml(`<teste a="&">'`), "&lt;teste a=&quot;&amp;&quot;&gt;&#39;");
  for (const route of routes) {
    const html = renderPage(route);
    assert.match(html, /aria-current="page"/);
    assert.match(html, /lang="pt-BR"/);
    assert.match(html, /Solicitar proposta/i);
    assert.match(html, /Pular para o conteúdo/);
    assert.equal((html.match(/aria-current="page"/g) ?? []).length, route.slug ? 2 : 1);
  }
});
test("build exporta cinco páginas estáticas independentes", async () => {
  for (const route of routes) {
    const html = await readFile(join(root, "dist", route.slug, "index.html"), "utf8");
    assert.match(html, /<main id="conteudo"/);
    assert.match(html, /<footer\b[\s\S]*?Ykeizumi Consultoria Ambiental/);
    assert.match(html, /<nav[^>]*aria-label="Institucional"/);
    assert.match(html,/© \d{4} Ykeizumi Consultoria Ambiental/);
    assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
    assert.doesNotMatch(html, /<form\b/);
  }
});
test("interações não representam backend ou publicação", async () => {
  const html = await readFile(join(root, "dist", "contato", "index.html"), "utf8");
  assert.match(html, /Nenhum dado é coletado/);
  assert.doesNotMatch(html, /<input\b|<form\b|fetch\(/);
  const tokens = await readFile(join(root, "dist", "styles", "tokens.css"), "utf8");
  assert.match(tokens, /"Ykeizumi Avenir"/);
  assert.match(tokens, /#1e3b2d/);
});
