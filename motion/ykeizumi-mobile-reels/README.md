# Ykeizumi | Mobile Reels — Math Brands

**Escopo:** Reels de portfólio com captura do layout mobile real, separado do website de produção.

## Fonte e reprodução
- Fonte: `feat/ykeizumi-redesign-unificado-20261027` deste repositório.
- Branch de trabalho: `feat/ykeizumi-mobile-reels-remotion`.
- Viewport real: 390 × 844 CSS px; DPR 2; Chromium com touch habilitado.
- Saída: `YkeizumiMobileReels`, 1080 × 1920, 30 fps, 960 frames, 32 s.
- Sequência: geometria (0–4 s), Hero (4–10 s), scroll/serviços (10–17 s), acordeons (17–25 s), galeria (25–32 s).
- A interface vem exclusivamente do build do próprio website; não é redesenhada no Remotion.
- Menu, acordeon e galeria: eventos de toque reais em elementos do website.
- Imagens da lista de serviços em mobile seguem comportamento original; sem simulação de hover.
- `public/mobile-capture.mp4` é a captura temporal da interface, codificada a 30fps.
- `public/touches.json` contém os pontos de toque capturados.
- `src/index.tsx` contém a composição e os movimentos de câmera.
- `capture/capture-mobile.mjs` realiza as capturas usando Playwright.
- A composição não adiciona nenhum texto, logotipo de estúdio, tela final ou trilha.

## Reproduzir no GitHub Actions
O workflow `.github/workflows/render-ykeizumi-mobile-reels.yml` executa build local do site, grava a interface, renderiza em Remotion, extrai uma capa e verifica o MP4. A versão publicada do site **não é alterada**.

## Rodar localmente
A partir da raiz do repositório:
```sh
npm run build
python3 -m http.server 4173 --directory dist
```
Em outro terminal:
```sh
cd motion/ykeizumi-mobile-reels
npm install
npx playwright install chromium
npm run capture
npx remotion render src/index.tsx YkeizumiMobileReels ../../release/Ykeizumi_Mobile_Reels_Final.mp4 --codec h264
```
Necessários: Node 20+, npm, Python 3, FFmpeg e navegador Chromium.

## Observações de fidelidade
A tipografia no website utiliza `@font-face` apontando para Avenir local e, em sistemas sem a fonte instalada, usa fallback. Nenhuma fonte proprietária é adicionada ao projeto ou redistribuída. A captura documenta o sistema que de fato executou o site. Verifique o relatório para interações efetivamente capturadas.

## Gate
Este vídeo não exige deploy do website e não deve ser considerado entregue até que o MP4 final seja renderizado e validado por FFprobe/decodificação.
