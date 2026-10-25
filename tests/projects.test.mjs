import test from "node:test";
import assert from "node:assert/strict";
import { renderProjectGallery, hasApprovedProjects } from "../src/lib/projects.mjs";
import { approvedProjects, reviewSlots } from "../src/content/projects.mjs";
import { renderPage } from "../src/lib/render.mjs";
import { routes } from "../src/site.mjs";
test("galeria contempla layout de projetos sem alegações de cases", () => {
  assert.equal(approvedProjects.length,0);
  assert.equal(reviewSlots.length,6);
  assert.equal(hasApprovedProjects(),false);
  const html=renderProjectGallery();
  assert.equal((html.match(/class="project-card project-card--placeholder/g)||[]).length,6);
  assert.doesNotMatch(html,/<a\b|<img\b|clientes atendidos|cases reais/);
  assert.match(html,/Conteúdo pendente/);
});
test("chamada Home usa somente três espaços e leva a galeria", () => {
  const html=renderPage(routes.find(x=>!x.slug));
  assert.ok(html.includes('href="./projetos/"'));
  assert.ok(html.includes('id="projetos"'));
  const gallery=renderProjectGallery({compact:true});
  assert.equal((gallery.match(/project-card--placeholder/g)||[]).length,3);
});
test("ordem da página Sobre é abertura, Lara, experiência, contato", () => {
  const html=renderPage(routes.find(x=>x.slug==="sobre"));
  const pos=["page-banner","page-profile","page-body","page-outro"].map(x=>html.indexOf('class="'+x));
  assert.ok(pos.every(x=>x>=0),JSON.stringify(pos));
  assert.ok(pos.every((x,i)=>!i||x>pos[i-1]),"Lara deve ser a primeira seção após Hero");
  assert.match(html,/Lara Yumi/);
});
test("Projetos é rota real com navegação, galeria e disclosure", () => {
  const html=renderPage(routes.find(x=>x.slug==="projetos"));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/Projetos/);
  assert.match(html,/project-gallery/);
  assert.match(html,/Ainda não há projetos publicados/);
  assert.doesNotMatch(html,/<form\b/);
});
