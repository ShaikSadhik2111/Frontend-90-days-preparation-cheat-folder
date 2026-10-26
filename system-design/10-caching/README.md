# 10 — Caching (design view)

> For each data type, define: **cache key, where it's cached, freshness (TTL), invalidation trigger, and what the user sees when it's stale**.

## Cache policy table (produce one in the interview)
| Data | Layer | Key | Freshness | Invalidation | Stale UX |
|---|---|---|---|---|---|
| JS/CSS/fonts | CDN + browser | hashed filename | 1 year, immutable | new deploy = new filename | n/a |
| `index.html` | browser | URL | `no-cache` | every load revalidates | n/a |
| Device list | query cache | `["devices", plant, filters]` | 30 s | mutation → invalidate; WS event → patch | show cached + "updating…" |
| Device detail | query cache | `["device", id]` | 60 s | WS `device.updated` → patch | instant from cache |
| Permissions | query cache | `["me","permissions"]` | short / on focus | login/logout/role change | block actions until fresh |
| Search suggestions | in-memory LRU | normalised query | 5 min | size limit 100 | — |
| Reference data (plants, units) | query cache + localStorage | version | hours | version bump from server | — |
| Offline readings | IndexedDB | id | until synced | sync success | "offline — N changes pending" |

## Principles
- Freshness requirements differ: permissions and prices need stronger freshness than avatars.
- Never cache **user-specific** responses in shared caches (CDN) — `Cache-Control: private`.
- Prefer **event-driven invalidation** (mutation, WebSocket) over short TTLs.
- Dedupe in-flight identical requests.
- Bound memory (LRU, `gcTime`), especially for long-lived dashboards.

Details: [web-platform/10-caching](../../web-platform/10-caching/README.md) · [react caching & invalidation](../../react/07-data-fetching/caching-invalidation/README.md).

Next → [11 Pagination & large data](../11-pagination-large-data/README.md)
