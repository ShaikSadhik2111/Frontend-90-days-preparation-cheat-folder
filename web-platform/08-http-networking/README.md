# 08 — HTTP & networking

## HTTP methods
| Method | Purpose | Safe | Idempotent |
|---|---|---|---|
| GET | read | ✅ | ✅ |
| POST | create / action | ❌ | ❌ (use idempotency keys for retries) |
| PUT | replace | ❌ | ✅ |
| PATCH | partial update | ❌ | not guaranteed |
| DELETE | remove | ❌ | ✅ |
| OPTIONS | CORS preflight / capabilities | ✅ | ✅ |
Idempotent = repeating it has the same effect → safe to retry.

## Status codes you must know
`200 OK` · `201 Created` · `204 No Content` · `301/308 permanent redirect` · `302/307 temporary` · `304 Not Modified` · `400 Bad Request` · **`401 Unauthorized` (not authenticated)** · **`403 Forbidden` (authenticated, not allowed)** · `404` · `409 Conflict` (version clash) · `422 Unprocessable` (validation) · `429 Too Many Requests` (respect `Retry-After`) · `500` · `502 Bad Gateway` · `503 Service Unavailable` · `504 Gateway Timeout`.

## Headers worth knowing
Request: `Accept`, `Content-Type`, `Authorization`, `Cookie`, `If-None-Match`, `Origin`. Response: `Cache-Control`, `ETag`, `Set-Cookie`, `Content-Encoding: br/gzip`, `Access-Control-Allow-*`, `Content-Security-Policy`, `Strict-Transport-Security`.

## HTTP versions
| HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|
| Text, one request at a time per connection → browsers open ~6 connections/host, bundling & domain sharding hacks | Binary, **multiplexing** many requests on one TCP connection, header compression (HPACK) | QUIC over **UDP**: no TCP head-of-line blocking, faster handshakes, connection migration (mobile) |
With HTTP/2+, many small files are fine; bundling is about tree-shaking/caching, not connection limits.

## REST vs GraphQL vs others
- **REST**: resources + HTTP verbs, cacheable by URL, simple; risk of over/under-fetching.
- **GraphQL**: one endpoint, client selects fields, typed schema; harder HTTP caching, needs query cost limits.
- **gRPC-web**, **tRPC** (TypeScript end-to-end types), **WebSocket/SSE** for real-time.

## Pagination designs
Offset (`?page=3&limit=20`) — simple, jumps to page N, but shifts when data changes. **Cursor** (`?after=abc&limit=20`) — stable for feeds/infinite scroll, no "jump to page".

## Latency basics
Round trips dominate: DNS + TCP + TLS before the first byte. Reduce with CDN (closer), connection reuse, `preconnect`, HTTP/2/3, fewer sequential requests (avoid waterfalls), compression, caching.

## Interview questions
1. 401 vs 403? PUT vs PATCH? Which methods are idempotent?
2. What did HTTP/2 change for frontend bundling?
3. REST vs GraphQL trade-offs?
4. Offset vs cursor pagination?
5. How do you make retries safe for POST? (idempotency key header)

Next → [09 Fetch](../09-fetch-request-response/README.md)
