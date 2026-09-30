# 01 — LLM Fundamentals

## Connection
This is the starting point for AI application engineering. Before using prompts, RAG, tools, or agents, understand what an LLM actually receives, computes, and returns.

## What an LLM does
A language model generates a sequence of tokens by estimating the probability of the next token from the preceding context. The model does not execute your business rules or automatically verify factual correctness.

A useful mental model is:

`input messages + instructions + context → tokenization → model inference → generated tokens → application response`

### Tokens and context
Tokens are the units the model processes. Token count affects context limits, latency, and cost. A context window is the amount of model input/output context available for a request; it is not the same thing as durable application memory.

### Sampling
Generation can involve sampling from a probability distribution. Temperature and related controls influence how deterministic or varied output can be. Higher variability can be useful for ideation but is usually less desirable for strict extraction or transactional workflows.

## Frontend engineering implications
An AI UI must represent uncertainty and asynchronous behavior explicitly:

- loading/streaming state
- cancellation
- partial output
- retry
- timeout
- error state
- empty/insufficient-evidence state
- conversation state

Never assume that fluent output means correct output.

## Production example
A React chat application should send authenticated requests to a trusted backend, stream model output to the UI, support AbortController cancellation, and preserve a request ID so late responses cannot overwrite a newer conversation state.

## Interview reasoning
**Why can an LLM confidently return an incorrect answer?** Because generation optimizes for probable continuation, not truth verification. Reliability must therefore be engineered around the model with retrieval, tools, validation, evaluation, and appropriate UX.

## Practical challenge
Build a small TypeScript chat client. Track request lifecycle, cancellation, streaming chunks, errors, and message identity.

## Next
Once the model mental model is clear, the next problem is safely integrating a model provider into a real application.