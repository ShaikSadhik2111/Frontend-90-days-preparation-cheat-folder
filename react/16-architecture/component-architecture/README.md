# Component architecture

> Good component architecture makes ownership obvious: **who owns the data, who owns the state, who renders the UI**.

## Layers
```
Route/Page            → reads URL params, composes features, sets error/suspense boundaries
  Feature components  → own feature state, call hooks for data (useDevices), handle events
    UI components     → presentational, reusable, props in / events out (Table, Button, Modal)
Hooks                 → reusable logic (useDevices, usePermissions, useDebounce)
API layer             → typed client, endpoints, DTO → domain mapping, validation
```

## Guidelines
- **Single responsibility**: a component that fetches, transforms, manages forms *and* renders a table is doing four jobs — extract hooks and subcomponents.
- **Props API design**: small and explicit; booleans that conflict (`primary` + `secondary`) → one `variant` union; support `className`/`...rest` on wrappers; controlled + uncontrolled where useful.
- **Push state down, lift content up** (performance + clarity).
- **Keep business logic out of UI components** → pure functions/hooks you can unit test.
- **Boundaries**: error boundary + Suspense per route and per independent widget.
- **Avoid deep prop drilling** → composition, context for cross-cutting concerns.
- **Consistency** beats cleverness: same patterns for data fetching, forms, errors across the app.

## Smells to mention in interviews
Components > ~300 lines with many `useState`s; `useEffect` chains; copying props into state; boolean prop explosion; components reaching into other features' internals; utility files that import React state.

**Interview drill:** "Design the component tree for a device-management page with filters, table, details drawer and bulk actions — where does each piece of state live?"

Next → [Feature-based architecture](../feature-based-architecture/README.md)
