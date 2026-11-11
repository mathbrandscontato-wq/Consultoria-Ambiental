# Ykeizumi | Mobile Reels V4 — Technical QA

## Output verified by automated render tests
- MP4: H264, 1080×1920, 30 FPS, 28.0 s, 840 frames.
- Full FFmpeg decode of video: PASS.
- Original website captured in headless mobile Chromium at 390×844, DPR3, 704 source frames.
- Original hero video playback: PASS.
- Real taps: menu-open, menu-close, sector-second, sector-third, gallery-next-1, gallery-next-2.
- Giant photography suppressed ONLY inside the local capture browser: PASS.
- Screen-space SVG projected per output frame; no layer transform applied to vector: source-code check PASS.
- Maximal zoom vector inspection frame: release/Ykeizumi_Mobile_Reels_V4_VectorCorner.png.
- Contact sheet and cover generated from final encoded MP4.

## Director’s cut adjustments versus V3
- No 13.5× CSS scaling of a browser-composited SVG; explicit vector path coordinates per frame.
- 28s target rather than 29s (4.533s geometric opening + 23.467s original mobile interface).
- Quintic smooth trajectories for corner, radius, zoom and exit; continuous small-scale editorial camera track.
- Original native menu, accordion and responsive gallery events recaptured and rescheduled.
- Single continuous Hermite browser scroll through introduction and services rather than independent stop/start arcs.
- 3× browser capture scale, so the source interface is not enlarged beyond captured pixel dimensions.
- No added labels, ornaments, phone mockups, proprietary fonts, or publication changes.

## Creative review required
- Automated validation does not certify final cinematic taste, visual pacing or frame-by-frame subjective quality.
- Inspect review sheet, vector maximum, full 28s video and interactions before creative approval.
- No changes to deployed website, and V3 remains accessible in its original branch.

## Editable assets
- motion/ykeizumi-mobile-reels/src/index.tsx
- motion/ykeizumi-mobile-reels/capture/capture-mobile-v4.mjs
- motion/ykeizumi-mobile-reels/public/mobile-capture-v4.mp4
- motion/ykeizumi-mobile-reels/public/touches-v4.json
- motion/ykeizumi-mobile-reels/capture-report-v4.json
