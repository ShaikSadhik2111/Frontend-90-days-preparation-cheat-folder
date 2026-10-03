# UI States

## Why it matters
Treat UI as a state machine. Cover idle, loading, success, empty, error, retrying, refreshing, disabled, unauthorized and partial success. Avoid impossible combinations with explicit state models. Interview drill: enumerate all states for a search page. Challenge: implement states before styling.

## Completion contract
You must explain the design, implement it from a blank file, debug a broken version, cover failure/edge states, address accessibility and performance, and answer interviewer follow-ups.

## Follow-ups
- What happens with stale data or races?
- How would you test it?
- What changes at 10× data?
- What would you simplify if time were cut in half?

## Practical output
Commit the implementation or an architecture note and record one mistake you made.