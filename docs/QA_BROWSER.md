# QA em navegador real | Ykeizumi | 21/10/2026

Runner: `scripts/qa-browser.mjs` (Node.js 22 + Chrome/Chromium, sem dependências npm). Executar `npm run build` e `npm run qa:browser`.

## Escopo automatizado
- Capturas exatas das primeiras dobras em **1440×900, 390×860, 768×870 e 360×780**: `viewport-{largura}.png`.
- Captura completa: `home-{largura}.png`.
- Verificações: Home carregada, H1 único, CTA visível sem clipping, sem overflow horizontal, `noindex,nofollow`, formulário ausente, topografia específica de cada viewport, fechamento de menu mobile com `Esc` e foco devolvido ao gatilho.
- HTTP 200 nas 4 rotas e nos recursos CSS/JavaScript; nenhum serviço externo obrigatório.
- Os resultados ficam em `artifacts/qa-browser/results.json`, e o workflow anexa capturas como artefato de QA.

## Última prova observada antes de nova documentação
GitHub Actions [#39698365141](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39698365141), commit `5460af1`: sucesso no Chrome e testes estruturais. As mudanças de copy e documentação posteriores exigem nova execução do CI no head final da PR.

## Limites
PASS de navegador **não** equivale à fidelidade pixel-perfect, nem WCAG completo, Lighthouse, validação de direitos, formulário real, copy Vic ou aprovação visual Matheus. Consulte `docs/QA_VISUAL_G2V5.md` para divergências e responsabilidades.
