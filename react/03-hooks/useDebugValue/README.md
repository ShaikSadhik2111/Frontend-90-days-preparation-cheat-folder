# useDebugValue

> `useDebugValue(value, format?)` adds a label to a **custom hook** in React DevTools. It has no effect on behaviour.

```tsx
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, () => navigator.onLine);
  useDebugValue(isOnline ? "Online" : "Offline");
  return isOnline;
}
// expensive formatting only when DevTools inspects it:
useDebugValue(date, (d) => d.toISOString());
```
Use it in shared/library hooks so teammates can see hook state in DevTools. Rarely asked — know what it is in one sentence.

Next → [useActionState](../useActionState/README.md)
