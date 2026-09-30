# tool calling

This topic is part of the 90-day frontend interview preparation syllabus.

Detailed notes, examples, exercises, interview questions with direct answers, pitfalls, and revision notes will be added when this topic is studied.


## Deep dive

Tool calling extends function calling into workflows involving search, APIs, databases, or application services. Separate model decisions from deterministic execution. Define strict schemas, least-privilege authorization, timeouts, maximum steps, and confirmation for irreversible actions. Interview drill: design an assistant that can inspect an order but needs approval before changing it.

### Interview and implementation drill
Explain the trust boundary, implement a minimal version, identify two failure modes, and defend the design trade-offs.