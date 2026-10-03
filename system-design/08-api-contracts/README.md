# API Contracts

## Why this matters
Treat frontend/backend boundaries as contracts, not fetch calls.

## Core mental model
Define resource shapes, error envelopes, pagination, filtering, sorting, idempotency, retries, authentication and versioning. Runtime validation is necessary because TypeScript types disappear at runtime.

## Production reasoning
Discuss REST-style resources, RPC-like operations, GraphQL trade-offs and BFFs. Define compatibility rules for partial rollouts.

## Example / implementation focus
Example: cursor pagination with stable sort keys is safer for changing datasets than page numbers alone.

## Interview drill
Interview drill: design an API for searchable activity events and explain error semantics.

## Practical challenge
Production challenge: write TypeScript domain types plus runtime validation assumptions.

## Completion contract
You are not finished when you can repeat the definition. You are finished when you can **explain the decision, implement the core behavior, identify failure modes, debug a broken version, discuss accessibility/security/performance implications, and handle a changed constraint**.

## Connection to next stage
Use what you learned here as an input to the next numbered stage rather than treating this chapter as an isolated topic.
