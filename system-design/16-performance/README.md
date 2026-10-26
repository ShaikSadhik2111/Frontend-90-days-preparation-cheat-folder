# 16 — Performance (design view)

> Structure the answer by **loading performance**, **runtime performance**, and **perceived performance**, plus how you measure.

## Loading
- Rendering strategy (SSR/SSG for public pages; CSR shell for internal apps).
- Route-based code splitting; lazy-load heavy widgets (charts, editors, maps).
- Budget: initial JS ≤ ~150–200 KB gzip; analyse bundles in CI.
- CDN, Brotli, HTTP/2/3, long-term caching with hashed assets.
- Critical CSS, font strategy, image optimisation (AVIF/WebP, `srcset`, `fetchpriority`).
- Prefetch next routes/data on hover/idle; avoid request waterfalls (parallel / loaders / BFF).

## Runtime
- Minimise re-renders (state colocation, selectors, memo where measured).
- Virtualize long lists/grids; paginate.
- Throttle high-frequency updates (real-time, scroll, resize) to animation frames.
- Move CPU-heavy work to Web Workers; avoid layout thrashing; animate `transform`/`opacity`.
- Watch memory in long-lived sessions (cleanup, bounded caches, ring buffers).

## Perceived
Skeletons sized like content, optimistic UI, instant feedback on click (< 100 ms), progressive rendering (streaming/Suspense), keep previous data while refetching.

## Measure
Core Web Vitals in the field (RUM with `web-vitals`), Lighthouse CI budgets, custom marks for key interactions ("time to first device row"), Profiler for React hot spots.

Details: [web-platform/16-web-performance](../../web-platform/16-web-performance/README.md) · [react/11-performance](../../react/11-performance/profiling/README.md).

Next → [17 Security](../17-security/README.md)
