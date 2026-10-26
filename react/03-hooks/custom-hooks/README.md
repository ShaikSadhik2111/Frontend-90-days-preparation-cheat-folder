# Custom hooks

> A custom hook is a function whose name starts with `use` and that calls other hooks. It lets you **reuse stateful logic** — each component that calls it gets **its own independent state**.

## Examples you should write from memory
```tsx
export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : initial; }
    catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue] as const;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}
```
More in `code/machine-coding/src/hooks`: `useFetch`, `usePrevious`, `useOnClickOutside`, `useIntersectionObserver` (with tests).

## Design guidelines
- Name it after **what it does** (`useOnlineStatus`, `useDeviceTelemetry`), not lifecycle (`useMount`).
- Return a tuple for 2 values (`[value, setValue]`), an object for more (`{ data, error, status, refetch }`).
- Keep returned functions stable (`useCallback`) — consumers may put them in deps.
- Accept options objects for extensibility; type them with generics.
- Hooks share **logic, not state**. To share state, lift it or use context/store.
- Test with `renderHook` from React Testing Library.

## Interview questions
1. **What is a custom hook?** A function starting with `use` that composes hooks to reuse logic.
2. **Do two components using the same hook share state?** No — each call is independent.
3. **Custom hook vs HOC vs render props?** Hooks avoid wrapper nesting and prop collisions; simpler to compose and type.
4. **How do you test a custom hook?** `renderHook` + `act`, fake timers for debounce.

## Practice
Write `useFetch<T>(url)` returning a discriminated union, with abort on change/unmount. Then write `useInterval(callback, delay)` that always calls the latest callback (ref) and supports `delay = null` to pause.

Next → [useId](../useId/README.md)
