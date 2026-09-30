# AI — Deep, Connected AI Engineering Path

This section is designed as a **learning source**, not a collection of short reference notes. The topics progress from model fundamentals to production AI architecture and interview system design.

## 01 → 27 progression

01. LLM Fundamentals
02. LLM API Integration
03. Prompting
04. Context Engineering
05. Structured Output
06. Streaming
07. Embeddings
08. Chunking
09. Retrieval
10. Reranking
11. Query Transformation
12. Vector Databases
13. RAG
14. RAG Evaluation
15. Function Calling
16. Tool Calling
17. Agent Orchestration
18. AI Agents
19. AI Application Architecture
20. Guardrails
21. AI Security
22. Hallucination and Grounding
23. AI Evaluation
24. Cost and Latency
25. Production Observability
26. Multimodal AI
27. AI Interview Questions

## The connected engineering model

`LLM → API boundary → prompt → context → structured output → streaming → embeddings → chunking → retrieval → reranking → RAG → evaluation → tools → agents → architecture → security → production`

The important learning progression is not the API names. It is the engineering problems:

**probabilistic generation → deterministic application boundary → useful context → reliable data access → controlled actions → measurable quality → secure production system**

## Depth standard

Every major topic should let you answer:

1. What is it?
2. Why does the problem exist?
3. What is the mental model?
4. How does the request/data flow work?
5. How would I implement it with TypeScript?
6. Where does it appear in a React product?
7. What can fail?
8. How would I debug it?
9. What are the security implications?
10. What are the latency/cost implications?
11. What would I measure?
12. What alternative would I choose and why?
13. What does an interviewer expect me to reason about?

## Frontend engineer target

The target is not model research. It is the ability to build AI-powered product features such as:

- streaming AI chat
- document Q&A
- RAG applications
- structured AI forms
- tool-enabled assistants
- human approval workflows
- AI evaluation dashboards
- multimodal interfaces
- production-safe AI applications

Typical architecture:

`React + TypeScript → API/BFF → AI/model gateway → retrieval/tools → validation/guardrails → stream → UI state → telemetry/evaluation`

## Future-ready rule

AI providers, SDKs, model names, and framework APIs will change quickly. The durable material here therefore focuses on **tokens, context, retrieval, ranking, schemas, tool contracts, state machines, security boundaries, evaluation, observability, and system-design trade-offs**.

When implementing with a specific provider, verify the current official SDK/API documentation rather than treating provider-specific syntax as permanent knowledge.

## Study rule

For each folder:

**Understand → implement → break it → debug it → explain the trade-off → connect it to the next topic.**

Do not move to the next folder until you can explain the current concept without relying on memorized one-line definitions.
