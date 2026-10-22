# Ykeizumi | Regras para agentes e engenharia

1. Preserve o G2 V5 REAL, verificado 50/50 hashes, e seu **Hero A aprovado**. Hero B é proibido. Leia `docs/G2_V5_BINDING.md` e `docs/CHECKPOINT.md` antes do diff.
2. **Avenir substitui Inter** para textos do site, por decisão atual do diretor criativo. Configuração local por pesos, sem redistribuição dos TTF proprietários. Exibição universal depende de licença webfont Monotype. Preservar assinatura oficial da marca sem redesenhar lettering.
3. Brandbook V2: #1E3B2D, #7F9962, #F8F6F2, #2F3133. Hero A tem variações de composição medidas para 1440/390/768/360.
4. Planejamento Estrutural V1.2 para arquitetura e serviços SRV-01 a SRV-07; dados e claims técnicos dependem de aprovação Vic.
5. Não assumir que wireframe de Home/Serviços ou estudo de Projetos sejam UI final homologada. Sobre e Contato carecem telas finais.
6. Repositório PÚBLICO: não incluir arquivos privados, senhas, fotos sem licença, dados pessoais ou kit interno sem autorização.
7. GitHub First: PR-00 → PR-01 → PR-02 → PR-04; evitar reauditorias sem diff material; novas mudanças em branch/PR revisáveis.
8. Atualizar `docs/CHECKPOINT.md` ao fim de cada execução com testes efetivamente observados e bloqueios. Não declarar pixel-perfect sem revisão humana.
9. Testes: `npm run lint`, `npm run build`, `npm test`, `npm run check`, `npm run qa:browser`. QA cobre 1440/390/768/360; comparar captures com referências, não apenas PASS estrutural.
10. Nunca criar release, deploy, GitHub Pages, domínio, DNS, hosting ou backend não aprovado. `npm run check:release` DEVE falhar enquanto o gate estiver fechado.
11. Formulário não pode registrar coleta nem sucesso fictício. Só integrar após aprovar backend/destinatário, política de dados e estados de erro.
12. Animações relevantes, redesenho e novos elementos visuais exigem aprovação Matheus; adaptações pequenas e reversíveis seguem pranchas aprovadas.
