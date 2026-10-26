# Conditional rendering

> Choose what to render with plain JavaScript: early `return`, ternary `? :`, logical `&&`, or a lookup object. Model UI **states**, not scattered booleans.

## Patterns
```tsx
// 1. early return — clearest for loading/error
if (status === "loading") return <Spinner />;
if (status === "error") return <ErrorState onRetry={refetch} />;

// 2. ternary — either/or
{isLoggedIn ? <UserMenu /> : <LoginButton />}

// 3. && — something or nothing (watch out for 0)
{unread > 0 && <Badge count={unread} />}

// 4. lookup map — many variants
const icons = { online: <OnlineIcon />, offline: <OfflineIcon />, error: <ErrorIcon /> } as const;
{icons[device.status]}

// 5. return null to render nothing
if (!user) return null;
```

## Model states with one field (avoid impossible combinations)
```tsx
// ❌ 3 booleans → 8 combinations, some impossible (loading AND error?)
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [data, setData] = useState<User[] | null>(null);

// ✅ discriminated union
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string };

function Users({ state }: { state: State }) {
  switch (state.status) {
    case "idle": return null;
    case "loading": return <Spinner />;
    case "error": return <p role="alert">{state.error}</p>;
    case "success":
      return state.data.length === 0 ? <EmptyState /> : <UserList users={state.data} />;
  }
}
```
Don't forget the **empty** state — interviewers check for it.

## Hiding vs unmounting
| Technique | State kept? | DOM exists? | Use when |
|---|---|---|---|
| `{open && <Panel/>}` | ❌ reset on close | No | Default; cheaper when hidden |
| `<Panel hidden={!open}/>` / CSS `display:none` | ✅ kept | Yes | Tabs where you keep form input, expensive mount |
Also: changing the component *type* at the same position resets state — `{a ? <Input/> : <Textarea/>}`.

## Common bugs → fixes
| Bug | Fix |
|---|---|
| `{list.length && <List/>}` renders `0` | `list.length > 0 &&` |
| Nested ternaries unreadable | Early returns, a `switch`, or a lookup object |
| Flash of empty state before data | Initial status `"loading"` (or Suspense) |
| Losing input when toggling tabs | Keep mounted with `hidden`, or lift the state |

## Interview questions
1. **Ways to render conditionally?** if/early return, ternary, `&&`, lookup, `null`.
2. **Why does `0 &&` render 0?** `&&` returns the falsy left operand; React renders numbers.
3. **Unmount vs hide?** Unmount resets state and removes DOM; hide keeps both.
4. **How do you model loading/error/data?** Single status + discriminated union, or `useReducer` — no impossible states.

## Practice
Build a `DeviceList` that handles idle, loading (skeleton), error (with retry), empty and success states using a discriminated union.

Next → [Rendering model](../../02-rendering/rendering-model/README.md)
