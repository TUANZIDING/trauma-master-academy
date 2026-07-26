# xABCDE Visual Learning Design System

## Product Goal

The xABCDE course is a trauma primary-survey learning system, not a static outline. It should support three learner modes:

- Quick review: recall the xABCDE order and key reporting language.
- System learning: study each stage with one-question visuals and short explanations.
- Case reasoning: release information progressively and train reassessment.

## Learning Path

Picture builds intuition -> theory explains why -> case releases clinical context -> learner makes a judgement -> team action is discussed -> patient state changes -> learner reassesses -> knowledge is reviewed.

## Visual Rules

- One image answers one clinical learning question.
- Image text is avoided unless produced as editable SVG and reviewed.
- Ordinary learner labels are: `已审核`, `待审核`, `教学示意`, `来源可查`.
- Raw statuses stay in data or audit mode: `source_required`, `visual_asset_pending_review`, `pending_clinician_review`, `pending_local_confirmation`.
- Radiology cannot be AI-fictionalized; use real licensed anonymized images or clearly marked schematic diagrams only.
- Procedure and device images must be teaching schematics, not step-by-step bedside instructions, until clinician-approved.

## Section Template

Each full stage section uses:

1. Clinical question.
2. One core image.
3. "Look first, answer next" prompt.
4. Mechanism explanation.
5. Clinical observation focus.
6. Team action discussion.
7. Common error.
8. Case judgement.
9. Reassessment question.
10. Memory summary.
11. Source and review status.

## Layout

- Maintain warm paper background, deep navy text, and teal highlights.
- Use restrained cards with 8px radius, no decorative glass effects.
- Reading text should stay within comfortable line length.
- Wide screens use an anchored side navigation and a maximum content width around 1080-1180px.
- Mobile collapses to one column with no horizontal overflow.

## Accessibility

- Every image has alt text and a caption.
- Interactive case choices are buttons.
- Answers use native `<details>` where possible.
- Print mode hides navigation, buttons, and audit controls.

## Safety Boundary

This design system does not authorize clinical directions. It supports supervised education, simulation preparation, and clinician-reviewed courseware only.
