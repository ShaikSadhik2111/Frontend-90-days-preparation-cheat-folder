# 11 — Cancellation & race conditions

## The bug
Type "pu" → request A (slow). Type "pump" → request B (fast). B returns, then A returns and **overwrites** the results with stale "pu" data.

## Three fixes
```tsx
// 1. AbortController — cancels the network request
useEffect(() => {
  const c = new AbortController();
  search(q, c.signal).then(setResults).catch((e) => { if (e.name !== "AbortError") setError(e); });
  return () => c.abort();
}, [q]);

// 2. Ignore flag — when the API can't be cancelled
useEffect(() => {
  let ignore = false;
  search(q).then((r) => { if (!ignore) setResults(r); });
  return () => { ignore = true; };
}, [q]);

// 3. Request id — outside effects (event handlers)
const latest = useRef(0);
async function onSearch(q: string) {
  const id = ++latest.current;
  const r = await search(q);
  if (id === latest.current) setResults(r);
}
```
Other races: double-submit (disable/dedupe), optimistic update vs refetch (cancel queries first), unmount during request (cleanup), switching tabs/routes quickly (keyed queries).

## Prove it in the interview
Mock API with random latency 100–500 ms, type fast, show it's correct. The reference test `Autocomplete.test.tsx` simulates a slow old request and a fast new one.

Next → [12 API integration](../12-api-integration/README.md)
