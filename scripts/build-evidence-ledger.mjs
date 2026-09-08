import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const graphRoot = path.join(root, '.graph', 'trauma-education', 'evidence');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function yearFrom(value) {
  if (!value) return null;
  const match = String(value).match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
}

function evidenceLevel(claim, source) {
  const layer = claim.record_layer || '';
  const id = source?.id || '';
  if (layer.includes('case_fact') || id.includes('CASE-TRAUMA')) return 'clinician_experience_input';
  if (layer.includes('imaging')) return 'restricted_case_derivative';
  if (layer.includes('local') || id.includes('LOCAL-PROTOCOL')) return 'local_protocol';
  if (layer.includes('synthetic')) return 'instructor_authored_teaching_structure';
  if (id.startsWith('S-WHO') || id.startsWith('S-NICE') || id.startsWith('S-NHC')) return 'official_guideline_or_framework';
  if (id.startsWith('S-ACS') || id.startsWith('S-EAST') || id.startsWith('S-WSES') || id.startsWith('S-AIUM') || id.startsWith('S-RCUK') || id.startsWith('S-DAS') || id.startsWith('S-AO')) return 'professional_society_guideline_or_resource';
  if (id.startsWith('S-ETM')) return 'public_course_description_locator_only';
  if (source) return 'candidate_source_locator';
  return 'source_not_recorded';
}

function evidenceLocation(claim) {
  const locator = claim.source_locator_for_reviewer;
  if (locator && !/pending|candidate|retained/i.test(locator)) return locator;
  if (Array.isArray(claim.source_locator_claim_ids) && claim.source_locator_claim_ids.length) {
    return `topic locator: ${claim.source_locator_claim_ids.join(', ')}`;
  }
  return 'not_recorded';
}

function reviewStatus(claim, source, location) {
  const statuses = Array.isArray(claim.current_page_status) ? claim.current_page_status : [];
  const joined = [
    ...statuses,
    claim.approval_decision,
    claim.clinical_review_decision,
    claim.privacy_or_image_gate,
    claim.record_layer
  ].filter(Boolean).join(' ');

  if (/deidentification|privacy.*pending/i.test(joined) || statuses.includes('pending_deidentification_review')) {
    return 'pending_deidentification_review';
  }
  if (/local_workflow|local_protocol|not_local_protocol_signoff/i.test(joined) || statuses.includes('pending_local_confirmation')) {
    return 'pending_local_confirmation';
  }
  if (!source) return 'source_required';
  if (location === 'not_recorded') return 'evidence_review_required';
  return 'source_locator_verified';
}

const sourceRegister = readJson('.graph/trauma-education/evidence/source-register.json');
const evidencePack = readJson('.graph/trauma-education/evidence/claims.json');
const sourceById = new Map(sourceRegister.sources.map((source) => [source.id, source]));

const claims = evidencePack.claims.map((claim) => {
  const sourceIds = claim.candidate_source_ids || [];
  const source = sourceIds.map((id) => sourceById.get(id)).find(Boolean) || null;
  const location = evidenceLocation(claim);
  const status = reviewStatus(claim, source, location);
  return {
    claim_id: claim.id,
    claim_zh: claim.statement_zh,
    claim_en: claim.statement_en,
    teaching_context: claim.page_scope || claim.applicability || claim.module,
    source_organization: source?.organization || null,
    source_title: source?.title || null,
    publication_or_update_year: yearFrom(source?.version_or_date),
    source_url: source?.url || null,
    evidence_location: location,
    evidence_level: evidenceLevel(claim, source),
    review_status: status,
    local_adaptation_required: status === 'pending_local_confirmation' || sourceIds.some((id) => id.includes('LOCAL-PROTOCOL')),
    last_verified_at: source?.last_checked || null,
    module_path: claim.module,
    record_layer: claim.record_layer || claim.claim_type || 'legacy_claim_record',
    source_type: source?.source_status || 'not_recorded',
    source_ids: sourceIds,
    bilingual_status: claim.bilingual_review_decision || 'semantic_review_required',
    privacy_status: claim.privacy_or_image_gate || 'not_recorded',
    rights_status: source?.rights_boundary || 'not_recorded',
    legacy_release_decision: claim.release_decision || claim.approval_decision || null
  };
});

const statusCounts = Object.fromEntries(
  [...new Set(claims.map((claim) => claim.review_status))]
    .sort()
    .map((status) => [status, claims.filter((claim) => claim.review_status === status).length])
);

const ledger = {
  ledger_version: 1,
  generated_at: new Date().toISOString(),
  generation_command: 'npm run build:evidence-ledger',
  source_pack: '.graph/trauma-education/evidence/claims.json',
  governing_schema: 'data/schemas/claim-evidence-ledger.schema.json',
  boundary: 'Normalized records are review work items. No status is upgraded to evidence_verified or publishable automatically.',
  claims
};

const summary = {
  summary_version: 1,
  generated_at: ledger.generated_at,
  claim_count: claims.length,
  status_counts: statusCounts,
  missing_evidence_location_count: claims.filter((claim) => claim.evidence_location === 'not_recorded').length,
  missing_source_count: claims.filter((claim) => !claim.source_url).length,
  local_adaptation_count: claims.filter((claim) => claim.local_adaptation_required).length,
  privacy_review_count: claims.filter((claim) => claim.review_status === 'pending_deidentification_review').length,
  evidence_verified_count: claims.filter((claim) => claim.review_status === 'evidence_verified').length,
  publishable_count: claims.filter((claim) => claim.review_status === 'publishable').length,
  interpretation: 'Counts describe governance state only. They do not measure clinical quality or authorize publication.'
};

fs.writeFileSync(path.join(root, 'data', 'claim-evidence-ledger.json'), `${JSON.stringify(ledger, null, 2)}\n`);
fs.writeFileSync(path.join(root, 'data', 'evidence-governance-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);

console.log(JSON.stringify(summary, null, 2));
