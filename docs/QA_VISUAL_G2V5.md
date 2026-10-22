# QA visual comparativo | G2 V5 × PR-04 | 21/10/2026

## Metodologia
Capturas reais Chrome de 1440×900, 390×860, 768×870 e 360×780 comparadas com os PNGs/SVGs de estudo do G2 V5. Referências originais preservadas fora do GitHub público; comparativos não são aprovação de distribuição. CI técnico PASS ≠ homologação da direção de arte.

| Largura | Resultado técnico verificado | Correspondência visual observada | Pendência |
|---|---|---|---|
| 1440 | carregamento/links/CTA, sem overflow | estrutura verde, título monumental, hierarquia, campo de mídia, cartão Joinville e topografia aproximados à prancha | logo não oficial, Inter como fallback, fotografia e microajustes de recorte/traço |
| 390 | menu/CTA e dimensionamento sem overflow | posição do H1, segunda chamada, foto provisória e CTA próximos; texto provisório atualizado para a versão do estudo mobile | logo, fonte real, foto, revisão de espaçamentos/contraste |
| 768 | adaptação específica e CTA horizontal | hierarquia, bloco topográfico e CTA horizontal semelhantes ao estudo tablet | logo, fonte real, campo fotográfico final, aprovação de proporções |
| 360 | título e CTA dentro da viewport | layout compacto, topografia e módulo de CTA alinhados em composição | logo, fonte real, microdiferença de marcador de fotografia, revisão visual |

## Resultado
**Pronto para continuação da implementação no GitHub** com fontes, matriz, código modular, checkpoints e automações verificáveis. **NÃO homologado como site final**. Não inferir texto definitivo, logotipo autorizado, foto licenciada, aceite G6 ou autorização G7.

## Evidências
- Fonte: `Ykeizumi_G2_V5_Pacote_Completo.zip`, SHA `4968b1a66fbcd37b972dc3372cbdae1922eea81cf6d72173ed8954d2fffc95b1`.
- Primeira execução após revisão topo/rotas: [GitHub Actions #39698365141](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39698365141) (success), artefato de viewport anexado ao run.
- Comparativos de quatro viewports produzidos localmente para revisão. Não foram inseridos no repositório público.

## Aceite exigido antes de avançar a telas não aprovadas
Matheus valida equivalência visual e adaptações; Vic valida textos, serviço, contato, logo e uso de imagens. Somente então novos componentes além de H02 podem ser implementados como UI final. A homologação requer QA de navegação, contraste WCAG com ferramentas e inspeção manual, imagens, performance Lighthouse, formulário real com backend e erros, e política de dados.

## PR-05 — atualização de refinamento (revisão pendente)
- Hero com fotografia aérea ilustrativa Unsplash e contraste protegido por gradientes; versão G2 V5, sem alterar estrutura aprovada.
- Topografia vetorial preservada nas versões 1440/768/390/360; navegação e CTA com feedback de hover/reduced motion.
- Inter ativada via CSS oficial somente no preview, sob licença OFL; assets autohospedados ainda pendentes.
- **Não presumir aumento da nota sem screenshots reais e reavaliação de Matheus.** As demais telas seguem dependentes de aprovação visual.
