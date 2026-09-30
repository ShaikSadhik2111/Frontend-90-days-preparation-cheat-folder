# Large Form System Design

Partition large forms by business section: Form shell → section → field group → field.

Keep form state inside the form boundary. Do not globalize every keystroke.

Separate field validation, cross-field validation and server/domain validation. The server remains authoritative.

Dependent fields such as country → state → city require invalidating children, cancelling obsolete requests, loading new options and preserving only valid values.

Autosave needs dirty, saving, saved, failure and conflict states. Debounce typing-driven saves and define meaningful save boundaries.

Performance tools: lazy-load sections, virtualize huge option lists and prevent unrelated field rerenders.

Challenge: design an 80-field enterprise form with autosave, draft recovery, server validation and role-based sections.