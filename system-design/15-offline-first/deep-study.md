# Offline-First

## Why it matters
Define whether offline support means cached reads, queued writes or full offline editing. Combine Service Worker, Cache Storage and IndexedDB with a sync queue and explicit conflict policy. Cover idempotency, stale indicators and recovery. Interview drill: two devices edit the same record offline. Challenge: document a conflict strategy and offline write lifecycle.

## Study contract
Explain the state machine, data flow, failure modes, accessibility/performance implications and trade-offs. Then change one constraint and redesign.

## Interview follow-ups
- What happens during race conditions?
- How do you recover after reconnect or refresh?
- What data is authoritative?
- How do you observe correctness in production?

## Practical output
Implement a focused prototype or write an ADR from the flagship project.