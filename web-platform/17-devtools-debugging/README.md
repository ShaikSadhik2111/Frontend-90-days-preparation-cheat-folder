# 17 — DevTools & debugging

> Interviewers love "how would you debug…?" Answer with a **method** and **specific tools**.

## Method
Reproduce reliably → isolate (smallest case, binary search: comment out, `git bisect`) → form a hypothesis → measure/observe → fix → add a test → verify in production monitoring.

## Chrome DevTools panels
| Panel | Use it for |
|---|---|
| **Elements** | DOM/CSS live editing, computed styles, box model, layout (flex/grid overlays), event listeners, accessibility tree |
| **Console** | `console.table`, `console.time/timeEnd`, `console.trace`, `$0` (selected element), `monitorEvents($0)`, live expressions |
| **Sources** | Breakpoints: line, **conditional**, logpoints (log without editing code), DOM breakpoints (subtree/attribute modified), **XHR/fetch breakpoints**, event listener breakpoints, "pause on caught exceptions"; source maps; local overrides |
| **Network** | Status, timing waterfall, headers (CORS, cache), payloads, throttling (Slow 3G), disable cache, block request URL, copy as cURL/fetch, HAR export |
| **Performance** | Record interactions: long tasks, flame chart, layout/paint, Web Vitals markers, CPU throttling |
| **Memory** | Heap snapshots (compare for leaks, search "Detached"), allocation timeline |
| **Application** | Storage (cookies, localStorage, IndexedDB), service workers (update/unregister), cache storage, manifest |
| **Lighthouse** | Performance/a11y/SEO/best practices audit |
| **Rendering** (More tools) | Paint flashing, layout shift regions, FPS meter, emulate `prefers-color-scheme`/reduced motion |
Plus **React DevTools** (components, props/state, Profiler) and **Redux DevTools** / TanStack Query Devtools.

## Typical debugging stories
- **"Works locally, broken in prod"**: compare env vars/API URLs, minification issues, CORS/CSP headers, caching of old bundles, feature flags; reproduce with production build locally (`vite build && vite preview`); use source maps + Sentry breadcrumbs.
- **Memory leak**: snapshot → interact → snapshot → compare retained size; look for detached DOM, listeners, intervals, closures.
- **Janky scroll**: Performance recording → long tasks during scroll, forced reflows, non-passive listeners.
- **Request fails only in browser**: Network panel → preflight OPTIONS → CORS headers.

## Interview questions
1. How would you debug a page that freezes when clicking a button?
2. How do you find a memory leak?
3. How do you debug a CORS error?
4. What's a logpoint / conditional breakpoint / XHR breakpoint?
5. How do you debug production-only errors? (source maps, monitoring, reproduce prod build)

Next → [18 Web Components](../18-web-components/README.md)
