# Async UI

## Why it matters
Model loading, cancellation, stale response protection, deduplication, retries and timeouts. Distinguish debounce, throttle, cancellation and stale-result protection. Interview drill: explain why debounce alone cannot fix races. Challenge: build a cancellable autocomplete.

## Completion contract
Implement the behavior from a blank file, explain the state model, cover edge cases, test failure paths and justify the API.

## Interview follow-ups
- How does this fail under concurrency?
- What is the accessibility contract?
- What is the performance bottleneck?
- How would you change it for a different requirement?

## Practical output
Add the implementation to the project or solve it as a standalone timed exercise.