# Formulário de contato — integração preparada

Destino solicitado: lara@ykeizumi.com.br. Serviço proposto: FormSubmit, sem credenciais expostas e sem novas dependências.

## Estado atual
Integração implementada, porém `contactDelivery.enabled=false`. O site não transmite dados.

A autorização para FormSubmit e teste foi concedida após a primeira rejeição automática. A tentativa subsequente foi bloqueada pelo próprio serviço com Cloudflare 1010 / browser_signature_banned, não recuperável automaticamente; não houve ativação ou entrega confirmada. Não contornar esse bloqueio por outro cliente ou canal automatizado.

Em 18/11/2026, Matheus pediu expressamente para retomar a configuração e enviar para Lara. Foi enviado, pelo Gmail comercial de Matheus, um pedido à Lara para participar da confirmação e do teste de recebimento. O envio dessa mensagem de coordenação foi confirmado como SENT; isso não é um teste do formulário nem um disparo de ativação do FormSubmit. Aguarda-se participação da Lara para concluir a validação.

Para FormSubmit, não é necessário acesso à caixa Google da Lara: ela pode confirmar no próprio e-mail. A conta Google conectada nesta sessão pertence a Matheus. Não solicitar senha ou acesso amplo à caixa da cliente.

## Comportamento preparado
- POST nativo HTTPS para https://formsubmit.co/lara@ykeizumi.com.br, multipart/form-data.
- Campos originais: nome, empresa, e-mail, telefone, serviço, município, descrição e anexos opcionais.
- Destinatária fixa no código; o visitante não pode substituir o destino.
- Honeypot e reCAPTCHA padrão do serviço, sem desativar antispam.
- PDF/JPG/PNG; limite de 10 MB total validado no navegador. O provedor deve também aplicar seus limites.
- Aviso de processamento por FormSubmit e encaminhamento à Ykeizumi, com link para privacidade do provedor.
- Sem registro local, resposta automática, redirecionamento com mensagem de sucesso ou prazo fictício. O serviço apresenta seus próprios estados de ativação, erro e envio.

## Próximos passos necessários
1. Autorização de Matheus já concedida para a integração e o teste técnico; não solicitar novamente a mesma autorização. Resolver a etapa de validação com participação humana, sem contornar o bloqueio do provedor.
2. Solicitar ativação com dados de teste identificados. A Lara confirma o link recebido em sua caixa; essa confirmação é indispensável segundo o provedor.
3. Verificar entrega de nova mensagem de teste na caixa da Lara; só depois alterar `src/content/contact-delivery.mjs` para `enabled:true`, construir, validar e publicar no mesmo Site.
4. Testar campos obrigatórios, anexos válidos/limites, cancelamento, erro do provedor e envio real; não declarar funcionamento apenas com sucesso HTTP.

Documentação consultada: https://formsubmit.co/documentation e https://formsubmit.co/help . O serviço informa retenção de submissões por30dias, sem retenção de anexos no arquivo da API; avaliar essa condição antes da ativação.


## 18/11/2026 — Liberação expressa para teste humano no site
Matheus pediu campos e botão habilitados na página pública de contato para fazer o primeiro envio no próprio navegador. contactDelivery.enabled=true, verification=pending. POST nativo para a destinatária fixa, antispam e limites de anexos preservados. Aviso público informa que a ativação e a entrega não foram confirmadas. Não foi realizado novo POST automatizado ao provedor nem enviado outro e-mail de coordenação. A validação agora depende do envio manual, da confirmação da Lara no e-mail do FormSubmit e de um segundo teste de recebimento.
