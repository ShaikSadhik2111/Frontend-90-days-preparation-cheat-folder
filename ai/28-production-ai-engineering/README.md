# 28 — Production AI Engineering

This extension turns the 01–27 AI curriculum into implementable product engineering.

## Topics

- AI SDK/API abstraction
- Streaming UI implementation
- Tool-call state machines
- Agent memory
- Agent loops and termination
- Human-in-the-loop
- Production RAG implementation
- RAG evaluation datasets
- Prompt/version regression testing
- AI rate limiting
- AI caching
- Token budgeting
- LLM cost calculation
- AI observability/tracing
- PII/data isolation
- Prompt-injection defense
- Model fallback
- AI application testing
- AI frontend UX patterns

## Architecture

`React + TypeScript → BFF/API → model gateway → retrieval/tools → validation/guardrails → stream → UI state → telemetry/evaluation`

## Engineering standard

For every capability cover correctness, failure handling, security, latency, cost, observability and user experience.

Provider SDK syntax is implementation detail. The durable knowledge is the boundary, state machine, data flow and trade-offs.
