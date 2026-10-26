# Ykeizumi | Checkpoint de homologação | 26/10/2026

- Etapa: G6.5 — preparar prévia estática protegida no domínio da Math Brands.
- Branch: preview/yekeizumi-homologacao, criada a partir da PR-08, preservando o site atual e main.
- Escopo: as cinco rotas (/ /servicos/ /sobre/ /projetos/ /contato/), Hero A, Avenir local-first, Lara primeiro em Sobre, galeria ilustrativa vazia.
- Build: npm run build:preview; teste: npm run check:preview; QA: npm run qa:browser. Nenhum deploy é disparado por esses scripts.
- GitHub e evidência técnica: conferir CI da PR de homologação antes de registrar como aprovado.
- Cloudflare: **não conectada**; Pages, Access, DNS, TLS e hostname não verificados, portanto NÃO informar URL como publicada.
- Requisito de acesso: Cloudflare Access no custom domain e também no *.pages.dev; meta robots e headers não equivalem a acesso restrito.
- Produção final: docs/GATES.json site_publication_allowed=false, sem mesclar as PRs anteriores automaticamente.
- Decisão WordPress Headless: Fase 2, após homologação. Ver docs/WORDPRESS_FASE_2.md.
- Pendente para versão pública institucional: aprovação Vic de conteúdo/contato/projetos, licença Avenir webfont, logo final e QA pós-publicação.

Próximo passo: CI no GitHub, depois acesso seguro à conta Cloudflare para configurar um projeto Pages separado de homologação, registrar URL real, validar domínio e controle de acesso.