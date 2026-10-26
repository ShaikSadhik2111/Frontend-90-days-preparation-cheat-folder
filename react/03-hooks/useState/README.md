# useState

> `const [value, setValue] = useState(initial)` gives a component **memory**. Calling `setValue` schedules a re-render with the new value. Each render sees its own **snapshot**.

## Essentials
```tsx
const [count, setCount] = useState(0);
setCount(5);                    // replace
setCount((c) => c + 1);         // updater: based on latest queued value
const [rows] = useState(() => parseBigCsv(csv)); // lazy init: runs only on first render
```
- Initial value is used **only on the first render**.
- If the new value is `Object.is` equal to the current one, React bails out (no re-render of children).
- Updates are batched; the variable in the current closure never changes.

## Snapshot + stale closure
```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(seconds + 1), 1000); // ❌ `seconds` is always 0 here
    return () => clearInterval(id);
  }, []);
  // ✅ setSeconds((s) => s + 1)
}
```
```tsx
async function save() {
  await api.save(form);
  setMessage(`Saved ${count} items`);   // uses `count` from when save() started, not the latest
}
```

## Objects & arrays: replace, don't mutate
```tsx
setForm((f) => ({ ...f, email }));
setItems((list) => list.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
```

## Choosing state shape
- Group values that always change together (`{ x, y }` position).
- Avoid contradictions → one `status` instead of `isLoading` + `isError`.
- Avoid duplication → store `selectedId`, not a copy of the selected object.
- Avoid deep nesting → normalise (`byId` + `allIds`).
- Many related updates/transitions → `useReducer`.

## Interview questions
1. **Why does `setCount(count + 1)` twice only add one?** Both read the same snapshot; use the updater.
2. **What's lazy initialisation?** Passing a function so expensive init runs once.
3. **Does `setState` with the same value re-render?** React may render that component once more but bails out without re-rendering children / committing; generally treat as no-op.
4. **useState vs useRef?** State re-renders and is for UI; ref doesn't re-render and is for mutable values not shown in UI.

## Practice
Build a counter with +1, +3 (three updater calls), reset, and a "delayed +1" button (setTimeout 2s). Click delayed +1 then +1 quickly — explain the result with and without the updater form.

Next → [useEffect](../useEffect/README.md)
