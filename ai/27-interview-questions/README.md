# 27 — AI Interview Questions

## How to answer
Do not answer with buzzwords. Use:

**definition → mental model → architecture → runtime flow → failure modes → security → trade-offs → measurement**

## Core questions

### LLM fundamentals
- What is a token?
- What is a context window?
- Why can an LLM hallucinate?
- What does temperature change?
- Why does fluent output not imply correctness?

### RAG
- What is RAG?
- Why chunk documents?
- Embeddings vs keyword search?
- Why rerank?
- How do you evaluate retrieval?
- What happens when the correct document is not retrieved?

### AI application engineering
- Why should model calls usually go through a backend?
- How do you stream to React?
- How do you prevent stale AI responses?
- How do you validate model output?
- How do you handle provider rate limits?

### Tools and agents
- Function calling vs tool calling?
- Tool calling vs agents?
- When should you use a deterministic workflow instead of an agent?
- How do you authorize tool execution?
- Which actions require human approval?

### Security
- What is prompt injection?
- Why is retrieved content untrusted?
- How do you prevent cross-tenant retrieval?
- Why are prompts not a security boundary?
- How do you protect secrets and sensitive telemetry?

### System design
For an AI system-design question, cover:

`requirements → data flow → components → storage → retrieval/tools → security → failure handling → evaluation → observability → scale → cost/latency trade-offs`

## Practical senior-level exercise
Design a production multi-tenant document assistant using React + TypeScript. It must support streaming answers, citations, document ingestion, RAG, tool calls, user approval, evaluation, observability, and strict tenant isolation. Explain every trust boundary and every failure state.