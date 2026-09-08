import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requiredLedgerFields = [
  'claim_id', 'claim_zh', 'claim_en', 'teaching_context', 'source_organization',
  'source_title', 'publication_or_update_year', 'source_url', 'evidence_location',
  'evidence_level', 'review_status', 'local_adaptation_required', 'last_verified_at'
];
const allowedStatuses = new Set([
  'source_required', 'source_locator_verified', 'evidence_review_required',
  'evidence_verified', 'pending_clinician_review', 'pending_local_confirmation',
  'pending_deidentification_review', 'privacy_authorized',
  'ready_for_implementation', 'publishable'
]);
const requiredFiles = [
  '.workflow/trauma-clinical-experience/README.md',
  '.workflow/trauma-clinical-experience/state.json',
  '.workflow/trauma-clinical-experience/templates/blindspot-report.md',
  '.workflow/trauma-clinical-experience/templates/interview-packet.md',
  '.workflow/trauma-clinical-experience/templates/route-options.md',
  '.workflow/trauma-clinical-experience/templates/implementation-notes.md',
  'data/schemas/claim-evidence-ledger.schema.json',
  'data/schemas/clinical-case-intake.schema.json',
  'data/claim-evidence-ledger.json',
  'data/evidence-governance-summary.json',
  'data/case-intake-register.json',
  'docs/EVIDENCE_GOVERNANCE.md',
  'docs/CLINICAL_EXPERIENCE_WORKFLOW.md',
  'docs/PRIVACY_AUTHORIZATION_CHECKLIST.md',
  'courses/evidence-governance.html',
  'assets/evidence-dashboard.js'
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

const issues = [];
const warnings = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) issues.push(`missing required file: ${file}`);
}

const ledger = readJson('data/claim-evidence-ledger.json');
const evidencePack = readJson('.graph/trauma-education/evidence/claims.json');
const caseRegister = readJson('data/case-intake-register.json');
const ids = new Set();

if (!Array.isArray(ledger.claims)) {
  issues.push('ledger claims must be an array');
} else {
  for (const [index, claim] of ledger.claims.entries()) {
    for (const field of requiredLedgerFields) {
      if (!(field in claim)) issues.push(`claim ${index + 1} missing ${field}`);
    }
    if (!claim.claim_id || ids.has(claim.claim_id)) issues.push(`duplicate or empty claim_id: ${claim.claim_id}`);
    ids.add(claim.claim_id);
    if (!claim.claim_zh?.trim() || !claim.claim_en?.trim()) issues.push(`${claim.claim_id} missing bilingual claim text`);
    if (!allowedStatuses.has(claim.review_status)) issues.push(`${claim.claim_id} invalid review_status ${claim.review_status}`);
    if (/clinician_approved/i.test(JSON.stringify(claim))) issues.push(`${claim.claim_id} contains prohibited approval label`);
    if (['source_locator_verified', 'evidence_verified', 'publishable'].includes(claim.review_status) && !claim.last_verified_at) {
      issues.push(`${claim.claim_id} requires last_verified_at for ${claim.review_status}`);
    }
    if (claim.review_status === 'evidence_verified' && claim.evidence_location === 'not_recorded') {
      issues.push(`${claim.claim_id} cannot be evidence_verified without evidence_location`);
    }
    if (claim.review_status === 'publishable' && claim.bilingual_status !== 'semantic_review_complete') {
      issues.push(`${claim.claim_id} cannot be publishable without bilingual semantic review`);
    }
  }
}

if (ledger.claims.length < evidencePack.claims.length) {
  issues.push(`canonical ledger coverage ${ledger.claims.length}/${evidencePack.claims.length}`);
}

for (const item of caseRegister.cases || []) {
  if (item.case_type === 'real_case_restricted' && item.implementation_gate === 'blocked_patient_payload' && item.public_payload_included !== false) {
    issues.push(`${item.case_id} includes public payload while privacy gate is blocked`);
  }
  if (item.distribution_scope === 'instructor_preview') {
    warnings.push(`${item.case_id}: instructor preview is presentation control, not access control`);
  }
  if (item.implementation_gate === 'legacy_public_derivative_review_required') {
    warnings.push(`${item.case_id}: legacy public derivative requires privacy and authorization reconciliation`);
  }
}

const result = {
  claim_count: ledger.claims?.length || 0,
  source_pack_claim_count: evidencePack.claims?.length || 0,
  case_gate_count: caseRegister.cases?.length || 0,
  issues,
  warnings,
  passed: issues.length === 0
};

console.log(JSON.stringify(result, null, 2));
if (issues.length) process.exit(1);
