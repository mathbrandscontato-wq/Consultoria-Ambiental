import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeAnswers, validateStep, validateAll, toPayload, serviceFromQuery, createContactFlow, createSubmissionAdapter, formatPhone } from '../src/lib/contact-schema.mjs';
import { renderContactDevelopment } from '../src/lib/pages/contact-development.mjs';
const valid = {name:'Lara Yumi',profile:'Empresa ou empreendimento',service:'s01',description:'Preciso compreender os requisitos ambientais do empreendimento.',city:'Joinville',state:'SC',channel:'E-mail',contact:'teste@example.org'};

test('contato: normaliza espaços e mantém quebras na descrição',()=>{
 const a=normalizeAnswers({...valid,name:'  João   da Silva  ',description:' Linha 1\r\nLinha 2 '});
 assert.equal(a.name,'João da Silva');assert.equal(a.description,'Linha 1\nLinha 2');assert.deepEqual(validateAll(a),{});
});
test('contato: aceita as sete pré-seleções e ignora identificadores inválidos',()=>{
 for(let n=1;n<=7;n++)assert.equal(serviceFromQuery('?servico=s0'+n),'s0'+n);
 for(const query of ['?servico=s08','?servico=<script>','?servico=SRV-01','?servico=unknown','?email=private@example.org'])assert.equal(serviceFromQuery(query),'');
 assert.deepEqual(validateStep(2,{service:'unknown'}),{});
});
test('contato: requer canal único, valida UF e limites sem negar outras regiões',()=>{
 assert.deepEqual(validateAll({...valid,city:'Manaus',state:'AM'}),{});
 assert.ok(validateAll({...valid,state:'XX'}).state);assert.ok(validateAll({...valid,name:'x'.repeat(121)}).name);assert.ok(validateAll({...valid,description:'x'.repeat(3001)}).description);
 assert.deepEqual(validateStep(5,{channel:'E-mail',contact:'user+demanda@example.com.br'}),{});
 assert.ok(validateStep(5,{channel:'E-mail',contact:'invalido'}).contact);
 for(const phone of ['(47) 99999-9999','+55 47 99999 9999','(11) 3333-4444'])assert.deepEqual(validateStep(5,{channel:'WhatsApp',contact:phone}),{});
 for(const phone of ['(00) 99999-9999','123','(47) 89999-9999'])assert.ok(validateStep(5,{channel:'WhatsApp',contact:phone}).contact);
 assert.equal(toPayload({...valid,channel:'WhatsApp',contact:'(47) 99999-9999'}).contact,'+5547999999999');assert.equal(formatPhone('47999999999'),'(47) 99999-9999');
});
test('contato: progresso, voltar, revisão, edição direta e cancelamento preservam respostas',()=>{
 const flow=createContactFlow('s04');assert.equal(flow.snapshot.answers.service,'s04');assert.equal(flow.snapshot.progress,0);
 assert.equal(flow.next().ok,false);flow.update(valid);
 for(let n=0;n<6;n++){assert.equal(flow.snapshot.step,n);assert.equal(flow.next().ok,true);}
 assert.equal(flow.snapshot.progress,100);assert.equal(flow.snapshot.step,6);
 assert.equal(flow.edit(3),true);assert.equal(flow.snapshot.editing,true);flow.update({description:'Texto revisto com informação suficiente.'});flow.next();assert.equal(flow.snapshot.step,6);assert.equal(flow.snapshot.answers.name,valid.name);assert.equal(flow.snapshot.answers.description,'Texto revisto com informação suficiente.');
 flow.edit(0);flow.update({name:''});assert.equal(flow.next().ok,false);flow.back();assert.equal(flow.snapshot.step,6);assert.equal(flow.snapshot.answers.name,valid.name);
 flow.back();assert.equal(flow.snapshot.step,5);assert.equal(flow.snapshot.answers.name,valid.name);flow.clear();assert.equal(flow.snapshot.answers.name,'');
});
test('contato: adaptador indisponível não transmite sem integração e privacidade',async()=>{
 let calls=0;const fetchImpl=async()=>{calls++;throw new Error('Não deveria ser chamado');};
 for(const options of [{},{endpoint:'http://example.org',privacyVerified:true,securityVerified:true,fetchImpl},{endpoint:'https://example.org',privacyVerified:false,securityVerified:true,fetchImpl},{endpoint:'https://example.org',privacyVerified:true,securityVerified:false,fetchImpl}]){
  const adapter=createSubmissionAdapter(options);assert.equal(adapter.enabled,false);await assert.rejects(adapter.submit(valid),{code:'INTEGRATION_UNAVAILABLE'});
 }assert.equal(calls,0);
});
test('contato: falha preserva idempotência e confirmação não confiável nunca vira sucesso',async()=>{
 const keys=[];let attempt=0;const adapter=createSubmissionAdapter({endpoint:'https://example.org',privacyVerified:true,securityVerified:true,fetchImpl:async(url,options)=>{keys.push(options.headers['Idempotency-Key']);attempt++;return {ok:true,json:async()=>attempt===1?{ok:true}:{accepted:true,receipt:'receipt-123'}};}});
 await assert.rejects(adapter.submit(valid),/confirmação válida/);assert.deepEqual(await adapter.submit(valid),{accepted:true,receipt:'receipt-123'});assert.equal(keys[0],keys[1]);await assert.rejects(adapter.submit(valid),{code:'DUPLICATE_SUBMISSION'});
});
test('contato: submissões concorrentes são bloqueadas e dados inválidos não chegam à rede',async()=>{
 let finish;let count=0;const adapter=createSubmissionAdapter({endpoint:'https://example.org',privacyVerified:true,securityVerified:true,fetchImpl:()=>{count++;return new Promise(resolve=>{finish=resolve;});}});
 await assert.rejects(adapter.submit({...valid,description:''}),/inválidas/);assert.equal(count,0);
 const first=adapter.submit(valid);await assert.rejects(adapter.submit(valid),{code:'DUPLICATE_SUBMISSION'});finish({ok:true,json:async()=>({accepted:true,receipt:'receipt-456'})});await first;assert.equal(count,1);
});
test('contato: render de desenvolvimento é identificado e não possui envio HTML implícito',()=>{
 const html=renderContactDevelopment();assert.match(html,/Prévia de desenvolvimento/);assert.doesNotMatch(html,/<form\b|action=|type="submit"|localStorage/);assert.match(html,/Nenhuma transmissão está habilitada/);
});
