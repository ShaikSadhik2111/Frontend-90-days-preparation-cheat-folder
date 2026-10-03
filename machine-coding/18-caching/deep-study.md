# Client Caching

## Why it matters
Define cache key, value, freshness, eviction and invalidation. Compare memory cache, query cache and persistent cache. Avoid incomplete keys and stale permission data. Challenge: implement a small TTL cache and integrate it with a search flow.

## Completion contract
Implement the feature under a timer, then harden it for failure, accessibility, performance and testing. Be able to explain the state machine and trade-offs.

## Interview follow-ups
- What is the source of truth?
- What happens during a race or reconnect?
- How do you prevent duplicate work?
- What would you measure in production?

## Practical output
Solve once slowly, once timed, then once from a blank file after a gap.