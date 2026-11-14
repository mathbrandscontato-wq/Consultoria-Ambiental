export function attachmentError(files) {
  if ([...files].some(file => !/\.(pdf|jpe?g|png)$/i.test(file.name))) return 'Use anexos em PDF, JPG ou PNG.';
  if ([...files].reduce((total,file) => total+file.size,0) > 10*1024*1024) return 'Os anexos devem somar no máximo 10 MB.';
  return '';
}
if (typeof document !== 'undefined') {
  const form=document.querySelector('[data-contact-delivery]');
  if(form){
    const input=form.querySelector('[name="attachment"]');
    const error=form.querySelector('[data-contact-error]');
    const validate=()=>{const message=attachmentError(input.files);input.setCustomValidity(message);error.textContent=message;return !message;};
    input.addEventListener('change',validate);
    form.addEventListener('submit',event=>{
      if(!validate()){event.preventDefault();input.reportValidity();return;}
      // Native POST preserves reCAPTCHA and service-side error/activation pages.
      // Never synthesize success or claim that an email reached the inbox.
    });
  }
}
