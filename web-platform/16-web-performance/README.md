# 16 — Web performance

## Core Web Vitals (Google's user-centric metrics)
| Metric | Measures | Good | Poor |
|---|---|---|---|
| **LCP** Largest Contentful Paint | when main content appears | ≤ 2.5 s | > 4 s |
| **INP** Interaction to Next Paint (replaced FID, March 2024) | worst-ish latency from interaction to next frame | ≤ 200 ms | > 500 ms |
| **CLS** Cumulative Layout Shift | unexpected layout movement | ≤ 0.1 | > 0.25 |
Supporting: **TTFB** (≤ 0.8 s), **FCP**, **TBT** (lab proxy for INP). Measured at the 75th percentile of real users.

## Improving LCP
1. Fast **TTFB**: CDN, caching, SSR/SSG, edge.
2. Find the LCP element (DevTools Performance → LCP marker). Usually a hero image or heading.
3. Image: modern format (AVIF/WebP), right size (`srcset`/`sizes`), `fetchpriority="high"`, don't lazy-load it, `preload` if discovered late (CSS background).
4. Remove render-blocking: inline critical CSS, `defer` JS, smaller bundles.
5. Fonts: `preload` key font files, `font-display: swap`, self-host, subset.

## Improving INP
1. Find long tasks (Performance panel) in interaction handlers.
2. Do less on the main thread: debounce, avoid re-rendering huge trees, virtualize lists.
3. **Yield** to the browser in long work: split into chunks (`await new Promise(r => setTimeout(r))` / `scheduler.yield()` where available), `requestIdleCallback` for non-urgent work.
4. Show immediate visual feedback, then do heavy work (`useTransition` in React).
5. Move CPU work to a Web Worker; trim third-party scripts (tag managers, chat widgets).

## Improving CLS
`width`/`height` or `aspect-ratio` on images/videos/iframes · reserve space for ads, banners, async content (skeletons with the final size) · avoid inserting content above existing content · font fallback metrics (`size-adjust`) · animate with `transform`.

## Loading strategy toolbox
Code splitting & lazy loading · tree shaking · compression (Brotli > gzip) · HTTP caching + CDN · `preload` (needed now), `prefetch` (next navigation), `preconnect`/`dns-prefetch` (origins) · image optimisation · minimise third-party JS · service worker caching.

## Measuring
- **Lab**: Lighthouse, PageSpeed Insights (lab + field), WebPageTest, DevTools Performance (with CPU/network throttling).
- **Field / RUM**: `web-vitals` JS library → analytics; Chrome UX Report (CrUX).
- **Budgets**: e.g. "JS ≤ 200 KB gzip on the landing route, LCP ≤ 2.5 s" enforced in CI (Lighthouse CI, bundle size checks).

## Interview questions
1. What are Core Web Vitals and their thresholds?
2. How would you improve a slow LCP? A poor INP? High CLS?
3. Lab vs field data?
4. `preload` vs `prefetch` vs `preconnect`?
5. Tell me about a performance improvement you made (numbers!).

Next → [17 DevTools & debugging](../17-devtools-debugging/README.md)
