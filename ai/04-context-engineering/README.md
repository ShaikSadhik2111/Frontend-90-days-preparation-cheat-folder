# 04 — Context Engineering

## Connection
Prompting defines instructions; context engineering decides what information the model actually receives alongside those instructions.

## Mental model
Think of context as a constrained working set:

`instructions + conversation + user data + retrieved evidence + tool results + output constraints`

Every item should earn its place.

## Sources of context
Common sources include:

- current user request
- conversation history
- summarized history
- retrieved documents
- user/account state
- tool results
- application policy
- examples

## Context budget
More context can increase cost and latency and can reduce relevance. Context assembly should therefore be intentional.

Useful techniques include:

- truncating old turns
- summarizing history
- retrieving only relevant chunks
- metadata filtering
- ordering evidence deliberately
- removing duplicate content
- limiting tool output

## Security
Context is a trust boundary. Never mix data from different tenants. Treat retrieved documents and user-provided text as untrusted content; they can contain instructions intended to manipulate the model.

## Production example
A support assistant may receive:

`system policy + current user + short conversation summary + retrieved account documentation + authorized order data`

It should not receive unrelated customers' records simply because they were available to the backend.

## Interview reasoning
**Why can adding more retrieved documents make RAG worse?** Irrelevant or contradictory evidence consumes context and can distract generation. Retrieval quality and context selection matter as much as model capability.

## Practical challenge
Build a context assembler that enforces token/character budgets, source priorities, tenant filters, and deterministic ordering.

## Next
Once context is assembled, applications need machine-readable responses rather than arbitrary prose.