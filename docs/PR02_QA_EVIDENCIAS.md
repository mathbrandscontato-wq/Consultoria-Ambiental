# PR-02 | Evidências verificadas

Estado: CI PASS; QA visual de navegador NÃO EXECUTADO / NÃO HOMOLOGADO.

## Integridade das fontes
- Handoff `Ykeizumi_Handoff_Codex_GitHub_First(1).zip`: SHA-256 `abd38454f26166b460d64df863bd97f01b4e7301e0dd4f92bfe05ff2ebe63113`; manifesto PASS 23/23.
- ZIP interno G2 V5: SHA-256 `4968b1a66fbcd37b972dc3372cbdae1922eea81cf6d72173ed8954d2fffc95b1`; manifesto PASS 50/50.
- Referências 1440/390/768/360 vinculadas a `docs/G2_V5_BINDING.md` com hashes originais.

## CI observada
- [GitHub Actions #39688934366](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39688934366), commit `a3717e2a116db8b38f3518bb02b996d910ac26b9`, conclusão **success**.
- Lint de sintaxe em **9 módulos** sem dependências externas: PASS.
- Exportação estática de **4 rotas**: PASS.
- Node Test Runner: **7 testes; 7 passaram, 0 falharam**.
- Checagem estrutural de rota, acesso ao CTA, `noindex`, landmarks e nenhuma simulação de envio: PASS.

## Não executado / não aprovado
- Screenshots reais de browser e diferenças de pixels em 1440/390/768/360.
- Testes com leitor de tela, foco em todos os estados, Lighthouse LCP/CLS/INP e testes com usuários.
- Liberação dos assets de marca no repo público, incorporação da fonte Inter local e foto/licença/crédito.
- Aprovação por Matheus da fidelidade CSS real, e aprovação pela Vic dos textos.
- Publicação, deploy, hospedagem, DNS, integração de formulário.

**Observação:** a CI não comprova fidelidade visual nem responsividade real; não utilizar este relatório como aceite de G6.
