# Registro central — Ykeizumi, redesign integrado V1

Stack verificada: Node ESM, render HTML em build, CSS e módulos vanilla. Sem React, Tailwind, GSAP, WebGL ou dependências npm adicionadas. Fonte Avenir local-first existente e fallback preservados. As implementações abaixo são **adaptações técnicas**; não são código original copiado nem integrações literais das bibliotecas React.

| Família | Origem | Código próprio | Páginas e parâmetros | Estado |
|---|---|---|---|---|
| Split Text | React Bits / text-animations/split-text | `src/scripts/motion.mjs`; títulos dev em contact-development | Home/Sobre/Serviços/Projetos; palavras,32–42ms stagger,450–560ms e sequência Hero | Funcional; no-motion e API fallback |
| Fade/Animated Content | React Bits / animations/fade-content e animated-content | motion.mjs / `[data-reveal]` | Entradas400–650ms; nunca envolve arraste da Circular Gallery | Funcional |
| Scroll Reveal | React Bits / text-animations/scroll-reveal | unified.mjs / `[data-scroll-reveal]` | Home, Sobre, Projetos; opacidade.32→1 contínua e reversível | Funcional; não temporal |
| Scroll Expand | URL fornecida React Bits / animations/scroll-expand | unified.mjs / `.scroll-expand` | Sobre/Projetos; largura88→100%, raio24→0, reversão proporcional | Mecânica aprovada adaptada; disponibilidade da URL na pesquisa |
| CTA Banner | 21st.dev / shadcnspace / cta-01 | components.mjs + unified.css | Home/Sobre/Serviços/Projetos; gradiente verde; botão institucional original | Funcional, compartilhado |
| Feature Showcase | 21st.dev / ruixen.ui / feature-showcase | sections.mjs + unified.mjs | Home;4segmentos,um ativo,crossfade450ms,accordion touch | Funcional |
| Cinematic List | 21st.dev referência histórica | sections.mjs + unified.css | Home;3prévia de serviços, descrição visível e hoverdirecional | Funcional; sete no catálogo |
| Circular Gallery | React Bits / components/circular-gallery | circular-gallery.mjs + unified.css | Home;arco CSS3D,perspectiva,drag,inércia limitada,teclado,pan-y,pausa fora viewport | Adaptação DOM; sem deformação WebGL |
| Mapa | Asset cartográfico existente/Esri + SC/pins | map-pan.mjs | Home;cardexpansível,pan,zoom1–2.5,reset,setas/Home | Funcional; mapa geográfico real raster incorporado, sem tiles online |
| Interactive Accordion | 21st.dev / jatin-yadav05 / interactive-accordion | sections.mjs + unified.mjs | Home;5itens,button/aria/altura suave | Funcional; respostas preservadas |
| Split Content / Image Reveal | 21st.dev / felipemenezes098 / content-06 e uilayout.contact / image-reveal | pages/about.mjs + about.mjs | Sobre;retrato original, máscara vertical800ms | Adaptação; não alegamos origem de código |
| Luminous Topography | 21st.dev / rmahammad / luminous-topography | about.mjs + SVG original em pages/about.mjs | Sobre;curvasorgânicas,drift22s,luzcursor,pausa fora viewport | Adaptação SVG; código original React não importado |
| Scroll Reveal Content A | 21st.dev / abui | about.mjs + about.css | Sobre;3etapas,mídia sincronizada,linha vinculada ao scroll | Funcional; narrativa editorial, não metodologia oficial |
| Magic Bento | React Bits / components/magic-bento | about.mjs + about.css | Sobre;3módulos assimétricos,luzpointer;sem partículas/magnetismo | Adaptação técnica |
| Feature01 | 21st.dev / felipemenezes098 / feature-01 | pages/services.mjs + services.mjs | Serviços;7IDs,um ativo,450mscrossfade,accordion,history | Funcional |
| Feature Accordion | 21st.dev / ruixen.ui / feature-accordion-section | pages/services.mjs | Serviços;5situações,links múltiplos | Funcional |
| HowItWorks09 | 21st.dev / ln-dev7 / how-it-works-09 | services.mjs + services.css | Serviços;3etapas,progresso scrollcustom | Funcional, customização declarada |
| Masonry / Lightbox | React Bits / components/masonry + diálogo nativo existente | pages/projects-page.mjs + atlas.css + motion.mjs | Projetos;3/2/1colunas,6fotos;Esc,setas,focusrestore | Funcional; sem framework |
| Contato conversacional | Fluxo original do prompt, motion inspirado React Bits | contact-development / contact-schema | Desenvolvimento apenas;6perguntas,revisão,edição,RAM,idempotência | Interface testada; envio real bloqueado |

Documentação por página: `ykeizumi-home-motion-components.md`, `ykeizumi-sobre-component-prompts.md`, `ykeizumi-servicos-componentes.md`, `ykeizumi-projetos-componentes.md`, `ykeizumi-contato-componentes.md`.

Licenças: nenhuma fonte proprietária foi redistribuída; os componentes são código original deste projeto, com referências documentadas. Assets fotográficos já autorizados no projeto foram reutilizados. Avenir webfont universal segue pendência preexistente de licença.
