# 05 — Structured Output

## Connection
AI output becomes useful to software when it can cross a deterministic application boundary. Structured output provides a contract between probabilistic generation and typed application code.

## Mental model

`model output → parse → schema validation → semantic validation → business logic`

Schema validity does not prove factual correctness. It only proves that the output matches the expected shape.

## Example

```ts
type TicketClassification = {
  category: "billing" | "technical" | "account" | "other";
  confidence: number;
  reason: string;
};
```

Validate runtime data even if TypeScript types say it should exist. TypeScript disappears at runtime.

## Failure modes
Handle:

- malformed JSON
- missing fields
- wrong enum values
- invalid ranges
- semantically contradictory values
- provider refusal
- truncated output
- schema/version mismatch

Use runtime validation at the API boundary with a schema library or equivalent validation layer.

## Production pattern
Version important schemas. Keep AI-specific DTOs separate from domain models when the model's output is only an intermediate representation.

## Interview reasoning
**Why is TypeScript alone insufficient?** TypeScript checks code at compile time; model output arrives at runtime and can violate the type declaration.

## Practical challenge
Create a typed AI form generator. Validate generated fields, reject unsafe values, and transform valid output into a domain-safe command.

## Next
Structured output works for complete responses; streaming introduces partial and intermediate states.