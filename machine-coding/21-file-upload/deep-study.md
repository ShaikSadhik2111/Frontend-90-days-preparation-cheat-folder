# File Upload

## Why it matters
Cover validation, previews, progress, cancellation, retry, concurrency limits, chunking, resumability and object URL cleanup. Large uploads should not require holding the whole file in memory. Challenge: implement multi-file upload with progress and cancellation, then design resumable uploads.

## Completion contract
Start with requirements and a component/state model. Build the vertical slice, then harden states, accessibility, performance, tests and concurrency.

## Interview follow-ups
- What fails first at 10× usage?
- Which state transitions are dangerous?
- How do you recover from partial failure?
- What would you simplify under a shorter timebox?

## Practical output
Record the timed implementation, mistakes, bottlenecks and trade-offs.