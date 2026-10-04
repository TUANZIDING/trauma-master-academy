# Source-backed teaching update — 4 October 2026

Muse prepared three parallel content/media packages. Codex checked source articles, official guideline pages/PDFs, figure captions and image-specific permissions, then integrated concise bilingual learning windows. This is AI-assisted source checking, not approval by an independent physician panel. New clinical content remains pending clinical teacher/specialty review.

## Coverage

- Five core courses: xABCDE, trauma-bay orientation, trauma care chain, pelvic trauma, trauma/disaster medicine.
- Four disease modules: TBI, chest, abdominal injury, polytrauma.
- Three existing teaching cases: added external reading references and teaching-rhythm tables. Original staged case facts, vital values, chronology and outcomes were retained. External images do not add facts about course patients.
- Nine skills: 45 learning nodes use real source photographs, official video links, or explicit reasoning tasks. They no longer render the previous generated procedural images or synthetic MP4 clips. Existing simulation stages, decisions and assessment functions remain.

## Evidence and permissions

`media-sources.csv` records 38 original images with author, source page, original caption, specific licence, licence URL and SHA-256. Thirty-two Wikimedia files were checked against their source metadata and original hashes; six publisher figures were checked against article-level licences and figure-specific attribution. Original media are unchanged. CC BY-SA images retain that licence; public-domain notices and all third-party licences remain attached to their respective images. The course's own licence does not override third-party rights.

`claim-evidence.csv` maps 54 additions to sources and locations. Guideline versions are explicit: ACS TBI 2024, ACS chest 2025, WSES–AAST thoracic trauma 2025, European bleeding guideline sixth edition 2023, NICE NG39 live recommendations, WSES liver 2020/bowel 2022/splenic follow-up 2022, WHO BEC 2018 and current WHO triage/checklist resources. DAS 2025 difficult intubation guidance has an adult perioperative scope; it is not presented as a trauma-specific universal protocol.

Key corrections: negative EFAST cannot exclude all thoracic/abdominal injuries; physiology guides investigation and escalation; permissive hypotension has TBI exceptions; static CT does not prove paradoxical breathing; a single image does not establish operative indication; case reports do not create general rules. C2 follow-up images are labelled follow-up rather than acute imaging. Pelvic-binder masking is a case observation, not a universal removal instruction.

Excluded: a PMC figure incorporating third-party Radiopaedia material under CC BY-NC-SA; an iatrogenic acupuncture pneumothorax image as an adult-trauma main illustration; two pelvic figures without independently confirmed reuse permission. AO/ACS copyrighted illustrations were not copied or hotlinked. Existing original deidentified case images were retained separately.

`video-sources.csv` records ten official source-page references. Videos are linked rather than downloaded or republished. Official page/video-entry verification is distinct from actual playback: the WHO simulation intro played in native Chrome; full playback of all ten videos has not been independently completed. Network availability may vary. Emergency front-of-neck airway has no invented video substitute.

## Validation

`npm run validate` checks bilingual pairing, local links and alt text, case/course structure, student review labels, decision/assessment structure and authentic skill media provenance. Visual contracts now check source-backed media and learning-node integrity instead of requiring six generated images per lesson or five unique generated skill images.

The 38 media hashes matched the manifest. Original case release-card numbers were compared with the published baseline: 10 polytrauma, 7 cervical/hip and 8 abdominal rounds retained. Original simulation data/scoring files were not modified. Browser checks covered homepage rendering, TBI CT/English/source disclosure, BVM node switching and simulation progression, and polytrauma external-image separation. Mobile and full video playback require further classroom-network checks.
