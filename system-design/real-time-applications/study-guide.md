# Real-Time Frontend Systems

Polling fits occasional refresh. SSE fits primarily server-to-client streams. WebSocket fits bidirectional low-latency communication. HTTP remains the normal request/response mechanism.

WebSocket lifecycle: connect → authenticate → subscribe → receive → update → reconnect.

Handle disconnects, backoff, duplicate events, ordering, authorization changes, visibility and logout.

If events have sequence numbers, apply them according to the consistency requirement and recover from gaps by buffering or refetching.

Optimistic flow: intent → optimistic state → acknowledgement/event → reconcile. Optimistic state is not authoritative.

Notification case: initial unread API, live event stream, deduplication by ID, mark-read mutation, cache reconciliation and fallback polling.

Challenge: define states idle, connecting, connected, reconnecting and closed plus every transition.