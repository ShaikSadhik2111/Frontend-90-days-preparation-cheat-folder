# Micro-Frontends

Micro-frontends primarily solve organizational and deployment boundaries.

Useful signals: independent domain ownership, valuable independent releases, stable team contracts and coordinated deployment being a major bottleneck.

Costs: runtime integration, duplicated dependencies, design consistency, routing/auth coordination, debugging, compatibility and operational overhead.

A shell can load remote modules. Define remote contracts, shared dependency policy, compatibility expectations, fallback behavior and telemetry.

Prefer explicit communication through navigation, typed events, platform services or APIs. Avoid a giant mutable event bus.

Interview question: would you use micro-frontends for a large application? Compare a modular monolith against team ownership, deployment independence and release coupling rather than answering from codebase size alone.