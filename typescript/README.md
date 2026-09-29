# TypeScript — Connected Interview Learning Path

This folder is designed to be learned **as one connected TypeScript journey**, not as isolated topics.

Each numbered folder builds on the concepts before it. Follow the folders in order.

## Learning path

| # | Topic | Builds on |
|---|---|---|
| 01 | [Fundamentals](./01-fundamentals/) | — |
| 02 | [Type Inference](./02-type-inference/) | Fundamentals |
| 03 | [Types](./03-types/) | Fundamentals + inference |
| 04 | [Type Aliases](./04-type-aliases/) | Types |
| 05 | [Interfaces](./05-interfaces/) | Type aliases |
| 06 | [Function Types](./06-function-types/) | Interfaces |
| 07 | [Unions](./07-unions/) | Types + functions |
| 08 | [Intersections](./08-intersections/) | Unions + object composition |
| 09 | [Tuples](./09-tuples/) | Arrays + fixed structure |
| 10 | [Enums](./10-enums/) | Literal/domain values |
| 11 | [Classes](./11-classes/) | Interfaces + object modeling |
| 12 | [Type Narrowing](./12-type-narrowing/) | Unions |
| 13 | [Type Guards](./13-type-guards/) | Narrowing |
| 14 | [Discriminated Unions](./14-discriminated-unions/) | Unions + narrowing |
| 15 | [unknown vs any](./15-unknown-vs-any/) | Safe boundaries + narrowing |
| 16 | [never](./16-never/) | Exhaustiveness |
| 17 | [Generics](./17-generics/) | Functions + reusable types |
| 18 | [Generic Constraints](./18-generic-constraints/) | Generics |
| 19 | [keyof](./19-keyof/) | Generics + object keys |
| 20 | [typeof](./20-typeof/) | Existing values → types |
| 21 | [Indexed Access Types](./21-indexed-access-types/) | keyof + typeof |
| 22 | [Utility Types](./22-utility-types/) | Type transformations |
| 23 | [Mapped Types](./23-mapped-types/) | keyof + generics |
| 24 | [Conditional Types](./24-conditional-types/) | Generics + type logic |
| 25 | [Template Literal Types](./25-template-literal-types/) | Literal types + mapped types |
| 26 | [Assertions & satisfies](./26-assertions-and-satisfies/) | Inference + narrowing |
| 27 | [Type Compatibility](./27-type-compatibility/) | Structural typing |
| 28 | [Modules](./28-modules/) | Type/runtime organization |
| 29 | [tsconfig](./29-tsconfig/) | Compiler enforcement |
| 30 | [API / Domain Modeling](./30-api-domain-modeling/) | All core type modeling |
| 31 | [React + TypeScript](./31-react-typescript/) | Types + APIs + functions |
| 32 | [Advanced Types](./32-advanced-types/) | Combined type-system patterns |
| 33 | [Interview Questions](./33-interview-questions/) | Complete revision |

## The mental model

```text
Describe data
   ↓
Reuse data models
   ↓
Describe behavior
   ↓
Represent alternatives
   ↓
Narrow safely
   ↓
Model application states
   ↓
Make behavior reusable with generics
   ↓
Constrain generics
   ↓
Derive types from existing types
   ↓
Transform types
   ↓
Model APIs and domains
   ↓
Apply everything in React
   ↓
Solve interview problems
```

## How to study each folder

1. Read **Connection from Previous Topic**.
2. Understand **Why This Topic Exists**.
3. Type every example yourself.
4. Change the example and predict the compiler error.
5. Complete the mini challenge.
6. Read **What This Unlocks Next**.
7. Explain the concept aloud in 2–3 minutes.
8. Move to the next numbered folder only after you can use the current concept.

## Connected project thread

Use **Repair Online B2B** as the running example:

```text
User
→ reusable User type
→ interfaces
→ typed functions
→ status unions
→ narrowing
→ discriminated UI state
→ generic API response
→ constrained helpers
→ keyof / typeof / T[K]
→ utility and mapped types
→ API/domain models
→ React components
```

The goal is not to memorize TypeScript features independently. The goal is to understand **why the next feature becomes necessary because of the previous one**.

## Completion standard

Before marking TypeScript complete, you should be able to explain both:

**What does this feature do?**

and

**Why did we need this feature after the previous topic?**

Official Handbook: https://www.typescriptlang.org/docs/handbook/
