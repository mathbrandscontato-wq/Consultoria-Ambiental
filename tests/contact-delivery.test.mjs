import test from 'node:test';
import assert from 'node:assert/strict';
import {renderContactForm} from '../src/lib/contact-form.mjs';
import {attachmentError} from '../src/scripts/contact-delivery.mjs';
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
