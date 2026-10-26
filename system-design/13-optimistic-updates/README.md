# 13 — Optimistic updates

> Update the UI **before** the server confirms, then reconcile. Makes apps feel instant — but you must design rollback and conflicts.

## Flow
1. User action → generate temp id / mark item `pending`.
2. Snapshot current cache; apply optimistic change.
3. Send request (with idempotency key if retried).
4. **Success** → replace temp data with server response (real id, server timestamps, version).
5. **Failure** → rollback to snapshot, show error with **retry**, keep user input if possible.
6. Settle → invalidate/refetch to resync.

## When to use / avoid
| Good fit | Avoid / be careful |
|---|---|
| Likes, toggles, reordering, renaming, chat messages, acknowledging alarms | Payments, irreversible actions, operations with complex server validation, safety-critical commands to machines |

## Edge cases to mention
- Double clicks → disable while pending or dedupe by key.
- Out-of-order responses → cancel in-flight queries before optimistic write; compare versions.
- Concurrent edits by others → `version`/ETag; 409 → show diff / reload.
- Offline → queue in outbox, show "pending sync".
- Lists: optimistic insert at the right sort position; remove temp on failure.

Code: [React useOptimistic](../../react/03-hooks/useOptimistic/README.md) · [TanStack Query onMutate/rollback](../../react/07-data-fetching/tanstack-query/README.md).

Next → [14 Real-time](../14-real-time/README.md)
