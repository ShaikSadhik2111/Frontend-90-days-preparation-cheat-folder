# Virtualization

## Why it matters
Render only the visible window plus overscan. Understand fixed/variable item measurement, scroll anchoring, recycling and accessibility implications. Explain why pagination does not automatically solve DOM cost. Challenge: implement fixed-height virtualization, profile it, then discuss variable-height extensions.

## Completion contract
Implement the feature under a timer, then harden it for failure, accessibility, performance and testing. Be able to explain the state machine and trade-offs.

## Interview follow-ups
- What is the source of truth?
- What happens during a race or reconnect?
- How do you prevent duplicate work?
- What would you measure in production?

## Practical output
Solve once slowly, once timed, then once from a blank file after a gap.