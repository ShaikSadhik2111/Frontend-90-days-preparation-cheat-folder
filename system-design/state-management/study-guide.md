# State Architecture

Classify state before choosing a library.

Local UI: modal/open state. Form: draft fields. URL: search/filter/page. Server: orders. Session: current user. Shared client: preferences. Offline: persisted drafts.

Keep state close to consumers; lift only when siblings need one source of truth. Context is useful for cross-cutting dependencies but should not automatically become a global store. Redux/Zustand can coordinate complex client state; server-state libraries should own remote data lifecycles.

Do not store values that can be derived unless profiling proves it useful.

URL state is valuable for shareability, bookmarks and refresh recovery.

Race example: A starts, B starts, B returns, A returns. Use cancellation where appropriate plus request identity/stale-response protection. Cancellation saves work; stale protection preserves correctness.

Interview: “Should everything be Redux?” Answer by state category, lifecycle, ownership, sharing, persistence and update frequency.

Challenge: model state for order filters, pagination, selected order, details, edit form, save mutation, toast and permissions.