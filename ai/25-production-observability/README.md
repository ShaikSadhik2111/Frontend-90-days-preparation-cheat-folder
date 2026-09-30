# 25 — Production Observability

## Connection
Evaluation measures quality offline; observability explains what happens in real production requests.

## Trace model
Give each AI request a trace/request ID and record appropriate metadata:

- model/provider/version
- prompt/template version
- latency
- token usage
- retrieval IDs/scores where safe
- tool calls
- errors
- outcome
- user feedback

## Privacy
Do not blindly log raw prompts, documents, or personal data. Apply redaction, access control, retention limits, and environment-specific policies.

## Debugging
A useful trace should answer:

1. What request arrived?
2. What context was assembled?
3. What evidence was retrieved?
4. What tools were called?
5. Where did latency occur?
6. What failed?
7. What model/version produced the output?

## Frontend telemetry
Track client-visible states such as time to first token, stream interruption, cancellation, retry, and user feedback.

## Interview reasoning
AI observability must cover both conventional distributed-system signals and AI-specific signals such as token usage, retrieval quality, tool behavior, and evaluation results.

## Practical challenge
Design an AI trace schema that lets an engineer diagnose a failed RAG request without storing confidential document contents.