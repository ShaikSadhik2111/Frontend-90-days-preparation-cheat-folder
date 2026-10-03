# Pagination

## Why it matters
Compare page and cursor pagination. Handle stable ordering, duplicate/missing records, end-of-list, retry and incremental loading. Challenge: implement cursor pagination with preserved prior data and explicit loading-next-page state.

## Completion contract
Build a vertical slice, then add loading/empty/error states, edge cases, accessibility, performance and tests. Explain every important state transition aloud.

## Interview follow-ups
- What changes at 10× data?
- What happens if requests finish out of order?
- Which work belongs in the browser versus server?
- How would you test the failure mode?

## Practical output
Timebox the exercise, commit it, then record the bottleneck and trade-off.