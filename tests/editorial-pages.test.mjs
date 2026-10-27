import test from "node:test";
import assert from "node:assert/strict";
import { renderPage } from "../src/lib/render.mjs";
import { routes } from "../src/site.mjs";
import { serviceCards, renderHomeSections } from "../src/lib/sections.mjs";
test("sete serviços, navegação interna e sem cases inventados",()=>{
 assert.equal(serviceCards.length,7);
 assert.equal(new Set(serviceCards.map(x=>x.slug)).size,7);
 const html=renderHomeSections();
 for(const path of ["./servicos/","./projetos/"])assert.ok(html.includes(path));
 assert.match(html,/As imagens são ilustrativas/);
 assert.doesNotMatch(html,/clientes atendidos|10\+ anos|1000\+/i);
});
test("cinco páginas semanticamente completas e sem scaffold",()=>{
 for(const r of routes){
  const html=renderPage(r);
  assert.equal((html.match(/<h1\b/g)??[]).length,1);
  assert.doesNotMatch(html,/em preparação<\/h1>/);
  assert.match(html,/<footer\b[\s\S]*?Ykeizumi Consultoria Ambiental/);
  assert.match(html,/<nav[^>]*aria-label="Institucional"/);
  assert.match(html,/© \d{4} Ykeizumi Consultoria Ambiental/);
  assert.match(html,/<meta name="robots" content="noindex,nofollow">/);
 }
});
test("contato ainda bloqueado, sem coleta ou sucesso falso",()=>{
 const html=renderPage(routes.find(r=>r.slug==="contato"));
 assert.match(html,/Nenhum dado é coletado/i);
 assert.doesNotMatch(html,/<form\b|type="submit"|enviado com sucesso/i);
});
test("sete grupos de serviço têm IDs de destino reais",()=>{
 const html=renderPage(routes.find(r=>r.slug==="servicos"));
 for(let i=1;i<=7;i++)assert.ok(html.includes('id="s'+String(i).padStart(2,"0")+'"'));
});