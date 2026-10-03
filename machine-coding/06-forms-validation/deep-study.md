# Forms and Validation

## Why it matters
Cover controlled/uncontrolled trade-offs, field/form validation, async validation, dirty/touched state, server errors, accessibility and submission cancellation. Client validation improves UX but is not a security boundary. Interview drill: design a multi-step form with recoverable errors. Challenge: implement loading, server-error and retry states.

## Completion contract
Implement the behavior from a blank file, explain the state model, cover edge cases, test failure paths and justify the API.

## Interview follow-ups
- How does this fail under concurrency?
- What is the accessibility contract?
- What is the performance bottleneck?
- How would you change it for a different requirement?

## Practical output
Add the implementation to the project or solve it as a standalone timed exercise.