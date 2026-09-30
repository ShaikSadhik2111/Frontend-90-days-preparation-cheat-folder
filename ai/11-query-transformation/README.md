# 11 — Query Transformation

## Connection
Retrieval expects a query; users provide conversations, vague requests, and multi-part questions. Query transformation bridges that mismatch.

## Techniques
Understand:

- query rewriting
- query expansion
- decomposition
- multi-query retrieval
- hypothetical-document approaches
- conversational query resolution

## Risk
A transformed query can introduce semantic drift. The system must preserve the original user intent and make transformations observable.

## Production pattern
Store:

`original query → transformed query/queries → retrieved evidence → final answer`

This makes retrieval failures debuggable.

## Multi-hop questions
A question such as "Which repair procedure applies to the model I bought last year?" may require:

1. resolve customer/model identity
2. retrieve product information
3. retrieve applicable procedure
4. combine evidence

Do not blindly ask one model call to perform every step.

## Interview reasoning
**When is decomposition useful?** When the question contains multiple independently retrievable facts or dependencies. It can improve recall but adds latency and complexity.

## Practical challenge
Build a query transformation stage for a support assistant and compare transformed retrieval with direct retrieval.

## Next
Retrieved vectors need infrastructure that can store, index, filter, and update them.