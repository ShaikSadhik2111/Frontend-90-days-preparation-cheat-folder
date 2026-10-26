# 10 — HTTP caching & client caching

## Cache-Control directives
| Directive | Meaning |
|---|---|
| `max-age=N` | fresh for N seconds (browser + shared caches) |
| `s-maxage=N` | freshness for shared caches (CDN) |
| `no-cache` | may store, but **must revalidate** before use |
| `no-store` | never store (sensitive data) |
| `private` / `public` | only the browser may cache / CDNs may cache too |
| `immutable` | never changes during max-age (skip revalidation) |
| `stale-while-revalidate=N` | serve stale up to N s while refreshing in background |

## Validation (conditional requests)
```
1st:  200 OK          ETag: "v42"        Last-Modified: Tue, 27 Oct 2026 10:00:00 GMT
next: GET  If-None-Match: "v42"   →   304 Not Modified (no body, use cached copy)
```
`ETag` (content fingerprint) is more precise than `Last-Modified` (1-second resolution).

## Standard SPA strategy
| Resource | Header |
|---|---|
| `app.4f8c1.js`, `styles.91ab.css`, fonts, images (content hash in name) | `public, max-age=31536000, immutable` |
| `index.html` | `no-cache` (always revalidate → picks up new deploys) |
| User-specific API responses | `private, no-cache` or `no-store` |
| Public, slow-changing API (product catalog) | `public, max-age=60, stale-while-revalidate=300` |

## Layers
Memory cache → disk (HTTP) cache → service worker cache → CDN edge → origin server. Plus app-level caches (TanStack Query, Map/LRU).

## Pitfalls
- Caching user-specific responses on a CDN (`public`) → **data leak** between users.
- Missing cache key parts (`Vary: Accept-Encoding, Authorization`) → wrong variant served.
- Forgetting cache-busting → users stuck on old JS after deploy.
- **Cache stampede**: many clients refetch at expiry at the same moment → `stale-while-revalidate`, jitter.
- Long-open SPAs: detect new versions (poll `version.json`) and prompt reload; handle chunk-load errors after deploy.

## Interview questions
1. `no-cache` vs `no-store`?
2. ETag vs Last-Modified?
3. How do you cache a React SPA's assets and HTML?
4. Browser cache vs React Query cache?
5. How do you invalidate a CDN cache after deploy?

Next → [11 Web Workers](../11-web-workers/README.md)
