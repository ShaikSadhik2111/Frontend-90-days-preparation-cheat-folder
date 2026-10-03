# API Integration

## Why it matters
Create an API boundary that handles typing, runtime validation, HTTP errors, network errors, cancellation, retries and observability. Keep UI code focused on intent. Challenge: implement a typed adapter and normalize errors into domain states.

## Completion contract
Build a vertical slice, then add loading/empty/error states, edge cases, accessibility, performance and tests. Explain every important state transition aloud.

## Interview follow-ups
- What changes at 10× data?
- What happens if requests finish out of order?
- Which work belongs in the browser versus server?
- How would you test the failure mode?

## Practical output
Timebox the exercise, commit it, then record the bottleneck and trade-off.