# Form Machine Coding

Basic form state: values, touched, errors, submitting.

Multi-step form: current step + values + per-step validation + completion. Do not discard completed values.

Dependent fields: country → state → city. Parent change should invalidate child, cancel obsolete requests, load options and keep only valid values.

Dynamic fields require stable IDs when items can reorder/delete.

Autosave needs dirty, saving, saved, failure and conflict states. Debounce typing-driven saves and define meaningful save boundaries.

Validation layers: field, cross-field and server/domain. Server remains authoritative.

Practice:
1. login form with async submit
2. three-step customer form with dependent fields
3. enterprise form with autosave and conflict handling.