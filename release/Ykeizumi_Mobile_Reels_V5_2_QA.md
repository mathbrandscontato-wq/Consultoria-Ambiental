# Ykeizumi Mobile Reels V5.2 — relatório técnico

- Status: render e decodificação técnica aprovados. Aprovação criativa pendente da direção da Math Brands.
- Formato: H264, MP4, 1080×1920px, 30fps, 1080 frames, 36s.
- Site original e branch V5.1: não alterados; captura somente no ambiente de motion.
- Abertura: vetor baseado nas medidas reais do contêiner da Hero (V5.1 preservada).
- Pacing: 945 frames de captura, scroll retemporizado por timeline-v5-2.json; velocidade máxima 20.00 CSS px/frame.
- Leitura: chegada suavizada e pausas sobre introdução, título e lista de serviços; revelações reposicionadas na nova timeline.
- Geometria dos textos: camadas PNG alfa extraídas do DOM, posições ligadas ao scrollTrack novo.
- Galeria: eliminados galleryFirstCard estático e a ocultação artificial do card do DOM.
- Galeria: carregamento de todas as imagens confirmado antes da interação, CSS3D original aplicado em passos determinísticos de frames.
- Estados do carrossel: [(777, 2, 'Montanhas'), (850, 3, 'Observação do território'), (904, 4, 'Paisagem natural')]
- Dois toques nativos na galeria e dois nos acordeons. Sem crossfade de cards.
- Fotografia aérea: escondida somente na captura audiovisual, como na V5.1.
- Pré-testes: introdução+serviços, acordeons e sete segundos finais da galeria, todos decodificados antes do render integral.
- Revisão: release/Ykeizumi_Mobile_Reels_V5_2_Gallery_Review.png e release/Ykeizumi_Mobile_Reels_V5_2_Scene_Review.png.
- Ressalva: a inspeção visual por direção criativa ainda é necessária; integridade técnica não constitui aprovação editorial.

## Arquivos
- release/Ykeizumi_Mobile_Reels_V5_2_Polish.mp4
- release/Ykeizumi_Mobile_Reels_V5_2_Cover.png
- release/Ykeizumi_Mobile_Reels_V5_2_Gallery_Review.png
- motion/ykeizumi-mobile-reels/src/index.tsx
- motion/ykeizumi-mobile-reels/capture/capture-mobile-v5.mjs
- motion/ykeizumi-mobile-reels/timeline-v5-2.json
- motion/ykeizumi-mobile-reels/public/v5-layer-manifest.json
- motion/ykeizumi-mobile-reels/public/mobile-capture-v5.mp4
