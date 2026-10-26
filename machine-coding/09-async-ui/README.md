# 09 — Async UI

## Patterns
- **Status union** per request (idle/loading/success/error).
- **Keep previous data** while refetching (no blank flashes).
- **Disable** buttons while pending; **dedupe** double clicks.
- **Timeouts** and **retry** buttons.
- **Cancel** on unmount and when inputs change (AbortController).
- **Sequential vs parallel**: `await Promise.all([...])` for independent requests.
- **Polling** with cleanup and pause when tab hidden.

## Polling hook
```tsx
function usePolling<T>(fn: (signal: AbortSignal) => Promise<T>, intervalMs: number) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    let stopped = false, timer: ReturnType<typeof setTimeout>;
    const controller = new AbortController();
    const tick = async () => {
      try { const d = await fn(controller.signal); if (!stopped) { setData(d); setError(undefined); } }
      catch (e) { if (!stopped && (e as Error).name !== "AbortError") setError(e as Error); }
      finally { if (!stopped) timer = setTimeout(tick, document.hidden ? intervalMs * 5 : intervalMs); }
    };
    tick();
    return () => { stopped = true; clearTimeout(timer); controller.abort(); };
  }, [fn, intervalMs]);   // pass a stable fn (useCallback)
  return { data, error };
}
```
`setTimeout` chaining (not `setInterval`) avoids overlapping requests when the server is slow.

Next → [10 Debounce & throttle](../10-debounce-throttle/README.md)
