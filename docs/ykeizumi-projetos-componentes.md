# Ykeizumi — Projetos / Atlas Ambiental

Implementação nativa para a arquitetura estática existente, sem React, CMS ou novas dependências. Direção autorizada: prompt mestre integrado recebido em 27/10/2026, seção 11.

## Arquitetura entregue

1. Hero editorial: H1 e texto especificados; fotografia montanhosa ilustrativa e `scroll-expand` compartilhado.
2. Introdução institucional: conteúdo especificado e `data-scroll-reveal` vinculado à rolagem pelo controlador compartilhado.
3. Acervo real: estado vazio editorial, separado do Atlas, enquanto não houver registros publicáveis.
4. Atlas visual: seis fotografias aprovadas, layout masonry por colunas (3 desktop / 2 tablet / 1 mobile), títulos e identificação de imagem ilustrativa.
5. Contextos de atuação: links reais para `/servicos/#s01`, `#s02` e `#s03`, usando descrições do registro único.
6. CTA institucional compartilhado, destino `/contato/` preservado.

## Componentes e rastreabilidade

| ID | Referência solicitada | Implementação | Fidelidade / limite |
| --- | --- | --- | --- |
| P01 | [Split Text](https://reactbits.dev/text-animations/split-text) | Controlador global existente de palavras com Web Animations | Adaptação técnica; não código React original. |
| P02 | [Scroll Expand](https://reactbits.dev/animations/scroll-expand) | Classe `scroll-expand` na fotografia da Hero; controlador global | Integração compartilhada; QA de progresso/reversão cabe ao release. |
| P03 | [Scroll Reveal](https://reactbits.dev/text-animations/scroll-reveal) | H2 da introdução com `data-scroll-reveal` | Adaptação técnica scroll-linked compartilhada. |
| P04 | [Animated Content](https://reactbits.dev/animations/animated-content) | Estado vazio com `data-reveal` | Adaptação técnica nativa; conteúdo permanece presente sem JS. |
| P05 | [Masonry](https://reactbits.dev/components/masonry) | CSS multicolumn responsivo, alturas editoriais variadas e ordem DOM preservada | Adaptação técnica do mosaico; não usa medição nem dependências da versão React. |
| P06 | Lightbox acessível existente | Âncoras de imagens locais mantêm o contrato `.project-image-link`, `.project-card`, `.project-card__footer` | Reutilização da implementação `dialog` existente, com controles e teclado; QA pelo release. |
| P07 | [Fade Content](https://reactbits.dev/animations/fade-content) | Introdução/links com `data-reveal`; seta de hover discreta | Adaptação técnica, independente de hover no toque. |
| P08 | [CTA01](https://21st.dev/@shadcnspace/components/cta-01) | `ctaBanner` compartilhado, conteúdo específico de Projetos | Adaptação técnica à marca e à stack existente. |

As URLs acima são as referências fornecidas no prompt, não uma declaração de cópia de código ou obtenção de Copy prompt. Nenhum código de terceiros foi incorporado nestes módulos. Disponibilidade atual de referências e licenças deverá constar do registro central de pesquisa.

## Contrato dos projetos reais

Arquivo: `src/content/project-registry.mjs`.

- Fonte persistente continua `approvedProjects`, em `src/content/projects.mjs`; atualmente vazia.
- Condições cumulativas: `status === 'publicado'`, `autorizacaoPublicacao === true`, identificadores válidos, título, resumo e imagem autorizada em caminho local de mídia.
- Validação de limites editoriais, ano, serviços `s01`–`s07`, galeria e campos opcionais.
- Localização exige `autorizacaoLocalizacao === true`, além da autorização geral.
- Registros repetidos por ID ou slug não são duplicados.
- URLs de mídia com protocolos externos, `javascript:`, querystrings, SVG ou traversal são rejeitadas.
- Conteúdos textuais renderizados recebem escape HTML.
- Links de detalhe não são inferidos nem criados sem rota real.
- Fotos ilustrativas nunca são promovidas a projetos.

## Verificação observada

`node --test tests/project-registry.test.mjs`: **4 testes aprovados, 0 falhas**.

Cobertura: ausência de consentimento e status correto; dados incompletos; duplicidade; protocolos perigosos e traversal; autorização de localização; seis seções e seis fotografias ilustrativas; ausência de cards reais fictícios; links corretos para serviços.

Build integrado, testes de navegador, responsividade visual, animações e lightbox serão registrados no documento de release pelo agente responsável pela integração. Não foram declarados como executados nesta entrega isolada.


Atualização de pesquisa: páginas públicas oficiais recuperadas pela pesquisa web após falha do TinyFish; descrições e diferenças consolidadas em `ykeizumi-reference-research.md`. Código completo/Copy prompt/licença original não importados.
