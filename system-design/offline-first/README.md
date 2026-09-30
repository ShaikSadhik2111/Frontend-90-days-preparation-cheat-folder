# Offline-First Applications

Decide whether the product needs read-only offline, draft persistence or full offline mutations.

Architecture:
UI → local store/cache → sync queue → network → conflict resolution.

Use IndexedDB for larger structured client data. Track pending mutations with idempotency keys where possible.

States: online, offline, syncing, synced, conflict, failed.

Conflict strategies: last-write-wins, version check, merge or explicit user resolution. Choose based on business semantics.

Practice: design an offline-capable field-inspection app that syncs when connectivity returns.