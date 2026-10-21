# Ykeizumi | Protocolo de segurança pré-publicação

**Nenhuma publicação autorizada.** Nem merge, nem CI verde substituem autorização de G7.

- `npm run check:release` precisa **FALHAR com código 2** durante esta fase, pois `docs/GATES.json` contém pendências e `site_publication_allowed=false`. Nunca remover o bloqueio para deixar CI verde.
- `npm run lint && npm run build && npm test && npm run check && npm run qa:browser` certificam apenas execução técnica de desenvolvimento.
- Não criar workflows Pages, deploy, SSH/SFTP/FTP, infraestrutura, DNS, CMS, APIs pagas, formulários externos ou analytics.
- Antes de G7: validar direitos de marca/fotos/fontes; aprovar todas as rotas e revisão técnica; garantir backend real, spam/erro/privacidade; validar compatibilidade da hospedagem, domínio e HTTPS; obter autorização separada de Vic e Matheus; fazer backup recuperável se houver site existente.
- Em G7, documentação de recebimento no destino real, plano de rollback, testes de links, mídias e rotas, configuração de SEO/canonical/robots definitivos e monitoramento pós-publicação.
- O uso de `noindex,nofollow` no protótipo não autoriza hospedá-lo publicamente nem garante proteção de dados; controle de acesso real será necessário para previews com conteúdos internos.
