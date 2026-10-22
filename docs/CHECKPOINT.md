# YKEIZUMI | CHECKPOINT OPERACIONAL | 21/10/2026

**Etapa atual:** G5, prontidão para continuação da implementação controlada; **não é site final, nem publicação**. Repositório público `mathbrandscontato-wq/Consultoria-Ambiental`.

## Histórico GitHub First confirmado
- PR #1 G4 documentação: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/1
- PR #2 fundação estática: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/2
- PR #3 Hero A inicial: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/3
- PR #4 prontidão de implementação e QA: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/4
- **Todas abertas em DRAFT, não mescladas. Main não é o aplicativo. Nenhum deploy.**

## Decisões e fontes
- Hero A definitivamente aprovado; Hero B proibido; **Avenir agora aprovada**, substituindo a antiga escolha Inter.
- Handoff original SHA256 `abd38454f26166b460d64df863bd97f01b4e7301e0dd4f92bfe05ff2ebe63113`, manifesto 23/23.
- G2 V5 aninhado SHA256 `4968b1a66fbcd37b972dc3372cbdae1922eea81cf6d72173ed8954d2fffc95b1`, manifesto 50/50. Referências 1440/390/768/360 versionadas como hashes/caminhos em `docs/G2_V5_BINDING.md`, sem divulgar os arquivos internos.
- G4/Brandbook V2/Planejamento Estrutural V1.2 documentados. Cores oficiais e token semântico no código.

## Implementado no código do branch da PR #4
- 4 rotas estáticas; Home com composição Hero A inicial e contornos topográficos individualizados para quatro viewports; copy provisória. Header/menu/CTA navegáveis.
- Serviços, Sobre e Contato: apenas scaffold técnico, NÃO páginas finais; nenhum formulário ativo.
- Contratos de 31 módulos e 7 grupos de serviços, estados condicionais H08/S10.
- Zero dependências npm externas, CI sem deploy, release-gate bloqueado por padrão.

## QA observado
- CI anterior [#39698365141](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39698365141): lint, build, 11 testes, HTTP 200 em 4 rotas + 4 assets, 1440/390/768/360 Chrome sem overflow, screenshots em artefato. PASS técnico.
- Revisão lado a lado com as pranchas: correspondência estrutural melhorada; topografia redesenhada a partir de parâmetros G2; **aprovação visual final NÃO emitida**.
- Modificações de texto e documentação posteriores a esse CI exigem comprovação de nova execução para o head final.

## Pendências que impedem site final/G6/G7
1. Logo oficial e arquivos da fonte Inter integrados mediante verificação de licença/publicação no repo público.
2. Fotografia com licença, origem, enquadramento e crédito, sem insinuar projeto executado.
3. Homologação visual Matheus no Hero final e designs das demais seções Home/Serviços/Sobre/Contato.
4. Validação Vic para textos, experiência/credenciais de Lara, canais de contato e grupos de serviços.
5. Decisão sobre cases reais H08 e FAQ S10, backend/destinatário/política de privacidade; sem simular envio.
6. Compatibilidade da hospedagem e autorização específica de produção, **fora do escopo atual**.

## Próxima execução
Ler este checkpoint, `docs/CODEX_HANDOFF_G5.md`, `docs/QA_VISUAL_G2V5.md`, `docs/GATES.json` e apenas diff da PR. Rodar `npm run lint && npm run build && npm test && npm run check && npm run qa:browser`; comparar 4 screenshots com referências. Não abrir PR de publicação, não mesclar sem autorização. Decisões visuais novas ou conteúdo não confirmado → revisão com Matheus/Vic.

## PR-05 (21/10/2026) | Refinamento editorial
- Branch `feat/pr-05-refinamento-hero-editorial` baseada na PR-04, revisão em rascunho.
- Fotografia aérea provisória com licença Unsplash documentada; crédito ao fotógrafo e aviso explícito de não representar projeto executado. URL remota de preview não aprovada para produção.
- Tratamento de profundidade, contraste, recorte mobile, microinterações reversíveis e fonte Inter via stylesheet oficial opcional; auto-hospedagem ainda pendente.
- Mantidas apenas as rotas, Hero A, hierarquia e conteúdo de revisão aprovados; sem implementar seções posteriores ou alterar domínio/hospedagem.
- Executar GitHub Actions no commit final antes de declarar testes aprovados; capturas devem ser revisadas em 1440/768/390/360 por Matheus.

## Evidências do primeiro CI PR-05
- [Actions #39701526155](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39701526155), SHA `40aa5354b97f7cd159963b7d374483caaa60ec8e`: **SUCCESS**, 12/12 testes, 4/4 Chrome, HTTP 200 nas 8 URLs; 4/4 fotos renderizadas em navegador, crédito visível no DOM.
- Screenshots completos + por viewport no [artefato #12393170768](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39701526155/artifacts/12393170768).
- Alterações documentais posteriores exigem CI no head da PR. Nenhum merge, deploy, alteração DNS/host, backend ou formulário.
- A fotografia e a Inter continuam vinculadas a serviços externos no **ambiente de revisão**; auto-hospedagem e autorização visual continuam gates para G6/G7.

## PR-06 — Mudança tipográfica solicitada (21/10/2026)
- Avenir Light, Book, Regular, Medium, Heavy, Black fornecidas no arquivo `avenir.zip`, íntegro. Metadados declaram propriedade da Monotype e o ZIP não contém licença que permita distribuir webfont.
- CSS define Avenir por pesos usando `local()` e fallback de sistema, sem subir arquivos de fonte comerciais ao GitHub público. Stylesheet externo Inter removido em todas as rotas.
- `src/content/contracts.mjs` e testes atualizados para `fontFamily=Avenir`.
- Testes em Chrome Linux medem responsividade com fallback se Avenir não estiver instalada: não representam homologação com arquivos comerciais carregados. Bloqueio para licença webfont e reflow real permanece em `docs/GATES.json`.
- Não fazer merge ou deploy. Nenhuma mudança na identidade oficial/logotipo, nas fotos ou na infraestrutura.
