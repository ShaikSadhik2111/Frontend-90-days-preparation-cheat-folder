# Derived state

> If a value **can be calculated from props or existing state, don't store it in state** — calculate it during render. Storing it creates two sources of truth that can drift apart.

## ❌ Storing derived values
```tsx
const [items, setItems] = useState<Item[]>([]);
const [total, setTotal] = useState(0);
useEffect(() => {                         // extra render + can get out of sync
  setTotal(items.reduce((s, i) => s + i.price * i.qty, 0));
}, [items]);
```
## ✅ Derive during render
```tsx
const [items, setItems] = useState<Item[]>([]);
const total = items.reduce((s, i) => s + i.price * i.qty, 0);   // always correct
```
If the calculation is genuinely expensive (measured!), memoize it:
```tsx
const visible = useMemo(() => filterAndSort(rows, query, sort), [rows, query, sort]);
```

## Store IDs, not copies
```tsx
// ❌ selectedItem is a copy — edits to items won't reflect in it
const [selectedItem, setSelectedItem] = useState<Item | null>(null);
// ✅ store the id, derive the object
const [selectedId, setSelectedId] = useState<string | null>(null);
const selected = items.find((i) => i.id === selectedId) ?? null;
```

## Resetting state when a prop changes
```tsx
// ❌ effect to reset
useEffect(() => { setDraft(""); }, [contactId]);
// ✅ give the component a key — React creates fresh state
<ChatInput key={contactId} contactId={contactId} />
```
For adjusting *part* of the state on prop change, React docs allow setting state during render with a "previous value" check — but `key` or deriving is usually cleaner.

## Typical derived values in real apps
Filtered/sorted/paginated lists · totals and counts · `isValid` of a form · `fullName` from first + last · `hasChanges` (compare draft vs saved) · selected object from selected id · status flags from a single `status` field.

## Common bugs → fixes
| Bug | Fix |
|---|---|
| `useEffect` that only calls `setX(compute(y))` | Compute `x` during render |
| Copy of prop in state doesn't update | Use the prop directly or reset with `key` |
| Stale selected object after list update | Store the id |
| Recomputing a heavy value every render (measured) | `useMemo` |

## Interview questions
1. **What is derived state and why avoid storing it?** Data computable from other data; storing it duplicates the truth and needs syncing.
2. **"You might not need an Effect" — examples?** Derived data, resetting state on prop change, handling user events, chaining state updates.
3. **When is `useMemo` justified?** Expensive calculation (profiled), or to keep a stable reference for memoized children/effect deps.

## Practice
Take a table with search + sort + pagination. Implement it with only 3 pieces of state (`query`, `sort`, `page`) and derive everything else. Compare with the Data table in `machine-coding`.

Next → [Controlled vs uncontrolled forms](../controlled-uncontrolled-forms/README.md)
