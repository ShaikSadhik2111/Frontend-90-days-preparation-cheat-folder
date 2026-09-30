# AI Security, Cost and Observability

## Security

Treat prompts, retrieved documents, tool outputs and model responses as different trust boundaries.

Cover:

- prompt injection
- indirect prompt injection from retrieved content
- PII isolation
- tenant isolation
- authorization before tool execution
- output validation
- secrets never exposed to the browser

## Cost

Track:

`input tokens + output tokens + tool/retrieval overhead`

Use budgets, caching, model selection and bounded context.

## Observability

Capture enough metadata to debug:

`request id → model/config → latency → token usage → tool calls → retrieval metrics → outcome`

Avoid logging sensitive user content by default.

## Model fallback

Fallback should be policy-driven, not an unconditional retry loop. Define which failures justify fallback and how consistency/latency/cost change.
