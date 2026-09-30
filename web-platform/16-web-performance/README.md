# 16 — Web Performance

**Connection:** networking, JavaScript, rendering and memory all contribute to perceived performance.

**Learn:** Core Web Vitals, LCP, INP, CLS, TTFB, resource loading, code splitting, lazy loading, images/fonts, long tasks, memory and virtualization.

**Example**
```js
performance.mark("search-start");
await runSearch();
performance.mark("search-end");
performance.measure("search", "search-start", "search-end");
```

**Production:** large React applications, dashboards and mobile networks.

**Pitfalls:** optimizing without measurement, excessive memoization, too much JS, layout shifts and confusing lab data with field data.

**Interview:** LCP vs INP vs CLS? long task? slow dashboard diagnosis? virtualization?

**Challenge:** profile a slow page, identify one bottleneck, optimize and re-measure.

**Next:** DevTools.