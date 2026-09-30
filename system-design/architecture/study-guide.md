# Frontend Architecture

Rendering options: SPA for highly interactive client apps; SSR for server-produced initial HTML; SSG for mostly static routes; revalidation for periodically refreshed pre-rendered content; Server Components for server-side component work with explicit client boundaries. Choose per route and requirement.

Layering: UI → application/use-case → domain → data access → infrastructure. The goal is dependency direction, not folder ceremony.

Feature architecture groups business capabilities:
features/orders/{api,components,hooks,model}
features/customers
shared/{ui,lib,config}

BFF can aggregate/reshape backend data for a UI and reduce browser round trips, but adds a service boundary.

Prefer a modular monolith when strong internal boundaries and one deployment are sufficient. Micro-frontends solve organizational/deployment independence and introduce runtime/versioning complexity.

Avoid shared → feature dependencies and deep imports into another feature’s internals.

Debugging clue: a component with unrelated network calls, huge prop surfaces and many unrelated imports may have a boundary problem.

Challenge: design an order product with orders, customers, filters, auth and uploads; define module ownership and dependency direction.