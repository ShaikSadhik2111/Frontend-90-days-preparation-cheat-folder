# useActionState (React 19)

> `const [state, formAction, isPending] = useActionState(action, initialState)` manages the **result of a form action**: pending state, the returned value (errors/success), and sequential submissions.

```tsx
type FormState = { error?: string; ok?: boolean };

async function saveDevice(prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name is required" };
  const res = await fetch("/api/devices", { method: "POST", body: formData });
  if (!res.ok) return { error: "Server error, try again" };
  return { ok: true };
}

function AddDeviceForm() {
  const [state, formAction, isPending] = useActionState(saveDevice, {});
  return (
    <form action={formAction}>
      <input name="name" aria-invalid={!!state.error} />
      <button disabled={isPending}>{isPending ? "Saving…" : "Save"}</button>
      {state.error && <p role="alert">{state.error}</p>}
      {state.ok && <p>Saved!</p>}
    </form>
  );
}
```
- The action receives `(previousState, formData)` and returns the next state.
- Works with **Server Functions** (`"use server"`) in frameworks like Next.js → progressive enhancement (form works before JS loads).
- Was called `useFormState` (in `react-dom`) in React canary/18.3 era.
- Related: `useFormStatus()` (from `react-dom`) gives `pending` to a child component inside the `<form>` (e.g. a reusable SubmitButton).

**Interview:** *What are Actions in React 19?* Async functions passed to `action`/`startTransition`; React tracks pending state, errors and optimistic updates for you.

Next → [useOptimistic](../useOptimistic/README.md)
