# 08 — Chunking

## Connection
Embeddings represent chunks, so chunk boundaries directly affect what retrieval can find.

## Problem
A document is often too large to send as one retrieval unit. Splitting it into chunks creates searchable pieces, but poor boundaries can destroy meaning.

## Strategies
Compare:

- fixed token/character chunks
- paragraph chunks
- heading-aware chunks
- semantic chunks
- recursive splitting
- parent-child retrieval
- overlap

Structure-aware chunking usually preserves meaning better for documentation, while fixed-size splitting is simple and predictable.

## Metadata
Attach useful metadata:

`documentId, section, title, product, locale, permissions, source`

Metadata enables filtering and provenance.

## Trade-off
Very small chunks improve precision but can lose context. Very large chunks preserve context but increase retrieval noise, token cost, and reduce the number of independent candidates.

## Production example
Technical documentation can be chunked by heading, with tables and code blocks kept intact where possible. Each chunk keeps its document and section identity so citations remain traceable.

## Interview reasoning
**Why is overlap useful?** It can preserve information that crosses boundaries, but excessive overlap duplicates content and wastes retrieval/context budget.

## Practical challenge
Take one technical document and compare fixed-size, paragraph, and heading-aware chunking. Evaluate which questions each strategy can answer correctly.

## Next
Chunks and embeddings are useful only when the system can retrieve the right candidates.