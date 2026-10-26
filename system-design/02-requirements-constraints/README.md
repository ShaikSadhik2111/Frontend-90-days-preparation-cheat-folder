# 02 — Requirements & constraints

> The first 5–8 minutes decide the interview. Ask, write down, prioritise, and confirm scope.

## Functional requirements (what users do)
"Users can search devices by name, see live status, filter by plant, acknowledge alarms." Keep to 3–5 core flows; park the rest as "out of scope / later".

## Non-functional requirements — question checklist
| Area | Ask |
|---|---|
| Users & scale | How many users? Concurrent? How much data per screen (rows, points, items)? |
| Devices | Desktop only? Mobile/tablet? Factory-floor PCs (low CPU)? Touch? |
| Network | Slow/unstable connections? Offline needed? |
| Freshness | Real-time? How stale can data be (seconds/minutes)? |
| Performance | Targets (LCP < 2.5 s, interaction < 200 ms)? |
| SEO | Public pages (needs SSR/SSG) or behind login? |
| Accessibility | WCAG AA required? Keyboard-only users? |
| i18n | Languages, RTL, time zones, units (metric/imperial)? |
| Security | Auth method, roles/permissions, sensitive data, audit logs? |
| Browsers | Evergreen only? Any legacy (old Edge/IE)? |
| Team | One team or many (micro-frontends?), existing stack/design system? |

## Turning answers into decisions
- "Behind login, desktop, 8-hour sessions" → CSR SPA is fine; focus on memory, real-time, resilience.
- "Public, SEO matters" → SSR/SSG (Next.js), image optimisation, Core Web Vitals.
- "Unstable network on shop floor" → caching, retries, offline queue, clear stale indicators.
- "10 teams" → module boundaries, design system, maybe micro-frontends.

## Interview phrasing
"Before I design, let me confirm scope: … I'll assume X and Y — tell me if that's wrong. I'll focus on flows A and B and mention C at the end."

Next → [03 Estimation](../03-estimation/README.md)
