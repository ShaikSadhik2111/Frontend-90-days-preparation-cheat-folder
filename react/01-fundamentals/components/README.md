# Components

> A component is a **function that takes props and returns UI** (React elements). React decides *when* to call it, so the function must be **pure** during render.

## Mental model
```
props + state + context  ──►  Component()  ──►  React elements (a description of UI)
```
- Calling a component does not touch the DOM. It only returns a description. React compares descriptions and commits the minimal DOM changes later.
- Same inputs should give the same output. No side effects during render (no fetch, no `localStorage.setItem`, no mutating props, no `Math.random()` that affects output).

## How it works
```tsx
type UserCardProps = { name: string; role: "Admin" | "Viewer"; onSelect: (name: string) => void };

export function UserCard({ name, role, onSelect }: UserCardProps) {
  // render = pure calculation from inputs
  const label = role === "Admin" ? `${name} (admin)` : name;
  return (
    <button className="card" onClick={() => onSelect(name)}>
      {label}
    </button>
  );
}

// usage
<UserCard name="Priya" role="Admin" onSelect={(n) => console.log(n)} />
```
Rules:
- Name starts with a **capital letter** (`<userCard/>` is treated as an HTML tag).
- Return one root (use `<>...</>` Fragment for siblings).
- **Never define a component inside another component.** A new function is created every render → React sees a *different component type* → unmounts and remounts it → state and focus are lost.

```tsx
// ❌ Bug: input loses focus on every keystroke
function Form() {
  const [text, setText] = useState("");
  function Input() { return <input value={text} onChange={(e) => setText(e.target.value)} />; }
  return <Input />;
}
// ✅ Move Input outside Form and pass props
```

## Class vs function components (still asked)
| Class | Function + Hooks |
|---|---|
| `this.state`, `this.setState` | `useState` / `useReducer` |
| `componentDidMount/DidUpdate/WillUnmount` | `useEffect` (setup + cleanup) |
| `shouldComponentUpdate` / `PureComponent` | `React.memo` |
| Error boundaries **only** possible as classes | — |
Function components are the default; you'll still meet classes in older code and in error boundaries.

## How to split components
Split by **responsibility and state ownership**, not line count:
- Page/container: fetches data, owns server state, wires callbacks.
- Feature components: own their local UI state (open/closed, selected tab).
- Presentational components: props in → UI out (Button, Badge, Table row).

## Common bugs → fixes
| Bug | Fix |
|---|---|
| Component defined inside component → remounts, loses state | Define at module level |
| Side effect in render (fetch, subscribe) | Move to event handler or `useEffect` |
| Mutating props (`props.items.push(x)`) | Treat props as read-only; ask the parent to change state |
| Huge "god component" | Split by ownership; extract custom hooks for logic |

## Interview questions
1. **What is a component?** A pure function of props/state/context that returns React elements.
2. **Why must rendering be pure?** React may render many times, pause, or discard renders (Strict Mode, concurrent rendering). Side effects during render would run unpredictably.
3. **Element vs component?** A component is the function; an element is the plain object it returns (`{ type, props, key }`) — `<UserCard/>` creates an element.
4. **Why is defining a component inside another bad?** New type each render → remount → state lost + slower.

## Practice
Build `OrderTable` with filters, selection, pagination, loading, empty and error states. Decide which state belongs to the page, the table, the filter bar and each row — and write your reasoning as comments.

Next → [JSX](../jsx/README.md)
