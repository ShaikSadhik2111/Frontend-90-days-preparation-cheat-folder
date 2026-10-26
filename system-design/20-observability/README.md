# 20 — Observability (frontend)

> You can't fix what you can't see. Production frontends need **errors, performance, and product analytics**.

## Three signals
1. **Errors** — Sentry/Datadog/New Relic: unhandled errors, rejected promises, error-boundary catches, failed requests; **source maps** uploaded privately; breadcrumbs (route changes, clicks, requests); release & user/tenant tags; PII scrubbing.
2. **Performance (RUM)** — Core Web Vitals via `web-vitals` (with attribution: which element/interaction), custom marks (`performance.mark("devices-table-ready")`), API latency from the client's view, long tasks, memory in long sessions.
3. **Product analytics** — key funnels and feature usage (with consent), searches with no results, error rates per feature.

## Practices
- Correlation id header per request (`X-Request-Id`) → trace frontend errors to backend logs.
- Log levels and sampling (don't send every debug log from 10k clients).
- Dashboards + alerts (error-rate spike after release → roll back / disable flag).
- Session replay tools for UX debugging (mask inputs, respect privacy laws/GDPR).
- Health of real-time: reconnect counts, message lag.

## Interview phrasing
"I'd ship errors to Sentry with source maps and release tags, send Web Vitals to our analytics, add custom timing for the main flow, and alert on error-rate or INP regressions per release."

Next → [21 Deployment & scalability](../21-deployment-scalability/README.md)
