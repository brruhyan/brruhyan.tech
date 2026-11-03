---
name: ui-component
description: 'Generate or modify responsive portfolio UI components such as project cards, interactive modals, testimonial cards, showcase sections, and navbar toggles in HTML/CSS/JavaScript. Use when a request asks for a new portfolio component, interaction, hover state, responsive layout, or accessible keyboard behavior.'
argument-hint: 'Describe the portfolio component, its content, interaction, responsive behavior, and destination if it is a link.'
user-invocable: true
disable-model-invocation: false
---

# Portfolio UI Component

## When to Use

Use this skill whenever the user asks to create or substantially extend a portfolio UI component, including:

- Project or work cards
- Showcase sections and filters
- Interactive modals and galleries
- Navbar or mobile navigation toggles
- Testimonial cards and carousels
- Hover-reveal links, buttons, and responsive interactions

## Procedure

1. Inspect the existing component patterns in [index.html](../../index.html), [minimal-overrides.css](../../minimal-overrides.css), [styles.css](../../styles.css), and [script.js](../../script.js) before editing.
2. Identify the component’s content, states, interaction model, destination URLs, required images, and mobile behavior. Preserve existing project metadata, asset paths, typography, and visual tokens unless the request explicitly changes them.
3. Choose semantic HTML before styling:
   - Use `<section>` for a named page region with a heading.
   - Use `<article>` for an independent project, testimonial, or content card.
   - Use `<nav>` for navigation collections.
   - Use `<button>` for state changes and JavaScript actions.
   - Use `<a>` for navigation to another URL.
   - Never nest an interactive element inside another interactive element.
4. Add the smallest complete HTML structure to [index.html](../../index.html). Include useful class names, stable data attributes only when JavaScript needs them, and accessible names for controls.
5. Add scope-isolated CSS to [minimal-overrides.css](../../minimal-overrides.css):
   - Prefix new selectors with a component namespace such as `.portfolio-card`, `.project-modal`, or `.nav-toggle`.
   - Reuse the existing `:root` custom properties and add new shared tokens there instead of scattering repeated values.
   - Use Flexbox for one-dimensional alignment and CSS Grid for card collections or two-dimensional layouts.
   - Start with a fluid mobile layout, then add the project breakpoints: mobile up to `768px`, tablet `769px`–`1024px`, desktop `1025px+`, and the existing `420px` small-phone adjustment only when necessary.
   - Use `minmax(0, 1fr)`, `min-width: 0`, `clamp()`, and responsive media sizing to prevent horizontal overflow.
6. Add JavaScript in [script.js](../../script.js) only when behavior cannot be expressed with native HTML/CSS. Guard missing elements, keep state transitions explicit, and do not use broad silent catches.
7. Add smooth, restrained interaction states:
   - Use `transition` for opacity, color, transform, border, and shadow changes.
   - Keep hover effects usable on touch devices; do not make essential content hover-only.
   - Provide equivalent `:focus-visible` styles for every keyboard-operable control.
   - Respect `prefers-reduced-motion` for transitions, reveals, carousels, and modal animations.
8. Implement keyboard navigation:
   - Ensure every interactive control is reachable with `Tab`.
   - Use native buttons and links instead of adding unnecessary positive `tabindex` values.
   - For tabs, synchronize `aria-selected`, `aria-controls`, `role="tablist"`, `role="tab"`, and `role="tabpanel"`, and support arrow-key navigation when the component behaves as a tablist.
   - For modals, provide an accessible dialog name, an explicit close button, Escape-to-close behavior, focus return to the trigger, and protection from focus moving behind the dialog.
   - For toggles, synchronize `aria-expanded` and `aria-controls`, and ensure the controlled content is hidden from assistive technology when closed.
   - Do not rely on color, hover, animation, or an icon alone to communicate state.
9. Handle images and decorative content:
   - Provide descriptive `alt` text for meaningful project and profile images.
   - Use `alt=""` for decorative images only.
   - Mark duplicated animation-only content with `aria-hidden="true"` and avoid duplicate announcements.
   - Keep images and videos within their containers at all breakpoints.
10. Validate the component:
    ```powershell
    node --check .\script.js
    git diff --check -- .\index.html .\minimal-overrides.css .\script.js
    ```
    Check narrow mobile, tablet, desktop, keyboard-only navigation, focus visibility, modal close behavior, link destinations, and the absence of unwanted horizontal scrolling.

## Completion Requirements

Before reporting completion, confirm:

- The component is semantic, responsive, and isolated from unrelated selectors.
- Existing interactions and project links still work.
- Hover and focus states are both implemented.
- Keyboard users can discover, operate, and exit every interactive state.
- New content does not depend on hover-only behavior.
- Validation commands passed, or any failure is reported explicitly.
