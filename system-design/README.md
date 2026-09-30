# Frontend System Design — Study Track

Sequence: Requirements → Constraints → Scale → Architecture → State ownership → API/data flow → Caching → Reliability → Performance → Security → Accessibility → Observability → Deployment → Trade-offs → Case studies.

For every design answer: clarify users and flows; separate functional/NFR requirements; estimate scale; define browser/server boundaries; choose rendering/deployment; define module and state boundaries; design APIs; define caching and invalidation; handle loading/empty/error/retry/cancellation/stale data; review performance/security/accessibility; add observability; explain trade-offs.

Study guides: fundamentals, architecture, state-management, api-data, api-contracts, caching, performance, security, scalability, real-time-applications, micro-frontends, design-systems, file-processing-systems, large-form-design, search-filter-systems, reliability-failure-modes, observability, real-world-designs, interview-questions.

Core mental model: a frontend is a distributed client coordinating UI state, server state, browser APIs, network failures, auth, rendering and multiple teams. Do not memorize diagrams; explain why each boundary exists and what changes at 10× scale.