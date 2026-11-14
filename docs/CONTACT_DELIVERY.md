# Formulário de contato — integração preparada

Destino solicitado: lara@ykeizumi.com.br. Serviço proposto: FormSubmit, sem credenciais expostas e sem novas dependências.

## Estado atual
Integração implementada, porém `contactDelivery.enabled=false`. O site não transmite dados. A revisão automática bloqueou a tentativa de teste por falta de autorização explícita para compartilhar os endereços com FormSubmit. Não houve resposta de confirmação/entrega. Não tentar por outro canal sem autorização.

## Comportamento preparado
- POST nativo HTTPS para https://formsubmit.co/lara@ykeizumi.com.br, multipart/form-data.
- Campos originais: nome, empresa, e-mail, telefone, serviço, município, descrição e anexos opcionais.
- Destinatária fixa no código; o visitante não pode substituir o destino.
- Honeypot e reCAPTCHA padrão do serviço, sem desativar antispam.
- PDF/JPG/PNG; limite de 10 MB total validado no navegador. O provedor deve também aplicar seus limites.
- Aviso de processamento por FormSubmit e encaminhamento à Ykeizumi, com link para privacidade do provedor.
- Sem registro local, resposta automática, redirecionamento com mensagem de sucesso ou prazo fictício. O serviço apresenta seus próprios estados de ativação, erro e envio.

## Próximos passos necessários
1. Matheus autoriza uso do FormSubmit para os dados/anexos e envio do teste técnico, incluindo a destinatária e o e-mail comercial do remetente Math Brands.
2. Solicitar ativação com dados de teste identificados. A Lara confirma o link recebido em sua caixa; essa confirmação é indispensável segundo o provedor.
3. Verificar entrega de nova mensagem de teste na caixa da Lara; só depois alterar `src/content/contact-delivery.mjs` para `enabled:true`, construir, validar e publicar no mesmo Site.
4. Testar campos obrigatórios, anexos válidos/limites, cancelamento, erro do provedor e envio real; não declarar funcionamento apenas com sucesso HTTP.

Documentação consultada: https://formsubmit.co/documentation e https://formsubmit.co/help . O serviço informa retenção de submissões por30dias, sem retenção de anexos no arquivo da API; avaliar essa condição antes da ativação.
