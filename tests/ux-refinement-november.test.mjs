import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderPage} from '../src/lib/render.mjs';
import {routes} from '../src/site.mjs';
const page=slug=>renderPage(routes.find(route=>route.slug===slug));

test('Nove serviços têm navegação em abas e painel correspondente, com âncoras preservadas',()=>{
 const html=page('servicos');
 assert.equal((html.match(/class="service-nav-item(?: is-active)?"/g)||[]).length,9);
 assert.equal((html.match(/role="tabpanel"/g)||[]).length,9);
 assert.equal((html.match(/data-service-panel="s\d\d"/g)||[]).length,9);
 assert.doesNotMatch(html,/class="service-feature"/);
 for(let n=1;n<=9;n++){
   const id='s'+String(n).padStart(2,'0');
   assert.ok(html.includes('href="#'+id+'"'));
   assert.ok(html.includes('id="'+id+'" role="tabpanel"'));
   assert.ok(html.includes('aria-controls="'+id+'"'));
 }
});
test('Imagem de indústria e infraestrutura representa ocupação e infraestrutura',()=>{
 const html=page('');
 assert.match(html,/Indústria e infraestrutura/);
 assert.match(html,/ykeizumi-floresta-trilhos-1280\.jpg/);
});
test('Rodapé compacto e tratamento visual estão configurados sem alteração do retrato da fundadora',async()=>{
 const css=await readFile(new URL('../src/styles/client-revision.css',import.meta.url),'utf8');
 const js=await readFile(new URL('../src/scripts/footer.mjs',import.meta.url),'utf8');
 assert.match(css,/\.bwf-word\{margin-top:/);
 assert.match(css,/\.service-info-panel\{/);
 assert.match(css,/\.service-nav-item\.is-active/);
 assert.match(css,/filter:saturate\(\.74\)/);
 assert.match(css,/#servicos-home\{/);
 assert.match(css,/text-align:justify/);
 assert.match(js,/target\*\.42,108/);
 assert.ok(!css.includes('.about-portrait img{filter:'));
});
test('Atendimento segue bloqueado até endpoint seguro',()=>{
 const html=page('contato');
 assert.match(html,/<fieldset disabled>/);
 assert.doesNotMatch(html,/type="submit"/);
});

test('Fotos dos segmentos aparecem apenas no desktop',async()=>{
 const css=await readFile(new URL('../src/styles/unified.css',import.meta.url),'utf8');
 assert.match(css,/@media\(max-width:899px\)[^\n]*\.sector-showcase \.sector-description figure\{display:none\}/);
 assert.match(css,/@media\(min-width:900px\)[^\n]*\.sector-showcase\.is-enhanced \.sector-stage\{display:block/);
 const home=page('');
 assert.match(home,/Indústria e infraestrutura/);
 assert.match(home,/sector-description/);
});
