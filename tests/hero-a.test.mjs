import test from "node:test";
import assert from "node:assert/strict";
import { renderHeroA } from "../src/lib/hero-a.mjs";
import { renderPage } from "../src/lib/render.mjs";
import { routes } from "../src/site.mjs";

test("Hero A é a única variação autorizada na Home", () => {
  const html = renderHeroA();
  assert.match(html, /data-design="G2V5-HERO-A"/);
  assert.doesNotMatch(html, /Hero B/);
  assert.match(html, /AMBIENTAL\./);
  assert.match(html, /VISÃO TÉCNICA/);
  assert.match(html, /ha-subtitle--tablet/);
  assert.match(html, /ha-subtitle--phone/);
  assert.match(html, /FOTOGRAFIA EDITORIAL · PROVISÓRIA/);
  assert.match(html, /data-status="logo-oficial-nao-publicado"/);
});
test("Home possui Hero e não duplica o header estrutural", () => {
  const html = renderPage(routes[0]);
  assert.match(html, /data-design="G2V5-HERO-A"/);
  assert.doesNotMatch(html, /class="site-header"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((html.match(/aria-current="page"/g) ?? []).length, 1);
  assert.match(html, /prefers-reduced-motion|hero-a\.css/);
  assert.doesNotMatch(html, /<form\b/);
});
test("Contato permanece como página técnica sem envio", () => {
  const html = renderPage(routes.find((r) => r.slug === "contato"));
  assert.doesNotMatch(html, /data-design="G2V5-HERO-A"/);
  assert.match(html, /Nenhum dado é coletado/);
});

test("topografia usa geometrias individuais e copy das pranchas G2", () => {
  const html = renderHeroA();
  for (const viewport of ["desktop","tablet","phone","small"]) {
    assert.match(html, new RegExp('ha-lines--'+viewport));
  }
  assert.match(html, /Licenciamento, estudos e demandas ambientais com atuação no Norte e Litoral catarinense/);
  assert.equal((html.match(/<svg /g) ?? []).length, 4);
  assert.doesNotMatch(html, /data:image\//);
  assert.match(html, /Bleron Salihi \/ Unsplash/);
  assert.match(html, /não representa projeto/i);
});
