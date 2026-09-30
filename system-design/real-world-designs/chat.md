# Case Study: Chat Application

## Requirements
History, send/receive messages, unread state, reconnect and delivery feedback.

## Architecture
Initial history API + cursor pagination + WebSocket for live events.

## State
Server state: message pages.
Client state: connection state, draft, pending messages, unread count.
Temporary IDs identify optimistic sends.

## Message flow
User sends → temporary message → mutation → server ID → event/ack → reconcile.

## Correctness
Deduplicate echoed events. Preserve ordering with server sequence/timestamps according to product semantics. Detect gaps and refetch.

## Reliability
States: connecting, connected, reconnecting, closed. Use bounded backoff. Do not endlessly reconnect after logout.

## Performance
Virtualize long history, paginate older messages, lazy-load media.

## Security
Authorization for conversation membership, safe rendering of message content and scoped media URLs.

## Follow-ups
Typing indicators, presence, read receipts, offline queue and multi-tab coordination.