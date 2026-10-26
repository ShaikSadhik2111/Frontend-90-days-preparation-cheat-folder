# 01 — Web platform fundamentals: what happens when you open a URL

> The most common opening question in frontend interviews. Answer in layers: **network → parsing → rendering → JavaScript**.

## The full sequence
1. **URL parsing & checks** — scheme/host/path; HSTS list forces HTTPS; a **service worker** may intercept; the browser **HTTP cache** may answer immediately.
2. **DNS** — browser cache → OS cache → resolver → root → TLD → authoritative server → IP address. (`dns-prefetch` / `preconnect` hints can do this early.)
3. **Connection** — TCP 3-way handshake (SYN, SYN-ACK, ACK) + **TLS** handshake (certificate check, key exchange). **HTTP/3** uses QUIC over UDP and combines transport + TLS setup.
4. **HTTP request/response** — method, headers, cookies sent; CDN/server responds with status, headers (`Cache-Control`, `Content-Type`, `Set-Cookie`, security headers) and body. Redirects (301/302) repeat the process.
5. **HTML parsing** → **DOM**. The parser streams; the **preload scanner** discovers CSS/JS/images early.
   - `<link rel="stylesheet">` → **CSSOM**; CSS is **render-blocking**.
   - `<script>` (no `async`/`defer`) **blocks parsing** until downloaded and executed.
6. **Render tree** (DOM + CSSOM, visible nodes) → **Layout** (geometry) → **Paint** (pixels in layers) → **Composite** (GPU combines layers) → first pixels on screen.
7. **JavaScript** runs, fetches data, updates the DOM → more style/layout/paint. `DOMContentLoaded` (DOM parsed, deferred scripts run) → `load` (all subresources loaded).
8. For an SPA: JS bundle downloads → React renders/hydrates → API calls → content appears.

## `async` vs `defer` vs `type="module"`
| | Downloads | Executes | Order |
|---|---|---|---|
| plain `<script>` | blocks parser | immediately | in order |
| `async` | in parallel | as soon as downloaded (pauses parser) | not guaranteed |
| `defer` | in parallel | after parsing, before `DOMContentLoaded` | in order |
| `type="module"` | in parallel | deferred by default | in order |
Use `defer` for app code, `async` for independent scripts (analytics).

## Browser architecture (good bonus point)
Multi-process (Chrome): browser process (UI, network), **renderer process per site** (Blink, V8, main thread + compositor thread), GPU process. The **main thread** runs JS, style, layout and paint — that's why long JS tasks freeze the page.

## Interview questions
1. Explain "type a URL and press Enter" (3 minutes, layered).
2. Why is CSS render-blocking and JS parser-blocking?
3. `async` vs `defer`?
4. `DOMContentLoaded` vs `load`?
5. What can make the first visit slow, and the repeat visit fast? (DNS/TLS/no cache vs cache/SW/CDN)

Next → [02 HTML & semantics](../02-html-and-semantics/README.md)
