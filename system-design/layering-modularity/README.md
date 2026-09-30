# Layering and Modularity

Layers can be:
UI → application → domain → data access → infrastructure.

UI should express interaction, not know transport details. Data access should handle DTOs and transport. Domain logic should remain testable without the browser where possible.

Modularity is successful when a change stays inside the smallest reasonable boundary.

Red flags: circular imports, shared dumping grounds, feature internals imported elsewhere, giant hooks and components with unrelated responsibilities.

Practice: refactor a component that fetches data, transforms it, owns global state and renders four unrelated sections.