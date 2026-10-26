# 07 — Common components you should be able to build quickly

| Component | Key points | Reference |
|---|---|---|
| Modal | portal, Escape, backdrop click, focus trap, return focus, scroll lock | `code/machine-coding/src/components/Modal` |
| Tabs | compound components, roving tabindex, ←/→/Home/End | `…/Tabs` |
| Accordion | single vs multiple open, `aria-expanded` | `…/Accordion` |
| Star rating | hover preview, radiogroup, controlled/uncontrolled | `…/StarRating` |
| OTP input | refs array, auto-advance, backspace, paste | `…/OtpInput` |
| Dropdown / Select | outside click, keyboard, listbox | build from Autocomplete |
| Toast system | provider + queue + auto-dismiss + `aria-live` | practise |
| Tooltip | hover + focus, delay, positioning, `aria-describedby` | practise |
| Progress bar | width from value, `role="progressbar"` + `aria-valuenow` | practise |
| Pagination | ellipsis (1 … 4 5 6 … 20), disabled ends | practise |
| Carousel | auto-play, pause on hover/focus, prev/next, dots | practise |
| Countdown / stopwatch | `setInterval` + cleanup, drift correction (`Date.now()` diffs) | practise |

## Pagination with ellipsis (often asked)
```ts
function pageItems(current: number, total: number, siblings = 1): (number | "…")[] {
  const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  if (total <= 5 + siblings * 2) return range(1, total);
  const left = Math.max(2, current - siblings), right = Math.min(total - 1, current + siblings);
  return [1, ...(left > 2 ? ["…" as const] : []), ...range(left, right), ...(right < total - 1 ? ["…" as const] : []), total];
}
// pageItems(5, 20) → [1, "…", 4, 5, 6, "…", 20]
```

Next → [08 Accessibility](../08-accessibility/README.md)
