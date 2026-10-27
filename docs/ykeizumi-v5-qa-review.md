# Ykeizumi — revisão de QA V5

Data: 27/10/2026. Referência: prompt mestre V5 anexado por Matheus. Baseline informado para esta rodada: `1d838a0`. Este registro cobre inspeção de código e testes Node do candidato local, sem declarar execução de navegador ou publicação.

## Escopo verificado

- Cinco rotas existentes e um H1 semântico em cada página.
- Política de homologação `noindex,nofollow` preservada.
- Heros internos fotográficos com texto antes da mídia, um único CTA de contato e sem expansão fullscreen/tunnel no primeiro bloco.
- Seis seções de Sobre; Perspective Tunnel somente no bloco 02 `#lara-yumi`.
- Nome Lara Yumi, retrato original e referência regional disponíveis no HTML sem depender do controlador de animação.
- Rodapés sem `href="#"`, links vazios ou protocolos ativos; ícones sem URL oficial continuam elementos sem navegação, sem perfis inventados.
- Rolagem nativa do tunnel, reversão do estado ao voltar, reduced motion e encerramento do loop quando estável.
- Lightbox: teclado, foco, overflow, modificadores de clique e gestos de swipe.

## Testes significativos adicionados

Arquivo `tests/v5.test.mjs`:

1. Rotas, H1, link de pular conteúdo e noindex.
2. Contrato dos heros fotográficos internos: texto, mídia e CTA único.
3. Localização exclusiva do tunnel e integridade da seção Lara.
4. Ausência de links mortos/fictícios no footer.
5. Execução isolada do controlador do tunnel com DOM mínimo: progresso, reversão, loop finito e listener de scroll passivo sem wheel/touch interceptado.
6. Execução isolada com reduced motion: sem aprimoramento espacial nem quadros de animação; fallback estático.
7. Execução isolada da lightbox: navegação por teclado, foco inicial/restaurado, preservação do overflow anterior e clique com modificador.
8. Swipe: captura do ponteiro correto, distinção horizontal/vertical, cancelamento e invalidação do gesto após fechamento.

Os testes de execução isolada usam `node:vm` e substitutos mínimos de DOM. São verificações do comportamento JavaScript, não uma simulação completa do navegador nem comprovação de operação física de touch, Escape nativo ou leitor de tela.

## Adequação do QA legado

`tests/foundation.test.mjs` e `tests/editorial-pages.test.mjs` exigiam a frase provisória “Conteúdo e composição em revisão”. A V5 autoriza limpeza editorial. A dependência dessa frase foi substituída por requisitos verificáveis: footer com identificação institucional e copyright, navegação Institucional e noindex preservado.

`scripts/check.mjs` passou a verificar identificação, copyright, navegação institucional e ausência de links de rodapé vazios ou fictícios, preservando os demais checks de noindex, rotas, estilos e ausência de envio simulado. `npm run check` passou sobre o build integrado.

`scripts/qa-browser.mjs` também deixou de exigir a palavra “revisão” no footer; passa a verificar identificação institucional, noindex e ausência de destinos vazios ou `#`. Sintaxe validada com `node --check`. O script não foi executado nesta revisão; continua destinado ao ambiente CI aprovado.

## Inspeção da lightbox

O swipe foi revisto após correção do agente integrador. O código usa captura de ponteiro, corresponde o `pointerId`, rejeita gesto predominantemente vertical e limpa o estado em `pointercancel` e fechamento. Os testes Node acima passaram. O backdrop e Escape dependem da semântica nativa de `dialog`; essa parte exige teste em navegador.

## Limitações e verificações a concluir no release

- Ainda não foi executado Chrome/CDP local nesta rodada, por delimitação do fluxo de trabalho. A revisão visual e funcional de navegador fica com o integrador via CUA; CI poderá executar `qa:browser` no GitHub.
- Testes Node não medem LCP, CLS, INP, Lighthouse, contraste computado ou conformidade integral WCAG.
- No tunnel mobile, a altura mínima de 780px do stage pode ultrapassar viewports baixos. Inspecionar em orientação horizontal/viewport curto para verificar leitura e continuidade da rolagem. Trata-se de ponto de inspeção, não falha visual comprovada.
- O funcionamento de toque físico, pinch zoom, teclado virtual e leitores de tela precisa de ambiente correspondente.
- Nenhum commit, push, merge, deploy ou alteração de acesso foi executado por este agente.

## Resultado desta revisão

Após integração dos heros internos: `node --test tests/v5.test.mjs tests/editorial-pages.test.mjs` concluiu **12 testes aprovados / 0 falhas** (8 invariantes V5 + 4 contratos editoriais).

`node --test tests/foundation.test.mjs` concluiu **4 testes aprovados / 0 falhas**, usando os arquivos já presentes em `dist` (não foi executado novo build por este agente). O release precisa repetir o conjunto completo após seu build final.

`node --check scripts/qa-browser.mjs` e `node --check tests/foundation.test.mjs`: sintaxe aprovada. Nenhuma declaração de browser QA, produção ou métricas de performance é derivada desses resultados.
