# Intersection Types

An intersection combines requirements from multiple types.

```ts
interface Identified {
  id: string;
}

interface Timestamped {
  createdAt: Date;
}

type Entity = Identified & Timestamped;
```

An `Entity` must satisfy both contracts.

## Combining reusable capabilities

```ts
type Audited = {
  createdBy: string;
  updatedAt: Date;
};

type Order = {
  total: number;
} & Audited;
```

## Interview distinction

- Union `A | B`: A value can be A or B.
- Intersection `A & B`: a value must satisfy A and B.

Be careful with intersections of incompatible primitive/literal types; they can reduce to `never`.