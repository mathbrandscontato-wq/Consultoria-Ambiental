import test from 'node:test';
import assert from 'node:assert/strict';
import {renderProjectGallery, hasApprovedProjects} from '../src/lib/projects.mjs';
import {approvedProjects, reviewSlots} from '../src/content/projects.mjs';
import {renderPage} from '../src/lib/render.mjs';
import {routes} from '../src/site.mjs';

test('galeria ilustrativa não apresenta projetos de clientes como realizados',()=>{
  assert.equal(approvedProjects.length,0);
  assert.equal(reviewSlots.length,6);
  assert.equal(hasApprovedProjects(),false);
  const html=renderProjectGallery();
  assert.match(html,/Imagem ilustrativa/);
  assert.equal((html.match(/class="project-image-link/g)||[]).length,6);
});
test('Home apresenta portfólio em construção sem link para página removida',()=>{
  const html=renderPage(routes.find(x=>!x.slug));
  assert.match(html,/Portfólio em construção/);
  assert.match(html,/Em breve, os trabalhos realizados pela Ykeizumi/);
  assert.match(html,/id="projetos"/);
  assert.doesNotMatch(html,/href="\\.\\/projetos\\/"/);
});
test('Sobre apresenta fundadora, método, princípios, equipe e contato',()=>{
  const html=renderPage(routes.find(x=>x.slug==='sobre'));
  const order=['id="lara-yumi"','id="abordagem"','id="principios"','id="equipe"','id="conversa"'];
  const positions=order.map(x=>html.indexOf(x));
  assert.ok(positions.every(x=>x>=0),JSON.stringify(positions));
  assert.ok(positions.every((x,i)=>!i||x>positions[i-1]));
});
test('escopo público contém quatro páginas e não apresenta rota Projetos',()=>{
  assert.deepEqual(routes.map(x=>x.slug),['','sobre','servicos','contato']);
});
