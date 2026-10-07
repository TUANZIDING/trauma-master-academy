import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const requiredFiles = [
  'index.html',
  'courses/trauma-bay.html',
  'courses/xabcde.html',
  'courses/pelvic-trauma.html',
  'courses/trauma-care-chain.html',
  'courses/trauma-disaster-medicine.html',
  'courses/tbi-mini.html',
  'courses/chest-trauma-mini.html',
  'courses/abdominal-injury-mini.html',
  'courses/polytrauma-mini.html',
  'courses/cspine-hip-dislocation-case.html',
  'courses/abdominal-hemorrhagic-shock-case.html',
  'courses/polytrauma-shock-reassessment-case.html',
  'assets/site.css',
  'assets/site.js',
  'assets/xabcde-case-hub.png',
  'assets/cases/case-trauma-003/c3-sagittal-anonymized.jpg',
  'assets/cases/case-trauma-003/left-hip-axial-anonymized.jpg',
  'assets/cases/case-trauma-004/thoracolumbar-sagittal-teaching.png',
  'assets/cases/case-trauma-004/chest-axial-teaching.png',
  'assets/generated/overview/trauma-care-chain.svg',
  'assets/generated/overview/trauma-disaster-medicine.svg',
  'assets/generated/overview/trauma-bay.svg',
  'assets/generated/overview/xabcde.svg',
  'assets/generated/overview/pelvic-trauma.svg',
  'assets/generated/overview/tbi-mini.svg',
  'assets/generated/overview/chest-trauma-mini.svg',
  'assets/generated/overview/abdominal-injury-mini.svg',
  'assets/generated/overview/polytrauma-mini.svg',
  'assets/images/xabcde/stages/x-hemorrhage.png',
  'assets/generated/stages/xabcde-stage-a.svg',
  'assets/generated/stages/xabcde-stage-b.svg',
  'assets/generated/stages/xabcde-stage-c.svg',
  'assets/generated/stages/xabcde-stage-d.svg',
  'assets/generated/stages/xabcde-stage-e.svg',
  'assets/images/xabcde/overview/xabcde-primary-survey-map.png',
  'assets/images/xabcde/overview/xabcde-overview-full.png',
  'assets/images/xabcde/overview/reasoning-loop.png',
  'assets/images/xabcde/nodes/observe-cues.png',
  'assets/images/xabcde/nodes/team-positioning.png',
  'assets/images/xabcde/nodes/reassessment-questions.png',
  'assets/images/xabcde/stages/x-hemorrhage.png',
  'assets/images/xabcde/stages/a-airway-cspine.png',
  'assets/images/xabcde/stages/b-breathing.png',
  'assets/images/xabcde/stages/c-circulation.png',
  'assets/images/xabcde/stages/d-disability.png',
  'assets/images/xabcde/stages/e-exposure.png',
  'assets/generated/nodes/disaster-resource-panel.svg',
  'assets/generated/nodes/mass-casualty-triage-board.svg',
  'assets/generated/nodes/demand-resource-imbalance.svg',
  'assets/generated/nodes/hospital-casualty-flow.svg',
  'assets/generated/nodes/disaster-resource-dashboard.svg',
  'assets/generated/nodes/dual-reassessment-loop.svg',
  'data/trauma-disaster-course.json',
  'data/trauma-disaster-cases.json',
  'data/trauma-disaster-assets.json',
  'data/trauma-disaster-references.json',
  'data/xabcde-course.json',
  'data/xabcde-assets.json',
  'data/xabcde-cases.json',
  'data/xabcde-references.json',
  'data/pelvic-trauma-case.json',
  'docs/CLINICAL_SAFETY_BOUNDARY.md',
  'docs/COURSE_DESIGN.md',
  'docs/SOURCE_INDEX.md',
  'docs/trauma-disaster-course-audit.md',
  'docs/trauma-disaster-course-plan.md',
  'docs/trauma-disaster-learning-objectives.md',
  'docs/trauma-disaster-content-map.md',
  'docs/trauma-disaster-asset-map.md',
  'docs/trauma-disaster-case-plan.md',
  'docs/trauma-disaster-instructor-mode.md',
  'docs/trauma-disaster-medical-review.md',
  'docs/xabcde-audit.md',
  'docs/xabcde-design-system.md',
  'docs/xabcde-image-backlog.md',
  'docs/xabcde-medical-review.md',
  'docs/xabcde-obsidian-mapping.md',
  'docs/CLINICAL_REASONING_CASE_TEMPLATE.md'
];

const textExtensions = new Set(['.html', '.js', '.css', '.md', '.json']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.superpowers') {
      return [];
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(full);
    }
    return [full];
  });
}

const allFiles = walk(root);
const textFiles = allFiles.filter((file) => textExtensions.has(path.extname(file)));
const corpus = textFiles.map((file) => ({
  file,
  rel: path.relative(root, file),
  text: fs.readFileSync(file, 'utf8')
}));

const htmlFiles = corpus.filter((item) => item.rel.endsWith('.html'));
const html = htmlFiles.map((item) => item.text).join('\n');
const allText = corpus.map((item) => item.text).join('\n');

const requiredStrings = [
  'TraumaMaster Academy',
  'GO_WITH_CLINICAL_REVIEW',
  'courses/trauma-bay.html',
  'courses/xabcde.html',
  'courses/pelvic-trauma.html',
  'courses/trauma-care-chain.html',
  'courses/trauma-disaster-medicine.html',
  'courses/tbi-mini.html',
  'courses/chest-trauma-mini.html',
  'courses/abdominal-injury-mini.html',
  'courses/polytrauma-mini.html',
  'courses/cspine-hip-dislocation-case.html',
  'courses/abdominal-hemorrhagic-shock-case.html',
  'courses/polytrauma-shock-reassessment-case.html',
  'source_required',
  'pending_clinician_review',
  'evidence_review_required',
  'source_index_pending_review',
  'assets/cases/case-trauma-003/c3-sagittal-anonymized.jpg',
  'assets/cases/case-trauma-003/left-hip-axial-anonymized.jpg',
  'assets/cases/case-trauma-004/thoracolumbar-sagittal-teaching.png',
  'assets/cases/case-trauma-004/chest-axial-teaching.png',
  'assets/generated/overview/trauma-disaster-medicine.svg',
  'assets/illustrations/node-reassessment-vivid.png',
  'assets/illustrations/node-efast-vivid.png',
  'assets/illustrations/node-resources-vivid.png',
  'assets/generated/nodes/disaster-resource-panel.svg',
  'assets/generated/nodes/mass-casualty-triage-board.svg',
  'assets/images/xabcde/stages/x-hemorrhage.png',
  'assets/images/xabcde/overview/xabcde-overview-full.png',
  'assets/images/xabcde/nodes/observe-cues.png',
  'assets/images/xabcde/stages/e-exposure.png',
  'data/xabcde-assets.json',
  'data/trauma-disaster-course.json',
  'data/trauma-disaster-cases.json',
  'data/trauma-disaster-assets.json',
  'data/trauma-disaster-references.json',
  'docs/trauma-disaster-course-audit.md',
  'docs/trauma-disaster-instructor-mode.md',
  'Introduction to Trauma Resuscitation and Disaster Medicine',
  'courses/trauma-disaster-medicine.html?mode=instructor',
  'courses/trauma-disaster-medicine.html#simulation',
  'courses/trauma-disaster-medicine.html#materials',
  'Case Challenge Mode',
  'Instructor Mode',
  'Lesson 1: Trauma Care Principles and the xABCDE Approach',
  'Lesson 2: Immediate Life Threats and Early Trauma Resuscitation',
  'Lesson 3: Principles of Disaster Medicine and Mass-Casualty Response',
  'Lesson 4: Integrated Trauma and Disaster Simulation',
  'Teaching categorization only — not an approved local triage algorithm.',
  'What happened',
  'Known',
  'Unknown',
  'Concern',
  'Next reassessment',
  'pending_local_confirmation',
  'synthetic_no_real_patient',
  'CASE-TRAUMA-DISASTER-SYN-001',
  'CASE-XABCDE-SYN-001',
  'CASE-TRAUMA-003-TEACHING',
  'CASE-TRAUMA-004',
  'CASE-TRAUMA-005',
  'CASE-TRAUMA-PELVIC-SYN-001',
  'Clinical Reasoning Case Template',
  'High-Energy Transport Injury: C-Spine Risk and Left Hip Dislocation',
  'CASE-TRAUMA-DISASTER-SYN-002',
  'visual_asset_pending_review',
  'Cervical collar',
  'Pelvic binder',
  'EFAST',
  'Bedside X-ray',

  'assets/source-backed/',
  'source-backed',
];

const forbiddenPatterns = [
  /clinician_approved/i,
  /立即给予/,
  /首选/,
  /禁忌/,
  /必须(插管|固定|CT|介入|手术|转运)/,
  /如果.*则.*(插管|输血|手术|介入|转运)/,
  /\b(if|when)\b[^.]{0,80}\b(then|must|should immediately)\b[^.]{0,80}\b(intubate|transfuse|operate|transfer)\b/i,
  /\b\d+(\.\d+)?\s*(mg|g|ml|mL)\/kg\b/i,
  /\b\d+(\.\d+)?\s*(L\/min|lpm|cmH2O|PEEP)\b/i,
  /\bSBP\s*[<>]\s*\d/i,
  /\bGCS\s*[<>]\s*\d/i,
  /氧流量/,
  /管径/,
  /patient-specific treatment plan/i
];

const requiredFileMissing = requiredFiles.filter((rel) => !fs.existsSync(path.join(root, rel)));
const missing = requiredStrings.filter((item) => !allText.includes(item));
const forbidden = [];
const legacyBoundaryFindings = [];
const boundaryBaseline = JSON.parse(fs.readFileSync(path.join(root,'data/legacy-boundary-findings.json'),'utf8'));
const contextHashes = (text,pattern) => [...text.matchAll(new RegExp(pattern.source,pattern.flags+'g'))].map(m=>createHash('sha256').update(text.slice(Math.max(0,m.index-80),m.index+m[0].length+80)).digest('hex')).sort();

for (const { rel, text } of corpus) {
  if(rel === 'data/legacy-boundary-findings.json') continue;
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(text)) {
      const baseline = boundaryBaseline.findings.find(row=>row.file===rel && row.pattern===String(pattern));
      if(baseline && JSON.stringify(contextHashes(text,pattern))===JSON.stringify(baseline.contexts)){
        legacyBoundaryFindings.push(`${rel}: ${pattern} — unchanged source context; clinical review pending`);
      } else forbidden.push(`${rel}: ${pattern.toString()}`);
    }
  }
}

const zhCount = (html.match(/class="zh"/g) || []).length;
const enCount = (html.match(/class="en"/g) || []).length;

const claimIssues = [];
for (const { rel, text } of htmlFiles) {
  const claims = text.match(/<li class="claim">[\s\S]*?<\/li>|<article class="claim">[\s\S]*?<\/article>/g) || [];
  claims.forEach((claim, index) => {
    if (!/(source_required|source_verified|source_index_pending_review|evidence_review_required|pending_clinician_review|pending_deidentification_review|pending_local_confirmation)/.test(claim)) {
      claimIssues.push(`${rel} claim ${index + 1}`);
    }
  });
}

const localLinkIssues = [];
for (const { rel, text } of htmlFiles) {
  const dir = path.dirname(path.join(root, rel));
  const refs = [...text.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|#|mailto:)/.test(ref)) {
      continue;
    }
    const cleanRef = ref.split('#')[0].split('?')[0];
    if (!cleanRef) {
      continue;
    }
    const target = path.normalize(path.join(dir, cleanRef));
    if (!fs.existsSync(target)) {
      localLinkIssues.push(`${rel} -> ${ref}`);
    }
  }
}

const imageAltIssues = [];
for (const { rel, text } of htmlFiles) {
  const images = text.match(/<img\b[^>]*>/g) || [];
  images.forEach((image, index) => {
    const altMatch = image.match(/\salt="([^"]*)"/);
    if (!altMatch || altMatch[1].trim().length === 0) {
      imageAltIssues.push(`${rel} img ${index + 1}`);
    }
  });
}

const traumaDisasterHtml = fs.readFileSync(path.join(root, 'courses', 'trauma-disaster-medicine.html'), 'utf8');
const pelvicTraumaHtml = fs.readFileSync(path.join(root, 'courses', 'pelvic-trauma.html'), 'utf8');
const pelvicTraumaRequiredSelectors = [
  'data-case-lab',
  'id="case-lab"',
  'id="exam-release"',
  'id="investigations"',
  'id="briefing"',
  'data-case-lab-score="submitted"',
  'data-case-lab-score="released"',
  'data-case-lab-action="releaseNext"',
  'data-case-release="5"',
  'CLAIM-PELVIC-MECHANISM-PHYSIOLOGY-ASSOCIATED-INJURY',
  'CLAIM-PELVIC-FAST-LIMIT',
  'synthetic_no_real_patient'
];
const pelvicTraumaStructureIssues = pelvicTraumaRequiredSelectors
  .filter((selector) => !pelvicTraumaHtml.includes(selector))
  .map((selector) => `courses/pelvic-trauma.html missing ${selector}`);
const teachingCaseStructureIssues = [];
for (const rel of [
  'courses/cspine-hip-dislocation-case.html',
  'courses/polytrauma-shock-reassessment-case.html',
  'courses/abdominal-hemorrhagic-shock-case.html'
]) {
  const caseHtml = fs.readFileSync(path.join(root, rel), 'utf8');
  const releaseCount = (caseHtml.match(/data-case-release="\d+"/g) || []).length;
  if (!caseHtml.includes('class="case-vitals-grid"')) {
    teachingCaseStructureIssues.push(`${rel} missing initial vital-sign panel`);
  }
  if (!caseHtml.includes('class="release-prompt"')) {
    teachingCaseStructureIssues.push(`${rel} missing release-stage reassessment prompts`);
  }
  if (releaseCount < 7) {
    teachingCaseStructureIssues.push(`${rel} progressive releases ${releaseCount}/7`);
  }
}
const traumaDisasterRequiredSelectors = [
  'id="route-overview"',
  'id="lesson-1"',
  'id="lesson-2"',
  'id="lesson-3"',
  'id="simulation"',
  'id="summary"',
  'id="quiz"',
  'id="materials"',
  'id="sources"',
  'data-disaster-mode-button="learner"',
  'data-disaster-mode-button="challenge"',
  'data-disaster-mode-button="instructor"',
  'data-disaster-choice="ctDelay"',
  'data-countdown-duration',
  'data-triage-lane="immediate"',
  'data-triage-lane="delayed"',
  'data-triage-lane="info"'
];
const traumaDisasterStructureIssues = traumaDisasterRequiredSelectors.filter((item) => !traumaDisasterHtml.includes(item));

const traumaDisasterContentIssues = [];
const lesson1Match = traumaDisasterHtml.match(/<section class="lesson" id="lesson-1">[\s\S]*?<section class="lesson" id="lesson-2">/);
const lesson2Match = traumaDisasterHtml.match(/<section class="lesson" id="lesson-2">[\s\S]*?<section class="lesson" id="lesson-3">/);
const lesson3Match = traumaDisasterHtml.match(/<section class="lesson" id="lesson-3">[\s\S]*?<section class="lesson" id="resources">/);
const resourcesMatch = traumaDisasterHtml.match(/<section class="lesson" id="resources">[\s\S]*?<section class="lesson" id="triage">/);
const lesson4Match = traumaDisasterHtml.match(/<section class="lesson" id="simulation">[\s\S]*?<section class="lesson" id="summary">/);
const lesson1Html = lesson1Match ? lesson1Match[0] : '';
const lesson2Html = lesson2Match ? lesson2Match[0] : '';
const lesson3Html = lesson3Match ? lesson3Match[0] : '';
const resourcesHtml = resourcesMatch ? resourcesMatch[0] : '';
const lesson4Html = lesson4Match ? lesson4Match[0] : '';
const lesson1ModuleCount = (lesson1Html.match(/class="teaching-module"/g) || []).length;
const lesson2StageCount = (lesson2Html.match(/class="stage-module"/g) || []).length;
const lesson3ModuleCount = (lesson3Html.match(/lesson3-module/g) || []).length;
const lesson4ModuleCount = (lesson4Html.match(/lesson4-module/g) || []).length;
const lesson1ImageCount = (lesson1Html.match(/<img\b/g) || []).length;
const lesson2ImageCount = (lesson2Html.match(/<img\b/g) || []).length;
const lesson3ImageCount = (lesson3Html.match(/<img\b/g) || []).length + (lesson3Html.match(/class="dv9-scene dv9-system"[^>]*role="img"[^>]*aria-label=/g)||[]).length;
if(!fs.existsSync(path.join(root,'assets/disaster-v9-system.png'))) traumaDisasterContentIssues.push('missing named lesson-3 image atlas');
const lesson4ImageCount = (lesson4Html.match(/<img\b/g) || []).length;
const lessonAnswerCount = ((lesson1Html + lesson2Html).match(/class="thinking-card answer-block"/g) || []).length;
const lesson3QuizCount = (lesson3Html.match(/data-quiz-card/g) || []).length + (resourcesHtml.match(/data-quiz-card/g) || []).length;
const lesson4DecisionCount = (lesson4Html.match(/decision-card answer-block/g) || []).length;
const resourceEventCount = (resourcesHtml.match(/data-resource-event=/g) || []).length;
const lesson4RoundCount = (lesson4Html.match(/class="case-round/g) || []).length;
if (lesson1ModuleCount < 6) {
  traumaDisasterContentIssues.push(`lesson-1 teaching modules ${lesson1ModuleCount}/6`);
}
if (lesson2StageCount < 7) {
  traumaDisasterContentIssues.push(`lesson-2 stage modules ${lesson2StageCount}/7`);
}
if (lesson1ImageCount < 1) {
  traumaDisasterContentIssues.push(`lesson-1 images ${lesson1ImageCount}/1`);
}
if (lesson2ImageCount < 1) {
  traumaDisasterContentIssues.push(`lesson-2 images ${lesson2ImageCount}/1`);
}
if (lessonAnswerCount < 13) {
  traumaDisasterContentIssues.push(`lesson answer blocks ${lessonAnswerCount}/13`);
}
if (lesson3ModuleCount < 6) {
  traumaDisasterContentIssues.push(`lesson-3 modules ${lesson3ModuleCount}/6`);
}
if (lesson3ImageCount < 1) {
  traumaDisasterContentIssues.push(`lesson-3 visuals ${lesson3ImageCount}/1`);
}
if (lesson3QuizCount < 8) {
  traumaDisasterContentIssues.push(`lesson-3 interactive questions ${lesson3QuizCount}/8`);
}
if (resourceEventCount < 6) {
  traumaDisasterContentIssues.push(`resource events ${resourceEventCount}/6`);
}
if (lesson4ModuleCount < 6) {
  traumaDisasterContentIssues.push(`lesson-4 modules ${lesson4ModuleCount}/6`);
}
if (lesson4ImageCount < 1) {
  traumaDisasterContentIssues.push(`lesson-4 visuals ${lesson4ImageCount}/1`);
}
if (lesson4DecisionCount < 8) {
  traumaDisasterContentIssues.push(`lesson-4 decision points ${lesson4DecisionCount}/8`);
}
if (lesson4RoundCount < 4) {
  traumaDisasterContentIssues.push(`lesson-4 release rounds ${lesson4RoundCount}/4`);
}
if (!traumaDisasterHtml.includes('data-progressive-step="3"')) {
  traumaDisasterContentIssues.push('lesson-1 four-step progressive case missing');
}
for (const term of ['Patient reassessment', 'System reassessment', 'Demand-Resource Imbalance', 'Hospital Casualty Flow', '灾难医学资源面板', '患者优先级和系统容量']) {
  if (!traumaDisasterHtml.includes(term)) {
    traumaDisasterContentIssues.push(`missing required lesson-3/4 term: ${term}`);
  }
}
if (traumaDisasterHtml.includes('clinician_approved')) {
  traumaDisasterContentIssues.push('clinician_approved label must not appear');
}

const jsonIssues = [];
for (const { rel, text } of corpus) {
  if (!rel.endsWith('.json')) {
    continue;
  }
  try {
    JSON.parse(text);
  } catch (error) {
    jsonIssues.push(`${rel}: ${error.message}`);
  }
}

const generatedAssetIssues = [];
const generatedDirs = [
  path.join(root, 'assets', 'generated', 'overview'),
  path.join(root, 'assets', 'generated', 'nodes'),
  path.join(root, 'assets', 'generated', 'stages')
];

for (const dir of generatedDirs) {
  if (!fs.existsSync(dir)) {
    generatedAssetIssues.push(`${path.relative(root, dir)} missing`);
    continue;
  }
  const images = fs.readdirSync(dir).filter((file) => file.endsWith('.svg'));
  for (const image of images) {
    const imagePath = path.join(dir, image);
    const stat = fs.statSync(imagePath);
    if (stat.size === 0) {
      generatedAssetIssues.push(`${path.relative(root, imagePath)} empty`);
    }
    const promptPath = path.join(root, 'assets', 'generated', 'prompts', `${path.basename(image, '.svg')}.md`);
    if (!fs.existsSync(promptPath)) {
      generatedAssetIssues.push(`${path.relative(root, imagePath)} missing prompt record`);
      continue;
    }
    const prompt = fs.readFileSync(promptPath, 'utf8');
    if (!prompt.includes('visual_asset_pending_review') || !prompt.includes('No real patient')) {
      generatedAssetIssues.push(`${path.relative(root, promptPath)} missing review boundary`);
    }
  }
}

const imagePath = path.join(root, 'assets', 'xabcde-case-hub.png');

const result = {
  root,
  htmlFiles: htmlFiles.map((item) => item.rel),
  textFileCount: corpus.length,
  zhCount,
  enCount,
  bilingualParity: zhCount === enCount,
  requiredFileMissing,
  missing,
  forbidden,
  legacyBoundaryFindings,
  claimIssues,
  localLinkIssues,
  imageAltIssues,
  pelvicTraumaStructureIssues,
  teachingCaseStructureIssues,
  traumaDisasterStructureIssues,
  traumaDisasterContentIssues,
  jsonIssues,
  generatedAssetIssues,
  imageExists: fs.existsSync(imagePath) && fs.statSync(imagePath).size > 0
};

console.log(JSON.stringify(result, null, 2));

if (
  !result.bilingualParity ||
  requiredFileMissing.length > 0 ||
  missing.length > 0 ||
  forbidden.length > 0 ||
  claimIssues.length > 0 ||
  localLinkIssues.length > 0 ||
  imageAltIssues.length > 0 ||
  pelvicTraumaStructureIssues.length > 0 ||
  traumaDisasterStructureIssues.length > 0 ||
  traumaDisasterContentIssues.length > 0 ||
  jsonIssues.length > 0 ||
  generatedAssetIssues.length > 0 ||
  !result.imageExists
) {
  process.exit(1);
}
