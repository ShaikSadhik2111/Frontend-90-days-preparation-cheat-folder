# 08 — Accessibility in machine coding (easy points most candidates miss)

Checklist to apply in the last 10 minutes:
- Real `<button>` / `<a>` / `<label>` / `<input>` — not clickable divs.
- Every input has a label; icon buttons have `aria-label`.
- Keyboard: Tab reaches everything, Enter/Space activate, Escape closes popups, arrows inside lists/tabs/menus.
- Focus: visible outline; modal focus trap + return focus; focus first error on submit.
- State attributes: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-pressed`, `aria-invalid`, `aria-current`.
- Async updates announced: `role="status"` / `aria-live="polite"` ("5 results"), `role="alert"` for errors.
- Lists use `<ul>/<li>`, tables use `<table>/<th>`.
- Don't remove focus outlines; don't rely on colour alone.

Say it out loud: "I'm adding keyboard support and ARIA now because…". Test quickly by tabbing through your UI.

Patterns: WAI-ARIA Authoring Practices (combobox, dialog, tabs, listbox, menu, tree, grid). Details: [react/13-accessibility](../../react/13-accessibility/README.md).

Next → [09 Async UI](../09-async-ui/README.md)
