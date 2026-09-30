# External State and Synchronization

External state includes URL, browser storage, media queries, WebSocket connections, IndexedDB and third-party widgets.

Treat external systems as synchronization boundaries. Define subscribe, read, write, cleanup and failure behavior.

React useSyncExternalStore is useful for subscription-style external stores.

Interview question: why should a WebSocket not be recreated on every render? Because the connection lifecycle belongs to an external synchronization boundary, not render calculation.