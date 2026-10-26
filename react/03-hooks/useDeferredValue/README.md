# useDeferredValue

> `const deferred = useDeferredValue(value)` returns a **lagging copy** of a value. React first re-renders with the old deferred value (fast), then re-renders in the background with the new one.

```tsx
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <div style={{ opacity: isStale ? 0.6 : 1 }}>
      <SlowList query={deferredQuery} />   {/* wrap SlowList in React.memo so it skips the urgent render */}
    </div>
  );
}
```
- The heavy child must be **memoized** (`React.memo`), otherwise it re-renders on the urgent pass too.
- With Suspense: shows old results while new ones load instead of flashing the fallback.
- React 19: `useDeferredValue(value, initialValue)` for an initial render value.

**When to use:** you receive a fast-changing value from props/parent and can't wrap its setter in `startTransition`.

**Interview:** *Difference from debounce?* No fixed delay, interruptible, works with rendering; debounce delays work like network calls.

Next → [useSyncExternalStore](../useSyncExternalStore/README.md)
