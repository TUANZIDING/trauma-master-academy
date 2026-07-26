# xABCDE Course Audit

Audit date: 2026-06-29  
Branch: `feature/xabcde-visual-learning`  
Page: `courses/xabcde.html#stages`  
Reference: `https://2023anita.github.io/anesthesia-teaching-courseware/hfs-mvd-anesthesia-course/index-standalone.html`

## Scope Checked

- Project structure: `index.html`, `courses/`, `assets/`, `docs/`, `scripts/`, `data/` status.
- xABCDE page: `courses/xabcde.html`.
- Shared CSS: `assets/site.css`.
- JavaScript: `assets/site.js`.
- Visual assets: `assets/generated/overview/`, `assets/generated/nodes/`, `assets/generated/stages/`, `assets/generated/prompts/`.
- Generation scripts: `scripts/create-generated-assets.mjs`, `scripts/create-xabcde-stage-assets.mjs`.
- Validation: `scripts/validate.mjs`.
- Obsidian input path: `/Users/dinghaixiang/Documents/obsdian_Vault/40-临床知识库`.
- Audit screenshots: `docs/screenshots/xabcde-audit/`.

## Current Strengths

- The page already has a coherent bilingual shell, sticky top navigation, side navigation, and conservative safety boundary.
- The xABCDE overview and six stage illustrations give learners visual anchors.
- Generated visuals are SVG, scalable, and free of embedded clinical instructions.
- The current validation script checks page existence, bilingual parity, local links, forbidden directive language, claim review status, and generated asset prompt records.
- The page does not use drug doses, numeric treatment thresholds, or real-patient identifiable images.

## Current Defects

- The page still reads partly like an electronic handout: it has stages and cards, but the full learning path from visual intuition to case decision and reassessment is not yet obvious on first view.
- Developer-facing statuses such as `source_required` and `visual_asset_pending_review` are visible to ordinary learners.
- The stage visuals mostly support observation, but not every major concept has a one-question image with metadata exposed through data files.
- The x, A, B, C, D, and E stage cards do not yet share a complete teaching template with clinical question, visual thinking prompt, mechanism, judgement, common error, reassessment, and source.
- The case matrix is static; it does not release information progressively or update patient state.
- Obsidian knowledge is used as structure input, but the page does not yet map each knowledge block back to source note paths.
- There is no formal image backlog for missing mechanism, exam, procedure, comparison, radiology, and reassessment visuals.
- Print styling exists only indirectly through browser defaults; navigation and interactive controls need print-specific hiding.

## Difference From Reference Site

- The reference anesthesia courseware makes each image feel like a course figure with a caption and a specific learning role.
- The reference page has strong first-screen clarity: the learner can immediately see the teaching context and why visuals matter.
- The reference page uses image cards as teaching previews rather than status-heavy development cards.
- The current xABCDE page has a stronger safety framework, but less polished content choreography.
- The reference site does not expose internal review-state codes to learners; TraumaMaster should show learner-facing review language and keep raw codes in audit mode or data attributes.

## P0 Must Fix

| Issue | Files | Suggested change | Acceptance standard |
|---|---|---|---|
| Learner cannot instantly choose learning mode | `courses/xabcde.html`, `assets/site.css` | Add three visible mode entries: quick review, system learning, case reasoning | Within 10 seconds, learner can identify what the course teaches and where to start |
| Internal review codes visible to learner | `courses/xabcde.html`, `assets/site.css`, `assets/site.js` | Replace visible raw codes with learner labels: 待审核, 教学示意, 来源可查; keep raw codes in `data-review-status` or audit sections | No ordinary learner card displays `source_required` or `visual_asset_pending_review` as primary text |
| No progressive case mode | `courses/xabcde.html`, `assets/site.js`, `data/xabcde-cases.json` | Add one synthetic staged case with monitor state and decision feedback | Case mode releases information in stages and shows effect on time/state |
| Image asset metadata missing | `data/xabcde-assets.json`, `docs/xabcde-image-backlog.md` | Create asset registry and backlog | Every displayed core image has metadata and missing image needs are explicit |
| Obsidian mapping not explicit | `data/xabcde-course.json`, `docs/xabcde-obsidian-mapping.md` | Map knowledge blocks to note paths and review state | No Obsidian-derived claim appears without source note path and pending review state |

## P1 Important Improvements

| Issue | Files | Suggested change | Acceptance standard |
|---|---|---|---|
| x/A need complete demonstration depth | `courses/xabcde.html`, `data/xabcde-course.json` | Build x and A sections with clinical question, image, think prompt, mechanism, team action, common error, reassessment | x and A can serve as templates for B/C/D/E |
| Visual hierarchy still dense in stage area | `assets/site.css` | Add stronger section anchors, smaller line lengths, and teaching panels | Page feels like a course module, not a card inventory |
| Print/export not curated | `assets/site.css` | Add print media rules hiding nav/buttons and keeping content readable | Print preview excludes navigation, buttons, and debug/audit controls |
| References lack structured page support | `data/xabcde-references.json`, `courses/xabcde.html` | Add reference dashboard with organization, year, source type, URL, review status | Learner sees source categories without raw developer labels |

## P2 Later Enhancements

- Generate or source real licensed radiology teaching images for chest X-ray, CT, and ultrasound examples.
- Add complete B/C/D/E deep sections after x and A are accepted.
- Build teacher mode for detailed raw review codes, source paths, and clinician signoff fields.
- Add keyboard shortcuts for case simulation choices.
- Add downloadable instructor PDF after clinician review.

## Screenshot Evidence

- `docs/screenshots/xabcde-audit/01-first-screen.png`
- `docs/screenshots/xabcde-audit/02-overview-map.png`
- `docs/screenshots/xabcde-audit/03-stage-1.png`
- `docs/screenshots/xabcde-audit/03-stage-2.png`
- `docs/screenshots/xabcde-audit/03-stage-3.png`
- `docs/screenshots/xabcde-audit/03-stage-4.png`
- `docs/screenshots/xabcde-audit/03-stage-5.png`
- `docs/screenshots/xabcde-audit/03-stage-6.png`
- `docs/screenshots/xabcde-audit/04-case-matrix.png`
- `docs/screenshots/xabcde-audit/05-mobile-stages.png`

## Medical Safety Audit

- Current content remains educational and avoids dose, device-size, oxygen/ventilator setting, or numeric threshold triggers.
- Existing Obsidian notes include treatment and resource-path language; public student-facing pages must translate these into observation, team reporting, resource discussion, and reassessment.
- Real or user-provided cases remain excluded from public student pages until de-identification and clinician review.
