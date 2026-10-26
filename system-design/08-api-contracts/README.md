# 08 — API contracts (the "I" in RADIO)

> Define the endpoints/events the UI needs, with request/response shapes, pagination, errors and versioning.

## Example: devices
```http
GET  /api/devices?plantId=PNQ&status=online&cursor=eyJpZCI6...&limit=50
200  { "items": [{ "id": "d1", "name": "Pump A", "status": "online", "updatedAt": "2026-10-27T10:00:00Z", "version": 7 }],
       "nextCursor": "eyJpZCI6ImQ1MCJ9", "total": 1243 }

PATCH /api/devices/d1          If-Match: "7"
      { "name": "Pump A1" }
200   { ...updated device, "version": 8 }      409 Conflict if version changed (someone else edited)

WS   /ws  → { "type": "subscribe", "topics": ["plant:PNQ"] }
     ←  { "type": "device.updated", "id": "d1", "patch": { "status": "offline" }, "seq": 1043 }
```

## Decisions to discuss
- **Pagination**: cursor (feeds, real-time lists) vs offset (admin tables with page numbers).
- **Filtering/sorting** server-side for big data; client-side only when the full set is small.
- **Errors**: consistent shape `{ code, message, fieldErrors? }`; status codes (400/401/403/404/409/422/429/5xx).
- **Concurrency**: `version`/`ETag` + `If-Match` → 409 → UI shows "changed by someone else".
- **Idempotency key** for POSTs that may be retried (payments, uploads).
- **Partial responses**: `fields=` or GraphQL to avoid over-fetching on mobile.
- **Versioning**: `/v2/` or additive changes only; contract tests (OpenAPI → generated TS types).
- **Real-time events**: event names, payload, sequence numbers for ordering/gap detection, resync endpoint.
- **Timestamps** in ISO-8601 UTC; format on client with `Intl`.

## Types
Generate TypeScript types from OpenAPI/GraphQL schema; validate at runtime at the boundary (Zod) for critical data.

Next → [09 Data fetching](../09-data-fetching/README.md)
