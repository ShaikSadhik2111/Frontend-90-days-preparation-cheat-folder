# System Design Interview Questions

Fundamentals: requirements? scale estimates? SPA vs SSR vs SSG? client/server boundary? scalability?

State/data: Context? Redux/Zustand vs server-state cache? URL state? cursor vs offset? request races? retries? API errors?

Caching: correct cache key? invalidation? stale-while-revalidate? request deduplication? cache stampede?

Performance: why slow if APIs are fast? 50k rows? memoization? network waterfalls? LCP/INP/CLS?

Security: CORS vs CSRF? localStorage token risk? CSP? server authorization? file-upload threat model?

Architecture: micro-frontends? shared dependencies? design-system governance? failure isolation? feature flags?

Real-time: polling vs SSE vs WebSocket? reconnect? event ordering? deduplication? multiple tabs?

Follow-up every design with: What happens at 10× traffic? Offline? Slow APIs? Stale data? Concurrent edits? Observability? Security? What would you simplify for a small team?