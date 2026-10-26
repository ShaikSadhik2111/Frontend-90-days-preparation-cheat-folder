# useId

> `useId()` generates a **unique, stable ID** per component instance that's the **same on server and client** — for accessibility attributes, not for list keys.

```tsx
function TextField({ label, error }: { label: string; error?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}-input`}>{label}</label>
      <input id={`${id}-input`} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />
      {error && <p id={`${id}-error`}>{error}</p>}
    </div>
  );
}
```
- Render `<TextField>` twice → different IDs, no collisions.
- Why not `Math.random()` or a global counter? Random → hydration mismatch (server ≠ client); counter → depends on render order, also mismatches with streaming SSR.
- **Not for keys** in lists — keys must come from your data.
- One `useId` call per component; derive multiple IDs with suffixes.

**Interview:** *Why does useId exist?* Stable, SSR-safe unique IDs for `htmlFor`, `aria-*` linking in reusable components.

Next → [useTransition](../useTransition/README.md)
