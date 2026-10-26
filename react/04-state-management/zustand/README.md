# Zustand

> Zustand is a **small hook-based store**: create a store with state + actions, read slices with a selector. No provider, little boilerplate.

```ts
import { create } from "zustand";

type CartState = {
  items: { id: string; qty: number }[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()((set) => ({
  items: [],
  add: (id) => set((s) => {
    const existing = s.items.find((i) => i.id === id);
    return existing
      ? { items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) }
      : { items: [...s.items, { id, qty: 1 }] };
  }),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}));

// components subscribe to slices → re-render only when that slice changes
const count = useCart((s) => s.items.length);
const add = useCart((s) => s.add);
```
- `set` merges at the top level (shallow); nested updates still need immutable copies.
- Selecting an object/array literal creates a new reference → use `useShallow` (v4.5+/v5) or select separate values.
- Middleware: `persist` (localStorage), `devtools`, `immer`.
- Read/write outside React: `useCart.getState().clear()` (e.g. after logout in an API interceptor).
- Built on `useSyncExternalStore`.

## Zustand vs Redux Toolkit vs Context
| | Zustand | Redux Toolkit | Context |
|---|---|---|---|
| Boilerplate | Very low | Medium | Low |
| Selectors | ✅ | ✅ | ❌ |
| Devtools/middleware | via middleware | ✅ built in | ❌ |
| Best for | Small–mid apps, feature stores | Large apps/teams, strict conventions | Low-frequency values |

**Interview:** *Why choose Zustand?* Minimal API, selector-based re-renders, no providers; choose RTK when you want enforced structure and the Redux ecosystem.

Next → [State architecture](../state-architecture/README.md)
