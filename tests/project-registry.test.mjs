import test from 'node:test';
import assert from 'node:assert/strict';
import { isPublishableProject, publishableProjects, isSafeProjectMedia } from '../src/content/project-registry.mjs';
import { renderProjectsPage } from '../src/lib/pages/projects-page.mjs';
const record = {id:'projeto-um',slug:'projeto-um',titulo:'Registro autorizado',resumo:'Resumo técnico confirmado.',status:'publicado',autorizacaoPublicacao:true,imagemCapa:'../media/registro-autorizado.webp',servicosRelacionados:['s01']};
test('publicação de projetos exige status, consentimento e dados obrigatórios',()=>{
 assert.equal(isPublishableProject(record),true);
 for (const change of [{status:'revisao'},{autorizacaoPublicacao:false},{autorizacaoPublicacao:'true'},{titulo:''},{imagemCapa:undefined},{servicosRelacionados:['s08']}]) assert.equal(isPublishableProject({...record,...change}),false);
 assert.equal(publishableProjects([record,record]).length,1);
 assert.deepEqual(publishableProjects(),[]);
});
test('mídia não permite injeção de URL, percurso fora de media ou protocolos ativos',()=>{
 for(const path of ['javascript:alert(1)','//evil.example/photo.webp','https://evil.example/photo.webp','../media/../../secret.webp','/media/x.svg','../media/x.webp?query=1']) assert.equal(isSafeProjectMedia(path),false,path);
 for(const path of ['../media/autorizada.webp','/media/campo/imagem-01.jpg','media/imagem.png'])assert.equal(isSafeProjectMedia(path),true,path);
});
test('localização só pode aparecer com autorização específica',()=>{
 assert.equal(isPublishableProject({...record,localizacao:'Joinville'}),false);
 assert.equal(isPublishableProject({...record,localizacao:'Joinville',autorizacaoLocalizacao:true}),true);
});
test('Projetos separa acervo vazio e seis imagens ilustrativas em seis seções',()=>{
 const html=renderProjectsPage();
 assert.equal((html.match(/<section\b/g)||[]).length,6);
 assert.equal((html.match(/class="project-image-link"/g)||[]).length,6);
 assert.match(html,/Ainda não há projetos publicados/);
 assert.match(html,/As fotografias não representam trabalhos realizados/);
 assert.doesNotMatch(html,/class="verified-project"/);
 for(const slug of ['s01','s02','s03'])assert.ok(html.includes('../servicos/#'+slug));
});
