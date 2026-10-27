# Sobre — componentes e adaptações técnicas

Implementação vinculada à seção 9 do Prompt Mestre V1 recebido em 27/10/2026. A stack permanece HTML estático + módulos JavaScript nativos. Não foram instalados React, GSAP ou WebGL. Esta página não deve ser classificada como código original das bibliotecas: suas interações são **adaptações técnicas** das mecânicas aprovadas.

## Arquitetura

1. Hero editorial: título literal aprovado e fotografia ambiental com moldura Scroll Expand.
2. Lara Yumi: fotografia real original, identificação limitada a responsável técnica e apresentação contextual. Não foram adicionados diploma, registro, experiência ou certificações não confirmados.
3. Visão: linhas topográficas orgânicas em SVG original, com deriva de baixa intensidade e iluminação sob o cursor.
4. Abordagem: três etapas apresentadas como representação editorial, sem alegar metodologia própria; seleção e mídia seguem a posição da rolagem.
5. Princípios: conceitos editoriais em grid assimétrico com iluminação interativa de borda/superfície.
6. CTA institucional compartilhado.

## Referências e estado de fidelidade

| ID | Componente / referência fornecida | Implementação | Classificação |
|---|---|---|---|
| S01 | [Split Text / React Bits](https://reactbits.dev/text-animations/split-text) | Sistema compartilhado de headings: revelação por palavras com semântica contínua | Adaptação técnica, integração compartilhada |
| S02 | [Scroll Expand / referência fornecida](https://reactbits.dev/animations/scroll-expand) | Moldura `.scroll-expand`; controle compartilhado vincula largura e raio à posição da rolagem | Adaptação técnica, não zoom temporal |
| S03 | [Content06 / Felipe Menezes](https://21st.dev/@felipemenezes098/components/content-06) | Duas colunas, fotografia real primeiro no mobile e conteúdo sem claims extras | Adaptação técnica |
| S04 | [Image Reveal / UI Layout](https://21st.dev/@uilayout.contact/components/image-reveal) | Máscara vertical WAAPI em wrapper independente; não se afirma que esta seja a mecânica original da referência | Adaptação técnica isolada, comparação original pendente |
| S05 | [Fade Content / React Bits](https://reactbits.dev/animations/fade-content) | Labels, identificação e apresentação integrados ao `[data-reveal]` compartilhado | Adaptação técnica |
| S06 | [Luminous Topography / referência fornecida](https://preview.21st.dev/@rmahammad/components/luminous-topography) | Trinta curvas orgânicas originais, SVG reutilizado com `<use>`, máscara de luz responsiva ao cursor; deriva pausada fora do viewport | Adaptação técnica; nenhum shader copiado |
| S07 | [Scroll Reveal / React Bits](https://reactbits.dev/text-animations/scroll-reveal) | `data-scroll-reveal` em “Cada território apresenta desafios próprios.” | Adaptação técnica compartilhada, progresso reversível |
| S08 | [Scroll Reveal Content A / referência fornecida](https://preview.21st.dev/@abui/components/scroll-reveal-content-a) | Linha de progresso + etapa com contraste + crossfade sincronizado pela posição de leitura; mobile com mídia em cada etapa | Adaptação técnica |
| S09 | [Magic Bento / React Bits](https://reactbits.dev/components/magic-bento) | Três módulos assimétricos; iluminação radial segue cursor. Partículas, tilt e magnetismo não utilizados | Adaptação técnica; glow contido |
| S10 | [CTA01 / Shadcnspace](https://21st.dev/@shadcnspace/components/cta-01) | Banner compartilhado, conteúdo específico de Sobre e botão institucional | Adaptação técnica |

Os links acima identificam a origem solicitada no prompt. Não equivalem à comprovação de que todo preview ou código-fonte tenha sido recuperado. A pesquisa de referências está consolidada em `ykeizumi-reference-research.md` quando disponível. Nenhum “Copy prompt” foi inventado ou apresentado como conteúdo original copiado.

## Parâmetros de interação

- Revelação da fotografia: 800 ms, `clip-path: inset(0 0 100% 0)` → `inset(0)`; somente na entrada.
- Topografia: deriva de 22 s, inferior a 1% e 0,5°; máscara radial de luz de 280 px no desktop. No mobile, contornos estáticos e luz fixa, sem dependência de cursor.
- Narrativa: progresso calculado por posição da seção; etapa ativa pela proximidade do centro de leitura, sem temporizador. Mídia com crossfade de 450 ms.
- Bento: ponteiro fino, rAF coalescido, sem loop permanente; luz desaparece ao sair.
- Movimento reduzido: não anima máscara/deriva; transições espaciais desligadas; conteúdo e mídia permanecem disponíveis.
- Performance: uma única definição SVG para as curvas e reutilização com `<use>`; nenhum runtime externo; observação de visibilidade para suspender trabalho decorativo.

## Verificação observada nesta implementação

- `node --check src/lib/pages/about.mjs`: aprovado.
- `node --check src/scripts/about.mjs`: aprovado.
- Renderização isolada: seis seções, um H1, uma fotografia real de Lara Yumi, 57,9 KB de markup (antes do shell global).
- QA de navegador, responsividade e integração dos sistemas compartilhados: responsabilidade da validação integrada; não declarados como executados neste registro parcial.


Atualização de pesquisa: páginas públicas oficiais recuperadas pela pesquisa web após falha do TinyFish; descrições e diferenças consolidadas em `ykeizumi-reference-research.md`. Código completo/Copy prompt/licença original não importados.
