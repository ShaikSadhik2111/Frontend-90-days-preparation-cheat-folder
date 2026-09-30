# Tanstack Query

## Connection
This is part of the React fundamentals-to-production chain. Learn it before moving deeper into Hooks, state architecture, and advanced rendering.

## What it is
TanStack Query provides server-state primitives for queries, mutations, caching, invalidation, retries, and request status.

## Why it exists
React becomes predictable when UI is derived from explicit inputs and ownership. This concept gives you a building block for that model.

## How it works
Start with **props/state → render → React element tree → reconciliation → commit**. Keep rendering pure and move user-triggered side effects into event handlers.

## Example
```tsx
function Component() { return <div>UI</div>; }
```

## Real frontend use
Use it in reusable cards, dashboards, forms, tables, navigation, loading/empty states, and feature-level components.

## Common mistakes
- Mutating props or state.
- Mixing derived data with source state.
- Calling component functions directly instead of rendering JSX.
- Using too many boolean flags when composition would be clearer.
- Rendering accidental falsy values.

## Interview reasoning
Explain what problem it solves, where the data comes from, what causes a re-render, and how you would keep the component predictable and testable.

## Practical challenge
Build a small component with this concept, then explain its data flow from parent input to rendered output.

## Next connection
Move next to **Hooks and state ownership** after you can explain this behavior without memorizing the notes.

## Official reference
https://react.dev/
