> **Superseded:** the current day-by-day plan is [PLAN.md](PLAN.md) (continues from JS ✅, TS ✅, React in progress). This file is kept for history.

# 60-Day Frontend Interview Preparation Roadmap

This is the current execution roadmap for the October–November sprint. The repository is broader than the sprint; this file defines what to study first.

## Goal
Become interview-ready for senior/product frontend roles by combining:
JavaScript → TypeScript → React → Web Platform → DSA → AI → Frontend System Design → Machine Coding → Projects → Interview Revision
Backend is intentionally deferred until this sprint is complete, except for minimum API concepts required by projects.

## Operating model
Do not study every track deeply every day.
- Primary topic: the week's main learning track.
- DSA: every morning, with 2 LeetCode problems/day as the default target.
- AI: continuous daily learning.
- Project application: apply the week's concepts to the flagship project.
- Revision: begins during each topic and becomes intensive in Weeks 7–8.

## 8-week execution plan
### Week 1 — JavaScript
Fundamentals through advanced language/runtime topics: values, arrays, objects, functions, scope, execution context, this, closures, prototypes, collections, HOFs, callbacks, functional patterns, promises, async/await, errors, event loop, cancellation, modules, generators, debounce/throttle, memory/GC, Proxy/Reflect and polyfills.
DSA: arrays + strings. AI: LLM fundamentals + API/prompting foundations. Project: foundation and architecture.

### Week 2 — TypeScript
Inference, types, aliases, interfaces, functions, unions/intersections, tuples, classes, narrowing, guards, discriminated unions, unknown/any, never, generics, constraints, keyof, typeof, indexed access, utilities, mapped/conditional/template literal types, assertions/satisfies, compatibility, modules, tsconfig, API/domain modeling, React typing and advanced declarations/augmentation.
DSA: hashing + two pointers. AI: prompting + structured output + context. Project: typed domain model and core flows.

### Week 3 — React Fundamentals
JSX, components, props, state, events, composition, controlled/uncontrolled inputs, derived state, rendering, reconciliation, keys and core Hooks.
DSA: sliding window + prefix sum. AI: context/structured-output patterns. Project: application shell and core features.

### Week 4 — Advanced React
State architecture, reducers, Context, Redux/Zustand, forms, routing, data fetching, server state, TanStack Query, caching/invalidation, errors, auth/authz, performance, testing, accessibility, Actions, optimistic UI, Suspense, hydration, concurrency, Server Components, React Compiler and architecture/design systems.
DSA: stack/queue/linked list/binary search. AI: RAG/retrieval/tool fundamentals. Project: production-grade React flows.

### Week 5 — Web Platform
HTML/semantics, CSS/layout, DOM/CSSOM, events, rendering pipeline, storage, HTTP, Fetch, caching, Workers, Service Workers/PWA, WebSockets/SSE, browser security, accessibility, performance, DevTools, Web Components and modern browser APIs.
DSA: sorting/heap/intervals/matrix. AI: RAG/evaluation/production patterns. Project: browser/network/performance capabilities.

### Week 6 — System Design + Machine Coding
System Design: requirements, estimation, architecture, state, data flow, API contracts, fetching, caching, large data, search, optimistic UI, realtime, offline, performance, security, accessibility, reliability, observability, deployment, micro-frontends, design systems and case studies.
Machine Coding: component design, state, forms, async UI, concurrency, pagination, grids, virtualization, autocomplete, caching, optimistic UI, realtime, file upload, drag/drop, undo/redo, testing and performance.
DSA: trees/graphs/greedy/DP/bit/monotonic + mixed practice. AI: production AI architecture and interview revision. Project: flagship implementation + architecture.

### Week 7 — Full Revision
Rotate JavaScript, TypeScript, React, Web Platform, System Design, Machine Coding and AI. DSA: 2 problems/day + spaced repetition. Project: hardening, testing, performance and documentation.

### Week 8 — Interview Sprint
Mixed technical questions, timed DSA, machine coding, system-design drills, project walkthroughs, debugging exercises and mock interviews. DSA: 2 problems/day + mixed sets. AI: interview revision. Project: flagship polish + portfolio/blog.

## Daily baseline
- DSA: 60 minutes
- LeetCode: 2 problems/day by default; reduce to 1 deep problem when a topic requires substantial reasoning.
- Main learning: 2–3 hours
- AI: 30–45 minutes
- Project: about 1 hour
- Short revision: 15–20 minutes
Consistency matters more than forcing an unrealistic number of hours.

## LeetCode protocol
Understand → constraints → brute force → bottleneck → observation → pattern → invariant/state → implementation → dry run → complexity → edge cases → variation.
Use three statuses: 🔴 could not solve independently; 🟡 solved with hint; 🟢 solved and explained independently.

## Project strategy
Build one flagship project throughout the sprint and apply each week's learning to it.
Recommended flagship: FlowForge — an intelligent workflow/operations platform.
A second specialized project and personal engineering portfolio/blog can follow once the flagship reaches a stable MVP.

## Interview strategy
Early interviews are calibration, not the primary preparation loop. Use them to identify gaps, return to the relevant repository topic, fix the gap, then continue toward target-company interviews.

## Intentionally deferred until after this sprint
- Angular + AngularJS deep interview track
- Dedicated testing track beyond React/Machine Coding coverage
- Vite/Webpack/Babel/build-pipeline deep track
- Git + CI/CD deep track
- Node.js/Express/backend
- Databases and deeper full-stack infrastructure
AngularJS → React migration remains an important interview story and should be prepared from your real professional experience during interview-specific revision.

## Completion definition
At the end of 60 days:
- Explain JS/TS/React deeply rather than recite definitions.
- Reason about the browser and network underneath React.
- Solve DSA problems by deriving patterns rather than memorizing solutions.
- Build representative machine-coding problems under time pressure.
- Design frontend systems and defend trade-offs.
- Explain production AI features and their failure/security/cost implications.
- Have a flagship project demonstrating these skills.
- Communicate the AngularJS → React migration experience clearly.

This is the execution plan. The topic folders remain the permanent knowledge base and can be deepened after the sprint without changing the overall architecture.