# Ykeizumi — entrega UX/UI V2

## Implementação

- Mobile: explorador de nove especialidades com disclosures nativos independentes, expansão por âncora, compensação de cabeçalho e CTA contextual. Abasdesktop preservadas; CTA também dentro do menu mobile, sem barra flutuante.
- Desktop: balanceamento de títulos, leitura de parágrafos e largura de colunas; sem alteração dos textos. A pedido posterior da cliente, nome/cargo e retrato daLara formam a coluna esquerda e biografia completa a direita, alinhadas pelo topo. Mobile empilha os mesmos elementos.
- Acessibilidade: foco visível em duas cores, contraste, alvos44px, semântica do apoio do mapa e comportamento com movimento reduzido. Nenhuma declaração automática de conformidade integral.
- Desempenho: lazyloading do mapa abaixo da dobra, preload do poster, includesórfãos removidos, fit do footer evita trabalho repetido e estilos por rota concatenados exatamente na ordem existente. Nenhuma dependência deprodução adicionada.

## Validações

65testes deunidade/contrato, lint de sintaxe, build de4rotas e inspeção estática aprovados. Gate compara CSSbundle byteabyte com as fontes em ordem. Inventário de581fragmentos textuais originais preservado nas quatro páginas.

CI final: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/44345724108

44cenários finais (quatro rotas×320/360/375/390/414/720/768/1024/1280/1440/1920), mais8referências antes, sem falhas. Axe: zero violações nas8auditorias finais390/1440. Toque/teclado/âncoras/menu/mapa/galeria e movimento reduzido aprovados. Evidência bruta: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/44345724108/artifacts/14446905589

PR: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/15

Commit de runtime efetivamente auditado: a3d3ba7c57903b47ed9fb6f667c855cf9feb180d. Commits documentais posteriores não alteram esse runtime. Versão32 permanece como rollback recuperável.

## Performance e limites

Ver [relatório comparativo](UX_V2_PERFORMANCE.md), [métricasJSON](ux-v2/lighthouse-summary.json), [acessibilidade](UX_V2_ACCESSIBILITY.md) e [resultados de navegação](ux-v2/browser-results.json). HTML/JSON completos do Lighthouse e capturas antes/depois acompanham o pacote de evidências.

Accessibility100 emtodos cenários; PerformancefinalmobileHome86/Sobre78/Serviços87/Contato100 e desktop97–100. CLSeTBTzero nessa rodada de laboratório. MetasPerformance90/LCP2.5s não atingidas emtodas páginasmobile. As medições são de runner com servidor estático local, não da latência da hospedagem nem de usuários reais. Uma medição por estado tem variabilidade; a primeira rodada foi preservada separadamente. Nenhum dado deINPp75 disponível: PageSpeedretornou429/cota.

Zoom físico200/400% não confirmado pela superfície; testado reflow320 e largura equivalente720. AdaptadorSanity pré-existente permanece desabilitado e fora do render; formulário mantém indisponibilidade real enquanto depende da contaGoogle daLara. Nada foi ativado ou enviado nesta revisão.

## Arquivos alterados

- `.github/workflows/ykeizumi-ux-v2-audit.yml`
- `docs/CHECKPOINT.md`
- `docs/UX_V2_ACCESSIBILITY.md`
- `docs/UX_V2_FIELD_DATA_ATTEMPT.json`
- `docs/UX_V2_PERFORMANCE.md`
- `docs/UX_V2_RELEASE.md`
- `docs/ux-v2/baseline-content.json`
- `docs/ux-v2/browser-results.json`
- `docs/ux-v2/content-preservation.json`
- `docs/ux-v2/lighthouse-first-run-summary.json`
- `docs/ux-v2/lighthouse-summary.json`
- `scripts/build.mjs`
- `scripts/check.mjs`
- `scripts/ux-v2-audit-server.mjs`
- `scripts/ux-v2-browser-audit.mjs`
- `scripts/ux-v2-lighthouse.mjs`
- `src/lib/hero-a.mjs`
- `src/lib/pages/about.mjs`
- `src/lib/pages/services.mjs`
- `src/lib/render.mjs`
- `src/lib/sections.mjs`
- `src/scripts/footer.mjs`
- `src/scripts/services.mjs`
- `src/scripts/unified.mjs`
- `src/styles/services-mobile.css`
- `src/styles/ux-v2.css`


## Publicação concluída

Publicado em https://ykeizumi.com.br/ como versão 33. Fonte Sites: `1714e4580bdfc5cff1080709ca49b41d58d5eeb9`; deploy `appgdep_6afdd184f5fc81919b295dad361b2bac`, succeeded em 18/11/2026. A versão 32 permanece recuperável.

Conferência ao vivo: Home, Sobre, Serviços e Contato em HTTPS, um H1 por página, sem overflow e com um bundle CSS por rota. O perfil da Lara confirmou duas colunas com o mesmo topo, nome e cargo junto à foto. Mobile 390 px foi conferido antes da publicação com empilhamento e sem overflow. Nenhum campo de envio foi ativado. Evidência: `docs/evidence/ykeizumi-ux-v2-profile-published.jpg`.

Pacote completo de relatórios e capturas: https://chatgpt.com/library?file_id=libfile_09e883026ec08191ba66cdd9f2754737&account_id=personal
