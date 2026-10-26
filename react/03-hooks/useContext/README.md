# useContext

> Context lets a parent provide a value to **any descendant** without passing props through every level. `useContext(Ctx)` reads the nearest `<Ctx.Provider value>` above.

## Pattern with a safe custom hook
```tsx
type Auth = { user: User | null; login: (u: User) => void; logout: () => void };
const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const login = useCallback((u: User) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]); // stable object
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
```
(React 19 also allows `<AuthContext value={value}>` without `.Provider`.)

## Re-render behaviour (most-asked)
- When the provider's `value` changes (by `Object.is`), **every component that reads that context re-renders** — `React.memo` does not stop it.
- `value={{ user, login }}` inline creates a new object each render → all consumers re-render every time the provider re-renders. Fix with `useMemo`.
- Split contexts to reduce fan-out: e.g. `UserContext` vs `ThemeContext`, or `StateContext` vs `DispatchContext` (dispatch never changes).

## Good uses vs bad uses
| Good | Better elsewhere |
|---|---|
| Theme, locale, current user, permissions, feature flags | High-frequency data (mouse position, live telemetry) → store with selectors (Zustand/Redux) |
| Dependency injection (API client, analytics) | Server data → TanStack Query |
| Compound components (Tabs, Accordion) | Avoiding 1–2 levels of props → just pass props or compose |

Context is **not a state manager**: it's a transport. State still lives in `useState`/`useReducer`.

## Interview questions
1. **What problem does context solve?** Prop drilling for widely needed values.
2. **Why do all consumers re-render?** Context has no selector; any value change notifies all readers.
3. **How do you optimise context?** Memoize value, split contexts, separate state/dispatch, move frequently changing state into a store.
4. **Context vs Redux?** Context = DI mechanism; Redux = predictable global store with selectors, middleware, devtools.

## Practice
Build `ThemeProvider` + `useTheme` with dark mode via CSS variables. Then add a counter to the same context and use the Profiler to show which components re-render; fix it by splitting contexts.

Next → [Custom hooks](../custom-hooks/README.md)
