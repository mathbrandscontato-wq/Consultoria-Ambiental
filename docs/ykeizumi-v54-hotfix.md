# Ykeizumi — Hotfix V5.4

27/10/2026. Correção pontual autorizada pelos dois anexos recebidos nesta execução. Stack, domínio, hospedagem, público e indexação preservados. Não é redesign nem rollback do site inteiro.

## Segunda seção — Lara Yumi

Fonte verificável: commit `1d838a0d96b641890b58d9effc689457f9972951`, anterior à instalação do Perspective Tunnel. Recuperada seletivamente a linha completa de renderização de `#lara-yumi` em `src/lib/pages/about.mjs`. Comparação byte a byte aprovada; SHA256 da linha fonte: `0fb8c607ad84345cf1b6659332ffcedf2d78ea12c62b39323b57714a9df143cf`.

`src/styles/about.css` continua idêntico ao mesmo commit. Retrato, título, parágrafos, link, grid desktop/mobile, dimensões e image reveal originais foram recuperados. Os wrappers `.about-tunnel-stage`, plano de imagens, anchor transformado e classes do túnel foram removidos do perfil; não foram apenas escondidos. A consulta do controlador passa a encontrar somente `#visao`; nenhum listener de túnel é registrado em Lara. Estilos específicos que alteravam tamanho do retrato, tipografia, padding, fundo do texto e altura do perfil foram retirados do CSS do efeito.

Navegador confirmou: `#lara-yumi` com classes `editorial-section page-profile about-profile`, zero descendentes contendo tunnel e transform computado `none` no grid. Inspeção visual desktop do perfil restaurado: `docs/evidence/v54-profile-restored.jpg`.

A correção tipográfica global autorizada também se aplica ao perfil. Por isso a confirmação byte a byte diz respeito ao componente e CSS original, não a uma alegação de equivalência de pixels em toda configuração de fonte/dispositivo.

## Terceira seção — localização definitiva do túnel

Uma única instância em `#visao`, terceiro bloco principal da página Sobre. Permanecem o título “Cada território apresenta desafios próprios.” e o parágrafo institucional existente. O efeito substitui a apresentação topográfica desse bloco. As definições SVG utilizadas no Bento foram preservadas junto ao Bento para evitar referência quebrada após a remoção da topografia.

Referência: Perspective Tunnel Hero, @daiwiikharihar / 21st.dev, código TSX fornecido pelo usuário. A implementação continua uma adaptação nativa HTML/CSS/JavaScript da stack existente, sem instalar React, Tailwind ou Framer Motion. Foram reutilizados o controlador e o modelo geométrico; não se criou uma segunda implementação paralela.

- Texto: `titleState` do modelo fornecido, escala .7 → 1 → 1.35 e opacidade .25 → 1 → 1 → 0, conforme progresso real e reversível. Título e mensagem crescem como um conjunto central.
- Centralização: grid `place-items:center`, alinhamento de texto central e transform-origin central. A largura reserva a escala final para não cortar texto.
- Sobreposição: anchor em camada0 e plano de fotos em camada1, sem números extremos. Fotos não recebem eventos e não bloqueiam controles. A sobreposição é transitória; conteúdo semântico continua no HTML, e fallback estático permanece disponível.
- Profundidade: eixos Z, ângulo áureo, escalonamento e fades do modelo existente, com seis fotos aprovadas no desktop e quatro no mobile.
- Laterais: plano de imagens ocupa todo o stage; nenhum max-width editorial sobre o plano. O único recorte está no stage externo da largura da viewport, de modo que as fotografias saem nos limites da tela, sem criar scroll horizontal ou invadir a quarta seção. Não há fade adicional baseado na borda de container interno.
- Scroll: listener passivo, sem interceptação de wheel/touchmove, sem travamento ou reposicionamento da página. Suavização de95ms reaproveitada, loop encerra no repouso e fora de visibilidade.
- Movimento reduzido e viewport de pouca altura: composição estática com texto visível, sem planos decorativos. Sem acesso exclusivamente por hover ou cursor.

Navegador desktop: stage de1348px ocupando toda a área visível, left0/top0, texto center, escala1.01535 em progresso.5219, camadas0/1. Mobile: stage de375px para iframe390px com scrollbar; progresso.4741, escala.984444; depois.9842 na saída e.6995 ao voltar. Na transição, fundo do stage e início da quarta seção coincidiram em496.5625px, sem sobreposição além da seção.

Evidências: `docs/evidence/v54-tunnel-desktop.jpg`, `docs/evidence/v54-tunnel-mobile.jpg`.

## Tipografia global

Arquivos: `src/styles/responsive-type.css`, build e import de stylesheet; remoção de `<br>` de títulos em `src/lib/sections.mjs` e `src/lib/pages/{about,services,projects-page}.mjs`.

Quebras removidas dos títulos do mapa, Contato, explorador de Serviços, Atlas e seções de abordagem/princípios em Sobre. Quebra de localização/endereço mantida. Nenhuma frase, serviço ou informação de SEO foi reescrita. Headers, CTA, tamanhos tipográficos dos heros e grids aprovados preservados.

Headings usam white-space normal e text-wrap wrap. Max-width em ch que forçava quebras antecipadas foi substituído pela largura da coluna já existente nos títulos aplicáveis. O título de segmentos pode quebrar naturalmente quando necessário. Parágrafos mantêm limites de leitura; não foram ampliados indiscriminadamente.

Comparação de escopo confirmou byte a byte: objetos de titles/descriptions de cinco páginas, componente Hero A, registro dos sete serviços, footer, CSS do perfil e CSS dos heros internos preservados em relação ao baseline `c42bd529e8b04e2fb71ddae2e300f74077ae2cbe`.

## Testes e limites

- `npm run qa`: lint, build,46 testes e inspeção estática aprovados antes do teste visual.
- Oito testes V5 atualizados para localização definitiva na seção03 e crescimento/reversão de texto. Preservadas verificações de contexto, foco, swipe, fallback e scroll natural.
- CUA: cinco páginas ×320/375/390/768/1024/1280/1440/1920px =40 combinações. Zero overflow horizontal, um H1 por página, zero quebras manuais em headings e zero imagens com src quebrado; white-space normal nos H1/H2.
- Perfil restaurado inspecionado no desktop; túnel inspecionado no desktop e mobile, com deslocamento para a quarta seção e retorno. As fotos passando à frente do texto são sobreposição intencional solicitada.
- Testes responsivos usam iframes com larguras controladas. Não são homologação em40 aparelhos. Sem touch físico, leitores de tela ou métricas CWV de campo nesta execução. Sem alegação pixel-perfect ou conformidade WCAG integral.
- Envio real de Contato continua fora deste hotfix e indisponível; noindex mantido.

## Publicação

Candidata em validação final. O resultado efetivo será registrado após deploy e checagem pública. As páginas temporárias de QA serão eliminadas com preview encerrado antes do build/empacotamento; check restringe HTML às cinco rotas aprovadas.
