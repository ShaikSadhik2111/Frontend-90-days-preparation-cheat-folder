# 18 — React depth: debugging & senior-level reasoning

> At 4–6 years of experience, interviewers stop asking "what is useEffect" and start asking "this screen is slow / shows wrong data / leaks memory — how do you find and fix it?". Practise with the [case studies](case-studies.md).

## The senior mental model
`render snapshots → scheduled updates → reconciliation (type + key identity) → commit → events (user intent) → effects (sync external systems) → server-state cache → measurement → architecture/ownership`

## Questions to ask yourself about any React code
1. Who **owns** each piece of state? Is anything duplicated or derivable?
2. What **triggers** each render? How far does it propagate?
3. What can **race** (requests, timers, subscriptions)? What cancels it?
4. What can **leak** (listeners, intervals, sockets, observers, closures holding large data)?
5. What are the **loading / empty / error / retry** states?
6. What is the **identity** of each element (type, key)? Will state survive or reset?
7. What would break with **10× data**, **slow network**, **two tabs**, **concurrent edits**?
8. How would you **test** it and **observe** it in production?

## Debugging toolkit
| Problem | Tool |
|---|---|
| Unexpected re-renders | React DevTools Profiler ("why did this render?"), highlight updates |
| Wrong state / props | React DevTools components tab, `useDebugValue` in custom hooks |
| Network races / stale data | DevTools Network (throttling!), TanStack Query Devtools |
| Memory leaks | Chrome Memory → heap snapshots, "Detached" DOM nodes, Performance monitor |
| Slow interactions | Performance panel (long tasks), Web Vitals INP attribution |
| Hydration errors | React's console diff; compare server HTML (View Source) with client |
| Production-only errors | Sentry + uploaded source maps, error boundaries with context |

Next → [Case studies](case-studies.md)
