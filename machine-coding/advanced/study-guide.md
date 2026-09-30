# Advanced Machine Coding — Concurrency

Cancellation: AbortController can stop obsolete fetch work. It does not alone guarantee stale promises cannot commit state.

Stale response protection: attach request identity and commit only if the response still belongs to the active request.

Invariant: an obsolete response must never overwrite current visible results.

Retry: transient failures only, bounded attempts and delays; never create an uncontrolled retry loop.

Request deduplication: identical concurrent queries can share one in-flight promise.

Optimistic UI: pending → optimistic → confirmed, or optimistic → rollback. Define rollback data before implementing.

Cache keys must include every result-affecting input.

Concurrency challenge: A starts, B starts, B returns, A returns. Only B remains visible. Then add cancellation and caching.

Performance challenge: render 100k records, measure before/after virtualization and explain DOM, memory and accessibility trade-offs.

For complex widgets prefer explicit states such as idle | loading | success | error | saving | saved over contradictory booleans.