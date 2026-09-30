# 13 — RAG

## Connection
RAG combines the previous retrieval components with generation.

## End-to-end pipeline

`documents → parse → chunk → embed → index`

Then:

`question → transform → retrieve → rerank/filter → construct context → generate → validate/cite`

## Why RAG
RAG provides query-time evidence for knowledge that may be private, changing, or outside the model's training knowledge. It also enables source attribution.

## RAG does not guarantee truth
Failure can occur at every stage:

- bad parsing
- poor chunking
- stale index
- wrong retrieval
- bad reranking
- insufficient context
- model misunderstanding
- unsupported generation

Therefore, "we use RAG" is not itself a reliability claim.

## Grounded UX
A production UI should show citations or source references where appropriate and have an explicit insufficient-evidence behavior rather than forcing an answer.

## Frontend architecture
React can display:

- streaming answer
- source cards
- citation links
- retrieval status
- retry
- feedback
- evidence-aware error states

## Interview reasoning
**How would you improve a bad RAG answer?** First determine whether the required evidence was retrieved. Then inspect chunking, query transformation, ranking, context construction, and generation separately.

## Practical challenge
Build document Q&A with citations and a test set containing answerable and unanswerable questions.

## Next
A RAG pipeline needs measurement; otherwise improvements are based on anecdotes.