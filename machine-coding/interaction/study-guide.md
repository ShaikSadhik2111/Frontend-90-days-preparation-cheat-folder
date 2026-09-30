# Interaction Problems

Debounced search: input, debounce, cancellation, stale-response protection, loading/empty/error and keyboard selection.

Invariant: only the latest active query may update visible results.

Autocomplete adds highlighted index, ArrowUp/Down, Enter, Escape, click selection and accessible active-option semantics.

Drag/drop state: dragged ID, source container, target container and insertion index. Provide keyboard reorder for accessibility.

Undo/redo uses past → present → future. A new edit after undo normally clears future.

Outside click requires careful event ordering so the opening pointer action does not immediately close the component.

Challenge: build autocomplete, then add keyboard behavior without changing the data-fetch contract.