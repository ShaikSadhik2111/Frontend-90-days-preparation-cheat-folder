# 07 — Data flow

> Describe how data moves: **user action → state change → request → cache update → re-render**, and the real-time path.

## Typical flows to narrate
**Read**: route loads → read URL params → `useQuery(["devices", filters])` → cache hit? show instantly, revalidate in background : show skeleton → response → normalise → render.
**Write**: user edits → optimistic cache update → mutation request → success: replace with server data / invalidate related queries; error: rollback + toast with retry.
**Real-time**: socket message → validate → batch → patch cache/store entries → throttled re-render of subscribed components.
**Cross-tab**: BroadcastChannel / `storage` event → sync logout/theme.

## Principles
- **Unidirectional** flow (props down, events up; actions → reducers → state).
- Single source of truth per entity; derive the rest.
- Separate **commands** (mutations) from **queries** (reads).
- Event bus only for decoupled cross-module notifications (micro-frontends, legacy bridge) — not as the main state mechanism.
- Make async flows **cancelable** and **idempotent**.

## Avoid
Request waterfalls (parent fetch → child fetch → grandchild fetch) → parallelise, prefetch in route loaders, or aggregate via BFF/GraphQL.

Next → [08 API contracts](../08-api-contracts/README.md)
