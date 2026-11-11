# Math Brands | Ykeizumi Mobile Reels V5.1 — Technical QA

## Verified deliverables
- H264 1080x1920, 30 fps, 840 frames, 28.0 seconds — PASS
- Full FFmpeg decode, six independent scene previews and their decode — PASS
- 36 high-resolution transition test frames in storyboard — GENERATED
- Original Chromium mobile 390x844 DPR3; full source video + natural mobile interactions.
- Hero video actual measured rectangle: {"video": {"x": 12, "y": 12, "w": 366, "h": 600}, "container": {"x": 12, "y": 12, "w": 366, "h": 600}, "hero": {"x": 12, "y": 12, "w": 366, "h": 600}, "effectiveRadius": 15}
- Hero vector projected in final pixel coordinates; radius only morphs after zoom-in.
- 18 original DOM layers, with clean base capture and real logo/font/content.
- Three original intro line masks; three service card reveals, original gallery and two accordion selections.
- Six original touches: menu-open, menu-close, sector-second, sector-third, gallery-next-1, gallery-next-2
- Giant sector photography suppressed only in recording; deployed website untouched.

## Timeline
- 0-135 opening; 135-285 Hero; 285-345 Intro; 345-435 Services;
- 435-630 original accordions; 630-840 gallery.

## Creative verification
Automated QA is not a replacement for reviewing full video rhythm, pixel geometry and readability.
Director approval remains pending.

## Source
- motion/ykeizumi-mobile-reels/src/index.tsx
- motion/ykeizumi-mobile-reels/capture/capture-mobile-v5.mjs
- motion/ykeizumi-mobile-reels/public/v5-layer-manifest.json
- motion/ykeizumi-mobile-reels/public/v5-layers/*.png
- motion/ykeizumi-mobile-reels/public/mobile-capture-v5.mp4
