# 10 — HTTP Caching and Client-Side Caching

**Connection:** repeated Fetch calls create latency and bandwidth costs.

**Learn:** Cache-Control, ETag, Last-Modified, conditional requests, browser cache, CDN concepts, application cache, cache keys, invalidation and stale-while-revalidate.

**Production:** static assets, product data, search suggestions and server-state libraries.

**Pitfalls:** caching user-specific data publicly, wrong keys, stale auth state and cache stampedes.

**Interview:** ETag vs Last-Modified? Browser cache vs React Query cache? Why is invalidation hard? CDN cache risks?

**Challenge:** design cache policy for product details and explain post-update invalidation.

**Next:** background execution.