# Visual learning revision v2 — 2026-10-04

Teacher preview; claim-level clinical review remains pending. This is a presentation and learning-flow revision, not a new guideline edition or external expert approval.

Muse delivered three public-course packages: trauma-core-visual-v2.zip, trauma-organ-visual-v2.zip, trauma-skills-cases-visual-v2.zip. Codex selectively integrated their navigation, card layout and progressive explanation patterns against main bf4c3af. Entire generated pages were not substituted.

## Implemented

- Retained/restored useful conceptual context: homepage care-chain scene, trauma-bay team scene, care-chain scene and polytrauma team context. Labels distinguish synthetic context from diagnostic evidence and the course patient.
- xABCDE has an editable six-cell map; reading cards prioritise the image, observation cue and evidence limit. Full captions and licences remain accessible in details.
- Four organ modules keep their audited images/captions; Muse organ-card styling is used alongside the existing source-backed reading tasks.
- Nine skills share a five-node compact navigator, one active visual/video-source task, three existing source-backed cues and expandable explanations. Simulation decisions and scoring remain in the original engine.
- Three long cases use question–comparison–new information–reassessment cards for later rounds; complete original teacher tables remain expandable.
- Small-screen navigation scrolls horizontally instead of covering a large portion of the lesson.

## Review decisions

- Rejected the proposed replacement of the homepage scene with a plain letter board.
- Did not import Muse's simplified skill-key-point script, including an airway-sequencing statement that could mislead learners.
- Did not replace verified organ captions with new fragments containing inconsistent image/patient orientation. No new or excluded diagnostic images were copied.
- Replaced invented “before” case assertions with a comparison task; after-information and questions are cloned from the original disclosure records.
- Corrected the overly absolute statement that laboratory values belong only in a severity column.
- Preserved language toggle rules instead of adopting CSS that made both languages visible.

## Validation

All existing HTML IDs retained. Original disclosure text unchanged: abdominal case 8, polytrauma case 10, c-spine/hip case 7, pelvic case 6. All 38 previously published source-backed images are byte-identical. npm run validate passes bilingual parity, local links, image alternatives, teaching-case checks and all nine skill data/simulation checks; JavaScript syntax and diff whitespace checks pass.

Browser checks: desktop homepage, xABCDE map, TBI reading card and English toggle; BVM node switching, explanation expansion and Chinese toggle; 390px xABCDE/case viewport without horizontal page overflow. These checks do not constitute clinical sign-off or a complete review of every responsive device or official video playback.

Rollback: bf4c3afc3bb8f3269a88f2badc01438d9d203c43.
