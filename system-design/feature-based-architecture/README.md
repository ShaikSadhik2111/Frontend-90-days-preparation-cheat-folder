# Feature-Based Architecture

Organize around business capabilities rather than technical file type.

Example:
features/orders/{api,components,hooks,model}
features/customers/{api,components,model}
shared/{ui,lib,config}

Rules:
- features own domain behavior
- shared cannot depend on features
- expose stable public APIs
- avoid deep imports
- keep infrastructure behind boundaries.

When an abstraction is used once, keep it local until reuse is proven.

Practice: split a repair application into Orders, Customers, Repairs and shared UI.