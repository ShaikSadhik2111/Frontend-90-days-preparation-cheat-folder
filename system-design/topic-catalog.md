# Frontend System Design — Complete Topic Catalog

Use this as the coverage checklist. Each topic should be explainable with what/why/how, an architecture, failure modes, performance/security implications and trade-offs.

## A. Requirements and interview method
- functional vs non-functional requirements
- user journeys and primary flows
- assumptions and constraints
- scale estimation
- read/write ratio
- latency/freshness/availability targets
- consistency requirements
- browser/device support
- SEO requirements
- accessibility requirements
- privacy/compliance constraints
- interview communication and trade-off narration

## B. Rendering and application architecture
- SPA
- CSR
- SSR
- SSG
- revalidation/ISR
- streaming SSR
- Server Components
- hydration
- partial hydration/islands
- progressive enhancement
- route-level architecture
- feature-based architecture
- layered architecture
- modular monolith
- micro-frontends
- module federation
- dependency direction
- monorepo vs polyrepo
- package boundaries
- shared libraries
- BFF
- API gateway
- backend aggregation

## C. State architecture
- local UI state
- derived state
- form state
- URL state
- server state
- cache state
- session/auth state
- shared client state
- normalized state
- state machines
- optimistic state
- undo/redo state
- persisted state
- external stores
- cross-tab state
- state synchronization
- conflict resolution

## D. API and data
- REST
- GraphQL
- API contracts
- DTO mapping
- pagination
- cursor pagination
- filtering
- sorting
- search
- autocomplete
- batching
- request deduplication
- cancellation
- stale-response protection
- retries
- exponential backoff
- idempotency
- optimistic mutations
- polling
- SSE
- WebSockets
- subscriptions
- API versioning
- partial responses
- error envelopes
- rate limiting
- client-side validation vs server validation

## E. Caching and delivery
- browser cache
- HTTP cache
- CDN
- edge caching
- cache-control
- ETag/conditional requests
- application/query cache
- stale-while-revalidate
- cache keys
- invalidation
- cache warming
- request coalescing
- cache stampede
- prefetching
- preloading
- immutable assets
- service workers
- offline cache

## F. Performance
- Core Web Vitals
- navigation performance
- network waterfalls
- bundle analysis
- code splitting
- lazy loading
- prefetching
- tree shaking
- image optimization
- font optimization
- rendering cost
- layout/paint/composite
- virtualization
- memoization
- worker offloading
- long tasks
- memory pressure
- third-party scripts
- performance budgets
- RUM
- profiling

## G. Security
- trust boundaries
- XSS
- CSRF
- CORS
- CSP
- Trusted Types
- clickjacking
- token/session handling
- cookie security
- authorization
- tenant isolation
- secrets management
- dependency/supply-chain security
- content/file upload security
- signed URLs
- secure downloads
- rate limiting
- abuse prevention
- threat modeling
- security observability

## H. Reliability
- timeout
- retry
- backoff/jitter
- circuit/fallback thinking
- partial failure
- error boundaries
- offline state
- stale data
- conflict handling
- duplicate mutation
- idempotency
- reconnect
- event ordering
- backpressure
- graceful degradation
- feature isolation
- disaster/rollback strategy

## I. Product-scale frontend architecture
- multi-team ownership
- design systems
- tokens
- component contracts
- accessibility governance
- feature flags
- experimentation/A-B testing
- analytics events
- release strategy
- CI/CD
- canary/progressive delivery
- rollback
- observability
- source maps
- release health
- dependency governance

## J. Specialized systems
- dashboard
- data grid
- search
- autocomplete
- infinite feed
- social feed
- chat
- notification center
- collaborative editor
- file upload
- file processing
- video player
- image gallery
- map UI
- checkout
- payment UI
- e-commerce catalog
- cart
- large forms
- admin console
- analytics
- offline field app
- calendar
- scheduling
- drag/drop
- kanban
- command palette
- media upload
- document viewer
- export/reporting

## K. Senior follow-ups
For every design ask:
1. What breaks at 10× traffic?
2. What if the API is slow?
3. What if it is offline?
4. What if data is stale?
5. What if two users edit simultaneously?
6. What if one dependency fails?
7. What is cached and why?
8. What is the consistency model?
9. What is the security boundary?
10. How do you observe regressions?
11. How do teams deploy independently?
12. What would you simplify for a small team?
