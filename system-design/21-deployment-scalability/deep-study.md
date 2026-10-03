# Deployment and Scalability

## Why it matters
Cover CDN/static assets, immutable caching, versioned chunks, feature flags, gradual rollout, rollback and environment configuration. Understand how deployment choices affect frontend reliability and compatibility. Interview drill: diagnose a chunk-load failure after deployment. Challenge: write a release/rollback strategy.

## Study contract
Do not memorize a diagram. Explain why each boundary exists, what can fail, how the user experience degrades, how the system is measured, and what changes under a new constraint.

## Interview follow-ups
- 10× traffic/data
- offline or low bandwidth
- partial dependency outage
- strict consistency or concurrent edits
- security/accessibility requirements

## Practical output
Create a one-page architecture, critical data flow, failure matrix and trade-off list.