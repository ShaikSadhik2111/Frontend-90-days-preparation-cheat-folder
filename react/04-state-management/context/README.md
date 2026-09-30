# Context

## Connection
This topic explains how React turns inputs into UI and how state ownership drives application behavior.

## What it is
Context provides values to distant descendants without manually threading props through every intermediate component.

## Why it exists
A predictable rendering and ownership model lets you reason about re-renders, state preservation, remounts, navigation, and DOM changes.

## How it works
Reason through **update → render → element tree → reconciliation → commit → browser**. Component type and keys determine identity; route state is another explicit source of application state.

## Example
```tsx
items.map(item => <Row key={item.id} item={item} />);
```

## Real frontend use
Use this model to debug remounts, stale UI, list bugs, route transitions, and unnecessary rendering.

## Pitfalls
- Assuming every render means a DOM update.
- Using indexes as keys for reorderable lists.
- Treating route guards as backend security.
- Putting all state in global stores.

## Interview reasoning
Explain what changed, why React re-renders, which component identity is preserved, and when the browser DOM actually changes.

## Practical challenge
Build a list with insertion, deletion, sorting, and navigation. Predict which items preserve local state and verify your prediction.

## Connection to next topic
Continue to **Hooks and State Management**, where this rendering model explains Hook state and ownership.

## Official reference
https://react.dev/
