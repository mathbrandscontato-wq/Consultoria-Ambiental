# Ykeizumi Consultoria Ambiental | GitHub First

**Status em 21/10/2026:** código de fundação e primeira implementação do Hero A disponíveis para continuidade técnica, SEM site final homologado ou publicação autorizada.

## Roteiro de revisão
- [PR-00](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/1): fontes, hashes e documentação G2 V5 conferidos
- [PR-01](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/2): arquitetura estática provisória e 4 rotas
- [PR-02](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/3): implementação inicial da Home Hero A
- [PR-04](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/4): handoff, critérios de aceite, QA em navegador, documentação de bloqueios

**As PRs são encadeadas, estão em rascunho e NÃO foram mescladas.** A branch main não contém o site pronto.

## Execução em máquina de desenvolvimento
Node.js 22 e Chrome/Chromium para QA em navegador. Não há dependências npm externas.

```sh
npm run lint
npm run build
npm test
npm run check
npm run qa:browser
```

O build gera `dist/` com `/`, `/servicos/`, `/sobre/`, `/contato/`. Hero A aparece somente na Home; demais rotas permanecem scaffolds técnicos. As capturas estão em `artifacts/qa-browser/` e no artefato do GitHub Actions.

## Aprovações e restrições
- Hero A e Avenir aprovados; Hero B não autorizado. SVGs e medidas reais vinculados em `docs/G2_V5_BINDING.md`.
- H03–H09 e Serviços possuem wireframes, mas não layouts UI finais. Sobre/Contato também carecem arte final aprovada.
- Conteúdo definitivo, contatos da Vic, foto/licença, logotipo oficial e arquivos de fonte estão pendentes.
- Nenhum formulário ativo, backend, hosting, domínio, DNS, CI de deploy, release ou site público.
- O repositório é PÚBLICO: jamais commitar segredos ou materiais privados sem liberação.

**Tipografia:** Avenir configurada com fontes locais quando disponíveis; os arquivos comerciais enviados não foram republicados. Licença de uso web e webfont legalmente distribuível pendentes. Consulte `docs/TYPOGRAPHY_AVENIR.md`.

**Leia primeiro:** `docs/CHECKPOINT.md`, `docs/CODEX_HANDOFF_G5.md`, `docs/GATES.json`, `docs/QA_VISUAL_G2V5.md`.

## Aprovação visual G6 (25/10/2026)
- Matheus aprovou a apresentação das quatro telas da PR-07, solicitando duas alterações: **Sobre: Lara imediatamente após Hero**; **Projetos: galeria de projetos**.
- PR-08 implementa a nova ordem de Sobre e adiciona a rota `/projetos/` e a chamada de galeria na Home, com cards editoriais **claramente vazios** até receber projetos reais autorizados pela Vic.
- O build da branch PR-08 agora gera **cinco rotas** (`/`, `/servicos/`, `/sobre/`, `/projetos/`, `/contato/`), preservando o restante da identidade aprovada.
- Nenhum projeto ou imagem de cliente foi inventado. O bloqueio de release segue ativo enquanto faltarem mídia de projetos, licenciamento Avenir, contatos e homologação editorial.

## Cloudflare Pages — homologação estática (26/10/2026)
Foi escolhida uma prévia do site estático no subdomínio yekeizumi.mathbrands.com.br, antes da migração WordPress Headless. A branch preview/yekeizumi-homologacao é isolada e não modifica main.
Comandos: npm run build:preview e npm run check:preview. Esses comandos geram noindex/robots e verificam a ausência de formulário, mas **não publicam**.
Cloudflare Access é obrigatório no domínio personalizado **e** no pages.dev antes de disponibilizar a prévia. A conta Cloudflare ainda não foi conectada.
Consulte docs/CLOUDFLARE_HOMOLOGACAO.md, docs/PREVIEW_GATES.json e docs/WORDPRESS_FASE_2.md. Produção institucional permanece bloqueada.