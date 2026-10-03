# Frontend System Design — Interview-Ready Curriculum

This is a **learning track**, not merely a topic catalog. The numbered stages progress from requirements and architecture into data, caching, realtime, reliability, security, observability and interview drills.

## Learning contract

For every stage:

**Connection → What → Why → Mental model → Architecture → Data flow → Failure modes → Performance → Security/accessibility → Trade-offs → Interview reasoning → Practical challenge → Next connection**

A topic is not complete because you can draw a diagram. You must be able to explain why each boundary exists, what happens when it fails, what data may be stale, how the browser behaves, how the system is observed, and what changes at 10× scale.

## 26-stage progression

1. Fundamentals
2. Requirements & Constraints
3. Estimation
4. Frontend Architecture
5. Component Architecture
6. State Architecture
7. Data Flow
8. API Contracts
9. Data Fetching
10. Caching
11. Pagination & Large Data
12. Search & Autocomplete
13. Optimistic Updates
14. Real-Time
15. Offline-First
16. Performance
17. Security
18. Accessibility
19. Reliability
20. Observability
21. Deployment & Scalability
22. Micro-Frontends
23. Design Systems
24. Specialized Systems
25. Case Studies
26. Interview Drills

## Deep study

Each numbered folder now contains a `deep-study.md` companion where the chapter needs additional interview/production depth. Existing study guides, problem bank and case studies remain complementary resources.

## Senior answer framework

Use this order in interviews:

1. Clarify requirements and non-goals.
2. State assumptions and estimate scale.
3. Define architecture and boundaries.
4. Assign state ownership.
5. Trace one critical data flow.
6. Define API/data contracts.
7. Explain caching and freshness.
8. Model loading, error, offline and concurrency states.
9. Address performance, security and accessibility.
10. Add reliability and observability.
11. Explain trade-offs.
12. Handle changed constraints.

## Interview practice

Use 10/20/30/45-minute drills. Practice unknown systems instead of memorized diagrams. Revisit the same system with different constraints: 10× data, offline mode, strict consistency, realtime updates, partial dependency outage, slow devices or security-sensitive data.

## Resources

- [Complete topic catalog](./topic-catalog.md)
- [60-problem design bank](./problem-bank.md)
- [Worked case studies](./real-world-designs/study-guide.md)
- [Real-world designs](./real-world-designs/)
