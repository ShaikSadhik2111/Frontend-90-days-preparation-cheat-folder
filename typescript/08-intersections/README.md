# 08 — Intersection Types

## Connection from Previous Topic

A union represents **alternatives**. Sometimes an object must satisfy multiple contracts simultaneously. That is an intersection.

## Why This Topic Exists

`A & B` combines the requirements of `A` and `B`.

```ts
interface Identified { id: string; }
interface Timestamped { createdAt: Date; }

type Entity = Identified & Timestamped;
```

```ts
const entity: Entity = { id: "order-1", createdAt: new Date() };
```

## Composing capabilities

```ts
type Audited = { createdBy: string; updatedAt: Date };

type Order = {
  total: number;
} & Audited;
```

## Intersection vs extends

```ts
type Admin = User & { permissions: string[] };

interface AdminContract extends User {
  permissions: string[];
}
```

Both can compose object requirements. Intersections are especially useful when combining arbitrary type expressions.

## Conflicting properties

Compatible properties combine. Incompatible requirements can become impossible:

```ts
type Impossible = { value: string } & { value: number };
// value cannot be a valid string-and-number value
```

Incompatible literal intersections can reduce to `never`.

## Frontend use cases

- entity + audit metadata
- composed component props
- permissions + user data
- API/domain model composition
- reusable capabilities

## Interview questions

**Union vs intersection?** Union means alternatives; intersection requires all constituent constraints.

## Mini challenge

Create `BaseEntity`, `SoftDeletable`, and `Product` types and compose them into `ProductEntity`.

## What This Unlocks Next

We can combine object requirements. Next we model **fixed-position collections**:

**Intersections → Tuples**.