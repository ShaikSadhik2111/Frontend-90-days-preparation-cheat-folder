# 11 — Pagination & large data

## Pagination options
| Type | API | Pros | Cons | Use for |
|---|---|---|---|---|
| Offset | `?page=5&limit=50` | jump to page, total pages | slow for deep pages (DB), items shift when data changes | admin tables |
| Cursor | `?after=<opaque>&limit=50` | stable with inserts, fast | no random jump | feeds, infinite scroll, real-time lists |
| Keyset | `?afterId=123&afterDate=…` | like cursor, transparent | must sort by unique key | logs, time series |

## UI patterns
- **Numbered pages** — users need positions/bookmarking (put page in URL).
- **Load more** button — accessible, user controls loading.
- **Infinite scroll** — IntersectionObserver sentinel; preserve scroll on back; provide footer access; announce new items for screen readers.
- **Virtualization** for rendering big lists/grids (render ~visible rows only).

## Large data checklist (100k+ rows)
1. Server-side filter/sort/paginate; never ship everything.
2. Virtualize rows (and columns if wide).
3. Debounce filters; cancel stale requests; keep previous page visible while loading (`placeholderData`).
4. Stable row heights where possible (easier virtualization).
5. Selection across pages: store selected **ids** + "select all matching filter" as a query, not a giant id list.
6. Export: generate server-side (async job + download link), not in the browser.
7. Heavy client computations → Web Worker.
8. Charts: server-side downsampling; canvas rendering.

Next → [12 Search & autocomplete](../12-search-autocomplete/README.md)
