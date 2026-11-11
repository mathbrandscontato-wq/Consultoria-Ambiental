# Math Brands | Ykeizumi — Mobile Reels V3 Premium

## Entrega
- `release/Ykeizumi_Mobile_Reels_V3_Premium.mp4` — vídeo final, H.264, 1080×1920, 30 fps, 29 s.
- `release/Ykeizumi_Mobile_Reels_V3_Cover.png` — capa obtida diretamente do vídeo, sem novos textos.
- `release/Ykeizumi_Mobile_Reels_V3_Review.png` — prancha de revisão dos frames.
- `release/Ykeizumi_Mobile_Reels_V3_QA.md` — relatório técnico e comparação com V2.
- `src/index.tsx` — Remotion editável, sistema central de câmera e geometria vetorial.
- `capture/capture-mobile.mjs` — gravação automatizada da experiência mobile real.
- `public/mobile-capture-v3.mp4` — interface móvel capturada a 30 fps.
- `public/touches-v3.json` — mapa dos eventos reais de toque.
- `capture-report-v3.json` — evidências da captura.

## Direção V3
- 0–4,5 s: geometria vetorial verde-escura, aproximação 13,5× sobre o canto superior direito, alteração de raio 0→23px e zoom-out contínuo.
- 4,5–9,5 s: interface real mobile e demonstração do menu original.
- 9,5–13,5 s: navegação pela introdução e lista de serviços.
- 13,5–21,5 s: acordeons, mantendo verde institucional e textos originais; a fotografia grande fica oculta **somente no Chromium de captura**, não no site publicado.
- 21,5–29 s: galeria responsiva com duas interações originais de navegação.

A interface utiliza 910px da largura total 1080px (~84,3%) em plano geral. O componente Remotion centraliza a câmera e implementa interpolação cúbica contínua para os deslocamentos ao longo das cenas.

## Reprodução
Da raiz da branch `feat/ykeizumi-mobile-reels-v3-premium`, rode:

```bash
npm run build
python3 -m http.server 4173 --directory dist
```

Em outro terminal (Node 22+, FFmpeg instalado):

```bash
cd motion/ykeizumi-mobile-reels
npm ci
npx playwright install chromium
npm run capture
npx remotion render src/index.tsx YkeizumiMobileReels ../../release/Ykeizumi_Mobile_Reels_V3_Premium.mp4 --codec h264 --crf 17
```

O workflow `.github/workflows/render-ykeizumi-mobile-reels-v3.yml` automatiza captura, renderização, extração de capa, FFprobe, decodificação integral, relatório e upload de artefatos.

## Preservação e limites
- O website de produção não foi alterado nem publicado.
- A paleta, a tipografia declarada em CSS, os textos, a interface e as microinterações têm origem no site real.
- Avenir no website é fonte local; não redistribuir seus arquivos sem licença apropriada.
- Não há assinatura da Math Brands, chamadas promocionais, locução ou música sem licença.
- O vídeo foi revisado visualmente e tecnicamente; publicação no Instagram depende da aprovação de direção criativa.
