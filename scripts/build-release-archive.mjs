import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const graphDir = path.join(root, '.graph', 'trauma-education');
const evidenceDir = path.join(graphDir, 'evidence');
const decisionPath = path.join(evidenceDir, 'release-decision.json');
const outputPath = path.join(evidenceDir, 'release-manifest.json');

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const relative = (file) => path.relative(root, file);

const decision = readJson(decisionPath);
const claims = readJson(path.join(evidenceDir, 'claims.json'));
const locators = readJson(path.join(evidenceDir, 'topic-locator-register.json'));
const sources = readJson(path.join(evidenceDir, 'source-register.json'));

const auditFiles = [
  path.join(graphDir, 'graph.json'),
  path.join(graphDir, 'graph-spec.md'),
  path.join(graphDir, 'approval-log.md'),
  path.join(graphDir, 'module-release-register.md'),
  path.join(evidenceDir, 'README.md'),
  path.join(evidenceDir, 'source-register.json'),
  path.join(evidenceDir, 'topic-locator-register.json'),
  path.join(evidenceDir, 'claims.json'),
  path.join(evidenceDir, 'atomized-mini-module-claims.json'),
  path.join(evidenceDir, 'atomized-pelvic-and-case-claims.json'),
  path.join(evidenceDir, 'atomized-core-course-claims.json'),
  path.join(evidenceDir, 'release-decision.json'),
  path.join(evidenceDir, 'atomization-backlog.md'),
  path.join(root, 'docs', 'SOURCE_INDEX.md'),
  path.join(root, 'docs', 'CLINICAL_SAFETY_BOUNDARY.md'),
  path.join(root, 'index.html')
];

for (const file of auditFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing release artifact: ${relative(file)}`);
}

const locatorRecords = Array.isArray(locators) ? locators : locators.locators ?? locators.records ?? [];
const sourceRecords = Array.isArray(sources) ? sources : sources.sources;
const manifest = {
  manifest_version: '1.0',
  release_id: decision.release_id,
  generated_at: new Date().toISOString(),
  release_decision: decision.decision,
  release_statement: decision.statement,
  approval_record: decision.approver_record,
  scope_summary: {
    education_only: '面向学生的创伤教学与模拟；不作为床旁诊疗指令、本院正式操作规程或个体化治疗方案。',
    local_workflow: decision.local_policy_scope.allowed_context,
    case_and_image: decision.case_and_image_scope.status
  },
  evidence_summary: {
    explicit_claim_count: Array.isArray(claims) ? claims.length : claims.claims?.length ?? 0,
    topic_locator_count: locatorRecords.length,
    topic_locator_pending_count: locatorRecords.filter((item) => /pending|incomplete/i.test(JSON.stringify(item))).length,
    source_record_count: sourceRecords.length,
    source_metadata_incomplete_ids: sourceRecords
      .filter((item) => /metadata_incomplete/i.test(JSON.stringify(item)))
      .map((item) => item.source_id ?? item.id)
  },
  verification_required_before_external_release: [
    'npm run validate',
    'npm run build:evidence-pack',
    'python3 /Users/dinghaixiang/.codex/skills/graph-engineering-architect/scripts/validate_graph.py .graph/trauma-education',
    'git diff --check'
  ],
  artifacts: auditFiles.map((file) => ({ path: relative(file), sha256: hash(file) }))
};

fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${relative(outputPath)} for ${manifest.release_id}.`);
