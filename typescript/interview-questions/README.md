# TypeScript Interview Questions

## Fundamentals

### What is TypeScript?
A JavaScript superset with static type checking and tooling.

### Does TypeScript run in the browser?
Browsers execute JavaScript. TypeScript source is normally transformed to JavaScript first.

### Does TypeScript prevent runtime errors?
No. Runtime values can violate expected types.

## Types

### any vs unknown?
`any` opts out of most checking. `unknown` requires narrowing.

### never vs void?
`void` represents an intentionally unused return value; `never` represents an impossible value/state or a function that cannot complete normally.

### interface vs type?
Both can model objects. Interfaces support declaration merging and `extends`; aliases are more general for unions/intersections and type-level composition.

## Advanced

### What is narrowing?
Control-flow analysis that makes a broad type more specific after runtime checks.

### What is a discriminated union?
A union with a shared literal field such as `status` or `kind`.

### What are generics?
Parameterized types that preserve relationships between inputs and outputs.

### What is keyof?
A union of the known property keys of a type.

### What is indexed access?
`T[K]` retrieves the type associated with key `K`.

### What is satisfies?
It checks compatibility with a target type while retaining the expression's more specific inferred type.

### What is structural typing?
Compatibility is mainly based on shape rather than declared class identity.

### What is type erasure?
TypeScript-only type information is generally removed from emitted JavaScript.

## Practical coding questions

1. Implement `getProperty<T, K extends keyof T>`.
2. Model loading/success/error using a discriminated union.
3. Create `CreateUser = Omit<User, "id">`.
4. Write `isUser(value: unknown): value is User`.
5. Implement `Result<T>` with success/error variants.
6. Build a generic React `Select<T>`.
7. Write a mapped type that makes every property optional.
8. Write a conditional type using `infer`.
9. Explain annotation vs assertion vs `satisfies`.
10. Explain `strictNullChecks`, `noImplicitAny` and `noUncheckedIndexedAccess`.
11. Type an API client without `any`.
12. Explain why TypeScript interfaces do not validate JSON at runtime.

## Senior-level topics

- DTO vs domain model
- runtime validation at API boundaries
- generic API clients
- discriminated state machines
- strict compiler configuration
- structural typing
- function variance/compatibility
- module resolution
- type-level API design
- balancing type safety against unnecessary complexity