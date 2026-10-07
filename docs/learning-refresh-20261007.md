# Learner-first curriculum refresh — 7 October 2026

## Delivered scope

- Reorganize the homepage around level selection, the care chain, six main courses, nine skills and cases. Move production, equipment and detailed source/review material to `courses/quality-governance.html`.
- Use a white/light-gray background, deep teal `#0d5156`, amber for attention/review and red for x/C threats. Retain letters alongside colors. Keep a single displayed language and the existing bilingual switch.
- Mount three learning objectives, estimated duration, five pretest questions and five posttest questions on 22 static course entries and nine dynamically rendered skills. Store learner level and formative scores locally in the browser; provide a score-clear control.
- Add damage control resuscitation, secondary/tertiary survey, special populations and documentation/handover modules. Keep numerical anchors next to source, applicability and local-policy conditions.
- Add a four-stage, text-only adaptation of a real open-pelvic-injury case and a separate summary of the published IJEM cohort. Do not infer cohort membership, an actual missed injury or an unreported outcome.
- Add nine printable OSCE checklists, each with five criteria scored 0/1/2, separate safety deviations and feedback. The Chinese PDF has nine A4 pages, one skill per page.
- Retain the previously generated course illustrations and the four-lesson disaster redesign. New modules use a left illustration/right explanation layout, approximately 42.5/57.5, with concise core points and expandable detail. Mobile layouts stack naturally.
- Add an optional two-minute scripted simulation timer to the resuscitation module. It releases predefined educational vital-sign states; it is not a physiological prediction model.

## Case privacy

The original slide deck, original images and private provenance record remain outside this repository. The public adaptation omits identity, exact age, dates, location, occupation, resource quantities and source metadata. It uses generalized clinical text and a conceptual teaching illustration. No source PPTX, radiology image or patient photograph is included in this release.

Recorded care is distinguished from discussion prompts. Early CT is recorded in the source, but adequate decision context is not supplied; the adaptation does not judge that decision or generalize CT-first care in shock. Long-term outcome and cohort membership remain explicitly unknown.

## Evidence and review

Key numerical anchors are based on the [European guideline, sixth edition](https://link.springer.com/article/10.1186/s13054-023-04327-7), [NICE NG39](https://www.nice.org.uk/guidance/ng39/chapter/recommendations) and [ACS TQIP transfusion guidance](https://www.facs.org/media/zcjdtrd1/transfusion_guildelines.pdf). Survey modules also link adult and pediatric source locators, with scope identified. Special-population and documentation pages carry their own authoritative references.

The [IJEM 2025 study](https://doi.org/10.1186/s12245-025-00990-5) is presented as a single-center retrospective cohort, not as proof of an MDT mortality benefit. The reported univariate/correlation methods do not support an independent causal interpretation.

These learning questions and checklists are formative tools. They have not been psychometrically validated, have no certification cutoff and do not establish procedural competence. New medical content requires course-lead review and local policy confirmation; engineering validation and publication do not constitute clinical signoff.

## Engineering QA

- Node syntax and repository validation pass. Curriculum checks cover bilingual labels, three objectives, five pre/post items, answer indices, nine OSCE sheets/45 rows and four case/simulation stages.
- Local links, image alternatives and required existing course/skill structures are checked by the repository validators.
- Browser checks cover learner-tier persistence, pre/post scoring, answer preservation across language switches, clearing local results, case reveal/reset, simulation timer/pause/reset, orthopedic language synchronization and skill illustration loading.
- Sampled desktop and 390-pixel mobile views were inspected, including the homepage and disaster lessons; sampled views have no horizontal overflow. Selected text/background combinations exceed 4.5:1. This is not a full-site WCAG audit.
- The nine-page PDF was inspected for pagination, complete skill headings, source fields and feedback rows; representative rendered pages were visually checked.
- Eleven unchanged legacy clinical-detector categories from baseline `fa50476b0fae533d6043a451d625a0baae9b9eeb` remain visible warnings. The validator pins exact occurrence-context hashes and counts. New or changed flagged contexts still fail. Negative checks confirmed rejection of a newly introduced threshold and a changed legacy device-setting context.
- Staged files are checked for supplied source identifiers and accidental inclusion of original clinical media before publication.

## Release verification

After publishing, verify remote main against the local commit, the GitHub Pages deployment outcome, HTTP success and served/local content equality for the homepage, new modules, runtime assets and OSCE PDF. Report publication and clinical review as separate states.
