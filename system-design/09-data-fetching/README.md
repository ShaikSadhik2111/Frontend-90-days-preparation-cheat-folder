# Data Fetching Architecture

## Why this matters
Design request lifecycles, not isolated calls.

## Core mental model
Model idle/loading/success/empty/error/revalidating states. Add cancellation, timeout, retry policy, deduplication, stale-response protection and request identity.

## Production reasoning
Separate server state from UI state. Discuss query keys, invalidation, dependent queries and parallel fetching. Consider waterfall avoidance and progressive rendering.

## Example / implementation focus
Example: dashboard loads independent cards concurrently while showing partial success instead of blocking the whole page.

## Interview drill
Interview drill: explain what happens when the user navigates away during a request.

## Practical challenge
Production challenge: document fetch lifecycle and failure states.

## Completion contract
You are not finished when you can repeat the definition. You are finished when you can **explain the decision, implement the core behavior, identify failure modes, debug a broken version, discuss accessibility/security/performance implications, and handle a changed constraint**.

## Connection to next stage
Use what you learned here as an input to the next numbered stage rather than treating this chapter as an isolated topic.
