import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const dataFiles = [
  "assets/trauma-skills-data.js",
  "assets/trauma-skills-enriched-data.js",
  "assets/trauma-skills-airway-realism.js",
  "assets/trauma-skills-thoracic-realism.js",
  "assets/trauma-skills-hemorrhage-ortho-realism.js",
  "assets/trauma-skills-source-backed-data.js",
  "assets/trauma-skills-realism-hydrate.js"
];
const expectedIds = ["bvm", "intubation", "cricothyrotomy", "needle-decompression", "tube-thoracostomy", "efast", "tourniquet", "pelvic-binder", "splinting"];
const context = { window: {} };
vm.createContext(context);
for (const file of dataFiles) vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });

const results = [];
const failures = [];

const manifest = fs.readFileSync(path.join(root, "sources/core-source-backed/media-sources.csv"), "utf8");
for (const id of expectedIds) {
  const skill = context.window.TRAUMA_SKILLS.find(item => item.id === id);
  const localFailures = [];
  const nodes = skill?.competencyRoute || [];
  if (nodes.length !== 5) localFailures.push("five learning nodes required");
  if (!skill?.sourceBackedHtml?.includes("Clinical teacher review pending")) localFailures.push("clinical review state missing");
  if (!skill?.heroAttribution) localFailures.push("hero attribution missing");
  for (const node of nodes) {
    if (!['open-image','official-link','task-card-only'].includes(node.mediaKind)) localFailures.push("unsupported media kind");
    if (node.image) {
      const filename = path.basename(node.image);
      if (!node.image.startsWith('../assets/source-backed/') || !manifest.includes(filename) || !node.visualAttribution || !fs.existsSync(path.join(root,node.image.slice(3)))) localFailures.push(`unverified/missing image ${node.image}`);
    }
    if (node.mediaKind === 'official-link' && !/^https:\/\//.test(node.sourceUrl)) localFailures.push('official HTTPS source missing');
    if (node.embedUrl || /\.mp4(?:$|\?)/.test(node.mediaUrl)) localFailures.push('unapproved video embedding');
  }
  results.push({id, nodes:nodes.length, pass:!localFailures.length});
  failures.push(...localFailures.map(message => `${id}: ${message}`));
}
console.log(JSON.stringify({ results, failures }, null, 2));
if (failures.length) process.exit(1);
