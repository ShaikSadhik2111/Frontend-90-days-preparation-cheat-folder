# Undo and Redo

## Why it matters
Use reversible commands or bounded snapshots. Decide grouping semantics and memory limits. Async/server mutations need special reconciliation. Challenge: implement local undo/redo and explain which actions should be grouped.

## Completion contract
Start with requirements and a component/state model. Build the vertical slice, then harden states, accessibility, performance, tests and concurrency.

## Interview follow-ups
- What fails first at 10× usage?
- Which state transitions are dangerous?
- How do you recover from partial failure?
- What would you simplify under a shorter timebox?

## Practical output
Record the timed implementation, mistakes, bottlenecks and trade-offs.