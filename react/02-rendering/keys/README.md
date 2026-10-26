# Keys

> A `key` tells React **which item is which** across renders in a list. Keys must be **stable, unique among siblings, and not derived from index** when the list can change order.

## Why keys matter
```tsx
const [todos, setTodos] = useState([{ id: "a", text: "A" }, { id: "b", text: "B" }]);

// ❌ index as key + inputs inside rows
{todos.map((t, i) => <Row key={i} todo={t} />)}
// Add a todo at the TOP → React thinks row 0 is still "the same" row,
// so the uncontrolled <input> text / checkbox / focus stays on the wrong item.

// ✅ stable id
{todos.map((t) => <Row key={t.id} todo={t} />)}
```
Index keys are OK only if the list is static (never reordered, filtered or inserted into) **and** rows have no state.

## Rules
- Unique among **siblings** only (not globally).
- Generate ids when data is created (`crypto.randomUUID()`), **never** in render: `key={Math.random()}` remounts every row on every render (slow, loses state).
- Put the key on the outermost element returned in `map` (or `<Fragment key={id}>`).
- `key` is not passed as a prop to the child.

## Using key to reset state on purpose
```tsx
// When the selected user changes, throw away the old form state completely
<EditUserForm key={user.id} user={user} />
```
Cleaner than an effect that resets many fields.

## Interview questions
1. **Why do lists need keys?** So reconciliation can match items between renders and preserve the right state/DOM.
2. **Why not use index?** Breaks when items are inserted/removed/reordered — state attaches to the wrong item.
3. **What happens with random keys?** Every render remounts every item.
4. **Other use of key?** Force remount/reset of a component.

## Practice
Reproduce the index-key bug with a list of inputs and a "prepend" button. Fix it with ids. Then use `key` to reset a form when switching between users.

Next → [Hooks overview](../../03-hooks/hook-rules/README.md)
