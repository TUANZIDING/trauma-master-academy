# Trauma Disaster Course Plan

## Course Identity

- Chinese title: 创伤急救与灾难医学总论
- English title: Introduction to Trauma Resuscitation and Disaster Medicine
- Course ID: `TRAUMA-ACADEMY-005`
- Duration: 4 lessons, 45 minutes each, 180 minutes total
- Release state: `GO_WITH_CLINICAL_REVIEW`

## Delivery Model

- Static course page under `courses/trauma-disaster-medicine.html`.
- Portal entry with course start, instructor mode, simulation, teaching materials, and source review anchors.
- Three modes: Learner Mode, Case Challenge Mode, Instructor Mode.
- No backend, no patient-specific logic, no hospital policy engine.

## Development Order

1. Add data files for course metadata, cases, assets, and references.
2. Add documentation for audit, objectives, content map, assets, cases, instructor mode, and medical review.
3. Add visual assets and prompt records for disaster overview, resource panel, and triage board.
4. Add the course page using existing reader templates.
5. Add shared JavaScript for mode switching, instructor controls, challenge state, and triage-board movement.
6. Extend validation to cover new files and safety boundaries.
7. Verify with `npm run validate` and browser layout checks.

## File Index

- `data/trauma-disaster-course.json`
- `data/trauma-disaster-cases.json`
- `data/trauma-disaster-assets.json`
- `data/trauma-disaster-references.json`
- `docs/trauma-disaster-course-audit.md`
- `docs/trauma-disaster-course-plan.md`
- `docs/trauma-disaster-learning-objectives.md`
- `docs/trauma-disaster-content-map.md`
- `docs/trauma-disaster-asset-map.md`
- `docs/trauma-disaster-case-plan.md`
- `docs/trauma-disaster-instructor-mode.md`
- `docs/trauma-disaster-medical-review.md`

## Acceptance Criteria

- The portal shows the new course card and five course entry links.
- The new course page contains four 45-minute lessons.
- The three modes visibly change the learning surface.
- Instructor controls can reveal answers, advance information, pause, trigger deterioration, show vitals, show team roles, start countdown, start debrief, reset, and export the lesson plan.
- Challenge mode records selection count, elapsed time, and synthetic case state.
- Disaster resource panel displays the required resource categories.
- Triage board supports drag-and-drop on desktop and buttons on mobile.
- All claim blocks and data files keep conservative review status.
