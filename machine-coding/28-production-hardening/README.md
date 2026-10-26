# 28 — Production hardening (what to mention in the wrap-up)

"If this were going to production, I'd add…"
- **Types & validation**: strict TS, runtime validation of API data (Zod).
- **Error handling**: error boundary, retry, user-friendly messages, logging to Sentry.
- **Data layer**: TanStack Query for caching/dedupe/retries instead of hand-written effects.
- **Accessibility audit**: axe + keyboard + screen reader.
- **i18n**: extract strings, `Intl` for dates/numbers, RTL.
- **Performance**: virtualization for big lists, code-splitting, memoization where profiled.
- **Security**: sanitise any HTML, no secrets, CSRF/auth handled by API client.
- **Tests**: unit for logic, RTL for behaviour, one E2E for the main flow.
- **Design system** components instead of ad-hoc styles; responsive layout.
- **Observability**: analytics events, Web Vitals.
- **Feature flag** for safe rollout.

Next → [29 Flagship problems](../29-flagship-problems/README.md)
