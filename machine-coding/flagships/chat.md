# Flagship: Chat UI

## Requirements
History, send, optimistic message, live receive, unread and pagination.

## State
messages, pending IDs, connection status, draft and unread count.

## Correctness
Temporary IDs reconcile to server IDs; echoed live events are deduplicated; ordering follows server sequence.

## Advanced
Reconnect, typing indicator, presence, media, offline queue and virtualization.

## Follow-ups
What if send succeeds but acknowledgement is delayed? What if the same event arrives twice?