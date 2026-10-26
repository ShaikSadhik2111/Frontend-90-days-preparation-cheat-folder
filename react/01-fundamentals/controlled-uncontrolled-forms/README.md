# Controlled vs uncontrolled inputs

> **Controlled**: React state is the source of truth (`value` + `onChange`). **Uncontrolled**: the DOM keeps the value; you read it when needed (`defaultValue` + ref or `FormData`).

## Controlled
```tsx
function EmailField() {
  const [email, setEmail] = useState("");
  const error = email && !email.includes("@") ? "Enter a valid email" : "";   // derived validation
  return (
    <>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value.trim())}
             aria-invalid={!!error} aria-describedby="email-err" />
      {error && <p id="email-err" role="alert">{error}</p>}
    </>
  );
}
```
✅ Instant validation, formatting/masking, conditional UI, enabling the submit button, syncing fields.
⚠️ Re-renders on every keystroke (fine for most forms; large forms may lag).

## Uncontrolled
```tsx
function SignupForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));   // { name, plan }
    console.log(data, nameRef.current?.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" ref={nameRef} defaultValue="" />
      <select name="plan" defaultValue="free"><option value="free">Free</option><option value="pro">Pro</option></select>
      <button>Submit</button>
    </form>
  );
}
```
✅ Less code, fewer re-renders, works with native form features. `<input type="file">` is **always** uncontrolled.
**React Hook Form** uses uncontrolled inputs + refs → great performance for big forms.

## Choosing
| Need | Choose |
|---|---|
| Live validation, masking, dependent fields | Controlled |
| Simple form read on submit | Uncontrolled / FormData |
| Large enterprise forms (50+ fields) | React Hook Form (+ Zod schema) |
| React 19 forms with server actions | `<form action={fn}>` + `useActionState` |

## Classic warnings
- "A component is changing an uncontrolled input to be controlled" → `value` went from `undefined` to a string. Initialise with `""`, not `undefined`/`null`.
- `value` without `onChange` → read-only input (React warns). Use `defaultValue` or add `onChange`/`readOnly`.
- Checkbox uses `checked`/`defaultChecked`, not `value`.

## Accessible form checklist
`<label htmlFor>` for every input · errors linked with `aria-describedby` + `aria-invalid` · error summary or focus the first invalid field on submit · `required`, correct `type` (`email`, `tel`) and `autoComplete` · disable or show progress on submit to prevent double submits.

## Interview questions
1. **Controlled vs uncontrolled?** State in React vs state in DOM; trade-off between control and simplicity/performance.
2. **Why is a file input uncontrolled?** Its value can only be set by the user (security).
3. **How does React Hook Form stay fast?** Registers uncontrolled inputs via refs and subscribes only where needed, avoiding re-rendering the whole form.
4. **Fix the controlled/uncontrolled warning?** Always pass a defined `value` (e.g. `""`).

## Practice
Build a signup form twice: controlled with live validation, then with React Hook Form + Zod. Compare re-render counts using React DevTools "Highlight updates".

Next → [Conditional rendering](../conditional-rendering/README.md)
