# Local state & colocation

> Start every piece of state **as local as possible** (`useState`/`useReducer` inside the component that uses it). Move it up only when another component needs it.

## Why local first
- Fewer components re-render when it changes.
- Easier to delete/refactor the feature.
- No global store boilerplate for things like `isOpen`, `hoveredRow`, `draftText`.

## The escalation ladder
```
useState in the component
   ↓ siblings need it
lift to common parent
   ↓ many distant components need it, changes rarely
Context
   ↓ shared, changes often, many writers / need selectors, devtools
Zustand / Redux Toolkit
```
Separate ladders for other kinds of state:
- **Server data** → TanStack Query / RTK Query (not useState copies).
- **URL state** (filters, page, selected tab) → router search params.
- **Form state** → React Hook Form for large forms.

## Example of colocation
```tsx
// ❌ App owns `isMenuOpen` → whole app re-renders when menu toggles
// ✅ Header owns it
function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return <><button onClick={() => setMenuOpen((o) => !o)}>Menu</button>{isMenuOpen && <Menu />}</>;
}
```

## Interview questions
1. **How do you decide where state lives?** Closest common owner of readers; separate server/URL/form state.
2. **When would you introduce a global store?** Many unrelated components read/write the same client state frequently, or you need middleware/devtools/time-travel.

Next → [Context](../context/README.md)
