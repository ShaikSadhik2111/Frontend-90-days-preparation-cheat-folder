# Concurrent rendering

> Since React 18, rendering can be **interruptible**: React can start rendering an update, pause to handle something more urgent (typing), and resume or throw away the unfinished work. You opt in per update with transitions, deferred values and Suspense.

## Key ideas
- **Priorities:** urgent updates (input, click) vs non-urgent (transitions). Urgent ones interrupt non-urgent rendering.
- **Time slicing:** React yields to the browser between units of work (fibers) so the main thread isn't blocked for one huge render.
- **No tearing:** external stores must use `useSyncExternalStore` so all components see the same snapshot.
- **Render can run more than once / be discarded** → render must be pure; side effects only in effects/handlers.
- Commit is still synchronous and all-or-nothing — users never see half-updated UI.
- Enabled by `createRoot` (React 18). `ReactDOM.render` (legacy root) had no concurrent features.

## APIs that use it
| API | Use |
|---|---|
| `useTransition` / `startTransition` | Mark a state update as non-urgent |
| `useDeferredValue` | Render a lagging version of a value |
| `<Suspense>` | Declarative loading boundaries; with transitions keeps old UI instead of showing fallbacks |
| Streaming SSR + selective hydration | Hydrate parts of the page independently, prioritising what the user interacts with |

## What it does NOT do
It doesn't run your code in parallel threads. A single 500 ms synchronous loop still blocks — split the work, memoize, virtualize, or move it to a Web Worker.

## Interview questions
1. **What is concurrent rendering?** Interruptible, prioritised rendering that keeps the UI responsive.
2. **What changed for developers?** Mostly nothing unless you use transitions/Suspense; render purity matters more; automatic batching everywhere.
3. **What is tearing?** Inconsistent UI from reading a mutable external store mid-render.

Next → [Suspense](../suspense/README.md)
