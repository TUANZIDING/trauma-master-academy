# Trauma Clinical Experience Workflow

This local workflow adapts the interview-first method of Harness Interview Workflow for evidence-grounded trauma education. It does not import, merge, or execute the upstream repository.

## Interface

One clinical experience enters as a source-classified interview packet. It may leave as courseware only after separate evidence, bilingual, privacy, local-adaptation, and implementation decisions are recorded.

```text
clinician narration
  -> blindspot scan
  -> 1-3 high-leverage questions
  -> source-layered timeline
  -> conflicts and unknowns
  -> Known / Unknown / Feared
  -> xABCDE priorities
  -> progressive information release
  -> patient and system reassessment
  -> claim-level evidence ledger
  -> privacy and rights gates
  -> route comparison
  -> explicit implementation approval
```

## Non-negotiable rules

- `clinician_experience_input` can shape a case, question, timeline, or debrief. It cannot approve a general clinical claim.
- A source locator proves only that a source can be found. It does not prove that a sentence accurately represents the source.
- Instructor mode in a static website is not access control. Pending or identifiable patient material must remain outside this repository.
- ATLS and ETM materials may be used only within the holder's lawful internal review rights. Protected text, tables, algorithms, or figures are not copied into courseware or automated datasets.
- Technical validation, evidence review, clinical review, local confirmation, privacy authorization, and publication are independent decisions.

## Files

- `templates/blindspot-report.md`: uncertainty scan before questions.
- `templates/interview-packet.md`: source-layered clinical interview.
- `templates/route-options.md`: compare safe implementation routes.
- `templates/implementation-notes.md`: record approved scope and deviations.
- `state.json`: machine-readable workflow and gate vocabulary.
