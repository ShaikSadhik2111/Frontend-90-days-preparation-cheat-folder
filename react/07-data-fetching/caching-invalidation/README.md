# Caching & invalidation

> "There are only two hard things in computer science: cache invalidation and naming things." Know the **layers** of caching and how each is invalidated.

## Layers (outer → inner)
| Layer | What | Invalidate by |
|---|---|---|
| **CDN** | static assets, sometimes API | content-hashed filenames, purge, `s-maxage` |
| **HTTP browser cache** | responses per `Cache-Control` | hashed URLs; `ETag`/`Last-Modified` revalidation (304) |
| **Service Worker / Cache API** | offline assets & responses | versioned cache names, strategies |
| **In-memory server-state cache** | TanStack Query/RTK Query/Apollo | `invalidateQueries`, tags, refetch on focus/interval |
| **Component memo** | `useMemo`, `React.memo` | dependency changes |
| **App-level caches** | `Map`/LRU for search results | TTL, size limit, explicit clear |

## Frontend asset strategy (standard answer)
- `app.[hash].js`, `styles.[hash].css` → `Cache-Control: public, max-age=31536000, immutable`.
- `index.html` → `Cache-Control: no-cache` (always revalidate) so new deploys are picked up.

## Server-state invalidation strategies
1. **Invalidate by key/tag after mutation** (`invalidateQueries({ queryKey: ["devices"] })` invalidates all keys starting with it).
2. **Direct cache update** (`setQueryData`) when the mutation response contains the new entity.
3. **Time-based** (`staleTime`, polling).
4. **Event-based** — WebSocket message "device 42 updated" → invalidate/patch that entry.
5. **Optimistic** update + reconcile.

## Pitfalls
- Query keys missing a variable → wrong data shown for a different filter.
- Over-invalidating (`invalidateQueries()` with no key) → refetch storm.
- Caching personalised API responses at the CDN → data leak. Use `Cache-Control: private`/`no-store`.

**Interview:** *How do you make sure users get the new version after a deploy?* Hashed assets + `no-cache` HTML; for SPAs left open for days, detect a new version (poll `version.json`) and prompt reload.

Next → [Error handling](../../08-error-handling/README.md)
