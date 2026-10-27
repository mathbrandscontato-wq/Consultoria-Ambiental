/** Development-only. Never routed or included by the production renderer. */
export function renderContactDevelopment() {
 return `<main id="conteudo" class="contact-development" tabindex="-1"><div class="conversation-shell" data-contact-development>
 <p class="conversation-brand">Ykeizumi · Vamos conversar</p>
 <p class="development-notice" role="note">Prévia de desenvolvimento. Não use dados reais. Nenhuma transmissão está habilitada; a integração e a privacidade ainda precisam ser verificadas.</p>
 <div class="conversation-progress"><span data-counter>01 / 06</span><progress max="100" value="0" aria-label="Progresso de preenchimento"></progress><span data-progress-label>0%</span></div>
 <div class="conversation-stage" aria-busy="false"><p class="conversation-editing" data-editing hidden>Editando sua resposta</p><h1 id="contact-question" tabindex="-1"></h1><p class="conversation-support" data-support></p><div data-fields></div><p class="conversation-error" role="alert" data-error></p></div>
 <div class="conversation-navigation"><button type="button" data-back>Voltar</button><button type="button" data-next>Continuar <span aria-hidden="true">→</span></button></div>
 <p class="conversation-memory">Suas respostas ficam apenas nesta aba e são descartadas ao fechá-la. O envio está indisponível nesta prévia.</p>
 <noscript>Esta prévia precisa de JavaScript. Nenhum formulário de coleta está ativo.</noscript>
 </div></main>`;
}
