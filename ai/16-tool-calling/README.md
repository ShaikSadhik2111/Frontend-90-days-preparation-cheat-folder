# 16 — Tool Calling

## Connection
Function calling provides one structured operation. Tool calling systems coordinate multiple tools across an AI workflow.

## Architecture

`model → tool request → validator/authorizer → tool → result → model`

Repeat only within explicit limits.

## Production requirements
Every tool should have:

- strict input schema
- least-privilege access
- timeout
- rate limit
- normalized errors
- audit logging
- idempotency where needed

Set maximum tool calls and execution time. Never allow an agent loop to run indefinitely.

## Tool result design
Return only information necessary for the next reasoning step. Excessive tool output increases context size and may expose sensitive data.

## Human approval
Use confirmation before consequential actions such as payments, account deletion, production changes, or external messages.

## Interview reasoning
**Why separate tools from the model?** Deterministic services provide authorization, correctness, and auditability. The model should choose or request actions, not become the security boundary.

## Practical challenge
Build a shopping assistant that can search products and inventory but must obtain explicit confirmation before placing an order.

## Next
When tool selection and sequencing become dynamic, orchestration becomes the central problem.