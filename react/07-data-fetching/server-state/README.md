# Server state vs client state

> **Server state** is data owned by the backend that your UI only *caches* (users, devices, orders). **Client state** is owned by the browser (modal open, theme, draft text). They have different problems and deserve different tools.

| | Client state | Server state |
|---|---|---|
| Owner | The UI | The server (other users can change it) |
| Freshness | Always current | Can be **stale** |
| Problems | Sharing, updates | Caching, dedupe, refetching, invalidation, pagination, retries, optimistic updates |
| Tools | useState, Zustand, Redux | TanStack Query, RTK Query, SWR, Apollo (GraphQL) |

## Anti-pattern: copying server data into global client state
```ts
// ❌ fetch in a thunk → store in Redux → manually track loading/error/staleness everywhere
// ✅ useQuery(["devices", plantId], fetchDevices) — the cache IS the source of truth
```

## Key ideas to explain
- **Stale-while-revalidate:** show cached data immediately, refetch in the background, update when fresh.
- **Query keys:** identity of the data (`["devices", { plantId, status }]`) → caching + dedupe + invalidation.
- **Invalidation after mutations:** after creating a device, invalidate `["devices"]` so lists refetch.
- **Refetch triggers:** window focus, reconnect, interval (polling), manual.
- **Garbage collection:** unused cache entries removed after a timeout.

**Interview:** *Why not keep API data in Redux?* You'd re-implement caching/staleness/dedupe manually; a server-state library solves it with less code and fewer bugs. (RTK Query exists precisely for this.)

Next → [TanStack Query](../tanstack-query/README.md)
