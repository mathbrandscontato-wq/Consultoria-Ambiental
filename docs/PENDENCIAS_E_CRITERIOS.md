# Matriz de pendências e gates | 21/10/2026

| ID | Pendência | Responsável | Gate |
| --- | --- | --- | --- |
| P01 | **CONCLUÍDO EM 21/10:** G2 V5 localizado no handoff, 50/50 hashes corretos, Hero A 1440/390/768/360 vinculado | Math Brands | PR-00 |
| P02 | **CONCLUÍDO EM 21/10:** Handoff original localizado, 23/23 hashes corretos; decisões 21/10 prevalecem sobre os estados históricos do documento de 19/10 | Math Brands | PR-00 |
| P03 | **CONCLUÍDO PARA PR-01:** ADR-001 autorizada para arquitetura estática reversível; stack/deploy definitivos pendentes | Matheus / engenharia | PR-01 |
| P04 | Autorizar privacidade/armazenamento de assets internos, pois repo atual é público | Matheus / Vic | importação de assets |
| P05 | Confirmar dados oficiais, conteúdo institucional e claims profissionais com Vic | Vic | UI editorial / publicação |
| P06 | Definir backend, destinatário e política de tratamento de dados antes do formulário real | Vic / engenharia | envio / publicação |
| P07 | Verificar foto provisória escolhida, fonte, licença, crédito e enquadramento | Math Brands | PR-02 |
| P08 | Confirmar hospedagem real e compatibilidade antes da stack/deploy definitivos; sem alterar ambiente neste ciclo | Vic / engenharia | deploy |
| P09 | Confirmar cases reais/autorizados e necessidade de páginas extras | Vic | módulo de cases |
| P10 | Verificar adaptações, contraste, performance, redução de movimento e overflow em 1440/390/768/360 | engenharia / Matheus | QA PR-02 |
| P11 | Revisar visuais adicionais/novas animações de impacto antes de incorporar | Matheus | PR-02 |
| P12 | Autorizar publicação em etapa própria, jamais derivar autorização de merge | Vic / Matheus | produção |

## Critérios de saída
**PR-00:** inventário das fontes, hashes, decisão Hero A + Inter, pendências, ADR proposta e checkpoint versionados. **P01 e P02 concluídos**, referências agora vinculadas por caminho e hash; revisão editorial, fotografia e desenho de Sobre/Contato ainda pendentes.

**PR-01:** autorização da ADR-001 documentada; depois scaffold, tokens e componentes comparáveis, testes e CI. Nada iniciado neste ciclo.

**PR-02:** PR-01 aceito e fonte G2 V5 real **agora vinculada** por nome/hash à rota e ao viewport; screenshots lado a lado, QA executado com evidências, correções de fidelidade.

**Produção:** autorização específica posterior; não executar neste ciclo.
