# Caching and Invalidation

## Why this matters
Caching is easy; invalidation and correctness are the hard part.

## Core mental model
Compare browser HTTP cache, CDN cache, application/query cache, memory cache and persistent cache. Define cache key, TTL/freshness, invalidation trigger and stale behavior.

## Production reasoning
Discuss Cache-Control, ETag, stale-while-revalidate, request deduplication and optimistic cache updates. Never treat a cache as automatically correct.

## Example / implementation focus
Example: product details can tolerate short staleness; permissions should use a stronger freshness/security policy.

## Interview drill
Interview drill: explain why a cache returned incorrect data and how to repair it.

## Practical challenge
Production challenge: define a cache policy table.

## Completion contract
You are not finished when you can repeat the definition. You are finished when you can **explain the decision, implement the core behavior, identify failure modes, debug a broken version, discuss accessibility/security/performance implications, and handle a changed constraint**.

## Connection to next stage
Use what you learned here as an input to the next numbered stage rather than treating this chapter as an isolated topic.
