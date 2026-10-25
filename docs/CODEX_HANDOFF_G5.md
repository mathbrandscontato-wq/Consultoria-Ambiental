# YKEIZUMI | HANDOFF G5 | GITHUB FIRST | 21/10/2026

**Situação:** projeto pronto para continuidade controlada da implementação no GitHub; **não pronto para publicação e não homologado visualmente**. A PR-03 reúne contratos, testes de navegador e bloqueios que evitam tratar protótipo como produto final.

## Instrução curta para Codex / engenharia
Trabalhe em `mathbrandscontato-wq/Consultoria-Ambiental`. Primeiro leia `docs/CHECKPOINT.md`, `docs/GATES.json`, `docs/G2_V5_BINDING.md`, `docs/DESIGN_SPEC_G2V5_HERO_A.md`, `docs/COMPONENT_BLUEPRINT.md` e o diff da PR corrente. **Não** reaudite os 50/50 hashes do G2 V5 nem os 23/23 do handoff, salvo alteração efetiva nos arquivos de origem.

Cadeia de PRs: PR-00 (G4 documental) → PR-01 (G5 estático) → PR-02 (Hero A) → PR-03 (prontidão/QA). Sem merge, sem deploy. Para continuar, crie branch derivada do último checkpoint aprovado e PR em rascunho com base na PR imediatamente anterior. CI não pode publicar.

## Decisões não negociáveis
- **Hero A** único aprovado; sem Hero B. **Avenir substitui Inter na UI** por decisão superveniente da PR-06. A licença webfont ainda precisa de verificação; preservar wordmark oficial sem recriação.
- Cores oficiais: #1E3B2D, #7F9962, #F8F6F2, #2F3133. Variações de profundidade presentes na prancha podem ser propostas e verificadas, não reinterpretadas livremente.
- Hero 1440/390 e adaptações 768/360: SVGs de origem e hashes em `docs/G2_V5_BINDING.md`. Não publicar os SVGs e fotos de referência neste repositório público sem direito/liberação.
- Página Serviços e módulos Home além de H02: wireframes estruturais **não são layout UI final aprovado**. Sobre e Contato não têm design final. Necessitam revisão visual do diretor criativo.
- Sete grupos SRV-01 a SRV-07 (ver `src/content/contracts.mjs`); SRV-04 é assistência técnica, sem patrocínio jurídico.
- H08 cases e S10 FAQ condicionais. Não exibir cases inventados nem construir rota extra sem aceite.
- CTA "Solicitar proposta" leva a `/contato`; protótipo de formulário não pode enviar, coletar dados nem simular confirmação.
- Sem runtime contínuo, CMS, dashboard, trackers, banco, hospedagem, domínio/DNS ou serviços externos obrigatórios antes de aprovação.

## Ordem de execução recomendada
1. Validar as telas em Chrome local (Node22 + Chrome): `npm run lint && npm run build && npm test && npm run check && npm run qa:browser`.
2. Revisar capturas locais `artifacts/qa-browser/home-{1440,390,768,360}.png` contra os SVGs/PNGs aprovados guardados fora do repo. Corrigir transbordamentos, hierarquia e alinhamento com evidência.
3. Substituir o **placeholder** por logo oficial somente depois da autorização de sua distribuição ou mudança controlada para repo privado. Usar assinatura oficial como imagem, largura mínima 120px, sem redesenhar lettering.
4. Carregar Avenir webfont somente com licença de distribuição comprovada, respeitando os seis pesos fornecidos e sem publicar TTF proprietário. Medir reflow e CLS.
5. Selecionar fotografia ambiental provisória com licença verificável; documentar fonte, direitos, crédito, finalidade, prazo de substituição; jamais apresentar como projeto da Ykeizumi.
6. Propor as adaptações e telas de Home restante, Serviços, Sobre e Contato para aprovação, preservando wireframes e conteúdo. **Não instalar a implementação visual final antes do aceite**.
7. Validar texto e credenciais com Vic/revisor técnico; aprovar contatos/campos e destino antes de formular backend e privacidade.
8. Só realizar o gate G6 com evidências reais; G7 publicação exige autorização separada, compatibilidade comprovada e checklist de ambiente.

## Arquivos de acompanhamento
- `docs/GATES.json`: estados verificáveis (release bloqueado).
- `scripts/release-gate.mjs`: `npm run check:release` deve retornar saída **2** enquanto existir bloqueio.
- `src/content/contracts.mjs`: módulos/serviços, sem criar copy publicada.
- `docs/COMPONENT_BLUEPRINT.md`: mapa componente→fonte→ações→estados.
- `docs/CONTENT_GAPS.md`: lacunas por responsável.
- `docs/QA_BROWSER.md`: prova de execução e limites de assertivas automáticas.
- `docs/CHECKPOINT.md`: ponto de continuidade; atualizar a cada PR.

**Definição de pronto para implementar:** repositório e arquitetura reversível existentes, fontes verificadas, código modular e critérios de aceite versionados. **Definição de pronto para publicar:** completamente diferente e ainda NÃO atingida.

## Atualização de continuidade (21/10/2026)
As pranchas G2 V5 reais foram recuperadas; a PR-04 agora possui quatro capturas de viewport em Chrome, mapas de rotas e topografia programática diferenciada por breakpoint. O próximo engenheiro deve consultar `docs/QA_VISUAL_G2V5.md` e executar o CI na cabeça da PR antes de reabrir trabalhos visuais. NÃO alterar a identidade aprovada nem declarar o site completo só porque o CI passou.

## Decisão de 25/10/2026 — prevalece sobre G6 anterior
Matheus aprovou visualmente as telas existentes com duas exceções: Sobre deve iniciar o conteúdo com **Lara Yumi após o Hero**; Projetos deve ser uma **galeria visual**, implementada em PR-08 como rota `/projetos/` e chamada em Home. Não redesenhar o restante. Slots são placeholders transparentes até Vic fornecer projetos reais aprovados. A nova arquitetura passa a cinco rotas, e o Cloudflare runbook deve considerar a rota extra. Site segue não publicado.
