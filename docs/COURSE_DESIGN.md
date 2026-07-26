# Course Design

## Direction

The courseware follows a visual portfolio/course-reader style:

- first screen shows the real courseware, not a marketing landing page;
- modules open as standalone teaching pages under `courses/`;
- each module combines short explanations, visual diagrams, interaction prompts, and source/review status;
- bilingual content is authored explicitly, not translated at runtime.

## Learning Progression

1. Start with xABCDE as the shared reasoning frame.
2. Apply xABCDE to single-region injuries:
   - pelvic trauma;
   - traumatic brain injury;
   - chest trauma;
   - abdominal injury.
3. Apply xABCDE to polytrauma combinations:
   - pelvis plus chest;
   - abdomen plus traumatic brain injury;
   - head, chest, abdomen, and pelvis.
4. Link mature modules to TraumaMaster simulation cases without changing deterministic scoring.

## V1 Structure

- `index.html`: portal, course cards, curriculum skeleton, tool-node policy, and source dashboard.
- `courses/trauma-bay.html`: trauma bay orientation, roles, handoff, and debrief language.
- `courses/xabcde.html`: xABCDE as a shared reasoning language for observation, reporting, coordination, and reassessment.
- `courses/pelvic-trauma.html`: pelvic trauma risk map and team communication around occult bleeding and pelvic-binder concepts.
- `courses/trauma-care-chain.html`: A+B expansion core course for prehospital alert, bay handoff, xABCDE, shock recognition, resources, and transfer handoff.
- Mini modules: traumatic brain injury, chest trauma/flail chest, abdominal organ injury, and integrated polytrauma.
- Real case and instructor-preview layers remain future work until de-identification, local confirmation, and clinician signoff are complete.

## A+B Expansion Rule

The Obsidian emergency trauma pathway notes are structure inputs only. Convert pathway content into learner-facing windows for observation cues, team reporting language, resource maps, and reassessment questions. Do not publish treatment algorithms, drug or product plans, procedural steps, action thresholds, or local activation criteria.

## Visual Asset Rule

Each course starts with a route overview image and HTML/SVG route labels. Detailed course sections can add stage-level teaching illustrations, such as the xABCDE x/A/B/C/D/E cards. Generated visuals provide scene, anatomy, equipment, and atmosphere only. Do not bake clinical text, thresholds, drug names, device sizes, or action commands into generated images. Each generated asset must have a prompt record in `assets/generated/prompts/` and remains `visual_asset_pending_review`.

## Content Rule

Each clinical concept should be written as:

- what learners observe;
- how learners report it;
- which team communication node it belongs to;
- when learners should expect reassessment;
- what review status applies.

Do not write bedside algorithms, drug doses, procedure steps, thresholds, or local activation criteria.
