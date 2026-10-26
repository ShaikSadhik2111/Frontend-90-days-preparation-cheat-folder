# React debugging case studies (practise explaining these out loud)

For each: **symptom → hypothesis → how you'd confirm → root cause → fix → how to prevent it**.

## 1. Search shows results for an older query
**Symptom:** typing "pump" quickly sometimes shows results for "pu".
**Cause:** responses arrive out of order; the slower "pu" response calls `setResults` last.
**Confirm:** DevTools Network with "Slow 3G", watch request order.
**Fix:** AbortController in effect cleanup (or ignore flag / request id); debounce; or TanStack Query keyed by query.
**Prevent:** a `useSearch` hook used everywhere; test with deliberately out-of-order mocked latency (see `Autocomplete.test.tsx`).

## 2. Dashboard gets slower the longer it stays open
**Symptom:** control-room screen open for 8 hours becomes sluggish; memory climbs.
**Hypotheses:** WebSocket listeners added on every re-render without cleanup; `setInterval` not cleared; time-series arrays growing forever; charts not destroyed on unmount.
**Confirm:** Memory heap snapshots 10 minutes apart → compare retained objects; Performance monitor (JS heap, DOM nodes, listeners).
**Fix:** cleanup in effects; ring buffers (fixed-size arrays); `chart.destroy()` on unmount; throttle rendering of telemetry.
**Prevent:** lint `exhaustive-deps`, code review checklist for subscriptions, soak test.

## 3. Typing in a form is laggy
**Symptom:** 300 ms delay per keystroke in a 60-field configuration form.
**Confirm:** Profiler → every keystroke re-renders the whole form + a heavy preview.
**Fix:** React Hook Form (uncontrolled), split sections into memoized components, `useDeferredValue` for the preview, colocate state.
**Result:** measure keystroke-to-paint before/after (INP).

## 4. Stale data after saving
**Symptom:** user renames a device, list still shows the old name until refresh.
**Cause:** mutation succeeded but the list's cache wasn't invalidated (or list kept a copied state).
**Fix:** `invalidateQueries({ queryKey: ["devices"] })` or `setQueryData` with the response; remove copied state.
**Discuss:** optimistic update with rollback; what if another user changed it (version/ETag, 409 Conflict)?

## 5. Hydration mismatch warning after adding a "last updated" time
**Cause:** server renders time in UTC, client renders in local time zone.
**Fix:** render time on client after mount, or format with a fixed time zone passed from the server; `suppressHydrationWarning` only on that text node if unavoidable.

## 6. Optimistic "like"/"acknowledge" double-counts
**Symptom:** double clicks send two requests; counter jumps by 2 then back.
**Fix:** disable while pending / idempotency key; derive from server response; cancel in-flight queries before optimistic update; reconcile on settle.

## 7. A modal's content re-mounts and loses input when the parent updates
**Cause:** modal component defined inside the parent, or `key` changing every render (`key={Math.random()}`), or parent conditionally switching wrapper element types.
**Fix:** define components at module level, stable keys, keep the tree shape stable.

## 8. `useEffect` infinite loop
```tsx
const options = { plantId };                         // new object every render
useEffect(() => { fetchDevices(options).then(setDevices); }, [options]);
```
**Fix:** depend on `plantId` (primitive), or create `options` inside the effect, or `useMemo`.

## 9. Context update re-renders the entire app
**Symptom:** toggling a sidebar re-renders 400 components.
**Cause:** one big `AppContext` with `{ user, theme, sidebarOpen, notifications }` created inline.
**Fix:** split contexts, memoize values, move `sidebarOpen` into the layout component or a Zustand store with selectors.

## 10. Migration bug: AngularJS view doesn't update after a React component changes shared data
**Cause:** React callback mutates data owned by AngularJS outside a digest cycle.
**Fix:** wrap the callback in `$scope.$applyAsync(...)` in the bridge, or move the shared state into a framework-agnostic store both sides subscribe to.
**Interview value:** shows you understand both change-detection models — use it in your migration story.
