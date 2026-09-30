# 15 — unknown vs any

## Connection from Previous Topic

Discriminated unions make known states safe. But API responses, parsed JSON, third-party values and caught errors can begin as values whose actual type is unknown.

## `any`

`any` opts out of most TypeScript checking:

```ts
const value: any = getExternalValue();
value.notReal();
value.foo.bar();
```

The compiler permits unsafe operations.

## `unknown`

`unknown` accepts any value but requires evidence before use:

```ts
const value: unknown = getExternalValue();

if (typeof value === "string") {
  value.toUpperCase();
}
```

This makes `unknown` the safer default for uncertain values.

## API/JSON boundary

```ts
const parsed: unknown = JSON.parse(rawJson);
```

This assertion:

```ts
const user = JSON.parse(rawJson) as User;
```

does not validate the JSON. It only changes TypeScript's assumption.

A safer design is:

```text
external data
→ unknown
→ runtime validation / type guard
→ trusted application model
```

## `unknown` vs `any` interview answer

- `any`: “trust me; disable checking here.”
- `unknown`: “I don't know yet; force me to establish the type.”

## When `any` can be acceptable

Controlled legacy migrations, poorly typed third-party boundaries, or deliberate escape hatches can justify it. Keep the scope narrow and document why.

## Frontend use cases

- API responses
- `catch (error)`
- localStorage values
- parsed JSON
- third-party integrations
- migration of JavaScript/legacy code

## Mini challenge

Create a function that accepts `unknown` and returns a safe `User` only after checking the required runtime properties.

## What This Unlocks Next

We can safely handle unknown values. Next we need a type representing **impossible states and unreachable branches**:

**unknown → never**.