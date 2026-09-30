# API and Data Flow

Lifecycle: idle → loading → success, or loading → error, plus stale, refetching and cancellation.

Pipeline: UI intent → query key → cache lookup → request → validation → cache update → render.

Offset pagination is simple but can shift as data changes. Cursor pagination is generally more stable for feeds/changing datasets.

Search: debounce to reduce request rate; cancellation for obsolete fetches; stale-response protection for correctness; cache repeated queries; server-side ranking/filtering for large data.

Mutation: validate → authorize → submit → pending → result → invalidate/update cache. Optimistic updates require explicit rollback semantics.

Retry transient failures only; use bounded backoff/jitter where appropriate. Avoid blindly retrying validation failures or unsafe non-idempotent mutations.

Error matrix: 401 session recovery; 403 permission; 404 not found; 409 conflict; 422 validation; 429 rate limit; 5xx recovery/retry; offline fallback.

Challenge: implement search where A and B overlap and prove only the latest active query can update the UI.