# Props

> Props are the **inputs** to a component, passed from parent to child. They are **read-only** — a child never changes its props; it asks the parent (via a callback) to change state.

## One-way data flow
```
Parent state ──props──► Child
Parent ◄──callback(event)── Child
```
```tsx
type CounterProps = { value: number; onIncrement: () => void; label?: string };

function Counter({ value, onIncrement, label = "Count" }: CounterProps) {  // default value
  return <button onClick={onIncrement}>{label}: {value}</button>;
}

function Parent() {
  const [count, setCount] = useState(0);
  return <Counter value={count} onIncrement={() => setCount((c) => c + 1)} />;
}
```

## Useful patterns
```tsx
// spread rest props onto a native element (wrapper components)
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "ghost" };
function Button({ variant = "primary", className, ...rest }: ButtonProps) {
  return <button className={`btn btn-${variant} ${className ?? ""}`} {...rest} />;
}

// children is just a prop
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}

// render prop / slot props
<Table rows={rows} renderEmpty={() => <EmptyState />} />
```
- `key` and `ref` (React 18) are **not** normal props — the child can't read `props.key`. In React 19, `ref` can be passed as a normal prop to function components.
- Boolean shorthand: `<Input disabled />` = `disabled={true}`.

## Props vs state
| Props | State |
|---|---|
| Passed in by parent | Owned by the component |
| Read-only for the child | Changed with `setState` |
| Changing them = parent re-rendered | Changing it schedules a re-render |

## Prop drilling
Passing props through many layers that don't use them. Fixes, in order of preference:
1. **Composition** — pass the already-built element/children down instead of the data.
2. **Context** for app-wide, low-frequency values (theme, user, locale).
3. A store (Zustand/Redux) for frequently changing shared client state.

```tsx
// composition avoids drilling `user` through Layout and Sidebar
<Layout sidebar={<Sidebar><UserMenu user={user} /></Sidebar>} />
```

## Common bugs → fixes
| Bug | Fix |
|---|---|
| Copying props into state (`useState(props.value)`) and expecting it to update | Use the prop directly, or derive; if you need a reset, use `key` |
| Mutating `props.items.sort()` | `[...props.items].sort()` / `toSorted()` |
| New object/array/function props break `React.memo` children | Move constants outside, `useMemo`/`useCallback` when needed |

## Interview questions
1. **Can a child change props?** No — props are read-only; communication upward is via callbacks.
2. **What is prop drilling and how do you avoid it?** See above — composition first, then context/store.
3. **Why is `useState(props.x)` a bug?** Initial value is used only once; later prop changes are ignored.
4. **How do you pass data child → parent?** Parent passes a callback; child calls it with data.

## Practice
Build a `SearchBox` (controlled `value` + `onChange`) used by a `ProductPage` that filters a list. Then refactor a 4-level prop drill in your own code using composition.

Next → [State](../state/README.md)
