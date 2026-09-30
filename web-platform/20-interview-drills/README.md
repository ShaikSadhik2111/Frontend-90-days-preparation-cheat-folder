# 20 — Web Platform Interview Drills

**Rapid questions:** DOM? origin? CORS? fetch rejection? localStorage vs IndexedDB? Worker vs Service Worker? WebSocket vs SSE? layout thrashing? event delegation? Same-Origin Policy?

**5-minute drills**
1. Debug a search race.
2. Explain a slow dashboard.
3. Design offline notes.
4. Secure user-generated HTML.
5. Diagnose a memory leak.
6. Design reconnecting WebSocket.
7. Make a modal accessible.
8. Explain browser cache vs application cache.

**30-minute design:** authenticated dashboard with caching, live updates, offline fallback, accessible tables, large data, performance budget and observability.

**Answer method:** browser primitive → runtime behavior → application state → failure mode → security/accessibility → performance → trade-off → framework integration.

**Completion test:** explain not just which API you choose, but why, what fails, and how the browser participates.

**Future-proof rule:** learn standards and durable platform concepts first; verify current browser compatibility for newly introduced APIs.