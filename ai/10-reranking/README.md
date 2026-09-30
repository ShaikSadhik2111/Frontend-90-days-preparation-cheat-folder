# 10 — Reranking

## Connection
Initial retrieval is usually optimized to cheaply find a broad candidate set. Reranking applies a stronger relevance function to those candidates.

## Two-stage model

`query → broad retrieval → top N candidates → reranker → top K evidence`

This separates recall from precision.

## Why it helps
A vector similarity score is only a proxy for relevance. A reranker can consider query-document interaction more deeply and reorder candidates.

## Trade-offs
More candidates can improve recall but increase reranking cost and latency. Too few candidates can permanently exclude the correct document.

Tune:

- candidate N
- final K
- score thresholds
- latency budget
- model choice
- context budget

## Production debugging
Log candidate IDs and ranking changes. If the right document appears in retrieval but disappears after reranking, the problem is ranking—not generation.

## Interview reasoning
**Can reranking fix missing evidence?** No. If the correct document is absent from the candidate set, reranking cannot recover it.

## Practical challenge
Create an evaluation set where the correct document is present but not ranked first. Compare retrieval-only versus reranked results.

## Next
Users often ask questions in forms that do not match the index, so query transformation becomes useful.