---
name: "Refactor Portfolio Layout"
description: "Audit and modernize a portfolio section's HTML and CSS for responsive layout, accessibility, and maintainable styling."
argument-hint: "Select or provide the portfolio HTML and CSS files, then name the section to refactor."
agent: "agent"
---

# Refactor a Portfolio Section

Use the HTML and CSS files supplied as chat context. If file context is not explicitly supplied, inspect the relevant portfolio files, especially [index.html](../../index.html), [minimal-overrides.css](../../minimal-overrides.css), and [styles.css](../../styles.css). Focus on the named section or, if none is named, the section most relevant to the request.

## Required workflow

1. Read the relevant HTML structure and all CSS selectors that affect the section, including responsive overrides and inherited legacy rules.
2. Audit the section for:
   - Unwanted horizontal scrolling caused by fixed widths, viewport units, transforms, margins, overflowing media, or long unbroken text.
   - Flexbox wrapping, shrinking, alignment, and `min-width` bugs.
   - Grid tracks that collapse, overflow, or become unusable at mobile and tablet widths.
   - Hardcoded pixel dimensions that should use fluid sizing, `clamp()`, `min()`, `max()`, `minmax()`, `rem`, or percentages.
   - Conflicting selectors, duplicated overrides, accidental specificity problems, and styles that only work at one viewport size.
   - Missing semantic landmarks, heading relationships, keyboard focus states, image alternative text, or inaccurate ARIA state.
3. Preserve existing content, project links, asset paths, typography roles, and intentional animations unless the requested refactor requires changing them.
4. Prefer a surgical refactor in the existing static HTML/CSS architecture. Do not introduce a framework, build tool, or new dependency.
5. Recommend or implement a mobile-first layout using:
   - Mobile: up to `768px`.
   - Tablet: `769px`–`1024px`.
   - Desktop: `1025px` and wider.
   - The existing `420px` small-phone breakpoint only when needed.
6. Use CSS custom properties for any new shared color, spacing, border, radius, or duration values. Prefer Flexbox for one-dimensional alignment and CSS Grid for card collections or two-dimensional layouts.
7. Keep semantic HTML5 structure and accessibility intact. Use `<main>`, `<section>`, `<article>`, `<nav>`, and `<footer>` appropriately; keep one logical `<h1>`; use buttons for actions and links for navigation; never nest interactive controls.
8. After making changes, run the smallest relevant validation:

   ```powershell
   node --check .\script.js
   git diff --check -- .\index.html .\minimal-overrides.css .\script.js
   ```

## Output requirements

Before editing, report a concise audit with:

- The section and files inspected.
- Each issue, its likely cause, affected breakpoint, and severity.
- Whether the issue is a functional, responsive, visual, or accessibility problem.

For every proposed CSS refactor, include an annotated code block. The annotation must explain why the Grid or Flexbox structure fixes the issue and how it behaves at mobile, tablet, and desktop widths. Example:

```css
.portfolio-grid {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 768px) {
    .portfolio-grid {
        grid-template-columns: 1fr;
    }
}
```

```text
/* `minmax(0, 1fr)` allows long card content to shrink instead of creating
   horizontal overflow. The mobile override stacks cards within the viewport. */
```

If implementation is requested or clearly implied, edit the files after the audit. Summarize:

- Files changed and the reason for each change.
- Responsive behavior at mobile, tablet, and desktop widths.
- Accessibility considerations.
- Validation commands and their results.

Do not make unrelated visual changes, silently remove content, or claim browser validation was completed unless it was actually run.
