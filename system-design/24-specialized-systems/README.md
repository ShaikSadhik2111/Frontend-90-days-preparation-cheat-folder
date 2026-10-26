# 24 — Specialized frontend systems (key ideas per prompt)

| System | Key design points |
|---|---|
| **Rich text / collaborative editor** (Google Docs) | Editor framework (ProseMirror/Lexical/Slate), document model (not raw HTML), OT or CRDT (Yjs) for collaboration, presence cursors, autosave, offline, undo/redo stack, sanitised output |
| **Spreadsheet / data grid** | Virtualize rows+cols, cell model & formula dependency graph, keyboard navigation (ARIA grid), copy/paste, server-side sort/filter, sticky headers, column resize/pin |
| **Kanban** (Jira board) | Drag & drop with keyboard alternative (dnd-kit), optimistic reorder with fractional indexing/ranks, real-time sync, swimlanes, WIP limits |
| **Video player page** | Adaptive streaming (HLS/DASH), preload metadata only, lazy comments, captions & keyboard controls, analytics events |
| **Image gallery / carousel** | Lazy loading, responsive `srcset`, placeholders (blur/LQIP), prefetch next image, swipe + keyboard, a11y labels |
| **Notification center** | SSE/WebSocket push, unread counts, pagination, mark-as-read optimistic, grouping, cross-tab sync |
| **E-commerce listing + cart** | SSR/SSG for SEO, faceted filters in URL, cursor/offset pagination, image optimisation, cart persisted (server + local), price freshness, A/B tests |
| **Maps / geospatial** | Tile-based rendering, clustering markers, WebGL, viewport-based fetching, debounced pan/zoom |
| **Embeddable widget** (chat bubble, poll on 3rd-party sites) | Tiny loader script, iframe or shadow DOM isolation, versioned CDN, CSP compatibility, postMessage API |
| **Industrial HMI / SCADA-like web UI** | Real-time telemetry (WS), alarm priority & acknowledgement, audit trail, command safety (confirmations, no optimistic commands), high-contrast themes, long-running session stability |
| **Form builder / configurator** | Schema-driven rendering (JSON schema), validation rules engine, conditional fields, versioned drafts |
| **File explorer / tree** | Lazy-load children, virtualized tree, ARIA tree pattern, drag-to-move, optimistic rename |

Next → [25 Case studies](../25-case-studies/README.md)
