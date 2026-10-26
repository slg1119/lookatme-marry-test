# Design: marry-test

The shared system for the home, questionnaire, result, shared type, and public test guide pages.

## System
- Genre: playful, bright and friendly.
- Shape: a large opening scene, the collection of marriage styles, relationship notes, a closing invitation.
- Theme: existing brand, recomposed. Keep the wine accent, ink, logo and original illustrations.
- User request: Pretendard throughout, like the admin site. No serif display or decorative English labels.
- Surface: light cream, soft blush for scenes, sage for quiet secondary regions.
- The test is a conversation starter. Never imply a clinical diagnosis or measured compatibility.

## Tokens
`src/tokens.css` is the source of truth.

```css
:root {
  --color-paper: #fdfbf7;
  --color-paper-2: #f6eae5;
  --color-ink: #343b32;
  --color-muted: #5e6359;
  --color-accent: #753d45;
  --color-accent-ink: #fdfbf7;
  --color-sage: #eef2e8;
  --font-display: "Pretendard Variable", sans-serif;
  --font-body: "Pretendard Variable", sans-serif;
  --radius-card: 24px;
  --radius-input: 12px;
}
```

## Layout and controls
- One centered content container, capped at 1280px.
- Home: large sans headings, open surfaces, horizontal illustrated type entries.
- Questionnaire: one question, native radio options, clear selected state and progress.
- Result: a shareable illustrated identity beside the explanation, then conversation prompts.
- Primary: wine fill and paper text, 52px minimum height, 12px radius.
- Secondary: neutral border or text; every target at least 44px high.
- Focus appears instantly; disabled controls change fill, ink and cursor.
- Labels use sentence case, body face and normal tracking.

## Motion
- Calm, only press and state feedback. No scroll reveals or decorative animation.
- Reduced motion disables transitions. Content is visible without animation.

## Preservation
- Keep every route, link, event handler, test hook and original question and result fact.
- Keep all privacy and diagnostic disclaimers verbatim.
- Original illustration assets are retained under the redesign content rule.
- Test scoring, storage contracts and API behavior are outside the design system.

## Exports
`src/tokens.css`, `src/base.css`, `src/styles.css`.
The browser uses the locally served Pretendard variable subsets. Social previews use bundled Pretendard OTF subsets; their colors are read from the same tokens.
