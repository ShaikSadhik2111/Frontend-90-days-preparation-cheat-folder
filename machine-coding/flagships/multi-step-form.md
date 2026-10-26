# Flagship: Multi-step form / wizard (75 min)

## Requirements
3–4 steps (Account → Profile → Preferences → Review) · per-step validation on Next · Back keeps values · progress indicator · review step with edit links · submit with loading/error · unsaved-changes warning.

## State
One `values` object for all steps, `step` index (or `?step=2` in URL), `errors` derived per step, `submitting`, `serverError`.
```ts
const steps = [
  { id: "account", fields: ["email", "password"], validate: validateAccount },
  { id: "profile", fields: ["name", "phone"], validate: validateProfile },
] as const;
```

## Edge cases
Conditional steps (skip "company" if personal account) · refresh mid-way (autosave draft to sessionStorage) · server validation error belongs to an earlier step (jump back + focus field) · double submit.

## Follow-ups
Schema-driven (Zod per step) · React Hook Form · accessible stepper (`aria-current="step"`) · analytics on drop-off per step.

Form basics: [06 forms & validation](../06-forms-validation/README.md).
