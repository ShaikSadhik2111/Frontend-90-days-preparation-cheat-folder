# 07 — Union Types

## Connection from Previous Topic

Function types describe behavior. Real applications often accept **different valid shapes**. A union lets one value represent a controlled set of alternatives.

## Why This Topic Exists

`A | B` means a value may be one of several types.

```ts
type UserId = string | number;

function formatUserId(id: UserId): string {
  return typeof id === "string" ? id.toUpperCase() : String(id);
}
```

Until narrowing proves otherwise, only operations safe for every union member are available.

## Literal unions

```ts
type RequestStatus = "idle" | "loading" | "success" | "error";
```

Literal unions are excellent for UI state and configuration because invalid values are rejected.

## Object unions

```ts
type Payment =
  | { method: "card"; last4: string }
  | { method: "upi"; upiId: string }
  | { method: "cash" };

function describe(payment: Payment): string {
  switch (payment.method) {
    case "card": return `Card ending ${payment.last4}`;
    case "upi": return payment.upiId;
    case "cash": return "Cash";
  }
}
```

The next topics explain how TypeScript narrows such unions.

## Union vs intersection

- `A | B` → alternatives.
- `A & B` → combined requirements.

## Frontend use cases

- API result states
- form values
- reducer actions
- payment methods
- route parameters
- component variants

## Common mistakes

Do not replace a known union with `any`. A union documents valid possibilities and preserves compiler checking.

## Interview questions

**Why are unions safer than `any`?** They restrict values to known alternatives.

**Can you access a property present on only one union member?** Not until you narrow to that member.

## Mini challenge

Create a `SearchResult` union for `user`, `product`, and `order`, each with a unique property. Write a function that renders the correct label.

## What This Unlocks Next

A union gives us alternatives. Next we need a systematic way to determine which alternative we have:

**Unions → Type Narrowing → Type Guards → Discriminated Unions**.