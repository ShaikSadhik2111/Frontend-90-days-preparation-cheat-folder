# Feature-based folder structure

> Organise by **feature/domain**, not by file type. Everything for "devices" lives together; shared code is explicitly shared.

```
src/
  app/                 # app shell: providers, router, layout, global styles
  features/
    devices/
      api/             # devicesApi.ts (endpoints, DTO types, zod schemas)
      components/      # DeviceTable.tsx, DeviceDrawer.tsx
      hooks/           # useDevices.ts, useDeviceMutations.ts
      utils/           # formatStatus.ts
      routes.tsx       # feature routes (lazy loaded)
      index.ts         # PUBLIC API of the feature — other features import only from here
    alarms/
    reports/
  shared/
    ui/                # Button, Modal, Table — design-system components
    hooks/             # useDebounce, useMediaQuery
    lib/               # api client, date utils, logger
    types/
  tests/               # test utils (renderWithProviders), MSW handlers
```

## Rules
- Features **don't import each other's internals** — only through `index.ts` (enforce with ESLint `no-restricted-imports` or boundaries plugin).
- `shared/` never imports from `features/`.
- Colocate tests and styles with the component (`DeviceTable.test.tsx`).
- Lazy-load each feature's routes → natural code-splitting boundary.
- Scales to monorepo packages (Nx/Turborepo) or micro-frontends later.

## Versus layer-based (`components/`, `hooks/`, `services/`)
Layer-based is fine for small apps; in big apps, a feature change touches 5 folders and ownership is unclear.

**Interview:** *How would you structure a large React app?* Feature folders + shared UI kit + API layer + clear public APIs + lint-enforced boundaries.

Next → [Design systems](../design-systems/README.md)
