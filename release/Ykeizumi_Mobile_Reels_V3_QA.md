# Math Brands | Ykeizumi Mobile Reels V3 — QA audiovisual

## Comparativo com V2
- Duração V2: 32.0s; V3: 29.0s
- Abertura V2: geometria com crescimento simples e troca de quadro.
- Abertura V3: vetor com 13,5x de aproximação ao canto superior direito; antes/durante/depois do raio 0→23px; zoom-out e morph para o viewport original sem corte.
- Site V2: 780px de largura sobre 1080px (72%).
- Site V3: 910px de largura sobre 1080px (84,3%), câmera focal contínua após 4,5s.
- V2: fotografia aérea grande aparece no acordeon.
- V3: o elemento figure dentro de #segmentos é display:none exclusivamente no Chromium de captura; altura do bloco colapsa sem foto substituta; nenhum código do site foi alterado.
- V3: gestos e scroll real executados no navegador mobile; interações menu-open, menu-close, sector-second, sector-third, gallery-next-1, gallery-next-2

## Verificações técnicas
- Fonte: branch feat/ykeizumi-redesign-unificado-20261027, incorporada apenas como base da produção audiovisual
- Site de produção: não modificado nem publicado
- Captura: 390×844 CSS px, DPR2, 760 frames, 30 fps, original mobile Hero playing
- Remotion: 1080×1920, 30 fps, 870 frames, H264, 29.000s
- Resolução e FPS: ffprobe APROVADO
- Reprodução e integridade: decodificação integral FFmpeg APROVADA
- Fonte tipográfica: CSS original com Avenir local e fallback de sistema; nenhum font file distribuído
- Capa: frame 6.1s; sem texto externo
- Storyboard/frames: release/Ykeizumi_Mobile_Reels_V3_Review.png
- Artefatos: vídeo MP4, capa PNG, relatório QA, código TSX, captura Playwright, captura MP4, manifesto de toques

## Ressalva
- As validações automatizadas não substituem a revisão visual de abertura, interações e galeria.

## Arquivos
- release/Ykeizumi_Mobile_Reels_V3_Premium.mp4
- release/Ykeizumi_Mobile_Reels_V3_Cover.png
- release/Ykeizumi_Mobile_Reels_V3_Review.png
- motion/ykeizumi-mobile-reels/src/index.tsx
- motion/ykeizumi-mobile-reels/public/mobile-capture-v3.mp4
- motion/ykeizumi-mobile-reels/public/touches-v3.json
- motion/ykeizumi-mobile-reels/capture-report-v3.json
