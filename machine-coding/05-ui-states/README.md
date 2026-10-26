# 05 — UI states: loading, empty, error, success

> Interviewers deliberately check: **what does the user see while loading, when there's no data, and when it fails?**

```tsx
type Status<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; error: string };

function View({ state, onRetry }: { state: Status<Item[]>; onRetry: () => void }) {
  switch (state.status) {
    case "idle": return <p>Type to search</p>;
    case "loading": return <Skeleton rows={5} />;
    case "error": return <div role="alert">{state.error} <button onClick={onRetry}>Retry</button></div>;
    case "success": return state.data.length ? <List items={state.data} /> : <p>No results</p>;
  }
}
```
Also consider: **refreshing** (show old data + small spinner), **partial** errors (one widget), **disabled** states during submit, **optimistic/pending** items, **offline**.
Avoid loading flicker for fast responses: show the spinner only after ~150–200 ms, or keep previous data.

Next → [06 Forms & validation](../06-forms-validation/README.md)
