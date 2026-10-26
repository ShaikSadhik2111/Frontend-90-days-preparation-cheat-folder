# useMemo

> `useMemo(() => compute(a, b), [a, b])` **caches a calculated value** between renders and recomputes only when dependencies change. It's a performance tool — your code must still work without it.

## When it's worth it
```tsx
// 1. expensive calculation (measure first: console.time / Profiler)
const visibleRows = useMemo(() => filterAndSort(rows, query, sort), [rows, query, sort]);

// 2. keep a stable reference for a memoized child or an effect dependency
const chartOptions = useMemo(() => ({ unit, threshold }), [unit, threshold]);
<MemoChart options={chartOptions} />;

// 3. stable context value
const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
<AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
```

## When it's useless
- Cheap calculations (`a + b`, mapping 20 items) — the memo bookkeeping costs more.
- When the result is passed to a child that isn't memoized — the child re-renders anyway.
- When deps change every render (e.g. an inline object in deps) — it recomputes every time.

## Pitfalls
- Deps compare with `Object.is` → objects/arrays created in render break caching.
- Not a semantic guarantee — React may discard the cache (e.g. hot reload). Never put side effects inside.
- `useMemo` for a function = `useCallback`.

## React Compiler
The React Compiler (opt-in build plugin) automatically memoizes components and values, reducing the need for manual `useMemo`/`useCallback`. Understand the manual version for interviews and legacy code.

## Interview questions
1. **useMemo vs useCallback?** Cache a value vs cache a function (`useCallback(fn, d) === useMemo(() => fn, d)`).
2. **When should you not use useMemo?** Cheap work, unmemoized consumers, unstable deps.
3. **useMemo vs React.memo?** Hook that caches a value inside a component vs HOC that skips re-rendering a component when props are shallow-equal.

## Practice
Render 10,000 rows filtered by a search input. Measure typing lag, add `useMemo`, measure again. Then try `useDeferredValue` instead and compare.

Next → [useCallback](../useCallback/README.md)
