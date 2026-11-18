# UX/UI V2 — acessibilidade e composição editorial

Data: 2026-11-18. Escopo: ajustes incrementais sobre a implementação existente, sem substituir o conceito visual ou remover conteúdo. Esta revisão técnica não representa certificação de conformidade WCAG 2.2 AA.

## Alterações implementadas

- Indicador de foco de duas cores (verde institucional e creme), com variante interna em imagens e mapa para evitar recorte por `overflow`.
- Área mínima de 44 × 44 CSS px nos controles de vídeo e mapa; altura mínima de 44 px em navegação, links contextuais e links do footer em telas pequenas ou dispositivos de toque.
- CTA de proposta no menu mobile preserva o botão com efeito existente, com largura contida no dropdown e texto verde sobre branco.
- Tons próximos da identidade para pequenos textos anteriormente insuficientes em fundos claros, incluindo números de serviços, links contextuais e etapas inativas da narrativa Sobre.
- Piso de opacidade das palavras da narrativa ao rolar alterado de 0,32 para 0,72. A transição até 1 permanece na experiência padrão.
- Pequenos textos do footer clareados, com redução da intensidade da camada de iluminação de fundo. A assinatura decorativa, o beam e os efeitos existentes permanecem.
- Overlay complementar no topo do vídeo para proteger a navegação branca em quadros claros.
- `text-wrap: balance` em títulos e `pretty` em parágrafos/listas, com quebra normal como fallback. Mantida a escala tipográfica existente.
- Largura de leitura de até 65ch em blocos institucionais e `min-width: 0` em colunas. Removida justificação em colunas estreitas de 900–1199 px e em mobile, preservando o conteúdo.
- Transições de hover, letras do footer e imagens dos setores desativadas somente quando `prefers-reduced-motion: reduce` está ativo; o comportamento padrão permanece.

Arquivos deste escopo: `src/styles/ux-v2.css`, `src/scripts/unified.mjs` e este relatório. O import/copy do CSS, alterações semânticas de páginas e acordeão mobile de serviços pertencem aos demais escopos da mesma implementação.

## Contraste calculado a partir do código

Cálculo sRGB com linearização e luminância relativa da WCAG. Valores arredondados para duas casas. As cores foram extraídas das regras CSS; não são amostragem de pixels de capturas.

| Uso / par de cores | Antes | Depois |
| --- | ---: | ---: |
| Pequenos links verde-acento sobre creme: #7F9962 / #F8F6F2 → #506448 / #F8F6F2 | 2,93:1 | 5,97:1 |
| Etapa inativa Sobre: #78836E / #E8ECE3 → #506448 / #E8ECE3 | 3,33:1 | 5,38:1 |
| Palavra menos opaca: #1E3B2D com alfa 0,32 → 0,72 sobre #F8F6F2 | 1,84:1 | 4,99:1 |
| Palavra totalmente opaca: #1E3B2D / #F8F6F2 | 11,32:1 | 11,32:1 |
| CTA do menu: #1E3B2D / #FFFFFF | — | 12,22:1 |
| Foco verde/creme: #1E3B2D / #F8F6F2 | — | 11,32:1 |

O cálculo com alfa considera composição sobre o fundo creme informado. Sobre imagens, vídeo, gradientes, transparências e animações, esses números isolados não comprovam contraste em todos os estados. O overlay adicional e o footer precisam de inspeção renderizada, inclusive nos quadros mais claros. A assinatura grande do footer é decorativa e já possui nome textual acessível separado; não foi usada como substituta do conteúdo navegável.

## Inspeção de implementação existente

- O menu mobile utiliza `details`/`summary` nativos e sincronização de estado via script; Escape, fechamento externo e retorno de foco existem no controlador.
- O carrossel possui controles por botão e navegação por teclado, além da interação por arrasto. Precisa de confirmação manual após os ajustes.
- O formulário de contato continua explicitamente indisponível enquanto a integração real não é configurada. Não foram habilitados coleta ou sucesso fictício.
- Há tratamentos prévios de movimento reduzido nos scripts e estilos; os ajustes deste escopo complementam esses mecanismos.

## Validação observada neste escopo

- `node --check src/scripts/unified.mjs`: aprovado.
- Cálculos de contraste acima: executados com fórmula sRGB.
- Nenhuma dependência adicionada. Nenhum texto editorial, imagem, fonte institucional, rota ou integração CMS foi substituído por estas alterações.

Build, lint, testes da aplicação, axe-core, Lighthouse, capturas e verificação em navegador são consolidados no relatório geral da execução. Não foram executados por este escopo isoladamente e seus resultados não são presumidos aqui.

## Roteiro de confirmação manual

1. Tab e Shift+Tab em todas as páginas; confirmar foco visível, ordem lógica e ausência de foco escondido pelo cabeçalho.
2. Enter/Space em menu, acordeões, galeria, mapa e controles; Escape no menu e lightbox; verificar retorno de foco.
3. Conferir menu e CTA a 320, 360, 375, 390, 414 e 768 px, especialmente rótulos sem recorte.
4. Conferir títulos/colunas a 1024, 1280, 1440 e 1920 px; comparar com as capturas anteriores para preservar direção de arte.
5. Zoom de 200% e reflow equivalente a 400%: verificar leitura completa, controles alcançáveis e ausência de rolagem horizontal indevida.
6. Ativar movimento reduzido: texto imediatamente legível, sem dependência de animação para navegar.
7. Conferir texto sobre os quadros mais claros do vídeo, footer em diferentes estados do beam e indicações de foco sobre fotografias.
8. Complementar axe com inspeção manual de nomes acessíveis, alternativas de imagens, headings, âncoras e elementos interativos.

Referências de critérios: WCAG 2.2 — 1.4.3 Contraste mínimo; 1.4.10 Reflow; 1.4.11 Contraste não textual; 2.1.1 Teclado; 2.4.7 Foco visível; 2.4.11 Foco não obscurecido (mínimo); 2.5.8 Tamanho do alvo (mínimo). A preferência de 44 × 44 px é uma meta de conforto; não substitui a avaliação das exceções e do mínimo de 24 × 24 px do critério AA.

## Correção após a primeira auditoria renderizada

O Lighthouse da primeira execução apontou um parágrafo em Serviços, em mobile e desktop: “Identifique a sua situação e veja quais serviços se relacionam a ela.” A cor #61705E sobre #E8ECE3 apresentou 4,39:1 no relatório automatizado. Foi ajustada somente a tonalidade desse parágrafo para #506448, com razão calculada de 5,38:1. O texto e a composição foram preservados. O resultado final exige nova execução automatizada; esta correção não é um resultado de reteste.


## Reteste consolidado concluído

CI44345724108, candidataa3d3ba7c57903b47ed9fb6f667c855cf9feb180d: quatro páginas×11larguras=44cenários finais, sem overflow horizontal, headings fora da tela, IDs duplicados, errosJavaScript ou imagens carregadas com erro. Axe executado em390/1440 nas quatro páginas: zero violações nas oito auditorias finais, incluindo a correção de contraste deServiços. As oito auditorias de referência também foram preservadas.

Fluxos aprovados: nove acordeões por toque nas duas rotas que compartilham o explorador, abrir/recolher, Enter/Space, âncora#s09, contexto de necessidade→especialidade, End/Home nas abasdesktop, menuEscape, movimento reduzido nas quatro páginas, controles de mapa e galeria/lightboxEscape. O teste espera a atualização do evento nativo toggle para validar aria-expanded, sem mascarar estados incorretos.

Revisão manual em navegador: seleção e teclado emdesktop; mobile390 viaiframe com âncora de serviço visível e conteúdos independentes; novo perfilSobre com nome/cargo/foto na primeira coluna, biografia na segunda e empilhamento no mobile. Zoom físico200/400% não pôde ser confirmado nesta superfície;320/720CSSpx foram testados como reflow/equivalência de largura, sem alegar teste físico. Texto sobre todas as combinações temporais do vídeo e do feixe exige avaliação humana contínua; não se afirma conformidadeWCAGintegral.
