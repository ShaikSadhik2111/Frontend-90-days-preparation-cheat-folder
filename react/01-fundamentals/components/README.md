# Components

## Connection
This topic connects React fundamentals to production forms and asynchronous application behavior.

## What it is
Components are JavaScript functions that return React nodes. React controls when they render, so rendering should be pure.

## Why it exists
Real interfaces need predictable loading, success, empty, error, validation, and recovery states. The right boundary prevents those states from becoming scattered flags.

## How it works
Start with explicit inputs and state ownership. Then model the UI states and transitions before choosing an API or library.

## Example
```tsx
function Example({ loading, error, data }) {
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;
  return <Result data={data} />;
}
```

## Real frontend use
Use this for forms, search, checkout, dashboards, route-level data, and reusable application components.

## Pitfalls
- Mixing server state with local UI state.
- Hiding async errors in generic catch blocks.
- Using an Error Boundary for event-handler errors.
- Using Effects for data transformation that belongs in render.
- Building one giant form state object without clear ownership.

## Interview reasoning
Explain the state machine, ownership, failure boundary, retry/recovery strategy, and what React is doing during render and commit.

## Practical challenge
Build a form or data-driven screen with loading, success, empty, validation, and failure states. Add a recovery action.

## Connection to next topic
Continue toward **Hooks, state management, and modern React Actions**.

## Official reference
https://react.dev/


## Deep reasoning
A component maps props, state, and context to a React element tree. Keep rendering pure and make ownership explicit: the component that owns changing data should usually own that state, while children receive the minimum inputs and callbacks they need.

### Production reasoning
Split components around responsibility and state ownership, not arbitrary line counts. Avoid components that simultaneously own data fetching, complex business rules, layout, and low-level UI when separate boundaries make changes safer.

### Interview drill
Design an OrderTable with filters, selection, pagination, loading, empty, and error states. Explain which state belongs to the page, table, filter controls, and row components.

## Deep reasoning
A component maps props, state, and context to a React element tree. Keep rendering pure and make ownership explicit: the component that owns changing data should usually own that state, while children receive the minimum inputs and callbacks they need.

### Production reasoning
Split components around responsibility and state ownership, not arbitrary line counts. Avoid components that simultaneously own data fetching, complex business rules, layout, and low-level UI when separate boundaries make changes safer.

### Interview drill
Design an OrderTable with filters, selection, pagination, loading, empty, and error states. Explain which state belongs to the page, table, filter controls, and row components.