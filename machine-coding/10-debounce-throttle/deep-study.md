# Debounce and Throttle

## Why it matters
Understand leading/trailing behavior, cancellation, flush, timer cleanup and lifecycle. Use debounce for bursty input and throttle for bounded-rate events. Interview drill: implement both without a library. Challenge: write tests for timing edge cases.

## Completion contract
Implement the behavior from a blank file, explain the state model, cover edge cases, test failure paths and justify the API.

## Interview follow-ups
- How does this fail under concurrency?
- What is the accessibility contract?
- What is the performance bottleneck?
- How would you change it for a different requirement?

## Practical output
Add the implementation to the project or solve it as a standalone timed exercise.