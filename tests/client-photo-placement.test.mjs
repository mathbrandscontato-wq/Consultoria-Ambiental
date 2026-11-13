import test from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
import {renderPage} from '../src/lib/render.mjs';
import {routes} from '../src/site.mjs';
import {photo,photoUrl,photoSrcSet} from '../src/lib/components.mjs';
import {editorialPhotos,approvedProjects} from '../src/content/projects.mjs';
const pick=slug=>renderPage(routes.find(r=>r.slug===slug));
test('Fotos da cliente mantêm legenda editorial e sem alegação de projetos executados',()=>{
  assert.equal(approvedProjects.length,0);
  assert.equal(editorialPhotos.length,6);
  const html=pick('');
  for(const id of ['ykeizumi-vila-costeira','ykeizumi-floresta-trilhos','ykeizumi-estrada-vegetacao','ykeizumi-fauna-macaco','ykeizumi-avifauna']) {
    assert.ok(html.includes('media/'+id+'-1280.jpg'), 'Falta foto na galeria: '+id);
  }
  assert.match(html,/Imagem ilustrativa/);
  assert.match(html,/Portfólio em construção/);
});
test('Foto JPEG tratada não tenta requisitar WebP inexistente',()=>{
  assert.equal(photoUrl('ykeizumi-vila-costeira','./'),'./media/ykeizumi-vila-costeira-1280.jpg');
  assert.equal(photoSrcSet('ykeizumi-vila-costeira','./'),'');
  assert.ok(photo('ykeizumi-fauna-macaco','./','Macaco-prego').includes('ykeizumi-fauna-macaco-1280.jpg'));
  assert.ok(!photo('ykeizumi-fauna-macaco').includes('srcset='));
  assert.ok(photo('litoral','./','Paisagem').includes('litoral-640.webp'));
});
test('Fotos de território têm contexto correto em Sobre, Serviços e Home',()=>{
  assert.ok(pick('sobre').includes('media/ykeizumi-floresta-trilhos-1280.jpg'));
  assert.ok(pick('servicos').includes('media/ykeizumi-estrada-vegetacao-1280.jpg'));
  assert.ok(pick('').includes('media/ykeizumi-vila-costeira-1280.jpg'));
  // O seletor novo de serviços preserva a foto na Home e na galeria, mas exibe um painel textual como na referência aprovada.
  assert.ok(pick('').includes('media/ykeizumi-vila-costeira-1280.jpg'));
});
test('Cinco arquivos JPEG efetivamente existem no pacote de fontes',async()=>{
  for(const id of ['ykeizumi-vila-costeira','ykeizumi-floresta-trilhos','ykeizumi-estrada-vegetacao','ykeizumi-fauna-macaco','ykeizumi-avifauna']) {
    await access(new URL('../public/media/'+id+'-1280.jpg',import.meta.url));
  }
});
