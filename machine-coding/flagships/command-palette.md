# Flagship: Command palette (Ctrl/Cmd + K) (60 min)

## Requirements
Global shortcut opens a modal with a search input · fuzzy filters commands (navigation + actions) · ↑ ↓ Enter Escape · recent commands first · grouped sections · runs the action and closes.

## Implementation notes
- Global `keydown` listener (`(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"` → `preventDefault`), cleanup on unmount.
- Modal behaviour: portal, focus input on open, return focus on close.
- Combobox/listbox ARIA (`aria-activedescendant`).
- Filtering: simple scoring (prefix > word-start > substring) or a fuzzy library; highlight matches.
- Commands registry: `{ id, title, group, keywords, perform() }`; features register commands via context.
- Recent commands in localStorage.

## Follow-ups
Nested pages (e.g. "Change theme →"), async commands (search API), permissions-aware commands, analytics.
