# useTransition

> `const [isPending, startTransition] = useTransition()` marks a state update as **non-urgent**. React keeps urgent updates (typing, clicking) responsive and renders the transition in the background, **interrupting it** if new urgent input arrives.

## Example — heavy filter while typing
```tsx
function DeviceSearch({ devices }: { devices: Device[] }) {
  const [input, setInput] = useState("");        // urgent: the text box
  const [query, setQuery] = useState("");        // non-urgent: drives the heavy list
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);                     // input updates immediately
    startTransition(() => setQuery(e.target.value)); // list can lag behind
  }
  return (
    <>
      <input value={input} onChange={onChange} />
      {isPending && <span>Updating…</span>}
      <HeavyList devices={devices} query={query} />
    </>
  );
}
```

## Key facts
- Transitions are about **rendering priority**, not running JS in another thread. A slow synchronous function still blocks; concurrent rendering helps by yielding between components.
- Don't wrap controlled input updates themselves in a transition (the input would lag).
- Navigation with Suspense: wrapping a route change in a transition keeps the **old screen visible** instead of showing a fallback immediately.
- React 19: `startTransition` accepts **async functions** (Actions) — `isPending` stays true until the async work finishes.
- Standalone `startTransition` import exists for places without hooks.

## useTransition vs debounce
| useTransition | debounce |
|---|---|
| Renders as soon as possible, interruptible | Waits N ms after typing stops |
| No fixed delay | Reduces network requests |
| Best for expensive **rendering** | Best for expensive **requests** |
Often combined: debounce the API call, transition the rendering.

## Interview questions
1. **What does useTransition do?** Marks updates as low priority so urgent ones stay responsive.
2. **Does it make code run faster?** No; it changes scheduling.
3. **useTransition vs useDeferredValue?** Transition wraps the *setter* you control; deferred value wraps a *value* (e.g. a prop) you don't control.

Next → [useDeferredValue](../useDeferredValue/README.md)
