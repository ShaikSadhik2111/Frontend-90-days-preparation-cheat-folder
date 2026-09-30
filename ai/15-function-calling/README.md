# 15 — Function Calling

## Connection
RAG lets models consume evidence. Function calling lets a model request deterministic application operations.

## Trust model
The model proposes:

`tool name + structured arguments`

The application decides:

`validate → authorize → execute → return result`

The model never becomes the authority.

## Example
A model may request:

`getOrderStatus({ orderId: "..." })`

The backend must verify that the authenticated user is allowed to access that order before querying it.

## Tool contract
Define:

- name
- description
- input schema
- authorization requirements
- timeout
- expected output
- error contract
- idempotency behavior

## Security
Never allow model-generated arguments to bypass normal authorization. Validate identifiers, ranges, enum values, and business constraints.

## Consequential actions
Reading an order is different from cancelling it. For irreversible or high-impact operations, require explicit user confirmation or human approval.

## Interview reasoning
**Does function calling make the model capable of executing functions?** No. It produces a structured request. Trusted application code executes the operation.

## Practical challenge
Build a typed order-status tool with authorization, validation, timeout, and normalized errors.

## Next
Multiple tools and sequential operations require a broader tool-calling orchestration model.