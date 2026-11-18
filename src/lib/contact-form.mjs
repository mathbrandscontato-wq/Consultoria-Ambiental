import { contactDelivery } from '../content/contact-delivery.mjs';
export const contactUnavailable = 'Envio on-line indisponível no momento. Entre em contato por telefone ou e-mail.';
export function renderContactForm(fields, {enabled = contactDelivery.enabled} = {}) {
  if (!enabled) return '<form class="contact-form" aria-describedby="contact-status"><p id="contact-status" role="status">'+contactUnavailable+'</p><fieldset disabled><legend>Conte o seu caso</legend>'+fields+'<button type="button" disabled>Enviar</button></fieldset></form>';
  return '<form class="contact-form" action="'+contactDelivery.endpoint+'" method="POST" enctype="multipart/form-data" aria-describedby="contact-status" data-contact-delivery>'+ 
    '<p id="contact-status" role="status">Sua mensagem será encaminhada para lara@ykeizumi.com.br.</p>'+ 
    '<input type="hidden" name="_subject" value="Nova solicitação pelo site — Ykeizumi">'+
    '<input type="hidden" name="_template" value="table">'+
    '<input type="hidden" name="_url" value="https://ykeizumi.com.br/contato/">'+
    '<div hidden><label>Deixe este campo vazio<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>'+ 
    '<fieldset><legend>Conte o seu caso</legend>'+fields+
    '<p>Os dados e anexos serão processados pelo <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit</a> e enviados à Ykeizumi para responder à sua solicitação. Não inclua senhas ou documentos desnecessários. Anexos: PDF, JPG ou PNG, até 10 MB no total.</p>'+ 
    '<p data-contact-error role="alert"></p><button type="submit">Enviar</button></fieldset></form>';
}
