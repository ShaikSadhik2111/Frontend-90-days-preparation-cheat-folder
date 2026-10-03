# Performance Architecture

## Why it matters
Reason from measurement: reproduce → profile → isolate bottleneck → change one thing → remeasure. Cover LCP, INP, CLS, TTFB, long tasks, bundle cost, images/fonts, code splitting, virtualization and memory. Interview drill: diagnose poor INP despite good LCP. Challenge: create before/after measurements and explain the causal bottleneck.

## Study contract
Explain the design decision, the failure model, the measurement strategy and the trade-offs. Be able to defend the choice without relying on a framework name.

## Interview follow-ups
- What fails first at 10× scale?
- What is the recovery path?
- What signal would prove the system is healthy?
- What security or accessibility risk remains?

## Practical output
Add a measured experiment, threat model, failure matrix or ADR to the project.