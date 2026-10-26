# 09 — Data fetching strategy

| Decision | Options |
|---|---|
| When to fetch | on render (query hook), at navigation (route loader), on server (SSR/RSC), prefetch on hover/idle |
| How to cache | query cache keyed by params, `staleTime`, background refetch, gc |
| How fresh | stale-while-revalidate, polling interval, real-time push + invalidate |
| Parallel vs sequential | `Promise.all` / parallel queries; dependent queries only when truly dependent |
| Cancellation | AbortController on param change/unmount |
| Retries | exponential backoff for idempotent requests; no retry on 4xx |
| Large data | pagination/infinite query, streaming, server aggregation |
| Errors | per-widget error states with retry; global handler for 401 |

## Waterfalls (common design mistake)
```
Route renders → fetch user → render → fetch permissions → render → fetch devices   (3 RTTs)
✅ start all at navigation: Promise.all([user, permissions, devices]) or loader + parallel queries (1 RTT)
```

## Prefetching
Hover on a row → `queryClient.prefetchQuery(["device", id])` → drawer opens instantly. Prefetch next page when 70% scrolled.

## Interview phrasing
"I'd use TanStack Query: keys include all filter params, staleTime 30 s, refetch on focus, prefetch on hover, mutations invalidate the list; real-time events patch the cache directly."

Next → [10 Caching](../10-caching/README.md)
