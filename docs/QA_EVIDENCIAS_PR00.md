# Evidências verificadas | PR-00, 21/10/2026

| Verificação | Procedimento | Resultado |
| --- | --- | --- |
| Integridade do consolidado | `zipfile.testzip()` | PASS: sem arquivo corrompido |
| Manifesto SHA-256 e tamanho | comparar 84 linhas de `SHA256_MANIFEST.csv` com conteúdo real | PASS: 84/84 |
| Correspondência do novo anexo | SHA-256 + comparação integral de bytes com ZIP embutido | PASS: conteúdo idêntico |
| Correção enviada como G2 visual | `verify_g2_v5.py --zip Ykeizumi_G4_Correcao_Vinculo_G2V5_Documentacao(1).zip` | NEGATIVO ESPERADO: status `NOT_VERIFIED`, exit 2; faltam indicadores G2 |
| ZIP G2 ausente | `verify_g2_v5.py --zip arquivo_g2_v5_nao_existe.zip` | NEGATIVO ESPERADO: `NOT_VERIFIED`, exit 2 |
| UI / screenshots / Lighthouse / testes E2E | não há aplicação nem pranchas originais | NÃO EXECUTADOS |
| CI / lint / build de front-end | etapa PR-01 não iniciada | NÃO EXECUTADOS |

O teste negativo impede confundir a documentação com o design. **Nenhum resultado negativo foi classificado como aprovação de projeto.**
Para repetir o teste com o ZIP genuíno: `python scripts/verify_g2_v5.py --zip CAMINHO/DO/Ykeizumi_G2_V5_Pacote_Completo.zip --output docs/G2_V5_VERIFICATION.json`.
O estado máximo produzido pelo script é `INVENTORIED_ONLY`, não homologação visual.

Repositório GitHub: público. Evidências com detalhes de material privado permanecem fora do Git.
