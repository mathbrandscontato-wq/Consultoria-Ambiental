# Desenvolvimento G5 | Estado real em PR-04

Fundação estática PR-01 e Hero A inicial PR-02 concluídos; PR-04 contém contratos de conteúdo, verificador de release e QA Chrome. Todos os branches são rascunhos. **Sem publicação.**

## Executar
Com Node.js 22 e Chrome/Chromium instalados localmente:
```sh
npm run lint
npm run build
npm test
npm run check
npm run qa:browser
```
Para conferir manualmente, executar servidor HTTP local: `python3 -m http.server 4173 -d dist` e abrir `http://localhost:4173/`. Não expor porta na internet.

## Arquitetura
- `src/site.mjs`, `src/lib/render.mjs`: rotas e HTML estático compartilhado
- `src/lib/hero-a.mjs`, `src/styles/hero-a.css`: Home Hero A, topografia por breakpoint e mídia provisória
- `src/scripts/mobile-menu.mjs`: navegação acessível por teclado
- `src/content/contracts.mjs`: 31 módulos estruturais e sete serviços, ainda não copy final
- `scripts/build.mjs`: saída estática `dist/`; não demanda Node em produção
- `scripts/check.mjs`, `scripts/lint.mjs`, `tests/`: invariantes e testes nativos
- `scripts/qa-browser.mjs`: quatro viewports reais, rotas e recursos HTTP 200, captura de evidências
- `scripts/release-gate.mjs`, `docs/GATES.json`: bloqueio de publicação
- `.github/workflows/ci.yml`: lint/build/testes/Chrome/artefatos, jamais deploy

## Etapas posteriores
A fidelidade visual final depende da comparação de screenshots com G2 V5 e aceite Matheus; demais seções dependem de layout UI aprovado e conteúdo Vic. Logo, fontes e fotografia definitiva ainda não integradas. Ver `docs/CONTENT_GAPS.md`.
