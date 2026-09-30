# rag

This topic is part of the 90-day frontend interview preparation syllabus.

Detailed notes, examples, exercises, interview questions with direct answers, pitfalls, and revision notes will be added when this topic is studied.


## Deep dive

RAG connects ingestion, chunking, embedding, indexing, retrieval, reranking/filtering, context construction, generation, validation, and citations. It supplies evidence at query time rather than relying only on model memory. RAG does not guarantee truth; bad retrieval produces confidently wrong context. Challenge: build document Q&A with source citations and an explicit insufficient-evidence state.

### Interview and implementation drill
Explain the trade-offs, implement a minimal version, identify two failure modes, and connect the design to the next stage of the AI pipeline.