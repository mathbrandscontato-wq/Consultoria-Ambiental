import test from "node:test";
import assert from "node:assert/strict";
import { renderPage } from "../src/lib/render.mjs";
import { routes } from "../src/site.mjs";
import { serviceCards, renderHomeSections } from "../src/lib/sections.mjs";
test("sete serviços, navegação interna e sem cases inventados",()=>{
 assert.equal(serviceCards.length,7);
 assert.equal(new Set(serviceCards.map(x=>x.slug)).size,7);
 const html=renderHomeSections();
 for(const path of ["./servicos/","./contato/","./sobre/"])assert.ok(html.includes(path));
 assert.doesNotMatch(html,/clientes atendidos|projetos realizados|10\+ anos|1000\+/i);
});
test("quatro páginas completas semanticamente sem antiga mensagem de scaffold",()=>{
 for(const r of routes){
  const html=renderPage(r);
  assert.equal((html.match(/<h1\b/g)??[]).length,1);
  assert.doesNotMatch(html,/em preparação<\/h1>/);
  assert.match(html,/Conteúdo e composição em revisão/);
 }
});
test("contato ainda bloqueado, sem coleta ou sucesso falso",()=>{
 const html=renderPage(routes.find(r=>r.slug==="contato"));
 assert.match(html,/não coleta dados/i);
 assert.doesNotMatch(html,/<form\b|type="submit"|enviado com sucesso/i);
});
test("sete grupos de serviço têm IDs de destino reais",()=>{
 const html=renderPage(routes.find(r=>r.slug==="servicos"));
 for(let i=1;i<=7;i++)assert.ok(html.includes('id="s'+String(i).padStart(2,"0")+'"'));
});