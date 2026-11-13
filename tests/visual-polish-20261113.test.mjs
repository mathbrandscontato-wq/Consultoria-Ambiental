import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderPage} from '../src/lib/render.mjs';
import {routes} from '../src/site.mjs';
import {serviceCards} from '../src/content/services.mjs';
const page=slug=>renderPage(routes.find(x=>x.slug===slug));
test('revisão visual mantém quatro páginas, nove serviços e conteúdo integral',()=>{
 assert.deepEqual(routes.map(x=>x.slug),['','sobre','servicos','contato']);
 assert.equal(serviceCards.length,9);
 const home=page('');
 const services=page('servicos');
 for(const s of serviceCards){
  assert.ok(home.includes(s.title),'A Home deve preservar '+s.title);
  assert.ok(home.includes(s.description),'A Home deve preservar descrição de '+s.title);
  assert.ok(services.includes(s.title),'Serviços deve preservar '+s.title);
  assert.ok(services.includes(s.description),'Serviços deve preservar descrição de '+s.title);
  for(const detail of s.details)assert.ok(services.includes(detail),'Falta detalhe '+detail);
 }
 assert.equal((services.match(/role="tabpanel"/g)||[]).length,9);
 assert.equal((services.match(/class="service-context"/g)||[]).length,7);
 assert.equal((home.match(/class="home-service"/g)||[]).length,9);
});
test('acessibilidade e dados essenciais permanecem na versão provisória',()=>{
 for(const route of routes){
   const html=renderPage(route);
   assert.match(html,/noindex,nofollow/);
   assert.match(html,/60\.422\.093\/0001-74/);
   assert.match(html,/lara@ykeizumi\.com\.br/);
 }
 assert.match(page('contato'),/<fieldset disabled>/);
 assert.ok(page('sobre').includes('lara-yumi-640.webp'));
});
test('refinamento visual: hierarquia e leitura, sem conteúdo adicional',async()=>{
 const css=await readFile(new URL('../src/styles/client-revision.css',import.meta.url),'utf8');
 const js=await readFile(new URL('../src/scripts/footer.mjs',import.meta.url),'utf8');
 assert.match(css,/YKEIZUMI UX VISUAL POLISH/);
 assert.match(css,/\.home-service>div \{ display:flex/);
 assert.match(css,/\.about-profile-copy \.editorial-copy \{ max-width:61ch/);
 assert.match(css,/\.service-panel-details li \{/);
 assert.match(css,/\.contact-direct \{/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(js,/target\*\.42,108/);
 assert.match(page(''),/client-revision\.css\?v=ux-20261113-visual-v3/);
});