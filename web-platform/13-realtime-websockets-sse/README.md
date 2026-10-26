# 13 — Real-time: polling, long polling, SSE, WebSockets

| Technique | Direction | How | Good for |
|---|---|---|---|
| **Short polling** | client → server | `setInterval(fetch, 5000)` | Simple dashboards, low frequency |
| **Long polling** | server holds request until data | re-request after each response | Legacy fallback |
| **SSE** (`EventSource`) | **server → client** | one long HTTP response streaming `data:` lines; auto-reconnect, `Last-Event-ID` | Notifications, live status, logs, AI token streaming |
| **WebSocket** | **bidirectional** | `ws://`/`wss://` upgrade, frames | Chat, collaboration, live telemetry with commands, games |
| WebTransport / WebRTC | bidirectional, UDP-ish / peer-to-peer | newer / media | Video, low-latency streams |

## WebSocket client with reconnect (interview favourite)
```js
function connect(url, onMessage) {
  let ws, retry = 0, closedByUser = false, heartbeat;
  const open = () => {
    ws = new WebSocket(url);
    ws.onopen = () => { retry = 0; heartbeat = setInterval(() => ws.send(JSON.stringify({ type: "ping" })), 25_000); };
    ws.onmessage = (e) => onMessage(JSON.parse(e.data));
    ws.onclose = () => {
      clearInterval(heartbeat);
      if (closedByUser) return;
      const delay = Math.min(30_000, 2 ** retry++ * 500) + Math.random() * 500;  // exponential backoff + jitter
      setTimeout(open, delay);
    };
  };
  open();
  return { send: (msg) => ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify(msg)), close: () => { closedByUser = true; ws.close(); } };
}
```

## SSE
```js
const es = new EventSource("/api/alarms/stream", { withCredentials: true });
es.addEventListener("alarm", (e) => addAlarm(JSON.parse(e.data)));
es.onerror = () => {/* browser retries automatically */};
```
SSE works over normal HTTP (proxies, auth cookies, HTTP/2 multiplexing) — often simpler than WebSockets when you only need server → client.

## Production concerns (system design follow-ups)
- **Resync after reconnect**: fetch a snapshot or ask for events since last id; dedupe by message id; order by sequence number.
- **Backpressure / render throttling**: buffer messages and flush to React state every animation frame or 250–500 ms.
- **Subscriptions**: subscribe per visible widget/topic; unsubscribe on unmount and when the tab is hidden (`visibilitychange`).
- **Auth**: cookies or a token in the first message (not in the URL — it gets logged); handle token expiry.
- **Scaling**: one socket per tab; share across tabs with a SharedWorker/BroadcastChannel; servers need sticky sessions or a pub/sub backbone.

## Interview questions
1. Polling vs SSE vs WebSocket — when each?
2. How do you handle reconnection and missed messages?
3. How do you keep the UI fast with 100 messages per second?
4. How do you authenticate a WebSocket?

Next → [14 Browser security](../14-browser-security/README.md)
