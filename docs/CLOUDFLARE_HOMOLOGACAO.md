# Ykeizumi | Homologação estática na Cloudflare Pages

**Decisão — 26/10/2026:** primeiro implementar para aprovação no domínio da Math Brands; WordPress Headless será fase posterior, sem mudar agora o HTML/CSS/JS e componentes existentes.

## Ambiente e comando de build
- Repositório: mathbrandscontato-wq/Consultoria-Ambiental
- Branch isolada: preview/yekeizumi-homologacao, derivada da PR-08; não alterar a main para criar homologação.
- Host exato: **yekeizumi.mathbrands.com.br** (grafia com e extra, solicitada pelo proprietário).
- Projeto Cloudflare Pages separado, sugestão de nome: yekeizumi-homologacao (confirmar disponibilidade real no painel).
- Framework: None; raiz: /; Node: 22; branch de produção do projeto de HOMOLOGAÇÃO: preview/yekeizumi-homologacao.
- Build: npm run build:preview; saída: dist. Sem banco, WP, Workers, Pages Functions ou serviços pagos nesta fase.
- O build gera 5 rotas, robots.txt com Disallow e _headers com X-Robots-Tag noindex, nofollow, noarchive.
- Mantenha a produção institucional separada: docs/GATES.json deve permanecer com site_publication_allowed=false.

## Procedimento (não executado)
1. Acessar a conta Cloudflare responsável por mathbrands.com.br com autorização delegada e MFA. Não pedir senha/token pelo chat.
2. Conferir a zona do domínio, quem opera DNS, eventual hostname yekeizumi já existente e os registros MX/SPF/DKIM. Nenhum registro do domínio raiz deve ser alterado.
3. Workers & Pages > Create > Pages > Connect to Git, selecionar mathbrandscontato-wq/Consultoria-Ambiental. Escolher projeto dedicado e branch preview/yekeizumi-homologacao, comando npm run build:preview, dist e Node 22.
4. Limitar branch builds à branch de homologação; se necessário, desabilitar deploy automático de outros ramos. Não usar o GitHub Actions para publicar nem adicionar token no repositório.
5. Configurar **Cloudflare Access** para o projeto e para seus domínios pages.dev (versão principal e aliases). Criar aplicação Self-hosted and private no Zero Trust para **yekeizumi.mathbrands.com.br**, com allow policy restrita aos e-mails/revisores indicados. Atenção: política para preview deployment não protege automaticamente o custom domain.
6. Após o primeiro deployment, conferir o pages.dev REAL gerado e o status de Access. Depois adicionar o domínio customizado pelo painel Pages > Custom domains e usar o fluxo de DNS assistido. Se precisar de CNAME manual, usar o alvo REAL indicado, jamais inventado. O domínio customizado deve ser protegido por Access, sem lacunas públicas.
7. Verificar TLS/HTTPS e os dois fluxos: usuário sem autorização bloqueado; usuário autorizado consegue navegar em /, /servicos/, /sobre/, /projetos/, /contato/.
8. Conferir meta robots, header X-Robots-Tag e /robots.txt no host real. Estes controles evitam indexação, mas **não substituem autenticação**.
9. Executar QA real nos tamanhos 1440, 768, 390 e 360; focos, links, navegação, imagem editorial, galeria vazia identificada, formulário sem coleta, Avenir com fallback. Registrar screenshots e o commit.
10. Compartilhar a URL somente após Cloudflare Access e o domínio serem verificados, informando que é uma prévia de aprovação.

## Conteúdos conscientemente provisórios
- Marca: identificador visual temporário; assinatura oficial ainda depende de arquivo e autorização.
- Avenir: CSS local-first, sem distribuição de fonte proprietária; diferentes dispositivos usarão fallback até licença webfont.
- Galeria: seis espaços de demonstração, sem projetos reais enviados pela Vic.
- Contato: sem dados confirmados, sem backend, sem formulário e sem sucesso fictício.
- Fotografia ambiental é ilustrativa/temporária e não apresenta obra real.
- Textos permanecem sujeitos a validação profissional pela Vic.

## Rollback e entrega
- Na Pages, deployment prévio da mesma branch deve ser recuperável (antes de substituir, registrar ID e SHA).
- Remover configuração somente do subdomínio dedicado em caso de cancelamento, nunca do domínio principal.
- Relatar project ID real, URL de homologação, SHA, status Access para pages.dev e custom domain, DNS, certificado e evidência de QA.
- Não declarar deployment executado apenas porque o GitHub CI passou.

Documentação oficial:
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/configuration/preview-deployments/
- https://developers.cloudflare.com/pages/platform/known-issues/
- https://developers.cloudflare.com/pages/configuration/headers/
