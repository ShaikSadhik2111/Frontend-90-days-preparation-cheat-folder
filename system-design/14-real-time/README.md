# 14 — Real-time features (design view)

## Choose the transport
| Need | Choice |
|---|---|
| Updates every minute, simple | Polling (pause when tab hidden) |
| Server → client stream (notifications, status, logs, AI tokens) | **SSE** |
| Bidirectional, high frequency (chat, collaboration, telemetry + commands) | **WebSocket** |
| Peer-to-peer media | WebRTC |

## Architecture
```
Server pub/sub ──► WebSocket gateway ──► RealtimeClient (one per tab; SharedWorker/BroadcastChannel for many tabs)
                                              │  subscribe(topic), reconnect, heartbeat, seq tracking
                                              ▼
                                  message buffer (batch per frame / 250–500 ms)
                                              ▼
                     patch query cache / store slices ──► subscribed components re-render (selectors)
```

## Must-cover concerns
- **Connection lifecycle**: connect, heartbeat/ping, exponential backoff + jitter reconnect, online/offline events, show connection status.
- **Consistency**: sequence numbers → detect gaps → resync snapshot via REST; dedupe by message id; idempotent handlers.
- **Load**: subscribe only to visible topics; unsubscribe on unmount / hidden tab; throttle rendering; aggregate on server.
- **Ordering**: server timestamps/sequence, not client clocks.
- **Auth**: cookie or token in first message; re-auth on expiry; authorise each subscription server-side.
- **Fallbacks**: SSE/long-poll if WebSockets are blocked by proxies (enterprise networks!).
- **UX**: "Live" indicator, last-updated time, stale banner when disconnected, don't move content under the user's cursor.

Worked examples: IoT dashboard & chat in [27 — Worked designs](../27-worked-designs/README.md).

Next → [15 Offline-first](../15-offline-first/README.md)
