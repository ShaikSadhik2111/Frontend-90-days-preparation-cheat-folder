# React — Connected Interview Learning Path

React is learned here as a connected **01 → 17** progression rather than a collection of disconnected API notes.

## Study order

1. **Fundamentals** — components, JSX, props, state, events, composition
2. **Rendering** — render model, render cycle, reconciliation, keys
3. **Hooks** — state, effects, refs, context, custom Hooks, performance Hooks
4. **State Management** — local state, Context, Redux, Zustand, state architecture
5. **Forms** — controlled/uncontrolled forms and modern Actions
6. **Routing** — navigation and protected UI boundaries
7. **Data Fetching** — server state, caching, invalidation, TanStack Query
8. **Error Handling** — boundaries, async failures, validation and recovery
9. **Authentication** — identity and session flows
10. **Authorization** — permissions and UI access boundaries
11. **Performance** — profiling, memoization, code splitting, virtualization, Web Vitals
12. **Testing** — unit, component, integration
13. **Accessibility** — semantic and keyboard-accessible UI
14. **Modern React** — Actions, optimistic UI, form status
15. **Advanced React** — Suspense, hydration, streaming, concurrency, Server Components
16. **Architecture** — scalable components, features, design systems, patterns
17. **Interview Questions** — runtime reasoning, debugging, trade-offs, implementation

## Core learning chain

**JavaScript → Components → Props/State → Rendering → Hooks → State Ownership → Forms/Data → Performance → Architecture → Interview Reasoning**

## Standard for every topic

Every topic should answer:

- **Connection:** why this comes after the previous topic
- **What:** precise definition and mental model
- **Why:** the problem it solves
- **How:** runtime/rendering behavior
- **Example:** working code
- **Real frontend use:** production scenario
- **Pitfalls:** common mistakes and edge cases
- **Interview reasoning:** how to explain and debug it
- **Practical challenge:** implement and break/fix it
- **Next connection:** why the next topic is needed

## React mental model

Keep these principles connected throughout the roadmap:

**Render is pure → props/state are snapshots → updates schedule work → reconciliation uses identity → commit changes the host UI → events handle user actions → Effects synchronize external systems.**

Avoid using Effects as a general data-flow mechanism; if a value can be derived during render or work is directly caused by a user event, an Effect may be unnecessary.

## Current React topics

The roadmap includes modern React concepts such as Actions, optimistic UI, form status, Suspense, Server Components, and the React Compiler. React's current documentation lists **React 19.3** as the latest major version.

## Official source of truth

https://react.dev/


## Depth standard — this is a learning source, not a cheat sheet

React notes are intentionally written at the same depth as the JavaScript and TypeScript sections. A topic is not considered complete because it has a definition and syntax. It should let you **learn the concept from scratch, reason about runtime behavior, implement it, debug it, and explain the trade-offs in a 20 LPA+ frontend interview**.

For each significant topic, study in this order:

1. **Connection** — what previous concept makes this topic necessary?
2. **Problem** — what real problem does React solve here?
3. **Mental model** — what should you visualize while reasoning?
4. **Mechanics** — what happens during render, update, commit, effects, or async work?
5. **Code** — simple → intermediate → production-style examples.
6. **Frontend use case** — where this appears in a real application.
7. **Failure modes** — stale closures, identity bugs, race conditions, cleanup, incorrect dependencies, unnecessary renders, etc.
8. **Debugging** — reproduce a realistic bug and explain the root cause.
9. **Interview reasoning** — answer why, when, what-if, and trade-off questions.
10. **Practical challenge** — implement the concept instead of only reading it.
11. **Next connection** — explain why the following topic naturally follows.

### The senior frontend mental model

Keep these connected throughout the entire section:

**JavaScript closures/references → React render snapshots → state updates schedule work → reconciliation uses identity → commit updates the host UI → events represent user intent → Effects synchronize external systems → server state introduces caching/invalidation → performance requires measurement → architecture controls ownership and coupling.**

The goal is not to memorize React APIs. The goal is to be able to look at unfamiliar React code and reason about **what will render, why it will render, what state belongs where, what can race, what can leak, what can be optimized, and how the design should evolve as the application grows**.
