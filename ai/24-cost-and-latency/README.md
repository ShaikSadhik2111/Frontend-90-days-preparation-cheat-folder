# 24 — Cost and Latency

## Connection
AI quality is only useful when the product can afford and deliver it within acceptable latency.

## Main cost drivers
Consider:

- input tokens
- output tokens
- model choice
- number of model calls
- retrieval volume
- tool calls
- repeated context
- embedding/indexing volume

## Latency
Think in p50/p95/p99, not just average response time. User perception also depends on time to first token for streaming applications.

## Optimization levers
Use:

- smaller models for simple tasks
- prompt/context reduction
- caching
- retrieval filtering
- parallel independent calls
- streaming
- avoiding unnecessary model calls
- bounded tool loops

Do not optimize cost by destroying quality.

## Interview reasoning
**How would you reduce p95 latency?** Profile the full critical path first. Parallelize independent operations, reduce context, cache stable work, select appropriate models, and move long jobs to asynchronous processing.

## Practical challenge
Measure a RAG request end-to-end and identify the three largest contributors to latency and cost.