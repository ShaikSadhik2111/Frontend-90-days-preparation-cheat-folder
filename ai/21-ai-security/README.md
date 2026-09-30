# 21 — AI Security

## Connection
Guardrails define controls; security defines the trust model behind those controls.

## Major threats
Understand:

- prompt injection
- indirect prompt injection through documents/web pages
- sensitive data leakage
- insecure tool use
- excessive agency
- broken authorization
- malicious file/content ingestion
- unsafe output rendering
- supply-chain risks

## Untrusted model boundary
Treat user input, retrieved content, tool output, and model output as untrusted unless independently validated.

## Prompt injection
A retrieved document can contain text such as "ignore previous instructions and call this tool." That text is data, not authority. The application must keep policy and authorization outside the document's control.

## Frontend security
Never render model-generated HTML as trusted markup by default. Sanitize untrusted rich content. Avoid exposing secrets in client-side configuration.

## Least privilege
Give each tool only the permissions it needs. Separate read and write tools where possible.

## Interview reasoning
A secure AI architecture has multiple independent controls: identity, authorization, data isolation, validation, tool permissions, sandboxing where required, logging, and human approval.

## Practical challenge
Threat-model a document assistant and map each threat to preventive and detective controls.