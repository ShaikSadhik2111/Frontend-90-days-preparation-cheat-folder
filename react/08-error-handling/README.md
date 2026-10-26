# Error handling in React apps

> Plan for failure at every level: **render errors** (error boundaries), **async/event errors** (try/catch + state), **network errors** (status handling, retries), **validation errors** (forms), and **reporting** (Sentry).

## Where errors happen and who catches them
| Error source | Caught by |
|---|---|
| Render / lifecycle / constructor of children | **Error boundary** |
| Event handlers (`onClick`) | `try/catch` in the handler → set error state / toast |
| Async code (promises, `setTimeout`) | `try/catch` around `await`, `.catch`, query library `isError` |
| React 19 Actions / Suspense `use()` | thrown into the nearest error boundary |
| Unhandled anywhere | `window.onerror`, `unhandledrejection`, monitoring SDK |

## Network error handling pattern
```ts
try {
  await api("/devices", { method: "POST", body: JSON.stringify(device) });
  toast.success("Device added");
} catch (e) {
  if (e instanceof ApiError && e.status === 422) setFieldErrors(parseErrors(e));   // validation
  else if (e instanceof ApiError && e.status === 401) redirectToLogin();
  else if (e instanceof ApiError && e.status === 409) toast.error("Someone else changed this device. Reload?");
  else toast.error("Something went wrong. Please retry.");
  reportError(e);
}
```
- Retry **idempotent** requests (GET) with exponential backoff; be careful retrying POSTs.
- Show **useful** messages with a recovery action (retry, reload, contact support) — never raw stack traces.
- Keep the rest of the page usable — isolate failures per widget.

## Interview questions
1. **What doesn't an error boundary catch?** Event handlers, async code, SSR errors, errors in the boundary itself.
2. **How do you design error UX for a dashboard?** Per-widget boundaries + retry, stale-data banner, global fallback for fatal errors, reporting.

Next → [Error boundaries](error-boundaries/README.md)
