# Throttling

Throttling limits execution to at most a controlled frequency during a burst of calls.

Typical uses:
- Scroll handlers
- Pointer movement
- Resize
- Analytics events

## Concept
If calls arrive continuously, execute at most once per interval according to the chosen leading/trailing behavior.

## Debounce vs throttle
- Debounce: wait for inactivity.
- Throttle: limit frequency while activity continues.

## Interview concern
Define whether the first call, last call, or both should execute. That choice changes implementation behavior.
