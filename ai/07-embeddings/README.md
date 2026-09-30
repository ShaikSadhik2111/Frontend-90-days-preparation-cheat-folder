# 07 — Embeddings

## Connection
Prompting and streaming handle generation. Retrieval systems need a representation that lets them compare meaning across text.

## What embeddings are
An embedding model maps input into a numerical vector:

`text → [v1, v2, ... vn]`

Semantically related inputs often occupy nearby regions under an appropriate similarity measure.

## Important concepts
Understand:

- vector dimensions
- cosine similarity
- dot product
- normalization
- embedding model choice
- domain language
- query/document embedding consistency
- indexing

An embedding is not a database and is not a truth representation.

## Lexical vs semantic search
Keyword search is strong for exact identifiers, error codes, names, and rare terms. Vector search is useful for semantic similarity. Production systems often combine both.

## Versioning
Changing the embedding model can make old and new vectors incompatible or change ranking behavior. Treat embedding model/version as part of your data contract.

## Production example
For a repair-support application, embed technical documentation and user queries using compatible models, store metadata such as product family and locale, then retrieve candidates before generation.

## Interview reasoning
**Why can semantically similar vectors still produce bad answers?** Similarity is not relevance. A retrieved document can be semantically related but fail to answer the exact question.

## Practical challenge
Build a small embedding search over product documentation and compare vector-only results with keyword-only results.

## Next
Embedding quality depends heavily on how documents are divided into searchable units.