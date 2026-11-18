import { contactDelivery } from '../content/contact-delivery.mjs';
export const contactUnavailable = 'Envio on-line indisponível no momento. Entre em contato por telefone ou e-mail.';
export function renderContactForm(fields, {enabled = contactDelivery.enabled} = {}) {
  if (!enabled) return '<form class="contact-form" aria-describedby="contact-status"><p id="contact-status" role="status">'+contactUnavailable+'</p><fieldset disabled><legend>Conte o seu caso</legend>'+fields+'<button type="button" disabled>Enviar</button></fieldset></form>';
  return '<form class="contact-form" action="'+contactDelivery.endpoint+'" method="POST" enctype="multipart/form-data" target="_blank" rel="noopener" aria-describedby="contact-status" data-contact-delivery>'+
    '<p id="contact-status" role="status">Formulário em ativação: o primeiro envio solicita a confirmação de lara@ykeizumi.com.br. O recebimento das mensagens ainda depende dessa confirmação e de um teste de entrega.</p>'+
    '<input type="hidden" name="_subject" value="Nova solicitação pelo site — Ykeizumi">'+
    '<input type="hidden" name="_template" value="table">'+
    '<input type="hidden" name="_url" value="https://ykeizumi.com.br/contato/">'+
    '<div hidden><label>Deixe este campo vazio<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>'+
    '<fieldset><legend>Conte o seu caso</legend>'+fields+
    '<p>Os dados e anexos serão processados pelo <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit</a> e enviados à Ykeizumi para responder à sua solicitação. Não inclua senhas ou documentos desnecessários. Anexos: PDF, JPG ou PNG, até 10 MB no total.</p>'+
    '<p data-contact-error role="alert"></p><p data-contact-progress role="status" aria-live="polite"></p>'+
    '<p>O envio abre o FormSubmit em outra aba para concluir a verificação antispam. Seus dados permanecem nesta página.</p>'+
    '<div class="contact-submit-actions"><button type="submit">Enviar</button><a class="minimal-link" data-contact-email href="mailto:lara@ykeizumi.com.br">Enviar pelo aplicativo de e-mail</a></div>'+
    '<p class="contact-email-note">Se o FormSubmit não responder, use a alternativa de e-mail. Ela abre uma mensagem com os dados preenchidos; os arquivos devem ser anexados manualmente no seu aplicativo.</p></fieldset></form>';
}
