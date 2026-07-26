import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const overviewDir = path.join(root, 'assets', 'generated', 'overview');
const nodeDir = path.join(root, 'assets', 'generated', 'nodes');
const promptDir = path.join(root, 'assets', 'generated', 'prompts');

for (const dir of [overviewDir, nodeDir, promptDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const palette = {
  paper: '#fffdf8',
  teal: '#1f6f78',
  lightTeal: '#d9eeeb',
  blue: '#335c7a',
  sage: '#88a995',
  coral: '#c56f5d',
  gold: '#d49a44',
  ink: '#1f2937',
  muted: '#6b7785'
};

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function writePrompt(name, type, prompt, usage) {
  const md = `# ${name}

type: ${type}
review_status: visual_asset_pending_review
medical_boundary: Educational scene only. No real patient, no hospital logo, no readable medical orders, no drug names, no device sizes, no action thresholds, no procedure steps.

## Prompt

${prompt}

## Intended Use

${usage}
`;
  fs.writeFileSync(path.join(promptDir, `${name}.md`), md);
}

function overviewSvg({ title, accent, scenes }) {
  const cards = scenes.map((scene, index) => {
    const x = 44 + index * 138;
    const y = index % 2 === 0 ? 78 : 150;
    const icon = scene.icon || 'circle';
    const iconShape = icon === 'ambulance'
      ? `<rect x="${x + 20}" y="${y + 38}" width="58" height="30" rx="6" fill="${palette.paper}" stroke="${accent}" stroke-width="4"/><circle cx="${x + 36}" cy="${y + 72}" r="6" fill="${palette.blue}"/><circle cx="${x + 70}" cy="${y + 72}" r="6" fill="${palette.blue}"/><path d="M${x + 33} ${y + 47}h13v13h-13zM${x + 51} ${y + 47}h20" stroke="${accent}" stroke-width="3"/>`
      : icon === 'team'
        ? `<circle cx="${x + 38}" cy="${y + 45}" r="12" fill="${palette.teal}"/><circle cx="${x + 62}" cy="${y + 45}" r="12" fill="${palette.sage}"/><circle cx="${x + 50}" cy="${y + 70}" r="16" fill="${accent}"/>`
        : icon === 'monitor'
          ? `<rect x="${x + 22}" y="${y + 38}" width="64" height="44" rx="7" fill="${palette.ink}"/><path d="M${x + 31} ${y + 61}h12l7-13 7 25 7-12h13" fill="none" stroke="${accent}" stroke-width="4"/>`
          : icon === 'scanner'
            ? `<circle cx="${x + 54}" cy="${y + 58}" r="29" fill="${palette.paper}" stroke="${palette.blue}" stroke-width="8"/><rect x="${x + 22}" y="${y + 84}" width="68" height="12" rx="6" fill="${accent}"/>`
            : icon === 'ultrasound'
              ? `<rect x="${x + 18}" y="${y + 34}" width="58" height="44" rx="6" fill="${palette.ink}"/><path d="M${x + 28} ${y + 67}c10-24 25-24 38 0" fill="none" stroke="${accent}" stroke-width="4"/><path d="M${x + 76} ${y + 73}l17 17" stroke="${palette.blue}" stroke-width="7" stroke-linecap="round"/>`
              : `<circle cx="${x + 54}" cy="${y + 58}" r="32" fill="${palette.paper}" stroke="${accent}" stroke-width="8"/><path d="M${x + 37} ${y + 59}h34M${x + 54} ${y + 42}v34" stroke="${palette.blue}" stroke-width="7" stroke-linecap="round"/>`;
    return `<g>
      <rect x="${x}" y="${y}" width="108" height="112" rx="24" fill="rgba(255,253,248,0.86)" stroke="${palette.lightTeal}" stroke-width="2"/>
      ${iconShape}
      <circle cx="${x + 14}" cy="${y + 14}" r="13" fill="${accent}"/>
      <text x="${x + 14}" y="${y + 19}" text-anchor="middle" font-family="Arial" font-size="13" fill="#fff" font-weight="700">${index + 1}</text>
    </g>`;
  }).join('\n');
  const arrows = scenes.slice(0, -1).map((_, index) => {
    const x1 = 150 + index * 138;
    const y1 = index % 2 === 0 ? 132 : 204;
    const x2 = 174 + index * 138;
    const y2 = index % 2 === 0 ? 176 : 104;
    return `<path d="M${x1} ${y1} C ${x1 + 45} ${y1}, ${x2 - 25} ${y2}, ${x2 + 42} ${y2}" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.72"/><path d="M${x2 + 42} ${y2}l-18-10 5 20z" fill="${accent}" opacity="0.72"/>`;
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" role="img" aria-label="${esc(title)}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#f8f4ec"/>
        <stop offset="0.48" stop-color="#e4f2ef"/>
        <stop offset="1" stop-color="#fff4e9"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#1f2937" flood-opacity="0.14"/>
      </filter>
    </defs>
    <rect width="960" height="420" rx="34" fill="url(#bg)"/>
    <path d="M0 336 C 180 250, 305 445, 480 330 S 760 220, 960 326 V420 H0z" fill="#ffffff" opacity="0.64"/>
    <path d="M40 38 C 160 4, 222 60, 326 30 S 518 4, 680 43 S 820 76, 924 30" fill="none" stroke="#ffffff" stroke-width="28" opacity="0.52"/>
    <g filter="url(#shadow)">
      ${arrows}
      ${cards}
    </g>
  </svg>`;
}

function nodeSvg({ title, accent, icon }) {
  const iconShape = icon === 'brain'
    ? `<path d="M218 132c-48-16-86 13-91 53-35 7-53 35-43 67 10 31 42 43 72 31 16 32 58 45 90 23 32 19 76 5 89-31 35 2 61-21 65-53 5-39-22-72-61-78-17-33-63-45-121-12z" fill="#fffdf8" stroke="${accent}" stroke-width="9"/><path d="M199 151c-16 30-5 61 25 76M279 147c23 25 23 55 0 81M157 213c26-3 45 7 58 30M309 226c28-9 52 0 68 25" fill="none" stroke="#335c7a" stroke-width="7" stroke-linecap="round"/>`
    : icon === 'rib'
      ? `<path d="M240 104v214" stroke="#335c7a" stroke-width="12" stroke-linecap="round"/><path d="M240 136c-74 10-119 45-132 103M240 174c-58 8-98 34-119 79M240 136c74 10 119 45 132 103M240 174c58 8 98 34 119 79" fill="none" stroke="#fffdf8" stroke-width="16" stroke-linecap="round"/><path d="M240 136c-74 10-119 45-132 103M240 174c-58 8-98 34-119 79M240 136c74 10 119 45 132 103M240 174c58 8 98 34 119 79" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>`
      : icon === 'pelvis'
        ? `<path d="M151 142c42-28 86 7 89 60 3-53 47-88 89-60 42 27 20 110-34 144-33 20-48-28-55-70-7 42-22 90-55 70-54-34-76-117-34-144z" fill="#fffdf8" stroke="${accent}" stroke-width="9"/><circle cx="240" cy="196" r="25" fill="#d9eeeb" stroke="#335c7a" stroke-width="7"/>`
        : icon === 'abdomen'
          ? `<ellipse cx="240" cy="205" rx="118" ry="112" fill="#fffdf8" stroke="${accent}" stroke-width="9"/><path d="M208 137c-39 30-51 93-29 138M276 137c40 30 52 94 29 138M183 211h115" fill="none" stroke="#335c7a" stroke-width="7" stroke-linecap="round"/><circle cx="304" cy="211" r="23" fill="#d9eeeb" stroke="#335c7a" stroke-width="6"/>`
          : icon === 'ambulance'
            ? `<rect x="118" y="165" width="202" height="78" rx="14" fill="#fffdf8" stroke="${accent}" stroke-width="9"/><path d="M285 165l36 36v42" fill="none" stroke="${accent}" stroke-width="9"/><circle cx="165" cy="253" r="18" fill="#335c7a"/><circle cx="293" cy="253" r="18" fill="#335c7a"/><path d="M174 193h38M193 174v38" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>`
            : icon === 'ultrasound'
              ? `<rect x="126" y="116" width="178" height="120" rx="18" fill="#1f2937"/><path d="M160 205c24-64 73-64 108 0" fill="none" stroke="${accent}" stroke-width="10"/><path d="M303 229l47 47" stroke="#335c7a" stroke-width="16" stroke-linecap="round"/><circle cx="240" cy="278" r="18" fill="#fffdf8" stroke="${accent}" stroke-width="7"/>`
              : `<circle cx="240" cy="204" r="102" fill="#fffdf8" stroke="${accent}" stroke-width="10"/><path d="M190 205h100M240 155v100" stroke="#335c7a" stroke-width="12" stroke-linecap="round"/><circle cx="317" cy="132" r="28" fill="#d9eeeb" stroke="${accent}" stroke-width="7"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" role="img" aria-label="${esc(title)}">
    <defs>
      <linearGradient id="nodeBg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#f8f4ec"/>
        <stop offset="1" stop-color="#e5f2ee"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#1f2937" flood-opacity="0.12"/>
      </filter>
    </defs>
    <rect width="480" height="360" rx="30" fill="url(#nodeBg)"/>
    <circle cx="76" cy="72" r="58" fill="#fffdf8" opacity="0.72"/>
    <circle cx="412" cy="292" r="82" fill="#fff4e9" opacity="0.78"/>
    <g filter="url(#shadow)">${iconShape}</g>
  </svg>`;
}

const overviews = [
  ['trauma-care-chain', '#1f6f78', [
    { icon: 'ambulance' }, { icon: 'team' }, { icon: 'monitor' }, { icon: 'ultrasound' }, { icon: 'scanner' }, { icon: 'team' }
  ], 'AI-style wide clinical pathway background showing prehospital arrival, trauma team activation, resuscitation bay, imaging resources, reassessment, and transfer handoff. No embedded text or clinical instructions.', 'Top overview route for the Trauma Care Chain course.'],
  ['trauma-bay', '#335c7a', [
    { icon: 'team' }, { icon: 'monitor' }, { icon: 'team' }, { icon: 'ultrasound' }, { icon: 'monitor' }, { icon: 'team' }
  ], 'AI-style trauma bay orientation background showing room zones, team roles, safe learner position, handoff board, first minutes, and debrief. No text, no real patient.', 'Top overview route for the First Day in the Trauma Bay course.'],
  ['xabcde', '#1f6f78', [
    { icon: 'circle' }, { icon: 'team' }, { icon: 'monitor' }, { icon: 'ultrasound' }, { icon: 'scanner' }, { icon: 'team' }
  ], 'AI-style abstract xABCDE learning background with six connected clinical reasoning stations. No readable text, no action algorithm.', 'Top overview route for the xABCDE course.'],
  ['pelvic-trauma', '#b45d4f', [
    { icon: 'ambulance' }, { icon: 'team' }, { icon: 'monitor' }, { icon: 'circle' }, { icon: 'scanner' }, { icon: 'team' }
  ], 'AI-style pelvic trauma pathway background with prehospital mechanism, trauma team, xABCDE circulation focus, pelvic risk map, imaging/resource discussion, and reassessment. No procedure steps.', 'Top overview route for the pelvic trauma course.'],
  ['tbi-mini', '#335c7a', [
    { icon: 'ambulance' }, { icon: 'team' }, { icon: 'monitor' }, { icon: 'scanner' }
  ], 'AI-style traumatic brain injury mini-module background showing airway-disability linkage, c-spine protection concept, neuro observation, and reassessment. No thresholds or treatment instructions.', 'Mini overview for TBI module.'],
  ['chest-trauma-mini', '#1f6f78', [
    { icon: 'team' }, { icon: 'monitor' }, { icon: 'scanner' }, { icon: 'team' }
  ], 'AI-style chest trauma mini-module background showing breathing observation, chest movement, imaging communication, and team reassessment. No procedures.', 'Mini overview for chest trauma module.'],
  ['abdominal-injury-mini', '#a96d16', [
    { icon: 'ambulance' }, { icon: 'ultrasound' }, { icon: 'scanner' }, { icon: 'team' }
  ], 'AI-style abdominal injury mini-module background showing mechanism, abdominal observation, FAST/EFAST information node, imaging, and reassessment. No operation decision algorithm.', 'Mini overview for abdominal injury module.'],
  ['polytrauma-mini', '#8b1e1e', [
    { icon: 'team' }, { icon: 'monitor' }, { icon: 'scanner' }, { icon: 'team' }
  ], 'AI-style polytrauma integration background showing competing priorities across head, chest, abdomen, pelvis, parallel teamwork, resource escalation, and reassessment. No real case.', 'Mini overview for polytrauma module.']
];

for (const [name, accent, scenes, prompt, usage] of overviews) {
  fs.writeFileSync(path.join(overviewDir, `${name}.svg`), overviewSvg({ title: name, accent, scenes }));
  writePrompt(name, 'overview', prompt, usage);
}

const nodes = [
  ['prehospital-alert', '#1f6f78', 'ambulance', 'AI-style prehospital alert scene with ambulance and emergency entrance, no text or logos.', 'Node visual for pre-alert and handoff.'],
  ['team-handoff', '#335c7a', 'team', 'AI-style trauma team handoff scene in bright resuscitation bay, no real patient identifiers.', 'Node visual for team handoff and role map.'],
  ['xabcde-loop', '#1f6f78', 'monitor', 'AI-style abstract monitor and team reasoning scene for xABCDE reassessment, no readable numbers.', 'Node visual for xABCDE and reassessment.'],
  ['imaging-resources', '#335c7a', 'scanner', 'AI-style imaging resource scene with CT scanner and abstract workstation, no patient details.', 'Node visual for imaging resource discussion.'],
  ['efast-node', '#a96d16', 'ultrasound', 'AI-style ultrasound information node, no scanning instructions or labels.', 'Node visual for FAST/EFAST information node.'],
  ['pelvic-risk', '#b45d4f', 'pelvis', 'AI-style pelvic anatomy concept visual for risk recognition, no procedure step.', 'Node visual for pelvic risk concept.'],
  ['brain-risk', '#335c7a', 'brain', 'AI-style brain concept visual for neurologic observation, no threshold or treatment.', 'Node visual for TBI concepts.'],
  ['chest-risk', '#1f6f78', 'rib', 'AI-style rib cage concept visual for breathing observation, no procedure step.', 'Node visual for chest trauma concepts.'],
  ['abdominal-risk', '#a96d16', 'abdomen', 'AI-style abdomen concept visual for hidden bleeding discussion, no operation instruction.', 'Node visual for abdominal injury concepts.'],
  ['polytrauma-priority', '#8b1e1e', 'circle', 'AI-style priority conflict concept visual for integrated polytrauma, no real case.', 'Node visual for polytrauma integration.']
];

for (const [name, accent, icon, prompt, usage] of nodes) {
  fs.writeFileSync(path.join(nodeDir, `${name}.svg`), nodeSvg({ title: name, accent, icon }));
  writePrompt(name, 'node', prompt, usage);
}

console.log(JSON.stringify({
  overview: overviews.length,
  nodes: nodes.length,
  promptRecords: overviews.length + nodes.length
}, null, 2));
