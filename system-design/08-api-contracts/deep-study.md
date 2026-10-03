# API Contracts

## Why it matters
Design contracts around resources, operations, errors, pagination, sorting, filtering, idempotency, authentication and compatibility. Compare REST, RPC-like APIs, GraphQL and BFF trade-offs. Include runtime validation because TypeScript disappears at runtime. Interview drill: design a searchable activity API and explain error semantics. Challenge: define request/response types, error envelope and pagination contract.

## Study contract
Explain the mental model, implement the core mechanism, identify failure modes, debug a broken version, discuss performance/security/accessibility implications, and handle a changed constraint.

## Interview follow-ups
- What changes at 10× scale?
- What becomes stale and who owns invalidation?
- What happens during partial failure or concurrency?
- What would you measure in production?

## Practical output
Write an ADR or working implementation from your project and record the trade-offs.