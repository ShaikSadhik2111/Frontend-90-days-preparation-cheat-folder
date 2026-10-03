# Search Autocomplete

## Why it matters
Combine keyboard navigation, debounce, cancellation, stale-response protection, cache, loading/error/empty states and accessible combobox semantics. Challenge: implement from blank in 45–60 minutes, then add a race-condition test.

## Completion contract
Implement the feature under a timer, then harden it for failure, accessibility, performance and testing. Be able to explain the state machine and trade-offs.

## Interview follow-ups
- What is the source of truth?
- What happens during a race or reconnect?
- How do you prevent duplicate work?
- What would you measure in production?

## Practical output
Solve once slowly, once timed, then once from a blank file after a gap.