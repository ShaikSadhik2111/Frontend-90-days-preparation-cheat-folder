# 13 — WebSockets and Server-Sent Events

**Connection:** polling repeatedly asks for updates; streaming transports maintain or stream communication.

**Learn:** WebSocket lifecycle, reconnect, heartbeat, ordering, backpressure concepts, SSE EventSource and transport selection.

**Example**
```js
const socket = new WebSocket("/socket");
socket.addEventListener("open", () =>
  socket.send(JSON.stringify({ type: "subscribe" }))
);
socket.addEventListener("message", event =>
  handleEvent(JSON.parse(event.data))
);
```

**Production:** chat, collaboration, dashboards and notifications.

**Pitfalls:** reconnect storms, duplicate/out-of-order events, memory leaks and confusing delivery with application correctness.

**Interview:** WebSocket vs SSE? safe reconnect? event deduplication? optimistic update after disconnect?

**Challenge:** reconnecting notification stream with bounded exponential backoff and event IDs.

**Next:** security.