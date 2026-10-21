# QA real em navegador | 1440 / 390 / 768 / 360px

Ferramenta: `scripts/qa-browser.mjs` (Node 22, Chrome/Chromium, sem pacote npm).

```sh
npm run build
npm run qa:browser
```

O script abre a Home no Chrome headless com viewport real, verifica título, CTA, destino, ausência de form ativo e overflow horizontal, gera screenshots e verifica fechamento do menu por Escape. Falha se o navegador não estiver disponível.

Artefatos locais: `artifacts/qa-browser/home-1440.png`, `home-390.png`, `home-768.png`, `home-360.png`, `results.json`. GitHub Actions também anexa evidências (sem publicar website). Depois comparar manualmente cada imagem com o SVG/PNG G2 V5 mantido fora do repositório público. Registrar valores de margem, tipografia, imagem, topografia, CTA e sobreposição antes de declarar fidelidade.

**Limites:** screenshots por si só não são um diff visual aprovado; E2E headless não substitui leitor de tela, WCAG manual, validação editorial, permissão de fotografias, Lighthouse ou aprovação de Matheus.
