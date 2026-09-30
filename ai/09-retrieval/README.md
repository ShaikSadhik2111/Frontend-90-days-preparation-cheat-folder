# 09 — Retrieval

## Connection
Retrieval is the evidence-selection stage between indexed knowledge and generation.

## Pipeline

`query → filters → candidate retrieval → ranking → selected evidence`

## Retrieval modes
**Lexical:** exact/term-oriented matching.

**Vector:** semantic similarity.

**Hybrid:** combines lexical and semantic signals.

Understand top-k, filters, score thresholds, recall, precision, latency, and result diversity.

## Why retrieval quality matters
If the correct evidence is absent from the candidate set, the generator cannot reliably recover it. Generation quality is therefore bounded by retrieval quality for knowledge-dependent tasks.

## Multi-tenant security
Authorization must be applied before or during retrieval, not after the model sees data. Tenant IDs, document permissions, and user access scopes should be deterministic filters.

## Evaluation
Build a question → expected evidence dataset. Measure whether relevant evidence appears in top-k rather than judging only the final answer.

## Production failure modes
- wrong tenant
- stale index
- poor chunking
- query mismatch
- overly broad top-k
- missing metadata
- exact identifier missed by vector search
- duplicated evidence

## Interview reasoning
**Why not retrieve everything?** Context, latency, cost, and relevance degrade as unnecessary evidence increases.

## Practical challenge
Implement hybrid retrieval for a documentation dataset and create a small recall@k evaluation set.

## Next
Initial retrieval favors recall; reranking can improve precision.