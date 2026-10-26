# Web platform — interview revision sheet (browser, network, security, performance, CSS)

> MNC interviewers love "What happens when you type a URL?" and CSS questions. Product companies go deeper on performance & security.

---

## 1. What happens when you type a URL and hit Enter
1. **URL parsing** → check HSTS, cache, service worker.
2. **DNS lookup** (browser cache → OS → resolver → root → TLD → authoritative) → IP.
3. **TCP handshake** (SYN, SYN-ACK, ACK) + **TLS handshake** (certificate, keys). HTTP/3 uses QUIC over UDP.
4. **HTTP request** → server/CDN → response (status, headers, body). Redirects, caching headers.
5. **Parsing**: HTML → **DOM**; CSS → **CSSOM**. `<script>` without `defer/async` **blocks parsing**. CSS blocks rendering (and blocks scripts that come after it).
6. **Render tree** (DOM + CSSOM, visible nodes only) → **Layout** (geometry) → **Paint** (pixels into layers) → **Composite** (GPU combines layers).
7. JS executes, fetches data, updates DOM → repeat layout/paint as needed.

### `async` vs `defer`
- `async`: download in parallel, execute **as soon as downloaded** (order not guaranteed) → analytics.
- `defer`: download in parallel, execute **after parsing, in order**, before `DOMContentLoaded` → app scripts.
- `type="module"` is deferred by default.
- `DOMContentLoaded` = DOM parsed; `load` = all resources (images, CSS) loaded.

### Reflow vs repaint
- **Layout/reflow**: geometry changes (width, height, position, font, adding nodes) → expensive, can cascade.
- **Repaint**: visual-only (color, background, visibility).
- **Composite-only**: `transform`, `opacity` → cheapest → use for animations.
- **Layout thrashing**: alternating reads (`offsetHeight`, `getBoundingClientRect`) and writes in a loop forces sync layout each time → batch reads then writes, or use `requestAnimationFrame`.

---

## 2. DOM & events
- Event phases: **capture** (window → target) → **target** → **bubble** (target → window). `addEventListener(type, fn, { capture: true })`.
- `e.stopPropagation()` stops further propagation; `e.preventDefault()` cancels default action (form submit, link nav). Different things!
- `e.target` = element that fired; `e.currentTarget` = element the listener is on.
- **Event delegation**: one listener on a parent handles events from many children via `e.target.closest(".item")` → fewer listeners, works for dynamically added items. React historically did delegation at the root (since 17, at the root container).
- Passive listeners (`{ passive: true }`) for scroll/touch → browser doesn't wait for `preventDefault`.
- Observers: `IntersectionObserver` (lazy load, infinite scroll), `ResizeObserver`, `MutationObserver`.
- `requestAnimationFrame` (before next paint), `requestIdleCallback` (idle time).

---

## 3. Storage
| | Capacity | Lifetime | Sent to server | Access |
|---|---|---|---|---|
| Cookie | ~4KB | expiry/session | **every request** to domain | JS (unless `HttpOnly`) |
| localStorage | ~5–10MB | until cleared | no | sync JS, same origin |
| sessionStorage | ~5MB | tab session | no | sync JS, per tab |
| IndexedDB | large (quota) | until cleared | no | async, structured data, offline apps |
| Cache API | large | until cleared | no | service worker caching responses |

Cookie flags: `HttpOnly` (no JS access), `Secure` (HTTPS only), `SameSite=Lax|Strict|None` (CSRF protection), `Domain`, `Path`, `Max-Age`.

---

## 4. HTTP essentials
- Methods: GET (safe, idempotent), POST (not idempotent), PUT (replace, idempotent), PATCH (partial), DELETE (idempotent).
- Status: 200 OK, 201 Created, 204 No Content, 301/302 redirect, 304 Not Modified, 400 Bad Request, 401 Unauthenticated, 403 Forbidden, 404, 409 Conflict, 422 Validation, 429 Too Many Requests, 500, 502 Bad Gateway, 503 Unavailable.
- HTTP/1.1 (one request per connection at a time → domain sharding), **HTTP/2** (multiplexing over one connection, header compression), **HTTP/3** (QUIC/UDP, no TCP head-of-line blocking).
- REST vs GraphQL: GraphQL → one endpoint, client picks fields (no over/under-fetching), harder HTTP caching. REST → simple, cacheable.

### Caching headers
- `Cache-Control: max-age=31536000, immutable` → hashed static assets (`app.3f9a.js`).
- `Cache-Control: no-cache` → store but **revalidate** every time (use for `index.html`). `no-store` → never store.
- Validators: `ETag` + `If-None-Match`, `Last-Modified` + `If-Modified-Since` → `304`.
- `stale-while-revalidate` → serve stale, refresh in background.
- CDN caches at edge, close to the user.

### CORS
Browser blocks JS from reading responses from a **different origin** (scheme + host + port) unless the server allows it.
- Simple requests (GET/POST with simple headers) → sent; server must return `Access-Control-Allow-Origin`.
- Non-simple (PUT/DELETE, JSON content-type, custom headers like `Authorization`) → browser sends a **preflight `OPTIONS`** first; server answers with `Allow-Origin`, `Allow-Methods`, `Allow-Headers`, optionally `Max-Age`.
- With cookies: `fetch(..., { credentials: "include" })` + server `Access-Control-Allow-Credentials: true` + a **specific** origin (not `*`).
- CORS is enforced by the browser — it is **not** a server security measure against curl/Postman. Dev fix: proxy in Vite/webpack dev server.

---

## 5. Web security (frontend view)
- **XSS** (injecting script): React escapes text by default; danger points are `dangerouslySetInnerHTML`, `innerHTML`, `href="javascript:..."`, `eval`. Mitigate: sanitize (DOMPurify), **Content-Security-Policy** header (`script-src 'self'`), HttpOnly cookies, Trusted Types. AngularJS: `$sce`, avoid `ng-bind-html` with untrusted data.
- **CSRF** (forged request using the victim's cookies): `SameSite` cookies, CSRF tokens, check `Origin` header, don't use GET for state changes.
- **Clickjacking**: `X-Frame-Options: DENY` / CSP `frame-ancestors`.
- **HTTPS + HSTS**, Subresource Integrity (`integrity=` on CDN scripts), dependency audits (`npm audit`), don't put secrets in frontend bundles (anything in JS is public).
- **Open redirect**, validate redirect URLs; don't log tokens.

---

## 6. Web performance — Core Web Vitals
| Metric | Measures | Good |
|---|---|---|
| **LCP** Largest Contentful Paint | loading | ≤ 2.5s |
| **INP** Interaction to Next Paint (replaced FID in 2024) | responsiveness | ≤ 200ms |
| **CLS** Cumulative Layout Shift | visual stability | ≤ 0.1 |
Also TTFB, FCP, TBT.

Improve **LCP**: CDN, compress (Brotli/gzip), preload hero image/fonts (`<link rel="preload">`), SSR, smaller JS, image optimisation (WebP/AVIF, `srcset`, `fetchpriority="high"`).
Improve **INP**: break long tasks (>50ms) — yield with `setTimeout`/`scheduler.yield`, web workers, less JS, debounce, `useTransition`, virtualize.
Improve **CLS**: set `width/height` or `aspect-ratio` on media, reserve space for ads/banners, `font-display: swap` with fallback metrics.

Other: code splitting, tree shaking, lazy loading (`loading="lazy"`), `preconnect`/`dns-prefetch`, HTTP caching, service worker, avoid huge libraries, measure with Lighthouse + RUM (web-vitals library).

---

## 7. Workers, PWA, real-time
- **Web Worker**: JS in a background thread; no DOM; talk via `postMessage` → heavy parsing, CSV processing, image work.
- **Service Worker**: proxy between app and network; caching strategies (cache-first for static, network-first for API, stale-while-revalidate), offline, push notifications. Lifecycle: install → activate → fetch. Requires HTTPS. Workbox simplifies it.
- Real-time options: **polling** (simple, wasteful), **long polling**, **SSE** (server → client one-way over HTTP, auto-reconnect; great for notifications/live dashboards), **WebSocket** (full-duplex; chat, collaboration, IoT telemetry). Handle reconnect with exponential backoff, heartbeats, message ordering, and throttled rendering of high-frequency updates.

---

## 8. HTML & accessibility
- Semantic tags: `header nav main section article aside footer`, headings in order, `button` for actions vs `a` for navigation, `label for`, `fieldset/legend`.
- ARIA rule #1: don't use ARIA if a native element does it. `role`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-hidden`, `aria-live="polite"`.
- Keyboard: everything reachable with Tab, `tabindex="0"` to add, `-1` for programmatic focus; never positive tabindex.
- WCAG 2.1/2.2 AA: contrast 4.5:1 for text; test with axe DevTools, Lighthouse, screen reader (NVDA/VoiceOver).
- For Bosch/Siemens-style industrial and enterprise apps, accessibility & i18n (RTL, date/number formats via `Intl`) come up often.

---

## 9. CSS — must-know topics

### Box model
`content + padding + border + margin`. `box-sizing: border-box` → width includes padding & border (use globally). Vertical margins of block elements **collapse**.

### Specificity (low → high)
type/pseudo-element (0,0,1) < class/attribute/pseudo-class (0,1,0) < id (1,0,0) < inline style < `!important`. Equal specificity → later rule wins. `:where()` has 0 specificity; `:is()`/`:not()` take their most specific argument.

### Positioning
`static` (default) · `relative` (offset from itself, creates containing block for absolute children) · `absolute` (relative to nearest **positioned** ancestor) · `fixed` (viewport; but a transformed ancestor becomes its containing block!) · `sticky` (relative until a threshold, then fixed within parent; breaks if an ancestor has `overflow: hidden`).

### Stacking context / z-index
`z-index` only works on positioned elements (or flex/grid items). New stacking contexts are created by `position` + `z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate`… A child can never escape its parent's stacking context → common "z-index doesn't work" answer; fix with portals.

### Flexbox (1-D)
Container: `display:flex; flex-direction; justify-content` (main axis) `; align-items` (cross axis) `; flex-wrap; gap`.
Items: `flex: grow shrink basis` (`flex: 1` = `1 1 0%`), `align-self`, `order`. `min-width: 0` fixes overflowing flex children with long text.

### Grid (2-D)
```css
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.layout { grid-template-areas: "header header" "sidebar main"; grid-template-columns: 240px 1fr; }
```
`auto-fill` keeps empty tracks; `auto-fit` collapses them.

### Centering (asked constantly)
```css
.parent { display: grid; place-items: center; }               /* simplest */
.parent { display: flex; justify-content: center; align-items: center; }
.child  { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
```

### Responsive
Mobile-first `@media (min-width: 768px)`, relative units (`rem` = root font size, `em` = parent, `%`, `vw/vh`, `dvh`), `clamp(1rem, 2vw, 1.5rem)`, container queries `@container (min-width: 400px)`, `srcset/sizes`, `picture`.

### Other
- `display: none` (removed from layout & a11y tree) vs `visibility: hidden` (keeps space) vs `opacity: 0` (keeps space, still clickable).
- Pseudo-classes (`:hover :focus-visible :nth-child(2n) :has()`) vs pseudo-elements (`::before ::after ::placeholder`).
- BFC (block formatting context): created by `overflow` ≠ visible, `display: flow-root`, flex/grid items → contains floats, prevents margin collapse.
- CSS variables `--primary: #0a66c2; color: var(--primary)` → theming/dark mode.
- Architecture: BEM, CSS Modules, CSS-in-JS (styled-components/emotion — runtime cost), Tailwind (utility), SCSS (variables, mixins, nesting). Know trade-offs.
- Animations: `transition` vs `@keyframes`; animate `transform/opacity`; respect `prefers-reduced-motion`.

### CSS quick-fire
1. How to center a div (3 ways)? 2. Flex vs Grid? 3. Specificity calculation? 4. `em` vs `rem`? 5. Why is z-index not working? 6. `position: sticky` not working — why? 7. How to build a responsive card grid without media queries? 8. What is BFC? 9. How do you implement dark mode? 10. CSS Modules vs Tailwind vs styled-components.
