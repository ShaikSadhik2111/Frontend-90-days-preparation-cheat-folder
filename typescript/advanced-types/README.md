# Advanced Types

Advanced TypeScript is about composing types to describe relationships precisely.

## Core topics

- `keyof`
- indexed access `T[K]`
- type-level `typeof`
- mapped types
- conditional types
- `infer`
- template literal types
- generic constraints
- distributive conditional types
- discriminated unions
- exhaustive `never`
- key remapping
- recursive types

## Example: event map

```ts
type Events = {
  userCreated: { id: string };
  userDeleted: { id: string; reason: string };
};

type EventName = keyof Events;
type Payload<N extends EventName> = Events[N];

function emit<N extends EventName>(name: N, payload: Payload<N>) {}

emit("userCreated", { id: "1" });
emit("userDeleted", { id: "1", reason: "cleanup" });
```

The compiler preserves the relationship between the event name and payload.

## Practical rule

Use advanced types when they improve safety, readability or API design. Avoid type-level complexity that makes the code harder to maintain.