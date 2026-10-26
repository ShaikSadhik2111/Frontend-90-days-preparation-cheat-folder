# 14 — Browser security for frontend engineers

## Same-origin policy & CORS
**Origin = scheme + host + port.** JS can't read responses from another origin unless the server opts in with CORS.
- **Simple requests** (GET/HEAD/POST with simple headers & form content types) → sent directly; response readable only if `Access-Control-Allow-Origin` matches.
- **Preflighted requests** (PUT/PATCH/DELETE, `Content-Type: application/json`, custom headers like `Authorization`) → browser first sends `OPTIONS` with `Access-Control-Request-Method/Headers`; server answers `Allow-Origin/Methods/Headers` (+ `Max-Age` to cache the preflight).
- Cookies cross-origin: `fetch(url, { credentials: "include" })` + `Access-Control-Allow-Credentials: true` + a **specific** origin (not `*`).
- CORS is enforced **by browsers**; it doesn't protect your API from curl/Postman/servers. Dev fix: Vite/webpack dev-server proxy.

## XSS (Cross-Site Scripting) — attacker runs JS in your page
Types: stored, reflected, DOM-based. Impact: steal data/tokens, act as the user.
Defences:
- Frameworks escape text by default (React JSX, Angular templates). Danger zones: `innerHTML`, `dangerouslySetInnerHTML`, `ng-bind-html`, `eval`, `new Function`, `javascript:` URLs, `insertAdjacentHTML`.
- Sanitize HTML you must render (**DOMPurify**).
- **Content-Security-Policy**: `default-src 'self'; script-src 'self' 'nonce-…'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'` — blocks injected inline scripts.
- **Trusted Types** (CSP `require-trusted-types-for 'script'`) — forces sanitisation for DOM sinks.
- httpOnly cookies so a successful XSS can't read the session.

## CSRF (Cross-Site Request Forgery) — attacker's site makes the user's browser send an authenticated request
Defences: `SameSite=Lax/Strict` cookies, CSRF tokens (synchronizer or double-submit), check `Origin`/`Referer`, never change state with GET, require custom headers for APIs (forces a preflight).

## Clickjacking
Your page inside an attacker's invisible iframe. Defence: `Content-Security-Policy: frame-ancestors 'none'` (or `X-Frame-Options: DENY`).

## Other headers & practices
`Strict-Transport-Security` (HSTS) · `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `Permissions-Policy` · **Subresource Integrity** (`<script src integrity="sha384-…" crossorigin>`) for CDN scripts.
- Supply chain: lockfiles, `npm audit`, Dependabot/Renovate, review new dependencies.
- **Secrets never in the frontend** — env vars bundled into JS are public.
- Validate on the server; client validation is UX.
- `postMessage`: always check `event.origin`; specify `targetOrigin`.
- Open redirects: allow-list redirect targets after login.

## Interview questions
1. Explain CORS and preflight. Why does my request work in Postman but not the browser?
2. XSS vs CSRF and how you prevent each.
3. What is CSP and how does it help?
4. Where do you store tokens safely?
5. How does React protect against XSS, and where can it still happen?

Next → [15 Accessibility](../15-accessibility/README.md)
