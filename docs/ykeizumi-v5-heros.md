# Heros e header — V5

A Home permanece com vídeo e composição aprovada. O CTA usa `heroCta` de `hero-a.mjs`, agora também no header interno: mesma classe ha-cta--top e estrutura hover-dot/hover-label/hover-reveal. Não é um segundo estilo de botão.

Sobre, Serviços e Projetos usam `editorialHero` compartilhado: duas colunas aproximadamente55/45, gap responsivo, fotografia existente em caixa retangular com object-fit cover; nenhum degradê, máscara ou título sobre a foto no desktop. Retirado scroll-expand do hero, pois alteraria a delimitação aprovada. H1 e descrição mantidos; a revisão SEO pode refinar descrições sem reconstruir layout.

No mobile o header tem logo e hambúrguer em uma linha, sem CTA externo no estado fechado. O botão de proposta aparece uma única vez dentro do hero, ancorado na parte inferior da foto. Ordem semântica: título, apoio, fotografia e botão. Legenda ilustrativa discreta no topo da foto mobile para não colidir com o CTA. As imagens usadas são paisagens existentes, sem rostos a cobrir. No desktop esse CTA do hero fica oculto; mantém-se o CTA no header.

Contato público não tem fotografia nem integração de envio. Mantém o hero existente e recebe apenas a padronização do header. O fluxo progressivo de desenvolvimento não é incluído no build.

Arquivos: src/lib/components.mjs, src/lib/render.mjs (header e imports), src/styles/v5-editorial.css, scripts/build.mjs. Sem novas dependências.

Validação visual, responsividade e publicação estão consolidadas em ykeizumi-v5-release.md. Esta documentação não afirma equivalência pixel a pixel nem teste sem execução.
