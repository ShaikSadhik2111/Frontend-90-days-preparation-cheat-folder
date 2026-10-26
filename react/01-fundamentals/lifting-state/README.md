# Lifting state up

> When two components need the **same changing data**, move the state to their **closest common parent** and pass it down as props, with callbacks to change it. One source of truth.

## Example — filter bar and results share a query
```tsx
function ProductsPage() {
  const [query, setQuery] = useState("");                 // lifted here
  const visible = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <SearchBar value={query} onChange={setQuery} />     {/* controlled by parent */}
      <ResultCount count={visible.length} />
      <ProductList items={visible} />
    </>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} aria-label="Search" />;
}
```

## Controlled vs uncontrolled *components*
- **Uncontrolled**: the component owns its own state (`<Accordion defaultOpen="a" />`). Easy to use, hard to coordinate.
- **Controlled**: the parent owns the state (`<Accordion open={open} onChange={setOpen} />`). Flexible, more wiring.
- Good reusable components support **both**:
```tsx
function Toggle({ on: controlled, defaultOn = false, onChange }: { on?: boolean; defaultOn?: boolean; onChange?: (v: boolean) => void }) {
  const [internal, setInternal] = useState(defaultOn);
  const on = controlled ?? internal;
  const toggle = () => { const next = !on; if (controlled === undefined) setInternal(next); onChange?.(next); };
  return <button aria-pressed={on} onClick={toggle}>{on ? "On" : "Off"}</button>;
}
```

## Where should state live? (decision steps)
1. List every component that **reads** the state.
2. Find their closest common parent → state lives there (or higher).
3. If that parent is far away and many layers just pass it through → consider composition, context, or a store.
4. Server data → don't lift copies around; use a server-state cache (TanStack Query) and read it where needed.
5. URL-worthy state (filters, page, tab) → put it in the URL (`useSearchParams`) so it survives refresh and sharing.

## Trade-off
Lifting too high → every keystroke re-renders a big tree. Keep state **as low as possible, as high as necessary** (colocation).

## Common bugs → fixes
| Bug | Fix |
|---|---|
| Two components keep their own copies and drift out of sync | Lift to one owner |
| Child syncs parent with `useEffect(() => onChange(local), [local])` | Call `onChange` directly in the event handler |
| Lifted state makes whole page slow | Move it back down / split components / memo the heavy part |

## Interview questions
1. **What does "single source of truth" mean in React?** Each piece of state has exactly one owner; others receive it via props.
2. **When do you lift state vs use context?** Lift for a few nearby components; context when many distant components need low-frequency values.
3. **What makes a component controlled?** Its key state comes from props and changes are reported via callbacks.

## Practice
Build a temperature converter (°C and °F inputs that stay in sync) — the classic lifting-state exercise. Then make a `Tabs` component that works both controlled and uncontrolled.

Next → [Derived state](../derived-state/README.md)
