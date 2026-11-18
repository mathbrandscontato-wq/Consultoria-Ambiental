import test from 'node:test';
import assert from 'node:assert/strict';
import {renderContactForm} from '../src/lib/contact-form.mjs';
import {attachmentError,createDeliveryFeedback,contactEmailHref} from '../src/scripts/contact-delivery.mjs';
test('fallback desativado não transmite dados',()=>{
 const html=renderContactForm('',{enabled:false});
 assert.match(html,/<fieldset disabled>/);
 assert.doesNotMatch(html,/action=|method="POST"|type="submit"/);
});
test('integração preparada usa destinatária fixa, POST multipart e antispam padrão',()=>{
 const html=renderContactForm('<input name="email" type="email" required>',{enabled:true});
 assert.match(html,/action="https:\/\/formsubmit.co\/lara@ykeizumi.com.br" method="POST" enctype="multipart\/form-data"/);
 assert.match(html,/name="_honey"/);
 assert.match(html,/privacy.pdf/);
 assert.doesNotMatch(html,/_captcha|_next|enviado com sucesso|fieldset disabled/);
});
test('anexos respeitam formatos e tamanho total, inclusive múltiplos arquivos',()=>{
 assert.equal(attachmentError([]),'');
 assert.equal(attachmentError([{name:'area.PDF',size:10*1024*1024}]),'');
 assert.match(attachmentError([{name:'area.exe',size:1}]),/PDF/);
 assert.match(attachmentError([{name:'a.pdf',size:6*1024*1024},{name:'b.png',size:5*1024*1024}]),/10 MB/);
});

test('formulário publicado permite teste humano e informa ativação pendente',()=>{const html=renderContactForm('<input name="email" type="email" required>');assert.match(html,/Formulário em ativação/);assert.match(html,/method="POST"/);assert.match(html,/type="submit"/);assert.doesNotMatch(html,/<fieldset disabled>|enviado com sucesso/);});

test('envio abre aba independente, sem redirect de sucesso ou perda do formulário',()=>{const html=renderContactForm('');assert.match(html,/target="_blank" rel="noopener"/);assert.match(html,/data-contact-progress/);assert.match(html,/data-contact-email href="mailto:lara@ykeizumi.com.br"/);assert.match(html,/anexados manualmente/);assert.doesNotMatch(html,/_next|_captcha/);});
test('feedback bloqueia cliques duplicados e recupera após timeout sem alegar entrega',()=>{
 let clock,delay,cancelled=false;const busy=[],messages=[];
 const f=createDeliveryFeedback({busy:v=>busy.push(v),message:v=>messages.push(v),schedule:(cb,ms)=>{clock=cb;delay=ms;return 1;},cancel:()=>{cancelled=true;}});
 assert.equal(f.begin(),true);assert.equal(f.begin(),false);assert.equal(delay,15000);clock();assert.deepEqual(busy,[true,false]);assert.match(messages.at(-1),/não foi confirmado/);assert.match(messages.at(-1),/dados continuam/);assert.equal(f.begin(),true);f.reset();assert.ok(cancelled);assert.equal(busy.at(-1),false);
});
test('alternativa de e-mail mantém destinatária fixa, codifica conteúdo e avisa anexos manuais',()=>{
 const href=contactEmailHref({name:'Teste & Nome',email:'teste@example.com',description:'Linha 1\nLinha 2',service:'Laudos técnicos'},[{name:'area.pdf'}]);
 assert.ok(href.startsWith('mailto:lara@ykeizumi.com.br?'));const params=new URLSearchParams(href.split('?')[1]);assert.match(params.get('body'),/Teste & Nome/);assert.match(params.get('body'),/Linha 1\nLinha 2/);assert.match(params.get('body'),/anexar manualmente: area.pdf/);assert.equal(params.get('subject'),'Solicitação pelo site — Ykeizumi');
});
