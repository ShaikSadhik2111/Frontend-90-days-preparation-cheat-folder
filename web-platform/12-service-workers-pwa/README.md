# 12 — Service workers & PWAs

> A service worker is a script that sits **between your app and the network**. It can intercept requests, serve cached responses, work offline, sync in the background and receive push messages. Requires **HTTPS** (localhost allowed).

## Lifecycle
`register` → **install** (pre-cache app shell) → waiting (old SW still controls open tabs) → **activate** (clean old caches) → **fetch** events.
```js
// main.js
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");

// sw.js
const CACHE = "app-v3";
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["/", "/index.html", "/app.js", "/styles.css"]))));
self.addEventListener("activate", (e) => e.waitUntil(
  caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then((cached) => cached ?? fetch(e.request)));   // cache-first
});
```
A new SW waits until all tabs using the old one close — or call `skipWaiting()` + `clients.claim()` and prompt the user "New version available — reload".

## Caching strategies
| Strategy | Good for |
|---|---|
| Cache first | Hashed static assets, fonts, icons |
| Network first (fallback to cache) | HTML, API data that should be fresh but must work offline |
| Stale-while-revalidate | Avatars, non-critical API data |
| Network only | Payments, auth |
| Cache only | Pre-cached app shell |
**Workbox** (Google) implements these with a few lines and handles precache manifests from your build.

## Offline-first data
Read from IndexedDB first, sync with server when online; queue writes in an **outbox** and replay on reconnect (Background Sync API where supported); resolve conflicts (timestamps/versions).

## PWA checklist
HTTPS · web app manifest (`name`, `icons`, `start_url`, `display: standalone`, `theme_color`) · service worker with offline fallback · responsive · installable.

## Pitfalls
Caching `index.html` cache-first → users never see new deploys; bugs in SW persist (have a kill switch / versioning); caching authenticated responses; storage eviction.

## Interview questions
1. What is a service worker? How is it different from a web worker?
2. Explain the lifecycle and how updates roll out.
3. Which caching strategy for HTML vs JS vs API?
4. How would you make an app work offline and sync later?

Next → [13 Real-time](../13-realtime-websockets-sse/README.md)
