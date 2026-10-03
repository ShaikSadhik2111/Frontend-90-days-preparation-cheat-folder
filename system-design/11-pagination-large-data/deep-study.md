# Pagination and Large Data

## Why it matters
Compare offset and cursor pagination, infinite scroll and virtualization. Define stable sorting, duplicate/missing records, prefetching, cancellation and end-of-data behavior. Separate network volume from DOM/rendering volume. Interview drill: design a 1M-row dashboard. Challenge: implement pagination plus virtualization and explain why both may be needed.

## Study contract
Explain the state machine, data flow, failure modes, accessibility/performance implications and trade-offs. Then change one constraint and redesign.

## Interview follow-ups
- What happens during race conditions?
- How do you recover after reconnect or refresh?
- What data is authoritative?
- How do you observe correctness in production?

## Practical output
Implement a focused prototype or write an ADR from the flagship project.