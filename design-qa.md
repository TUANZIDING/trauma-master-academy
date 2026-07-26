# Trauma Skills Academy operation-visual QA

- Review date: 2026-07-26
- Scope: nine skills in `courses/trauma-skill.html`, five capability-route nodes per skill
- Source visual truth:
  - `/var/folders/g1/kzjbr8qs5730p11r920t7s4c0000gn/T/TemporaryItems/NSIRD_screencaptureui_gRAVNa/截屏2026-07-26 上午6.26.21.png` (2628 x 1448)
  - `/var/folders/g1/kzjbr8qs5730p11r920t7s4c0000gn/T/TemporaryItems/NSIRD_screencaptureui_9dBVyb/截屏2026-07-26 上午6.28.23.png` (2456 x 1244)
- Implementation viewport: 1280 x 720 CSS pixels, device scale factor 1
- States reviewed: Chinese UI; intubation, EFAST, and tourniquet route sections; all nine routes programmatically checked
- Implementation screenshots:
  - `docs/screenshots/trauma-skills-realism/intubation-node-photos-v2-viewport.jpg`
  - `docs/screenshots/trauma-skills-realism/efast-route-v2.jpg`
  - `docs/screenshots/trauma-skills-realism/tourniquet-route-v2.jpg`
- Side-by-side comparison input: `docs/screenshots/trauma-skills-realism/reference-implementation-comparison-v2.jpg`

## Visual comparison

- [x] Before/after images were normalized into one side-by-side comparison input and visually inspected.
- [x] Generic brain/plus/loop placeholders were replaced by operation-oriented simulation scenes.
- [x] Every skill presents five different images aligned with recognition, preparation, action, verification, and reassessment.
- [x] Route-card crops preserve the relevant hands, device, patient/manikin, monitor, or team action.
- [x] Typography, cream/teal palette, spacing, card radius, borders, selected state, and page hierarchy remain consistent with the existing design system.
- [x] At 1280 x 720 the five cards remain readable without overlap; the selected node and detail panel remain visually connected.
- [x] Image badges remain legible and do not obscure the action subject.

## Medical-visual integrity

- [x] No generated visual is described as a real patient, real case photograph, or diagnostic image.
- [x] Simulation visuals show supervised training environments and contain no identifiable patient data, brands, or watermarks.
- [x] Synthetic monitor/ultrasound screens carry `合成模拟场景 · 不用于影像判读`.
- [x] EFAST interpretation node uses an authentic open-license Morison-pouch image and carries `真实开放影像 · 仅限所示窗口` plus attribution.
- [x] Images support the teaching task but do not independently authorize an invasive procedure or replace local credentialing and supervision.
- [x] Medical decision routes retain multi-signal logic; no single SpO2, FAST view, blood pressure, or generated image is presented as an automatic invasive-action trigger.

## Functional and technical checks

- [x] All nine skill pages load through the local preview.
- [x] Automated browser audit: 9/9 routes have five images, five unique paths, zero broken images, five provenance labels, and zero broken storyboard images.
- [x] `npm run validate` passed bilingual parity, local-link checks, medical-decision integrity, and visual-asset validation.
- [x] Visual validator confirms 9 skills x 5 node assets, all local raster files present and dimensionally valid.
- [x] Independent clinical/source audit passed; it does not replace formal named clinical-expert release approval.

## Comparison history

1. Initial P1 defect: repeated generic symbols and a synthetic ultrasound-like panel could be mistaken for interpretive teaching material.
2. Fix: mapped five task-specific raster scenes to each skill and reused the same mapping in the storyboard.
3. Safety fix: added persistent simulation/interpretation badges and replaced EFAST node 03 with an authentic open-license image.
4. Post-fix visual review: intubation, EFAST, and tourniquet screenshots show distinct actions, stable cropping, and consistent hierarchy.

final result: passed
