# 27 — Performance in machine coding

When the interviewer says "now there are 10,000 items":
1. **Measure/say what's slow**: rendering 10k DOM nodes, filtering on every keystroke, re-rendering all rows on each change.
2. **Fixes, in order**:
   - Debounce input / `useDeferredValue` for the filter.
   - `useMemo` the derived list (filter/sort).
   - `React.memo` row components + stable callbacks (`useCallback`) + stable keys.
   - Virtualize the list.
   - Paginate / server-side filtering.
   - Move heavy computation to a Web Worker.
3. **Verify**: React Profiler, "highlight updates".

Also: avoid inline object props to memoized children, avoid storing derived data in state, keep state local, lazy-load heavy parts (`React.lazy`). Details: [react/11-performance](../../react/11-performance/memoization/README.md).

Next → [28 Production hardening](../28-production-hardening/README.md)
