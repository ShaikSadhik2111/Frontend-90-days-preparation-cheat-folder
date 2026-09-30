# Frontend Observability

Logs capture discrete events. Metrics measure latency, errors, Web Vitals and feature behavior. Traces connect a user action across frontend/backend when correlation IDs are available.

Measure journeys such as search submitted → API latency → results rendered → selection.

Useful error context: error type, route, release version, browser, feature context and correlation ID. Avoid secrets and unnecessary personal data.

Release health should compare client errors and performance by release. Feature flags can isolate regressions.

Debugging conversion drop: verify business metric → inspect client errors → inspect API failures → inspect latency → segment by release/browser/route → correlate traces → reproduce.

Challenge: define an observability dashboard for search, order editing and file upload.