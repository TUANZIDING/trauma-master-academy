# Trauma Disaster Course Audit

Audit date: 2026-06-30  
Target course: `TRAUMA-ACADEMY-005`  
Release state: `GO_WITH_CLINICAL_REVIEW`

## Existing Project Shape

- Static GitHub Pages-friendly site using HTML, CSS, and a small shared JavaScript file.
- Portal lives in `index.html`; course pages live in `courses/`.
- Shared style and interaction code live in `assets/site.css` and `assets/site.js`.
- Validation is centralized in `scripts/validate.mjs`.
- Existing data files under `data/` preserve source status and synthetic case metadata.

## Reusable Course Patterns

- Course shell: `reader-hero`, `clinical-overview`, `reader-layout`, `side-nav`, and `lesson-stack`.
- Bilingual mechanism: explicit `.zh` and `.en` spans controlled by `data-set-lang`.
- Review labels: learner-facing labels with raw review status stored in data attributes or source blocks.
- Safety boundary: courseware is education and simulation preparation only.
- Current xABCDE case interaction can be extended into the trauma-disaster challenge mode.

## Existing Assets to Reuse

| Asset | Current file | Use in new course | Review state |
|---|---|---|---|
| xABCDE overview | `assets/images/xabcde/overview/xabcde-overview-full-800v1.0.webp` | Lesson 1 overview | pending_clinician_review |
| Observe Cues | `assets/images/xabcde/nodes/observe-cues-800v1.0.webp` | Lesson 1 visual explanation | pending_clinician_review |
| Reasoning Loop | `assets/images/xabcde/overview/reasoning-loop-800v1.0.webp` | Lesson 1 guided reasoning | pending_clinician_review |
| Trauma Team Positioning | `assets/images/xabcde/nodes/team-positioning-800v1.0.webp` | Lesson 1 role assignment | pending_clinician_review |
| Reassessment Questions | `assets/images/xabcde/nodes/reassessment-questions-800v1.0.webp` | Lesson 1 reassessment | pending_clinician_review |
| x stage | `assets/images/xabcde/stages/x-hemorrhage-800v1.0.webp` | Lesson 2 stage card | pending_clinician_review |
| A stage | `assets/images/xabcde/stages/a-airway-cspine-800v1.0.webp` | Lesson 2 stage card | pending_clinician_review |
| B stage | `assets/images/xabcde/stages/b-breathing-800v1.0.webp` | Lesson 2 stage card | pending_clinician_review |
| C stage | `assets/images/xabcde/stages/c-circulation-800v1.0.webp` | Lesson 2 stage card | pending_clinician_review |
| D stage | `assets/images/xabcde/stages/d-disability-800v1.0.webp` | Lesson 2 stage card | pending_clinician_review |
| E stage | `assets/images/xabcde/stages/e-exposure-800v1.0.webp` | Lesson 2 stage card | pending_clinician_review |

## Gaps

- No dedicated trauma-disaster course page exists.
- No instructor-mode control surface exists.
- No disaster resource panel exists.
- No mass-casualty triage board exists.
- No local disaster protocol has been confirmed.
- No triage algorithm is approved as the course standard.

## Medical Boundary

The new course must translate all trauma and disaster concepts into observation, reporting, resource coordination, and reassessment. It must not publish doses, device sizes, treatment thresholds, operation sequences, or local activation rules.
