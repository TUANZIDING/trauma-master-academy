# 2026-10-08 course consistency and clinical-reference release

## Scope

- Canonical duration: xABCDE 45 minutes; care chain 35 minutes.
- Twenty-two course HTML pages contain three objectives and five pre/five post items without waiting for script-generated markup. Nine skill pages retain dynamic skill-specific objectives and tests.
- Learner-facing internal IDs and repeated pending badges are hidden; source/provenance records remain available. Scope is differentiated by intern, resident and early attending.
- Seventeen structured clinical anchors link Chinese and international sources with population, stage, differences and escalation conditions. Where an equivalent Chinese clause was not verified, the page explicitly identifies international-only reference.
- Forty-eight selectable pocket cards cover the 22 courses and nine skills. Chinese and English PDF editions each contain 48 A5 pages.
- Consent, critical-condition notification and delayed rescue-record supplementation have Chinese record outlines. Real-case public text remains generalized and de-identified; the original slide deck and media are not part of this release.

## Evidence coverage and signoff

The structured ledger is `data/clinical-pockets.json`. Its source records include publication/version, locator, reading coverage and check date. Burn-norm sections were verified from indexed primary sections; the geriatric hip guideline entry is official metadata and is not used as the source for the shock threshold. Chinese and international pediatric transfusion examples are explicitly assigned to different stages. Chinese TXA maintenance wording differs from the European eight-hour regimen. AHA 2025 pregnancy-arrest teaching prepares at recognition and targets delivery by five minutes rather than waiting four minutes to call or prepare.

Source checking: Codex-assisted, 2026-10-08. Clinical reviewer/date: unsigned. No clinical or institutional approval is inferred from the tests or deployment.

## Engineering validation

- `npm run validate`: passed, with the existing 11 legacy exact-context clinical-review warnings retained.
- Isolated JSDOM checks (temporary test harness, no browser automation): all 22 course scoring flows, language switching with answers retained, nine skill entries, blocked-storage fallback and five pocket query routes passed.
- Re-running both HTML generators produced identical hashes.
- Negative controls reject unknown/false-domestic citations, a fabricated clinical signature, tampered generated numerical markup and a new unqualified threshold outside the generated section.
- Both PDFs: 48 nonempty text pages, embedded font verified. Visual samples: Chinese TXA/BP/burn/pediatric-transfusion and English pregnancy-arrest cards; samples were clear with no overlap. This is sampled PDF validation, not universal browser or printer validation.
- The computer-use browser API timed out; new live browser rendering was not verified. Public served-file equality is checked separately after Pages deployment.

## Rebuild

```sh
node scripts/build-academy-learning.mjs
node scripts/build-clinical-pockets.mjs
python3 scripts/build-pocket-pdfs.py
npm run validate
```

The PDF generator requires ReportLab and an installed embeddable Unicode font (configured in the script). Questionnaire records stay in browser local storage and are formative practice records; they are not a validated research instrument or a research-data collection system.
