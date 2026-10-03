# Optimistic UI

## Why it matters
Capture previous state, assign mutation identity, update immediately, reconcile with server response and rollback on failure. Handle duplicate submits and concurrent mutations. Challenge: implement optimistic task updates with rollback.

## Completion contract
Implement the feature under a timer, then harden it for failure, accessibility, performance and testing. Be able to explain the state machine and trade-offs.

## Interview follow-ups
- What is the source of truth?
- What happens during a race or reconnect?
- How do you prevent duplicate work?
- What would you measure in production?

## Practical output
Solve once slowly, once timed, then once from a blank file after a gap.