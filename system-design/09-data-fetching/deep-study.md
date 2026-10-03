# Data Fetching

## Why it matters
Model idle, loading, success, empty, error, refreshing and retrying states. Add cancellation, timeout, retry policy, deduplication and stale-response protection. Separate server state from UI state. Discuss query keys, invalidation, dependent queries, parallel fetching and waterfall avoidance. Interview drill: filter changes while a request is in flight. Challenge: document a dashboard fetch lifecycle.

## Study contract
Explain the mental model, implement the core mechanism, identify failure modes, debug a broken version, discuss performance/security/accessibility implications, and handle a changed constraint.

## Interview follow-ups
- What changes at 10× scale?
- What becomes stale and who owns invalidation?
- What happens during partial failure or concurrency?
- What would you measure in production?

## Practical output
Write an ADR or working implementation from your project and record the trade-offs.