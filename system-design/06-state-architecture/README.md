# State Architecture

## Why this matters
Make state placement an explicit design decision.

## Core mental model
Classify state as local UI state, URL state, server state, shared client state, derived state or persisted/offline state. Each category has different ownership and invalidation rules.

## Production reasoning
Discuss reducers/state machines, Context, external stores, query caches and URL synchronization. Avoid duplicating server state in multiple stores unless synchronization is deliberate.

## Example / implementation focus
Example: filters belong in URL state; fetched orders belong in server-state cache; modal visibility is local UI state.

## Interview drill
Interview drill: justify where five pieces of state belong.

## Practical challenge
Production challenge: create a state ownership map for the project.

## Completion contract
You are not finished when you can repeat the definition. You are finished when you can **explain the decision, implement the core behavior, identify failure modes, debug a broken version, discuss accessibility/security/performance implications, and handle a changed constraint**.

## Connection to next stage
Use what you learned here as an input to the next numbered stage rather than treating this chapter as an isolated topic.
