# Frontend Reliability

## Why it matters
Model timeouts, retries, backoff, partial failure, stale data, degraded mode and recovery UX. Do not retry non-idempotent mutations blindly. Preserve user input and make errors actionable. Interview drill: design a dashboard that survives an API outage. Challenge: define failure behavior for five dependencies.

## Study contract
Explain the design decision, the failure model, the measurement strategy and the trade-offs. Be able to defend the choice without relying on a framework name.

## Interview follow-ups
- What fails first at 10× scale?
- What is the recovery path?
- What signal would prove the system is healthy?
- What security or accessibility risk remains?

## Practical output
Add a measured experiment, threat model, failure matrix or ADR to the project.