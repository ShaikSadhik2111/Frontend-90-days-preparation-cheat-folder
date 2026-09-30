# Application Components

Todo: add, toggle, delete, filter; follow-ups persistence, optimistic mutation and undo.

Kanban: columns, cards, drag state; follow-ups optimistic reorder, conflict handling, keyboard reorder and virtualization.

Shopping cart: separate catalog/server state, cart state and server-authoritative pricing. Never trust final price calculated only by the client.

Chat: history, optimistic send, temporary IDs, live events, deduplication, reconnect and pagination.

Notifications: unread count, list, mark-read, real-time event and deduplication.

Dashboard: independent widget loading/error states; shared filters at page/query level.

File upload: client validation for UX, progress, cancel/retry, server validation and asynchronous processing.

Practice ladder: Todo → Kanban → Cart → Dashboard → Chat → File Upload.