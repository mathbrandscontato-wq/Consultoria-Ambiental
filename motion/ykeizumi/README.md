# Math Brands | Ykeizumi — editorial Reels em Remotion

## Fonte comprovada
Site: mathbrandscontato-wq/Consultoria-Ambiental
Branch: feat/ykeizumi-redesign-unificado-20261027
SHA: d64cd9703bb6f6582ca6bfde37957a7e3e64a66f
O código de produção e a branch main não são modificados.

## Enquadramento
Case de cliente: apresentação do WEBSITE Ykeizumi criado pela Math Brands.
As fotografias territoriais existentes são imagens editoriais/ilustrativas. Não se afirmam
projetos ambientais concretos da consultoria que não estejam verificados.

## Timeline de 31 segundos (930 frames, 30 fps)
00:00–00:04.5 Forma/canto institucional.
00:04.5–00:10 Hero real, vídeo de fundo original e tipografia do site.
00:10–00:16 Home: entrada no terceiro bloco e hover fotográfico real dos serviços.
00:16–00:24 Segmentos: seleção real e painel sincronizado.
00:24–00:31 Galeria territorial: carrossel verdadeiro e fechamento pelo próprio projeto.

## Técnica
- Site estático é gerado via npm run build, sem deploy.
- Playwright-core captura a Home original em Chromium, com estados reais de hover,
  seleção e galeria; os elementos de interface não são redesenhados.
- O hero utiliza vídeo original, sombra cromática equivalente e uma camada
  transparente de texto, logotipo e navegação produzida do DOM original.
- Remotion/React anima a câmera e o cursor dentro das capturas sem textos externos,
  sem mockup de celular e sem adicionar cases ou logos novos.
- Capturas 1440x900 pixels CSS em deviceScaleFactor 2.
- Exportação 1080x1920, 30fps, H.264/yuv420p, sem áudio.

## Execução
Requer Node 22, Chromium, ffmpeg e rede para instalar as dependências npm.
A Action render-ykeizumi-reels.yml executa captura, render, still e verificação
e publica um artefato ZIP contendo MP4, PNG, projeto-fonte e relatório.

O rendering é considerado concluído somente quando o Job apresenta sucesso,
ffprobe valida codec, resolução e duração e os artefatos estão disponíveis.
As fontes Avenir podem cair no fallback definido no site se as webfonts não estiverem
licenciadas/instaladas no ambiente. Não redistribuir fontes proprietárias.

## Arquivos
- scripts/capture.mjs — captura Playwright real de estados
- src/index.tsx — composição Remotion YkeizumiReels
- src/capture-data.json — coordenadas dos elementos capturados
- out/ — render final, capa, pacote editável, relatório (somente após Action)

A execução não mexe em DNS, Cloudflare, branches de produção ou conteúdo do website.
