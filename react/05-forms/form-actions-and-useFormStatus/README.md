# Form Actions & useFormStatus (React 19)

> In React 19, `<form action={fn}>` accepts a **function**. React calls it with `FormData`, tracks pending state, resets uncontrolled fields after success, and integrates with `useActionState`, `useFormStatus` and `useOptimistic`.

```tsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();          // reads the status of the PARENT <form>
  return <button disabled={pending}>{pending ? "Saving…" : "Save"}</button>;
}

function NewsletterForm() {
  async function subscribe(formData: FormData) {
    await fetch("/api/subscribe", { method: "POST", body: formData });
  }
  return (
    <form action={subscribe}>
      <input name="email" type="email" required />
      <SubmitButton />
    </form>
  );
}
```
- `useFormStatus` must be called in a component **rendered inside** the `<form>` — not in the component that renders the form.
- Returns `{ pending, data, method, action }`.
- Errors thrown from the action go to the nearest Error Boundary; for validation errors, return them via `useActionState` instead.
- With Server Functions (`"use server"`, Next.js), forms work before JavaScript hydrates (progressive enhancement).

**Compared with classic forms:** `onSubmit` + `preventDefault` + manual `isSubmitting` state still works and is what most existing codebases (and React 18) use.

**Interview:** *What does useFormStatus solve?* A reusable submit button that knows its form is pending without prop drilling.

Next → [Routing](../../06-routing/README.md)
