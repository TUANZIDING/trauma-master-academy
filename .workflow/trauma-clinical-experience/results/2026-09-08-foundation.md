# Evidence-grounded workflow foundation result

- Approval received: `确认执行，使用推荐方案`
- Branch: `codex/evidence-grounded-optimization`
- Selected route: recommended complete integration, foundation and first case gate
- Clinical review rule: claim wording must be checked against traceable guideline evidence; no approval label is inferred from technical validation
- Real-case default: instructor preview until authorization is reconciled
- ATLS/ETM boundary: lawfully held materials may support internal human review only; protected content is not copied

## Implemented

- Interview-first workflow and approval templates
- Canonical claim-level evidence ledger and schema
- Real-case intake/privacy register and schema
- Evidence governance dashboard
- Evidence, privacy, copyright, and source-currency documentation
- Offline evidence-governance validator
- Optional network source-locator verifier
- Conservative student-facing review labels

## Evidence workload at generation

- Canonical claim records: 81
- Evidence review required: 45
- Missing precise evidence location: 63
- Local adaptation required: 21
- Privacy-review claims: 3
- Automatically evidence-verified: 0
- Automatically publishable: 0

## Real-case stop condition

Legacy release wording and pending privacy metadata conflict for `CASE-TRAUMA-003`, `CASE-TRAUMA-004`, and `CASE-TRAUMA-005`. They remain instructor-preview entries, receive `noindex` metadata, and require authorization-record reconciliation before student release or further expansion.

The new `CASE-TRAUMA-006` record contains no patient payload. Its implementation remains blocked pending source-layered interview, de-identification review, and documented teaching authorization.
