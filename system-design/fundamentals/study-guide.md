# System Design Fundamentals

Functional requirements describe behavior; non-functional requirements describe latency, availability, consistency, accessibility, security, scalability, observability and maintainability.

Before architecture ask: users, devices, auth, concurrent users, data volume, payload size, freshness, real-time needs, offline needs and team/deployment boundaries.

Scale example: 100k daily users × 5 opens = 500k sessions/day. At 8 requests/session that is 4M requests/day, about 46 requests/sec average before peak factors. Explain assumptions instead of pretending estimates are exact.

Client owns interaction, rendering, local UI state and cache coordination. Server owns authorization, durable data, business rules and cross-user consistency. Browser is never the security authority.

Quality trade-offs include latency vs freshness, consistency vs availability, simplicity vs independent deployment and bundle size vs feature richness.

Interview drill: design an order dashboard. Clarify users and volume, choose URL state for filters, server pagination, query caching, explicit loading/error states, authorization and observability.

Common mistake: choosing Redux, WebSockets or micro-frontends before requirements.

Challenge: pick a product screen and document requirements, NFRs, scale, state owners, APIs and failure modes.