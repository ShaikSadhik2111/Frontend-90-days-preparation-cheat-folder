# 18 — Accessibility (design view)

> Mention a11y in **every** design — it's a quality attribute interviewers check for.

## What to say
- Semantic structure: landmarks, headings, real buttons/links, tables for data.
- Keyboard: full operability, logical focus order, visible focus, shortcuts that don't conflict with assistive tech.
- Components follow WAI-ARIA patterns: combobox (search), dialog (modals), grid (data tables with keyboard cell navigation), tabs, tree (file explorer), menu.
- Focus management: route changes, modals, deletions, infinite lists.
- Live regions for async updates (search result counts, toasts, critical alarms with `assertive`).
- Colour contrast and non-colour indicators (status icons + text), dark mode, reduced motion.
- Zoom/reflow to 400%, responsive layouts.
- Charts: data table alternative, accessible labels, patterns not just colours.
- i18n alongside a11y: `lang`, RTL support, locale formatting.
- Process: design system components accessible by default, axe in CI, manual screen reader testing per release, WCAG 2.1/2.2 AA target.

Details: [web-platform/15-accessibility](../../web-platform/15-accessibility/README.md) · [react/13-accessibility](../../react/13-accessibility/README.md).

Next → [19 Reliability](../19-reliability/README.md)
