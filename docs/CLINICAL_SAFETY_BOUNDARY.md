# Clinical teaching scope

This is medical education and supervised simulation courseware. It does not accept real-patient inputs to generate diagnosis, prescribing or emergency-care commands, and it does not certify competence or replace institutional authorization.

## Tiered learning

- Interns: recognize observations, report uncertainty and request escalation; participate within instructor-defined scope.
- Residents: study source-qualified decision timing, preparation, key steps, effect checks and failure recognition; practise under supervision and authorization.
- Early attendings: coordinate parallel work, resources, rescue plans, handover ownership and reassessment.

Equipment, imaging and interventions are learning topics, with depth adjusted to the tier. They are not all restricted to communication vocabulary.

## Source-qualified numerical anchors

The October 2026 extension teaches the TXA time window, conditional adult blood-pressure goals, shock-index interpretation and MTP activation examples. Each anchor links its source and specifies applicability, exceptions and local-policy dependence. A number is not a stand-alone instruction for every injured patient.

The 8 October user-authorized extension adds source-qualified adult TXA dosing, hemostatic thresholds, population-specific reference targets and pediatric component-volume examples. The structured ledger data/clinical-pockets.json supplies population, stage, domestic alignment, source locators and escalation limits. It adds no patient-input dose calculator, device-setting calculator or unsupervised invasive operating protocol. Existing skills remain supervised simulation lessons with source links and escalation boundaries. New content requires course-lead clinical review; old release approval does not cover new claims automatically.

## Real-case adaptation

Use only generalized, de-identified text for the new open-pelvic-injury case. Keep the supplied slide deck, original images, identifiers, exact dates, place, occupation and source metadata private. Describe recorded actions separately from classroom questions. Do not invent missing decision context, a missed-injury event, cohort membership or long-term outcome.

The source hash and slide-topic mapping remain in a private review record outside this repository. Public references to the published study do not identify the teaching-case patient.

## Engineering checks and clinical review

- Link, bilingual, quiz, scoring, source-locator and privacy checks establish engineering properties only.
- Source verification does not establish clinician or institutional signoff.
- Eleven legacy detector categories were present at commit fa50476b0fae533d6043a451d625a0baae9b9eeb. Exact occurrence contexts and counts are pinned in data/legacy-boundary-findings.json and reported as warnings requiring clinical review. Changed or new flagged contexts outside byte-identical, source-qualified generated sections still fail validation. The clinical ledger is checked separately; generated blocks are compared exactly to that ledger before the legacy detector runs. These engineering checks do not prove clinical validity.
- No clinical approval is inferred from a successful build, browser check or publication.
- Learner pages use one compact badge; detailed source/review information is in the quality-governance page.
