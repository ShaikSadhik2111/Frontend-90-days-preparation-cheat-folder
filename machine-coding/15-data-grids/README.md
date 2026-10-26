# 15 — Data grids / tables

## Feature ladder (build in this order during the round)
1. Render rows/columns from config: `columns: { key, header, sortable?, render? }[]`.
2. Sort (asc → desc → none), copying before `sort`.
3. Search / filter (global, then per column).
4. Pagination (or virtualization).
5. Row selection (checkbox, select all on page, indeterminate state).
6. Loading / empty / error rows.
7. Extras if time: column resize, sticky header, row expansion, inline edit, column visibility.

## Code points
- Derive `filtered → sorted → paged` with `useMemo`; store only `query`, `sort`, `page`, `selectedIds: Set<string>`.
- Number vs string compare (`a - b` vs `localeCompare`), stable sort, null handling.
- `aria-sort` on headers, sort button inside `<th>`, `<caption>` or `aria-label`.
- Generic typing: `DataTable<T>({ rows, columns, getRowId })`.

Reference: `code/machine-coding/src/components/DataTable` (generic, tested). Libraries in production: TanStack Table (headless), AG Grid, MUI X Data Grid.

Next → [16 Virtualization](../16-virtualization/README.md)
