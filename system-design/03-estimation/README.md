# Estimation and Capacity Planning

## Why this matters
Quantify architecture decisions instead of saying 'it should scale'.

## Core mental model
Estimate users, requests/sec, payload sizes, cacheability, storage growth, concurrent connections and browser memory. Use order-of-magnitude arithmetic; state assumptions explicitly.

## Production reasoning
Frontend-specific estimates include DOM node counts, list sizes, bundle sizes, image weight, main-thread work and realtime message rates. Distinguish peak from average.

## Example / implementation focus
Example: 50k rows should not imply 50k rendered DOM nodes; virtualization changes the client-side cost model.

## Interview drill
Interview drill: estimate traffic and browser rendering cost for a 1M-record admin dashboard.

## Practical challenge
Production challenge: add a capacity section to the project ADR.

## Completion contract
You are not finished when you can repeat the definition. You are finished when you can **explain the decision, implement the core behavior, identify failure modes, debug a broken version, discuss accessibility/security/performance implications, and handle a changed constraint**.

## Connection to next stage
Use what you learned here as an input to the next numbered stage rather than treating this chapter as an isolated topic.
