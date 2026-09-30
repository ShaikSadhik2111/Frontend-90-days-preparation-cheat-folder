# 20 — Guardrails

## Connection
AI systems are probabilistic and can receive adversarial input. Guardrails constrain what enters, leaves, and can be executed.

## Layers
Use defense in depth:

1. input validation
2. authentication
3. authorization
4. prompt/context controls
5. output/schema validation
6. tool authorization
7. policy checks
8. human approval
9. monitoring

## Important principle
A guardrail should be enforceable outside the model when the consequence matters.

For example, "never transfer money above ₹X" should be checked by deterministic business logic, not only written in a prompt.

## Failure handling
Fail closed for consequential actions. If validation or authorization cannot be established, do not execute the operation.

## UX
Guardrails should have useful user-facing states: request clarification, explain inability, ask for approval, or provide a safe alternative.

## Interview reasoning
**Can guardrails eliminate prompt injection?** No single layer guarantees that. Defense in depth reduces risk while deterministic authorization protects consequential operations.

## Practical challenge
Design guardrails for an assistant that can read orders, draft emails, and submit refunds. Identify which actions need confirmation and which can be read-only.