# Referências de interação — 27/10/2026

- Interactive Hover Button, Dillion Verma / Magic UI: https://21st.dev/@dillionverma/components/interactive-hover-button
- Perspective Tunnel Hero, Daiwiik Harihar: https://21st.dev/@daiwiikharihar/components/perspective-tunnel-hero

Implementações próprias em CSS e JavaScript, adaptadas ao site estático. Não importam o código React dos componentes. Túnel com seis fotografias existentes, deslocamento no eixo Z associado à rolagem nativa, amplitude menor no celular e composição estática em reduced motion. Botão com ponto expansível, troca de rótulo visual e foco acessível.

QA: 24 testes e inspeção estática aprovados; sem overflow horizontal em frames de 300, 390, 768 e 1440 px; menu mobile abre; seis fotografias carregadas; transformação do túnel muda com a rolagem.

## Segunda rodada de refino

Adaptações próprias das referências Cinematic List (daiwiikharihar), Cinematic Logo Cloud (nexus-ui), Apple Card Carousel / carousel-08 (shadcnspace), Interactive Accordion (jatin-yadav05) e Beam Wordmark Footer (kedhareswer), todas consultadas em 21st.dev. Sem código React copiado nem dependências adicionadas.

Logo branca horizontal e favicon fornecidos pelo proprietário. Logo otimizada em WebP transparente; favicon PNG em todas as rotas. Hero com CTA de serviços e reveal incluindo a descrição. Túnel com projeção limitada pelas dimensões da seção e imagens sobrepostas ao conteúdo. Serviços em detalhes nativos com expansão por hover em ponteiro fino e clique/teclado. Carrossel com scroll-snap, toque, setas e lightbox. FAQ nativa e rodapé com feixe e brilho sutil.

Mapa: contorno de Santa Catarina extraído de https://github.com/codeforamerica/click_that_hood/blob/master/public/data/brazil-states.geojson. Marcador Joinville em -26.304, -48.846. Área sombreada é indicativa do Norte e Litoral, não delimitação municipal.

QA: 24 testes aprovados; inspeção estática das cinco rotas; Home sem excesso horizontal em 300,390,768,1024,1440,1920; páginas internas conferidas em 390 e 1024; acordeões, navegação do carrossel e lightbox testados no navegador.

## Correção do túnel a partir do código fornecido pelo proprietário

O anexo Texto colado(4).txt trouxe o componente Perspective Tunnel Hero de Daiwiik Harihar. Adaptados os intervalos de movimento: golden angle 137.5°, stagger .45/.55, profundidade desktop -1700→500 e mobile -1200→350; fotos com opacidade 0→1→1→0; grupo de texto com escala .7→1→1.35 e fade final. Interpolação e suavização implementadas no runtime estático existente, preservando scroll nativo para mouse, toque e teclado. Não há interceptação de wheel. Fade adicional nos limites evita recortar fotografias opacas. Movimento reduzido mantém texto estático legível.

Validação: 26 testes aprovados, incluindo regressão de zoom, fade e stagger; inspeção estática; sem overflow horizontal de 300 a 1920 px; navegador confirmou crescimento do texto (.7→.95→1.25) e desaparecimento das seis fotografias; frame mobile confirmou texto crescendo e fotos com opacidades diferentes conforme a profundidade.

## Rodapé fiel ao código anexado e refinamento de layout

Portados os estilos e a lógica do Beam Wordmark Footer (Kedhareswer Naidu) fornecidos em Texto colado(6).txt: feixe e brilho no mesmo sistema de coordenadas do fundo e letras, ajuste do tamanho por medição, reveal escalonado, hover e salto por clique. Paleta verde da marca; quatro ícones sociais com indicação de link em breve e navegação bloqueada enquanto não houver URLs oficiais. A faixa de copyright fica depois da palavra por solicitação do proprietário.

Túnel reduzido de 250 para 175svh no desktop e de 235 para 160svh no mobile, mantendo a sequência de aproximação e desaparecimento. Para quem: introdução curta, título menor, SVGs flat nos quatro segmentos e reveal nos itens. Animação de palavras aplicada a h1–h6 nas cinco páginas.

Mapa geográfico estático com base OpenStreetMap, tiles zoom 7 armazenados no build, sem requisições de mapa no dispositivo do visitante; atribuição visível © OpenStreetMap contributors / https://www.openstreetmap.org/copyright. Limite de SC baseado no dataset previamente documentado, reprojetado para Web Mercator. Pins em Joinville e posições indicativas do Norte/Litoral; sem preenchimento de áreas de atuação. Variante mobile conserva o enquadramento do estado.

QA: 26 testes e inspeção estática aprovados; Home sem overflow horizontal em 300,390,768,1024,1440,1920; mapa carregado nas seis larguras; ícones flat verificados; faixa abaixo da marca em todas as larguras; beam ativo no navegador; clique em letra gera is-hop; clique em rede social não muda o hash.

## Galeria e resolução cartográfica

Link Explorar galeria movido para a base do carrossel, à direita, na mesma largura do título e dos cards. Controles ficam à esquerda na mesma linha.

Base de mapa substituída por exports Esri World Topo Map: desktop 3072×2304 e mobile 2048×3072, WebP qualidade 95, com os mesmos limites Web Mercator dos arquivos anteriores. Limite de SC, pins e rótulos continuam vetoriais. Créditos visíveis vinculados ao serviço: https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer. Fontes do serviço: Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), © OpenStreetMap contributors e GIS User Community.

Build e inspeção estática aprovados. Conferência no navegador em 300,390,768,1024,1440,1920: sem overflow horizontal, imagens cartográficas carregadas e link abaixo do carrossel. Desktop: margem direita do link alinhada aos cards, e margem esquerda dos cards alinhada ao título.

## Altura compacta do mapa

Mapa igualado aos cards da galeria: 470px desktop/tablet e 380px até 650px. Enquadramento contém o estado inteiro; legenda compacta no celular. Build e inspeção estática aprovados; navegador confirma alturas iguais e ausência de overflow em 300,390,768,1024,1920.

## Mapa arrastável

Viewport compacto em 420px desktop e 340px mobile, com mapa de alta resolução preenchendo o quadro. Pointer Events e captura de ponteiro permitem pan com mouse/toque; cursor grab/grabbing; limites impedem revelar áreas vazias. Sobreposição de título não bloqueia o gesto. Setas do teclado movem o mapa; Home restaura o enquadramento. Build, 26 testes e inspeção estática aprovados. Browser confirmou drag alterando a translação, pan por teclado, retorno do cursor a grab e ausência de overflow em 300,390,768,1024,1920.


## Expand Map — revisão de composição

Adaptação da opção 3 (Expand Map, Jatin Yadav / 21st.dev) para o site estático: card compacto de Joinville com abertura por clique ou teclado, mapa arrastável e recolhimento. Introdução em duas colunas alinhada às margens da galeria; no mobile, texto empilhado. Título: “Um olhar próximo. Uma atuação regional.” Apoio: “Com base em Joinville, atuamos no Norte e Litoral de Santa Catarina.”

Validação: npm run qa aprovado (26 testes). Revisão no navegador em larguras 300, 390, 768, 1024 e 1920 sem overflow horizontal e com título alinhado à galeria. Expansão validada em 390 e 1024; navegação do mapa por setas e recolhimento por Enter verificados.


## Região e FAQ — composição à direita

Seção regional com fundo verde escuro #1e3b2d; título, apoio e card compacto empilhados e ancorados à margem direita do container. Mantidos expansão e arraste do mapa. FAQ renomeado para “Perguntas Frequentes”, com apoio “Respostas para orientar os próximos passos do seu projeto.” Hierarquia semântica h2/h3 e animação de entrada preservadas. npm run qa aprovado; alinhamento à direita conferido no desktop e largura 390 sem overflow horizontal no navegador.


## Correção responsiva da seção regional

Desktop: título e apoio em coluna à esquerda, card expansível à direita. Mobile até 767px: elementos empilhados. Fundo verde e conteúdo do FAQ preservados.
