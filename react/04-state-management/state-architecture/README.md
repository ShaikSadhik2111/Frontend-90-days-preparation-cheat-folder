# State architecture (how seniors answer "how do you manage state?")

> Classify state first, then pick the tool. Most apps don't need one global store for everything.

## The 6 kinds of state
| Kind | Examples | Tool |
|---|---|---|
| **Local UI** | open/closed, hover, input draft | `useState`/`useReducer` |
| **Shared UI** | sidebar collapsed, theme, toasts | lift up / Context / Zustand |
| **Server cache** | users, devices, orders | TanStack Query / RTK Query / SWR |
| **URL** | filters, sort, page, selected tab, ids | router params & search params |
| **Form** | field values, touched, errors | React Hook Form (+ Zod) |
| **Derived** | totals, filtered lists, permissions | compute during render / selectors |

## Principles
1. **Single source of truth** per piece of data.
2. **Don't copy server data into client state** — read it from the cache; invalidate after mutations.
3. **Derive, don't store.**
4. **Colocate** — keep state near where it's used.
5. **Normalise** big collections (`byId`, `ids`) to make updates cheap and consistent.
6. **Model status explicitly** (state machines / discriminated unions) — no impossible combinations.
7. **Put shareable state in the URL** (refresh/back button/deep links work).

## Example: an industrial dashboard
- Plant/line filter → URL (`?plant=PNQ&line=3`).
- Device list & history → TanStack Query keyed by `["devices", plant, line]`.
- Live telemetry → WebSocket feeding a Zustand store, components select one device's metrics, rendering throttled.
- Widget layout per user → server (saved), cached in query.
- Modal open, selected row → local state.
- Alarm acknowledgement → mutation with optimistic update.

## Migration angle (AngularJS → React)
AngularJS apps often keep everything in `$rootScope` or singleton services with two-way binding. During migration, a **framework-agnostic store** (Redux/Zustand/plain observable) lets AngularJS and React read the same state until AngularJS is removed.

## Interview questions
1. **How do you manage state in a large React app?** Walk through the 6 kinds above with tools and reasons.
2. **Why separate server state?** It has caching, staleness, dedupe, retries, invalidation — problems client stores don't solve well.
3. **What goes in the URL?** Anything a user would expect to survive refresh or share.

Next → [Forms](../../05-forms/README.md)
