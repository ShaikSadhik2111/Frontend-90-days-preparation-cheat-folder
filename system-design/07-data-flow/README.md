# Data Flow and Unidirectional Architecture

## Why this matters
Make information movement predictable and debuggable.

## Core mental model
Trace user intent → event → state transition → request → response → cache update → render. Identify ownership at every arrow and prevent accidental feedback loops.

## Production reasoning
Cover derived data, selectors, normalization when justified, optimistic updates, invalidation and stale data. Distinguish command paths from data-display paths.

## Example / implementation focus
Example: editing a task should produce one mutation command, then reconcile cache/state with the server response.

## Interview drill
Interview drill: trace a stale UI bug from click to rendered state.

## Practical challenge
Production challenge: draw one complete request/data lifecycle.

## Completion contract
You are not finished when you can repeat the definition. You are finished when you can **explain the decision, implement the core behavior, identify failure modes, debug a broken version, discuss accessibility/security/performance implications, and handle a changed constraint**.

## Connection to next stage
Use what you learned here as an input to the next numbered stage rather than treating this chapter as an isolated topic.
