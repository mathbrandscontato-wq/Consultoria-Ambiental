# Evidências e aceite | PR-01

**Tipo:** protótipo técnico de baixo risco, sem implementação do Hero A.

## Gates
- PR-00: permanece draft; o pacote G2 V5 foi localizado e verificado depois, em 21/10/2026 (50/50), ver `docs/QA_EVIDENCIAS_PR00.md`.
- ADR-001: autorização verbal "Pode seguir pra proxima etapa" interpretada **apenas como aceite para preparar a fundação reversível**, não como decisão de stack/deploy final.
- PR-01: branch empilhada sobre PR-00, alvo do PR é `docs/pr-00-consolidacao-g4`. Nada mesclado.
- **Registro histórico da PR-01:** PR-02 posteriormente iniciada com Hero A autorizado. No estado atual, ela também permanece em draft e sem deploy.

## Checklist de automação
| Verificação | Comando | Estado |
| --- | --- | --- |
| Sintaxe JavaScript e zero dependências | `npm run lint` | **PASS no GitHub Actions #39686722009** |
| Geração `dist/` | `npm run build` | **PASS no GitHub Actions #39686722009** |
| Testes nativos | `npm test` | **PASS no GitHub Actions #39686722009** |
| Rotas, semântica e formulários inativos | `npm run check` | **PASS no GitHub Actions #39686722009** |
| GitHub Actions | validação automática ao abrir PR | **PASS, execução concluída em 21/10/2026** |
| Fidelidade G2 V5 e screenshots 1440/390/768/360 | não iniciar sem design | **NÃO EXECUTADO** |
| Lighthouse e testes de navegador | PR-02 | **NÃO EXECUTADO** |

## Evidência observada
- Commit verificado: `ff85528af14a76d36ff0306755474fff8e81e657`.
- [GitHub Actions #39686722009](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39686722009): `completed`, `success`.
- Logs: lint de sintaxe em 6 módulos, **zero dependências**; build de **4 rotas**; Node Test Runner: **4 testes, 4 aprovados, 0 falhas**; inspeção estrutural de 4 rotas aprovada.
- Esta evidência antecede a atualização apenas documental das linhas de relatório e checkpoint; nova execução do CI deve validar o head final da PR.

**Nota cronológica:** este arquivo descreve exclusivamente a PR-01; teste real de navegador só foi introduzido depois na PR-04. Nenhum deploy foi realizado.
