# 22 — Hallucination and Grounding

## Connection
Generation can produce plausible text without sufficient evidence. Production systems must distinguish fluent output from grounded output.

## Types
Examples include:

- fabricated facts
- unsupported citations
- incorrect calculations
- entity confusion
- outdated information
- overconfident answers when evidence is absent

## Risk reduction
Use:

- retrieval
- authoritative tools
- constrained schemas
- citations
- verification
- domain rules
- calibrated refusal
- evaluation

No technique guarantees truth.

## Groundedness
A response is better grounded when its claims are supported by trusted evidence available to the system. Citation presence alone is insufficient; the cited source must actually support the claim.

## UX
Provide an explicit "insufficient evidence" path. Do not force the model to answer every question.

## Interview reasoning
**Does RAG solve hallucination?** It can reduce unsupported generation when retrieval supplies relevant evidence, but errors in retrieval, context construction, interpretation, or generation can still produce wrong answers.

## Practical challenge
Create answerable and unanswerable questions for a documentation assistant and measure how often it correctly refuses unsupported questions.