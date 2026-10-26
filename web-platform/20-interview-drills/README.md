# 20 — Web platform interview drills

Answer out loud. Time yourself. Then check against the topic files and the [revision sheet](../00-interview-revision-sheet/README.md).

## Rapid fire (≤ 60 s each)
1. What happens when you type a URL and press Enter? (3 min version)
2. `async` vs `defer`.
3. Reflow vs repaint; why animate `transform`?
4. Event bubbling vs capturing; `target` vs `currentTarget`.
5. Event delegation — write it.
6. Cookies vs localStorage vs sessionStorage vs IndexedDB.
7. `HttpOnly`, `Secure`, `SameSite`.
8. 401 vs 403; idempotent methods.
9. HTTP/1.1 vs HTTP/2 vs HTTP/3.
10. `Cache-Control: no-cache` vs `no-store`; ETag.
11. How do you cache a SPA (assets vs index.html)?
12. CORS and preflight — why does Postman work but the browser doesn't?
13. XSS vs CSRF + defences; what is CSP?
14. Web Worker vs Service Worker.
15. Service worker caching strategies.
16. Polling vs SSE vs WebSocket.
17. LCP, INP, CLS — thresholds and fixes.
18. `preload` vs `prefetch` vs `preconnect`.
19. How do you find a memory leak?
20. Semantic HTML & ARIA basics; focus management in SPAs.
21. Specificity calculation; why z-index isn't working.
22. Flex vs grid; centre a div 3 ways.
23. Shadow DOM vs virtual DOM.

## Coding drills (vanilla JS, 15–20 min each)
1. Event delegation on a todo list (add/delete/toggle) without a framework.
2. Infinite scroll with `IntersectionObserver`.
3. Debounced search with `AbortController` and stale-response protection.
4. `getElementsByClassName` polyfill (DOM tree walk).
5. A tiny router with `history.pushState` + `popstate`.
6. Lazy-load images with `data-src`.
7. WebSocket client with reconnect + exponential backoff.
8. A `<tool-tip>` custom element.

## Scenario questions (senior level)
- "Users say the dashboard is slow on factory floor PCs" — how do you investigate and fix? (field data, CPU throttling, long tasks, bundle size, virtualization, workers)
- "After every deploy some users get a blank page" — why? (cached index.html, chunk load errors, SW caching) → fixes.
- "We must support offline for technicians in basements" — design it (SW + IndexedDB + outbox + conflict handling).
- "A pen-test found XSS in the comments field" — what do you do now and long term?
