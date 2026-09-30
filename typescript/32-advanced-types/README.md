# 32 — Advanced Types

## Connection from Previous Topic

React + TypeScript uses the core type system in practical code. Advanced types combine those pieces to model relationships that ordinary interfaces cannot express as precisely.

## Core toolbox

- `keyof`
- indexed access `T[K]`
- type-level `typeof`
- generic constraints
- mapped types
- conditional types
- `infer`
- template literal types
- discriminated unions
- exhaustive `never`
- key remapping
- recursive types

## Event-map pattern

```ts
type Events = {
  userCreated: { id: string };
  userDeleted: { id: string; reason: string };
};

type EventName = keyof Events;
type Payload<N extends EventName> = Events[N];

function emit<N extends EventName>(
  name: N,
  payload: Payload<N>
) {}

emit("userCreated", { id: "1" });
emit("userDeleted", { id: "1", reason: "cleanup" });
```

The compiler preserves the relationship between event name and payload.

## Recursive types

A recursive type can describe nested structures:

```ts
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };
```

Use recursive types carefully; complexity can become difficult to understand.

## Branded/nominal-style types

TypeScript is structurally typed, but a brand can prevent accidental mixing of conceptually different values:

```ts
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
```

A normal string is not automatically treated as either branded type without an explicit construction strategy.

## Practical rule

Advanced types should improve **safety, readability or API design**. If a type-level trick makes the code harder for the team to understand, simplify it.

## Frontend use cases

- typed event buses
- generic data tables
- form schemas
- route contracts
- API client generators
- reusable component libraries
- domain-safe identifiers

## Interview questions

**When should you avoid advanced types?** When a simple type communicates the contract clearly.

**What is the value of advanced types?** They preserve relationships between inputs, outputs and variants at compile time.

## Mini challenge

Build a typed event emitter using an `EventMap`, `keyof`, indexed access and generic constraints.

## What This Unlocks Next

The final folder turns the complete roadmap into interview questions and practical coding scenarios:

**Advanced Types → Interview Questions**.