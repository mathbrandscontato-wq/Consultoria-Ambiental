# Home — componentes do redesign integrado

O prompt mestre V1 substitui a arquitetura anterior da Home. Oito seções: Hero, introdução, três áreas de atuação, quatro segmentos, galeria territorial, presença regional, FAQ e CTA. Vídeo original, identidade, header, footer e fotos preservados.

| ID | Componente e origem | Implementação nesta stack | Fidelidade / verificação |
|---|---|---|---|
| H01 | [Split Text](https://reactbits.dev/text-animations/split-text) | Palavras sem duplicação acessível; Web Animations, sequência H1 → H2 → apoio → CTA → indicador | Adaptação técnica, sem importar GSAP/React |
| H02 | [Fade / Animated Content](https://reactbits.dev/animations/animated-content) | Revelações individuais via IntersectionObserver e Web Animations | Adaptação técnica; conteúdo visível sem APIs |
| H03 | Vídeo cinematográfico existente | Assets originais; muted, playsinline, loop, poster, pausa por visibilidade/reduced-motion/saveData; botão de pausa acessível | Implementação nativa; sem trocar a mídia |
| H04 | [Scroll Reveal](https://reactbits.dev/text-animations/scroll-reveal) | Opacidade por palavra vinculada à rolagem e reversível | Adaptação técnica; não é fade de entrada |
| H05 | Cinematic List existente | Três linhas editoriais com descrição, número, links s01–03 e hover fotográfico; conteúdo visível em touch | Adaptação técnica evoluída; sete serviços permanecem no catálogo |
| H06 | [Feature Showcase](https://21st.dev/@ruixen.ui/components/feature-showcase) | Quatro segmentos, um ativo, descrição e mídia sincronizadas, crossfade450ms, accordion mobile e ícones flat | Adaptação técnica; seleção mobile testada |
| H07 | [Circular Gallery](https://reactbits.dev/components/circular-gallery) | Galeria DOM/CSS3D sobre arco, perspectiva, profundidade, destaque central, pointer drag e inércia limitada; controles e teclado; pan-y preserva scroll | Adaptação técnica, sem WebGL. Arraste e controles testados no navegador |
| H08 | Animated Content | Aplicado à introdução, sem envolver o container interativo | Adaptação técnica |
| H09 | Mapa geográfico existente | Raster cartográfico real embutido no asset SVG existente, limite SC e pins existentes; card expansível, arraste, teclado, zoom e reset | Mantém asset geográfico real, não oferece tiles online nem dados ao vivo; zoom/pan verificados |
| H10 | Section Reveal | Sistema compartilhado para título e apoio do mapa | Adaptação técnica; não bloqueia pointer events |
| H11 | [Interactive Accordion](https://21st.dev/@jatin-yadav05/components/interactive-accordion) | Cinco respostas preservadas; button/aria-controls/expanded, transição grid-height, foco e conteúdo sem JS | Adaptação técnica; abertura mobile verificada |
| H12 | [CTA01](https://21st.dev/@shadcnspace/components/cta-01) | Gradiente institucional, conteúdo específico e botão aprovado reutilizado | Adaptação técnica compartilhada |

Não atribuímos os módulos vanilla ao código original das bibliotecas. Detalhes da recuperação das fontes em `ykeizumi-reference-research.md` e registro central.
