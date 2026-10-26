# useCallback

> `useCallback(fn, deps)` returns the **same function reference** between renders until deps change. Useful only when something **depends on the function's identity**.

## When it matters
```tsx
const Row = React.memo(function Row({ item, onSelect }: { item: Item; onSelect: (id: string) => void }) {
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;
});

function List({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  // without useCallback: new function each render → every memoized Row re-renders
  const handleSelect = useCallback((id: string) => setSelected(id), []);
  return <ul>{items.map((i) => <Row key={i.id} item={i} onSelect={handleSelect} />)}</ul>;
}
```
Other cases: a function used in a `useEffect` dependency list; a function returned from a custom hook (consumers may use it in their deps); a function in a context value.

## When it's useless
- The child isn't wrapped in `React.memo` → it re-renders anyway.
- Handlers on native elements (`<button onClick>`) — DOM elements don't care about identity.

## Stale closures inside useCallback
```tsx
const save = useCallback(() => api.save(form), []);   // ❌ form is always the initial value
const save = useCallback(() => api.save(form), [form]); // ✅ (or read the latest from a ref)
```

## Interview questions
1. **What does useCallback do?** Memoizes a function reference.
2. **Does useCallback make code faster by itself?** No — only when combined with a consumer that relies on identity (memo child, effect deps).
3. **Why might a memoized child still re-render?** Some prop (object, array, inline function, children) is new each render, or it consumes a context that changed.

## Practice
Use React DevTools Profiler on a list with a memoized `Row`. Show re-renders with and without `useCallback`, then explain the result.

Next → [useReducer](../useReducer/README.md)
