# 06 — State architecture

## Classify, then choose
| State | Example | Where |
|---|---|---|
| Server cache | devices, orders, users | TanStack Query / RTK Query / Apollo |
| URL | filters, sort, page, selected tab, selected id | router search/path params |
| Local UI | modal open, hover, input draft | component state |
| Shared client | theme, sidebar, toasts, live telemetry buffer | context (low-frequency) / Zustand / Redux (high-frequency, many writers) |
| Form | values, errors, dirty | React Hook Form |
| Persistent client | preferences, drafts, offline data | localStorage / IndexedDB |
| Derived | totals, filtered lists, permissions | compute / memoized selectors |

## Normalised client data
```ts
type DevicesState = {
  byId: Record<string, Device>;
  allIds: string[];
  byPlant: Record<string, string[]>;   // index for fast lookup
};
```
→ one update path per entity, no duplicates across lists, O(1) lookups. (RTK `createEntityAdapter`, Apollo cache normalisation.)

## State machines for complex flows
File upload, checkout, wizard, connection status: model explicit states (`idle → uploading → paused → failed → done`) with allowed transitions (reducer or XState). Prevents impossible states and makes edge cases visible in the design.

## Interview phrasing
"I keep server data in a query cache keyed by filters, filters in the URL so the view is shareable, live telemetry in a small store with per-device selectors, and UI state local."

Next → [07 Data flow](../07-data-flow/README.md)
