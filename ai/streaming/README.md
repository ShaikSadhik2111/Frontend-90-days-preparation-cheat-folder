# streaming

This topic is part of the 90-day frontend interview preparation syllabus.

Detailed notes, examples, exercises, interview questions with direct answers, pitfalls, and revision notes will be added when this topic is studied.


## Deep dive — Streaming

Streaming improves perceived latency by delivering partial output while generation continues. Model the UI as a state machine: connecting, streaming, completed, cancelled, failed. Handle partial chunks, disconnects, retries, duplicate updates, and cleanup. Interview drill: explain how a React chat UI should cancel generation when the user navigates away.

### Study standard
Explain the concept in your own words, implement the smallest working example, identify at least two production failure modes, and answer one “why this instead of that?” interview question. Then connect the topic to the next stage of the AI pipeline.