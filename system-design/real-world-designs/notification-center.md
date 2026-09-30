# Case Study: Notification Center

## Requirements
Unread count, list, mark read, real-time new notification and history pagination.

## Architecture
Initial API snapshot + SSE/WebSocket + query cache.

## State
Cache owns notification list/unread count. UI owns open/closed panel and highlighted item.

## Correctness
Deduplicate by notification ID. Reconcile push events with mutations and refetch when a sequence gap occurs.

## Reliability
Reconnect with backoff; fall back to polling if real-time transport is unavailable and product permits.

## Performance
Paginate history and avoid refreshing the entire application for one notification.

## Security
Filter notifications by authorization on the server; do not leak cross-tenant metadata.

## Follow-ups
Read-all, grouping, browser notifications, priority and delivery preferences.