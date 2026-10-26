# Flagship: Data grid (75 min)

## Requirements
Columns from config · sort (asc/desc/none) · global search · pagination (10/page) · row selection with select-all (page) and indeterminate checkbox · loading/empty/error · sticky header.

## State
`query`, `sort: { key, dir } | null`, `page`, `pageSize`, `selectedIds: Set<string>`. Derived: filtered → sorted → paged rows, totalPages, `allOnPageSelected`, `someSelected`.

## Implementation notes
- Immutable sort (`[...rows].sort`), number vs string comparisons.
- Reset page on search; clamp page when data shrinks.
- Selection survives sorting/pagination because it's keyed by id.
- Indeterminate: `ref={(el) => el && (el.indeterminate = some && !all)}`.
- `aria-sort` on `<th>`, buttons in headers, `<caption>`.

## Follow-ups
Server-side sort/filter/pagination via URL params · virtualization for 100k rows · column resize/reorder/pin · inline edit with optimistic save · export CSV · keyboard grid navigation (ARIA grid).

Reference: `code/machine-coding/src/components/DataTable`.
