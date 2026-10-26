# Flagship: Virtualized infinite feed (75 min)

## Requirements
Cursor-paginated feed of posts · loads more near the bottom · renders smoothly with 10,000 items · loading/error/end states · preserves scroll position when returning.

## Plan
1. Infinite loading with IntersectionObserver sentinel + in-flight guard (ref) + `nextCursor`.
2. Virtualization: fixed height first (`start = floor(scrollTop / h)`), then discuss variable heights (measure + cache).
3. Memoized `PostRow`; stable keys.
4. Scroll restoration: save `scrollTop` + loaded pages in memory/session storage on navigation.

## Edge cases
First page shorter than viewport (observer won't re-fire → re-observe after each page) · duplicate items across pages (dedupe by id) · new posts arriving at top ("N new posts" banner instead of shifting content) · error mid-list with retry · images changing row height.

References: `code/machine-coding/src/components/InfiniteList`, [react/11-performance/virtualization](../../react/11-performance/virtualization/README.md).
