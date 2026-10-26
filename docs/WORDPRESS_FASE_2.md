# Ykeizumi | Fase 2 — WordPress Headless (DEPOIS DA HOMOLOGAÇÃO)

## Decisão
O site continuará estático na Cloudflare Pages até a aprovação visual, editorial e operacional. Não criar WordPress, novos serviços pagos, banco ou API nesta fase.

## Migração sem reconstrução do design
1. Preservar as cinco rotas atuais, tokens, Hero A, responsividade, componentes e CSS/JS após homologação.
2. Hospedar WordPress em ambiente separado compatível com PHP + MySQL/MariaDB, com HTTPS e backup. Não instalar PHP na Cloudflare Pages.
3. Criar tipos de conteúdo para Projetos e Serviços e campos editáveis de páginas, descrições, imagens, alt, status, ordem, direitos/créditos. Só publicar conteúdos com validação técnica.
4. Usar WordPress REST API como origem de dados durante a compilação estática (build-time). Planejar autenticação de build e bloqueio de drafts/privados.
5. Adaptar o gerador Node para carregar arquivos JSON do WP durante o build e produzir o mesmo HTML estático. Manter fallback para último snapshot válido quando CMS estiver indisponível.
6. Após salvar/publicar conteúdo no WordPress, acionar build no GitHub/Cloudflare por webhook autenticado, com verificação de origem, rate limit e logs. Evitar enviar segredos ao browser.
7. Testar caminhos antigos, SEO e mídias; não alterar layouts aprovados. O WordPress não atende requisições dos visitantes, apenas o processo de geração.
8. Validar plano de manutenção simples para a Vic: cadastrar projeto, salvar como rascunho, revisar, publicar, verificar versão gerada.

## Decisões que ficam pendentes
- Hospedagem do CMS, orçamento, privacidade e política de backups.
- Entrega de projetos reais e conteúdo aprovado pela Vic.
- Formulário: backend real com destinatário e fluxo LGPD, independente da migração.
- Escopo de edição pela Vic e treinamento operacional.

**Critério:** WordPress é uma evolução de gestão de conteúdo, não uma autorização para redesenho ou migração obrigatória de frontend.