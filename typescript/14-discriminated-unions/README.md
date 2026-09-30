# 14 — Discriminated Unions

## Connection from Previous Topic

Type guards let us narrow arbitrary alternatives. A **discriminated union** gives every variant a shared literal property, making the narrowing predictable and exhaustive.

## Why This Topic Exists

```ts
type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

The `status` field is the discriminant.

## Narrowing

```ts
function render(state: RequestState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return state.data.join(", ");
    case "error":
      return state.message;
  }
}
```

Once `status === "success"`, TypeScript knows `data` exists.

## Why this is better than unrelated booleans

This model:

```ts
{ isLoading: boolean; isError: boolean; isSuccess: boolean }
```

can represent impossible combinations.

A discriminated union represents only valid states.

## Exhaustive checking

```ts
function assertNever(value: never): never {
  throw new Error("Unexpected variant");
}

function render(state: RequestState) {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return state.data.join(", ");
    case "error": return state.message;
    default: return assertNever(state);
  }
}
```

Adding a new state later causes the compiler to identify unhandled cases.

## Frontend use cases

- API loading/success/error
- reducer actions
- modal state
- payment state
- form submission state
- async workflows
- component variants

## Interview questions

**Why discriminated unions?** They make valid states explicit and enable precise control-flow narrowing.

**Why use `never`?** It turns missing cases into compile-time failures when the switch is expected to be exhaustive.

## Mini challenge

Model a file-upload state machine with `idle`, `uploading`, `success`, and `error`. Make each state carry only the data it actually needs.

## What This Unlocks Next

Now we can model safe application states. Next we handle the most common unsafe boundary: a value whose type we genuinely do not know.

**Discriminated Unions → unknown vs any**.