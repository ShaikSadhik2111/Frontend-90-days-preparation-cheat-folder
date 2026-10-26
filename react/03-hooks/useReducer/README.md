# useReducer

> `const [state, dispatch] = useReducer(reducer, initialState)` moves update logic into a **pure function** `(state, action) => newState`. Great for state with **many transitions** or values that change together.

## Example — typed reducer
```tsx
type State = { status: "idle" | "loading" | "success" | "error"; items: Device[]; error?: string };
type Action =
  | { type: "fetch" }
  | { type: "success"; items: Device[] }
  | { type: "failure"; error: string }
  | { type: "remove"; id: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "fetch":   return { ...state, status: "loading", error: undefined };
    case "success": return { status: "success", items: action.items };
    case "failure": return { ...state, status: "error", error: action.error };
    case "remove":  return { ...state, items: state.items.filter((d) => d.id !== action.id) };
    default: {
      const _exhaustive: never = action;   // TS error if a case is missing
      return state;
    }
  }
}

function Devices() {
  const [state, dispatch] = useReducer(reducer, { status: "idle", items: [] });
  // dispatch({ type: "fetch" }) ...
}
```

## Why use it
- All transitions in one place → easier to reason about and to **unit-test without rendering**.
- Event handlers describe **what happened** (`dispatch({ type: "remove", id })`) instead of how to update.
- `dispatch` is **stable** — safe to pass down or use in effects without deps churn.
- Combine with Context for a small app-wide store (`StateContext` + `DispatchContext`).
- It's the same mental model as Redux (actions + reducers) — easy to explain in interviews.

## useState vs useReducer
| useState | useReducer |
|---|---|
| Independent, simple values | Related values / complex transitions |
| Logic in handlers | Logic in one pure function |
| Less code | More structure, testable |

## Rules
Reducers must be **pure**: no API calls, no random IDs generated inside (pass them in the action), no mutation (return new objects; or use Immer's `useImmerReducer`).

## Interview questions
1. **When do you prefer useReducer?** Multiple related fields, state machines, next state depends on previous in complex ways.
2. **Why must reducers be pure?** React may call them more than once (Strict Mode); purity keeps results predictable.
3. **How is it related to Redux?** Same reducer pattern, but local to a component; Redux adds a global store, middleware, devtools.

## Practice
Rewrite a form with 6 `useState`s into a `useReducer` with actions `change`, `submit`, `success`, `failure`, `reset`. Write unit tests for the reducer only. See `code/machine-coding/src/components/TodoApp/todoReducer.ts`.

Next → [useContext](../useContext/README.md)
