# Flagship: Autocomplete

## Requirements
Input, debounce, async results, loading/empty/error, keyboard navigation and selection.

## State
query, activeQuery, status, results, highlightedIndex, selected item.

## Correctness invariant
Only the current active query can commit results.

## Implementation order
1. render input
2. debounce query
3. request data
4. add cancellation/stale guard
5. render states
6. keyboard navigation
7. accessibility
8. cache
9. tests

## Follow-ups
Ranking, virtualization, analytics, offline cache and permission filtering.