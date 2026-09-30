# React Depth Case Studies

## 1. Hydration mismatch

Trace:

`server output → client render → mismatch → warning/error → identify nondeterministic input → move client-only behavior to the correct boundary`

Investigate dates, random values, browser-only APIs and conditional rendering based on unavailable client state.

## 2. Stale server data

Trace:

`query key → cache entry → request → invalidation → refetch → UI state`

Explain why invalidation is different from blindly refetching every render.

## 3. Optimistic mutation

Trace:

`user intent → optimistic state → request → success reconciliation OR rollback`

Include duplicate clicks, out-of-order responses and retry behavior.

## 4. Performance

Do not begin with memoization. Begin with measurement:

`symptom → profile → identify expensive work → choose intervention → re-measure`

Possible interventions include state colocation, list virtualization, code splitting, memoization and reducing unnecessary subscriptions.
