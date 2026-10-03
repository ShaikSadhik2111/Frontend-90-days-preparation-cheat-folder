# State Architecture

## Why it matters
Classify state before choosing a library: local UI, URL, server, shared client, derived and persisted/offline state. Define one source of truth and explicit ownership. Compare Context, reducers, external stores and query caches. Cover stale data, invalidation, optimistic updates, state machines and cross-tab synchronization. Interview drill: place filters, selected entity, permissions, fetched records and drafts into state categories and justify each choice. Challenge: create a state ownership table and transition diagram.

## Study contract
Explain the mental model, implement the core mechanism, identify failure modes, debug a broken version, discuss performance/security/accessibility implications, and handle a changed constraint.

## Interview follow-ups
- What changes at 10× scale?
- What becomes stale and who owns invalidation?
- What happens during partial failure or concurrency?
- What would you measure in production?

## Practical output
Write an ADR or working implementation from your project and record the trade-offs.