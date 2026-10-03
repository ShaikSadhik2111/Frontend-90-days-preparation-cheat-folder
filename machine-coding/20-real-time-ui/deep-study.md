# Real-Time UI

## Why it matters
Model connected, connecting, reconnecting, failed and disconnected states. Cover backoff, heartbeat, dedupe and event ordering. Choose polling/SSE/WebSocket based on needs. Challenge: build a reconnecting notification center without duplicate events.

## Completion contract
Implement the feature under a timer, then harden it for failure, accessibility, performance and testing. Be able to explain the state machine and trade-offs.

## Interview follow-ups
- What is the source of truth?
- What happens during a race or reconnect?
- How do you prevent duplicate work?
- What would you measure in production?

## Practical output
Solve once slowly, once timed, then once from a blank file after a gap.