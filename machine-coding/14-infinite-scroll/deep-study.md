# Infinite Scroll

## Why it matters
Combine IntersectionObserver, pagination, dedupe and accessibility. Prevent duplicate requests and define a terminal state. Consider back navigation, URL state and virtualization. Challenge: implement infinite scroll with cancellation and retry.

## Completion contract
Build a vertical slice, then add loading/empty/error states, edge cases, accessibility, performance and tests. Explain every important state transition aloud.

## Interview follow-ups
- What changes at 10× data?
- What happens if requests finish out of order?
- Which work belongs in the browser versus server?
- How would you test the failure mode?

## Practical output
Timebox the exercise, commit it, then record the bottleneck and trade-off.