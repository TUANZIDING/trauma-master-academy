# Case learning v4 review — 2026-10-04

Scope: xABCDE case simulation and chest mini module only. Baseline: 7eac28c60052b5d356bbd29f2cfbaa67ddb8faaf.

## Implemented
- xABCDE: seven information releases, complete synthetic history, prehospital handoff, x/A/B/C/D/E findings, and repeated observation. Shared arrival values remain at the same time during primary survey cards.
- Chest: four releases before the longer course explanation, with numeric vital signs, sampling time/oxygen conditions, synthetic venous tests and ABG, and separate external authentic image reading.
- Editable Chinese/English data and captions. Teacher full record expands in normal document flow. Original chest exercises remain as a folded teacher extension.
- Quiz feedback never changes physiology or the existing scoring system. Trajectories are scripted observations, not guaranteed treatment responses.

## Provenance and medical boundaries
All new patient histories and biochemical data are synthetic, explicitly labelled, and are not recovered real records. Chest arrival HR108/BP116/74/RR26/SpO2 94% before oxygen and 30-minute RR32/SpO2 89% preserve the original case values. Supplemental 30-minute oxygen is nasal 4 L/min; actual FiO2 is unknown. ABG pH7.32/PaCO2 50/PaO2 58/HCO3 25 is synthetic and not a treatment threshold. Do not calculate a precise P/F ratio from an unmeasured FiO2.

The original four-stage longer respiratory trajectory is an independent teaching example, not the new case's timeline. External left pneumothorax CXR and Taylor 2023 CT are not this right-sided synthetic patient; their original source-backed caption/licence sections remain unchanged. Generated bedside scene is contextual only, not diagnostic evidence, examination documentation or a procedural demonstration.

Public sources: ACS ATLS 11 framework https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/atls-11/ ; WSES-AAST 2025 https://doi.org/10.1186/s13017-025-00651-1 ; European bleeding guideline 2023 recommendations 9–10 on serial Hb and lactate https://pmc.ncbi.nlm.nih.gov/articles/PMC9977110/ . No proprietary ATLS algorithms copied. Named clinician signoff remains pending.

## Muse collaboration
Muse reviewed the two public pages and supplied a proposal. Adopted the full-history, gradual-release, explicit oxygen-condition and non-causal feedback suggestions. Independently corrected conflation of the two cases, side mismatch and overconfident shock labelling; those suggestions were not adopted. Model review is not independent clinician certification.

## Validation
Repository validation and JS syntax checks; original anchors and source-backed DOM preservation; actual browser navigation through all seven/four releases, unchanged vitals after choice feedback, terminal next button disabled, Chinese/English switching, teacher disclosures expanded at 557px and 1440px, no horizontal overflow. Authentic adjacent images load. Screenshot saved separately in local review folder.
