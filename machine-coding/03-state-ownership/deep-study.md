# State Ownership

## Why it matters
Classify local UI, URL, server, shared client, derived and persisted state. Keep one source of truth. Use reducers/state machines for explicit transitions and query caches for server state. Interview drill: place filters, selected row, fetched data and modal state correctly. Challenge: create a state ownership table.

## Completion contract
You must explain the design, implement it from a blank file, debug a broken version, cover failure/edge states, address accessibility and performance, and answer interviewer follow-ups.

## Follow-ups
- What happens with stale data or races?
- How would you test it?
- What changes at 10× data?
- What would you simplify if time were cut in half?

## Practical output
Commit the implementation or an architecture note and record one mistake you made.