# 04 — Data flow in machine coding

```
user event → handler → setState / dispatch(action) → re-render → derived values → UI
                    ↘ async request → (loading) → response → setState (if still relevant)
```
- Keep handlers thin: compute next state, call API helpers.
- Async flows must handle **cancel / stale** responses (AbortController or request id).
- Parent ↔ child: props + callbacks. Siblings: lift state. Far apart: context (small app) — say "in production, a store".
- Use a **reducer** when actions describe events (`add`, `toggle`, `move`, `undo`) — easy to explain and to extend live when the interviewer adds requirements.
- Mock API layer in its own file (`api.ts`) with artificial latency and random failure → shows you think about real conditions.

```ts
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export async function fetchItems(q: string, signal?: AbortSignal) {
  await sleep(200 + Math.random() * 400);
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  if (Math.random() < 0.1) throw new Error("Random server error");   // test your error UI
  return DATA.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()));
}
```

Next → [05 UI states](../05-ui-states/README.md)
