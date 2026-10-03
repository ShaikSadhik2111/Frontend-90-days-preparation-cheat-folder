# Cancellation and Race Conditions

## Why it matters
Treat concurrency as correctness. Use request identity, sequence numbers, AbortSignal and explicit state transitions. Cancellation saves work; stale-response protection preserves correctness even when cancellation cannot stop a response. Challenge: build a race harness where request A resolves after request B and verify B remains authoritative.

## Completion contract
Build a vertical slice, then add loading/empty/error states, edge cases, accessibility, performance and tests. Explain every important state transition aloud.

## Interview follow-ups
- What changes at 10× data?
- What happens if requests finish out of order?
- Which work belongs in the browser versus server?
- How would you test the failure mode?

## Practical output
Timebox the exercise, commit it, then record the bottleneck and trade-off.