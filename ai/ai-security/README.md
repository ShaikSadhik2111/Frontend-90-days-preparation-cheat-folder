# ai security

This topic is part of the 90-day frontend interview preparation syllabus.

Detailed notes, examples, exercises, interview questions with direct answers, pitfalls, and revision notes will be added when this topic is studied.


## Deep dive

AI systems introduce prompt injection, data exfiltration, insecure tool use, excessive agency, and sensitive-data leakage. Treat retrieved text and model output as untrusted data. Enforce authorization in deterministic application code and give tools the minimum permissions required. Challenge: explain why malicious instructions inside a retrieved document must never gain authority over application tools.

### Interview and implementation drill
Explain the threat or optimization model, implement a small example, identify failure modes, and connect the solution to production observability and evaluation.