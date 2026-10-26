# 03 — State ownership

## Decide for each piece of state
1. **Is it derived?** (count, filtered list, isValid, selected object from id) → compute, don't store.
2. **Who reads it?** → closest common parent owns it.
3. **Does it change together with other state?** → group in one object / `useReducer`.
4. **Should it survive refresh / be shareable?** → URL or localStorage.
5. **Is it server data?** → fetched data state (in production: query cache).

## Minimal state example — data table
State: `query`, `sort`, `page` (3 values). Derived: filtered → sorted → paginated rows, total pages. See `code/machine-coding/src/components/DataTable/DataTable.tsx`.

## Red flags
`useEffect` that sets state from other state · storing both `items` and `filteredItems` · copying props into state · 5 booleans for one status · storing whole selected objects instead of ids.

Next → [04 Data flow](../04-data-flow/README.md)
