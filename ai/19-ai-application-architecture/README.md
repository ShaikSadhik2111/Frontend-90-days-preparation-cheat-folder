# 19 — AI Application Architecture

## Connection
Individual AI techniques now need to become a maintainable product architecture.

## Reference architecture

`React UI → BFF/API → AI gateway → model`

with adjacent services for:

`retrieval → vector store`

`tools → domain APIs`

`policy → auth/guardrails`

`telemetry → traces/evaluation`

## Responsibilities
**Frontend:** UX, streaming state, cancellation, citations, approvals, feedback.

**BFF/backend:** authentication, authorization, orchestration, provider credentials, validation, rate limits.

**AI gateway:** model configuration, provider integration, normalized errors, routing.

**Retrieval:** indexing, search, ranking, permissions.

**Tools:** deterministic business operations.

## Scalability
Separate synchronous user requests from long-running ingestion/evaluation jobs. Use queues for document processing and batch evaluation where appropriate.

## Multi-tenancy
Tenant identity should flow through every data access boundary, especially retrieval and tool calls.

## Provider strategy
Abstract provider integration where it reduces coupling, but preserve observability of provider/model/version behavior.

## Interview reasoning
Design from requirements first: latency target, data freshness, privacy, expected traffic, cost budget, failure tolerance, and human approval requirements.

## Practical challenge
Architect a multi-tenant document assistant with streaming answers, citations, background ingestion, evaluation, and audit logs.