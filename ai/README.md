# AI — Connected Frontend AI Engineering Learning Path

AI is learned here as an engineering discipline, not as a collection of prompt tips. The sequence connects **LLM fundamentals → API integration → prompting/context → structured output → retrieval/RAG → tools → agents → evaluation → security → production architecture**.

## Learning standard

Every topic should answer:
- **Connection** — why it follows the previous concept
- **Problem** — what engineering problem it solves
- **Mental model** — how the system actually behaves
- **Mechanics** — request/response, tokens, context, retrieval, tool execution, or orchestration flow
- **Code** — practical implementation
- **Frontend use case** — where it appears in a React/TypeScript product
- **Failure modes** — hallucination, malformed output, latency, cost, race conditions, prompt injection, data leakage, etc.
- **Evaluation** — how to know whether it works
- **Interview reasoning** — trade-offs and design questions
- **Practical challenge** — build and debug it
- **Next connection** — why the next topic matters

## Connected roadmap

LLM Fundamentals → API Integration → Prompting → Context Engineering → Structured Output → Streaming → Embeddings → Chunking → Retrieval → Reranking → Query Transformation → Vector Databases → RAG → RAG Evaluation → Function Calling → Tool Calling → Agent Orchestration → AI Agents → Application Architecture → Guardrails → AI Security → Hallucination → Evaluation → Cost & Latency → Production Observability → Multimodal AI → Interview Questions

## Frontend engineer target

The goal is not to become a model researcher. The target is to become a frontend/product engineer who can build reliable AI features: streaming chat, document Q&A, structured AI forms, tool-enabled assistants, RAG interfaces, human approval flows, evaluation dashboards, and production-safe AI applications.

## Core architecture

React UI → API/BFF → model provider → retrieval/tools → validation/guardrails → response streaming → UI state → telemetry/evaluation.

AI output is probabilistic. Production engineering therefore requires **schemas, validation, retries, timeouts, observability, security, evaluation, and explicit failure states**.

## Study rule

Do not memorize provider-specific APIs. Learn the durable concepts first, then map them to the current SDK/provider documentation when implementing.
