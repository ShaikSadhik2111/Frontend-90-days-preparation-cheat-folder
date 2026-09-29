# TypeScript — Connected Interview Learning Path

This folder is designed to be learned **as one connected TypeScript journey**, not as isolated topics.

The goal is to understand *why* each TypeScript feature exists, how it solves the limitation of the previous concept, and where it is used in real frontend code.

## The learning chain

```text
1. Fundamentals
      ↓
2. Type Inference
      ↓
3. Type Aliases
      ↓
4. Interfaces
      ↓
5. Function Types
      ↓
6. Unions
      ↓
7. Intersections
      ↓
8. Tuples / Enums / Classes
      ↓
9. Type Narrowing
      ↓
10. Type Guards
      ↓
11. Discriminated Unions
      ↓
12. unknown / any / never
      ↓
13. Generics
      ↓
14. Generic Constraints
      ↓
15. keyof
      ↓
16. typeof
      ↓
17. Indexed Access Types
      ↓
18. Utility Types
      ↓
19. Mapped Types
      ↓
20. Conditional Types + infer
      ↓
21. Template Literal Types
      ↓
22. Assertions / satisfies
      ↓
23. Type Compatibility
      ↓
24. Modules
      ↓
25. tsconfig
      ↓
26. API / Domain Modeling
      ↓
27. React + TypeScript
      ↓
28. Advanced Types
      ↓
29. Interview Questions
```

## Why this order?

Every major topic should answer one of these questions:

- **How do I describe data?** → aliases, interfaces
- **How do I describe behavior?** → function types
- **How do I represent alternatives?** → unions
- **How do I safely work with alternatives?** → narrowing and guards
- **How do I model application states?** → discriminated unions
- **How do I avoid repeating types?** → generics
- **How do I make generics safe?** → constraints
- **How do I derive types from existing types?** → keyof, typeof, indexed access
- **How do I transform types?** → utility/mapped/conditional types
- **How do I connect types to real applications?** → API modeling and React
- **How do I make the compiler enforce the design?** → tsconfig

## How every lesson should be studied

For each folder:

1. Read **Connection from Previous Topic**.
2. Understand **Why This Topic Exists**.
3. Type every example yourself.
4. Modify the example and predict compiler errors.
5. Complete the mini challenge.
6. Read **What This Unlocks Next**.
7. Explain the topic aloud in 2–3 minutes.
8. Only then move to the next folder.

## The golden rule

Do not memorize TypeScript syntax independently.

Instead remember the chain:

```text
object shape
→ reusable type
→ behavior
→ alternatives
→ safe narrowing
→ reusable generic behavior
→ constrained generic behavior
→ type relationships
→ type transformations
→ real application models
```

## Connected project thread

Throughout this section, use one imaginary frontend application:

**Repair Online B2B**

We will gradually evolve:

```text
User object
→ User type
→ User interface
→ functions accepting User
→ User status union
→ narrowed UI state
→ generic API response
→ constrained API helpers
→ keyof-based helpers
→ derived/utility types
→ DTO/domain transformation
→ React components
```

This means the same concepts keep reappearing in a realistic context.

## Final checklist

You should eventually be able to explain not only *what* each feature does, but:

> "Why did we need this feature after the previous one?"

That is the level expected in strong frontend interviews.

Official Handbook: https://www.typescriptlang.org/docs/handbook/
