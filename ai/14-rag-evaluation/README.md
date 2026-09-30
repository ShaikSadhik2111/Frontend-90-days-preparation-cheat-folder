# 14 — RAG Evaluation

## Connection
RAG is a pipeline, so evaluation must identify which stage failed rather than judging only the final answer.

## Evaluate retrieval separately
Create questions with known relevant evidence and measure whether it appears in top-k. Useful metrics include recall@k and precision-oriented measures.

## Evaluate generation
Measure task-specific dimensions such as:

- factual correctness
- groundedness
- completeness
- citation correctness
- refusal when evidence is insufficient
- instruction adherence

## Dataset design
Include:

- normal questions
- ambiguous questions
- no-answer questions
- adversarial questions
- long-context questions
- tenant/permission cases

Keep a versioned regression set.

## Change management
When changing chunking, prompts, embedding models, retrieval parameters, or LLMs, run the same evaluation set. A change that improves one example but degrades a broad test set is not a reliable improvement.

## Human evaluation
Automated metrics are useful but imperfect. Human review remains valuable for subjective or domain-specific quality dimensions.

## Interview reasoning
**Why evaluate retrieval separately?** A fluent answer can hide the fact that the correct evidence was never retrieved. Stage-level metrics make the root cause observable.

## Practical challenge
Create a 50-question RAG regression set and record retrieval hit rate, groundedness, citation correctness, latency, and cost.