# Type Compatibility

TypeScript primarily uses structural typing.

## Structural example

```ts
interface Point {
  x: number;
  y: number;
}

const point3D = {
  x: 1,
  y: 2,
  z: 3,
};

const point2D: Point = point3D;
```

This works because `point3D` has the required structure.

## Excess property check

A fresh object literal is checked more strictly:

```ts
interface Point {
  x: number;
  y: number;
}

// Error: z is an excess property
const point: Point = {
  x: 1,
  y: 2,
  z: 3,
};
```

Assigning through a variable can behave differently because structural compatibility is then considered.

## Interview topics

Understand:
- structural typing
- excess property checks
- function parameter compatibility
- return type compatibility
- strictFunctionTypes
- covariance/contravariance at a practical level