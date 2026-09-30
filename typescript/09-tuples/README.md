# 09 — Tuples

## Connection from Previous Topic

Intersections combine object requirements. Tuples model arrays where **position has meaning** and each position has a known type.

## Why This Topic Exists

```ts
type ApiResult = [status: number, body: string];

const result: ApiResult = [200, "OK"];
const status = result[0]; // number
const body = result[1];   // string
```

## Optional and rest elements

```ts
type Point = [number, number, number?];
type Route = [string, ...string[]];
```

## Readonly tuples

```ts
const point = [10, 20] as const;
// readonly [10, 20]
```

## Destructuring

```ts
const response: [number, string] = [200, "OK"];
const [status, body] = response;
```

## Tuples vs arrays

Use a tuple when position has semantic meaning. Use an array for a collection of the same conceptual kind.

```ts
const coordinates: [number, number] = [17.38, 78.48];
const userIds: number[] = [1, 2, 3];
```

## Frontend use cases

- coordinate pairs
- hook-style return values
- key/value pairs
- fixed utility results
- strongly typed function arguments

## Runtime note

A tuple is still a normal JavaScript array at runtime. Tuple guarantees are compile-time only.

## Interview questions

**Tuple vs array?** Tuple has known positions/types; an array generally represents a variable-length collection.

**Does TypeScript create a runtime tuple object?** No.

## Mini challenge

Create a tuple representing `[HTTP status, response body, optional request ID]` and safely consume it.

## What This Unlocks Next

Next we compare another fixed set of named values with literal unions:

**Tuples → Enums**.