# Flagship: Data Grid

## Requirements
Columns, rows, sorting, filtering, pagination, selection, loading/error/empty.

## State
query model, selection model, column state and request lifecycle.

## Architecture
Separate data/query logic from table presentation. Keep server-side filters/sort/pagination in one query state.

## Advanced
Virtualization, column resize, sticky headers, bulk actions, URL state, cache and export jobs.

## Invariants
Selection remains stable by row ID; obsolete requests cannot overwrite active query.

## Follow-ups
1M rows, variable row height, accessibility and real-time updates.