# 01 — Frontend system design fundamentals

> A frontend system design round (45–60 min) tests whether you can design a **client application** end to end: requirements, architecture, data model, API, and the non-functional qualities (performance, reliability, a11y, security). It is about **structured thinking and trade-offs**, not naming every library.

## Frontend vs backend system design
| Backend SD | Frontend SD |
|---|---|
| Databases, sharding, queues, load balancers | Component architecture, state, rendering strategy |
| Throughput, consistency | Perceived performance, responsiveness, offline, a11y |
| Server APIs internally | API **contract between client and server** |

## The RADIO framework (use it every time)
1. **R**equirements — functional + non-functional; agree on scope (5–8 min).
2. **A**rchitecture — boxes: views, state/store, data layer, cache, server, real-time channel (8–10 min).
3. **D**ata model — entities and client state shape (5–8 min).
4. **I**nterface — API endpoints/events + key component props (5–8 min).
5. **O**ptimisations — performance, network, a11y, security, reliability, observability, testing (15 min).
Finish with **trade-offs** and "what I'd do next".

## What makes an answer senior
- Asks clarifying questions before drawing.
- States assumptions with numbers ("~10k devices, 1 update/s each").
- Names trade-offs explicitly ("cursor pagination: stable but no jump-to-page").
- Covers failure modes: slow network, partial failure, offline, concurrent edits, stale data.
- Mentions a11y, i18n, security, and observability without being asked.
- Connects to real experience ("in our Bosch app we had a similar problem…").

## Common prompts
Autocomplete · news feed · chat · IoT/operations dashboard · Kanban · data grid with 100k rows · file upload · e-commerce listing + cart · notification center · Google Docs-like editor · photo gallery · video player page · design system · micro-frontend platform.
Worked answers: [27 — Worked designs](../27-worked-designs/README.md).

Next → [02 Requirements & constraints](../02-requirements-constraints/README.md)
