# Ykeizumi UX/UI V2 — desempenho e verificação

## Estados de comparação

- Antes: publicação32, fonte Sites `fd0e04732ca31a840dd578423856311309b9b703`; espelho GitHub de mesmo runtime `a1c37a8f82292a6173e35a323bfb00fe9644100f`.
- Depois: commit exato da cabeça da PR do refinamento V2, registrado em `CANDIDATE_SHA` no workflow.
- O workflow não publica nem modifica DNS. A publicação continua pelo Sites existente.

## Medição executável e limitações

`.github/workflows/ykeizumi-ux-v2-audit.yml` executa oito comparações Lighthouse: Home, Sobre, Serviços e Contato, cada uma em mobile e desktop simulados. Cada job constrói os dois estados e usa o mesmo servidor estático local, ambiente e versão da ferramenta. São preservados HTML e JSON completos dos relatórios e `summary.json` com pontuações, FCP, LCP, TBT, CLS, Speed Index, versão e configuração.

Esses valores serão dados de laboratório do runner GitHub, não medição do TTFB da hospedagem ou experiência real dos usuários. Uma execução por estado não representa distribuição estatística. Os valores e a variabilidade precisam ser lidos dos artefatos concluídos; este documento não inventa pontuações. Lighthouse não mede INP de campo.

Ferramentas isoladas, sem dependências adicionadas ao site: Lighthouse13.6.0; Playwright1.65.1; @axe-core/playwright4.14.0 (versões verificadas no registro npm nesta execução). Chrome do runner Ubuntu.

## Acessibilidade e QA automatizados

O job de navegador gera snapshots antes/depois em390/1440 e resultados axe com tags WCAG2/2.1/2.2 A/AA. A candidata é também inspecionada em320/360/375/390/414/720/768/1024/1280/1440/1920 nas quatro páginas. Verifica overflow, H1 único, IDs duplicados, erros JavaScript e imagens que concluíram com erro. Verifica links internos e IDs de destino. Fluxos: nove acordeões com toque e recolhimento, Enter/Space, deep link#s09, desktopEnd/Home e menuEscape.

720CSSpx é uma verificação complementar da largura de layout efetiva de1440 a200%;320 verifica reflow estreito. Não é prova de zoom físico do browser. Teste manual do navegador e revisão visual continuam necessários. Axe pode marcar casos para revisão manual, especialmente texto sobre imagens, vídeo e efeitos. Não se afirma conformidade WCAG integral.

## Achados no código e otimizações

1. O mapa geográfico SVG tem2.250.675bytes e a variante mobile1.176.020bytes. O thumbnail e o mapa fora da primeira tela não tinham lazyloading, podendo disputar tráfego antes de o visitante chegar à seção. Foram encaminhados ao responsável pela Home para carregamento lazy sem trocar a imagem/mapa.
2. A hero mantém vídeo2.425.547bytesdesktop/662.076bytesmobile e poster WebP. O poster já era fetchpriorityhigh; adicionado preload da mesma URL para descoberta imediata. Não foi aplicado lazy ao LCP nem removido o vídeo.
3. A revisão da cliente removeu o túnel da página Sobre, mas a página ainda requisitava `about-tunnel.mjs`(2.998bytes) e `about-tunnel.css`. Retirados somente esses includes comprovadamente sem componente correspondente; fontes históricas preservadas.
4. O footer recalculava a tipografia escrevendo100px, medindo e ajustando de novo quando ResizeObserver disparava por mudança de altura, mesmo sem largura nova. Fit agora ignora a mesma largura e força nova medição apenas ao resolver as fontes; assinatura e efeitos preservados.
5. Fontes Avenir continuam local-first, sem downloads externos ou redistribuição de arquivos proprietários. A aparência em dispositivos sem Avenir usa o fallback existente, igualmente nos dois estados do laboratório.

## CMS e contato — estado real preservado

A camada Sanity existe em `src/lib/sanity-content.mjs`, está desabilitada por padrão e não é chamada pelo build/render atual. Não há integração dinâmica no site exportado que possa ser validada como funcional nesta auditoria. Nenhum mapeamento do CMS foi ligado ou substituído. Os testes existentes do adaptador continuam sendo testes de contrato, não confirmação de conteúdo publicado chegando ao site.

Contato continua desabilitado, aguardando autorização/acesso da contaGoogle da Lara e integração real. Não foi enviado teste nem simulada confirmação de entrega nesta revisão.

## Artefatos esperados

- `artifacts/ux-v2/lighthouse/<rota>-<dispositivo>/before.report.{html,json}`
- `artifacts/ux-v2/lighthouse/<rota>-<dispositivo>/after.report.{html,json}`
- `artifacts/ux-v2/lighthouse/<rota>-<dispositivo>/summary.json`
- `artifacts/ux-v2/browser/*-axe.json`, capturasPNG e `results.json`.
- `docs/UX_V2_FIELD_DATA_ATTEMPT.json`: resultado real da tentativa PageSpeed Insights para disponibilidade de campo.

## Referências técnicas

- https://web.dev/articles/vitals
- https://developer.chrome.com/docs/lighthouse/performance/performance-scoring
- https://developer.chrome.com/docs/lighthouse/overview
- https://github.com/dequelabs/axe-core

## Resultados observados até o handoff

Sintaxe dos quatro novos scripts validada com `node --check`. O processo local não executou Chrome, Playwright, Lighthouse ou axe. As ferramentas de navegador locais permanecem sob controle CUA do responsável. O resultado dos jobs remotos e as métricas finais serão adicionados pelo responsável após execução, sem inferir sucesso a partir da presença do workflow.
