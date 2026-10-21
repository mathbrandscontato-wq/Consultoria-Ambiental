# Evidências e aceite | PR-01

**Tipo:** protótipo técnico de baixo risco, sem implementação do Hero A.

## Gates
- PR-00: mantém-se draft, documentação parcial até localizar os arquivos G2 V5 originais.
- ADR-001: autorização verbal "Pode seguir pra proxima etapa" interpretada **apenas como aceite para preparar a fundação reversível**, não como decisão de stack/deploy final.
- PR-01: branch empilhada sobre PR-00, alvo do PR é `docs/pr-00-consolidacao-g4`. Nada mesclado.
- PR-02: **bloqueada** pelo pacote G2 V5 ausente e por aprovação de visuais adaptados.

## Checklist de automação
| Verificação | Comando | Estado |
| --- | --- | --- |
| Sintaxe JavaScript e zero dependências | `npm run lint` | A confirmar em execução |
| Geração `dist/` | `npm run build` | A confirmar em execução |
| Testes nativos | `npm test` | A confirmar em execução |
| Rotas, semântica e formulários inativos | `npm run check` | A confirmar em execução |
| GitHub Actions | validação automática ao abrir PR | A confirmar por run |
| Fidelidade G2 V5 e screenshots 1440/390/768/360 | não iniciar sem design | **NÃO EXECUTADO** |
| Lighthouse e testes de navegador | PR-02 | **NÃO EXECUTADO** |

Não atribuir PASS a nenhuma linha antes de coletar saída observável. Este documento registra critérios e deve ser atualizado com evidências de CI.
