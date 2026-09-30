# rag evaluation

This topic is part of the 90-day frontend interview preparation syllabus.

Detailed notes, examples, exercises, interview questions with direct answers, pitfalls, and revision notes will be added when this topic is studied.


## Deep dive

Evaluate retrieval and generation separately. Retrieval can use recall@k and related relevance measures; generation should be assessed for correctness, groundedness, completeness, citation quality, and appropriate refusal. Maintain a fixed regression set containing normal, ambiguous, and adversarial questions so prompt or retrieval changes can be compared objectively.

### Interview and implementation drill
Explain the trade-offs, implement a minimal version, identify two failure modes, and connect the design to the next stage of the AI pipeline.