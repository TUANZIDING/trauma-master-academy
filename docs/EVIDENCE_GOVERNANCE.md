# Evidence governance / 医学证据治理

## Purpose / 目的

TraumaMaster Academy separates technical validity from medical validity. A working page, a live source URL, or a passing test does not establish that a clinical statement is correct.

TraumaMaster Academy 将技术正确与医学正确分开。页面可运行、来源链接可访问或验证器通过，均不等于临床陈述已经正确反映指南。

## Claim-level interface / 主张级接口

Every generalizable student-facing medical statement must map to one ledger record containing:

`claim_id`, `claim_zh`, `claim_en`, `teaching_context`, `source_organization`, `source_title`, `publication_or_update_year`, `source_url`, `evidence_location`, `evidence_level`, `review_status`, `local_adaptation_required`, and `last_verified_at`.

## Independent gates / 独立门禁

1. `technical_validated`: files, links, interactions, and data structures work.
2. `source_locator_verified`: the identified source and version can be located.
3. `evidence_verified`: the cited location directly supports the scoped teaching claim.
4. `bilingual_reviewed`: Chinese and English preserve the same medical meaning.
5. `pending_clinician_review`: clinical teaching wording still needs domain review.
6. `pending_local_confirmation`: role, activation, transfer, and institutional workflow remain local.
7. `privacy_authorized`: the derived case or image is de-identified and authorized for its stated audience.
8. `publishable`: all gates required by the intended audience are satisfied.

No aggregate release decision may automatically advance an individual claim through these gates.

任何课程级或项目级发布决定均不得自动替代逐条主张审核。

## Evidence levels / 证据层级

- Official guideline or formal public-health framework.
- Professional-society guideline or formal consensus.
- Systematic review.
- Primary peer-reviewed study.
- Public course-description locator only.
- Local protocol requiring written confirmation.
- Clinician experience input for case structure only.
- Teaching illustration with no evidentiary role.

## Rights boundary / 权利边界

The project may record bibliographic metadata and reviewer-created paraphrases within lawful use. Licensed ATLS/ETM materials remain internal review sources. Protected text, tables, algorithms, screenshots, or figures are not placed in the repository, prompts, generated datasets, or public pages.

项目可记录书目信息和审校者自行形成的概括。合法持有的 ATLS/ETM 资料仅作为内部人工审校来源，不进入仓库、提示词、生成数据或公开网页。
