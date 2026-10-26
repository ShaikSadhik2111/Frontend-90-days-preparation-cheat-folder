# 15 — Web accessibility (WCAG)

> Standard: **WCAG 2.1/2.2 level AA**. Principles **POUR**: Perceivable, Operable, Understandable, Robust. EU's European Accessibility Act applies from June 2025, so enterprise/industrial clients increasingly require it.

## Checklist (what reviewers and interviewers look for)
**Perceivable**
- Text alternatives: `alt` on images (empty for decorative), labels on icon buttons, captions/transcripts for media.
- Contrast ≥ **4.5:1** normal text, 3:1 large text and UI components/focus indicators.
- Don't use colour alone (status = colour + icon + text).
- Content reflows at 320 px width / 400% zoom; text resizes to 200%.
**Operable**
- Everything works with **keyboard**; logical tab order; no keyboard traps (except intentional modal trap with Escape).
- Visible focus (`:focus-visible` outline, never just `outline: none`).
- Skip link to main content; enough time / pause for auto-updating content; no flashing > 3/s.
- Target size ≥ 24×24 px (WCAG 2.2).
**Understandable**
- `<html lang>`; clear labels and instructions; errors identified in text and linked to fields; consistent navigation.
**Robust**
- Valid semantic HTML; correct ARIA roles/states; name, role, value exposed for custom widgets.

## ARIA in 5 rules
1. Prefer native elements (`<button>`, `<select>`, `<dialog>`, `<details>`).
2. Don't change native semantics (`<h2 role="button">` ❌).
3. Interactive ARIA controls must be keyboard-operable.
4. Don't hide focusable elements with `aria-hidden="true"`.
5. Every interactive element needs an accessible name.

Common attributes: `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-controls`, `aria-selected`, `aria-checked`, `aria-current="page"`, `aria-invalid`, `aria-live="polite"` / `role="status"` / `role="alert"`, `aria-busy`.

## Focus management in SPAs
- On route change: move focus to the new page's `<h1>` (tabindex="-1") and update `document.title`.
- Modals: focus inside, trap Tab, Escape closes, return focus to the trigger.
- After deleting an item: move focus to a sensible neighbour.
- Toasts/async results: announce through a live region, don't steal focus.

## Testing
axe DevTools / Lighthouse / WAVE (automated ≈ 30–40% of issues) → keyboard-only walkthrough → screen reader (NVDA + Firefox/Chrome on Windows, VoiceOver on macOS/iOS, TalkBack on Android) → zoom 200%/400% → `eslint-plugin-jsx-a11y` and RTL `getByRole` tests.

## Interview questions
1. How do you make a custom dropdown/combobox accessible?
2. What is `aria-live`? When `polite` vs `assertive`?
3. How do you handle focus on route change in a SPA?
4. How do you test accessibility?
5. What does WCAG AA require for contrast?

Next → [16 Web performance](../16-web-performance/README.md)
