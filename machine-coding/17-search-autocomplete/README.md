# 17 — Search & autocomplete (the #1 machine-coding question)

## Requirements checklist
- [ ] Debounced input (300 ms), min chars
- [ ] Fetch suggestions; cancel/ignore stale responses
- [ ] Loading, empty, error states
- [ ] Highlight matching text (no `innerHTML`)
- [ ] Keyboard: ↓ ↑ (wrap), Enter selects, Escape closes
- [ ] Mouse: hover sets active, click selects (use `onMouseDown` preventDefault to keep focus)
- [ ] Close on outside click / blur
- [ ] ARIA combobox: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `role="listbox"`, `role="option"`, `aria-selected`
- [ ] Generic `<Autocomplete<T>>` with `getLabel`, `getKey`, `onSelect`
- [ ] Bonus: cache results per query (Map/LRU), recent searches, virtualized results

Reference implementation + tests (debounce, race condition, keyboard): `code/machine-coding/src/components/Autocomplete`.
Design-round version: [system-design/12-search-autocomplete](../../system-design/12-search-autocomplete/README.md).

Next → [18 Caching](../18-caching/README.md)
