# 07 — Browser storage

| | Size | Lifetime | Scope | API | Sent with requests |
|---|---|---|---|---|---|
| **Cookies** | ~4 KB each | `Expires`/`Max-Age` or session | domain + path | `document.cookie` / `Set-Cookie` | ✅ every matching request |
| **localStorage** | ~5–10 MB | until cleared | origin | sync, strings only | ❌ |
| **sessionStorage** | ~5 MB | until tab closes | origin + tab | sync, strings only | ❌ |
| **IndexedDB** | large (quota, % of disk) | until cleared/evicted | origin | async, structured data, indexes, transactions | ❌ |
| **Cache API** | large (quota) | until cleared | origin | async, Request→Response pairs (service workers) | ❌ |

## Cookies
```http
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600
```
- `HttpOnly` → JS can't read it (protects session from XSS theft).
- `Secure` → HTTPS only. `SameSite=Lax` (default in modern browsers) / `Strict` / `None; Secure` (cross-site, e.g. embedded apps) → CSRF protection.
- Keep cookies small — they add bytes to **every** request.

## localStorage pitfalls
- **Synchronous** → blocks the main thread for big values.
- Strings only → `JSON.stringify`/`parse` (wrap in try/catch: quota errors, corrupted data, disabled in some private modes).
- Readable by any script on the origin → **never store tokens or secrets** there if XSS is a risk.
- `storage` event fires in **other tabs** when a value changes → cross-tab sync (logout everywhere).

## IndexedDB
For offline data, large datasets, files/blobs, outbox queues. Use a wrapper like `idb` or Dexie:
```js
import { openDB } from "idb";
const db = await openDB("plant-app", 1, { upgrade(db) { db.createObjectStore("readings", { keyPath: "id" }); } });
await db.put("readings", { id: "r1", deviceId: "d1", value: 42, at: Date.now() });
const all = await db.getAll("readings");
```

## Choosing
- Auth session → httpOnly cookie.
- UI preferences (theme, collapsed sidebar) → localStorage.
- Per-tab wizard draft → sessionStorage.
- Offline data / big caches → IndexedDB.
- Offline assets/API responses → Cache API via service worker.

## Interview questions
1. Cookies vs localStorage vs sessionStorage?
2. Where would you store an auth token and why?
3. How do you sync logout across tabs?
4. When would you use IndexedDB?
5. What do `HttpOnly`, `Secure`, `SameSite` do?

Next → [08 HTTP & networking](../08-http-networking/README.md)
