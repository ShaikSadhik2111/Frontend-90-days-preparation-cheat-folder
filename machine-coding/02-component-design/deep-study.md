# Component Design

## Why it matters
Design around responsibility and stable contracts. Separate primitives, composites, feature components and page composition. Define props, callbacks, controlled/uncontrolled behavior and ownership. Avoid prop explosions and meaningless wrappers. Interview drill: refactor a large component without over-fragmenting it. Challenge: write the component API before implementation.

## Completion contract
You must explain the design, implement it from a blank file, debug a broken version, cover failure/edge states, address accessibility and performance, and answer interviewer follow-ups.

## Follow-ups
- What happens with stale data or races?
- How would you test it?
- What changes at 10× data?
- What would you simplify if time were cut in half?

## Practical output
Commit the implementation or an architecture note and record one mistake you made.