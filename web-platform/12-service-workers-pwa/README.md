# 12 — Service Workers and PWA Architecture

**Connection:** a Service Worker introduces a programmable network boundary.

**Learn:** registration, install, activate, fetch interception, Cache Storage, lifecycle/versioning, update behavior, offline strategies and runtime caching.

**Example**
```js
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
```

**Production:** offline-first apps, resilient assets and installable experiences.

**Pitfalls:** stale shells forever, cache-version mistakes, unsafe interception and scope confusion.

**Interview:** Service Worker vs Worker? Why can an old worker remain active? Cache-first vs network-first? Safe rollout?

**Challenge:** offline notes app with Service Worker + IndexedDB and an explicit conflict strategy.

**Next:** real-time transports.