# Constraints and Trade-offs

A senior answer states what is optimized and what is sacrificed.

Common pairs:
- freshness vs cacheability
- latency vs consistency
- simplicity vs independent deployment
- bundle size vs functionality
- optimistic UX vs rollback complexity
- virtualization vs accessibility/measurement complexity
- micro-frontends vs runtime complexity

Use: decision → reason → downside → mitigation → trigger for revisiting.

Practice: choose between polling and WebSocket for a notification center and defend the decision.