import { serviceCards } from '../content/services.mjs';
import { PROFILES, STATES, LIMITS, createContactFlow, serviceFromQuery, serviceLabel, formatPhone, createSubmissionAdapter } from '../lib/contact-schema.mjs';

const questions = [
 ['Como podemos chamar você?','Queremos saber com quem estamos conversando.'],
 ['Você está entrando em contato como…','Escolha a opção que melhor representa seu contato.'],
 ['Qual é a sua necessidade ambiental?','Se ainda não souber qual serviço precisa, podemos começar pelo contexto.'],
 ['Conte um pouco sobre sua demanda.','Descreva o que você precisa, com suas próprias palavras.'],
 ['Onde está localizada a demanda?','Cidade e estado são suficientes neste momento.'],
 ['Por onde podemos retornar o contato?','Escolha o canal que prefere utilizar.'],
 ['Está tudo certo?','Confira suas informações antes de enviar a solicitação.']
];
const element = (tag,attrs={},text) => { const node=document.createElement(tag); for(const [key,value] of Object.entries(attrs)) if(value!==undefined) node.setAttribute(key,String(value)); if(text!==undefined) node.textContent=text; return node; };

export function initConversation(root, adapter=createSubmissionAdapter()) {
 const flow = createContactFlow(serviceFromQuery(location.search));
 const title=root.querySelector('#contact-question'),fields=root.querySelector('[data-fields]'),support=root.querySelector('[data-support]'),error=root.querySelector('[data-error]'),counter=root.querySelector('[data-counter]'),progress=root.querySelector('progress'),progressLabel=root.querySelector('[data-progress-label]'),editing=root.querySelector('[data-editing]'),back=root.querySelector('[data-back]'),next=root.querySelector('[data-next]'),stage=root.querySelector('.conversation-stage');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let busy=false,disposed=false; const drafts={WhatsApp:'','E-mail':''};
 const animateTitle=()=>{
  if(reduced.matches||!title.animate)return;
  const text=title.textContent;title.setAttribute('aria-label',text);title.replaceChildren();
  text.split(/(\s+)/).forEach((part,i)=>{if(!part.trim()){title.append(document.createTextNode(part));return;}const word=element('span',{'aria-hidden':'true',class:'conversation-word'},part);title.append(word);word.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,delay:Math.min(i*24,240),easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});});
 };
 function input(name,label,type='text',options={}) {
  const wrap=element('div',{class:'conversation-field'}),id='contact-'+name;
  wrap.append(element('label',{for:id},label));
  const node=element(options.multiline?'textarea':'input',{id,name,type:options.multiline?undefined:type,autocomplete:options.autocomplete||'off',maxlength:options.maxlength,placeholder:options.placeholder,'aria-describedby':'contact-error'});
  if(options.inputmode)node.setAttribute('inputmode',options.inputmode);
  if(options.multiline){node.rows=4;node.style.resize='vertical';}
  node.value=flow.snapshot.answers[name]||'';
  node.addEventListener('input',()=>{flow.update({[name]:node.value});if(name==='contact')drafts[flow.snapshot.answers.channel]=node.value;node.removeAttribute('aria-invalid');});
  wrap.append(node);return wrap;
 }
 function choices(name,label,options) {
  const set=element('fieldset',{class:'conversation-choices'});set.append(element('legend',{class:'conversation-sr'},label));
  for(const [value,text] of options){const choice=element('label',{class:'conversation-choice'}),radio=element('input',{type:'radio',name,value,'aria-describedby':'contact-error'});radio.checked=flow.snapshot.answers[name]===value;radio.addEventListener('change',()=>{flow.update({[name]:value});if(name==='channel'){flow.update({contact:drafts[value]||''});renderContactChannel();}error.textContent='';});choice.append(radio,element('span',{},text),element('span',{class:'conversation-choice-mark','aria-hidden':'true'},''));set.append(choice);}return set;
 }
 function renderContactChannel() {
  let slot=fields.querySelector('[data-channel-field]');if(!slot){slot=element('div',{'data-channel-field':''});fields.append(slot);}slot.replaceChildren();
  const channel=flow.snapshot.answers.channel;
  if(channel==='WhatsApp'){
   slot.append(input('contact','WhatsApp com DDD','tel',{autocomplete:'tel-national',inputmode:'tel',maxlength:20,placeholder:'(47) 99999-9999'}));
   const node=slot.querySelector('input');node.addEventListener('input',event=>{if(node.selectionStart===node.value.length&&!event.inputType?.startsWith('delete')){node.value=formatPhone(node.value);flow.update({contact:node.value});drafts.WhatsApp=node.value;}});node.addEventListener('blur',()=>{node.value=formatPhone(node.value);flow.update({contact:node.value});drafts.WhatsApp=node.value;});
  } else if(channel==='E-mail')slot.append(input('contact','Seu e-mail','email',{autocomplete:'email',inputmode:'email',maxlength:LIMITS.email,placeholder:'voce@exemplo.com.br'}));
 }
 function review() {
  const a=flow.snapshot.answers,rows=[['Nome',a.name],['Perfil',a.profile],['Necessidade ambiental',serviceLabel(a.service)],['Descrição',a.description],['Localização',a.city+' · '+a.state],['Retorno',a.channel+' · '+a.contact]];
  const list=element('dl',{class:'conversation-review'});
  rows.forEach(([label,value],index)=>{const row=element('div',{});row.append(element('dt',{},label),element('dd',{},value));const edit=element('button',{type:'button','aria-label':'Editar '+label.toLowerCase()},'Editar');edit.addEventListener('click',()=>{if(busy)return;flow.edit(index);transition(-1);});row.append(edit);list.append(row);});fields.append(list);
  const notice=element('p',{class:'conversation-privacy',role:'note'},'O envio real depende de um canal seguro de recebimento e de informações de privacidade verificadas. Nesta prévia, nenhuma informação é transmitida.');fields.append(notice);
 }
 function render({focus=true}={}) {
  const {step,answers,editing:edit,progress:value}=flow.snapshot;
  title.removeAttribute('aria-label');title.textContent=questions[step][0];support.textContent=questions[step][1];fields.replaceChildren();error.textContent='';error.id='contact-error';editing.hidden=!edit;
  counter.textContent=step===6?'Revisão':String(step+1).padStart(2,'0')+' / 06';progress.value=value;progressLabel.textContent=value.toLocaleString('pt-BR')+'%';
  progress.setAttribute('aria-valuetext',step===6?'Revisão das informações, preenchimento completo':'Pergunta '+(step+1)+' de 6');
  back.hidden=step===0&&!edit;back.textContent=edit?'Cancelar edição':'Voltar';next.disabled=false;
  next.textContent=step===6?'Enviar solicitação':edit?'Salvar e voltar à revisão':step===5?'Revisar informações':'Continuar';
  if(step===0)fields.append(input('name','Seu nome','text',{autocomplete:'name',maxlength:LIMITS.name,placeholder:'Como você prefere ser chamado?'}));
  if(step===1)fields.append(choices('profile',questions[step][0],PROFILES.map(value=>[value,value])));
  if(step===2)fields.append(choices('service',questions[step][0],[...serviceCards.map(service=>[service.slug,service.title]),['unknown','Não sei ainda']]));
  if(step===3){fields.append(input('description','Sua demanda','text',{multiline:true,maxlength:LIMITS.description,placeholder:'Ex.: preciso compreender quais exigências ambientais se aplicam ao meu empreendimento...'}));fields.append(element('small',{},'Entre 10 e 3.000 caracteres. Não inclua informações sensíveis.'));}
  if(step===4){const row=element('div',{class:'conversation-location'});row.append(input('city','Cidade','text',{autocomplete:'address-level2',maxlength:LIMITS.city,placeholder:'Ex.: Joinville'}));const group=element('div',{class:'conversation-field'});group.append(element('label',{for:'contact-state'},'Estado'));const select=element('select',{id:'contact-state',name:'state',autocomplete:'address-level1','aria-describedby':'contact-error'});select.append(element('option',{value:''},'Selecione'));for(const uf of STATES)select.append(element('option',{value:uf},uf));select.value=answers.state;select.addEventListener('change',()=>{flow.update({state:select.value});select.removeAttribute('aria-invalid');});group.append(select);row.append(group);fields.append(row);}
  if(step===5){fields.append(choices('channel',questions[step][0],[['WhatsApp','WhatsApp'],['E-mail','E-mail']]));renderContactChannel();}
  if(step===6){review();next.disabled=!adapter.enabled;next.setAttribute('aria-describedby','contact-error');if(!adapter.enabled)error.textContent='Envio indisponível nesta prévia de desenvolvimento.';}else next.removeAttribute('aria-describedby');
  if(focus)title.focus({preventScroll:true});animateTitle();
 }
 async function transition(direction=1) {
  if(busy||disposed)return;busy=true;back.disabled=next.disabled=true;stage.setAttribute('aria-busy','true');
  if(!reduced.matches&&stage.animate){try{await stage.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY('+(-direction*9)+'px)'}],{duration:150,easing:'ease-in'}).finished;}catch{}}
  render();
  if(!reduced.matches&&stage.animate)stage.animate([{opacity:0,transform:'translateY('+(direction*12)+'px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'cubic-bezier(.2,.7,.2,1)'});
  stage.setAttribute('aria-busy','false');back.disabled=false;busy=false;
 }
 async function send() {
  if(busy||!adapter.enabled)return;busy=true;next.disabled=back.disabled=true;next.textContent='Enviando…';stage.setAttribute('aria-busy','true');error.textContent='';
  try{
   const result=await adapter.submit(flow.snapshot.answers);
   if(result?.accepted!==true)throw new Error('Não recebemos uma confirmação válida.');
   flow.clear();drafts.WhatsApp=drafts['E-mail']='';fields.replaceChildren();title.removeAttribute('aria-label');title.textContent='Sua solicitação foi recebida.';support.textContent='Obrigado por apresentar sua demanda. As informações serão avaliadas para orientar o próximo contato.';back.hidden=true;next.hidden=true;fields.append(element('a',{href:'../',class:'conversation-home'},'Voltar para o início'));title.focus({preventScroll:true});animateTitle();
  }catch(cause){error.textContent=cause?.code==='INTEGRATION_UNAVAILABLE'?'O envio ainda não está habilitado. Suas respostas foram preservadas.':'Não foi possível confirmar o recebimento. Suas respostas foram preservadas. Tente novamente.';next.disabled=false;back.disabled=false;next.textContent='Tentar novamente';}finally{stage.setAttribute('aria-busy','false');busy=false;}
 }
 next.addEventListener('click',()=>{
  if(busy)return;if(flow.snapshot.step===6){send();return;}
  const result=flow.next();if(!result.ok){error.textContent=Object.values(result.errors).join(' ');for(const name of Object.keys(result.errors))fields.querySelectorAll('[name="'+name+'"]').forEach(node=>node.setAttribute('aria-invalid','true'));fields.querySelector('[aria-invalid="true"]')?.focus();return;}transition(1);
 });
 back.addEventListener('click',()=>{if(busy)return;flow.back();transition(-1);});
 root.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.isComposing&&!event.shiftKey&&event.target.matches('input:not([type=radio])')){event.preventDefault();next.click();}});
 render({focus:false});
 return {flow,destroy(){disposed=true;flow.clear();drafts.WhatsApp=drafts['E-mail']='';fields.replaceChildren();}};
}
const root=document.querySelector('[data-contact-development]');if(root)initConversation(root);
