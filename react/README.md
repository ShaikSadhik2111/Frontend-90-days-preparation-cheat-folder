# React — interview learning path

Work through the folders in order. Each topic file has: **mental model → working code → common bugs and fixes → interview questions → a practice task**.

| # | Section | Topics |
|---|---|---|
| 01 | [Fundamentals](01-fundamentals/components/README.md) | [components](01-fundamentals/components/README.md) · [JSX](01-fundamentals/jsx/README.md) · [props](01-fundamentals/props/README.md) · [state](01-fundamentals/state/README.md) · [events](01-fundamentals/events/README.md) · [composition](01-fundamentals/children-and-composition/README.md) · [lifting state](01-fundamentals/lifting-state/README.md) · [derived state](01-fundamentals/derived-state/README.md) · [controlled vs uncontrolled](01-fundamentals/controlled-uncontrolled-forms/README.md) · [conditional rendering](01-fundamentals/conditional-rendering/README.md) |
| 02 | [Rendering](02-rendering/rendering-model/README.md) | [rendering model](02-rendering/rendering-model/README.md) · [render cycle](02-rendering/render-cycle/README.md) · [reconciliation](02-rendering/reconciliation/README.md) · [virtual DOM](02-rendering/virtual-dom/README.md) · [keys](02-rendering/keys/README.md) |
| 03 | [Hooks](03-hooks/hook-rules/README.md) | [rules](03-hooks/hook-rules/README.md) · [useState](03-hooks/useState/README.md) · [useEffect](03-hooks/useEffect/README.md) · [useRef](03-hooks/useRef/README.md) · [useMemo](03-hooks/useMemo/README.md) · [useCallback](03-hooks/useCallback/README.md) · [useReducer](03-hooks/useReducer/README.md) · [useContext](03-hooks/useContext/README.md) · [custom hooks](03-hooks/custom-hooks/README.md) · [useId](03-hooks/useId/README.md) · [useTransition](03-hooks/useTransition/README.md) · [useDeferredValue](03-hooks/useDeferredValue/README.md) · [useSyncExternalStore](03-hooks/useSyncExternalStore/README.md) · [useDebugValue](03-hooks/useDebugValue/README.md) · [useActionState](03-hooks/useActionState/README.md) · [useOptimistic](03-hooks/useOptimistic/README.md) |
| 04 | [State management](04-state-management/local-state/README.md) | [local state](04-state-management/local-state/README.md) · [context](04-state-management/context/README.md) · [Redux Toolkit](04-state-management/redux/README.md) · [Zustand](04-state-management/zustand/README.md) · [state architecture](04-state-management/state-architecture/README.md) |
| 05 | [Forms](05-forms/README.md) | [RHF + Zod](05-forms/README.md) · [form actions & useFormStatus](05-forms/form-actions-and-useFormStatus/README.md) |
| 06 | [Routing](06-routing/README.md) | [React Router](06-routing/README.md) · [protected routes](06-routing/protected-routes/README.md) |
| 07 | [Data fetching](07-data-fetching/README.md) | [overview](07-data-fetching/README.md) · [server state](07-data-fetching/server-state/README.md) · [TanStack Query](07-data-fetching/tanstack-query/README.md) · [caching & invalidation](07-data-fetching/caching-invalidation/README.md) |
| 08 | [Error handling](08-error-handling/README.md) | [strategy](08-error-handling/README.md) · [error boundaries](08-error-handling/error-boundaries/README.md) |
| 09–10 | Auth | [authentication](09-authentication/README.md) · [authorization](10-authorization/README.md) |
| 11 | [Performance](11-performance/memoization/README.md) | [memoization](11-performance/memoization/README.md) · [profiling](11-performance/profiling/README.md) · [code splitting](11-performance/code-splitting/README.md) · [lazy loading](11-performance/lazy-loading/README.md) · [virtualization](11-performance/virtualization/README.md) · [Web Vitals](11-performance/web-vitals/README.md) |
| 12 | [Testing](12-testing/unit-testing/README.md) | [unit](12-testing/unit-testing/README.md) · [component (RTL)](12-testing/component-testing/README.md) · [integration & E2E](12-testing/integration-testing/README.md) |
| 13 | [Accessibility](13-accessibility/README.md) | semantic HTML, keyboard, ARIA, focus |
| 14 | [React 19](14-modern-react/react-19-actions/README.md) | Actions, new hooks, `use`, ref as prop, compiler |
| 15 | [Advanced](15-advanced-react/concurrent-rendering/README.md) | [concurrent rendering](15-advanced-react/concurrent-rendering/README.md) · [Suspense](15-advanced-react/suspense/README.md) · [hydration](15-advanced-react/hydration/README.md) · [streaming SSR](15-advanced-react/streaming/README.md) · [Server Components](15-advanced-react/server-components/README.md) |
| 16 | [Architecture](16-architecture/component-architecture/README.md) | [component architecture](16-architecture/component-architecture/README.md) · [feature folders](16-architecture/feature-based-architecture/README.md) · [design systems](16-architecture/design-systems/README.md) · [reusable components](16-architecture/reusable-components/README.md) · [patterns](16-architecture/frontend-patterns/README.md) |
| 17 | [Interview questions](17-interview-questions/README.md) | 50 questions with model answers + code-reading round |
| 18 | [Depth & debugging](18-depth-and-interview-engineering/README.md) | [10 debugging case studies](18-depth-and-interview-engineering/case-studies.md) |

## How to study a topic
1. Read the mental model and run the code in a sandbox (StackBlitz/CodeSandbox or `code/machine-coding`).
2. Break it on purpose (remove the cleanup, use index keys, mutate state) and watch what goes wrong.
3. Close the file and answer its interview questions out loud.
4. Do the practice task.

## Hands-on practice
- `code/machine-coding` — 10 interview problems (Autocomplete, Data table, Modal, Tabs, …) in React + TypeScript with tests.
- `code/polyfills` — JS utilities you'll be asked to write (debounce, Promise.all, …) with tests.

Official docs: https://react.dev — the "Learn" section and "You Might Not Need an Effect" are must-reads.
