# 33 — TypeScript Interview Questions

This folder is the **final application of the complete learning path**, not a replacement for learning the earlier folders.

## How to use this folder

For every question:

1. Answer from memory.
2. Explain the runtime/compiler behavior.
3. Write a small example.
4. Connect the answer to a real frontend use case.
5. Open the original numbered folder if you need a deeper refresh.

## Fundamentals

### What is TypeScript?

A superset of JavaScript that adds static type checking and tooling and is transformed to JavaScript for execution.

### Does TypeScript run in the browser?

Browsers execute JavaScript. TypeScript source is normally transformed before browser execution.

### Does TypeScript prevent runtime errors?

No. Runtime values can violate compile-time assumptions.

### What is type erasure?

TypeScript-only type information is generally absent from emitted JavaScript.

## Core type system

### any vs unknown

`any` largely disables checking. `unknown` requires narrowing before unsafe operations.

### never vs void

`void` describes an intentionally unused return value. `never` represents impossible values or functions that cannot complete normally.

### interface vs type

Both can model objects. Interfaces support declaration merging and `extends`; type aliases can represent unions, intersections, tuples and arbitrary type-level compositions.

### union vs intersection

Union = alternatives. Intersection = combined requirements.

### tuple vs array

Tuple = known positions/types. Array = collection type, usually homogeneous.

### enum vs literal union

Normal enums create runtime objects. Literal unions are often simpler for frontend/API contracts.

## Narrowing and safety

### What is narrowing?

Control-flow analysis that makes a broad type more specific after runtime evidence.

### What is a type guard?

A runtime check that provides evidence for narrowing.

### What is a discriminated union?

A union whose variants share a literal discriminant such as `status` or `kind`.

### Why use never for exhaustive checks?

It makes an unhandled discriminated-union variant produce a compile-time error.

## Generics and type-level programming

### Why generics instead of any?

Generics preserve relationships between inputs and outputs; `any` discards them.

### What is `K extends keyof T`?

It constrains `K` to valid keys of `T` and lets `T[K]` return the corresponding property type.

### What is indexed access?

`T[K]` retrieves the type associated with key `K`.

### What is a mapped type?

A type transformation that iterates over the keys of another type.

### What is a conditional type?

A type-level decision based on an assignability relationship.

### What does `infer` do?

It captures a type from within a conditional type.

### What are distributive conditional types?

A conditional over a naked generic parameter distributes across union members.

### What are template literal types?

They construct string literal types from other literal types and can combine with mapped types for generated keys.

## Assertions and compatibility

### Annotation vs assertion vs satisfies

- annotation gives a variable a target type
- assertion tells TypeScript to trust your claim
- `satisfies` checks compatibility while retaining useful inferred details

### What is structural typing?

Compatibility is primarily based on required shape rather than declared type name.

### What are excess property checks?

Fresh object literals receive additional checking for unexpected properties.

### What is function variance?

Parameter and return positions have different substitutability rules; `strictFunctionTypes` provides important safety for callback assignments.

## Configuration and architecture

### Why strict mode?

It catches unsafe assumptions earlier and makes the type system more valuable in large codebases.

### Why noUncheckedIndexedAccess?

It forces indexed access to account for potentially missing values.

### Why import type?

It makes type-only dependencies explicit and separates them from runtime module behavior.

### Why separate DTO and domain models?

To isolate external API contracts from internal application design when transformation or independence is valuable.

### Does TypeScript validate API JSON?

No. Runtime validation is separate from compile-time typing.

## React + TypeScript

Be able to type:

- component props
- optional/default props
- DOM events
- state
- refs
- children
- reducers
- generic components
- API/domain data

Example:

```tsx
type SelectProps<T> = {
  items: T[];
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
};
```

## Practical coding questions

1. Implement `getProperty<T, K extends keyof T>`.
2. Model loading/success/error with a discriminated union.
3. Create `CreateUser = Omit<User, "id">`.
4. Write `isUser(value: unknown): value is User`.
5. Implement `Result<T>`.
6. Build a generic React `Select<T>`.
7. Write a mapped type that makes every property optional.
8. Write a conditional type using `infer`.
9. Explain annotation vs assertion vs `satisfies`.
10. Explain `strictNullChecks`, `noImplicitAny`, and `noUncheckedIndexedAccess`.
11. Type an API client without `any`.
12. Explain why interfaces do not validate JSON.
13. Design a discriminated state machine for a form or API request.
14. Explain a callback variance issue under `strictFunctionTypes`.
15. Derive types from a runtime configuration object with `typeof` and `keyof`.

## Senior frontend scenarios

### Legacy AngularJS → React migration

Explain where TypeScript improves safety during a migration:

```text
legacy API
→ DTO
→ mapper
→ domain model
→ React state
→ typed component props
```

### API client design

Explain how generics can preserve the response type:

```ts
type ApiResponse<T> = {
  data: T;
  status: number;
};
```

### UI state design

Explain why a discriminated union is safer than several unrelated booleans.

### Shared component library

Explain how generic props, utility types and structural typing can make components reusable without falling back to `any`.

## Final interview checklist

You should be able to explain and code:

- fundamentals and inference
- primitives, objects and literal types
- aliases and interfaces
- function types
- unions/intersections/tuples/enums/classes
- narrowing and guards
- discriminated unions and exhaustive `never`
- `unknown` vs `any`
- generics and constraints
- `keyof`, `typeof`, `T[K]`
- utility/mapped/conditional/template literal types
- assertions and `satisfies`
- structural typing and variance
- modules and `tsconfig`
- API/domain modeling
- React + TypeScript
- advanced type design

The goal is not to memorize definitions. The goal is to explain **why the type system feature exists, what problem it solves, how it behaves, and where you would use it in a production frontend application**.