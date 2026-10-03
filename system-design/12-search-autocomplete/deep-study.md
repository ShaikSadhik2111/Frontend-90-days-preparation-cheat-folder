# Search and Autocomplete

## Why it matters
Model input → normalization → debounce → request → cancellation/stale protection → ranking → render. Cover keyboard navigation, accessibility, cache keys, local vs server search and request deduplication. Interview drill: explain debounce versus throttle versus cancellation. Challenge: design autocomplete that remains correct when responses arrive out of order.

## Study contract
Explain the state machine, data flow, failure modes, accessibility/performance implications and trade-offs. Then change one constraint and redesign.

## Interview follow-ups
- What happens during race conditions?
- How do you recover after reconnect or refresh?
- What data is authoritative?
- How do you observe correctness in production?

## Practical output
Implement a focused prototype or write an ADR from the flagship project.