# 12 — Vector Databases

## Connection
Embeddings create vectors; a vector database provides persistent storage and efficient similarity search around them.

## Core capabilities
Understand:

- vector storage
- approximate nearest-neighbor indexes
- similarity metrics
- metadata filtering
- namespaces/collections
- upserts
- deletion
- updates
- index lifecycle

## Production data model
A retrieval record commonly contains:

`vector + documentId + chunkId + text/reference + metadata + embeddingVersion`

Keep source identity and permissions with the record so retrieval results can be traced and filtered.

## Tenant isolation
Tenant boundaries are security boundaries. Do not depend on a prompt instruction to prevent cross-tenant retrieval. Enforce tenant filters in deterministic application/database logic.

## Consistency
Ingestion, updates, and deletes must keep the index aligned with the source of truth. Stale vectors can produce stale answers.

## Interview reasoning
**Why use approximate nearest-neighbor search?** Exact comparison against every vector becomes expensive at scale; ANN trades some exactness for much lower search cost.

## Practical challenge
Design an index for 10 million document chunks with tenant and product filters. Explain ingestion, deletion, re-embedding, and query latency.

## Next
With retrieval infrastructure available, the complete evidence-grounded generation pattern is RAG.