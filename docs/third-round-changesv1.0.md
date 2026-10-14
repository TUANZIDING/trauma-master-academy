# Third-round change record v1.0

Baseline: 6bb07cb. Request batches: 0–6. Dates use the client date 2026-10-14.

## Progress

- Batch 0: learner/teacher display policy, workstation-path cleanup, tiered scope and flexible review-date checks implemented; full validation passed.
- Batch 1: six independent core pre/post banks (60 items), shuffled display, structured document/transfer lessons and xABCDE three-option stages implemented; full validation passed.
- Batch 2: 50 cards/19 anchors, 2026 reversal update, per-course card filter, portable font search and exact bilingual PDF checks implemented; full validation passed.
- Batches3–6: implemented in sequence; each passed full validation before continuing. Final integration checks passed.

## Decisions

- Source checking does not supply a clinician signature. The ledger remains unsigned until an author enters a genuine reviewer object.
- The abdominal case already contains the requested briefing anchor; preserve it and check it rather than adding a duplicate.
- Clinical proposals are checked against original sources. Conflicting tourniquet placement distances, base-excess signs, transfusion units and pregnancy-arrest time wording will be distinguished by source and setting.
- Real-case missing measurements are not reconstructed. Added scenarios, if needed, are labelled as separate synthetic teaching exercises.
- Existing source media not approved for this release remain excluded.

## Sources checked

- FDA Andexxa safety communication, 2025-12-18: United States sales/manufacturing end 2025-12-22.
- ACEP DOAC clinical policy, August 2026: Level C recommendations, individualized reversal and shared decision making.
- NCS/SCCM focused ICH guideline, 2026-09-24: conditional recommendations; traumatic antiplatelet-related ICH platelet transfusion remains unresolved.
- WS/T 815—2023 official PDF, Chinese record norms, 2018 core quality-system requirements and ICS adult transfer guideline fifth edition: core-course checks under way.

## Verification

Batch 0: npm run validate passed. Clinical reference blocks remain compared with generated ledger content; the old global numerical ban is removed for source-qualified supervised teaching.

- AHA 2025 full supportive text retains four-minute initiation/five-minute completion, while the recommendation starts preparation at recognition. Updated cards state both.
- Chinese R27 iCa at least1.00 mmol/L and R28 extreme-pressure vasopressor criteria verified in the full Chinese shock PDF.

Batch3: Chinese adult TBI2025 full text accessed in the PLA-journal publication. Recommendation17 supports3% saline2 mL/kg/Na155; its mannitol mass/volume conversion is inconsistent, so use the separate ENLS mass dose and local formulation check. The user-supplied CEM edition was not directly accessible.

Batch3 passed full validation. Batch4 keeps original missing values unknown: abdomen FAST/Hb/BE, c-spine GCS components, shock Hb/contrast status, and open-pelvis serial laboratories. Conditional teaching paths do not assert performed treatment. China2015 binder36-hour text remains unverified against primary publication, so NICE24-hour planning is retained.

Batch5 passed full validation;45 concrete OSCE behaviors,9 independent skill pre/post banks, shared0/1/2 scale,10-point total and critical-failure override.
Batch6 source corrections: national event thresholds combine death and critical cases, not deaths alone; BOAST2026 says commence revascularization in1h. National2025 triage diagram and hip first-choice FICB text could not be independently accessed, so not transcribed as verified. Older Chinese ED-washout/6–8h compartment wording is distinguished from BOAST/NICE.

Final verification:31 banks/310 distinct items;45 OSCE criteria;50 cards per language;9 OSCE pages per language. Full validator and399 isolated DOM assertions passed. Browser connection timed out twice; no browser visual regression is claimed. Pocket/OSCE PDF samples were rendered and inspected. Clinical signatures remain null.
