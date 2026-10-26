# Core Web Vitals for React apps

| Metric | Measures | Good | Typical React causes |
|---|---|---|---|
| **LCP** Largest Contentful Paint | loading of main content | ≤ 2.5 s | Big JS bundle before render (CSR), late data fetch, unoptimised hero image |
| **INP** Interaction to Next Paint (replaced FID in March 2024) | responsiveness to clicks/typing | ≤ 200 ms | Expensive re-renders, long tasks, synchronous heavy work in handlers |
| **CLS** Cumulative Layout Shift | visual stability | ≤ 0.1 | Images without size, content injected above (banners), late-loading fonts, skeletons with wrong size |
Other: **TTFB** (server/CDN), **FCP**, **TBT** (lab proxy for INP).

## Fixes
- **LCP:** SSR/SSG or at least render the shell fast; code-split; preload the hero image (`fetchpriority="high"`) and critical fonts; CDN + compression; fetch data in parallel (no waterfalls).
- **INP:** keep handlers light, break long tasks (yield with `await new Promise(r => setTimeout(r))` or `scheduler.yield()` where supported), `useTransition` for heavy updates, debounce, virtualize, move CPU work to a Web Worker.
- **CLS:** width/height/aspect-ratio on media, reserve space for async content, `font-display: swap` + matched fallback font, avoid inserting content above existing content.

## Measuring
- Lab: Lighthouse, Chrome Performance panel.
- Field (real users): `web-vitals` library → send to analytics.
```ts
import { onLCP, onINP, onCLS } from "web-vitals";
[onLCP, onINP, onCLS].forEach((fn) => fn((metric) => navigator.sendBeacon("/rum", JSON.stringify(metric))));
```

**Interview:** *How did you improve performance?* Give a measured before/after for one metric.

Next → [Testing](../../12-testing/unit-testing/README.md)
