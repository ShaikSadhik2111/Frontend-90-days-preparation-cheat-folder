# 23 — Undo / redo

## History with past / present / future
```ts
type History<T> = { past: T[]; present: T; future: T[] };
type Action<T> = { type: "set"; value: T } | { type: "undo" } | { type: "redo" } | { type: "reset"; value: T };

function historyReducer<T>(h: History<T>, a: Action<T>): History<T> {
  switch (a.type) {
    case "set":  return Object.is(a.value, h.present) ? h : { past: [...h.past, h.present].slice(-100), present: a.value, future: [] };
    case "undo": return h.past.length ? { past: h.past.slice(0, -1), present: h.past[h.past.length - 1], future: [h.present, ...h.future] } : h;
    case "redo": return h.future.length ? { past: [...h.past, h.present], present: h.future[0], future: h.future.slice(1) } : h;
    case "reset": return { past: [], present: a.value, future: [] };
  }
}
// const [h, dispatch] = useReducer(historyReducer<Shape[]>, { past: [], present: [], future: [] });
```
Points: new action clears `future`; cap history size (memory); keyboard shortcuts (Ctrl/Cmd+Z, Ctrl+Shift+Z / Ctrl+Y — skip when focus is in a text input that has native undo); group rapid changes (typing) into one entry with debounce; for big documents store **commands/patches** (Immer patches) instead of full snapshots.

Next → [24 Application components](../24-application-components/README.md)
