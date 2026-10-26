# 15 — Offline-first

> Treat the network as optional: the app reads/writes **local data first** and syncs when possible. Typical for field technicians, factory floors, travel.

## Building blocks
- **Service worker** caches the app shell (HTML/JS/CSS) → app opens offline.
- **IndexedDB** stores data (via `idb`/Dexie); UI reads from it.
- **Outbox queue**: writes saved locally with a client id + timestamp; replayed in order when online (Background Sync where supported, otherwise on `online` event / app start).
- **Sync engine**: pull changes since last sync token; push outbox; mark synced.
- **Conflict resolution**: last-write-wins (simple), field-level merge, server versions with user resolution, or CRDTs for collaborative data.

## UX
Clear connection indicator · "Saved locally — will sync" states per item · sync progress / errors with retry · avoid destructive actions offline · storage quota handling (`navigator.storage.estimate()`, `persist()`).

## Trade-offs
More complexity (sync bugs, migrations of local schema), security of local data on shared devices (encrypt or limit what's stored; clear on logout), testing offline paths (DevTools → offline, flaky network).

## Interview prompt
"Technicians record inspections in a basement with no signal." → SW app shell + IndexedDB forms + outbox + photo blobs queued + conflict policy + sync status UI.

Next → [16 Performance](../16-performance/README.md)
