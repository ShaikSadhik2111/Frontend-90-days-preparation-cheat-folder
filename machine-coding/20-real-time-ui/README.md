# 20 — Real-time UI

Typical tasks: live price/telemetry ticker, chat, notifications, presence.

## Mock a real-time source
```ts
function createMockStream(onMessage: (m: { id: string; value: number }) => void) {
  const id = setInterval(() => onMessage({ id: `d${Math.ceil(Math.random() * 20)}`, value: Math.round(Math.random() * 100) }), 50);
  return () => clearInterval(id);       // 20 msgs/s
}
```
## Render efficiently
```tsx
function useBufferedStream() {
  const [values, setValues] = useState<Record<string, number>>({});
  useEffect(() => {
    let buffer: Record<string, number> = {};
    let frame = 0;
    const stop = createMockStream((m) => {
      buffer[m.id] = m.value;                                  // keep only latest per device
      if (!frame) frame = requestAnimationFrame(() => {        // flush max once per frame
        setValues((v) => ({ ...v, ...buffer })); buffer = {}; frame = 0;
      });
    });
    return () => { stop(); cancelAnimationFrame(frame); };
  }, []);
  return values;
}
```
Points: batching/throttling, memoized rows so only changed devices re-render, connection status indicator, reconnect with backoff (see [web-platform/13](../../web-platform/13-realtime-websockets-sse/README.md)), cleanup on unmount, `aria-live` sparingly (don't announce 20 updates/s).

Next → [21 File upload](../21-file-upload/README.md)
