import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const evidenceDir = path.join(root, '.graph', 'trauma-education', 'evidence');
const sourceRegisterPath = path.join(evidenceDir, 'source-register.json');
const releaseDecisionPath = path.join(evidenceDir, 'release-decision.json');
const topicLocatorPath = path.join(evidenceDir, 'topic-locator-register.json');
const atomizedMiniModulePath = path.join(evidenceDir, 'atomized-mini-module-claims.json');
const atomizedPelvicAndCasePath = path.join(evidenceDir, 'atomized-pelvic-and-case-claims.json');
const atomizedCoreCoursePath = path.join(evidenceDir, 'atomized-core-course-claims.json');
const outputPath = path.join(evidenceDir, 'claims.json');
const reviewStatuses = [
  'source_required',
  'source_verified',
  'source_index_pending_review',
  'evidence_review_required',
  'pending_clinician_review',
  'pending_deidentification_review',
  'pending_local_confirmation'
];

const sourceMap = {
  'PUBLIC-SOURCE-ACS-ATLS-11': ['S-ACS-ATLS-11'],
  'PUBLIC-SOURCE-ACS-ATLS-ABOUT': ['S-ACS-ATLS-ABOUT'],
  'PUBLIC-SOURCE-NICE-NG39': ['S-NICE-NG39'],
  'PUBLIC-SOURCE-ACS-TBI-BEST-PRACTICES': ['S-ACS-TBI-2024'],
  'PUBLIC-SOURCE-EAST-PMG': ['S-EAST-PMG'],
  'PUBLIC-SOURCE-ACEP-FAST': ['S-ACEP-FAST'],
  'CLAIM-CASE-TRAUMA-005-DEIDENTIFICATION': ['S-CASE-TRAUMA-005-PROVENANCE'],
  'CLAIM-CASE-TRAUMA-005-TEACHING-BOUNDARY': ['S-CLINICAL-SAFETY-BOUNDARY'],
  'CLAIM-CASE-TRAUMA-005-LOCAL-TIMELINE': ['S-CASE-TRAUMA-005-PROVENANCE', 'S-LOCAL-PROTOCOL'],
  'CLAIM-MINI-ABDOMEN-EFAST-INFO': ['S-WSES-BOWEL-2022', 'S-WSES-LIVER-2020', 'S-WSES-SPLEEN-2022', 'S-ACEP-FAST', 'S-LOCAL-PROTOCOL'],
  'CLAIM-MINI-CHEST-MECHANICS': ['S-ACS-CHEST-2025'],
  'CLAIM-MINI-CHEST-MANAGEMENT': ['S-ACS-CHEST-2025', 'S-WSES-AAST-THORACIC-2025', 'S-WSES-CWIS-SSRF-2024', 'S-LOCAL-PROTOCOL'],
  'CLAIM-MINI-CHEST-CHINA': ['S-NHC-TRAUMA-2025'],
  'CLAIM-CASE-TRAUMA-003-DEIDENTIFICATION': ['S-CASE-TRAUMA-003-PROVENANCE'],
  'CLAIM-CASE-TRAUMA-003-ETM-STYLE': ['S-ETM-PUBLIC'],
  'CLAIM-CASE-TRAUMA-003-TEACHING-BOUNDARY': ['S-CLINICAL-SAFETY-BOUNDARY'],
  'CLAIM-CASE-TRAUMA-003-LOCAL-PROCESS': ['S-LOCAL-PROTOCOL'],
  'CLAIM-PELVIC-REASONING-SYNTHETIC': ['S-SYNTHETIC-CASE-METHOD'],
  'CLAIM-PELVIC-MECHANISM-PHYSIOLOGY-ASSOCIATED-INJURY': ['S-WSES-PELVIC-2017'],
  'CLAIM-PELVIC-FAST-LIMIT': ['S-NICE-NG39', 'S-EUROPEAN-BLEEDING-2023'],
  'CLAIM-PELVIC-RESOURCE-PATHWAY': ['S-LOCAL-PROTOCOL'],
  'CLAIM-PELVIC-TEACHING-BOUNDARY': ['S-CLINICAL-SAFETY-BOUNDARY'],
  'CLAIM-MINI-POLYTRAUMA-INTEGRATION': ['S-ACS-ATLS-11', 'S-EUROPEAN-BLEEDING-2023', 'S-NHC-TRAUMA-2025', 'S-SYNTHETIC-CASE-METHOD'],
  'CLAIM-CASE-TRAUMA-004-SOURCE': ['S-CASE-TRAUMA-004-PROVENANCE'],
  'CLAIM-CASE-TRAUMA-004-FAST': ['S-EUROPEAN-BLEEDING-2023', 'S-AIUM-EFAST-2023'],
  'CLAIM-CASE-TRAUMA-004-ANAPHYLAXIS': ['S-ANAPHYLAXIS-CHINA', 'S-RCUK-2025', 'S-ANAPHYLAXIS-PP-2023'],
  'CLAIM-CASE-TRAUMA-004-ETIOLOGY': ['S-CASE-TRAUMA-004-PROVENANCE'],
  'CLAIM-MINI-TBI-ACS-TBI-SOURCE': ['S-ACS-TBI-2024', 'S-LOCAL-PROTOCOL'],
  'CLAIM-TRAUMA-ACADEMY-001-TEAM-PREP': ['S-LOCAL-PROTOCOL'],
  'CLAIM-TRAUMA-ACADEMY-001-HANDOFF-LANGUAGE': ['S-ACS-ATLS-11', 'S-ETM-PUBLIC', 'S-LOCAL-PROTOCOL'],
  'CLAIM-TRAUMA-ACADEMY-004-OBSIDIAN-STRUCTURE-INPUT': ['S-SYNTHETIC-CASE-METHOD'],
  'CLAIM-TRAUMA-ACADEMY-004-LOCAL-PATHWAY': ['S-LOCAL-PROTOCOL'],
  'CLAIM-TRAUMA-ACADEMY-004-CLINICAL-REVIEW': ['S-CLINICAL-SAFETY-BOUNDARY'],
  'CLAIM-TRAUMA-DISASTER-PRIORITY-LANGUAGE': ['S-ACS-ATLS-11', 'S-NICE-NG39'],
  'CLAIM-TRAUMA-DISASTER-MASS-CASUALTY': ['S-WHO-MCM', 'S-ACS-DISASTER'],
  'CLAIM-TRAUMA-DISASTER-LOCAL-PROTOCOL': ['S-LOCAL-PROTOCOL'],
  'CLAIM-TRAUMA-ACADEMY-002-ATLS-XABCDE-FRAMEWORK': ['S-ACS-ATLS-11'],
  'CLAIM-TRAUMA-ACADEMY-002-TEAM-REASSESSMENT': ['S-ETM-PUBLIC', 'S-LOCAL-PROTOCOL']
};

const scopeMap = {
  'index.html': '来源入口与课程框架说明；不作为具体诊疗主张的自动批准。',
  'courses/abdominal-hemorrhagic-shock-case.html': '受限病例的来源、教学边界与本地流程限制。',
  'courses/abdominal-injury-mini.html': '合成腹部创伤教学中的连续查体、FAST/EFAST 信息边界和影像讨论；不含本地实施路径。',
  'courses/chest-trauma-mini.html': '合成胸壁损伤教学的机制、风险和框架性处理讨论；不提供剂量、操作步骤或本地路径。',
  'courses/cspine-hip-dislocation-case.html': '教师预览病例的脱敏、教学方法和本地流程边界。',
  'courses/pelvic-trauma.html': '合成骨盆创伤推理、检查限制和资源地图；不提供本地启动规则。',
  'courses/polytrauma-mini.html': '合成多发伤教学的并行任务和复评框架。',
  'courses/polytrauma-shock-reassessment-case.html': '受限教师预览病例的来源、FAST/EFAST 限制、教学推断与过敏反应教学边界。',
  'courses/tbi-mini.html': '合成颅脑损伤教学的连续神经观察、影像边界与团队升级框架。',
  'courses/trauma-bay.html': '抢救室流程教育和交接语言；本地职责分工待确认。',
  'courses/trauma-care-chain.html': '资源链概念与本地流程限制。',
  'courses/trauma-disaster-medicine.html': '灾难医学教学语言、资源失衡概念与本院流程限制。',
  'courses/xabcde.html': 'xABCDE 教学框架和团队复评语言；不复制专有课程算法。'
};

function plain(value) {
  return value.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

const sourceRegister = JSON.parse(fs.readFileSync(sourceRegisterPath, 'utf8'));
const releaseDecision = JSON.parse(fs.readFileSync(releaseDecisionPath, 'utf8'));
const topicLocatorRegister = JSON.parse(fs.readFileSync(topicLocatorPath, 'utf8'));
const atomizedRegisters = [atomizedMiniModulePath, atomizedPelvicAndCasePath, atomizedCoreCoursePath].map((file) => ({
  path: file,
  register: JSON.parse(fs.readFileSync(file, 'utf8'))
}));
const topicLocatorIds = new Set(topicLocatorRegister.locators.map((entry) => entry.claim_id));
const sourceIds = new Set(sourceRegister.sources.map((source) => source.id));
const sourceById = new Map(sourceRegister.sources.map((source) => [source.id, source]));
const files = ['index.html', ...fs.readdirSync(path.join(root, 'courses')).filter((file) => file.endsWith('.html')).sort().map((file) => `courses/${file}`)];
const claims = [];

for (const rel of files) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
  const blocks = text.match(/<(?:li|article) class="claim"[\s\S]*?<\/(?:li|article)>/g) || [];
  for (const block of blocks) {
    const id = block.match(/<code>([^<]+)<\/code>/)?.[1];
    if (!id) throw new Error(`Claim block without a code identifier in ${rel}`);
    const sourceIdsForClaim = sourceMap[id];
    if (!sourceIdsForClaim) throw new Error(`No candidate source mapping for ${id}`);
    for (const sourceId of sourceIdsForClaim) {
      if (!sourceIds.has(sourceId)) throw new Error(`${id} references missing source ${sourceId}`);
    }
    const status = reviewStatuses.filter((item) => block.includes(item));
    const zh = plain(block.match(/<span class="zh">([\s\S]*?)<\/span>/)?.[1] || '');
    const en = plain(block.match(/<span class="en">([\s\S]*?)<\/span>/)?.[1] || '');
    claims.push({
      id,
      module: rel,
      page_scope: scopeMap[rel] || 'Scope must be entered before review.',
      statement_zh: zh,
      statement_en: en,
      candidate_source_ids: sourceIdsForClaim,
      current_page_status: status.length ? status : ['not_explicitly_tagged'],
      evidence_status: 'candidate_mapping_retained_for_audit',
      framework_teaching_basis: 'approved_limited_teaching_scope',
      clinical_review_decision: 'not_a_claim_level_signoff',
      clinical_reviewer: 'pending_named_reviewer',
      clinical_review_date: null,
      source_locator_for_reviewer: releaseDecision.topic_specific_locator_required_for.includes(id)
        ? (topicLocatorIds.has(id) ? 'topic_specific_locator_recorded' : 'mandatory_topic_specific_locator_pending_entry')
        : 'candidate_locator_retained',
      privacy_or_image_gate: /CASE-TRAUMA-00[345]|DEIDENTIFICATION|SOURCE/.test(id) ? 'approved_only_when_deidentified_and_authorized' : 'not_primary_gate_for_this_claim',
      bilingual_review_decision: 'terms_human_reviewed_consistent',
      release_decision: releaseDecision.decision,
      release_decision_id: releaseDecision.release_id,
      notes: 'Teaching release is approved only within the recorded educational scope. This record does not replace a named claim-level clinical signoff, required topic-specific locator, or case/asset authorization record.'
    });
  }
}

const explicitClaimCount = claims.length;
const claimedIds = new Set(claims.map((claim) => claim.id));
const atomizedClaimCountByRegister = {};
for (const {path: registerPath, register} of atomizedRegisters) {
  const registerName = path.basename(registerPath);
  atomizedClaimCountByRegister[registerName] = register.claims.length;
  for (const entry of register.claims) {
  if (claimedIds.has(entry.id)) throw new Error(`Duplicate claim ID ${entry.id}`);
  if (!entry.statement_zh || !entry.statement_en) throw new Error(`${entry.id} must have bilingual statements`);
  for (const sourceId of entry.candidate_source_ids) {
    if (!sourceIds.has(sourceId)) throw new Error(`${entry.id} references missing source ${sourceId}`);
  }
  for (const locatorId of entry.source_locator_claim_ids) {
    if (!topicLocatorIds.has(locatorId)) throw new Error(`${entry.id} references missing topic locator ${locatorId}`);
  }
    claims.push({
    ...entry,
    current_page_status: ['atomized_register_only'],
    evidence_status: 'atomized_candidate_mapping_retained_for_audit',
    framework_teaching_basis: 'approved_limited_teaching_scope',
    clinical_review_decision: entry.approval_decision,
    clinical_reviewer: entry.clinical_reviewer ?? '创伤方向主任医师（审批人姓名隐匿；仅限发布范围审批）',
    clinical_review_date: entry.clinical_review_date ?? releaseDecision.decision_date,
    source_evidence: entry.candidate_source_ids.map((sourceId) => {
      const source = sourceById.get(sourceId);
      return {id: source.id, title: source.title, version_or_date: source.version_or_date, url: source.url};
    }),
    source_locator_for_reviewer: entry.source_locator_claim_ids.length
      ? 'linked_topic_locator_recorded'
      : 'source_register_locator_retained',
    privacy_or_image_gate: entry.privacy_or_image_gate ?? 'not_primary_gate_for_this_synthetic_module_claim',
    bilingual_review_decision: 'terms_human_reviewed_consistent',
    release_decision: releaseDecision.decision,
    release_decision_id: releaseDecision.release_id,
    notes: 'This atomic record makes scope and source mapping auditable. It does not transform the limited teaching-release decision into a claim-level clinical pathway, local protocol, or individualized treatment recommendation.'
    });
  }
}

const payload = {
  register_version: 1,
  generated_at: new Date().toISOString(),
  generation_command: 'npm run build:evidence-pack',
  release_decision: {
    id: releaseDecision.release_id,
    status: releaseDecision.decision,
    statement: releaseDecision.statement
  },
  topic_locator_register: {
    path: '.graph/trauma-education/evidence/topic-locator-register.json',
    required_claim_count: releaseDecision.topic_specific_locator_required_for.length,
    recorded_claim_count: releaseDecision.topic_specific_locator_required_for.filter((id) => topicLocatorIds.has(id)).length
  },
  coverage: {
    included: 'All explicit HTML .claim blocks plus registered atomization batches for the synthetic mini modules, pelvic module, real teaching cases, and four core courses.',
    explicit_html_claim_count: explicitClaimCount,
    atomized_claim_count_by_register: atomizedClaimCountByRegister,
    atomized_claim_count: Object.values(atomizedClaimCountByRegister).reduce((total, count) => total + count, 0),
    total_claim_count: claims.length,
    excluded: 'Medical or teaching assertions in ordinary prose, quizzes, JSON data, generated visuals, and assets outside the first atomization batch until they receive a stable CLAIM-* identifier.',
    blocker: 'Excluded assertions must be atomized before a new topic, material rewrite, or release-scope expansion; the current limited teaching-release decision does not convert them into claim-level approval.'
  },
  claims
};

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, outputPath)} with ${explicitClaimCount} explicit HTML claims and ${Object.values(atomizedClaimCountByRegister).reduce((total, count) => total + count, 0)} registered atomized claims.`);
