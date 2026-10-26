# useRef

> `useRef(initial)` returns a mutable object `{ current }` that **persists across renders** and **doesn't trigger a re-render** when changed.

## Two main uses
### 1. Access a DOM node
```tsx
function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}
```
`ref.current` is `null` during the first render and set during commit — read it in effects or event handlers.

### 2. Keep a mutable value that's not part of the UI
```tsx
const intervalId = useRef<number | null>(null);
function start() { intervalId.current = window.setInterval(tick, 1000); }
function stop() { if (intervalId.current) clearInterval(intervalId.current); }

// latest value for a long-lived callback (avoid stale closures)
const latestOnMessage = useRef(onMessage);
latestOnMessage.current = onMessage;           // update each render
useEffect(() => socket.on("msg", (m) => latestOnMessage.current(m)), [socket]);

// previous value
function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => { ref.current = value; }, [value]);
  return ref.current;
}
```

## ref vs state
| `useRef` | `useState` |
|---|---|
| Change doesn't re-render | Change re-renders |
| Mutable (`ref.current = x`) | Immutable snapshot + setter |
| For timers, DOM, latest callbacks, instance variables | For anything shown on screen |
Don't read or write `ref.current` **during render** for values that affect output — the UI won't update and it breaks purity.

## Passing refs to child components
- React 18: wrap the child in `forwardRef`.
- React 19: `ref` is a normal prop for function components.
- `useImperativeHandle(ref, () => ({ focus, scrollToTop }))` exposes a limited API instead of the raw DOM node.
- Callback refs `ref={(el) => { ... }}` run when the node attaches/detaches — useful for measuring or lists of refs (`refs.current[i] = el`).

## Interview questions
1. **useRef vs useState?** Ref = persistent mutable box without re-render; state = UI data with re-render.
2. **Why is `ref.current` null on first render?** Refs are attached during commit.
3. **How do you avoid stale closures in event listeners?** Keep the latest callback in a ref.
4. **What is forwardRef / useImperativeHandle?** Pass refs through components / expose a custom handle.

## Practice
Build an OTP input with an array of refs (auto-advance, backspace back). Compare with `code/machine-coding/src/components/OtpInput`.

Next → [useMemo](../useMemo/README.md)
