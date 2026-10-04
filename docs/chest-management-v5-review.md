# Chest management teaching update — 2026-10-04

Scope: `courses/chest-trauma-mini.html#management` and a scoped stylesheet. Baseline: 5439eba. Every byte of the course outside this section and the added stylesheet link remains unchanged. Cases, vitals, scoring, source-backed radiographs and other modules are preserved.

## Content and source mapping

- Bedside emergency branches: WSES–AAST Thoracic Trauma 2025, Pleural injuries and Lung parenchymal injuries. Suspected tension physiology with compromise warrants emergency treatment without imaging delay; physiological deterioration takes precedence over output thresholds.
- Chest tube six-step teaching synthesis: Merck Professional, How To Do Tube and Catheter Thoracostomy, Step-by-Step Description; BTS 2023 Online Appendix 4, insertion, side holes and fixation. Blunt dissection is explicitly separate from Seldinger technique. Local device choice and operator competence remain necessary.
- Decompression: Merck Professional, How To Do Needle Thoracostomy, indications, landmarks, aftercare and complications; WSES–AAST 2025 Pleural injuries. Needle decompression is a bridge; failure or recurrence requires immediate reassessment and definitive drainage as appropriate.
- Drain care: BTS 2023 Online Appendix 8, valve/water-seal setup and Troubleshooting. No swing does not prove safety; clamping an ongoing air leak can cause tension. Non-traumatic effusion volume rules are not transferred to traumatic bleeding.
- Respiratory care and analgesia: ACS Chest Wall Injuries Best Practices 2025; WSES–AAST 2025 Lung parenchymal injuries. Support is individualised to physiology; the label flail chest alone does not require intubation.
- Specialist pathways: WSES–AAST 2025 Chest wall/Pleural injuries; WSES/CWIS SSRF 2024 PS1, PS2, PS3. SSRF timing applies to eligible patients; instability prioritises resuscitation and haemostasis. No fabricated VATS deadline.

## Primary source URLs

- https://link.springer.com/article/10.1186/s13017-025-00651-1
- https://www.facs.org/media/qdgliayt/2025_tr_bestpracticesguidelines_chest-wall.pdf
- https://link.springer.com/article/10.1186/s13017-024-00559-2
- https://www.brit-thoracic.org.uk/document-library/clinical-statements/pleural-procedures/online-appendix-4-pleural-procedures-intercostal-drain-insertion/
- https://www.brit-thoracic.org.uk/document-library/clinical-statements/pleural-procedures/online-appendix-8-pleural-procedures-chest-drain-bottle/
- https://www.merckmanuals.com/professional/pulmonary-disorders/how-to-do-pulmonary-procedures/how-to-do-tube-and-catheter-thoracostomy
- https://www.merckmanuals.com/en-ca/professional/pulmonary-disorders/how-to-do-pulmonary-procedures/how-to-do-needle-thoracostomy
- https://www.merckmanuals.com/professional/multimedia/video/how-to-do-tube-thoracostomy

## Media and permission

The existing authentic photo `assets/source-backed/skill-chesttube-02.jpg` is reused, without modification, proportional display only. Johntex, “chest drain - bedside with fluids”, CC BY 2.5. Original source and licence are beside the photograph. It is an external device example, not this synthetic patient and not proof of a correctly configured system. SHA256: 0d03c2e6dd2c6e2564669bc6324b1d03b290072b343a4d7a89aa6d3b9e45a5b9.

- https://commons.wikimedia.org/wiki/File:Chest_drain_-_bedside_with_fluids.jpg
- https://creativecommons.org/licenses/by/2.5/

BTS figures and Merck videos are linked only at their original pages; none are copied, embedded or hotlinked. Original pages were checked; complete video playback was not confirmed. No new fabricated anatomy, radiographs or procedure videos were generated.

## Collaboration and validation

Muse supplied an independent AI review in the existing “创伤五课公开来源升级” side chat: procedural order, emergency physiology, drainage management, specialist escalation and permission boundaries. Codex checked primary sources and implemented the scoped update. This is AI-assisted preparation, not a named human expert endorsement or clinical sign-off. New clinical content remains pending clinical teacher review.

`git diff --check`, student-status audit and both skill validators pass. The general validator confirms bilingual parity (3720/3720), local links, image alt text, JSON and structure, but its global keyword gate fails: it flags existing synthetic oxygen records and new educational terms such as contraindications/tube size, including the negative sentence that flail chest does not require intubation. The gate was not weakened or bypassed; `npm run validate` is not a full pass. Actual browser checks at 1440px and 557px included all six management disclosures expanded and English switching; no horizontal document overflow was detected. Real photograph loaded. Screenshots retained locally under `/Users/dinghaixiang/Desktop/chest-management-v5-review/`.
