# PROMPT PRONTO PARA CODEX / IA OPERADORA

Atue como engenheiro sênior Full Stack, UX QA, DevOps e responsável por publicar o site Ykeizumi com GitHub First.

DESTINO exato: https://yekeizumi.mathbrands.com.br
Repositório: mathbrandscontato-wq/Consultoria-Ambiental
Referência: feat/pr-07-complete-pages-cloudflare-ready (PR-07), posteriormente main apenas após merges e homologação.
Hospedagem: Cloudflare Pages via integração nativa GitHub, Node 22 no build, comando npm run build, diretório dist, branch de produção main.

1. Ler AGENTS.md, docs/CHECKPOINT.md, docs/GATES.json, docs/G2_V5_BINDING.md, docs/TYPOGRAPHY_AVENIR.md, docs/G6_VISUAL_REVIEW.md e docs/CLOUDFLARE_PAGES_DEPLOY.md. Preservar o Hero A e não copiar identidade Soltera ou SureGuard. Avenir substituiu Inter, mas licença webfont ainda está pendente.
2. Não interpretar telas G6 de revisão como aprovadas. Matheus aprova todas as quatro páginas 1440/768/390/360 e a Vic aprova conteúdo, dados profissionais, fotografia, canais e escopo. Cases e FAQ só com autorização. Nada de promessas ou credenciais não confirmadas.
3. Integrar logo verdadeiro e ativos com direitos verificados; não publicar TTF proprietário sem licença comercial de webfont. Não deixar o site com placeholder ou dependência de fontes não licenciadas em produção.
4. Validar os sete serviços do V1.2, a jornada Contato e a política de dados. Só ativar formulário após backend real, destinatário aprovado, anti-spam, QA de erro e entrega real. Se nenhum canal funcionar, bloquear lançamento em vez de publicar contato morto.
5. Rodar npm run lint, npm run build, npm test, npm run check e npm run qa:browser. Corrigir falhas, verificar navegação e layout, métricas de carregamento, SEO, screenshots nos quatro viewports. Não declarar QA sem evidências.
6. Atualizar docs/GATES.json e liberar check:release exclusivamente depois de todos os critérios e aprovações comprovados. Preparar tag SHA e backup recuperável. Nunca burlar os gates para deixar deploy verde.
7. Com Cloudflare delegada via login seguro/MFA, conectar repositório GitHub a Pages. Configurar main, npm run build, dist, Node 22. Não criar Workers/D1/R2, API paga ou banco sem requisito.
8. Configurar Custom domain yekeizumi.mathbrands.com.br e validar se o registro yekeizumi está livre no DNS mathbrands.com.br. Usar o domínio *.pages.dev REAL retornado no projeto como CNAME caso DNS externo. Não inventar nome ou mexer no domínio raiz e registros de email.
9. Confirmar HTTPS, 4 rotas, arquivos, contatos e mensagens, robots/indexação, privacidade, console, browser mobile, rollback. Se algo falhar, cancelar release/rollback.
10. Entregar URL verificada, PR/commit, evidência de QA e documentação de custo, atualização e rollback. Não dizer que publicou até verificação real.

REGRAS: sem segredos em texto, repo ou chat. site_publication_allowed=false significa BLOQUEADO. Não mesclar nem publicar sem gate concluído, apesar da intenção de publicação já autorizada pelo usuário.
## Atualização de 25/10/2026
Use a PR-08 `feat/pr-08-sobre-lara-galeria-projetos` como referência mais recente. A direção criativa aprovou as telas anteriores, solicitando Lara imediatamente após o Hero em Sobre e uma galeria de Projetos. O site possui **cinco rotas**, incluindo `/projetos/`. Não tratar placeholders da galeria como trabalhos concluídos nem publicar cases sem autorização individual. Validar as cinco rotas na Cloudflare somente após a liberação dos gates.
