# Caching

## Why it matters
Treat caching as a correctness decision. Define cache key, freshness, TTL, invalidation trigger and stale behavior. Compare browser HTTP cache, CDN, query cache, memory and persistent storage. Cover Cache-Control, ETag, stale-while-revalidate, deduplication and optimistic cache updates. Interview drill: design product caching and mutation invalidation. Challenge: create a cache-policy table.

## Study contract
Explain the mental model, implement the core mechanism, identify failure modes, debug a broken version, discuss performance/security/accessibility implications, and handle a changed constraint.

## Interview follow-ups
- What changes at 10× scale?
- What becomes stale and who owns invalidation?
- What happens during partial failure or concurrency?
- What would you measure in production?

## Practical output
Write an ADR or working implementation from your project and record the trade-offs.