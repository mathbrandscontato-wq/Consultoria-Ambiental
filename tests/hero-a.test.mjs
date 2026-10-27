import test from "node:test";
import assert from "node:assert/strict";
import { renderHeroA } from "../src/lib/hero-a.mjs";
import { renderPage } from "../src/lib/render.mjs";
import { routes } from "../src/site.mjs";

test("Hero A é a única variação autorizada na Home", () => {
  const html = renderHeroA();
  assert.match(html, /data-design="G2V5-HERO-A"/);
  assert.doesNotMatch(html, /Hero B/);
  assert.match(html, /Consultoria Ambiental<\/h1>/);
  assert.match(html, /Visão Técnica sobre o território/);
  assert.doesNotMatch(html, /ha-location|ha-provisional|VÍDEO ILUSTRATIVO/);
  assert.match(html, /data-status="logo-oficial"/);
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

test("Hero usa pontilhado e vídeo, sem CTA inferior ou controles", () => {
  const html = renderHeroA();
  assert.match(html, /class="ha-dots"/);
  assert.match(html, /<video class="ha-video"/);
  assert.doesNotMatch(html, /hero-video-toggle|ha-cta--main|ha-lines--/);
  assert.match(html, /hero-poster\.webp/);
  assert.match(html, /ha-cta--services" href=".\/servicos\//);
  assert.match(html, /Joinville e Litoral de Santa Catarina/);
});
