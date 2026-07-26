import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stageDir = path.join(root, 'assets', 'generated', 'stages');
const promptDir = path.join(root, 'assets', 'generated', 'prompts');

for (const dir of [stageDir, promptDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const palette = {
  paper: '#fffdf8',
  panel: '#f7f2ea',
  teal: '#1f6f78',
  blue: '#335c7a',
  sage: '#6f8f82',
  coral: '#b45d4f',
  alert: '#8b1e1e',
  gold: '#a96d16',
  ink: '#1f2937',
  line: '#ded4c3',
  mist: '#d9eeeb'
};

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function writePrompt(stage) {
  const prompt = `# ${stage.file}

type: xabcde-stage-illustration
review_status: visual_asset_pending_review
medical_boundary: Educational scene only. No real patient, no hospital logo, no readable medical orders, no drug names, no device sizes, no action thresholds, no procedure steps.

## Prompt

Clean modern medical education illustration for the ${stage.letter} stage of xABCDE trauma teaching. Show ${stage.promptScene}. Use a bright trauma courseware style with off-white clinical space, teal/sage/gold accents, calm team communication, abstract devices, no readable numbers, no labels inside the image, no blood or gore, and no bedside instruction.

## Intended Use

Inserted into the xABCDE stage card as a visual learning aid. The image supports observation, reporting, resource awareness, and reassessment language only. Clinical wording, route labels, and review status remain in HTML.
`;
  fs.writeFileSync(path.join(promptDir, `${stage.file}.md`), prompt);
}

function clinician(x, y, color = palette.teal) {
  return `<g>
    <circle cx="${x}" cy="${y}" r="17" fill="${palette.paper}" stroke="${color}" stroke-width="6"/>
    <path d="M${x - 28} ${y + 55}c5-31 16-47 28-47s23 16 28 47" fill="${palette.paper}" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
    <path d="M${x - 34} ${y + 38}h68" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
  </g>`;
}

function monitor(x, y, accent) {
  return `<g>
    <rect x="${x}" y="${y}" width="138" height="92" rx="14" fill="${palette.ink}"/>
    <path d="M${x + 18} ${y + 55}h24l14-29 18 54 17-32h29" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="${x + 43}" y="${y + 104}" width="54" height="12" rx="6" fill="${palette.blue}"/>
  </g>`;
}

function patientSilhouette(x, y, accent) {
  return `<g opacity="0.96">
    <rect x="${x}" y="${y}" width="254" height="76" rx="38" fill="${palette.paper}" stroke="${palette.line}" stroke-width="5"/>
    <circle cx="${x + 210}" cy="${y + 38}" r="24" fill="${palette.paper}" stroke="${accent}" stroke-width="6"/>
    <path d="M${x + 32} ${y + 38}h138" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.42"/>
  </g>`;
}

function stageIcon(stage, accent) {
  if (stage.icon === 'bleeding-cues') {
    return `<g>
      ${patientSilhouette(188, 160, accent)}
      <rect x="116" y="242" width="132" height="48" rx="14" fill="${palette.paper}" stroke="${accent}" stroke-width="6"/>
      <path d="M144 266h76" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.55"/>
      <circle cx="150" cy="126" r="46" fill="${palette.mist}" stroke="${accent}" stroke-width="7"/>
      <path d="M130 127h40M150 107v40" stroke="${palette.blue}" stroke-width="8" stroke-linecap="round"/>
    </g>`;
  }
  if (stage.icon === 'airway') {
    return `<g>
      ${patientSilhouette(186, 178, accent)}
      <path d="M405 183c-20 5-35 17-43 33" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
      <path d="M403 152c26 21 28 58 4 84" fill="none" stroke="${palette.blue}" stroke-width="8" stroke-linecap="round"/>
      <rect x="106" y="122" width="138" height="94" rx="24" fill="${palette.paper}" stroke="${accent}" stroke-width="6"/>
      <path d="M141 168h67M175 139v58" stroke="${palette.blue}" stroke-width="8" stroke-linecap="round"/>
    </g>`;
  }
  if (stage.icon === 'breathing') {
    return `<g>
      <path d="M290 112v206" stroke="${palette.blue}" stroke-width="12" stroke-linecap="round"/>
      <path d="M290 142c-84 12-128 55-142 126M290 184c-68 10-110 39-130 94M290 142c84 12 128 55 142 126M290 184c68 10 110 39 130 94" fill="none" stroke="${palette.paper}" stroke-width="18" stroke-linecap="round"/>
      <path d="M290 142c-84 12-128 55-142 126M290 184c-68 10-110 39-130 94M290 142c84 12 128 55 142 126M290 184c68 10 110 39 130 94" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
      <path d="M120 92c38-24 72-24 104 0M356 92c38-24 72-24 104 0" fill="none" stroke="${palette.sage}" stroke-width="8" stroke-linecap="round" opacity="0.78"/>
    </g>`;
  }
  if (stage.icon === 'circulation') {
    return `<g>
      ${monitor(106, 112, accent)}
      <circle cx="380" cy="182" r="72" fill="${palette.paper}" stroke="${accent}" stroke-width="8"/>
      <path d="M352 182h56M380 154v56" stroke="${palette.blue}" stroke-width="10" stroke-linecap="round"/>
      <path d="M295 284c-38 16-83 15-122-2" fill="none" stroke="${palette.sage}" stroke-width="10" stroke-linecap="round" opacity="0.75"/>
    </g>`;
  }
  if (stage.icon === 'disability') {
    return `<g>
      <path d="M276 113c-55-20-101 16-107 61-42 7-63 40-51 78 11 35 49 51 85 36 18 37 69 53 106 27 39 23 91 7 106-35 40 1 71-25 76-62 5-45-28-82-73-88-20-38-74-53-142-17z" fill="${palette.paper}" stroke="${accent}" stroke-width="9"/>
      <path d="M252 135c-19 35-5 72 30 90M345 134c25 29 25 65-1 94M203 211c31-4 54 9 69 35M381 222c30-10 57 0 77 28" fill="none" stroke="${palette.blue}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="128" cy="126" r="42" fill="${palette.mist}" stroke="${palette.blue}" stroke-width="7"/>
      <circle cx="116" cy="126" r="7" fill="${accent}"/><circle cx="140" cy="126" r="7" fill="${accent}"/>
    </g>`;
  }
  return `<g>
    ${patientSilhouette(182, 150, accent)}
    <path d="M132 286c72 32 232 36 316 0" fill="none" stroke="${palette.sage}" stroke-width="12" stroke-linecap="round" opacity="0.75"/>
    <circle cx="130" cy="126" r="45" fill="${palette.paper}" stroke="${accent}" stroke-width="7"/>
    <path d="M110 126h40M130 106v40" stroke="${palette.blue}" stroke-width="8" stroke-linecap="round"/>
    <path d="M440 126c-28 16-44 40-46 70" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  </g>`;
}

function svg(stage) {
  const accent = stage.accent;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 430" role="img" aria-label="${esc(stage.alt)}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#fffdf8"/>
        <stop offset="0.55" stop-color="#e7f2ef"/>
        <stop offset="1" stop-color="#fff4e9"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#1f2937" flood-opacity="0.12"/>
      </filter>
    </defs>
    <rect width="720" height="430" rx="32" fill="url(#bg)"/>
    <path d="M0 334 C 130 285, 222 410, 360 340 S 562 264, 720 330 V430 H0z" fill="#ffffff" opacity="0.66"/>
    <path d="M60 70 C 160 20, 240 74, 330 46 S 520 16, 660 70" fill="none" stroke="#ffffff" stroke-width="26" opacity="0.62"/>
    <g opacity="0.92">
      ${clinician(116, 302, palette.teal)}
      ${clinician(594, 298, palette.sage)}
    </g>
    <g filter="url(#shadow)">
      ${stageIcon(stage, accent)}
    </g>
    <circle cx="76" cy="72" r="38" fill="${accent}"/>
    <text x="76" y="86" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" fill="#ffffff" font-weight="800">${esc(stage.letter)}</text>
  </svg>`;
}

const stages = [
  {
    file: 'xabcde-stage-x',
    letter: 'x',
    accent: palette.alert,
    icon: 'bleeding-cues',
    alt: 'Generated teaching illustration for x stage visible external bleeding cues',
    promptScene: 'a learner noticing visible rapid blood-loss cues around the bedspace and reporting to the trauma team'
  },
  {
    file: 'xabcde-stage-a',
    letter: 'A',
    accent: palette.teal,
    icon: 'airway',
    alt: 'Generated teaching illustration for A stage airway and c-spine observation',
    promptScene: 'airway and cervical spine protection as observation and team-language concepts, without any procedure'
  },
  {
    file: 'xabcde-stage-b',
    letter: 'B',
    accent: palette.blue,
    icon: 'breathing',
    alt: 'Generated teaching illustration for B stage breathing and chest movement observation',
    promptScene: 'breathing observation, chest movement, and abstract respiratory monitoring cues'
  },
  {
    file: 'xabcde-stage-c',
    letter: 'C',
    accent: palette.gold,
    icon: 'circulation',
    alt: 'Generated teaching illustration for C stage circulation and shock cue recognition',
    promptScene: 'circulation and hidden bleeding concern represented by monitor trends and resource awareness'
  },
  {
    file: 'xabcde-stage-d',
    letter: 'D',
    accent: palette.coral,
    icon: 'disability',
    alt: 'Generated teaching illustration for D stage neurologic observation',
    promptScene: 'neurologic observation, mental status and pupil attention as abstract teaching cues'
  },
  {
    file: 'xabcde-stage-e',
    letter: 'E',
    accent: palette.sage,
    icon: 'exposure',
    alt: 'Generated teaching illustration for E stage exposure environment and reassessment',
    promptScene: 'exposure, privacy, warmth, missed-injury search, and reassessment loop as calm teaching concepts'
  }
];

for (const stage of stages) {
  fs.writeFileSync(path.join(stageDir, `${stage.file}.svg`), svg(stage));
  writePrompt(stage);
}

console.log(JSON.stringify({ xabcdeStageIllustrations: stages.length }, null, 2));
