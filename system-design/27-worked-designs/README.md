# 27 — Worked frontend system designs (RADIO framework + 8 designs)

> At 4.5 years, product companies and many MNC "Senior/Lead" loops include a 45–60 min frontend design round.
> They are not testing whether you know every tool — they test **structured thinking and trade-offs**.

## The RADIO framework (use it every time)
| Step | Time | What you do |
|---|---|---|
| **R**equirements | 5–8 min | Functional (what users do) + non-functional (scale, performance, offline, a11y, i18n, devices, security). Ask, then write them down. Agree on scope. |
| **A**rchitecture | 8–10 min | Box diagram: client modules (view, state/store, data layer/API client, cache, router), server/API, CDN, realtime channel. |
| **D**ata model | 5–8 min | Entities and client state shape: server cache vs UI state vs URL state. Normalise (`byId` + `ids`). |
| **I**nterface (API) | 5–8 min | Endpoints/events between client & server: REST/GraphQL/WebSocket; pagination (cursor vs offset); request/response shapes; component props API. |
| **O**ptimisations | 15 min | Performance, network, rendering, a11y, security, error handling, observability, testing, deployment. Go deep where the interviewer shows interest. |

Always finish with **trade-offs** and **what you'd do next**.

## Toolbox — things to mention in "Optimisations"
- **Rendering:** CSR vs SSR/SSG/streaming, code splitting per route, lazy loading below the fold, virtualization for long lists, memoization, web workers for heavy work.
- **Network:** pagination (cursor for feeds), debounce search, request dedupe, caching (HTTP cache headers, CDN, TanStack Query stale-while-revalidate), prefetch on hover, compression, HTTP/2, batching, retries with exponential backoff, cancellation.
- **Data freshness:** polling vs long-polling vs SSE vs WebSocket; optimistic updates with rollback; conflict resolution (last-write-wins, version numbers, CRDT/OT for collaboration).
- **Offline:** Service Worker + Cache API for assets, IndexedDB for data, outbox queue for writes, sync on reconnect.
- **Perceived performance:** skeletons, optimistic UI, progressive images (blur placeholder), `fetchpriority`.
- **Accessibility:** semantic HTML, keyboard, focus management, `aria-live` for updates, reduced motion, contrast.
- **i18n:** `Intl` APIs, RTL, string externalisation, pluralisation.
- **Security:** XSS (escape, sanitize, CSP), CSRF (SameSite), auth tokens in httpOnly cookies, permission checks server-side, rate limiting.
- **Reliability:** error boundaries per widget, graceful degradation, retries, timeouts, feature flags, fallback UI.
- **Observability:** error tracking (Sentry), Web Vitals RUM, logging with correlation IDs, analytics events.
- **Architecture at scale:** monorepo, design system/component library, micro-frontends (Module Federation / single-spa) when many teams deploy independently, API layer abstraction, feature folder structure.
- **Testing:** unit, component (RTL), contract tests, E2E (Playwright), visual regression.

---

## Worked design 1 — Autocomplete / search typeahead (most common)
**Requirements:** suggestions as user types; works for 10M items on server; fast (< 100ms perceived); keyboard & screen-reader friendly; mobile; recent searches.

**Architecture:** `<Autocomplete>` (input + listbox) → `useSearch` hook → API client → `/search?q=&limit=10`. Client cache `Map<query, results>` (LRU, ~50 entries, TTL).

**Key decisions**
- Debounce 200–300ms; min 2 chars; **cancel** previous request (AbortController) or ignore stale responses (request id).
- Cache: query → results; also try prefix filtering of cached results client-side.
- Server returns ranked top-N; highlight matches on client.
- Render: limit to N; if huge lists, virtualize.
- A11y: `role="combobox"`, `aria-expanded`, `aria-activedescendant`, `role="listbox/option"`, announce result counts with `aria-live`.
- Edge cases: network error state, empty state, fast typing, IME composition (`compositionstart/end`), paste, very long text, XSS in result text (never inject HTML).
- Reference implementation: `code/machine-coding/src/components/Autocomplete`.

## Worked design 2 — Real-time IoT / operations dashboard (perfect for Siemens, Honeywell, Bosch, Schneider)
**Requirements:** show 50 widgets (charts, KPIs, alarms) for 1000s of devices; live updates every second; filter by plant/line; drill-down; works 8 hours open on a control-room screen; role-based widgets.

**Architecture**
```
[Widget grid] ← [Dashboard layout config (per user, saved)]
     ↑
[Selectors / derived data]  ← [Normalized store: devices byId, metrics ring buffers, alarms]
     ↑                                   ↑
[REST: initial snapshot + history]   [WebSocket/SSE: live deltas, subscribe per visible widget]
```
**Key decisions**
- Initial load via REST (snapshot), then **WebSocket** deltas; subscribe only to what is visible (topic per device group); unsubscribe when widget unmounts / tab hidden (`visibilitychange`).
- **Throttle rendering**: buffer incoming messages and flush with `requestAnimationFrame` or every 500ms; don't re-render on every message.
- Ring buffers for time series (fixed size) → memory stays flat for 8-hour sessions; check for leaks.
- Charts: canvas/WebGL for > ~5k points (SVG slows down); downsample on server (min/max per bucket).
- Each widget in its own **error boundary** + independent loading state; one failure doesn't kill the dashboard.
- Reconnect with exponential backoff + jitter; show "stale data" banner with last-updated time; resync snapshot after reconnect.
- Alarms: priority queue, sound/visual, acknowledgement with optimistic update; `aria-live="assertive"` for critical alarms.
- Layout: CSS grid + drag-to-arrange (react-grid-layout), persisted per user.
- Performance: virtualize long device tables; web worker for aggregations; memoized selectors.
- Security: RBAC from server; widgets the user can't access are never fetched.

## Worked design 3 — News feed / infinite timeline
- Cursor pagination (`?after=<id>&limit=20`) not offset (stable when new items arrive).
- Normalised cache `posts byId`; optimistic like/comment; "N new posts" banner rather than auto-inserting (keeps scroll position).
- IntersectionObserver sentinel to load more; virtualization (variable heights → measure with ResizeObserver); scroll restoration on back navigation.
- Media: lazy load images/videos, responsive `srcset`, pause offscreen videos.
- Prefetch next page when 70% scrolled.

## Worked design 4 — Chat application
- WebSocket for messages, typing indicators, presence; REST for history (paginated upward).
- Message states: `sending → sent → delivered → read`; client-generated temp ID for optimistic send; retry on failure; ordering by server timestamp/sequence.
- Offline outbox in IndexedDB; dedupe on reconnect.
- Virtualized message list anchored to bottom; "jump to latest".
- Security: sanitize message content, rate limiting, file upload scanning.

## Worked design 5 — Design system / component library (great for "migration" discussions)
- Tokens (color, spacing, typography) as CSS variables → theming & dark mode.
- Components: headless logic + styled layer; strong a11y defaults; TypeScript props; controlled/uncontrolled support.
- Distribution: npm package in a monorepo, semantic versioning, changelog, codemods for breaking changes.
- Docs: Storybook with a11y addon; visual regression tests (Chromatic/Playwright screenshots).
- Adoption during migration: build React versions matching the AngularJS look first, then evolve.

## Worked design 6 — Large form / multi-step wizard (enterprise configuration screens)
- Schema-driven (JSON schema/Zod) fields; React Hook Form for performance.
- Step state in URL (`?step=2`) + draft autosave (debounced) to server/localStorage.
- Validation: per field on blur, per step on next, full on submit; server errors mapped to fields.
- Conditional fields, dependent dropdowns (cancel stale fetches), unsaved-changes guard.

## Worked design 7 — File upload (large files)
- Chunked/resumable uploads (e.g. 5MB chunks), parallel with concurrency limit (see `promisePool`), retries per chunk, progress per file (`XMLHttpRequest.upload.onprogress` or chunk counts), pause/resume/cancel (AbortController), pre-signed URLs direct to storage, client-side validation (type/size), drag & drop.

## Worked design 8 — Micro-frontend migration platform (your story as a design)
- Shell app owns auth, routing, layout; AngularJS legacy and React apps as remotes (single-spa or Module Federation).
- Shared deps (React) as singletons; shared design tokens; event bus or shared store for cross-app communication; contract for navigation.
- Independent deploys per team; versioned remote entry; fallback if a remote fails to load.
- Trade-offs: complexity, bundle duplication, consistency vs team autonomy. For one team, a single repo with strangler migration is simpler.

---

## Practice prompts (do 1 per session, 45 min, draw on paper/Excalidraw)
1. Autocomplete · 2. IoT dashboard · 3. News feed · 4. Chat · 5. Google Docs-like editor (collaboration basics) · 6. E-commerce product listing + filters + cart · 7. Image carousel / photo gallery (lazy loading) · 8. Notification center · 9. Kanban (Jira board) with drag & drop + optimistic updates · 10. Video player page (YouTube) · 11. Spreadsheet/data grid with 100k rows · 12. Poll/voting widget embedded on third-party sites.

**Self-review after each:** Did I clarify requirements? Draw architecture? Define data model + API? Mention performance, a11y, security, error states? Give trade-offs?
