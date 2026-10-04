# Three mini-module upgrade — 2026-10-04

Scope: TBI, abdominal injury, polytrauma. Chest reference module and original case/scoring JavaScript unchanged.

Visual design: retain paper/forest/gold identity; case first, high-contrast six-metric snapshot monitor, short clinical facts, progressive reasoning, adjacent real-source imaging, three bedside/specialist cards. Explanations remain editable bilingual text and disclosure panels. Existing real images and licensing captions retained. Generic decorative waveforms and repeated process ribbons removed at runtime.

Evidence: ACS TBI 2024; NICE NG232; WSES liver 2020; bowel 2022; spleen acute-management 2017 and follow-up consensus 2022; European major bleeding sixth edition 2023. Source URLs are visible in the bedside section. These documents were checked against public primary sources; this is not a claim that every specialty has been exhaustively searched for newer guidance.

Muse supplied independent AI clinical review. Adopted: physiology over isolated findings; preserve original case observations; separate unrelated abdominal trajectory; distinguish acute spleen guidance from follow-up consensus; never apply permissive hypotension automatically to possible brain injury. This is not human clinical sign-off. All added teaching content remains pending clinical teacher review.

Data provenance: original synthetic case values retained. New lab samples expressly labelled synthetic teaching additions. Later missing observations display an em dash and never carry arrival values forward. Quiz answers never alter physiology or the original scoring system. Original case interaction retained inside teacher extension.

QA: JavaScript syntax and diff whitespace checked; bilingual parity checked by repository validator. Native Chrome wide-page visual inspection includes TBI entry, abdominal expanded labs and stage progression. Later QA details appended below. Repository validator contains pre-existing forbidden-operation-language failures for professional procedures, so it must not be described as a complete PASS.

Additional native Chrome QA: abdominal stage 3 displays HR118/BP88/56/RR29/lactate4.6 with missing SpO2 as a dash; restart restores arrival. Polytrauma bedside disclosure opened and English view inspected without clipping at wide viewport. Mobile and every legacy interaction were not exhaustively retested. All retained image URLs and local relative links checked; zh/en counts 3866/3866.
