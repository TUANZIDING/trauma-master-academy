# Mini modules v8 — annotated corrections

Date: 2026-10-04. Baseline: 321b9ad. Scope: 11 user annotations on TBI, abdominal injury and polytrauma mini modules.

## Changes and provenance

1. TBI +35 min: six complete observations; original GCS 12 (E3 V4 M5) retained. Added measurements are marked ※.
2. Neurologic board: selectable arrival/+35 min snapshots, original pupil changes preserved; V4 is unchanged, M6 becomes M5. No live-monitor claim.
3–5. Abdomen: GCS components, later SpO₂ and temperatures added as synthetic teaching assumptions; lactate remains on the laboratory sheet.
6. eFAST limitation receives a prominent bilingual warning. Negative FAST does not exclude bleeding; FAST is not a prerequisite or screening gate for indicated CT.
7. Independent abdominal trend example receives a ChatGPT observation illustration and selectable snapshots. Its 86→105 heart-rate series is explicitly separate from the entrance case's 96→118 series.
8. Polytrauma +10 min: missing observations added and marked. Severe hypoxaemia despite the synthetic oxygen context prompts immediate escalation.
9. All three cases display four rounds numbered 1–4. Two original information items remain within each round without misleading 1/3/5/7 headers. Polytrauma deterioration appears in round 4.
10. User-described hospital collaboration principle is presented as teaching synthesis, not a verified hospital policy document. Early contrast CT requires an appropriate resuscitation response and safe transfer. Persistent nonresponders require rescue/source control. Cervical protection is individualised; pelvic binders are selective, temporary measures for suspected bleeding pelvic-ring injury rather than every pelvic fracture.
11. Polytrauma receives an illustrated, selectable multi-axis comparison board.

Exact assumptions: `synthetic-additions.json`; authoritative case data: `assets/mini-clinical-v7-data.json`. Original oxygen conditions remain explicitly unrecorded. Later oxygen contexts are synthetic observations, not prescribed doses. New values are not recovered patient records. Quiz answers do not change physiology or external scoring. Original source images, legacy teaching records and scoring scripts are preserved.

## Evidence mapping

| Teaching claim | Public primary source and locator |
| --- | --- |
| Negative FAST cannot exclude abdominal/retroperitoneal haemorrhage; CT in stable/responding patients; no FAST gate | [NICE NG39 recommendations](https://www.nice.org.uk/guidance/ng39/chapter/Recommendations), 1.5.29–1.5.34 |
| Persistent nonresponse requires damage-control pathway | NG39 1.5.37 |
| Early purpose-made binder for suspected pelvic bleeding after high-energy blunt trauma | NG39 1.5.3 |
| Manual protection during airway care, appropriate collar, airway/deformity exceptions and recheck | [NICE NG41 recommendations](https://www.nice.org.uk/guidance/NG41/chapter/recommendations), 1.1.2 and 1.1.11–1.1.14 |
| Pelvic CT and specialist-led binder removal | [NICE NG37 recommendations](https://www.nice.org.uk/guidance/ng37/chapter/recommendations), pelvic fracture assessment/management |
| Physiology-based pelvic pathway, trochanter-level binder, temporary use | [WSES pelvic trauma 2017](https://link.springer.com/article/10.1186/s13017-017-0117-6), classification table and non-invasive external pelvic compression section |

NICE recommendations were checked through official search-index excerpts; direct page/PDF retrieval was blocked. WSES full text was retrieved. This does not establish a new guideline version or a completed human clinical review.

## Muse collaboration

Actual Muse review received in the existing “创伤五课公开来源升级” thread. Adopted: explicit synthetic provenance, original oxygen context unknown, CT response/transfer conditions, selective binders, urgent action for persistent hypoxaemia. Not adopted: replacing already recorded pupil or FAST findings, assigning a proven cause to GCS change, automatic timed binder loosening, or converting SpO₂ into an inferred PaO₂. AI review is not clinical teacher sign-off; new content remains marked for teacher review.

## Illustration and QA

ChatGPT generated a no-text three-panel observation scene (2172×724). CSS displays each panel; clinical values and bilingual explanations remain editable text. People, bedside signs and ultrasound screens are illustrative and are not diagnostic evidence or procedure demonstrations.

Verified in native Chrome: wide TBI comparison and +35 min toggle; polytrauma rounds 1→2→3→4 with late snapshot only in round 4; complete abdominal +25 min observations; 400-pixel monitor and 557×664 responsive cards; hospital pathway disclosure; independent abdominal later-example toggle. Screenshot: `abdomen-narrow.png`.

Static checks passed: JavaScript syntax, whitespace, six complete metrics at both observations, GCS component sums, JSON/runtime consistency, paired translations and preservation of original image references. These checks do not establish medical certification.
