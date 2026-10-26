# Forms in React

> Forms combine controlled/uncontrolled inputs, validation, async submission and accessibility. For anything bigger than a few fields, use **React Hook Form + Zod**.

## React Hook Form + Zod
```tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Invalid email"),
  threshold: z.coerce.number().min(0).max(100),
});
type FormValues = z.infer<typeof schema>;

export function DeviceForm({ onSave }: { onSave: (v: FormValues) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } =
    useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", threshold: 50 } });

  const onSubmit = handleSubmit(async (values) => {
    try { await onSave(values); reset(values); }
    catch { setError("root", { message: "Could not save. Try again." }); }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="name">Name</label>
      <input id="name" {...register("name")} aria-invalid={!!errors.name} aria-describedby="name-err" />
      {errors.name && <p id="name-err" role="alert">{errors.name.message}</p>}
      {/* email, threshold ... */}
      {errors.root && <p role="alert">{errors.root.message}</p>}
      <button disabled={isSubmitting}>{isSubmitting ? "Saving…" : "Save"}</button>
    </form>
  );
}
```

## What interviewers look for
- **Validation timing:** on blur/submit first, then on change after the first error (less noisy).
- **Schema shared** with the backend/types (Zod `infer`).
- **Server errors** mapped to fields (`setError("email", …)`).
- **Double submit** prevented (`isSubmitting`).
- **Accessibility:** labels, `aria-invalid`, `aria-describedby`, focus first invalid field.
- **Unsaved changes** guard (`formState.isDirty` + `beforeunload` / router blocker).
- **Dependent fields** (select country → load states; cancel stale requests).
- **Big/dynamic forms:** `useFieldArray`, schema-driven rendering, autosave drafts (debounced).

## Interview questions
1. **How do you handle validation in React forms?** Schema (Zod/Yup) + RHF resolver; client for UX, server is the authority.
2. **Why is RHF faster than controlled forms?** Uncontrolled inputs via refs; re-renders only subscribed fields.
3. **How would you build a multi-step wizard?** Single form state across steps, per-step validation, step in URL, autosave.

Next → [Form actions & useFormStatus](form-actions-and-useFormStatus/README.md)
