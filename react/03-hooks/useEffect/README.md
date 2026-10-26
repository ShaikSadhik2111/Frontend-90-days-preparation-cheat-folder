# useEffect

> `useEffect(setup, deps)` lets a component **synchronise with an external system** (network, subscriptions, timers, browser APIs, non-React widgets) **after React commits** the UI. It is an escape hatch — not a general "on change" mechanism.

## Anatomy
```tsx
useEffect(() => {
  // setup: runs after the commit (after paint)
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();   // cleanup: before the next setup and on unmount
}, [roomId]);                             // re-run when roomId changes
```
| deps | runs |
|---|---|
| `[a, b]` | after mount and whenever `a` or `b` changes (`Object.is`) |
| `[]` | after mount only (cleanup on unmount) |
| none | after every render |

Strict Mode (dev) runs setup → cleanup → setup once on mount to prove your cleanup works.

## Dependencies: don't lie
Every reactive value used inside (props, state, functions/objects created in the component) must be in deps. To remove a dependency, **change the code**, not the array:
- Use the updater form: `setCount((c) => c + 1)` → no need for `count`.
- Move a function/object **inside** the effect, or outside the component if it uses nothing reactive.
- Objects created during render are new every time → infinite re-runs. Depend on primitives (`options.id`) instead.

## Data fetching correctly (race conditions!)
```tsx
useEffect(() => {
  const controller = new AbortController();
  setStatus("loading");
  fetch(`/api/devices?plant=${plantId}`, { signal: controller.signal })
    .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then((data) => { setDevices(data); setStatus("success"); })
    .catch((e) => { if (e.name !== "AbortError") setStatus("error"); });
  return () => controller.abort();   // plantId changed or unmounted → cancel the old request
}, [plantId]);
```
Without cleanup, a slow response for an old `plantId` can overwrite newer data. In real apps prefer **TanStack Query** or a framework loader (caching, dedupe, retries).

## You might not need an Effect
| Instead of an effect… | Do |
|---|---|
| Compute `fullName` / filtered list | Calculate during render (`useMemo` if expensive) |
| Reset state when a prop changes | `key={id}` |
| Run logic after a click/submit | Put it in the event handler |
| Notify parent of state change | Call the parent's callback in the same handler |
| Chain effects that set state → trigger another effect | Compute everything in one place |

## useEffect vs useLayoutEffect
`useLayoutEffect` runs after DOM mutation but **before paint** — use only to measure layout and synchronously adjust (tooltips, scroll position) to avoid flicker.

## Common bugs → fixes
| Bug | Fix |
|---|---|
| Infinite loop: effect sets state that's in its deps | Derive instead, or guard, or remove unnecessary dep via updater |
| Stale value in interval/listener | Updater form, or a ref with the latest value |
| Memory leak warning / listener leak | Return cleanup |
| Request race | AbortController or `ignore` flag |
| `async` effect function | Define an async function inside and call it — the effect must return cleanup or nothing |

## Interview questions
1. **What is useEffect for?** Synchronising with external systems after commit.
2. **When does cleanup run?** Before re-running due to dep change, and on unmount.
3. **Why does my effect run twice in dev?** Strict Mode checks cleanup; production runs once.
4. **How do you handle race conditions?** Abort or ignore stale responses in cleanup.
5. **Why can't the effect callback be async?** It would return a promise instead of a cleanup function.

## Practice
Given a search component whose effect fetches on every keystroke: add debounce, abort stale requests, show loading/error/empty, and remove any unnecessary dependency. Compare with `code/machine-coding/src/components/Autocomplete`.

Next → [useRef](../useRef/README.md)
