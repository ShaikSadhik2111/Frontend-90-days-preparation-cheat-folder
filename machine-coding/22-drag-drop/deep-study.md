# Drag and Drop

## Why it matters
Model source, target, preview, reorder and cancellation. Provide keyboard/button alternatives. Keep DOM drag events separate from business state. Challenge: implement Kanban reorder with optimistic UI and rollback.

## Completion contract
Start with requirements and a component/state model. Build the vertical slice, then harden states, accessibility, performance, tests and concurrency.

## Interview follow-ups
- What fails first at 10× usage?
- Which state transitions are dangerous?
- How do you recover from partial failure?
- What would you simplify under a shorter timebox?

## Practical output
Record the timed implementation, mistakes, bottlenecks and trade-offs.