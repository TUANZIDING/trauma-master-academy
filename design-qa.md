# Product Design QA

## Trauma Skills Academy operation-visual QA

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

section result: passed

---

## Homepage cinematic trauma-care-chain hero

- Review date: 2026-07-28
- Source visual truth: `docs/screenshots/homepage-hero/option-2-source.png`
- Source pixels: 1672 x 941
- Implementation screenshot: `docs/screenshots/homepage-hero/implementation-desktop.png`
- Implementation pixels / CSS viewport: 1280 x 720 at device scale factor 1
- Mobile evidence: `docs/screenshots/homepage-hero/implementation-mobile.png`
- Mobile CSS viewport: 390 x 844
- State: Chinese homepage hero; English language-toggle state also tested
- Normalized comparison: `docs/screenshots/homepage-hero/source-implementation-comparison.png`
- Comparison normalization: source aspect-fitted to 1280 x 720 with neutral padding; implementation retained at 1280 x 720; both placed in one 2560 x 720 comparison input

### Full-view comparison evidence

- [x] The selected second concept is the visual source: a continuous ambulance-to-resuscitation-to-reassessment scene with a luminous care-chain line.
- [x] The implementation preserves the existing site header, bilingual navigation, course title, explanatory copy, and three primary actions rather than rasterizing interactive UI.
- [x] The hero image is a project-local raster asset, fills the intended desktop frame without distortion, and retains the ambulance, team, xABCDE board, bedside ultrasound, resource board, and reassessment node.
- [x] The final desktop composition keeps the content readable while preserving the photographic flow and selected warm-ivory / deep-teal / muted-red art direction.
- [x] The mobile layout changes from overlay to stacked copy-and-image, avoiding text collision and preserving an action-focused image crop.

### Focused-region comparison evidence

- Hero-copy region: title hierarchy, eyebrow width, paragraph measure, button alignment, and contrast were inspected at desktop and mobile breakpoints.
- Flow region: xABCDE, bedside, team, and reassessment nodes remain visible; the clinical-scene crop does not remove the high-risk red waveform or terminal reassessment loop.
- A separate close crop was not required because these regions remain legible in the normalized full-view comparison and the 1280 x 720 implementation capture.

### Required fidelity surfaces

- **Fonts and typography:** Existing bilingual font stack and optical weights were retained. Chinese title remains a two-line display heading; paragraph line length stays readable; no truncation was observed.
- **Spacing and layout rhythm:** The selected full-width hero is implemented as one 620-pixel desktop stage with a responsive stacked mobile state. Border radius, outer width, padding, and CTA gaps align with the existing design system.
- **Colors and visual tokens:** Existing ivory, teal, ink, line, shadow, and button tokens remain in use. A controlled ivory readability fade reproduces the selected concept’s left-side negative space without recoloring the clinical scene.
- **Image quality and asset fidelity:** The selected raster source is stored at `assets/generated/homepage/trauma-care-chain-cinematic-v2.png` (1672 x 820), displayed with `object-fit: cover`, and remains sharp at the tested desktop viewport.
- **Copy and content:** Existing Chinese/English course positioning and navigation are unchanged. The image’s short English flow labels are supplemented by bilingual HTML copy, alt text, and an accessible caption.

### Comparison history

1. Initial P2: implementation text extended across clinicians and the waveform, reducing paragraph contrast; the eyebrow also stretched to the full flex width.
2. Fix: added a controlled left-to-right ivory readability layer, constrained the content width, and aligned the flex children to the start.
3. Initial P2: the print/PDF action wrapped to a second line at 1280 pixels.
4. Fix: widened the copy track and adjusted the readability layer so all three primary actions remain on one row without obscuring the care-chain focal region.
5. Post-fix evidence: `implementation-desktop.png` shows a readable two-line title, three aligned actions, and intact xABCDE-to-reassessment imagery; `implementation-mobile.png` shows collision-free stacking.

### Functional checks

- [x] Chinese-to-English language toggle changed the H1 to `Visual Trauma Reasoning Courseware`.
- [x] Primary CTA resolves to `courses/xabcde.html`.
- [x] Core-course CTA resolves to `#modules`.
- [x] Browser console reported zero errors in the tested state.
- [x] Desktop and mobile hero states rendered successfully from the local preview.

### Remaining P3 polish

- The selected generated scene contains English-only embedded micro-labels. These are intentionally retained as part of the chosen artwork; the surrounding interactive UI and accessible description remain bilingual.

final result: passed
