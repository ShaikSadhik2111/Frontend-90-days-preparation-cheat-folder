# Dashboard System Design

Design independently loaded widgets with shared filters.

Key decisions:
- URL state for filters/date range
- query cache for server state
- widget-level loading/error/empty
- server-side aggregation for expensive analytics
- lazy loading non-critical charts
- virtualization for large tables
- async exports.

Follow-ups: real-time refresh, tenant isolation, export jobs, role-based widgets, 10× traffic.

Practice: design an analytics dashboard with 12 widgets and 1M daily events.