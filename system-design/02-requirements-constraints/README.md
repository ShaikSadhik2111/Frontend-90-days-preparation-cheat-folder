# Requirements and Constraints

## Why this matters
Prevent overengineering by turning vague prompts into measurable requirements.

## Core mental model
Separate functional requirements from non-functional requirements, constraints and explicit non-goals. Clarify users, platforms, data freshness, offline needs, accessibility, security and expected scale.

## Production reasoning
Use a requirements table: capability, priority, latency target, consistency need, failure behavior, security sensitivity. Identify assumptions and ask only questions that change architecture.

## Example / implementation focus
Example: autocomplete needs prefix search, keyboard navigation, debounce, cancellation, stale-response protection and a defined freshness policy.

## Interview drill
Interview drill: given 'design a collaborative dashboard', ask five questions before drawing anything.

## Practical challenge
Production challenge: create acceptance criteria and non-goals for the project.

## Completion contract
You are not finished when you can repeat the definition. You are finished when you can **explain the decision, implement the core behavior, identify failure modes, debug a broken version, discuss accessibility/security/performance implications, and handle a changed constraint**.

## Connection to next stage
Use what you learned here as an input to the next numbered stage rather than treating this chapter as an isolated topic.
