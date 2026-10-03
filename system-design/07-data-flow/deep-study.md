# Data Flow

## Why it matters
Trace user intent → event → state transition → request → response → cache update → render. Separate commands from derived display data. Look for feedback loops, duplicated state, hidden mutation and stale snapshots. Explain selectors, normalization, optimistic updates and reconciliation. Interview drill: debug a stale dashboard by tracing every boundary. Challenge: draw one complete critical path and identify loading, error and cancellation ownership.

## Study contract
Explain the mental model, implement the core mechanism, identify failure modes, debug a broken version, discuss performance/security/accessibility implications, and handle a changed constraint.

## Interview follow-ups
- What changes at 10× scale?
- What becomes stale and who owns invalidation?
- What happens during partial failure or concurrency?
- What would you measure in production?

## Practical output
Write an ADR or working implementation from your project and record the trade-offs.