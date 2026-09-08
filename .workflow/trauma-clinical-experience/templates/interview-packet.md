# Clinical Experience Interview Packet

## 1. Source layers

Record each statement as exactly one of:

- `medical_record_fact`
- `clinician_recollection`
- `imaging_report`
- `laboratory_report`
- `teaching_inference`
- `guideline_supported_claim`
- `local_protocol_pending`

## 2. Timeline

| Relative time | Event | Source layer | Confidence | Conflict ID |
|---|---|---|---|---|
| | | | | |

Never invent a missing time, examination, investigation, or outcome. Use `not_recorded` when absent.

## 3. Conflicts

| Conflict ID | Version A | Version B | Why it matters | Clarification question | Status |
|---|---|---|---|---|---|
| | | | | | open |

## 4. Clinical reasoning frame

- Known:
- Unknown:
- Feared:
- Current xABCDE focus:
- Competing priority:
- Team resources entering discussion:
- Next patient reassessment:
- Next system reassessment:

## 5. Progressive release

For every round record: `initial presentation -> learner response -> submit judgment -> reveal new information -> explain reasoning -> reprioritize -> reassess -> structured handover`.

## 6. Claim extraction

Separate case facts from generalizable teaching claims. Every generalizable claim must receive a stable `claim_id` and an evidence-ledger record before student release.

## 7. Gates

- Medical evidence review:
- Bilingual semantic review:
- Local adaptation review:
- Privacy/de-identification review:
- Teaching authorization:
- Rights/copyright review:
- Page implementation approval:
