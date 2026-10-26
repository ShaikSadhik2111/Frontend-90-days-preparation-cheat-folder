# 05 — Component architecture (in a design round)

> Show the component tree for the main screen and **who owns which state**.

## Example: device management page
```
<DevicesPage>                       // reads URL params (plant, status, page), owns layout + boundaries
  <FilterBar value={filters} onChange={setFilters} />       // controlled by URL state
  <ErrorBoundary><Suspense>
    <DeviceTable query={filters} onSelect={openDrawer} />   // server state via useDevices(filters)
      <DeviceRow device /> (memoized, virtualized)
  </Suspense></ErrorBoundary>
  <DeviceDrawer deviceId={selectedId} onClose />           // local UI state: selectedId
  <BulkActionsBar selectedIds onAction />                  // selection state in page or table
</DevicesPage>
```

## Principles to state
- Split by **responsibility & ownership**: page (data + URL), features (interaction state), UI kit (presentational).
- **Props API** of key components (what goes in, what events come out).
- **Colocate** state; lift only when needed; server data from the cache, not copies.
- **Boundaries**: error + loading boundary per independent region.
- **Reusability**: generic components (`Table<T>`, `Select<T>`) from the design system.
- **Performance**: memoized rows, virtualization, stable callbacks, avoid context fan-out.

## Interview questions
1. Draw the component tree for X and explain where each state lives.
2. How do you design a reusable `Table` component's API?
3. How do you prevent the whole page from re-rendering on every keystroke?

Details: [react/16-architecture](../../react/16-architecture/component-architecture/README.md).

Next → [06 State architecture](../06-state-architecture/README.md)
