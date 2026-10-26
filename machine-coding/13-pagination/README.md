# 13 — Pagination

## Client-side (data already loaded)
`visible = rows.slice((page - 1) * size, page * size)`; `totalPages = Math.max(1, Math.ceil(rows.length / size))`; clamp `page` when filters shrink data; reset to page 1 on filter change.

## Server-side
- Put `page`/`cursor` in the **query key** and the **URL** (`?page=3`).
- Keep previous page visible while next loads (`placeholderData: keepPreviousData` in TanStack Query or keep old data in state).
- Prefetch next page.
- Disable Prev on first / Next on last; show "Page 3 of 20 · 400 results".
- Pagination component with ellipsis: see [07 common components](../07-common-components/README.md).
- A11y: `<nav aria-label="Pagination">`, `aria-current="page"` on the active page.

Reference: `code/machine-coding/src/components/DataTable` (search → sort → paginate with tests).

Next → [14 Infinite scroll](../14-infinite-scroll/README.md)
