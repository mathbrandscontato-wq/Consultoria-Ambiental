# Serviços — catálogo técnico editorial

## Escopo implementado

Cinco seções em `/servicos/`: Hero editorial, explorador de sete serviços, cinco contextos de navegação, três etapas editoriais e CTA final. A nomenclatura e descrições vêm exclusivamente de `src/content/services.mjs`, compartilhável entre as páginas.

| ID | Referência | Implementação | Fidelidade / limites |
| --- | --- | --- | --- |
| V01 | [Split Text](https://reactbits.dev/text-animations/split-text) | Sistema de títulos compartilhado do projeto | Adaptação técnica nativa; integração pelo módulo global de motion. |
| V02 | [Animated Content](https://reactbits.dev/animations/animated-content) | Hero com mídia dimensionada e introdução editorial | Adaptação técnica nativa; mídia não apresenta registro de serviço executado. |
| V03 | [Feature01](https://21st.dev/@felipemenezes098/components/feature-01) | Lista numerada, seleção única, descrição e CTA do item ativo; painel de mídia à direita no desktop com crossfade de 450 ms; mobile com descrição, mídia e CTA dentro do item expandido | Adaptação técnica da mecânica descrita no prompt mestre, sem importação de React/Tailwind ou alegação de código original. |
| V04 | [Feature Accordion Section](https://21st.dev/@ruixen.ui/components/feature-accordion-section) | Contextualização à esquerda e accordion à direita; empilhamento no mobile | Adaptação técnica nativa. Contextos são orientação de navegação, sem diagnóstico ambiental. |
| V05 | [HowItWorks09](https://21st.dev/@ln-dev7/components/how-it-works-09) | Três etapas horizontais com linha de conexão e círculos numerados; timeline vertical no mobile | Adaptação técnica; progresso vinculado à rolagem é extensão própria autorizada. Conteúdo identificado como representação editorial, não metodologia oficial. |
| V06 | [CTA01](https://21st.dev/@shadcnspace/components/cta-01) | `ctaBanner()` institucional compartilhado | Adaptação técnica da composição; botão original preservado. |
| V07 | [Fade Content](https://reactbits.dev/animations/fade-content) | Sistema de revelação compartilhado | Adaptação técnica nativa. |

Nenhuma dependência foi instalada. Magnet opcional não foi utilizado. Os componentes são escritos em JavaScript/HTML/CSS nativos; não são cópias do código de terceiros. A validação das fontes e disponibilidade de Copy prompt consta no registro central de pesquisa. Não se atribui fidelidade original sem fonte verificada.

## Contratos de interação

- `#s01` a `#s07` permanecem IDs reais únicos.
- Primeiro item selecionado por padrão; hash válido pré-seleciona a área correspondente.
- Seleção via clique, Enter, Espaço e navegação complementar por setas/Home/End.
- `pushState` altera a seleção sem salto da página; `hashchange` e `popstate` restauram a seleção correspondente.
- Links de contextos fazem seleção e deslocamento intencional ao explorador.
- Cliques rápidos atualizam imediatamente um único estado ativo e deixam o CSS interpolar a opacidade das mídias.
- Sem JavaScript, os sete serviços estão abertos no HTML, com descrição, imagem e link reais.
- `prefers-reduced-motion` remove transições de mídia/indicadores e exibe o progresso da timeline completo.
- CTAs públicos permanecem em `/contato/`, sem parâmetros, enquanto o novo fluxo de Contato não tiver integração aprovada e validada.

## Validação efetivamente executada nesta subtarefa

- `node --check src/lib/pages/services.mjs`: aprovado.
- `node --check src/scripts/services.mjs`: aprovado.
- Renderização do módulo com Node: 5 seções, 1 H1, 7 serviços, 7 âncoras únicas presentes, 7 links contextuais e nenhum parâmetro de pré-seleção enviado ao Contato público.
- Build integrado, QA funcional no navegador e responsividade dependem da integração conduzida pelo responsável principal. Não declarados como executados nesta subtarefa.


Atualização de pesquisa: páginas públicas oficiais recuperadas pela pesquisa web após falha do TinyFish; descrições e diferenças consolidadas em `ykeizumi-reference-research.md`. Código completo/Copy prompt/licença original não importados.
