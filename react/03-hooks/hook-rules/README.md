# Rules of Hooks

> 1. Call Hooks **only at the top level** — never inside conditions, loops, nested functions or after an early return.
> 2. Call Hooks **only from React function components or custom Hooks**.

## Why: Hooks are matched by call order
React stores each component's hook state in a **linked list on its fiber**. On every render it walks the list in order: 1st `useState` call → slot 1, 2nd → slot 2…
```tsx
function Profile({ user }) {
  if (!user) return null;                 // ❌ early return before hooks
  const [tab, setTab] = useState("info"); // on renders where user is null, this hook isn't called
  useEffect(() => { /* ... */ }, []);     // → order changes → React reads the wrong slot → crash/bugs
}
```
✅ Fix: call all hooks first, then return early.
```tsx
function Profile({ user }) {
  const [tab, setTab] = useState("info");
  useEffect(() => { /* ... */ }, [user]);
  if (!user) return null;
  return <Tabs value={tab} onChange={setTab} />;
}
```
Conditional *logic* goes **inside** the hook: `useEffect(() => { if (!enabled) return; ... }, [enabled])`.

## Tooling
Use `eslint-plugin-react-hooks`:
- `rules-of-hooks` — catches conditional calls.
- `exhaustive-deps` — warns about missing effect/memo dependencies. Treat its warnings as bugs, not noise.

## Exception
`use()` (React 19) can be called conditionally — it's not stored by order like other hooks.

## Interview questions
1. **Why can't hooks be conditional?** State is matched by call order; skipping a call shifts all later hooks.
2. **Can you call hooks in a regular function?** Only if it's a custom hook (named `useX`) called from a component/hook.
3. **How do you run an effect conditionally?** Put the condition inside the effect.

Next → [useState](../useState/README.md)
