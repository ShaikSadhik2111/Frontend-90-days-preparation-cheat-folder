# 23 — AI Evaluation

## Connection
A production AI system needs measurable quality. Evaluation converts subjective "it seems good" into repeatable evidence.

## Evaluation dataset
Include:

- common cases
- edge cases
- ambiguous inputs
- adversarial prompts
- no-answer cases
- long-context cases
- tool failures
- authorization cases

## Metrics
Choose task-specific metrics. Examples:

- correctness
- groundedness
- citation correctness
- classification accuracy
- tool-call accuracy
- refusal quality
- latency
- cost

## Regression testing
Version prompts, models, retrieval parameters, and datasets. Run evaluations whenever a significant component changes.

## Human review
Automated judges can help but can also share model biases or miss domain-specific errors. Use targeted human review for high-impact decisions.

## Production feedback
User feedback is a useful signal but is not a clean quality metric by itself. Combine feedback with traces and offline evaluation.

## Interview reasoning
**What would you measure before changing the model?** Establish a baseline quality dataset, latency distribution, cost, failure categories, and business success criteria.

## Practical challenge
Create an evaluation harness that runs 50 questions against two model/prompt configurations and compares quality, latency, and cost.