# Realtime Systems

## Why it matters
Compare polling, SSE and WebSocket based on communication direction and reliability needs. Model connection state, reconnect backoff, heartbeat, ordering, deduplication, missed-event recovery and authorization. Interview drill: design realtime notifications without duplicates after reconnect. Challenge: implement a reconnecting stream state machine.

## Study contract
Explain the state machine, data flow, failure modes, accessibility/performance implications and trade-offs. Then change one constraint and redesign.

## Interview follow-ups
- What happens during race conditions?
- How do you recover after reconnect or refresh?
- What data is authoritative?
- How do you observe correctness in production?

## Practical output
Implement a focused prototype or write an ADR from the flagship project.