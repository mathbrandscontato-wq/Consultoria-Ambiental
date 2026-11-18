# Contato — diagnóstico de POST e anexos, 18/11/2026

## Evidências e limites

- Cliente informou que Lara ativou o formulário. A configuração registra ativação informada pela cliente, com entrega real ainda não validada.
- Captura enviada pelo cliente exibe “Form should POST”. Essa tela não mostra o método HTTP da requisição original, nem comprova onde houve eventual redirecionamento.
- Código publicado anterior já tinha method=POST, enctype=multipart/form-data e endpoint sem barra final. Não havia _next nem JavaScript navegando para a URL do provedor por GET. Portanto, não se atribui a causa apenas à ausência do atributo POST.
- Documentação do FormSubmit informa que esse aviso pode ocorrer mesmo com POST correto e que anexos de submissões anteriores à ativação não são preservados. Fontes: https://formsubmit.co/help e https://formsubmit.co/documentation .

## Correção de compatibilidade

O botão também define formmethod=POST, formenctype=multipart/form-data e formaction canônica. Quando vários arquivos são selecionados, o evento nativo formdata envia cada arquivo em campo distinto (attachment, attachment_2 etc.), mantendo nome e bytes. Seletor vazio não produz anexo vazio. Limite total10MB, formatos, CAPTCHA, campos e destino foram mantidos. Não foi introduzido AJAX nem removido antispam.

Instruções de ativação pendente retiradas da interface, pois a cliente informou a confirmação. Isso não equivale a comprovar o recebimento do e-mail ou dos anexos. Alternativa mailto continua exigindo anexação manual no aplicativo, com aviso explícito.

## Validação

71 testes locais aprovados, incluindo serialização multipart de dois arquivos e verificação byte a byte. Novo teste remoto Chromium/WebKit usa o HTML de produção com apenas o destino trocado por servidor isolado de captura. Inspeciona o POST nativo entre duas origens locais, zero/um/três arquivos, hash de cada conteúdo e preservação das respostas, em desktop e mobile simulado. Não acessa o FormSubmit nem envia e-mails. Resultado dessa execução será registrado após conclusão.

A origem exata do erro apresentado pelo serviço e a entrega de ponta a ponta permanecem sem confirmação.
