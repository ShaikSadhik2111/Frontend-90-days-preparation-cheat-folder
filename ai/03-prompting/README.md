# 03 — Prompting

## Connection
API integration gives us a reliable transport boundary. Prompting defines the task and constraints communicated through that boundary.

## Prompt as specification
A strong prompt behaves like an executable specification:

- objective
- relevant context
- constraints
- examples when useful
- output requirements
- ambiguity handling
- failure/refusal behavior

Prefer explicit instructions over vague requests.

## Example

```text
Task: classify a support ticket.

Allowed categories:
- billing
- technical
- account
- other

Return JSON matching the supplied schema.
If evidence is insufficient, use "other" and include a short reason.
Do not invent customer information.
```

## Techniques
Understand zero-shot, few-shot examples, decomposition, delimiters, role/context separation, and instruction hierarchy. Use the smallest prompt that reliably specifies the task.

Few-shot examples are useful when the desired behavior is difficult to express declaratively, but examples can also introduce unintended patterns or consume context.

## Important limitation
Prompting does not create authorization or deterministic correctness. A prompt saying "never reveal secrets" is not a security boundary. Sensitive data access must be enforced by application code.

## Production testing
Treat prompts like code:

- version them
- keep representative test cases
- compare changes against a regression set
- measure output quality
- monitor token usage
- document intended behavior

## Interview reasoning
**Why isn't a longer prompt always better?** More context can increase cost, latency, distraction, and conflicting instructions. Context quality matters more than raw quantity.

## Practical challenge
Create a ticket-classification prompt with a strict schema. Build 20 test cases including ambiguous and adversarial inputs and measure failure categories.

## Next
Prompt quality depends heavily on which information you put into the context, leading to context engineering.