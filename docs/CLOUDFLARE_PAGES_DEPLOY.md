# Ykeizumi | Cloudflare Pages | Procedimento de publicação

Destino EXATO: https://yekeizumi.mathbrands.com.br
GitHub: mathbrandscontato-wq/Consultoria-Ambiental
Estado: NÃO PUBLICADO, release bloqueado até homologação visual e editorial, licença Avenir webfont e canal de contato real.
O usuário autorizou a intenção de publicação, mas conteúdos da Vic, ativos protegidos e infraestrutura ainda exigem verificação.

## Plataforma e arquitetura
Hospedagem: Cloudflare Pages com integração GitHub, exportação estática, sem Node em runtime, D1, R2, Workers ou serviços externos necessários. Node 22 no build. Referências oficiais:
https://developers.cloudflare.com/pages/configuration/git-integration/
https://developers.cloudflare.com/pages/configuration/custom-domains/
https://developers.cloudflare.com/pages/configuration/build-configuration/

## Gates obrigatórios antes do deploy
1. Consolidar em main somente após revisão a cadeia de PRs 1 a 7 (com histórico e testes preservados). Main no estado inicial não contém o aplicativo.
2. Matheus aprova G2 V5 e todas as quatro páginas em 1440, 768, 390, 360; Vic valida os textos, dados profissionais, contatos e serviços.
3. Integrar logotipo oficial autorizado, fotos aprovadas e fonte Avenir com licença webfont válida; não redistribuir TTF proprietário só porque foi enviado ao chat.
4. Ativar contato real validado. Se formulário, implementar backend, anti-spam, aviso de dados e QA real com recebimento confirmado. Nunca publicar simulação de envio.
5. Rodar npm run lint, npm run build, npm test, npm run check, npm run qa:browser; revisar acessibilidade, Lighthouse, links, mídia, overflow, cabeçalhos e erros.
6. Decidir a política pública de indexação; remover noindex somente se aprovado, configurar canonical, sitemap, robots, metadados e privacidade.
7. O arquivo docs/GATES.json deve deixar de ter pendências, e site_publication_allowed somente muda para true com evidências e aceite em PR. check:release hoje falha intencionalmente.
8. Criar registro do SHA de release e plano de rollback.

## Conexão Cloudflare
Solicitar delegação de acesso à conta responsável por mathbrands.com.br, sem pedir senha, chaves ou códigos em chat. Verificar a zona do domínio e se existe registro DNS yekeizumi. Preservar registros MX, SPF, DKIM, domínio principal e outros subdomínios.

No dashboard Cloudflare: Workers & Pages > Create application > Pages > Connect to Git > GitHub. Selecionar mathbrandscontato-wq/Consultoria-Ambiental. Projeto sugerido: yekeizumi-mathbrands (verificar disponibilidade). Root: /. Framework: None. Production branch: main após merge aprovado. Build command: npm run build. Output directory: dist. NODE_VERSION: 22 se necessário. Sem dependências npm externas, não usar instalações desnecessárias.

ATENÇÃO: Cloudflare pode criar URLs públicas de preview por PR. Não ativar previews de branches com conteúdo privado; restringir branch builds e acesso conforme autorização. Somente construir projeto definitivo após os gates.

Após primeiro deployment correto: Pages > Custom domains > Set up a domain > yekeizumi.mathbrands.com.br. Se a zona mathbrands.com.br estiver na conta Cloudflare correta, o wizard geralmente provisiona DNS. Caso DNS externo, configurar CNAME host yekeizumi para o subdomínio *.pages.dev EXATO exibido pelo projeto (nunca inventar). Conferir conflito pré-existente antes de alterar DNS. Confirmar status Active e HTTPS.

Validar em produção: resolução DNS, HTTPS/certificado, GET de /, /servicos/, /sobre/, /contato/, imagens, fontes, JS/CSS, formulário real se existir, links, console, robots, canonical, foco teclado, mobile, privacidade e cache. Em erro, rollback para deployment anterior aprovado. Registrar evidências.

## Grafia
Nome da empresa: Ykeizumi. O usuário solicitou HOST yekeizumi (com e adicional). NÃO trocar por ykeizumi silenciosamente.

## Operação e entrega
Documentar versão, SHA, URL real, configurações utilizadas, limite/custo Cloudflare, responsáveis, treinamento de atualização, rollback e remoção de permissões desnecessárias. Não armazenar credenciais.