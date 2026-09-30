# Data Display Problems

## Table
State: rows, sort, filters, page/cursor, loading, error and selection.

Acceptance criteria: sorting, filtering, loading, empty, error/retry, keyboard access and selection.

## Server table
Keep filters + sort + page/cursor in one query model. Avoid independent effects issuing contradictory requests.

## Infinite scroll
Use an IntersectionObserver sentinel. Prevent duplicate triggers; handle loading, end-of-list, errors and rapid scrolling.

## Virtualized list
Render visible rows plus overscan. Trade-off: measurement, focus and accessibility become harder.

## Tree view
State: expanded IDs and selected ID. Add keyboard navigation and lazy loading when server-backed.

Practice ladder: local table → server table → production table with cache, cancellation, URL state, virtualization and accessibility.