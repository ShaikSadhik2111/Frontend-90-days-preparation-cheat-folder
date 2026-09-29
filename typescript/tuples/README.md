# Tuples

Tuples represent fixed-position arrays with known element types.

```ts
type ApiResult = [status: number, body: string];

const result: ApiResult = [200, "OK"];
const status = result[0]; // number
const body = result[1];   // string
```

## Optional tuple element

```ts
type Point = [number, number, number?];
```

## Rest tuple

```ts
type Route = [string, ...string[]];
```

## Readonly tuple

```ts
const point = [10, 20] as const;
// readonly [10, 20]
```

Use tuples when position has semantic meaning. Use arrays for homogeneous collections.