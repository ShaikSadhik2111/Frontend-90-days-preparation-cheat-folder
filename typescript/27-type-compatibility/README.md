# 27 — Type Compatibility

## Connection from Previous Topic

Assertions can override the compiler's assumptions, but ordinary assignments are governed by TypeScript's compatibility rules. Understanding those rules is essential for interfaces, functions and generics.

## Structural typing

TypeScript is primarily structurally typed:

```ts
interface Point {
  x: number;
  y: number;
}

const point3D = { x: 1, y: 2, z: 3 };
const point2D: Point = point3D;
```

This works because the source contains the required structure.

## Excess property checks

Fresh object literals are checked more strictly:

```ts
const point: Point = {
  x: 1,
  y: 2,
  z: 3, // error
};
```

Assigning through a variable can behave differently.

## Function compatibility

Function compatibility considers parameter and return types. Under `strictFunctionTypes`, parameter positions receive stricter checking, which helps prevent unsafe callback assignments.

## Variance — practical view

When a type contains another type in input/output positions, substitutability can differ:

- output positions are generally more naturally covariant
- input positions require contravariant safety
- mutable structures can introduce invariance-like constraints

You do not need to memorize formal category theory, but you should understand why a callback accepting a narrower type can be unsafe where a broader type is expected.

## Nominal-looking types

Classes can introduce compatibility differences because private/protected members participate in compatibility. Two classes with private members from different declarations are not freely interchangeable even if their public shapes match.

## Frontend use cases

- React callback props
- event handlers
- reusable component contracts
- generic libraries
- interface/class design

## Interview questions

**Why can an object with extra properties be assignable?** Structural compatibility only requires the target's required members; fresh literals additionally receive excess-property checking.

**What does structural typing mean?** Compatibility is mainly based on shape rather than declared name.

## Mini challenge

Create two callback types where one accepts `string` and another accepts `string | number`. Test assignments under `strictFunctionTypes` and explain the result.

## What This Unlocks Next

Compatibility determines whether types can interact. Next we organize type and runtime code across files using **modules**:

**Type Compatibility → Modules**.