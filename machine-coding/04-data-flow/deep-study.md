# Data Flow

## Why it matters
Trace event → state transition → request → response → cache/state update → render. Avoid hidden mutation, duplicated sources of truth and synchronization loops. Interview drill: debug a stale child component. Challenge: draw the critical data-flow path before coding.

## Completion contract
You must explain the design, implement it from a blank file, debug a broken version, cover failure/edge states, address accessibility and performance, and answer interviewer follow-ups.

## Follow-ups
- What happens with stale data or races?
- How would you test it?
- What changes at 10× data?
- What would you simplify if time were cut in half?

## Practical output
Commit the implementation or an architecture note and record one mistake you made.