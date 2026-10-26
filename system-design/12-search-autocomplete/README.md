# 12 — Search & autocomplete (design view)

## Requirements to confirm
Data size (100 local items vs 10M server items) · suggestions vs full results page · typo tolerance/ranking · recent searches · keyboard & screen reader support · mobile · latency target (< 100 ms perceived).

## Design
- **Input**: debounce 200–300 ms, min 2 chars, trim/normalise, handle IME composition (`compositionend`).
- **Requests**: cancel previous (AbortController) **and** guard against out-of-order responses; HTTP cache short-lived; client LRU cache by query; reuse cached prefix results.
- **Server**: ranked top-N suggestions, highlight ranges returned or computed client-side; rate limiting.
- **Local data** (< ~10k items): filter in memory or in a Web Worker; prebuilt index (Fuse.js/FlexSearch).
- **Rendering**: limit to ~10 suggestions; virtualize if a long list is required; highlight with `<mark>` (escaped, never `innerHTML`).
- **A11y**: ARIA combobox — `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `role="listbox"/"option"`, `aria-live` result count; ↑ ↓ Enter Escape.
- **States**: idle, loading (after ~150 ms to avoid flicker), results, empty, error (retry), offline.
- **URL**: full results page uses `?q=` so it's shareable.
- **Analytics**: log queries with no results to improve search.

Reference implementation with tests: `code/machine-coding/src/components/Autocomplete`. Full worked answer: [27 — design 1](../27-worked-designs/README.md).

Next → [13 Optimistic updates](../13-optimistic-updates/README.md)
