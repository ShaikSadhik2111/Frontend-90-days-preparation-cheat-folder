# Accessibility (a11y) in React

> Accessible apps work with **keyboard, screen readers, zoom and high contrast**. Many enterprise and public-sector customers (and EU law — European Accessibility Act, from June 2025) require **WCAG 2.1/2.2 AA**.

## Rules that solve 80% of issues
1. **Use semantic HTML**: `<button>` for actions, `<a href>` for navigation, `<label>` for inputs, headings in order, `<nav>`, `<main>`, lists, tables with `<th scope>`.
   ```tsx
   <div onClick={save}>Save</div>          // ❌ not focusable, no role, no keyboard
   <button type="button" onClick={save}>Save</button>   // ✅
   ```
2. **Everything works with the keyboard**: Tab order follows DOM order, visible focus (`:focus-visible`), Enter/Space activate, Escape closes, arrow keys inside composite widgets (tabs, menus, listboxes).
3. **Names for everything**: icon buttons need `aria-label="Close"`; images need `alt` (`alt=""` for decorative).
4. **Manage focus** in dynamic UI: move focus into modals, trap it, return it on close; move focus to the page heading after route change; focus the first error after failed submit.
5. **Announce async changes**: `aria-live="polite"` region for "3 results", toasts; `role="alert"` for errors.
6. **Don't rely on colour alone** (status: icon + text + colour); contrast ≥ 4.5:1 for text.
7. **Respect user settings**: `prefers-reduced-motion`, zoom to 200% without breaking, `rem` units.

## ARIA essentials
- First rule of ARIA: **don't use ARIA if a native element does the job**.
- State attributes: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-pressed`, `aria-disabled`, `aria-invalid`, `aria-current="page"`.
- Relationships: `aria-labelledby`, `aria-describedby`, `aria-controls`, `aria-activedescendant`.
- Follow the **WAI-ARIA Authoring Practices (APG)** patterns for combobox, dialog, tabs, menu, tree.
- Generate ids with `useId`.

## Testing
axe DevTools / Lighthouse (automated catches ~30–40%), keyboard-only walkthrough, screen reader (NVDA on Windows, VoiceOver on Mac), `eslint-plugin-jsx-a11y`, RTL `getByRole` queries (fail if roles/names are wrong).

**Accessible components to study:** `code/machine-coding` → Modal (focus trap), Tabs (roving tabindex), Autocomplete (combobox), Accordion, StarRating (radiogroup).

## Interview questions
1. **How do you make a custom dropdown accessible?** Combobox/listbox pattern: roles, `aria-expanded`, `aria-activedescendant`, keyboard (↑↓ Enter Esc), focus management.
2. **What does `aria-live` do?** Announces content changes to screen readers.
3. **How do you test accessibility?** Automated (axe) + manual keyboard + screen reader.

Next → [Modern React — Actions](../14-modern-react/react-19-actions/README.md)
