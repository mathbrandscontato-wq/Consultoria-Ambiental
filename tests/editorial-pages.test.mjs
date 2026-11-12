import test from "node:test";
import assert from "node:assert/strict";
import { renderPage } from "../src/lib/render.mjs";
import { routes } from "../src/site.mjs";
import { serviceCards, renderHomeSections } from "../src/lib/sections.mjs";
test("nove serviços, navegação interna e sem cases inventados",()=>{
 assert.equal(serviceCards.length,9);
 assert.equal(new Set(serviceCards.map(x=>x.slug)).size,9);
 const html=renderHomeSections();
 for(const path of ["./servicos/"])assert.ok(html.includes(path));
 assert.match(html,/Portfólio em construção/);
 assert.doesNotMatch(html,/href="\\.\\/projetos\\/"/);
 assert.doesNotMatch(html,/clientes atendidos|10\+ anos|1000\+/i);
});
test("quatro páginas semanticamente completas e sem scaffold",()=>{
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
 assert.match(html,/Formulário em configuração/i);
 assert.match(html,/<fieldset disabled>/);
 assert.doesNotMatch(html,/<form\b|type="submit"|enviado com sucesso/i);
});
test("nove grupos de serviço têm IDs de destino reais",()=>{
 const html=renderPage(routes.find(r=>r.slug==="servicos"));
 for(let i=1;i<=9;i++)assert.ok(html.includes('id="s'+String(i).padStart(2,"0")+'"'));
});