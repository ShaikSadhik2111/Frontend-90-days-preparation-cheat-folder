# 18 — Caching in machine coding

```ts
// simple TTL + size-limited cache for search results
class TTLCache<V> {
  private map = new Map<string, { value: V; expires: number }>();
  constructor(private ttlMs: number, private max = 100) {}
  get(key: string) {
    const hit = this.map.get(key);
    if (!hit) return undefined;
    if (hit.expires < Date.now()) { this.map.delete(key); return undefined; }
    this.map.delete(key); this.map.set(key, hit);          // refresh LRU position
    return hit.value;
  }
  set(key: string, value: V) {
    this.map.delete(key);
    this.map.set(key, { value, expires: Date.now() + this.ttlMs });
    if (this.map.size > this.max) this.map.delete(this.map.keys().next().value!);   // evict oldest
  }
}
const cache = new TTLCache<User[]>(60_000);
async function searchCached(q: string, signal?: AbortSignal) {
  const key = q.trim().toLowerCase();
  const hit = cache.get(key);
  if (hit) return hit;
  const result = await searchUsers(key, signal);
  cache.set(key, result);
  return result;
}
```
Also: **dedupe in-flight** requests (store the promise in a Map, delete on settle), invalidate on mutation, mention TanStack Query in production. LRU reference: [code/polyfills/src/LRUCache.js](../../code/polyfills/src/LRUCache.js).

Next → [19 Optimistic UI](../19-optimistic-ui/README.md)
