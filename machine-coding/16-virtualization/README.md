# 16 — Virtualization (windowing)

Render only visible rows: with fixed row height `h`, container height `H`, scroll position `s`:
```
start = floor(s / h) - overscan        end = ceil((s + H) / h) + overscan
spacer height = items.length * h       each row: position absolute, top = index * h
```
Full component: [react/11-performance/virtualization](../../react/11-performance/virtualization/README.md).

Edge cases: variable heights (measure with ResizeObserver, cache heights, estimate unknown), keeping scroll position on prepend (chat), sticky headers, keyboard navigation to off-screen rows (scroll into view), `aria-rowcount`/`aria-rowindex`, browser find (Ctrl+F) limitation.
Libraries: TanStack Virtual, react-window, react-virtuoso.

Next → [17 Search & autocomplete](../17-search-autocomplete/README.md)
