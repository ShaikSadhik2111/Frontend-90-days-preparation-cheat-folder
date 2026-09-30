# 19 — Modern Browser APIs and Capability Boundaries

**Connection:** modern frontend applications use capabilities beyond DOM and networking.

**Learn:** Clipboard, File/Blob, URL/URLSearchParams, History, BroadcastChannel, Page Visibility, IntersectionObserver, ResizeObserver, Notifications/Permissions conceptually, Media APIs, Web Share, Web Locks, Navigation API, WebTransport and Reporting API.\n\n**Future-proofing:** Navigation API is a modern SPA navigation primitive; WebTransport is an HTTP/3 transport option with streams/datagrams; Reporting API can surface policy/deprecation/intervention reports. Treat these as capability-dependent and check Baseline/compatibility before production adoption.

**Example**
```js
const params = new URLSearchParams(location.search);
const page = Number(params.get("page") ?? 1);
history.replaceState(null, "", `?page=${page}`);
```

**Production:** infinite scroll, responsive components, multi-tab coordination, uploads, deep links and clipboard actions.

**Pitfalls:** unsupported APIs, ignored permission states, leaking observers and polling where observers exist.

**Interview:** IntersectionObserver vs scroll listener? ResizeObserver? BroadcastChannel vs storage events? permission denial?

**Challenge:** infinite list with IntersectionObserver and cross-tab refresh via BroadcastChannel.

**Next:** interview drills.