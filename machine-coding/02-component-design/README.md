# 02 — Component design in machine coding

## Draw the tree first (30 seconds on paper)
```
App
 └─ TodoApp (owns todos via useReducer, filter state)
     ├─ TodoForm (local input state, onAdd)
     ├─ FilterBar (filter, onChange)
     ├─ TodoList (visible todos — derived)
     │    └─ TodoItem (todo, onToggle, onDelete, onEdit; local `editing` state)
     └─ Footer (remaining count — derived, onClearDone)
```

## Props API rules
- Data down, events up: `items`, `value` in; `onChange`, `onSelect`, `onDelete(id)` out.
- Name callbacks by **intent** (`onSelect`), handlers by **implementation** (`handleClick`).
- Prefer a `variant` union over many booleans.
- Pass ids to callbacks, not whole objects, when the parent owns the data.
- Generic components for reuse: `List<T>({ items, getKey, renderItem })`.

## Split when
A component owns unrelated state, has deep JSX nesting, or you want to memoize a hot part (rows). Don't split into 15 files during a 60-minute round — one file with several components is fine; mention how you'd organise it in a real codebase.

Next → [03 State ownership](../03-state-ownership/README.md)
