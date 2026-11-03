# Portfolio Project Guidelines

These instructions apply to all changes in this repository. Preserve the existing visual language and interaction behavior unless the request explicitly requires a change.

## Project Structure

- Treat [index.html](../index.html) as the semantic page shell. Keep major content inside the existing `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` landmarks.
- Put current visual refinements in [minimal-overrides.css](../minimal-overrides.css). Reuse existing selectors and tokens before editing the legacy [styles.css](../styles.css).
- Put behavior in [script.js](../script.js). Keep DOM selectors, animation logic, showcase data, modal behavior, and carousel behavior synchronized with the markup.
- Keep project assets in `Images/` and use relative paths consistent with the existing HTML.
- Do not add a framework, build tool, or dependency for a styling or markup change that can be handled with the existing static files.

## Modern CSS Conventions

- Use CSS custom properties for shared colors, spacing, borders, and durations. Extend the `:root` tokens in `minimal-overrides.css`; do not scatter repeated color literals throughout new rules.
- Prefer `rem`, `em`, `%`, `clamp()`, `min()`, `max()`, `minmax()`, and viewport-relative units over fixed pixel sizing for layout and typography.
- Use Flexbox for one-dimensional alignment and Grid for page sections, card collections, and two-dimensional layouts. Avoid absolute positioning for primary content flow.
- Apply `box-sizing: border-box` consistently and prevent overflow with `min-width: 0` on flexible children, responsive media sizing, and intentional `overflow` rules.
- Preserve the project’s typography roles: `DM Serif Display` for editorial headings, `Manrope` for prominent display/body text where already established, `DM Sans` for interface text, and `IBM Plex Mono` for metadata and technology labels.
- Keep animations purposeful and non-blocking. Add `prefers-reduced-motion` behavior for new transitions or continuous animations.
- Use class-based selectors with names that describe the component. Avoid new broad element selectors that can unexpectedly override the legacy stylesheet.
- Keep CSS readable and grouped by component, followed by responsive overrides. Do not duplicate rules merely to override an earlier rule; consolidate when touching the same component.

## Responsive Design

Use mobile-first thinking even though the existing stylesheet contains desktop-first legacy rules:

- **Mobile:** up to `768px`. Use single-column layouts, fluid widths, `clamp()` typography, touch-friendly controls, and no horizontal page overflow.
- **Tablet:** `769px`–`1024px`. Preserve readable gutters, allow controlled two-column layouts, and verify cards, navigation, and images at intermediate widths.
- **Desktop:** `1025px` and wider. Use the existing `90vw`/`1440px` content constraint and multi-column showcase/card layouts.
- Keep the existing `420px` small-phone breakpoint when a narrower navigation or typography adjustment is necessary.
- Test at narrow mobile, tablet, and desktop widths after layout changes. Never rely on desktop appearance as proof that mobile works.
- Ensure images and videos scale within their containers, text wraps without clipping, and interactive cards remain usable with touch and keyboard input.
- Preserve intentional carousel behavior, but ensure duplicated decorative content does not create accessible duplicate announcements or page-width overflow.

## Semantic HTML and Accessibility

- Use semantic HTML5 landmarks: one `<header>`, one `<main>`, meaningful `<section>` elements with headings, `<article>` for independent cards/testimonials, `<nav>` for navigation, and `<footer>` for contact links.
- Maintain a logical heading hierarchy. Use one page `<h1>`, then section headings in order; do not use styled `<div>` elements where a heading, paragraph, list, button, or link is appropriate.
- Use `<button>` for actions and `<a>` for navigation. Do not nest interactive elements, especially links inside buttons. If a showcase item needs both selection and navigation, separate those controls or make the whole item one clear interaction.
- Keep `aria-labelledby`, `aria-label`, `aria-selected`, `aria-controls`, `role="tablist"`, `role="tab"`, and `role="tabpanel"` synchronized whenever the showcase behavior changes.
- Keep dialogs keyboard accessible: provide an accessible name, a visible close button with an `aria-label`, focus-safe controls, and accurate `aria-hidden`/visibility state changes.
- Give meaningful images descriptive `alt` text. Use `alt=""` only for decorative images or duplicated carousel content marked `aria-hidden="true"`. Do not use placeholder alt text for meaningful project imagery.
- Preserve the skip link and visible keyboard focus states. Never remove `:focus-visible` styling or make keyboard-only controls inaccessible.
- Use sufficient color contrast and do not communicate state through color alone. Verify hover, focus, active, and disabled states on interactive components.
- Add `aria-hidden="true"` to decorative arrows, separators, and animation-only duplicates when they should not be announced by assistive technology.

## Content and Interaction Safety

- Preserve existing project URLs, asset paths, carousel duplication counts, and showcase metadata unless the user specifically requests a content change.
- When changing a project title, image, or link, update every synchronized source in `index.html`, `script.js`, and project detail data as applicable.
- Avoid silent fallbacks and broad exception handling in JavaScript. Guard missing DOM elements explicitly and keep existing console/error behavior meaningful.
- Do not change animation speed, interaction semantics, or responsive breakpoints as an incidental side effect of a markup refactor.

## Validation

For HTML/CSS/JavaScript changes, run the smallest relevant checks:

```powershell
node --check .\script.js
git diff --check -- .\index.html .\minimal-overrides.css .\script.js
```

Also inspect the changed page at mobile, tablet, and desktop widths when browser tooling is available. Confirm that the page has no horizontal overflow, all links still navigate correctly, dialogs still open and close, and keyboard focus remains visible.
