# React 19 — Actions and what's new

> React 19 (stable since December 2024) centres on **Actions**: async functions that React tracks for pending state, errors, optimistic updates and forms.

## Actions
```tsx
function RenameDevice({ device }: { device: Device }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave(name: string) {
    startTransition(async () => {          // async transition = Action
      const result = await updateName(device.id, name);
      if (result.error) { setError(result.error); return; }
      // navigate / update cache ...
    });
  }
  // isPending is true for the whole async call
}
```
Built on Actions: `<form action={fn}>`, [`useActionState`](../../03-hooks/useActionState/README.md), [`useFormStatus`](../../05-forms/form-actions-and-useFormStatus/README.md), [`useOptimistic`](../../03-hooks/useOptimistic/README.md).

## Other React 19 changes worth naming in interviews
| Feature | What it means |
|---|---|
| `use(promise)` / `use(context)` | Read a promise (suspends until resolved) or context; can be called conditionally |
| `ref` as a prop | Function components accept `ref` directly; `forwardRef` no longer needed |
| `<Context>` as provider | `<ThemeContext value={...}>` instead of `.Provider` |
| Ref cleanup functions | `ref={(el) => { ...; return () => cleanup(); }}` |
| Document metadata | `<title>`, `<meta>`, `<link>` rendered anywhere are hoisted to `<head>` |
| Stylesheet & script support | `precedence` on `<link rel="stylesheet">`, async scripts deduped; `preload`/`preinit` APIs |
| Server Components & Server Functions | Stable for frameworks (Next.js App Router) — `"use client"` / `"use server"` |
| Better hydration errors | Single diff-style message for mismatches |
| Removed legacy APIs | `propTypes`/`defaultProps` on function components, string refs, legacy context, `ReactDOM.render` (use `createRoot`) |

## React Compiler
A separate build-time tool (Babel plugin) that auto-memoizes components and hooks so you rarely need `useMemo`/`useCallback`/`React.memo` by hand. Requires code that follows the Rules of React (pure render, no mutation of props/state).

## Upgrading 18 → 19 (practical)
Upgrade to 18.3 first (it warns about deprecated APIs), run codemods, replace `ReactDOM.render`/`hydrate`, `defaultProps` on function components → default parameters, check third-party libraries for compatibility.

**Interview:** *What's new in React 19?* Actions + form hooks + `use` + ref as prop + metadata + RSC stable; compiler as a separate tool.

Next → [Advanced React](../../15-advanced-react/concurrent-rendering/README.md)
