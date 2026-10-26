# State

> State is a component's **memory between renders**. Updating state **schedules a re-render**; each render sees a **snapshot** of state that never changes during that render.

## Snapshot model (most-asked concept)
```tsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);      // 0 — this render's snapshot
  }
  // after click → 1 (both calls computed 0 + 1)

  function handleClickFixed() {
    setCount((c) => c + 1);  // updater function: uses the latest queued value
    setCount((c) => c + 1);
  }
  // after click → 2
}
```
- `setState` does not change the variable immediately. It queues an update; React re-renders and the *next* render gets the new value.
- **Batching:** all updates in the same event (and since React 18, in timeouts/promises too) are combined into one render.

## Updating objects and arrays — immutably
React compares old and new state with `Object.is`. Same reference → no re-render.
```tsx
const [user, setUser] = useState({ name: "A", address: { city: "Pune" } });
setUser({ ...user, name: "B" });                                   // ✅ new object
setUser((u) => ({ ...u, address: { ...u.address, city: "Hyderabad" } })); // ✅ nested copy

const [todos, setTodos] = useState<Todo[]>([]);
setTodos((t) => [...t, newTodo]);                       // add
setTodos((t) => t.filter((x) => x.id !== id));          // remove
setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x))); // update

// ❌ no re-render: same reference
todos.push(newTodo); setTodos(todos);
```
Deeply nested state is painful → flatten/normalise it, or use Immer (`produce`) — Redux Toolkit uses Immer internally.

## Lazy initial state
```tsx
const [rows] = useState(() => expensiveParse(csv)); // function runs only on first render
const [rows] = useState(expensiveParse(csv));       // ❌ runs every render (result ignored)
```

## What should be state?
Ask: does it change over time? Can it be computed from props/other state? Is it needed for rendering?
- Can be computed → **don't store it** (see derived state).
- Not used for rendering (timer id, previous value) → `useRef`.
- Shared by siblings → lift it up.
- Comes from the server → server-state cache (TanStack Query), not `useState` copies.

## State is tied to position in the tree
React keeps state for a component at the same **position + type**. Rendering a different component type at that position, or changing its `key`, resets state.
```tsx
{isAdmin ? <Profile key="admin" /> : <Profile key="user" />}  // different keys → separate state
<Chat key={contactId} contact={contact} />                    // reset draft when contact changes
```

## Common bugs → fixes
| Bug | Fix |
|---|---|
| Reading state right after `setState` and getting old value | Use the value you passed, or compute in the next render / effect |
| Multiple `setX(x + 1)` only add 1 | Updater function `setX(x => x + 1)` |
| Mutation → UI doesn't update | Create new objects/arrays |
| `isLoading`, `isError`, `data` contradicting each other | One `status` field / discriminated union / `useReducer` |

## Interview questions
1. **Is `setState` async?** It's *scheduled*, not a promise. The current render's variable never changes; React re-renders later (batched).
2. **What is batching?** Grouping multiple state updates into one render; automatic everywhere since React 18 (`flushSync` opts out).
3. **Why immutability?** Cheap change detection by reference, predictable renders, enables memoization and time-travel debugging.
4. **When do you use the updater form?** When the new value depends on the previous one, especially with multiple updates or async callbacks.

## Practice
Build a shopping cart: add, remove, change quantity, total (derived!). Then break it by mutating the array and observe why the UI stops updating.

Next → [Events](../events/README.md)
