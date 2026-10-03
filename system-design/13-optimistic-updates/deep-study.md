# Optimistic Updates

## Why it matters
Model optimistic state, mutation identity, rollback and server reconciliation. Decide which operations can be optimistic. Cover duplicate clicks, retries, conflicts and idempotency. Interview drill: two mutations complete out of order. Challenge: implement optimistic status change with rollback and authoritative reconciliation.

## Study contract
Explain the state machine, data flow, failure modes, accessibility/performance implications and trade-offs. Then change one constraint and redesign.

## Interview follow-ups
- What happens during race conditions?
- How do you recover after reconnect or refresh?
- What data is authoritative?
- How do you observe correctness in production?

## Practical output
Implement a focused prototype or write an ADR from the flagship project.