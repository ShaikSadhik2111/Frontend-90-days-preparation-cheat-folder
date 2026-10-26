# 06 — Forms & validation (machine-coding version)

## Typical task
"Build a signup / multi-step form with validation."
```tsx
type Values = { name: string; email: string; password: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Name must be at least 2 characters";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email";
  if (v.password.length < 8) e.password = "At least 8 characters";
  return e;
}

function SignupForm({ onSubmit }: { onSubmit: (v: Values) => Promise<void> }) {
  const [values, setValues] = useState<Values>({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const errors = validate(values);                                   // derived
  const show = (k: keyof Values) => touched[k] && errors[k];

  const change = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(errors).length) return;                          // focus first invalid field in a real app
    setSubmitting(true); setServerError("");
    try { await onSubmit(values); } catch { setServerError("Sign-up failed, try again"); } finally { setSubmitting(false); }
  }
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="name">Name</label>
      <input id="name" value={values.name} onChange={change("name")} onBlur={() => setTouched((t) => ({ ...t, name: true }))}
             aria-invalid={!!show("name")} aria-describedby="name-err" />
      {show("name") && <p id="name-err" role="alert">{errors.name}</p>}
      {/* email, password same pattern */}
      {serverError && <p role="alert">{serverError}</p>}
      <button disabled={submitting}>{submitting ? "Signing up…" : "Sign up"}</button>
    </form>
  );
}
```
Points to mention: validate on blur then on change, derived errors, `touched`, prevent double submit, server errors, a11y linking, "in production: React Hook Form + Zod".
Multi-step: one values object across steps, per-step validation on Next, Back keeps data, step indicator, summary step.

Next → [07 Common components](../07-common-components/README.md)
