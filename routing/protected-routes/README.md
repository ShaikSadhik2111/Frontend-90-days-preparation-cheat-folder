# Protected Routes

## Connection
This topic explains how React turns component inputs into UI and how state ownership drives application behavior.

## What it is
Protected routes provide client-side navigation UX for authenticated or authorized areas but are not a security boundary.

## Why it exists
Without a rendering and ownership model, React behavior looks magical. With one, you can predict re-renders, identity changes, state preservation, and navigation boundaries.

## How it works
Reason through **state/props update → render → element tree → reconciliation → commit → browser**. Identity is determined by component type and keys; URL state is another explicit source of application state.

## Example
```tsx
items.map(item => <Row key={item.id} item={item} />);
```

## Real frontend use
Use this model to debug remounts, stale UI, list bugs, route transitions, and unnecessary rendering.

## Pitfalls
- Assuming every render means a DOM update.
- Using array indexes as keys for reorderable lists.
- Treating routing guards as backend security.
- Putting all state in global stores instead of choosing the smallest owner.

## Interview reasoning
Explain what changed, why React re-renders, which component identity is preserved, and when the browser DOM actually changes.

## Practical challenge
Build a list with insertion, deletion, sorting, and navigation. Predict which items preserve local state and verify your prediction.

## Connection to next topic
Continue to **Hooks and State Management**, where this rendering model explains why Hook state persists and why ownership matters.

## Official reference
https://react.dev/
