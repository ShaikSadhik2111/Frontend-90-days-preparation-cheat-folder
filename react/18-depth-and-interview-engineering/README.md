# 18 — React Depth and Interview Engineering

This extension deepens the modern React topics that require architecture and debugging reasoning.

## Topics

- React Compiler
- Server Components architecture
- Actions / Server Actions
- Optimistic UI
- Hydration mismatch debugging
- Suspense architecture
- Caching and invalidation
- State ownership decisions
- Large-scale component architecture
- React performance profiling
- React + TypeScript advanced patterns
- React interview coding problems

## Core questions

For every topic answer:

1. What problem does it solve?
2. What does React actually do at runtime?
3. Where does state/data live?
4. What happens during loading, failure and retry?
5. What are the performance implications?
6. How would you debug it?
7. What are the alternatives and trade-offs?

## Senior mental model

`render snapshots → scheduling → reconciliation/identity → commit → event intent → external synchronization → server state/cache → measurement → architecture`

Do not memorize APIs independently from this model.
