# Evidências | PR-00 (21/10/2026)

## Insumos (verificados por conteúdo, SHA-256 e ZIP testzip)
| Pacote | Integridade | Interpretação |
| --- | --- | --- |
| Consolidado G2/G4 anterior | PASS 84/84 | Só documentação G4/Brandbook/Planejamento; não era o G2 visual |
| Correção documental G4 | PASS e byte a byte idêntico | Não era o ZIP de design |
| Handoff GitHub First `(1).zip` | **PASS 23/23** | Contém as fontes originais |
| ZIP visual G2 V5 aninhado | **PASS 50/50** | Hero A e B, Home/Serviços, Projetos e estudos 360/768 |
| ZIP do Kit de Marca | ZIP legível, 76 entradas | Não publicado no repositório público |

- Principais pranchas Hero A: `05_Hero_A_1440.svg`, `06_Hero_A_390.svg`, `Hero_A_768.svg`, `Hero_A_360.svg`; todas identificadas por hash em `G2_V5_BINDING.md`.
- Briefing e handoff originais de 19/10 trazem estado criativo anterior. Instruções do diretor criativo de 21/10 aprovam Hero A e Inter.
- **Ainda não é QA de website:** PNGs são protótipos gráficos. Navegação real, teclados, imagens licenciadas, performance, browser 1440/390/768/360 requerem execução futura.
- Repositório público: apenas manifesto e documentação saneada; não foram copiadas imagens, PDFs internos, retratos, ZIPs de referência ou segredos.

## Testes que não ocorreram na PR-00
Build de website, Lighthouse, screenshots do navegador e testes de formulário pertencem às PRs posteriores. Não declarar aprovação visual da implementação até comparar efetivamente com a prancha.
