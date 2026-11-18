export function attachmentError(files) {
  if ([...files].some(file => !/\.(pdf|jpe?g|png)$/i.test(file.name))) return 'Use anexos em PDF, JPG ou PNG.';
  if ([...files].reduce((total,file) => total+file.size,0) > 10*1024*1024) return 'Os anexos devem somar no máximo 10 MB.';
  return '';
}
// Only confirms that a native provider tab was requested, never delivery.
export function createDeliveryFeedback({busy,message,schedule=setTimeout,cancel=clearTimeout}) {
  let waiting=false,timer;
  return {
    begin(){
      if(waiting)return false;
      waiting=true;busy(true);
      message('Conclua a verificação na aba do FormSubmit. O recebimento ainda não está confirmado.');
      timer=schedule(()=>{waiting=false;busy(false);message('O recebimento ainda não foi confirmado. Se o FormSubmit ficou carregando ou a outra aba não abriu, use o aplicativo de e-mail abaixo. Seus dados continuam neste formulário.');},15000);
      return true;
    },
    reset(){cancel(timer);waiting=false;busy(false);}
  };
}
export function contactEmailHref(values,files=[]) {
  const labels={name:'Nome',company:'Empresa ou instituição',email:'E-mail',phone:'Telefone / WhatsApp',service:'Tipo de serviço',city:'Município',description:'Descrição do caso'};
  const parts=Object.entries(labels).map(([key,label])=>label+': '+(values[key]||'').trim());
  if(files.length)parts.push('Arquivos a anexar manualmente: '+[...files].map(file=>file.name).join(', '));
  return 'mailto:lara@ykeizumi.com.br?subject='+encodeURIComponent('Solicitação pelo site — Ykeizumi')+'&body='+encodeURIComponent(parts.join('\n\n'));
}
if (typeof document !== 'undefined') {
  const form=document.querySelector('[data-contact-delivery]');
  if(form){
    const input=form.querySelector('[name="attachment"]'),error=form.querySelector('[data-contact-error]');
    const button=form.querySelector('button[type="submit"]'),progress=form.querySelector('[data-contact-progress]');
    const feedback=createDeliveryFeedback({busy:value=>{button.disabled=value;button.textContent=value?'Abrindo envio…':'Enviar';},message:value=>{progress.textContent=value;}});
    const validate=()=>{const message=attachmentError(input.files);input.setCustomValidity(message);error.textContent=message;return !message;};
    input.addEventListener('change',validate);
    form.addEventListener('submit',event=>{
      if(!validate()){event.preventDefault();input.reportValidity();return;}
      if(!feedback.begin())event.preventDefault();
      // Native POST in a separate tab preserves provider CAPTCHA and the original answers.
    });
    form.querySelector('[data-contact-email]').addEventListener('click',event=>{
      if(!validate()||!form.reportValidity()){event.preventDefault();return;}
      const values=Object.fromEntries(['name','company','email','phone','service','city','description'].map(key=>[key,form.elements.namedItem(key).value]));
      values.service=form.elements.namedItem('service').selectedOptions[0].textContent;
      event.currentTarget.href=contactEmailHref(values,input.files);
      feedback.reset();progress.textContent='A mensagem será aberta no seu aplicativo de e-mail. Confira os dados, anexe os arquivos se necessário e envie por lá.';
    });
    addEventListener('pageshow',()=>feedback.reset());
  }
}
