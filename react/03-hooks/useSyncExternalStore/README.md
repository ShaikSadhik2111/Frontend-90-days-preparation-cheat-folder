# useSyncExternalStore

> `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)` subscribes a component to a store **outside React** (browser APIs, Redux/Zustand stores, your own store) safely under concurrent rendering — no "tearing".

## Example — online status
```tsx
function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => { window.removeEventListener("online", callback); window.removeEventListener("offline", callback); };
}
export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
}
```

## Example — tiny store (how Zustand works conceptually)
```tsx
function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => state,
    set: (next: T) => { state = next; listeners.forEach((l) => l()); },
    subscribe: (l: () => void) => { listeners.add(l); return () => listeners.delete(l); },
  };
}
const counter = createStore(0);
function useCounter() { return useSyncExternalStore(counter.subscribe, counter.get); }
```

## Rules
- `getSnapshot` must return the **same value** (same reference) if nothing changed — returning a new object every call causes an infinite loop.
- Define `subscribe` outside the component (or memoize) so React doesn't resubscribe every render.
- **Tearing** = different parts of the UI showing different versions of the same store during a concurrent render. This hook prevents it.

**Interview:** *Why not useEffect + useState for a store?* Works, but can tear in concurrent rendering and causes an extra render; this hook is the official integration point used by react-redux and Zustand.

Next → [useDebugValue](../useDebugValue/README.md)
