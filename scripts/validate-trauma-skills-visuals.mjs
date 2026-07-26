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
  "assets/trauma-skills-realism-hydrate.js"
];
const expectedIds = ["bvm", "intubation", "cricothyrotomy", "needle-decompression", "tube-thoracostomy", "efast", "tourniquet", "pelvic-binder", "splinting"];
const context = { window: {} };
vm.createContext(context);
for (const file of dataFiles) vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });

const results = [];
const failures = [];

function pngSize(file) {
  const header = fs.readFileSync(file).subarray(0, 24);
  if (header.length < 24 || header.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

for (const id of expectedIds) {
  const skill = context.window.TRAUMA_SKILLS.find((item) => item.id === id);
  const localFailures = [];
  const images = (skill?.competencyRoute || []).map((node) => node.image);
  if (images.length !== 5) localFailures.push(`expected 5 route visuals, found ${images.length}`);
  if (new Set(images).size !== images.length) localFailures.push("route visuals are repeated");
  for (const image of images) {
    if (!image?.startsWith("../assets/trauma-skills/realism/") || !/\.(png|jpe?g|webp)$/i.test(image)) {
      localFailures.push(`not a local raster teaching visual: ${image || "missing"}`);
      continue;
    }
    const absolute = path.join(root, image.slice(3));
    if (!fs.existsSync(absolute)) {
      localFailures.push(`missing visual: ${image}`);
      continue;
    }
    const dimensions = image.endsWith(".png") ? pngSize(absolute) : null;
    if (dimensions && (dimensions.width < 1000 || dimensions.height < 650)) localFailures.push(`visual too small: ${image} (${dimensions.width}x${dimensions.height})`);
  }
  results.push({ id, visuals: images.length, unique: new Set(images).size, pass: localFailures.length === 0 });
  failures.push(...localFailures.map((message) => `${id}: ${message}`));
}

console.log(JSON.stringify({ results, failures }, null, 2));
if (failures.length) process.exit(1);
