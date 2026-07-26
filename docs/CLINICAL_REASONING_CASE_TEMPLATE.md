# Clinical Reasoning Case Template

This template is the default structure for disease and integrated case modules in TraumaMaster Academy. It is a teaching structure, not a bedside algorithm.

## Required Learning Flow

1. **Prehospital notification**: provide mechanism, source, elapsed-time language, and clearly named unknowns.
2. **Problem representation**: ask learners to compress the case into one sentence without anchoring on one diagnosis.
3. **Known / suspected / feared**: separate confirmed information, reasonable concern, and high-consequence uncertainty.
4. **xABCDE priority**: identify the current focus and explain how another axis could change it.
5. **Team task map**: express next work as observation, reporting, resource coordination, and reassessment.
6. **Progressive information release**: reveal examination, trend, investigation, and resource information in rounds.
7. **Investigation limits**: state what each information node answers and what remains unknown.
8. **Patient and system reassessment**: update both clinical priority and capacity constraints.
9. **Structured handover**: communicate situation, background, assessment, resources, uncertainty, and next reassessment owner.
10. **Debrief**: explain what changed, why the priority changed, which misconception appeared, and what needs source or local review.

## Required Clinical Depth Layer

Every new mini-module and simulated case must include all seven elements below. A page is not considered teaching-complete when it contains only a hero image, a static overview, or four generic learning windows.

1. **Mechanism and pathophysiology**: explain how energy, direction, anatomy, and time produce the injury pattern.
2. **Dynamic examination**: release bedside findings in at least two rounds and state what changed from the previous examination.
3. **Vital-sign or functional trajectory**: show at least three time points using a monitor, trend board, or timeline. Any numbers used for simulation must be labeled as illustrative rather than treatment thresholds.
4. **Clinician thinking prompts**: expose short, disciplined questions a clinician uses to avoid anchoring, premature closure, and misreading an isolated test.
5. **Imaging discussion map**: identify the structure or region being reviewed, what the modality can answer, what it cannot exclude, and how it fits current physiology.
6. **Evidence-based management framework**: organize supportive care, reassessment, escalation, and specialty/resource review without publishing drug doses or procedure instructions.
7. **Traceable sources**: show learner-readable source names and links. Keep machine review codes in data attributes or reviewer-only details, not as foreground learner labels.

## Minimum Progressive-Release Dataset

Each simulated case must provide:

- arrival mechanism and elapsed-time context;
- baseline mental status, airway/voice, respiratory status, circulation/perfusion, pain, and temperature when available;
- at least one repeated examination after an intervention, transfer, or elapsed period;
- at least one repeated set of vital or functional measurements;
- an imaging/report node with a clearly stated limitation;
- a resource-state update;
- a final problem representation and next reassessment owner.

If a source document does not contain one of these fields, the case must say “not recorded” or use a clearly marked synthetic teaching value. It must never silently invent a patient fact.

## Required Interaction Contract

- Question
- Learner response area or options
- Submit judgment
- Reveal reference reasoning
- Explanation
- Reassessment question

Answers remain hidden by default. Reference reasoning is not labeled as the only correct answer.

## Evidence Contract

Every clinical teaching statement must remain traceable to a claim ID and one conservative internal status:

- `source_required`
- `source_index_pending_review`
- `evidence_review_required`
- `pending_clinician_review`
- `pending_local_confirmation`
- `pending_deidentification_review`

Each module records source organization, document/version, public URL, last source check, scope of the source, and local-policy dependencies. A source index never automatically approves a claim.

Machine values such as `pending_clinician_review` are reviewer metadata. The learner-facing page should display plain labels such as “指南已核对”“待院内流程确认” or “教师引导复盘”; raw status tokens belong in `data-review-status` attributes or a collapsed reviewer section.

## Safety Contract

Student-facing content may teach observation, reporting, resource coordination, reassessment, handover, and uncertainty management. It must not publish doses, device specifications, treatment thresholds, procedure steps, individualized plans, or unconfirmed local activation rules.
