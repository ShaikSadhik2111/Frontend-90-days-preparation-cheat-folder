# Caching and Invalidation

Layers: browser cache, HTTP cache, CDN, application/query cache and server cache. Each has different ownership and invalidation.

A cache key must contain every input that changes the result: user/tenant, filters, sort, locale or permissions where relevant, and pagination inputs.

Freshness states: fresh, stale, stale-while-revalidate, invalidated. Stale data is acceptable only when product requirements allow it.

After mutation: invalidate affected queries, update cache directly, refetch authoritative data, or optimistic update then reconcile.

Concurrent identical requests should share an in-flight operation where possible.

Cache stampede risk occurs when many clients expire together; use request coalescing, jittered expiry or server protection.

Interview: dashboard with 12 widgets refreshing each minute. Discuss shared query keys, batching, visibility, polling coordination and backend limits.

Challenge: design cache keys/invalidation for order list, order detail and customer detail.