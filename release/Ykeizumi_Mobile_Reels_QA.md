# Ykeizumi — relatório técnico de renderização

- Repositório: mathbrandscontato-wq/Consultoria-Ambiental
- Branch original: feat/ykeizumi-redesign-unificado-20261027
- Branch motion: feat/ykeizumi-mobile-reels-remotion
- Captura: Chromium, mobile 390 × 844 CSS px, device scale factor 2, touch
- Material de origem: arquivos do site original, sem UI reconstruída
- Captura contínua da interface: 840 frames reais do navegador
- Remotion: composição YkeizumiMobileReels, 960 frames
- Vídeo final: H.264 / MP4, 1080 × 1920, 30 fps, 32.000 s
- Hero mobile: vídeo nativo confirmado como reproduzido durante a captura
- Eventos de toque registrados: open-mobile-menu, close-mobile-menu, select-second-sector, next-gallery-image, next-gallery-image
- Imagens de serviços: sem hover inventado para mobile
- Textos externos, locução e assinatura: nenhum
- Capa: extraída do segundo 7 do vídeo, sem acréscimo de texto
- Tipografia: usa CSS original do site; Avenir é fonte local e depende da instalação/licença do ambiente
- O website de produção não foi modificado nem publicado
- Integridade: ffprobe passou; decodificação integral verificada no CI

## Caminhos
- release/Ykeizumi_Mobile_Reels_Final.mp4
- release/Ykeizumi_Mobile_Reels_Cover.png
- motion/ykeizumi-mobile-reels/src/index.tsx
- motion/ykeizumi-mobile-reels/public/mobile-capture.mp4
- motion/ykeizumi-mobile-reels/public/touches.json
- motion/ykeizumi-mobile-reels/capture-report.json

## Avisos observados pelo navegador

- Nenhum erro observado
