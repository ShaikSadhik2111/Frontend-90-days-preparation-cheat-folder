# 14 — Infinite scroll

## Requirements to handle
Load next page near the bottom · no duplicate requests · stop at the end · error + retry · loading indicator · works if the first page doesn't fill the screen · cleanup on unmount.

## Key implementation points
- **IntersectionObserver** on a sentinel element after the last item (`rootMargin: "200px"` to load early) — not scroll events.
- Guard in-flight requests with a **ref** (`loadingRef.current`), not only state (state updates are async → double fetch).
- **Cursor** from the API (`nextCursor === null` → end).
- IntersectionObserver fires only on **visibility changes**: if the first page is short and the sentinel stays visible, it won't fire again → re-create the observer after each page (pass a key/cursor into the effect deps) or check after load.
- Provide a "Load more" button fallback (accessibility, keyboard users, footer access).
- For thousands of items → combine with virtualization.

Reference with tests: `code/machine-coding/src/components/InfiniteList` + `src/hooks/useIntersectionObserver.ts`.

Next → [15 Data grids](../15-data-grids/README.md)
