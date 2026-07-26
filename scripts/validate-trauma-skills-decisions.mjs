import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const files = [
  "assets/trauma-skills-data.js",
  "assets/trauma-skills-enriched-data.js",
  "assets/trauma-skills-airway-realism.js",
  "assets/trauma-skills-thoracic-realism.js",
  "assets/trauma-skills-hemorrhage-ortho-realism.js",
  "assets/trauma-skills-realism-hydrate.js",
  "assets/trauma-skills-decision-airway.js",
  "assets/trauma-skills-decision-thoracic.js",
  "assets/trauma-skills-decision-hemorrhage-ortho.js"
];
const context = { window: {} };
vm.createContext(context);
for (const file of files) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) throw new Error(`Missing decision dependency: ${file}`);
  vm.runInContext(fs.readFileSync(absolute, "utf8"), context, { filename: file });
}

const expectedIds = ["bvm", "intubation", "cricothyrotomy", "needle-decompression", "tube-thoracostomy", "efast", "tourniquet", "pelvic-binder", "splinting"];
const sources = context.window.TRAUMA_SKILL_SOURCES || {};
const results = [];
const failures = [];

for (const id of expectedIds) {
  const skill = context.window.TRAUMA_SKILLS.find((item) => item.id === id);
  const d = skill?.clinicalDecision;
  const stageCount = skill?.simulation?.stages?.length || 0;
  const localFailures = [];
  if (!skill) localFailures.push("skill missing");
  if (!d) localFailures.push("clinicalDecision missing");
  for (const field of ["steps", "metricNotes", "signalLabels", "stageSignals", "reassessmentRows", "branchQuestions"]) {
    if (!Array.isArray(d?.[field])) localFailures.push(`${field} missing`);
  }
  if (!d?.ui?.titleZh || !d?.ui?.titleEn || !d?.ui?.signalAriaZh || !d?.ui?.signalAriaEn) localFailures.push("ui bilingual contract incomplete");
  if (d?.stageSignals?.length !== stageCount) localFailures.push("stageSignals length mismatch");
  const signalIds = d?.signalLabels?.map((item) => item[0]) || [];
  for (const [index, stage] of (d?.stageSignals || []).entries()) {
    for (const signalId of signalIds) if (!Array.isArray(stage[signalId]) || stage[signalId].length < 5) localFailures.push(`stage ${index} signal ${signalId} invalid`);
  }
  for (const [index, row] of (d?.reassessmentRows || []).entries()) {
    if (!Array.isArray(row[2]) || !Array.isArray(row[3]) || row[2].length !== stageCount || row[3].length !== stageCount) localFailures.push(`reassessment row ${index} mismatch`);
  }
  const branchIndexes = (d?.branchQuestions || []).map((item) => item.stageIndex);
  if (new Set(branchIndexes).size !== branchIndexes.length) localFailures.push("duplicate branch stage");
  for (const question of (d?.branchQuestions || [])) {
    if (!Number.isInteger(question.stageIndex) || question.stageIndex < 0 || question.stageIndex >= stageCount) localFailures.push("branch stage out of range");
    if (!question.options?.some((option) => option[3] === "best-supported")) localFailures.push(`branch ${question.stageIndex} lacks best-supported option`);
  }
  const sourceIds = [
    ...(d?.steps || []).flatMap((item) => item.sourceIds || []),
    ...(d?.metricNotes || []).map((item) => item.sourceId).filter(Boolean)
  ];
  for (const sourceId of sourceIds) if (!sources[sourceId]?.url) localFailures.push(`source unresolved: ${sourceId}`);
  for (const step of (d?.steps || [])) {
    const asset = step.image?.startsWith("../") ? step.image.slice(3) : step.image;
    if (!asset || !fs.existsSync(path.join(root, asset))) localFailures.push(`step image missing: ${step.image || "empty"}`);
  }
  results.push({ id, steps: d?.steps?.length || 0, metrics: d?.metricNotes?.length || 0, signals: signalIds.length, stages: stageCount, branches: d?.branchQuestions?.length || 0, pass: localFailures.length === 0 });
  failures.push(...localFailures.map((message) => `${id}: ${message}`));
}

console.log(JSON.stringify({ results, failures }, null, 2));
if (failures.length) process.exit(1);
